const {Comment, Image} = require('../model/Index.js')

module.exports = {
    async newest(){
      const comments = await Comment.find().limit(5).sort({created_at:-1})
      for(const comment of comments){
          const image =  await Image.findOne({_id:comment.image_id})
          comment.image = image
      }

      return comments
    }
}