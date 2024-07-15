import { StatusCodes } from 'http-status-codes'


const createNew = async (req, res, next) => {
  try {
    console.log('req.body:', req.body)
    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller create new Board' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }

}

export const boardController = {
  createNew
}