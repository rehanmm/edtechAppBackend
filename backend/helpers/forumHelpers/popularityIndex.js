
//  function toTimestamp(strDate){
//     var datum = Date.parse(strDate);
//     return datum;
//  }

 module.exports=function diffInDays(finalDate,initialDate)
 {
    milliToDay=1000*60*60*24
    finalDate= Date.parse(finalDate);
    initialDate= Date.parse(initialDate);
    return (finalDate-initialDate)/(milliToDay)
 }

