const jwt=require('jsonwebtoken');

export const TokenEncode=(email,user_id)=>{

    let KEY="123-ABC-XYZ";
    let EXPIRE={expiresIn: '24h'}
    let PAYLOAD={email:email, user_id:user_id}
    return jwt.sign(PAYLOAD,KEY,EXPIRE)


}

export const TokenDecode=(token)=>{


}