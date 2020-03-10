import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/server/group', controller.groupController.create);
  router.get('/server/group/search', controller.groupController.search);
  router.get('/server/group/count', controller.groupController.count);
  router.post(
    '/server/account/register',
    controller.accountController.register
  );
  router.post('/server/account/login', controller.accountController.login);
  router.put(
    '/server/account/password',
    controller.accountController.changePassword
  );
  router.get('/server/account/search', controller.accountController.search);
  router.post('/server/team', controller.teamController.create);
  router.post('/server/team/member', controller.teamController.addTeamMember);
};
