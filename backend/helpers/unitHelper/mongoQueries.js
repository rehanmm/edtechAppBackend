const mongoose=require('mongoose');
const Unit=require('../../models/unitModel');
const  Lesson=require('../../models/lessonModel');
const { result } = require('lodash');
// {
// let countLesson;
//  Lesson.aggregate(
//     [
//         { "$project": {
//             "_id":0,
//             "unit_id":1,
//             "type":1
//         } },{
//             "$group": {
//                 _id: {unit_id:"$unit_id",type:"$type"},
//                 type: { $first: '$type' },
//                 count: { $sum: 1 }
//         }
//     }
//        ,{
//             "$group": {
//                 _id:"$_id.unit_id",
//                 "counts": {
//                     "$push": { "k": "$type", "v": "$count" }
//         }
//     }
// },
// { $project: { 
//     _id: 1,
//     result: { $arrayToObject: "$counts" } } 
//      },
    
//     ]    )

//     .then((result)=>{
//        countLesson=result;
//     })
// }



const unitLessonTypeCount = async function (unitId) {
    let [count] = await Lesson.aggregate(
        [
            {
                $match: { unit_id: unitId }
            },
            {
                "$project": {
                    "_id": 0,
                    "unit_id": 1,
                    "type": 1
                }
            }, {
                "$group": {
                    _id: { unit_id: "$unit_id", type: "$type" },
                    type: { $first: '$type' },
                    count: { $sum: 1 }
                }
            }
            , {
                "$group": {
                    _id: "$_id.unit_id",
                    "counts": {
                        "$push": { "k": "$type", "v": "$count" }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    result: { $arrayToObject: "$counts" }
                }
            },
    
        ])

    const obj = {
        total_events: 0,
        total_articles: 0,
        total_payment: 0,
        total_test: 0,
        total_video: 0
    };
    if (!count) return obj;
   obj.total_events=count.result.event||0
   obj.total_articles=count.result.article||0
   obj.total_payment =count.result.payment||0
    obj.total_test= count.result.test||0
    obj.total_video=count.result.video||0

return obj;
}
   

module.exports=unitLessonTypeCount;




