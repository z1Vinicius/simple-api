import "dotenv/config";
import DataBaseConnectionHandler, { IDataBaseConnection } from "./connection";

const connectionData: IDataBaseConnection = {
	databaseName: "library",
	host: "10.3.1.146",
	port: 27017,
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
