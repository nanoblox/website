const resourcesData = require("./resources.json");
const MongoDB = require("mongodb");
const redis = require("redis");
const fetch = require("fetch");

require("dotenv").config();

const mongoDBClient = new MongoDB.MongoClient(
  process.env.MONGODB_CONNECTION_STRING
);

async function run() {
  try {
    await mongoDBClient.connect();

    const database = mongoDBClient.db("Nanoblox");
    const resources = database.collection("resources");

    const deletedResponse = await resources.deleteMany({});
    console.log(deletedResponse);

    const insertedResponse = await resources.insertMany(resourcesData);
    console.log(insertedResponse);

    const configResponse = await fetch(
      "https://api.heroku.com/addons/redis-acute-17192/config",
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.heroku+json; version=3",
          Authorization: `Bearer ${process.env.HEROKU_AUTHENTICATION_TOKEN}`,
        },
      }
    );
    const configData = await configResponse.json();
    const { value: redisUri } = configData;

    const redisClient = redis.createClient(redisUri);
    redisClient.del("resources");
    redisClient.quit();
  } finally {
    await mongoDBClient.close();
  }
}

run().catch(console.dir);
