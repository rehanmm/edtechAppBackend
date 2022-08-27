const filter = req.query;
let where = {};
if (filter.keyword) {
    where.head = { $regex: filter.keyword, $options: "i" }
}
let query = Question.find(where);
const page = parseInt(req.query.page) || 1;
const pageSize = parseInt(req.query.limit) || 10;
const skip = (page - 1) * pageSize;
const total = await Question.countDocuments(where);
const pages = Math.ceil(total / pageSize);
if (page > pages) {
    return res.status(404).json({
        success: true,
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
    data: {questions:result}
});