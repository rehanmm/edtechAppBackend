module.exports=function(user,unitPrerequisite){
    const { units_completed } = user;
    const current_time = Date.now()
    // console.log(unitPrerequisite);
    const { has_prerequisite, on, time, message } = unitPrerequisite
// console.log(has_prerequisite);
    if (has_prerequisite) {
//  console.log(units_completed);

        units_completed.forEach(function (unit) {
            // let on='62ecf6772d0f69f9c00d56c2'
            console.log(unit[on]);
            
            
            // console.log(unit);
            if (unit[on]) {
                completed_time = unit[on];

                let difference = current_time - completed_time;
                difference = difference/(1000*60)
                if (difference >= time) {
                  
            return false;

                }else{
                    return true;
                }



            }


        })


    }else{
       
       return false; 
    }

}
