// where = {questin_id:filter.question_id};
// query=find(where)
//


/*
##  $Answers list search in body and head 
if search keywords not provided then return all answers
if search keywords provided then return all answers that match the keywords


##simple pagination
if page not provided then return page 1
if limit not provided then return 10 answers per page
if page and limit provided then return answers per page

*/

//## sort ke bhi condition pass karna hai
paginationAndSearch = async (where,{limit,page},Model,res) => {  

const query= Model.find(where)  
 page = parseInt(page) || 1;
const pageSize = parseInt(limit) || 10;
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
    page,
    pages,
    count: result.length,
    data: result
});

}
module.exports=paginationAndSearch
