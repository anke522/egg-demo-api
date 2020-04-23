import { AbstractService } from './AbstractService';
import { Context } from 'egg';
import { Property } from '../entity/Property';

export default class PropertyService extends AbstractService<Property> {
  constructor(ctx: Context) {
    super(ctx, Property);
  }
  count() {
    return this.repository.count();
  }
  create() {
    return this.repository.create();
  }
  save(entity: Property) {
    return this.repository.save(entity);
  }
  update(entity: Property) {
    return this.repository.updateOne(entity.id, entity);
  }
  insertMany(entities: Property[]) {
    this.repository.insertMany(entities);
  }
  // updateMany(entities: Property[]) {
  //   this.repository.(entities);
  // }
  findByInterfaceId(interfaceId: string) {
    return this.repository.find({ interfaceId });
  }
  deleteByModuleId(moduleId: string) {
    return this.repository.delete(moduleId);
  }
  deleteByInterfaceId(interfaceId: string) {
    return this.repository.delete({ interfaceId });
  }
  delete(ids: string[]) {
    return this.repository.delete(ids);
  }
}
