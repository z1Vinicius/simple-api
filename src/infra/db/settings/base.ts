import DataBaseConnectionHandler from "./connection";
import { IDataBaseConnection } from './connection';
require("dotenv").config();

const connectionData: IDataBaseConnection = {
  databaseName: "Alura",
  host: "localhost",
  port: 27017,
  username: process.env.MONGO_INITDB_ROOT_USERNAME,
  password: process.env.MONGO_INITDB_ROOT_PASSWORD
} 

async function databaseConnection(){
	const database = new DataBaseConnectionHandler(connectionData)
	await database.createDataBaseConnection()
	return database
}

const connection = databaseConnection()

export default connection;
