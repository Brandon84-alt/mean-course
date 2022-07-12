const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");
const postsRoutes = require("./routes/posts");
const { MongoClient } = require("mongodb");
const app = express();

//---------------------- Connection to MongoDB ----------------
const cosmosDbUri = 'mongodb://ezshop-dev-admin:LUk95q9Ya6SkL1TvWurzx5swbN5dq3Y7RGhTrwEogLg1UAnUkpJ19qIEfIDn5wt0LBNqQrRKYGEex1qilmuPUg==@ezshop-dev-admin.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@ezshop-dev-admin@'
const cosmosDbClient = new MongoClient(cosmosDbUri)


console.log("Server connection to database...");
   return (async () => {

    await cosmosDbClient.connect()
        .then((result)=> {
            LogService.log("SUCC","Database", "init connection", "Connection to CosmosDb successfull.","")
    }).catch((err)=> {
        LogService.log("ERR","Database", "init connection", "Connection to CosmosDb failed.","")

    });

    productDb = cosmosDbClient.db('products')
    productCollection = productDb.collection('product_schreter_demo')

    usersDataDb = cosmosDbClient.db('user_data')
    usersDescriptionsCollection = usersDataDb.collection('user_descriptions')

    testDb = cosmosDbClient.db("Test");
    shopifyCollection = testDb.collection("shopify");

   });
//---------------------- End of Connection to MongoDB ----------------


//---------------------------------------- OLD DB
mongoose.connect("mongodb+srv://Virati84:gAqJKTI4A23zqioB@cluster0.3ptpo.mongodb.net/node-angular?retryWrites=true&w=majority")

.then(() => {
  console.log('Connected to database!');
})
.catch(()=>{
console.log('Connection failed!');
});
//-------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
