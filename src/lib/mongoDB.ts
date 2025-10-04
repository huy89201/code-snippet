import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://huyle89201:dlkfSATZ36dkUzdP@code-snippet.fazghhh.mongodb.net/`;

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let mongoClient: MongoClient;

mongoClient = new MongoClient(uri!, options);

export default mongoClient;
