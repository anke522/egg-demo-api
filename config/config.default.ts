import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582684854706_6603';

  // add your egg config in here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };
  config.middleware = ['auth'];
  config.authLogin = {
    ignore: ['/server/account/login', '/server/account/register']
  };
  config.cors = {
    credentials: true
    // origin: 'http://localhost:8080',
    // allowHeaders:'Content-Type,Content-Length, Authorization, Accept,X-Requested-With,Access-token',
    // allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
