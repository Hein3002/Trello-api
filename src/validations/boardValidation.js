import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPE } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctConditon = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict()
      //custom thong bao loi tra ve
      .messages({
        'any.required': 'Title is required',
        'string.empty': 'Title is not allowed to be empty',
        'string.min': 'Title min 3 characters',
        'string.max': 'Title min 50 characters',
        'string.trim': 'Title must not have leading or trailing whitespace'

      }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE).required()
  })

  try {
    // abortEarly de tra ve tat ca cac loi khi validation neu khong se chi tra ve loi dau tien gap phai
    await correctConditon.validateAsync(req.body, { abortEarly: false })
    //Validate du hoan thien chi chuyen request sang Controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
}

const update = async (req, res, next) => {
  //khong requied trong update
  const correctConditon = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE),
    columnOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([])
  })

  try {
    // abortEarly de tra ve tat ca cac loi khi validation neu khong se chi tra ve loi dau tien gap phai
    // allowUnknown khong can day day du cac truong len
    await correctConditon.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
}

export const boardValidation = {
  createNew,
  update
}