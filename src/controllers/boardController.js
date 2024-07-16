import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'


const createNew = async (req, res, next) => {
  try {
    // console.log('req.body:', req.body)
    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller create new Board' })
  } catch (error) { next(error) }

}

export const boardController = {
  createNew
}
