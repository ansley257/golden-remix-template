// middleware/requestId.js
function requestIdMiddleware(req, res, next) {
  req.requestId = generateUniqueId(); // Generate a unique ID here
  next();
}

export default requestIdMiddleware;
