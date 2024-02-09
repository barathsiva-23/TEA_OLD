const jwt = require("jsonwebtoken");
const collection = require("../src/config");

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,'Tea venum mamey',(err,decodedtoken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodedtoken);
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}

const checkuser = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,'Tea venum mamey', async (err,decodedtoken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedtoken);
                let user = await collection.findById(decodedtoken.id);
                if(user){
                    console.log("yess found");
                }else{
                    console.log("not found");
                }
                res.locals.user = user;
                console.log(user);
                next();
            }
        })
    }
    else{
        res.locals.user = null;
        next();
    }
}

module.exports = {requireAuth,checkuser};