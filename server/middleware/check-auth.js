const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token,"kiranpwr143@gmail.com");
        req.userId=decoded.subject;    //adding new field to decoded
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed...',
            error:error
        });
    }

   
};