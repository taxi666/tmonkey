<template>
  <div id="app" v-cloak class="page_wrapper">
    <el-form :inline="false" :model="formInfo" ref="formInfo" label-width="170px" class="search-form" label-position="right" :rules="rules">
        <el-row>
            <el-col :span="12">
                <el-form-item label="团队" prop="beginClearTime">
                    <el-select v-model="formInfo.merFlag"><!-- 下拉选择框，v-model为表单项目变量名称 -->
                      <el-option label="请选择" value=""></el-option>
                      <el-option label="商户" value="1"></el-option>
                      <el-option label="门店" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="用例名称" prop="endClearTime">
                    <el-input v-model="formInfo.merNo"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="url_schema" prop="beginRealStlDate">
                    <el-input v-model="formInfo.merNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="匹配关键字" prop="endRealStlDate">
                    <el-input v-model="formInfo.merNo"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
                <el-button type="primary" @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-row>
    </el-form>
    <div class="search-table">
        <template>
            <el-table
            :data="tableData"
            border
            stripe
            v-loading="displayInfo.showLoading"
            element-loading-text="拼命加载中"
            style="width: 100%" >
                <!-- <el-table-column
                  prop="tuandui"
                  label="团队"
                  sortable
                  >
                </el-table-column> -->
                <el-table-column
                  prop="id"
                  label="ID"
                  >
                </el-table-column>
                <el-table-column
                  prop="taskName"
                  label="任务名称"
                  >
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="任务状态"
                  >
                </el-table-column>
                <el-table-column
                  prop="logSize"
                  label="日志大小"
                  >
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="时间"
                  >
                </el-table-column>
                <el-table-column
                  inline-template
                  :context="_self"
                  label="操作"
                  >
                  <span>
                    <el-button @click="handleClickDetail($index,tableData)" type="text" size="small">详情</el-button>
                    <!-- <el-button type="text" size="small" @click.native.prevent="handleModify($index,tableData)">编辑</el-button> -->
                  </span>
                </el-table-column>
            </el-table>
        </template>
    </div>
    <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formInfo.pageNum"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="formInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
    </div> 
    <!-- alert提示modal弹框 -->
    <!-- <modal :show.sync="displayInfo.showModal" :txt.sync="displayInfo.modalTxt" v-on:closeModal="closeModal"></modal> -->
    <!-- toast -->
    <!-- <toast :showToast="displayInfo.showToast" :txt="displayInfo.toastTxt" v-on:closeToast="closeToast"></toast> -->
    <!--loading-->
    <!-- <loading :show="displayInfo.showLoading"></loading> -->
    <el-dialog title="更改拨款日期" v-model="displayInfo.showDialog">
      <el-form :model="modifyFormInfo" label-width="200px">
        <el-row>
            <el-col :span="16">
                <el-form-item label="实际拨款日期" prop="beginClearTime">
                  <el-date-picker type="date" placeholder="" v-model="modifyFormInfo.realDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="displayInfo.showDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleModifySubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
var Vue = require('vue');
var VueResource = require('vue-resource');

Vue.use(VueResource);
import ElementUI from 'element-ui'
Vue.use(ElementUI);
var app={};
app.picBase="http://resources.piao.cmbchina.com/images/";

const successCode='0000';



import fanUtils from '../../common/js/fanUtils.js'
// import util from '../../common/js/util.js'

