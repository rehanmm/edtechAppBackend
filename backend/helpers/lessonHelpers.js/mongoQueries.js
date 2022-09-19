const mongoose=require('mongoose');
const Lesson=require('../../models/lessonModel');

const lesson= Lesson.aggregate(
    [
        { "$group": {
            "_id": { "$toLower": "$type" },
            "count": { "$sum": 1 }
        } },
        { "$group": {
            "_id": null,
            "counts": {
                "$push": { "k": "$_id", "v": "$count" }
            }
        } },
        { "$replaceRoot": {
            "newRoot": { "$arrayToObject": "$counts" }
        } }   ,
     
    ] 
    )

    .then((result)=>{
        console.log(result);
    })






