// import necessary External modules
import express from 'express';

// Create Express server instance
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to E-Commerce API')
})

// Export Express server instance as default
export default app;
