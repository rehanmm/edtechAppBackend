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
module.exports=homeData


