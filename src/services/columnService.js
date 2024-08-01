
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from './../models/cardModel'

import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (resBody) => {
  try {
    const newColumn = {
      ...resBody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      //tra ve them truong card la rong khi tao column moi
      getNewColumn.cards = []

      //Cap nhat lai mang columnOrderIds trong board
      await boardModel.pushColumnOrderIds(getNewColumn)

    }

    return getNewColumn
  } catch (error) { throw error }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await columnModel.update(columnId, updateData)

    return updatedBoard
  } catch (error) { throw error }
}

const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)

    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, ' Column not found ')
    }

    //Xoa column
    await columnModel.deleteOneById(columnId)

    //Xoa card thuoc column
    await cardModel.deleteManyByColumnId(columnId)

    //Xoa columnOrderIds trong board
    await boardModel.pullColumnOrderIds(targetColumn)

    return { deleteResult: 'Column and its Cards deleted successfully!' }
  } catch (error) { throw error }
}

export const columnService = {
  createNew,
  update,
  deleteItem
}
