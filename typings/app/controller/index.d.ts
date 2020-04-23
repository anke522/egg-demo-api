// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAbstractController from '../../../app/controller/abstractController';
import ExportAccountController from '../../../app/controller/accountController';
import ExportGroupController from '../../../app/controller/groupController';
import ExportHome from '../../../app/controller/home';
import ExportInterfaceController from '../../../app/controller/interfaceController';
import ExportMockController from '../../../app/controller/mockController';
import ExportModuleController from '../../../app/controller/moduleController';
import ExportOrganizationController from '../../../app/controller/organizationController';
import ExportPropertyController from '../../../app/controller/propertyController';
import ExportRepositoryController from '../../../app/controller/repositoryController';
import ExportTeamController from '../../../app/controller/teamController';

declare module 'egg' {
  interface IController {
    abstractController: ExportAbstractController;
    accountController: ExportAccountController;
    groupController: ExportGroupController;
    home: ExportHome;
    interfaceController: ExportInterfaceController;
    mockController: ExportMockController;
    moduleController: ExportModuleController;
    organizationController: ExportOrganizationController;
    propertyController: ExportPropertyController;
    repositoryController: ExportRepositoryController;
    teamController: ExportTeamController;
  }
}
