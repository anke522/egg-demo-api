import { AbstractService } from './AbstractService';
import { Project } from '../entity/Project';
import { Context } from 'egg';

export class ProjectService extends AbstractService<Project> {
  constructor(ctx: Context) {
    super(ctx, Project);
  }
}
