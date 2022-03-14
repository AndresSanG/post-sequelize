
const globalErrorHandler = (err,req,res,next ) => {
	console.table([err]);
	res.status(err.statusCode).json({
		status:err.status,
		message:err.message,
		stack:err.stack
	});
};
module.exports = {globalErrorHandler};