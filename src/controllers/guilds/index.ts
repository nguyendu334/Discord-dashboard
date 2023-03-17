import { Request, Response } from 'express';
import { User } from '../../database/schemas/User';
import { getBotGuildsService, getMutuaGuildsService, getUserGuildsService } from '../../services/guilds';

export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as User;
    try {
        const guilds = await getMutuaGuildsService(user.id);
        res.send({ guilds });
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: 'Error' });
    }
}
