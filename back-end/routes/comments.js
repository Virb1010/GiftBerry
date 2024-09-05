const express = require('express');
const router = express.Router();
const { comments } = require("../models")

router.get("/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        console.log(`Received postId: ${postId}`);
        const commentList = await comments.findAll({where: {postId: postId} })
        console.log('Database results:', commentList); 
        res.json(commentList);
    }
    catch(error) {
        res.send(error)
    }
}); 

router.post("/", async (req, res) => {
    try{
        const comment = req.body;
        await comments.create(comment);
        res.json(comment);
      }
      catch(error)
      {
          res.send(error);
      }
});

module.exports = router;