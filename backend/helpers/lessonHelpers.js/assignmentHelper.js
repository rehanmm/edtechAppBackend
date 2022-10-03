
exports.paginationAndSearch = async (where, { limit, page }, Model, res) => {  

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
    result = await query.skip(skip).limit(pageSize).sort({'createdAt':-1}).select('-bucket_name').lean();
    res.json({
        success: true,
      
       
        data: {
            page,
            count: result.length,
            pages,
           assignments:result
        }
    });
    
    }