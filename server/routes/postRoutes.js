import  express  from "express";
import * as dotenv from 'dotenv';
import cloudinary from 'cloudinary';

import Post from '../mongoDB/models/post.js';

dotenv.config();

const router=express.Router();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
  });

  router.route("/").get(async (req, res)=>{

    try {
        const posts = await Post.find({});
        res.status(201).json({success:true, data:posts});
        
    } catch (error) {
        res.status(501).json({success:false, data:error});
    }
  })
  router.route("/").post(async (req, res)=>{

    try {
       const {name , prompt , photo}=req.body;
       
       const photoUrl= await cloudinary.uploader.upload(photo); 
       console.log(photoUrl);
        
       const newPost = await Post.create({
        name,
        prompt,
        photo:photoUrl.url,
       })

       
       res.status(201).json({success:true, data:newPost});
    } catch (error) {
        res.status(501).json({success:false, message:error});
    }
  })

export default router;