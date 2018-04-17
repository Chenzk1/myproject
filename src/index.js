import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';

import createHistory from 'history/createHashHistory';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import './rollbar';

import './index.less';
// 1. Initialize，返回dva实例，这个参数是指定给路由用的history
const app = dva({
  history: createHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model，加载所有models，并进行了注册
//models为dva model
app.model(require('./models/global').default);

// 4. Router，注册路由表，即/为basicLayout，/user为userLayout，
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line
