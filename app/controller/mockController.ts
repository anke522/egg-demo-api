import AbstractController from './abstractController';
export default class InterfaceController extends AbstractController {
  async mocking() {
    const { repositoryId, url } = this.ctx.params;
    const method = this.ctx.request.method;
    const matchInterfaces = this.service.interfaceService.findAll({
      where: {
        repositoryId,
        method,
        url,
      },
    });
  }
}
this;
