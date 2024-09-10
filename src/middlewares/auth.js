import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function auth(req, res, next) {
    const { authorization } = req.headers;
    console.log('Authorization Header:', authorization);

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Não autorizado" });
    }

    const token = authorization.replace('Bearer ', '').trim();
    console.log('Token:', token);

    try {

        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
       
        req.user = { id: data.id }; 
        next();
    } catch (error) {
     
        return res.status(401).json({ message: "Não autorizado" });
    }
}
