import jwt from "jsonwebtoken"

const generateJTW = (uid = '')=>{
    return new Promise((resolve, reject)=>{
        const payload = {uid}

        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn:'100d'
        },(err, token)=>{
            if(err){
                console.log(err);
                reject('Couldnt generate token')
            }else{
                resolve(token)
            }
        })
    })
}

export {
    generateJTW
}