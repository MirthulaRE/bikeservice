const Product =require('../models/Service');
    exports.getProducts = (req,res,next) => {
    res.status(200).json(
        {
            success: true,
            message:"Services added"
        }
    )
}

exports.newProduct = (req,res,next)=> {
    Product.create(req.body)

}