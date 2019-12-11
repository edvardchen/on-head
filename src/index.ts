import { ServerResponse } from 'http';

const WRITE_HEAD = Symbol.for('http:writeHead');

declare module 'http' {
  interface ServerResponse {
    [WRITE_HEAD]?: boolean;
    beforeHeadListeners: (() => void)[];
  }
}

function attachWriteHead(res: ServerResponse): void {
  let old = res.writeHead;
  res.writeHead = (statusCode: number, ...rest: any[]) => {
    res.beforeHeadListeners.forEach(item => item());
    old.call(res, statusCode, ...rest);
    // clear
    res.beforeHeadListeners = [];
    return res;
  };

  res[WRITE_HEAD] = true;
  res.beforeHeadListeners = [];
}

export default function onHead(
  res: ServerResponse,
  callback: () => void
): void {
  if (!res[WRITE_HEAD]) {
    attachWriteHead(res);
  }

  res.beforeHeadListeners.push(callback);
}
