<template>
  <div id="app" v-cloak class="page_wrapper">
    <div class="btn-box" style="margin:100px 0  0 200px">
      <el-button type="success" round>测试任务</el-button>
      <el-button type="primary" round>测试报告</el-button>
      <el-button type="warning" round>测试用例</el-button>
    </div>
      
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
          this.$http.post('/fanpiao-oms/finance/stlDate/'+this.modifyFormInfo.id+'/realStlDateSet',param,{emulateJSON:true}).then(function(response){
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
          this.$http.get('/fanpiao-oms/finance/search/stlDate',{params:param}).then(function(response){
            console.log(response.data);
            var data=response.data;
            //_this.displayInfo.showLoading = false;
            //this.orderInfo.useVoucher=true;

            _this.displayInfo.showLoading=false;
            if(data.resCode == _this.needloginCode) {
              location.href="../admin/login/login.html"
            }
            else if(data.resCode == successCode) {
              _this.tableData=data.result.list;
              _this.totalNum=data.result.totalNum;
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
// @import 'app.less';
</style>
