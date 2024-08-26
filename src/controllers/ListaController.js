import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default {
    async createList (req,res){
        const { titulo, descricao} = req.body;

        let task = await prisma.task.firs

    }
}