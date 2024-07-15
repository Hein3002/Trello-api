import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'


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
    description: Joi.string().required().min(3).max(256).trim().strict()
  })


  try {
    // abortEarly de tra ve tat ca cac loi khi validation neu khong se chi tra ve loi dau tien gap phai
    await correctConditon.validateAsync(req.body, { abortEarly: false })
    //Validate du hoan thien chi chuyen request sang Controller
    next()
  } catch (error) {
    // console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}