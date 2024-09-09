import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const verifyToken = promisify(jwt.verify);

const refreshSession = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: 'Refresh token is required' });
  }

  try {
    // Verifique o refresh token
    const decoded = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Obtenha o usuário associado ao token
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }


    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m', 
    });

    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

export default { refreshSession };
