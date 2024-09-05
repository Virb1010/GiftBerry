const express = require('express');
const router = express.Router();
const { users } = require("../models")
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken")

router.get("/", async (req, res) => {
    try {
        const userList = await users.findAll()
        res.json(userList);
    }
    catch(error) {
        res.send(error)
    }
});

router.get("/byUsername/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const user = await users.findOne({where: { username: username } })
        res.json(user);
    }
    catch(error) {
        res.send(error)
    }
}); 

router.post("/", async (req, res) => {
    try{
        const { username, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const user = await users.create({
            username: username,
            password: hash
        });

        const accessToken = sign({
            username: user.username,
            id: user.id
        },
        "tokenSecret"
        )
        
        res.json({token: accessToken,
            username: username,
            id: user.id})

      }
      catch(error)
      {
          res.send(error);
      }
});

router.post("/login", async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await users.findOne({where: { username: username } })
        if (!user) {
            res.json({error: "Username is incorrect"})
        } else {
            bcrypt.compare(password, user.password).then((correctPW) => {
                if (!correctPW) {
                    res.json({error: "Password is incorrect"})
                } else {
                    const accessToken = sign({
                        username: user.username,
                        id: user.id
                    },
                    "tokenSecret"
                    )
                    res.json({token: accessToken,
                            username: username,
                            id: user.id})
                }
            })
        }        
      }
      catch(error)
      {
        res.send(error);
      }
});

router.patch("/:user", async (req, res) => {
    try{
        const userParam = req.params.user;
        const { name, birthday, interests } = req.body;
        const user = await users.findOne({where: { username: userParam } })
        if (!user) {
            res.json({error: "Username is incorrect"})
        } else {
            user.name = name;
            user.birthday = birthday;
            user.interests = interests;
            await user.save();
            res.json("success");
        }        
      }
      catch(error)
      {
        res.send(error);
      }
});





module.exports = router;