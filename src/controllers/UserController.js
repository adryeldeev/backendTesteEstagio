import { PrismaClient } from "@prisma/client";

import { hash } from "bcrypt";

const prisma = new PrismaClient()

export default {
    async createUser(req, resp){
        const {name, email, password} = req.body;

        try {
            let user = await prisma.user.findUnique({where:{email}})
            if(user){
                return resp.json({
                    error:true,
                    message:"Erro:Usuário já existe!"
                })
            }
        const  HashPassword = await hash(password,8)            
         user = await prisma.user.create({
            data:{
                name,
                email,
                password:HashPassword
            }
         }) 

         return resp.json({
            error:false,
            message:"Sucesso: Usuário cadastrado com sucesso!",
            user
         })  
        } catch (error) {
            return resp.json({ message: error.message })
        }
    },
    async findAllUser(req,resp){
        try {
            const user = await prisma.user.findMany()
            return resp.json(user)
        } catch (error) {
  return response.json({ message: error.message })
        }
    },

    async findUser(req,resp){
        try {
            const { userId} = req.params;
            const user = prisma.user.findUnique({
                where:{ìd:Number(userId)}
            })
            delete user.password
            return resp.json(user)
        } catch (error) {
            return resp.json({ message: error.message })
        }
    }
}



