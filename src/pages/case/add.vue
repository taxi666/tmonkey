<template>
  <div id="app" v-cloak class="page_wrapper">
    <el-form :inline="false" :model="formInfo" ref="formInfo" label-width="170px" class="search-form" label-position="right" :rules="rules">
        <!-- <el-row>
            <el-col :span="12">
                <el-form-item label="团队" prop="beginClearTime">
                    <el-select v-model="formInfo.tuandui">
                      <el-option label="请选择" value=""></el-option>
                      <el-option label="饭票" value="1"></el-option>
                      <el-option label="影票" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            
        </el-row> -->
        <el-row>
          <el-col :span="12">
              <el-form-item label="用例名称" prop="endClearTime">
                  <el-input v-model="formInfo.name"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="url_schema" prop="beginRealStlDate">
                    <el-input v-model="formInfo.schema"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="匹配关键字" prop="endRealStlDate">
                <el-input v-model="formInfo.keywords"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="返回报文(选填)" prop="response">
                <el-input v-model="formInfo.response" @blur="handleResponseChange"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="执行次数" prop="total_count">
                <el-input v-model="formInfo.total_count" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注(选填)" prop="endRealStlDate">
                <el-input v-model="formInfo.comments"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-row>
    </el-form>
    
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
export default {
    name: 'app',
    components: {
            // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
            // 否则挂载点和组件名字一致, 即vhead
            
        },
    data:function() {
      return {
        formInfo:{
          total_count:''
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
        handleResponseChange:function(e){
          var param={
            response:this.formInfo.response
          }
          var that=this;
          this.$http.post('/tmonkeyApi/cases/total',param,{emulateJSON:true}).then(function(response){
              console.log(response.data);
              var data=response.data;
              that.displayInfo.showLoading=false;
              if(data.code == 0 && data.data!==null) {
                that.formInfo.total_count=data.data;
                // that.formInfo.total_count=100;
                                    
              }
              else {
                // that.$message.error(data.resDesc);
                
              } 
          });
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
                // this.formInfo.pageNum=1;
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
              _this.displayInfo.showLoading=false;
              if(data.resCode == successCode) {
                _this.displayInfo.showDialog=false;
                _this.$message({
                  message: data.resDesc,
                  type: 'success',
                  showClose: true,
                });

                _this.handleSearch();
                                    
              }
              else {
                _this.$message.error(data.resDesc);
                
              } 
          });
        },
        handleSearch(){
          var _this=this;
          // this.formInfo.beginClearTime=fanUtils.formatDate(this.formInfo.beginClearTime);
          // this.formInfo.endClearTime=fanUtils.formatDate(this.formInfo.endClearTime);
          // this.formInfo.beginRealStlDate=fanUtils.formatDate(this.formInfo.beginRealStlDate);
          // this.formInfo.endRealStlDate=fanUtils.formatDate(this.formInfo.endRealStlDate);
          var param=fanUtils.deleteEmptyJsonItem(this.formInfo);
          var param=this.formInfo;
          console.log('param:');
          console.log(param);
          
          this.displayInfo.showLoading=true;
          this.$http.put('/tmonkeyApi/cases',param).then(function(response){
            console.log(response.data);
            var data=response.data;
            //this.orderInfo.useVoucher=true;

            _this.displayInfo.showLoading=false;
            
            if(data.code == 0) {
              alert(data.msg);
              // location.href="caseList"
            }
            else {
              _this.$message.error(data.msg);
              
            } 
          });
        },
        
    },
}
</script>

<style lang="less">
@import 'app.less';
</style>
