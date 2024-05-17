const handleInvalidRoute = (req, res) => {
  res.status(404).send('API not found!, Please check out our documentaion at `http://localhost:5100/api-docs/`');
};

export default handleInvalidRoute;