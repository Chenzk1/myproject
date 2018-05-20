import { productData } from '../services/api';

export default {
  namespace: 'product',

  state: {
    yearData: [],
    monthData: [],
    dayData: [],    
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(productData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchProductData(_, { call, put }) {
      const response = yield call(productData);
      yield put({
        type: 'save',
        payload: {
          productData: response.productData,
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
        yearData: [],
        monthData: [],
        dayData: [],
      };
    },
  },
};
