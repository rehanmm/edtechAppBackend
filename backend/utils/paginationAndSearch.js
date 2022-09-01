 
let where = {};
if (filter.keyword) {
    where = {$text: {$search: filter.keyword}}
}     
let query = Question.find(where);
const page = parseInt(req.body.page) || 1;
const pageSize = parseInt(req.body.limit) || 10;
const skip = (page - 1) * pageSize;
const total = await Question.countDocuments(where);
const pages = Math.ceil(total / pageSize);

if (page > pages) {
    return res.status(404).json({
        success: "true",
        message: "No page found",
    });
}
result = await query.skip(skip).limit(pageSize).sort({'createdAt':-1});
res.json({
    success: true,
    filter,
    count: result.length,
    page,
    pages,
    data: result
});
