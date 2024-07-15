import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRouter } from '~/routes/v1/boardRoute'

const Router = express.Router()

//Check APIs V1 status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'api v1' })
})

//Board APIs
Router.use('/boards', boardRouter)

export const APIs_V1 = Router