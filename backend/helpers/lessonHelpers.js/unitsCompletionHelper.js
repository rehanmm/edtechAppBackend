

 
const checker = function (lessons, completed_lessons) {
   
    let ans=false;
  return lessons.every((v, i) => {
       completed_lessons.forEach((v2) => {
            if (v.lesson_id in v2) {
                ans = true;
                return;
               
            }
            
          })
      return ans;
      })
}
  

module.exports = {checker}