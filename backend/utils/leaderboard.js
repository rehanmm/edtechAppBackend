 const 

class Leader{

    constructor(){
        this.leaderboard =leaderboardId
    }

}

list(leaderboardId, opts = { limit ,page}) {
    let skip,total,pages,pageSize,data,page;
    page=opts.page
    const func=async ()=>{
    
         pageSize = parseInt(opts.limit) || 10;
         skip = (opts.page - 1) * pageSize;
         
        total =await LeaderBoard.getCollection(leaderboardId).estimatedDocumentCount();
        pages = Math.ceil(total / pageSize);
       data= await this.getCollection(leaderboardId).
                    find({}).
                    project({ _id: 0 }).
                    skip(skip).
                    sort({ score: -1 }).
                    limit(opts.limit).
                    toArray()
    
                    
    
                    return { 
                        page,
                        total,
                        pages,
                        data
                    }
    }
 


getCollection(leaderboardId) {
    return this.db.collection(`lb_${leaderboardId}`);
}