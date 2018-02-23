<template>
  <div id="app" v-cloak class="page_wrapper">
    
    <div class="search-table">
        <template>
            <el-table
            :data="tableData"
            border
            stripe
            v-loading="displayInfo.showLoading"
            element-loading-text="拼命加载中"
            style="width: 100%" >
                <el-table-column
                  prop="caseId"
                  label="caseId"
                  >
                </el-table-column>
                <el-table-column
                  prop="caseName"
                  label="caseName"
                  >
                </el-table-column>
                <el-table-column
                  prop="isCrash"
                  label="isCrash"
                  >
                </el-table-column>
                <el-table-column
                  prop="crashLog"
                  label="crashLog"
                  >
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="createTime"
                  width="160"
                  >
                </el-table-column>
                <el-table-column
                  label="screenShot"
                  >
                  <template slot-scope="scope">
                    <el-button
                    size="small"
                    @click="handleClickShot(scope.$index, tableData)">图片</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  label="troubledResponse"
                >
                <template slot-scope="scope">
                  <el-button
                  size="small"
                  @click="handleClickResponse(scope.$index, tableData)">报文</el-button>
                </template>
                
                </el-table-column>
                <el-table-column
                  inline-template
                  :context="_self"
                  label="操作"
                  >
                  <span>
                    <el-button @click="handleClickDetail(scope.$index,tableData)" type="text" size="small">重现</el-button>
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
    <el-dialog title="查看报文" :visible.sync="displayInfo.showDialog" width="80%">
      <div class="" style="height:400px;overflow-y:auto;">
        <pre>{{troubledResponse}}</pre>
      </div>
      
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="displayInfo.showDialog = false">取 消</el-button> -->
        <el-button type="primary" @click="displayInfo.showDialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看图片" :visible.sync="displayInfo.showDialog2" width="300px">
      <div class="" style="overflow-y:auto;">
        <img :src="screenShot" style="width:100%;" />
      </div>
      
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="displayInfo.showDialog = false">取 消</el-button> -->
        <el-button type="primary" @click="displayInfo.showDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
import ElementUI from 'element-ui'
Vue.use(ElementUI);
var app={};
app.picBase="http://resources.piao.cmbchina.com/images/";

const successCode='0000';



import fanUtils from '../../common/js/fanUtils.js'
// import util from '../../common/js/util.js'

Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}   

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
        troubledResponse:'',
        screenShot:'',
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
          showDialog2:false,
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
        
       this.handleSearch();
    },
    mounted:function(){
    },
    methods: {
        handleClickDetail(index,tableData){
          var taskId=urlData.taskId
          var troubledStrategy=tableData[index].troubledStrategy;
          console.log(taskId);
          console.log(troubledStrategy);
        },
        handleClickResponse(index,tableData){
          this.troubledResponse=tableData[index].troubledResponse;
          this.displayInfo.showDialog=true;
        },
        handleClickShot(index,tableData){
          this.screenShot=tableData[index].screenShot;
          debugger
          this.displayInfo.showDialog2=true;
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
          var logId=urlData.logId;
          this.displayInfo.showLoading=true;
          this.$http.get('/tmonkeyApi/logs/'+logId,{params:{}}).then(function(response){
            console.log(response.data);
            var data=response.data;
            //_this.displayInfo.showLoading = false;
            //this.orderInfo.useVoucher=true;

            _this.displayInfo.showLoading=false;
            if(data.code==0){
              _this.tableData=data.data;
              _this.tableData.forEach(function(item,index){
                item.screenShot='data:image/png;base64,'+item.screenShot;
                item.troubledResponse=JSON.stringify(JSON.parse(JSON.parse(item.troubledResponse)),null, 4);
                debugger
                item.createTime=new Date(item.createTime).format("yyyy-MM-dd hh:mm:ss");

              }); 
              
            }
            
            else {
              _this.$message.error(data.resDesc);
              
            } 
          });
        },
        
    },
}
</script>

