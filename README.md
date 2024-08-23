# Britannia (Shinsei Buritania Teikoku)

`britannia` is a simple logging middleware for Express.js (and any Node.js framework) that logs details of incoming HTTP requests and responses. It records the HTTP method, status code, request URL, response duration, and the date of the request.

## Features

- Logs HTTP method, status code, URL, response duration in milliseconds, and the current date.
- Easy to integrate with Express.js applications, and any other Node.js framework.
- Configurable options for future file logging support.

## Installation

Install `britannia` via npm:

```bash
npm install britannia
```

## Usage

### Basic Usage

To use `britannia` middleware in your Express.js application, import it and use it as middleware:

```js
import express from 'express';
import britannia from 'britannia';

const app = express();

// Use the britannia middleware
app.use(britannia());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

### Configuration Options

You can pass configuration options to `britannia`:

import express from 'express';
import britannia from 'britannia';

const app = express();

// Configuration options
const options = {
  writeToFile: false, // Currently not supported, future feature
  fileName: 'logs.txt' // Currently not supported, future feature
};

// Use the britannia middleware with options
app.use(britannia(options));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
## Contributing

If you would like to contribute to `britannia`, please fork the repository and submit a pull request. We welcome contributions of all kinds, including bug fixes, new features, and documentation improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any questions or issues, please open an issue on the GitHub repository or contact the maintainers at [email@example.com](mailto:inuoshios@gmail.com), or you can also contact via [X (Twitter)](https://x.com/inuoshios).

