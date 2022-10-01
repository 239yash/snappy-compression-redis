const express = require("express");
const app = express();
const port = 3000;
const redis = require("redis");

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

app.get("/get-redis-key", async (req, res) => {
    let cachedData = await client.get("foo");
    console.log("Redis Data is - " + cachedData);
    res.status(200).send(cachedData);
});

app.listen(port, () => {
    console.log(`Redis-Snappy app listening on port ${port}`);
});
