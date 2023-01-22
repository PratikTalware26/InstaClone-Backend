const express = require("express");
// var bodyParser = require("body-parser");
const router = express.Router();
const postModel = require("../Model/postModel");
const fileUpload= require("express-fileupload");
const path= require("path");

router.use(express.json());
router.use(fileUpload());


router.get("/posts",async (req, res)=>{
  try {
    const posts= await postModel.find();
    return res.status(200).json({
      status:"Success",
      result: posts
    })
    
  } catch (error) {
    return res.status(400).json({
      status:"Fail",
      message: error.message
    })
  }
})

//FOR IMAGES
router.get("/images/:img", (req,res)=>{
  res.sendFile(path.join(__dirname,"..",`/Image/${req.params.img}`));
})



router.post("/posts", (req, res) => {
  try {
    const { author, location, description } = req.body;
    const image = req.files.image
    // console.log(image.name)
    image.mv("./Image/" + image.name, async (err)=>{

      if(err){
        return res.json({message:err});
      }else{
       const userPost= await postModel.create({
        author,
        location,
        description,
        image: image.name
       })

       return res.json({
        status: "success",
        post: userPost
       })
        
      }
    })

  } catch (err) {
    return res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
});

module.exports = router;









//, upload.single("image")
// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../Backend/Image/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix =
//       Date.now() +
//       Math.round(Math.random() * 1e9) +
//       path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// const upload = multer({ storage: storage });

// router.get("/posts", async (req, res) => {
//   try {

//     const post = await postModel.find();

//     return res.status(200).json({
//       status:"Success",
//       data: post
//     });

//   } catch (err) {
//     return res.status(400).json({
//       status: "Failed",
//       message: err.message,
//     });
//   }
// });