var urlData=fanUtils.GetRequest();
// var getGPS=function(callback){
//     var _this=this;
//     var timestamp = Date.parse(new Date());
//     window.location.href = "http://cmbls/gps?id=" + timestamp;      
//     CMBLS = {};
//     CMBLS.gps = {}
//     CMBLS.gps.successCallback = function(id, message) {
//         var messageArray=(message+"").split(">");
//         var latitude=messageArray[2].split("<")[0];
//         var longitude=messageArray[4].split("<")[0];
//         _this.orderInfo.longitude=longitude.toString();
//         _this.orderInfo.dimension=latitude.toString(); 
//         util.setCookie('gps', JSON.stringify({longitude:longitude, latitude:latitude}));
//         callback();
//     }
//     CMBLS.gps.failCallback = function(id, message) {
//         util.setCookie('gps', JSON.stringify({longitude:'121.472644', latitude:'31.231706'}));
//         callback();
//     }
// };
export default {
    name: 'app',
    components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            
        },
    data:function() {
      return {
        formInfo:{
            beginClearTime:'',
            endClearTime:'',
            beginRealStlDate:'',
            endRealStlDate:'',
            pageSize:20,
            pageNum:1,
        },
        modifyFormInfo:{
          realDate:'',
          id:''
        },

        rules: {
          
          begTime: [
            { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
          ],
          
        },
        tableData: [],
        totalNum:0,
        displayInfo:{
          showToast:false,
          showModal:false,
          modalTxt:'',
          toastTxt:'',
          showLoading:false,
          showDialog:false,
        },
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
      }
    },

    computed: {
       
    },
    created:function () {
        
        
    },
    mounted:function(){
    },
    methods: {
        handleClickDetail(index,tableData){
          console.log('idnex'+index);
          console.log('tableData');
          console.log(tableData);
          var logId=tableData[index].id;
          location.href='reportDetail?logId='+logId+'&taskId='+tableData[index].taskId;
        },
        closeModal:function(){
            this.displayInfo.showModal=false;
        },
        showToast:function(txt){
            this.displayInfo.showToast=false;
            this.displayInfo.showToast=true;
            this.displayInfo.toastTxt=txt;
        },
        closeToast:function(){
            this.displayInfo.showToast=false;
            this.displayInfo.showTxt='';
            console.log('closeToast')
        },
        handleReset() {
            console.log(this.$refs.formInfo);
            console.log(this.$refs.formInfo.merNo);
            this.$refs.formInfo.resetFields();
        },
        handleSubmit(ev) {
            this.$refs.formInfo.validate((valid) => {
              if (valid) {
                //alert('submit!');
                this.formInfo.pageNum=1;
                this.handleSearch();
              } else {
                console.log('error submit!!');
                return false;
              }
            });
        },
        handleAdd(){
          window.open('caseAdd');
        },
        formatMerFlag(row, column) {
            return row.merFlag==1?'商户':'门店';
        },
        formatAcctStatus(row, column){
            return row.acctStatus==='1'?'启用':'停用';
        },
        handleSizeChange(val) {
          this.formInfo.pageSize=val;
          this.formInfo.pageNum=1;
          this.handleSearch();
          // var _this=this;
          // setTimeout(function(){
          //   _this.handleSearch();

          // },1000);
          //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.formInfo.pageNum = val;
          this.handleSearch();
          console.log(`当前页: ${val}`);
        },
        handleModify(index,rows){
          this.displayInfo.showDialog=true;
          this.modifyFormInfo.id=rows[index].id;
        },
        handleModifySubmit(){
          var _this=this;
          var param={};
          param.realDate=fanUtils.formatDate(this.modifyFormInfo.realDate);
          console.log('param:');
          console.log(param);
          
          this.displayInfo.showLoading=true;
          this.$http.post('/tmonkeyApi/cases',param,{emulateJSON:true}).then(function(response){
              console.log(response.data);
              var data=response.data;
              //_this.displayInfo.showLoading = false;
              //this.orderInfo.useVoucher=true;

              _this.displayInfo.showLoading=false;
              if(data.resCode == successCode) {
                _this.displayInfo.showDialog=false;
                _this.$message({
                  message: data.resDesc,
                  type: 'success',
                  showClose: true,
                });
                _this.handleSearch();
                    
                      // data.body.rows[0].list.forEach(function(item,index){
                      //     if(!_this.voucherInfo.list[index]){
                      //         _this.voucherInfo.list.push({});
                      //     }
                      //     _this.voucherInfo.list[index].isSelected=false;
                      //     _this.voucherInfo.list[index].ticketPrice=item.ticketPrice;
                      //     _this.voucherInfo.list[index].useDate=item.useDate;
                      //     _this.voucherInfo.list[index].codeNo=item.codeNo;
                                    
              }
              else {
                _this.$message.error(data.resDesc);
                
              } 
          });
        },
        handleSearch(){
          var _this=this;
          this.formInfo.beginClearTime=fanUtils.formatDate(this.formInfo.beginClearTime);
          this.formInfo.endClearTime=fanUtils.formatDate(this.formInfo.endClearTime);
          this.formInfo.beginRealStlDate=fanUtils.formatDate(this.formInfo.beginRealStlDate);
          this.formInfo.endRealStlDate=fanUtils.formatDate(this.formInfo.endRealStlDate);
          var param=fanUtils.deleteEmptyJsonItem(this.formInfo);
          console.log('param:');
          console.log(param);
          
          this.displayInfo.showLoading=true;
          this.$http.get('/tmonkeyApi/logs',{params:{}}).then(function(response){
            console.log(response.data);
            var data=response.data;
            //_this.displayInfo.showLoading = false;
            //this.orderInfo.useVoucher=true;

            _this.displayInfo.showLoading=false;
            if(data.code==0){
              _this.tableData=data.data;
              // data.data.forEach(function(item,index){
              //   _this.tableData.push({
              //     'num':item[0],
              //     'name':item[1],
              //     'schema':item[2],
              //     'keywords':item[3],
              //     'comments':item[4],
              //   });

              // });
            }
            
            else {
              _this.$message.error(data.resDesc);
              
            } 
          });
        },
        
    },
}
</script>

<style lang="less">
@import 'app.less';
</style>
