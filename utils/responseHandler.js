export const successResponse = (res, status, message, data = null) => {
    return res.status(status).json({
      status,
      message,
      data,
    });
  };
  
  export const errorResponse = (res, status, message, error = null) => {
    return res.status(status).json({
      status,
      message,
      error,
    });
  };
  