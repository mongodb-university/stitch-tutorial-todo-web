import { Stitch, RemoteMongoClient } from "mongodb-stitch-browser-sdk";

 const APP_ID = "stitch-todo-ndzyv";

 // TODO:
 // 1. Initialize the app client
 const app = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);

 // 2. Instatiate a RemoteMongoClient client and create a RemoteMongoDatabase object
 //    for the 'todo' collection.
 const mongoClient = app.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
 const db = mongoClient.db("todo");

 // 3. Create a RemoteMongoCollection for the `items` collection.
 const items = db.collection("items");

 export { app, items };
