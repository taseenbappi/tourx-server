const express = require('express');
const cors = require("cors");
const app = express();
const port = 5000;

// midleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

//server port listen
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})