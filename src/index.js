const resourcesData = require("./resources.json")
const MongoDB = require("mongodb")

require("dotenv").config()

const client = new MongoDB.MongoClient(process.env.MONGODB_CONNECTION_STRING)

async function run() {
    try {
        await client.connect()

        const database = client.db("Nanoblox")
        const resources = database.collection("resources")

        const deletedResponse = await resources.deleteMany({})
        console.log(deletedResponse)

        const insertedResponse = await resources.insertMany(resourcesData)
        console.log(insertedResponse)
    } finally {
        await client.close()
    }
}

run().catch(console.dir)