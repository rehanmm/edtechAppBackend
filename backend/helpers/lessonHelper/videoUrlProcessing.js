
class video{
    constructor(video_id){
        this.video_id=video_id;
    }

    getStringQuality(quality){
        if(quality=="360"){
            return "Low Quality";
        } 
        else if(quality=="480"){
            return "Medium Quality";
        }   
        else if(quality=="720"){
            return "High Quality";
        }

    }

    getVideoObject(quality){
        return {
            title:getStringQuality(quality),
           quality:  quality+"p",
            url:`https://quasar-edtech-stream.s3.amazonaws.com/${this.video_id}_${quality}.m3u8`};
    }


}

module.exports=video;