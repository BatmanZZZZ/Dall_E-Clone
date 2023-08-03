import express from "express";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";

import Post from '../mongoDB/models/post.js';

dotenv.config();

const router = express.Router();



const configuration = new Configuration({
    organization:"org-FyWGamF06GIG8DFb88kvXUhJ",
    apikey: process.env.OPENAI_API,
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.send('Hello from OpenAI dalle');
});

router.route('/').post(async(req,res)=>{
    try {
        const {prompt}=req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size:'1024x1024',
            response_format:'b64_json',
        },
        {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.OPENAI_API}`,
            },
          });

        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({photo:image});
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
})

export default router;
