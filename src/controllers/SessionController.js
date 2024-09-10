import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const createSession = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: 'Usuário ou senha incorretos',
      });
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        error: true,
        message: 'Usuário ou senha incorretos',
      });
    }

    const accessToken = jwt.sign({ id: user.id },  `process.env.ACCESS_TOKEN__SECRET`, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ id: user.id },  `process.env.ACCESS_TOKEN__SECRET`, {
      expiresIn: '7d',
    });

    delete user.password;

    return res.json({
      error: false,
      message: 'Login efetuado com sucesso. Aguarde...',
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

export default { createSession };
