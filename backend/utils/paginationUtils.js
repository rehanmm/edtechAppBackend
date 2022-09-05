

module.exports = async function(filter,Model,res)
{
   const where={}
const page = parseInt(filter.page) || 1;
const pageSize = parseInt(filter.limit) || 10;
const skip = (page - 1) * pageSize;
const total = await Model.countDocuments(where);
const pages = Math.ceil(total / pageSize);
if (page > pages) {
    return res.status(404).json({
        success: true,
        message: "No page found",
    });
}
result = await Model.find({}).skip(skip).limit(pageSize).sort({'createdAt':-1}).lean();
res.json({
    success: true,
    filter,
    count: result.length,
    page,
    pages,
    data: result
});

}