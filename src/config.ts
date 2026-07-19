import 'dotenv/config';

function required (key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing env variable ${key}`);
    }
    return value;
}

export const config = {
    botToken: required('BOT_TOKEN'),
    databaseUrl: required('DATABASE_URL'),
    isDev: process.env.NODE_ENV !== 'production',
};