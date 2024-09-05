const express = require("express");
const app = express();
const cors = require ("cors");

app.use(express.json());
app.use(cors())

const db = require("./models");

// Routers
const postRouter = require('./routes/posts');
app.use("/posts", postRouter);

const commentRouter = require('./routes/comments');
app.use("/comments", commentRouter);

const userRouter = require('./routes/users');
app.use("/users", userRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001...");
    });
});
