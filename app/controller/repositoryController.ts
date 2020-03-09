import AbstractController from './abstractController';

export class RepositoryController extends AbstractController {
  async search() {
    const { queryString, limit, page } = this.ctx.request.body;
    const repositories = await this.service.repositoryService.search(
      limit,
      page,
      queryString
    );
    this.success(repositories);
  }
  async count() {
    const count = await this.service.repositoryService.totalCount();
    this.success({ count });
  }

  async update() {}
}
