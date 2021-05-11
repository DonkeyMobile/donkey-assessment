import bottle from '../bottle'
import { MongoDBClient } from '../../DatabaseClients/MongoDBClient'

bottle.factory(MongoDBClient.name, () => {
  // When you would like to bring this to production you need to make the user, secret and url configurable.
  // Because it depends on where you want to run this how you do this I skipped it for now

  return new MongoDBClient(
    'mongodb://donkeyUser:reallySecret@localhost:27017',
    'donkey'
  )
})
