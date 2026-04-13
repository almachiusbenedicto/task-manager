import {CustomAPIError} from "../errors/custom-errors.js"

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    res.status(500).json({ message : 'Something went wrong, try again later' })
}

export default errorHandlerMiddleware