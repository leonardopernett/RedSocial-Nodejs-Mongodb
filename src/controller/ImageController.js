const controller = { }
const path       = require('path')
const fs         = require('fs-extra')
const md5        = require('md5')
const {Image, Comment}    = require('../model/Index.js')
const sidebar = require('../helpers/sidebars')

controller.create = async (req,res)=> {
    const ext = path.extname(req.file.originalname)
    if(ext === '.jpg' ||ext === '.png' || ext === '.jpeg'){
        
      const img = new Image({
            title:req.body.title,
            description:req.body.description,
            filename:req.file.filename
        })
       await img.save()
        res.redirect('/')

    }else {
       await fs.unlink(path.resolve('./src/public/uploads/'+req.file.filename))
       res.status(500).json({message:'only image are allowed, please '})
    } 
}

controller.index = async (req,res)=>{
    let viewModel = {images:[], comments:[]}
    const images = await Image.findOne({filename :{$regex:req.params.image_id}})
    if(images){
        images.views ++
        await images.save()
        viewModel.images = images
        const comments = await Comment.find({image_id:images._id});
        viewModel.comments = comments
       viewModel = await sidebar(viewModel)
     
        res.render('image.hbs', viewModel)
    }else {
        res.redirect('/')
    }
}

controller.comment = async(req,res)=>{
   const image = await Image.findOne({filename:{$regex:req.params.image_id}})
   if(image){
    const comment = new Comment(req.body)
    comment.gravatar = md5(comment.email)
    comment.image_id = image._id;
     await comment.save();
     res.redirect('/image/'+image.UniqueID)
   }else {
    res.redirect('/')
   }
  
}

controller.like = async (req,res)=>{
   const image =  await Image.findOne({filename: {$regex:req.params.image_id}})
   if(image){
       image.likes ++ ;
       await image.save();
      res.json({like: image.likes})
   }
}

controller.remove = async (req,res)=>{
    const image = await Image.findOne({filename: {$regex:req.params.image_id}})
   if(image){
     await fs.unlink(path.resolve('./src/public/uploads/'+image.filename))
     await Comment.deleteOne({image_id:image._id})
     await image.remove();
     res.json(true)
   }
}
module.exports = controller