const resources = require("./resources.json")
const MongoDB = require("mongodb")

require("dotenv").config()

const client = new MongoDB.MongoClient(process.env.MONGODB_CONNECTION_STRING)

async function run() {
    try {
        await client.connect()

        const database = client.db("Nanoblox")
        const resources = database.collection("resources")

        const count = resources.countDocuments()
        console.log(count)
    } finally {
        await client.close()
    }
}

run().catch(console.dir)