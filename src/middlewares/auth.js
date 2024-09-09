import jwt from 'jsonwebtoken';


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
        req.user = { id: data.id }; // Adiciona o ID do usuário ao request
        next();
    } catch (error) {
     
        return res.status(401).json({ message: "Não autorizado" });
    }
}
