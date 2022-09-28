const {Schema}=require('mongoose')


const reviewSchema=new Schema({

    user_id:{
        type:mongoose.Schema.Type.objectId
    },
    user_name:{
type:String
    },
   unit_id:{
    type:mongoose.Schema.Type.objectId
   },
   unit_name:{
    type:String
   },
   stars:{
    type:Number
   },
   body:{
    type:String
   }

},
{
    timestamps:{createdAt:'created_at',updatedAt:'updated_at'}
}
)