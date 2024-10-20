import mongoose from "mongoose";

export interface IDataBaseConnection {
  username: string;
  password: string;
  databaseName: string;
  host: string;
  port: number;
}

class DataBaseConnectionHandler {
  private databaseName: string;
  private username: string;
  private password: string;
  private host: string;
  private port: number;
  private connectionUrl: string;

  constructor(connectionData: IDataBaseConnection) {
    this.username = connectionData.username;
    this.password = connectionData.password;
    this.host = connectionData.host;
    this.port = connectionData.port;
    this.databaseName = connectionData.databaseName;
    this.connectionUrl = this.getConnectionUrl(); 
    this.enableConnectionEvents(); 
  }

  private getConnectionUrl(): string {
    return `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.databaseName}?authSource=admin`;
  }
  
  public async getConnection(): Promise<mongoose.Connection>{
    return mongoose.connection
  }

  public async createDataBaseConnection(): Promise<void> {
    try {
      await mongoose.connect(this.connectionUrl);
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
    }
  }

  private enableConnectionEvents() {
    const db = mongoose.connection;

    db.on("error", (error) => {
      console.log(`Erro ao conectar: ${error}`);
    });

    db.once("open", () => {
      console.log("Conexão estabelecida com sucesso!");
    });
  }
}

export default DataBaseConnectionHandler;
