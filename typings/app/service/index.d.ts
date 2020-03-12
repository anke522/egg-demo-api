// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAbstractService from '../../../app/service/AbstractService';
import ExportAccountService from '../../../app/service/AccountService';
import ExportAnalytics from '../../../app/service/Analytics';
import ExportAvatarService from '../../../app/service/AvatarService';
import ExportFollowService from '../../../app/service/FollowService';
import ExportGroupService from '../../../app/service/GroupService';
import ExportInterfaceCatalogService from '../../../app/service/InterfaceCatalogService';
import ExportInterfaceCollectionService from '../../../app/service/InterfaceCollectionService';
import ExportInterfaceService from '../../../app/service/InterfaceService';
import ExportLogService from '../../../app/service/LoggerService';
import ExportModuleService from '../../../app/service/ModuleService';
import ExportOrganizationsService from '../../../app/service/OrganizationsService';
import ExportProjectService from '../../../app/service/ProjectService';
import ExportRepositoryService from '../../../app/service/RepositoryService';
import ExportTeamService from '../../../app/service/TeamService';
import ExportTest from '../../../app/service/Test';
import ExportTraceLoggerService from '../../../app/service/TraceLoggerService';

declare module 'egg' {
  interface IService {
    abstractService: ExportAbstractService;
    accountService: ExportAccountService;
    analytics: ExportAnalytics;
    avatarService: ExportAvatarService;
    followService: ExportFollowService;
    groupService: ExportGroupService;
    interfaceCatalogService: ExportInterfaceCatalogService;
    interfaceCollectionService: ExportInterfaceCollectionService;
    interfaceService: ExportInterfaceService;
    loggerService: ExportLogService;
    moduleService: ExportModuleService;
    organizationsService: ExportOrganizationsService;
    projectService: ExportProjectService;
    repositoryService: ExportRepositoryService;
    teamService: ExportTeamService;
    test: ExportTest;
    traceLoggerService: ExportTraceLoggerService;
  }
}
