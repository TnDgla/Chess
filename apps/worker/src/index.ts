import cluster from "cluster";
import express from "express";
import os from "os";

import { processQueue } from "./worker";
import { Redis } from "./Redis";
import { PORT } from "./config";


// Could use kafka but would increase the cost as redis is going to be used
// Multi Threaded Worker
const workers: { [workerPid: string]: any } = {},
    count = os.cpus().length;

function spawn() {
    const worker = cluster.fork();
    //@ts-ignore
    workers[worker.pid] = worker;
    return worker;
}

if (cluster.isMaster) {
    for (let i = 0; i < count; i++) {
        spawn();
    }
    cluster.on("death", function (worker: any) {
        console.log("worker " + worker.pid + " died. spawning a new process...");
        delete workers[worker.pid];
        spawn();
    });
    const app = express();

    Promise.all([
        new Promise((resolve) => {
            Redis.getInstance().getClient.connect().then(() => {
                resolve(true);
            });
        }),
    ]).then(() => {
        app.listen(PORT, async () => {
            console.log(`Worker listening on port: ${PORT}\n`);
        });
    }).catch((error) => {
        console.error('Error while connecting producers:', error);
    });

} else {
    console.log(`Worker ${process.pid} started`);
    Promise.all([
        new Promise((resolve) => {
            Redis.getInstance().getClient.connect().then(() => {
                resolve(true);
            });
        }),
    ]).then(async () => {
        while (true) {
            await processQueue();
        }
    }).catch((error) => {
        console.error('Error while connecting producers:', error);
    });
}

process.on("uncaughtException", function (err) {
    console.log("Caught exception: " + err);
});