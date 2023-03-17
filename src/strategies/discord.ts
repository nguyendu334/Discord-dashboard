import passport from 'passport';
import { Strategy, Profile } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';

import { User } from '../database/schemas';

passport.use(
    new Strategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            callbackURL: process.env.DISCORD_REDIRECT_URI,
            scope: ['identify', 'email', 'guilds'],
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            console.log(accessToken, refreshToken, profile);
            const { id: discordId } = profile;
            try {
                const existingUser = await User.findOneAndUpdate(
                    { discordId },
                    { accessToken, refreshToken },
                    { new: true },
                );
                console.log("🚀 ~ existingUser:", existingUser)
                if (existingUser) {
                    return done(null, existingUser);
                }
                const newUser = new User({
                    discordId,
                    accessToken,
                    refreshToken,
                });
                const savedUser = await newUser.save();
                return done(null, savedUser);
            } catch (error) {
                console.log(error);
                return done(error as any, undefined);
            }
        },
    ),
);
