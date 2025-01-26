export const validationsMiddleware = (req, res, next) => {
  console.log(req.baseUrl);
  console.log(req.method);
  console.log(req.params);
  console.log(req.headers["authorization"]);
  next();
};
