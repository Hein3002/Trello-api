import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'


const createNew = async (req, res, next) => {
  try {
    // console.log('req.body:', req.body)

    const createBoard = await boardService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) { next(error) }

}

const getDetails = async (req, res, next) => {
  try {
    // console.log('req.params:', req.params)
    const boardId = req.params.id
    const board = await boardService.getDetails(boardId)

    res.status(StatusCodes.OK).json(board)
  } catch (error) { next(error) }

}


export const boardController = {
  createNew,
  getDetails
}
