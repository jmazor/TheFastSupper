const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';
//TO-DO:
//This page probably should be somewhere else but i don't know where
//Also, should be referenced in modules.js for ease of access


exports.createToken = function ( userID, email )
{
    return _createToken( userID, email ).token;
}

//Sends a token using JWT_SECRET
//Lasts one hour
//ect.
_createToken = function ( userID, email )
{
    let ret;
    try
    {
        const accessToken = jwt.sign( 
            {userID : userID, email : email},
            JWT_SECRET,
            { expiresIn: '1h' });

        ret = {token : accessToken};
    }
    catch(e)
    {
        ret = {error : e.message};
    }
    return ret;
}

//checks if the token is unverified or expired
//True if verified
//False if unverified or expired
exports.isExpired = function( token )
{
    return jwt.verify( token, JWT_SECRET, 
    (err, verifiedJwt) =>
        {
            if( err )
            {
                return true;
            }
            else
            {
                return false;
            }
    });
}

//Like isExpired except mush more useful in practice
exports.returnUser = function( token )
{
    return jwt.verify( token, JWT_SECRET, 
    (err, verifiedJwt) =>
        {
            if( err )
            {
                return null;
            }
            else
            {
                return verifiedJwt.userID;
            }
    });
}

//Takes a token and makes a new one
//I can only assume this is to renew the expiration
//Maybe in the future use of 2 tokens, one as access to API and other to refresh the access token
//Both tokens have different JWT_Secrets, and the refresh token last much longer to refresh the access token
exports.refresh = function( token )
{
    let ud = jwt.decode(token, { complete : true });

    let userID = ud.payload.userID;
    let email = ud.payload.email;

    return _createToken( userID, email ).token;
}
  