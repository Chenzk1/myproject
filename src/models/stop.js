import { stopData } from '../services/api';

export default {
  namespace: 'stop',

  state: {
    stopCause:[],
    stopCausePie:[],
    stopFaultPie:[],   
    stopRadar:[],
    cbls:[],
    qxddcy:[],
    sfcp:[],
    hgnt:[],
    ffsb:[],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(stopData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchStopData(_, { call, put }) {
      const response = yield call(stopData);
      yield put({
        type: 'save',
        payload: {
          stopData: response.stopData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        stopCause:[],
        stopCausePie:[],
        stopFaultPie:[],    
        stopRadar:[],            
        cbls:[],
        qxddcy:[],
        sfcp:[],
        hgnt:[],
        ffsb:[],
      };
    },
  },
};
