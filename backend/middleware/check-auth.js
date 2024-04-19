const HttpError = require("../models/http-error");
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) =>{
    try{
        const token =  req.headers.authorization.split('')[1];
        if(!token){
            throw new HttpError("Authentication failed!");
        
        }
        const decodedToken=jwt.verify(token, 'supersecret_dont_share');
        req.userData = {userId:decodedToken.userId};
        next();

    }catch(err){
        const error = new HttpError('Authentication error', 401);
        return next(error);

    }
    
    
};