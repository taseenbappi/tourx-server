const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;
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
        const commentCollection = database.collection("customerComment");
        const orderCollection = database.collection("placedOrder");

        //get api(getting all tour packages)
        app.get('/packages', async (req, res) => {
            const cursor = packageCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        })
        //get api dynamic(single package)
        app.get("/packages/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const package = await packageCollection.findOne(query);
            res.send(package);

        })

        //post api(place Order)
        app.post('/placedOrder', async (req, res) => {
            console.log("server hittin", req.body);
            const comment = req.body;
            const result = await orderCollection.insertOne(comment);
            res.json(result);
        })
        //post api(cutomer comment)
        app.post('/customerComment', async (req, res) => {
            console.log("server hittin", req.body);
            const comment = req.body;
            const result = await commentCollection.insertOne(comment);
            res.json(result);
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