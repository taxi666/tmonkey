var fanUtils = {
    formatDate: function (time, type) {//时间格式化,type 1为年月日时分秒 2为年月日时分
        if(!time) return '';
        if(typeof time=== 'string' && time.indexOf(':')!=-1) {
            if(!type)return time.substring(0,10);
            else if(type==2)return time.substring(0,16);
            else return time
        }
        var date = new Date(time);
        var year = date.getFullYear() + '-';
        var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        if (type) {

            var hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
            var minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            var _ret= type==1?year + month + day + hour+':'+ minute+':'+ second:year + month + day + hour+':'+minute;
            return _ret;
        }
        else {
            return (year + month + day).replace(/(^\s*)|(\s*$)/g, "");
        }
    },
    error: function (title, errmsg) {
        const modal = Modal.warning({
            title: title,
            content: errmsg,
        });
    },
    setCookie: function (name, value, day, path) {
        var path = path || '/';
        var expiration = new Date((new Date()).getTime() + day * 24 * 3600 * 1000);
        document.cookie = name
            + "="
            + escape(value)
            + ";path=" + path + "; expires=" + expiration
                .toGMTString();
    },
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return unescape(c.substring(name.length, c.length));
        }
        return "";
    },
    clearCookie: function (name) {
        this.setCookie(name, "", -1);
    },
    GetRequest:function() {
        var url = decodeURIComponent(location.search); //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                var srtArry = strs[i].split("=");
                var y = srtArry.shift();
                theRequest[y] = unescape(srtArry.join('='));
            }
        }
        return theRequest;
    },
    deleteEmptyJsonItem(message) {
        //var json=Object.create(message);
        let json={};
        console.log('json');
        for(var i in message){
            if(message[i] || json[i]===0){
                json[i]=message[i];
            }
        }
        console.log(json);
        return json;
    }
}

export default fanUtils;
