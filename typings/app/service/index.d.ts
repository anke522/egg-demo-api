// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAbstractService from '../../../app/service/AbstractService';
import ExportAccountService from '../../../app/service/AccountService';
import ExportAnalytics from '../../../app/service/Analytics';
import ExportAvatarService from '../../../app/service/AvatarService';
import ExportFollowService from '../../../app/service/FollowService';
import ExportGroupService from '../../../app/service/GroupService';
import ExportInterfaceService from '../../../app/service/InterfaceService';
import ExportLoggerService from '../../../app/service/LoggerService';
import ExportModuleService from '../../../app/service/ModuleService';
import ExportOrganizationsService from '../../../app/service/OrganizationsService';
import ExportProjectService from '../../../app/service/ProjectService';
import ExportPropertyService from '../../../app/service/PropertyService';
import ExportRepositoryService from '../../../app/service/RepositoryService';
import ExportTeamService from '../../../app/service/TeamService';
import ExportTest from '../../../app/service/Test';
import ExportTraceLoggerService from '../../../app/service/TraceLoggerService';

declare module 'egg' {
  interface IService {
    abstractService: AutoInstanceType<typeof ExportAbstractService>;
    accountService: AutoInstanceType<typeof ExportAccountService>;
    analytics: AutoInstanceType<typeof ExportAnalytics>;
    avatarService: AutoInstanceType<typeof ExportAvatarService>;
    followService: AutoInstanceType<typeof ExportFollowService>;
    groupService: AutoInstanceType<typeof ExportGroupService>;
    interfaceService: AutoInstanceType<typeof ExportInterfaceService>;
    loggerService: AutoInstanceType<typeof ExportLoggerService>;
    moduleService: AutoInstanceType<typeof ExportModuleService>;
    organizationsService: AutoInstanceType<typeof ExportOrganizationsService>;
    projectService: AutoInstanceType<typeof ExportProjectService>;
    propertyService: AutoInstanceType<typeof ExportPropertyService>;
    repositoryService: AutoInstanceType<typeof ExportRepositoryService>;
    teamService: AutoInstanceType<typeof ExportTeamService>;
    test: AutoInstanceType<typeof ExportTest>;
    traceLoggerService: AutoInstanceType<typeof ExportTraceLoggerService>;
  }
}
