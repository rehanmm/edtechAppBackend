 
const Question= require('../models/answerModel');

paginationAndSearch = async (filter,Model,res) => { 
let where = {questin_id:filter.question_id};
if (filter.keyword) {
    where = {$text: {$search:filter.keyword}}
}     
let query = Model.find(where);
const page = parseInt(filter.page) || 1;
const pageSize = parseInt(filter.limit) || 10;
const skip = (page - 1) * pageSize;
const total = await Model.countDocuments(where);
const pages = Math.ceil(total / pageSize);

if (page > pages) {
    return res.status(404).json({
        success: "true",
        message: "No page found",
    });
}
result = await query.skip(skip).limit(pageSize).sort({'createdAt':-1}).lean();
res.json({
    success: true,
    filter,
    page,
    pages,
    count: result.length,
    data: result
});

}
module.exports=paginationAndSearch
