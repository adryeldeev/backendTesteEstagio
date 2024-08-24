import jwt from 'jsonwebtoken'

export default function auth(req, resp, next){
    const {authorization} = req.headers;

    if(!authorization){
        return resp.json({message: "Não autorizado"}, 401)
    }

    const token = authorization.replace('Bearer', '').trim()
    try {
         const data = jwt.verify(token,'698dc19d489c4e4db73e28a713eab07b')
        const {id } = data;
        req.userId = id;
        } catch (error) {
        return resp.json({message:"Não autorizado"},401)
    }
}