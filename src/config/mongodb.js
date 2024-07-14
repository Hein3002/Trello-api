import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//Ket noi database
export const CONNECT_DB = async () => {
  //goi ket noi toi mongodb atlas voi uri duoc khai bao trong than cua mongoClientInstance
  await mongoClientInstance.connect()

  //goi ket noi toi mongodb atlas voi uri duoc khai bao trong than cua mongoClientInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

//Dong ket noi database
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

//export ra trelloDatabaseInstance sau khi da ket noi thanh cong de su dung lai o nhieu noi
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first')
  return trelloDatabaseInstance
}

