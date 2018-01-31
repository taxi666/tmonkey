// 引入组件


import caseAdd from './pages/case/add.vue'
import caseList from './pages/case/list.vue'
import taskAdd from './pages/task/add.vue'
import taskList from './pages/task/list.vue'
import index from './pages/index/index.vue'
import reportDetail from './pages/report/detail.vue'
import reportList from './pages/report/list.vue'




//路径统一头部（一般无需更改）
var path=window.path='/tmonkey';
//路由配置
const routes = [
  {
    path: path ,
    name: 'index',
    component: index,
    meta: {
      title: '首页'
    },
  },
  {
    path: path + '/caseAdd',
    name: 'caseAdd',//可选，尽量写上
    component: caseAdd,
    meta: {
      title: '测试用例新增'//页面的title
    },
  },
  {
    path: path + '/caseList',
    name: 'caseList',
    component: caseList,
    meta: {
      title: '测试用例查询'
    },
  },
  {
    path: path + '/reportDetail',
    name: 'reportDetail',
    component: reportDetail,
    meta: {
      title: '测试报告详情'
    }
  },
  {
    path: path + '/reportList',
    name: 'reportList',
    component: reportList,
    meta: {
      title: '测试报告列表'
    }
  },
  {
    path: path + '/taskAdd',
    name: 'taskAdd',
    component: taskAdd,
    meta: {
      title: '测试任务新增'
    }
  },
  {
    path: path + '/taskList',
    name: 'taskList',
    component: taskList,
    meta: {
      title: '测试任务查询'
    }
  },
]
export default routes;
