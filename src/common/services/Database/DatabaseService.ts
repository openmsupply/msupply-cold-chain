/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
import _ from 'lodash';
import { Database } from './Database';
import { ENTITIES, MILLISECONDS } from '../../constants';

export class DatabaseService {
  database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  init = async (): Promise<void> => {
    const COLD_BREACH = {
      id: 'COLD_BREACH',
      minimumTemperature: -999,
      maximumTemperature: 2,
      duration: MILLISECONDS.ONE_MINUTE * 20,
      description: 'Cold breach',
    };

    const HOT_BREACH = {
      id: 'HOT_BREACH',
      minimumTemperature: 8,
      maximumTemperature: 999,
      duration: MILLISECONDS.ONE_MINUTE * 30,
      description: 'Hot breach',
    };

    const HOT_CUMULATIVE = {
      id: 'HOT_CUMULATIVE',
      minimumTemperature: 8,
      maximumTemperature: 999,
      duration: MILLISECONDS.ONE_MINUTE * 60,
      description: 'Hot cumulative',
    };

    const COLD_CUMULATIVE = {
      id: 'COLD_CUMULATIVE',
      minimumTemperature: -999,
      maximumTemperature: 2,
      duration: MILLISECONDS.ONE_MINUTE * 40,
      description: 'Cold cumulative',
    };

    const configs = await this.getAll(ENTITIES.TEMPERATURE_BREACH_CONFIGURATION);

    if (configs.length >= 4) return configs;

    return this.upsert(ENTITIES.TEMPERATURE_BREACH_CONFIGURATION, [
      HOT_BREACH,
      HOT_CUMULATIVE,
      COLD_BREACH,
      COLD_CUMULATIVE,
    ]);
  };

  save = async (entityName: string, objectOrArray: any | any[]): Promise<any | any[]> => {
    const repository = await this.database.getRepository(entityName);
    return repository.save(objectOrArray);
  };

  getAll = async (entityName: string): Promise<any | any[]> => {
    const repository = await this.database.getRepository(entityName);
    return repository.find();
  };

  upsert = async (entityName: string, object: any): Promise<any | any[]> => {
    let toSave = object;
    if (Array.isArray(object)) {
      toSave = _.chunk(object, 500) as any[];
      const results = (await Promise.all(
        toSave.map((chunk: any) => this.save(entityName, chunk))
      )) as any[];
      return results.flat();
    }
    return this.save(entityName, object);
  };

  queryWith = async (entityName: string, queryObject: any): Promise<any | any[]> => {
    const repository = await this.database.getRepository(entityName);
    return repository.find(queryObject);
  };

  get = async (entityName: string, idOrQueryObject: string | any): Promise<any | any[]> => {
    const repository = await this.database.getRepository(entityName);
    return repository.findOne(idOrQueryObject);
  };

  query = async (entityName: string, query?: (string | number)[]): Promise<any | any[]> => {
    const { manager } = (await this.database.getConnection()) ?? {};
    return manager?.query(entityName, query) ?? null;
  };
}
