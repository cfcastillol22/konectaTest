const errorResponse = (res, status, error, message) => {
  return res.status(status).json({
    message,
    error,
    status,
  });
};

const successResponse = (res, status, data, message) => {
  return res.status(status).json({
    message,
    data,
    status,
  });
};

export { errorResponse, successResponse };
