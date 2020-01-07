const controller = { }
const {Image}    = require('../model/Index.js')
const sidebar =  require('../helpers/sidebars.js')


controller.index = async (req, res) => {
    const images =  await Image.find().sort({created_at:-1})
    let viewModel = { images: [] };
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    console.log(viewModel)
    res.render('index.hbs', viewModel);
}

module.exports = controller