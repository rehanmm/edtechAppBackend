

 module.exports=function diffInDays(finalDate,initialDate)
 {
    milliToDay=1000*60*60*24
    finalDate= Date.parse(finalDate);
    return (finalDate-initialDate)/(milliToDay)
 }

