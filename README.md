# on-head

Hook before http response send head

## Install

```bash
npm i on-head
```

## Usage

```typescript
import Express from 'express';

const app = Express();
app.use((req, res, next) => {
  onHead(res, () => {
    // You still can modify response headers
    res.setHeader('tracer-id', '1234');
  });
  next();
});
```
