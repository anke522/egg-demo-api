import { Column, ObjectID } from 'typeorm';

export enum InterfaceScopeType {
  REQUEST = 'request',
  RESPONSE = 'response'
}

export enum InterfaceParamsType {
  HEADERS = 1,
  QUERYPARAMS = 2,
  BODYPARAMS = 3
}
export enum ParamsValueType {
  STRING = 'String',
  NUMBER = 'Number',
  BOOLEAN = 'Boolean',
  OBJECT = 'Object',
  ARRAY = 'Array',
  FUNCTION = 'Function',
  REGEXP = 'RegExp',
  Null = 'Null'
}

export class Property {
  @Column('enum', {
    enum: InterfaceScopeType,
    default: InterfaceScopeType.REQUEST
  })
  scope: InterfaceScopeType;
  @Column()
  interfaceId: ObjectID;
  @Column()
  parentId: ObjectID;
  @Column()
  name: string;
  @Column('enum', {
    enum: ParamsValueType,
    default: ParamsValueType.NUMBER
  })
  type: ParamsValueType;
  @Column('enum', {
    enum: InterfaceParamsType,
    default: InterfaceParamsType.BODYPARAMS
  })
  params: InterfaceParamsType;
  @Column()
  rule: string;
  @Column()
  description: string;
  @Column()
  value: string;
  @Column()
  /** 是否为必填选项 */
  required: boolean;
}