import { createSlice } from '@reduxjs/toolkit';

import { REDUCER_SHAPE } from '~constants';

const HydrateSelector = {
  temperatureLog({ hydrate }) {
    const { temperatureLog } = hydrate;
    return temperatureLog;
  },
  sensor({ hydrate }) {
    const { sensor } = hydrate;
    return sensor;
  },
  breachConfiguration({ hydrate }) {
    const { breachConfiguration } = hydrate;
    return breachConfiguration;
  },
  setting({ hydrate }) {
    const { setting } = hydrate;
    return setting;
  },
  chart({ hydrate: { chart } }) {
    return chart;
  },
  logTable: ({ hydrate: { logTable } }) => {
    return logTable;
  },
  all({ hydrate }) {
    const { setting, temperatureLog, breachConfiguration, sensor, chart } = hydrate;
    return setting && temperatureLog && breachConfiguration && sensor && chart;
  },
};

const initialState = {
  temperatureLog: true,
  sensor: false,
  breachConfiguration: false,
  setting: false,
  chart: true,
};

const reducers = {
  logTable: draftState => {
    draftState.logTable = true;
    draftState.all = HydrateSelector.all({ hydrate: draftState });
  },
  temperatureLog: draftState => {
    draftState.temperatureLog = true;
    draftState.all = HydrateSelector.all({ hydrate: draftState });
  },
  sensor: draftState => {
    draftState.sensor = true;
    draftState.all = HydrateSelector.all({ hydrate: draftState });
  },
  breachConfiguration: draftState => {
    draftState.breachConfiguration = true;
    draftState.all = HydrateSelector.all({ hydrate: draftState });
  },
  setting: draftState => {
    draftState.setting = true;
    draftState.all = HydrateSelector.all({ hydrate: draftState });
  },
  chart: draftState => {
    draftState.chart = true;
    draftState.all = HydrateSelector.all({ hydrate: draftState });
  },
};

const { actions: HydrateAction, reducer: HydrateReducer } = createSlice({
  initialState,
  name: REDUCER_SHAPE.HYDRATE,
  reducers,
});

const HydrateSaga = {};

export { HydrateAction, HydrateReducer, HydrateSaga, HydrateSelector };