const jwt = require('jsonwebtoken');


const verifyJWT = async (req, res, next) => {

    const token = req.cookies.token;
    console.log('TOKEN:', token);

    try {
        
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = user;

        next();

    } catch (error) {
        
        res.clearCookie('token');
        
        return res.redirect('/');

    };

};


module.exports = verifyJWT;