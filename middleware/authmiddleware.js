const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

function authenticateToken(req, res, next)  {
   const token = req.headers["authorization"];
   if (token == null)
   return res.sendStatus(401);

   jwt.verify(token,
    process.env.ACCESS_TOKEN_SECRET, (err,
        user) => {
            if (err)
            return res.sendStatus(403);
            req.user = user;
            next();
        });
}


function authorizeUser(req, res, next) {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.sendStatus(403);
    }
}

app.post("/login", (req, res) => {
    const username = req.body.username;
    const user = { username: username,
    role: "admin" };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
});

app.post("/logout", (req, res) => {
    res.sendStatus(200);
});


app.get("/protected",
 authenticateToken, authorizeUser, (req, res) => {
    res.json({ message: "This is a protected route. " });
 });

 app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
 });