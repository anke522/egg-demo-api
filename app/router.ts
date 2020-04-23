import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/server/group', controller.groupController.create);
  router.get('/server/group/search', controller.groupController.search);
  router.get('/server/group/count', controller.groupController.count);
  router.post('/server/account/register', controller.accountController.register);
  router.post('/server/account/login', controller.accountController.login);
  router.put('/server/account/password', controller.accountController.changePassword);
  router.get('/server/account/search', controller.accountController.search);
  router.put('/server/account/avatar', controller.accountController.updateAvatar);
  router.get('/server/account/avatar', controller.accountController.avatar);
  router.get('/server/account/team', controller.teamController.allOwnTeam);

  router.post('/server/team', controller.teamController.create);
  router.post('/server/team/member', controller.teamController.addTeamMember);
  router.delete('/server/team/member', controller.teamController.deleteTeamMember);
  router.get('/server/team/repository', controller.repositoryController.searchByOrgId);
  router.get('/server/team/', controller.teamController.getTeam);

  router.post('/server/repository', controller.repositoryController.create);
  router.get('/server/repository/search', controller.repositoryController.search);

  router.get('/server/own/repository/', controller.repositoryController.searchOwn);
  router.get('/server/repository/module', controller.moduleController.findByRepositoryId);
  router.get('/server/repository/count', controller.repositoryController.count);
  router.get('/server/repository', controller.repositoryController.getRepository);

  router.delete('/server/module', controller.moduleController.remove);
  router.put('/server/module', controller.moduleController.update);
  router.post('/server/module', controller.moduleController.create);
  router.get('/server/module/interface', controller.interfaceController.searchByModuleId);

  router.post('/server/interface', controller.interfaceController.create);
  router.delete('/server/interface', controller.interfaceController.remove);
  router.put('/server/interface', controller.interfaceController.update);
  router.get('/server/interface/property', controller.propertyController.searchByItfId);

  router.post('/server/property', controller.propertyController.create);
  router.post('/server/properties', controller.propertyController.createBatch);

  router.all('api/mock/:repositoryId/:interfaceId', controller.mockController.mocking);
};
