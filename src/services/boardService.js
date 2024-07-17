/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formater'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'


const createNew = async (resBody) => {
  try {
    //Su li logic du lieu
    const newBoard = {
      ...resBody,
      slug: slugify(resBody.title)
    }

    //goi toi tang model de xu ly luu ban ghi newBoard vao trong Database
    const createdBoard = await boardModel.createNew(newBoard)

    //Lay ban ghi board sau khi luu( tuy muc dich du an)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    //Tra ket qua ve,trong service luon phai co return
    return getNewBoard
  } catch (error) { throw error }
}

const getDetails = async (boardId) => {
  try {
    //goi toi tang model de xu ly luu ban ghi newBoard vao trong Database
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, ' Board not found ')
    }

    return board
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}