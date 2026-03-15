


export const globalErrorHandling = (error, req, res, next) => {
    
const statusCode = error.statusCode || 500
  console.log(error.message);
  
  return res.status(statusCode).json({
    success: false,
    message: req.__(error.message)
  })
}