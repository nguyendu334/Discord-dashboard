import axios from 'axios';
import { DISCORD_API_URL } from '../../utils/constants';
import { PartialGuild } from '../../utils/types';
import { User } from '../../database/schemas';

export async function getBotGuildsService() {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${TOKEN}` },
    });
}

export async function getUserGuildsService(id: string) {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
    });
}

export async function getMutuaGuildsService(id: string) {
    const { data: botGuilds } = await getBotGuildsService();
    const { data: userGuilds } = await getUserGuildsService(id);

    const adminUserGuilds = userGuilds.filter(({ permissions }) => (permissions & 0x8) === 0x8);

    return adminUserGuilds.filter((guild) => botGuilds.some((botGuild) => botGuild.id === guild.id));
}

export function getGuildService(id: string) { 
    return axios.get<PartialGuild>(`${DISCORD_API_URL}/guilds/${id}`, {
        headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
    });
}