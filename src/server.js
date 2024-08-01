/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  //su dung res.body json data
  app.use(express.json())

  //Su dung api v1
  app.use('/v1', APIs_V1)

  //Middleware xu ly loi tap trung
  app.use(errorHandlingMiddleware)

  //Moi truong production render.com
  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Production: Hello ${env.AUTHOR}, I am running at Port: ${process.env.PORT}/`)
    })
  } else {
    //Môi trường local dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`Local dev: Hello ${env.AUTHOR}, I am running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`)
    })
  }

  //thuc hien dong connect khi dung server
  exitHook(async () => {
    console.log('exit app')
    await CLOSE_DB()
  })
}

//Chi khi ket noi database thanh cong thi moi start server
//ngoac tron thu 2 de thuc thi luon fuction (IIFE)
(async () => {
  try {
    console.log('Connecting ...')
    await CONNECT_DB()
    console.log('Connected to mongodb Atlast')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// console.log('dang log khi chx xong connect')

//Chi khi ket noi database thanh cong thi moi start server
// CONNECT_DB()
//   .then(() => console.log('Connected to mongodb Atlast'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })