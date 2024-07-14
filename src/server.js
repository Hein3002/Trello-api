/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'

const START_SERVER = () => {
  const app = express()

  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

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