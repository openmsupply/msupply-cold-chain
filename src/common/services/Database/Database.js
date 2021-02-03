import { createConnection } from 'typeorm/browser';
import {
  SensorLog,
  TemperatureBreach,
  TemperatureBreachConfiguration,
  TemperatureLog,
  Sensor,
  Setting,
} from './entities';
import { ENVIRONMENT } from '~constants';

export const getDefaultDatabaseConfig = () => ({
  type: 'react-native',
  database: 'josh52.sqlite',
  location: 'default',

  // extra: {
  //   createFromLocation: '~josh.sqlite',
  // },
  logging: ENVIRONMENT.QUERY_LOGGER ? ['error', 'query', 'schema'] : [],
  maxQueryExecutionTime: 3000,
  synchronize: true,
  entities: [
    Sensor,
    SensorLog,
    TemperatureLog,
    TemperatureBreach,
    TemperatureBreachConfiguration,
    Setting,
  ],
});

/**
 * Interface for connections to a database. If there is a connection ...
 * ... made already, then return that connection. Otherwise, create one
 * with the passed parameters.
 *
 * This is the only place where imports of database packages to initiate
 * a connection or to interface with any native module should occur.
 *
 */
export class Database {
  constructor(config = getDefaultDatabaseConfig()) {
    this.config = config;
    this.connection = null;
  }

  createConnection = async () => {
    this.connection = await createConnection(this.config);

    return this.connection;
  };

  getConnection = async () => {
    if (!this.connection) await this.createConnection();
    return this.connection;
  };

  getRepository = async repo => {
    return (await this.getConnection()).getRepository(repo);
  };
}
