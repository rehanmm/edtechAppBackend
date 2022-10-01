const {leaderboard,db}=require('./leaderBoardCtrl')









  //leaderboard

const testFunc = async function (req, res) {
   const user_id = "r6836r38756835738957398";
   const user_name = "gagan";
   const awarded_marks = 43;


   const count = await db.collection(`lb_all`).countDocuments({ id: user_id })
  
   if (count > 0) {
      await db.collection(`lb_all`).findOneAndUpdate({ id: user_id }, {
         $inc: {
            score: awarded_marks
         }
      })
   }
  
   else {

      await db.collection(`lb_all`).insertOne({
         id: user_id,
         user_id,
         user_name,
         score: awarded_marks,
         createdAt:Date.now(),
         display_picture: 'fskldjfksfj'

      })
    

   }

   return res.json({
      success:true
   })
   
}

module.exports={testFunc}