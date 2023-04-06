const jwt = require('jsonwebtoken');


const generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        let payload = {uid, name};

        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '3h' },
            (error, token) => {
                if(error){

                    console.log(error);
                    reject('ERROR: no se ha generado el token.');

                } else {

                    resolve(token);

                };
        });

    });

}; //!FUNC-CREATEJWT


module.exports = generateJWT;