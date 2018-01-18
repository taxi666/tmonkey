export default {
        api: {
            base: 'http://' + window.location.hostname,
        },
        GetRequest: GetRequest,
        gotoScan: gotoScan,
        alert: pop,
        getTimeFromStr: getTimeFromStr,
        param2String:param2String,
        setCookie:setCookie,
        getCookie:getCookie,
        clearCookie:clearCookie,
        packMessage:packMessage
    }

    var ua = navigator.userAgent.toLowerCase();

    function gotoScan() {
        if (isIOS()) {
            window.location.href = 'http://cmbiphone/tool';
        } else if (isAndroid()) {
            window.location.href = 'http://cmbandroid/tool';
        }
    }

    function isIOS() {
        if (/iphone|ipad|ipod/.test(ua)) {
            return true;
        } else {
            return false;
        }
    }

    function isAndroid() {
        if (/android/.test(ua)) {
            return true;
        } else {
            return false;
        }
    }

    function GetRequest() {
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
    }

    function pop(p, fn) {
        var option = {top: "30%", html: ''};
        if (typeof p === 'object') {
            option = $.extend(option, p);
        } else if (typeof p === 'string') {
            option.html = '<div class="modal-content"><div class="tip-modal-header header_dal"><P class="fail_margin">提示</P></div><div class="modal-body mod_body"><div class="col-xs-12 no-padding"><div class="modal_boy"><P class="fail_margin">' + p + '</P><div class="modal_button"><div class="col-xs-12"><div class="button_determine" data-dismiss="modal">确认</div></div></div></div></div></div></div>';
        }
        var html = '<div class="modal fade" id="myModal"tabindex="-1"role="dialog"aria-labelledby="myModalLabel"><div class="modal-dialog"role="document" id="modal_body"></div></div>  <div class="modal-backdrop fade in"></div>';
        var elment = $("#myModal");
        if (elment.length == 0) {
            $('body').append(html);
            elment = $("#myModal");
        }
        $("#modal_body").html(option.html);
        if (fn == null) {
            elment.css("top", option.top);
            elment.addClass('in');
            $('.modal-backdrop').show();
        } else {
            elment.css("top", option.top);
            elment.addClass('in');
            $('.modal-backdrop').show();
        }
        var obj = $(".modal-backdrop:not(.modal_zdy)");
        obj.not(obj[0]).remove();

        $('.modal_button').click(function () {
            elment.removeClass('in');
            $('.modal-backdrop').hide();
        })

    };

    function getTimeFromStr(time, isTime){
        var date = new Date(time);
        var year = date.getFullYear() + '-';
        var month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var day = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        if(isTime){
            var hour = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
            var minute = (date.getMinutes() < 10? '0'+ date.getMinutes() : date.getMinutes()) + ':';
            var second = (date.getSeconds() < 10? '0'+date.getSeconds() : date.getSeconds());
            return (year + month + day + hour + minute + second);
        }else{
            return (year + month + day);
        }
    }
    function param2String(param){
        var str='',arr=[],_return={};
        for(var key in param.body){
            arr.push(key+'="'+param.body[key]+'"');
        }
        _return.body='{'+arr.join(',')+'}';
        arr=[];
      
        for(var key in param.syshead){
            arr.push(key+'="'+param.syshead[key]+'"');
        }
        _return.syshead='{'+arr.join(',')+'}';
        return _return;
    }
    //设置cookie
    function setCookie(name, value, day,path) {
        var path=path || '/';
        var expiration = new Date((new Date()).getTime() + day * 24 * 3600 * 1000);
        document.cookie = name
        + "="
        + escape(value)
        + ";path="+path+"; expires=" + expiration
            .toGMTString();
    };
    //获取cookie
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return unescape(c.substring(name.length, c.length));
        }
        return "";
    };
    //清除cookie
    function clearCookie(name) {
        setCookie(name, "", -1);
    };
    function packMessage(message) {
        var msg = JSON.stringify(message);
        return {msg: msg};
    }

