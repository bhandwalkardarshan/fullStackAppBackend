// // Authentication middleware should be there to authenticate the user, for all the restricted routes.
// const jwt = require("jsonwebtoken")


// const authentication =(req,res,next)=>{
//     const token=req.headers.as
// if(token){
//         jwt.verify(token,'masai',(err,decode)=>{
// if(decode){
//     req.body.user =decode.userID
//     next()
// }else{
//     res.send({"msg":"please login first"})
// }
//      })
//     }else{
//         res.send({"msg":"plz login"})
//     }
// }

// module.exports={
//     authentication
// }

const jwt = require("jsonwebtoken")
const authentication = (req,res,next)=>{
    const token = req.headers.as
    // console.log(token)
    if(token){
        jwt.verify(token, 'masai', function(err, decoded) {
            if(decoded){
                req.body.userId = decoded.userId
                next()
            }
            else {
                res.send({"msg":"Please login first"})
            }
          })
    }
    else {
        res.send({"msg":"Please login"})
    }
}

module.exports = {authentication}