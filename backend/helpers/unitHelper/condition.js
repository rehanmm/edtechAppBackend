

//condtion logic for function
// if(onlyLesson){
// getFullLessonDetail
// }
// else if(onlyunit){
//     checkPrerequisite(arg,callback)
//     nextLessonUserHasToComplete
// }
// else if(nothingProvided){
//     checkPrerequisite(arg,callback)
//     lastLessonFetchByTheUser(lessons_completed)
//     const lastValue = Object.values(lessons_completed).pop();
// }


// prerequisiteFunction
// module.exports=function(user,unitPrerequisite){
module.exports=function(unitProgress,lessonPrerequisite){
    // const { units_completed } = user;
    const { completed_lessons } = unitProgress;

    const current_time = Date.now()
    // console.log(unitPrerequisite);
    const { has_prerequisite, on, time, message } = lessonPrerequisite
// console.log(has_prerequisite);
    if (has_prerequisite) {
//  console.log(units_completed);

        
        const lessonObj =completed_lessons.find(item => item[on] != undefined);
        
        
        
        
        // console.log(unit);
        if (lessonObj) {
            
            const completed_time = lessonObj[on] // here the extracted value is by key
            

                let difference = current_time - completed_time;
                difference = difference/(1000*60)
                console.log(difference)
                if (difference >= time) {
                  
            return false;

                }else{
                    return true;
                }
 


            }else{
                return true
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