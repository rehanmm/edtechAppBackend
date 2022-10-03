


 const checker = function (lessons, completed_lessons) {
    return  lessons.every((v, i) => {
      
    
        const condition = completed_lessons.some((v2) => {
              return v.lesson_id in v2
          })
      
          if (condition) {
              return true
          } else {
              return false
          };
      })
}
  
module.exports = {checker}