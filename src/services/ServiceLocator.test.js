import * as ServiceLocator from './ServiceLocator';
import { SERVICES, SERVICE_LOCATOR_ERROR } from '../shared/constants';

beforeEach(() => ServiceLocator.deleteServices());

describe('ServiceLocator: registerService', () => {
  it('registers a service', () => {
    const result = ServiceLocator.registerService(SERVICES.BLUETOOTH, {});
    expect(result).toBe(true);
  });
  it('throws when trying to register a service not supported', () => {
    expect(() => ServiceLocator.registerService('SERVICE', {})).toThrow(
      SERVICE_LOCATOR_ERROR.SERVICE_NOT_SUPPORTED
    );
  });
  it('throws when trying to register a service without a key', () => {
    expect(() => ServiceLocator.registerService('', {})).toThrow(
      SERVICE_LOCATOR_ERROR.MUST_REGISTER_A_KEY
    );
  });
});

describe('ServiceLocator: getService', () => {
  it('gets a service previously set', () => {
    const mockService = {};
    ServiceLocator.registerService(SERVICES.BLUETOOTH, mockService);
    const service = ServiceLocator.getService(SERVICES.BLUETOOTH);
    expect(service).toBe(mockService);
  });
  it('throws when trying to get a non-supported service', () => {
    expect(() => ServiceLocator.getService('')).toThrowError(
      SERVICE_LOCATOR_ERROR.SERVICE_NOT_SUPPORTED
    );
  });
  it('throws when trying to get a service not registered', () => {
    expect(() => ServiceLocator.getService(SERVICES.BLUETOOTH)).toThrowError(
      SERVICE_LOCATOR_ERROR.SERVICE_NOT_REGISTERED
    );
  });
});

describe('ServiceLocator: getService', () => {
  it('gets a service previously set', () => {
    __DEV__ = false;
    expect(() => ServiceLocator.deleteServices()).toThrow(
      SERVICE_LOCATOR_ERROR.CANT_DELETE_SERVICES
    );
    __DEV__ = true;
  });
});
