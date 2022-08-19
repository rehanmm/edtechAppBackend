
class video{
    constructor(video_id){
        this.video_id=video_id;
    }

    getStringquality(quality){

    }

    getVideoUrl(quality){
        return {
            title:"High Quality",
           quality:  quality+"p",
            url:`https://quasar-edtech-stream.s3.amazonaws.com/${this.video_id}_${quality}.m3u8`};
    }


}