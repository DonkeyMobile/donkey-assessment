import { Collection, Db, MongoClient } from 'mongodb'
import { ConnectionException } from './Exceptions'

/**
 * This client is there to make sure you don't need to connect every time you
 * want to communicate with the Mongo DB
 */
export class MongoDBClient {
  private static client: MongoClient | null

  private readonly uri: string
  private readonly database: string

  constructor(uri: string, database: string) {
    this.uri = uri
    this.database = database
  }

  public async collection(collectionName: string): Promise<Collection> {
    return (await this.connect()).collection(collectionName)
  }

  private async connect(): Promise<Db> {
    try {
      if (MongoDBClient.client) {
        return MongoDBClient.client.db(this.database)
      }

      const client = new MongoClient(`${this.uri}/${this.database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

      await client.connect()

      MongoDBClient.client = client

      return client.db(this.database)
    } catch (error) {
      throw new ConnectionException(`Unable to connect to MongoDB with error ${error}`)
    }
  }

  public static async disconnect(): Promise<void> {
    if (MongoDBClient.client) {
      await MongoDBClient.client.close()
    }

    MongoDBClient.client = null
  }
}
