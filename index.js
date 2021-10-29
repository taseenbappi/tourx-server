const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// midleware
app.use(cors());
app.use(express.json());

// db connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wyglv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("tourX");
        const packageCollection = database.collection("tourPackage");

        //get api(getting all tour packages)
        app.get('/packages', async (req, res) => {
            const cursor = packageCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        })
    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir);



// root api
app.get('/', (req, res) => {
    res.send('TourX Server Running');
})

//server port listen
app.listen(port, () => {
    console.log(`TourX server port listening at: ${port}`);
})