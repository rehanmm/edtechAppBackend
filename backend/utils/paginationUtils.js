

module.exports = async function(queryOn,page,limit,res)
{
const page = parseInt(page) || 1;
const pageSize = parseInt(limit) || 10;
const skip = (page - 1) * pageSize;
const total = await queryOn.countDocuments(where);
const pages = Math.ceil(total / pageSize);
if (page > pages) {
    return res.status(404).json({
        success: true,
        message: "No page found",
    });
}
result = await queryOn.find({}).skip(skip).limit(pageSize).sort({'createdAt':-1}).lean();
res.json({
    success: true,
    filter,
    count: result.length,
    page,
    pages,
    data: result
});

}