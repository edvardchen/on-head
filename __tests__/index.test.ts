import http, { Server } from 'http';
import Express from 'express';
import onHead from '../src';

describe('on-head', () => {
  let server: Server;

  let port: number;

  beforeAll(done => {
    const app = Express();

    app.use((req, res, next) => {
      onHead(res, () => {
        res.setHeader('inject-header', 1);
      });
      next();
    });

    app.get('/', (req, res) => {
      res.send('hello world');
    });

    port = Math.floor(Math.random() * 1e4);

    server = app.listen(port, done);
  });

  afterAll(done => {
    server.close(done);
  });

  it('should get tracer id from res header', done => {
    http.get(`http://localhost:${port}`, res => {
      expect(res.headers['inject-header']).toBeDefined();
      done();
    });
  });
});
