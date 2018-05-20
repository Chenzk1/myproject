import { rejectData } from '../services/api';

export default {
  namespace: 'reject',

  state: {
    rejectYear:[],
    rejectMonth:[],    
    rejectPercent:[],
    rejectFenbu:[],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(rejectData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchRejectData(_, { call, put }) {
      const response = yield call();
      yield put({
        type: 'save',
        payload: {
          rejectData: response.rejectData,
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
        rejectYear:[],
        rejectMonth:[],            
        rejectPercent:[],
        rejectFenbu:[],
      };
    },
  },
};
