import "dotenv/config";
import DataBaseConnectionHandler, { IDataBaseConnection } from "./connection";

const connectionData: IDataBaseConnection = {
	databaseName: process.env.MONGO_DATABASE_NAME,
	host: process.env.MONGO_SERVER_HOST,
	port: Number(process.env.MONGO_SERVER_PORT),
	username: process.env.MONGO_INITDB_ROOT_USERNAME,
	password: process.env.MONGO_INITDB_ROOT_PASSWORD,
};

async function databaseConnection() {
	const database = new DataBaseConnectionHandler(connectionData);
	await database.createDataBaseConnection();
	return database;
}

const connection = databaseConnection();

export default connection;
