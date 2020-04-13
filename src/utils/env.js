const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const TEST = 'test';
const env = {
    isTest: process.env.NODE_ENV === TEST,
    isDev: process.env.NODE_ENV === DEVELOPMENT,
    isProd: process.env.NODE_ENV === PRODUCTION,
};
export default env;
