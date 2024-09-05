const express = require('express');
const router = express.Router();
const { posts } = require("../models")

router.get("/", async (req, res) => {
    try {
        const postList = await posts.findAll()
        res.json(postList);
    }
    catch(error) {
        res.send(error)
    }
}); 

router.get("/byID/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await posts.findByPk(id)
        res.json(post);
    }
    catch(error) {
        res.send(error)
    }
}); 

router.post("/", async (req, res) => {
    console.log("post post hit")
    try{
        const post = req.body;
        await posts.create(post);
        res.json(post);
      }
      catch(error)
      {
          res.send(error);
      }
});


module.exports = router;