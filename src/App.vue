<template>

	<div id="app">
		<div id="headBar" class="head_bar">
		  <h1>Toubled Monkey</h1>
		  <!-- <div class="head_info">
		    <span>您好，{{userInfo.name}}</span>
		    <a href="javascript:;" class="" @click="logout">退出</a>
		  </div> -->
		</div>
		<div class="index_body">
		  <div id="sideBar" class="side_bar">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" unique-opened >
		      <el-submenu index="1" ><!-- 菜单，showMenu中的参数是该菜单项目总权限 -->
		        <template slot="title" >测试任务管理</template><!-- 菜单名称 -->
            <el-menu-item index="1-1" ><router-link :to="{name:'taskList'}">列表</router-link></el-menu-item><!-- 1级菜单，showMenu中参数与后端商定，根据角色权限控制是否显示 -->
            <el-menu-item index="1-2" ><router-link :to="{name:'taskAdd'}">新增</router-link></el-menu-item>
		      </el-submenu>
          <el-submenu index="2" ><!-- 菜单，showMenu中的参数是该菜单项目总权限 -->
            <template slot="title" >测试报告</template><!-- 菜单名称 -->
            <el-menu-item index="2-1" ><router-link :to="{name:'reportOverview'}">总览</router-link></el-menu-item><!-- 1级菜单，showMenu中参数与后端商定，根据角色权限控制是否显示 -->
            <el-menu-item index="2-2" ><router-link :to="{name:'reportDetail'}">详情</router-link></el-menu-item><!-- 1级菜单，showMenu中参数与后端商定，根据角色权限控制是否显示 -->
            
          </el-submenu>
          <el-submenu index="3" ><!-- 菜单，showMenu中的参数是该菜单项目总权限 -->
            <template slot="title" >测试用例管理</template><!-- 菜单名称 -->
            <el-menu-item index="3-1" ><router-link :to="{name:'caseList'}">列表</router-link></el-menu-item><!-- 1级菜单，showMenu中参数与后端商定，根据角色权限控制是否显示 -->
            <el-menu-item index="3-2" ><router-link :to="{name:'caseAdd'}">新增</router-link></el-menu-item>
          </el-submenu>
		      
		    </el-menu>
		  </div>
		  <div id="pageContainer" class="page_container">
		    <router-view class="view"></router-view>
      </div>
		</div>

    <!-- <router-view class="view"></router-view> -->
  </div>
</template>
<script>
import fanUtils from './common/js/fanUtils.js'
// fanUtils.setCookie('result','"{"needModify":false,"roles":"0cd234567ah","name":"一凡","dept":"9999","menu":["sms-admin","store-admin-mine","acc-admin-mine","activity-admin","store-admin-batch","correlates-admin-third","merchant-admin-trash","zone-admin-list","product-admin-inquiry","shopwindow-admin-list","store-admin-trash","developer-admin-quartz","merchant-admin-list","merchant-admin-add","adsense-admin-list","adsense-admin-correlation","correlates-admin","zone-admin-product-relate","correlates-admin-store","adsense-admin","stick-admin-add","voucher-admin-customer","product-admin-list","acc-admin-batch","voucher-admin-list","finance-admin-hang","voucher-admin","product-admin-add","adsense-admin-add","voucher-admin-inquiry","zone-admin-create","merchant-admin-mine","activity-admin-mine","asdudit-admin-review","activity-admin-new","voucher-admin-trash","adsense-admin-recommend-dustbin","developer-admin","order-admin-client","correlates-admin-cmb","audit-admin","adsense-admin-recommend-list","adsense-admin-manage","product-admin-trash","order-admin-product","store-admin-list","product-admin","zone-admin-dustbin","acc-admin-add","finance-admin-month","order-admin-yum","activity-admin-dustbin","finance-admin-refund","admin-admin","merchant-admin-draft","activity-admin-dratfs","product-admin-correlation","product-admin-mine","product-admin-draft","store-admin-draft","admin-admin-petition","finance-admin-rate","adsense-admin-recommend","admin-admin-create","voucher-admin-mine","voucher-admin-draft","admin-admin-trash","order-admin","finance-admin","acc-admin","voucher-admin-order","shopwindow-admin-create","adsense-admin-recommend-add","merchant-admin","shopwindow-admin","finance-admin-invoice","stick-admin","voucher-admin-create","admin-admin-approve","stick-admin-manage","store-admin-add","order-admin-buy","acc-admin-list","activity-admin-list","admin-admin-list","store-admin","zone-admin"]}"');
//fanUtils.setCookie('loginCookieKey','ad240c7d6b7243da8cfd6bea0e6816e8');
console.log(fanUtils.getCookie('loginCookieKey'));

export default {
  data () {
    return {
      userInfo:{
        name: '',
        roles:'',
        menu:[],
      }

    }
  },
  created:function(){
    var result=fanUtils.getCookie('result');
    if (result) {
        result=JSON.parse(decodeURIComponent(result));
        // console.log(result);
        this.userInfo.name=result.name;
        this.userInfo.roles=result.roles;
        this.userInfo.menu=result.menu;
    } else {
        //window.location.href = "../admin/login/login.html";
    }
  },
  methods: {
    logout () {
      fanUtils.clearCookie("loginCookieKey");
      fanUtils.clearCookie("result");

      window.location.href = "../admin/login/login.html";
    },
    gotoLink:(link)=>{
      alert('gotoLink');
      window.location.href =link;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    showMenu:function(id){

      if(this.userInfo.menu.indexOf(id)!==-1){
        return true;
      }
      else {
        return false;
      }
    },

  }
}


</script>

<style lang="less">
@import url(./common/less/index.less);
</style>

