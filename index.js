const express = require("express");
const redis = require("redis");
const snappy = require("snappy");
const testData = require("./testData");
const Blob = require('node-blob');
const app = express();
const port = 3000;

const client = redis.createClient({
    socket: {
        host: "localhost",
        port: 6379,
    },
    password: "changeit",
    detect_buffers: true,
});


client.connect();
client.on("connect", () => {
    console.log("Redis client connected");
})

const testDataPromise = async () => {
    try {
        const buffer = new Blob([JSON.stringify(testData)]);
        console.log(buffer.size);
    } catch(err) {
        console.log(err);
    }
}

const compressData = async () => {
    try {
        const compressed = await snappy.compressSync(JSON.stringify(testData));
        console.log(compressed.byteLength);
    } catch(err) {
        console.log(err);
    }
}

app.get("/get-redis-key", async (req, res) => {
    let cachedData = await client.get("foo");
    testDataPromise();
    compressData();
    res.status(200).send(cachedData);
});

app.listen(port, () => {
    console.log(`Redis-Snappy app listening on port ${port}`);
});
