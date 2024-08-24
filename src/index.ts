import { IncomingMessage, ServerResponse } from "http";
import fs from "node:fs";

export interface BritanniaOptions {
  writeToFile?: boolean;
  fileName?: string;
  showRequestBody?: boolean;
}

export default function britannia(options?: BritanniaOptions) {
  return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const start = process.hrtime.bigint();

    res.on('finish', () => {
      const end = process.hrtime.bigint();
      const duration = Number(end - start) / 1_000_000;
      const url = `${(req.headers['x-forwarded-proto'] as string) === "https" ? "https" : "http"}://${req.headers.host}/${req.url}`
      const logMessage = `${req.method}\t${res.statusCode}\t${url}\t${duration.toFixed(2)}ms\t${new Date().toLocaleDateString()}\n`
      if (options && options.writeToFile) {
        fs.appendFile('britannia.log' ?? options.fileName, logMessage, { flag: 'a+' }, (err) => {
          if (err) {
            process.stderr.write(`Error while writing to file ${JSON.stringify({ reason: err.message })}\n`);
          }
        })
      }
      process.stdout.write(logMessage);
    });

    next();
  }
}
