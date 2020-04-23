import AbstractController from './abstractController';
import { Property } from '../entity/Property';

export default class PropertyController extends AbstractController {
  async count() {
    const count = await this.service.propertyService.count();
    this.success(count);
  }
  async create() {
    const accountId = this.getAccountId();
    const params = Object.assign({}, this.ctx.request.body, {
      creatorId: accountId,
    });
    const property = this.service.projectService.create(params);
    await this.service.projectService.save(property);
    this.success(property);
  }
  async createBatch() {
    const accountId = this.getAccountId();
    const parmas = this.ctx.request.body;
    let interfaceId = '';
    if (!Array.isArray(parmas)) {
      interfaceId = this.ctx.request.body.interfaceId;
      await this.service.propertyService.deleteByInterfaceId(interfaceId);
    } else {
      interfaceId = (parmas as Property[])[0].interfaceId;

      const properties = parmas as Property[];
      const allProperties = await this.service.propertyService.findByInterfaceId(interfaceId);
      const updateProperties = properties.filter(
        (p: Property) => p.id != null && p.id !== undefined
      );
      const propertyIds = updateProperties.map((p: Property) => {
        return p.id.toString();
      });
      const deletePropertyIds = allProperties
        .filter((p: Property) => {
          return propertyIds.indexOf(p.id.toString()) === -1;
        })
        .map((p: Property) => {
          return p.id.toString();
        });
      await this.service.propertyService.delete(deletePropertyIds);
      const insertProperties = properties.filter(
        (p: Property) => p.id === null || p.id === undefined
      );
      insertProperties.forEach((p: Property) => {
        p.creatorId = accountId;
      });
      updateProperties.forEach(async (p: Property) => {
        await this.service.propertyService.update(p);
      });
      await this.service.propertyService.insertMany(insertProperties);
    }
    this.success(true);
  }
  async searchByItfId() {
    const { interfaceId } = this.ctx.request.query;
    const properties = await this.service.propertyService.findByInterfaceId(interfaceId);
    this.success(properties);
  }
}
