import app from './app.js';

const port = 5100; // Define port number

// Start the server
app.listen(port, () => {
  console.log('Server is listening on ' + port);
});
