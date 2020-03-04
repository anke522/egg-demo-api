// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccountService from '../../../app/service/AccountService';
import ExportAvatarService from '../../../app/service/AvatarService';
import ExportFollowService from '../../../app/service/FollowService';
import ExportGroupService from '../../../app/service/GroupService';
import ExportInterfaceCatalogService from '../../../app/service/InterfaceCatalogService';
import ExportInterfaceCollectionService from '../../../app/service/InterfaceCollectionService';
import ExportInterfaceService from '../../../app/service/InterfaceService';
import ExportLogService from '../../../app/service/LogService';
import ExportProjectService from '../../../app/service/ProjectService';
import ExportTest from '../../../app/service/Test';

declare module 'egg' {
  interface IService {
    accountService: ExportAccountService;
    avatarService: ExportAvatarService;
    followService: ExportFollowService;
    groupService: ExportGroupService;
    interfaceCatalogService: ExportInterfaceCatalogService;
    interfaceCollectionService: ExportInterfaceCollectionService;
    interfaceService: ExportInterfaceService;
    logService: ExportLogService;
    projectService: ExportProjectService;
    test: ExportTest;
  }
}
