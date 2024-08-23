import { IncomingMessage, ServerResponse } from "http";

export interface BritanniaOptions {
  writeToFile?: boolean;
  fileName?: string;
}

export default function britannia(options?: BritanniaOptions) {
  return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const start = process.hrtime.bigint();

    res.on('finish', () => {
      const end = process.hrtime.bigint();
      const duration = Number(end - start) / 1_000_000;
      process.stdout.write(
        `${req.method}\t${res.statusCode}\t${req.url}\t${duration.toFixed(2)}ms\t${new Date().toLocaleDateString()}\n`
      );
    });

    next();
  }
}

