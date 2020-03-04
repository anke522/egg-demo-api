// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAbstractController from '../../../app/controller/abstractController';
import ExportAccountController from '../../../app/controller/accountController';
import ExportGroupController from '../../../app/controller/groupController';
import ExportHome from '../../../app/controller/home';
import ExportInterfaceController from '../../../app/controller/interfaceController';

declare module 'egg' {
  interface IController {
    abstractController: ExportAbstractController;
    accountController: ExportAccountController;
    groupController: ExportGroupController;
    home: ExportHome;
    interfaceController: ExportInterfaceController;
  }
}
