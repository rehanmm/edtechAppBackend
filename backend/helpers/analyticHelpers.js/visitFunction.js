const mongoose=require('mongoose')
const Analytics = require('../../models/analyticsModel')


module.exports= async (route)=>{
const date=getDate()
const count=1;
const  visits=[{
 route,
 count
}]

const analytics=await Analytics.findOne({date})

if(!analytics){
Analytics.create({
    date,
    visits
})
    

}
else{

const index=analytics.visits.findIndex(visit=> visit.route === route)
 if(index=-1){
      
        analytics.visits.push({
            route,
            count
        })
    
    }
else{
    
        analytics.visits[index].visits.count++;
    
    }



}


await analytics.save()


}


function getDate(){
  
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const nowDate = mm + '/' + dd + '/' + yyyy;
    return nowDate
    
}
