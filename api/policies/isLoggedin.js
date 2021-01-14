module.exports = async (req, res, next) => {

    if(!req.headers || !req.headers.authorization)
    return res.badRequest({message: 'Authorization headers are missing', success: false});

    const tokenParam = req.headers.authorization;
    const tokenValid = JWTservice.verify(tokenParam);
    const user = await Registration.findOne({
        id: tokenValid.id
    });

    if(!user)
    return res.badRequest({message: 'Unauthorized', success: false});

    req.user = user.id;

    next();
}