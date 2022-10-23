
const errorHandler = require("../utils/errorHandler");
const isCourseManager = () => {
   const  isCourseManager = req.profile.role === 'course-manager';
    if (!isCourseManager) next(new errorHandler('unauthorized',401));
    next()
}
const isModerator= (req,res,next ) => {
    const isModerator = req.profile.role === 'moderator';
    if (!isModerator) next(new errorHandler('unauthorized',401));
    next()
    
}
const isAdmin= (req,res,next ) => {
   const  isAdmin = req.profile.role === 'admin';
    if (!isAdmin) next(new errorHandler('unauthorized',401));
    next()
    
}

const isAdminOrCourseManager = (req,res,next ) => {
   const  isAdmin = req.profile.role === 'admin';
   const isCourseManager = req.profile.role === 'course-manager';
    if (!(isAdmin || isCourseManager)) next(new errorHandler('unauthorized', 401));
    next()
    
}
const isAdminOrCourseManagerOrModerator = (req, res, next) => {
    console.log(req.profile);
   const  isAdmin = req.profile.role === 'admin';
    const isCourseManager = req.profile.role === 'course-manager';
    const isModerator = req.profile.role === 'moderator';
    if (!(isAdmin || isCourseManager||isModerator)) next(new errorHandler('unauthorized', 401));
    next()
    
}

module.exports={isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}
