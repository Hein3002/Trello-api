
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'


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

export const columnService = {
  createNew
}
