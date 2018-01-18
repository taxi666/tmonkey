import Vue from 'vue'
import axios from 'axios'

var axiosConf = {

}

var commonHttpClient = {
  getAxios : function(url, params, fn1, fn2){
    axios.get(url, {
      params: params
    }).then(function (response) {
      var data = response.data;
      if (data.resCode == Vue.prototype.needloginCode) {
        location.href = "../../../../admin/login/login.html"
      } else if (data.resCode == Vue.prototype.successCode) {
        fn1(data);
      } else {
        if(typeof fn2 == "function"){
          fn2();
        }
        if (data.resDesc && data.result) {
          Vue.prototype.$message.error(data.resDesc + data.result);
        } else if (data.resDesc) {
          Vue.prototype.$message.error(data.resDesc);
        } else if (data.result) {
          Vue.prototype.$message.error(data.result);
        } else {
          Vue.prototype.$message.error('系统异常！');
        }
      }
    }).catch(function (error) {
      console.log(error);
    });
  },
  postAxios : function(url, params, fn1, fn2){
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };
    axios.post(url, params, config)
      .then(function (response) {
        let data = response.data;
        if (data.resCode ==Vue.prototype.needloginCode) {
          location.href = "../../../../admin/login/login.html"
        } else if (data.resCode == Vue.prototype.successCode) {
          fn1();
        } else {
          if (data.resDesc && data.result) {
            Vue.prototype.$message.error(data.resDesc + data.result);
          } else if (data.resDesc) {
            Vue.prototype.$message.error(data.resDesc);
          } else if (data.result) {
            Vue.prototype.$message.error(data.result);
          } else {
            Vue.prototype.$message.error('程序异常！');
          }
        }
      }).catch(function (error) {
      console.log(error);
    });
  }
};

export default commonHttpClient;
