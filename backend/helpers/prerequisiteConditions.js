module.exports=function(user,unitPrerequisite){
    const { units_completed } = user;
    const current_time = Date.now()
    // console.log(unitPrerequisite);
    const { has_prerequisite, on, time, message } = unitPrerequisite
// console.log(has_prerequisite);
    if (has_prerequisite) {
//  console.log(units_completed);


        const lessonObj = units_completed.find(item => item[on] != undefined);
        
        
        
        
        // console.log(unit);
        if (lessonObj) {
            
            const completed_time = lessonObj[on] // here the extracted value is by key
            

                let difference = current_time - completed_time;
                difference = difference/(1000*60)
                // console.log(difference)
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
