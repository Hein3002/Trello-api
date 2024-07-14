import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRouters } from '~/routes/v1/boardRoutes'

const Router = express.Router()

//Check APIs V1 status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'api v1' })
})

//Board APIs
Router.use('/boards', boardRouters)

export const APIs_V1 = Router