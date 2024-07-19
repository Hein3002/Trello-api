
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'


const createNew = async (resBody) => {
  try {
    const newCard = {
      ...resBody
    }
    const createdCard = await cardModel.createNew(newCard)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)

    if (getNewCard) {

      //Cap nhat lai mang cardOrderIds trong board
      await columnModel.pushColumnOrderIds(getNewCard)

    }

    return getNewCard
  } catch (error) { throw error }
}

export const cardService = {
  createNew
}
