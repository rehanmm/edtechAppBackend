class homeData{
    constructor(user,course)
    {
        this.is_anonymous_login=user.is_anonymous
        this.active_quote=course.quote
        this.last_lesson=user.last_lesson
        this.last_unit=user.last_unit
        this.completed_lessons=user.lessons_completed
        this.total_lessons=course.total_lessons
        this.course_title=course.name
        this.course_description=course.description
        this.tags=course.tags
        this.units=course.units
        this.headline=course.headline
    

    }
}

// const home =new homeData({is_anonymous:true},{quote:'apki nazro ne samjha'})

// console.log(home);


class longUnitToShort{
    constructor(unit){


        this.unit_title=unit.unit_name
        this.tags=unit.tags
        
        this.total_lessons=unit.total_lesson
        this.completed_lessons=unit.completed_lessons||0
        this.is_paid= unit.is_paid,
        this.is_locked=unit.is_paid,
        this.unit_id=unit._id
        this.image_url=unit.image_url;
        this.prerequisite=unit.prerequisite
        
    }

    
    
}



class unitData{
    
// counter(){
//     let video=0,article=0,assignment=0,events=0,payment=0;
//     console.log(this)
//   for(let i=0;i<this.lessons.length;i++){
//   let type=this.lessons[i].type
//        if(type==='video'){ video++;}
//   else if(type==='article') {article++;}
//   else if(type==='assignment') {assignment++;}
//   else if(type==='events') {events++;}
//   else if(type==='payment') {payment++;}
  
  
//   }
  
  
//   }
    constructor(unitProgress)
    {
        // const numberOfLessonCompleted=
        if(!unitProgress)
      {
          this.completed_lessons=0
        this.has_user_started=false
        this.has_user_purchased=false
        this.assignments=[]
        this.start_at={}

        // this.compleion
    }else{
        this.completed_lessons=unitProgress.completed_lessons.length
        this.has_user_started=unitProgress.has_user_started||false
        this.has_user_purchased=unitProgress.has_user_purchased||false
        this.assignments=unitProgress.assignments||[]
        this.start_at={}

        //     this.unit_title=unit.name||''
        //     this.tags=unit.tags
        //     this.lessons=course.lessons
        //    this.completion=this.completion||false
    }
}




}



class longLessonToShort{
constructor(lesson){
this.lesson_id=lesson._id
this.type=lesson.type
this.title=lesson.title
this.thumbnail_url=lesson.thumbnail_url
this.description=lesson.description
this.is_completed=false//from progress model
this.prerequisite=lesson.prerequisite
this.index=null //from previous lesson index in array
this.is_locked=lesson.is_locked


}


}



module.exports={homeData,longUnitToShort,longLessonToShort,unitData}  