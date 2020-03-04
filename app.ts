/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from 'egg';
import {
  createConnection,
  Connection,
  getConnectionOptions,
  ConnectionOptions
} from 'typeorm';

export default (app: Application) => {
  app.beforeStart(async () => {
    const connectionOptions: ConnectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
      entities: [__dirname + '/app/entity/*.{ts,js}']
    });
    const connection: Connection = await createConnection(connectionOptions);
  });
};
