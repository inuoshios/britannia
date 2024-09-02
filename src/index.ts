import { IncomingMessage, ServerResponse } from "http";
import fs from "node:fs";

/**
 * Options for configuring the Britannia logging middleware.
 */
export interface BritanniaOptions {
  /**
   * Whether to write log entries to a file.
   * @default false
   */
  writeToFile?: boolean;

  /**
   * The name of the file where logs will be written.
   * If not specified, defaults to 'britannia.log'.
   */
  fileName?: string;

  /**
   * Whether to include the request body in the log output.
   * Note that logging the request body may have performance and security implications.
   * @default false
   */
  showRequestBody?: boolean;
}


/**
 * Middleware function for logging HTTP requests.
 * @param options - Configuration options for the logger.
 * @returns Middleware function.
 */
function britannia(options?: BritanniaOptions) {
  return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const start = process.hrtime.bigint();
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });


    res.on('finish', () => {
      const end = process.hrtime.bigint();
      const duration = Number(end - start) / 1_000_000;
      const url = `${(req.headers['x-forwarded-proto'] as string) === "https" ? "https" : "http"}://${req.headers.host}/${req.url}`;
      let logMessage = `${req.method}\t${res.statusCode}\t${url}\t${duration.toFixed(2)}ms\t${new Date().toLocaleDateString()}`;
      if (options?.showRequestBody) {
        logMessage += `\t${body}`;
      }
      logMessage += `\n`;

      // write to the file
      if (options && options.writeToFile) {
        fs.appendFile('britannia.log' ?? options.fileName, logMessage, { flag: 'a+' }, (err) => {
          if (err) {
            process.stderr.write(`Error while writing to file ${JSON.stringify({ reason: err.message })}\n`);
          }
        });
      }
      process.stdout.write(logMessage);
    });

    next();
  };
}

export default britannia;