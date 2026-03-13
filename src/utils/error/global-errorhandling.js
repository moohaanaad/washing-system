


export const globalErrorHandling = (error, req, res, next) => {
    
const statusCode = error.statusCode || 500

  return res.status(statusCode).json({
    success: false,
    message: req.__(error.message)
  })
}