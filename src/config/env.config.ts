export const EnvConf = () => ({
  envioremnt: process.env.ENV || 'dev',
  port: process.env.PORT || '3000',
});
