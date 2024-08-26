import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default {
    async createTask (req,resp){
        const { titulo, descricao, userId} = req.body;

        try {
            let task = await prisma.task.findFirst({where:{titulo, userId}})
            if(task){
                return resp.json({
                    error:true,
                    message:'Erro, titulo já existe!',

                })
            }
            task = prisma.task.create({
                data:{
                    titulo,
                    descricao,
                    userId
                }
            })
            return resp.json({
                error:false,
                message:"Tarefa criada com súcesso",
                task
                
            })
        } catch (error) {
            return resp.json({ message: error.message })
            
        }

    },
    async listTaskAll (req,resp){
        const { userId} = req.params
        try {
            let task = await prisma.task.findMany({
                where:{userId}
            })

            if(!task){
                return resp.json({
                    error:true,
                    message:'Não há tarefas criada'
                })
            }

            return  resp.json({
                error:false,
                message:'Tarefas listada com sucesso',
                task
            })
        } catch (error) {
            return resp.json({ message: error.message })
        }
    },
async findListTask (req,resp){
    const { id} = req.params
    try {
        let task = await prisma.task.findUnique({where:{id:parseInt(id)}})
        if(!task){
            return resp.json({
                error:true,
                message:"Tarefa não encontrada",
            })
        }
        return resp.json({
            error:false,
            message:'Tarefa encontrada',
            task
        })
    } catch (error) {
        return resp.json({ message: error.message })
    }
},
async updateTask(req,resp){
    const { id} = req.params;
    const{ titulo, descricao} = req.body;
    try {
        let task = await prisma.task.findUnique({where:{id:parseInt(id)}})
        if(!task){
            return resp.json({
               error:true,
               message:'Tarefa não encontrada' 
            })

        }
        task = await prisma.task.update({
            where:{id:parseInt(id)},
            data:{titulo, descricao}
        })
        return resp.json({
            error:false,
            message:'Atualizado com sucesso',
            task
        })
    } catch (error) {
        return resp.json({ message: error.message })
    }
},
async deleteTask(req,resp){
    const { id} = req.params
    try {
        let task = await prisma.task.findUnique({where:{id:parseInt(id)}})
        if(!task){
            return resp.json({
               error:true,
               message:'Tarefa não encontrada' 
            })

        }
        task = await prisma.task.delete({
            where:{id:parseInt(id)}
        })
        return resp.json({
            error:false,
            message:'Deletado com sucesso',
            task
        })
    } catch (error) {
        return resp.json({ message: error.message })
    }
}
}