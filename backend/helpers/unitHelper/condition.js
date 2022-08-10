// requiring files  and library



// condition
const onlyLesson=lesson_id&&!unit_id
const onlyunit=lesson_id&&!unit_id
const nothingProvided=!lesson_id&&!unit_id


//condtion logic for function
if(onlyLesson){
getFullLessonDetail
}
else if(onlyunit){
    checkPrerequisite(arg,callback)
    nextLessonUserHasToComplete
}
else if(nothingProvided){
    checkPrerequisite(arg,callback)
    lastLessonFetchByTheUser(lessons_completed)
    const lastValue = Object.values(lessons_completed).pop();
}


// prerequisiteFunction

module.exports=function(unitProgress,prerequisite,callback){
    const {completed_lessons} = unitProgress;
    const current_time = Date.now()
    // console.log(unitPrerequisite);
    const { has_prerequisite, on, time, message } = prerequisite
// console.log(has_prerequisite);
    if (has_prerequisite) {
//  console.log(units_completed);
     
            // let on='62ecf6772d0f69f9c00d56c2'
            // console.log(unit[on]);
            if (completed_lessons.hasOwnProperty(on)) {
                completed_time = unit[on];

                let difference = current_time - completed_time;
                difference = difference/(1000*60)
                if (difference >= time) {
                  
            return false;

                }else{
                    return true;
                }



            }else{
return false
            }


        


    }else{
       
       return false; 
    }

}



function lastLessonFetchByTheUser(completed_lessons){
    let lastKey = Object.keys(completed_lessons).pop()
    let lastValue = animals[Object.keys(completed_lessons).pop()]
return {lesson_id:lastKey}
           
}