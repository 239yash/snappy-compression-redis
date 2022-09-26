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
});

client.on("error", (err) => {
    console.log("Error On Connection" + err);
});
client.connect();
app.get("/get-redis-key", (req, res) => {
    console.log("first");
    client.set("foo", "bar", (err, reply) => {
        if (err) throw err;
        console.log(reply);

        client.get("foo", (err, reply) => {
            if (err) throw err;
            console.log(reply);
        });
    });
    console.log("second")
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Redis-Snappy app listening on port ${port}`);
});
