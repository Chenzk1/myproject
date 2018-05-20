import {
  isUrl
} from '../utils/utils';

const menuData = [{
    name: '统计',
    icon: 'database',
    path: 'dashboard',
    children: [{
        name: '产量统计', //主要是产量统计excel中的，提供月产量查询（试试选择日期看产量？）...
        icon: 'area-chart',
        path: 'product',
      },
      {
        name: '停机工时统计',
        icon: 'frown-o',
        path: 'stop',
      },
      {
        name: '生产进度', //从生产日报表里找一个月就好了，自己定个任务
        icon: 'line-chart',
        path: 'monitor',
      },
      {
        name: '废品率分布', //主要是产量统计excel中的，饼状图之类的
        icon: 'pie-chart',
        path: 'reject',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '管理',
    icon: 'global',
    path: 'form',
    children: [{
        name: '班组管理', //这里的班组管理是对人员进行发工资 人员调动等等
        icon: 'team',
        path: 'basic-form',
      },
      {
        name: '高级管理',
        authority: 'admin', //只有admin可以显示，这里的任务就是发布给别人；这里的人员就是编辑其信息，增删等等
        icon: 'form',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '查询',
    icon: 'profile',
    path: 'profile',
    children: [{
        name: '工艺流程', //争取能够点入某个流程，显示某个机器或者流程的简单介绍
        icon: 'eye',
        path: 'basic',
      },

      {
        name: '人事查询',
        icon: 'contacts',
        path: 'advanced',
        authority: 'admin',
      },

    ],
  },
  {
    name: '我的', //这里的任务发布是自己应该完成的任务
    icon: 'table',
    path: 'list',
    children: [{
        name: '云盘', //上传文件
        icon: 'upload',
        path: 'table-list',
      },
      {
        name: '工作台', //直接把那个工作台借鉴一下，这里的人员主要是看他们的绩效考评之类的
        icon: 'laptop',
        path: 'basic-list',
      },
      /*{
        name: '卡片列表',
        path: 'card-list',
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
          },
          {
            name: '搜索列表（项目）',
            path: 'projects',
          },
          {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },*/
    ],
  },
  /*
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  */

  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [{
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let {
      path
    } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
