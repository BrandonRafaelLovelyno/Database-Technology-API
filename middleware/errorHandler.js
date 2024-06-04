const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  const responseBody = {
    message: err.message,
  };
  console.log("Error : ", err.stack);
  return res.json(responseBody);
};

module.exports = errorHandler;
