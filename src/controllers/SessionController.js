import { PrismaClient } from "@prisma/client";

import { compare } from "bcrypt";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default {
    async createSession ( req,res)
{
try {
    const { email, password} = req.body;
    const user = await prisma.user.findUnique({where: {email}})
    if(!user){
        return  res.json({
            error:true,
            message:'Usuário ou senha incorretos'
        })
    }
    const checkPassowrd = await compare(password,user.password)

    if(!checkPassowrd){
        return res.json({
            error:false,
            message:"Usuário ou senha incorretos"
        })
    }

   const token = jwt.sign({where:user.id}, "698dc19d489c4e4db73e28a713eab07b",{
    expiresIn:'1d'
   })
   delete user.password

   return res.json({
    error:true,
    message:"Login efetuado com sucesso. Aguarde...!",
    user, 
    token 
   })
} catch (error) {
return response.json({ message: error.message })
}
}}