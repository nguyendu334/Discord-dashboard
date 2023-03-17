import passport from 'passport';
import { Strategy, Profile } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';

passport.use(
    new Strategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            callbackURL: process.env.DISCORD_REDIRECT_URI,
            scope: ['identify', 'email', 'guilds'],
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            
        },
    ),
);
