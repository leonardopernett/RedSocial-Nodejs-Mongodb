const {Image, Comment} = require('../model/Index.js')

async function ImageTotal(){
   return await Image.countDocuments();
}

async function CommentCount(){
   return await Comment.countDocuments();
}
 
async function ImageTotalViewCount(){
   const result = await Image.aggregate([{$group:{
        _id:'1',
        viewTotal:{$sum: '$views'}
    }}])
    return result[0].viewTotal
}

async function ImageLikeTotalCount(){
   const result= await Image.aggregate([{$group:{
        _id:'1',
        likeTotal: {$sum:'$likes'}
    }}])

    return result[0].likeTotal;
}

module.exports = async()=>{

    const result = await Promise.all([ 
        ImageTotal(),
        CommentCount(),
        ImageTotalViewCount(),
        ImageLikeTotalCount()
    ])

    return {
        images: result[0],
        comments: result[1],
        views:result[2],
        likes:result[3]
    }

    
}