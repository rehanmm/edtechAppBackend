
const {MongoClient}=require("mongodb");
const {Leaderboard}= require("@gamestdio/leaderboard");
const {MONGODB_URI}=require("../config/config");


let db={};
const client = new MongoClient(MONGODB_URI);

   let db = client.db("leaderboard");
   
console.log(db)

// Initialize the leaderboard.
const leaderboard = new Leaderboard(db);

leaderboard.store("day", { id: "y8GbVPtaSrSlDrzOYm3tf7yxgzs2", score: 50 });

leaderboard.list("day").then((rows) => {
    console.log(rows);


    // client.close();
  });


