import { config } from 'dotenv';
config();
import express, { Express } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import routes from '../routes';
require('../strategies/discord');

export function createApp(): Express {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
        cors({
            origin: ['http://localhost:3000'],
            credentials: true,
        }),
    );

    app.use(
        session({
            secret: 'secret',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            },
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', routes);
    return app;
}
