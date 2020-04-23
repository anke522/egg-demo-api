import { Column, ObjectIdColumn, ObjectID, Entity } from 'typeorm';
export enum InterfaceScopeType {
  REQUEST = 'request',
  RESPONSE = 'response',
}

export enum InterfaceParamsType {
  HEADERS = 1,
  QUERYPARAMS = 2,
  BODYPARAMS = 3,
}
export enum ParamsValueType {
  STRING = 'String',
  NUMBER = 'Number',
  BOOLEAN = 'Boolean',
  OBJECT = 'Object',
  ARRAY = 'Array',
  FUNCTION = 'Function',
  REGEXP = 'RegExp',
  Null = 'Null',
}

@Entity()
export class Property {
  @ObjectIdColumn()
  id: ObjectID;
  @Column('enum', {
    enum: InterfaceScopeType,
    default: InterfaceScopeType.REQUEST,
  })
  scope: InterfaceScopeType;
  @Column()
  interfaceId: string;
  @Column()
  parentId: string;
  @Column()
  name: string;
  @Column('enum', {
    enum: ParamsValueType,
    default: ParamsValueType.NUMBER,
  })
  type: ParamsValueType;
  @Column('enum', {
    enum: InterfaceParamsType,
    default: InterfaceParamsType.BODYPARAMS,
  })
  paramsType: InterfaceParamsType;
  @Column()
  rule: string;
  @Column()
  description: string;
  @Column()
  value: string;
  @Column()
  /** 是否为必填选项 */
  required: boolean;
  @Column()
  creatorId: string;
  @Column()
  moduleId: string;
  @Column()
  repositoryId: string;
}
