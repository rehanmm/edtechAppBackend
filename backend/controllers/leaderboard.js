
const {MongoClient}=require("mongodb");
const {Leaderboard}= require("@gamestdio/leaderboard");
const {MONGODB_URI}=require("../config/config");



const client = new MongoClient(MONGODB_URI);

   let db = client.db("leaderboard");
   


// Initialize the leaderboard.
const leaderboard = new Leaderboard(db);

leaderboard.record("day", { user_id:'y8GbVPtaSrSlDrzOYm3tf7yxgzs2',user_name:'rehan', score: 6090 });

leaderboard.list('day').then((rows) => {
    console.log(rows);


   
  });


