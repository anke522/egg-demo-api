import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/server/group', controller.groupController.create);
  router.post(
    '/server/account/register',
    controller.accountController.register
  );
  router.post('/server/account/login', controller.accountController.login);
  app.put(
    '/server/account/password',
    controller.accountController.changePassword
  );
};
