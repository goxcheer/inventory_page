import axios from 'axios'
export default {
  /**
   * 基础工具---组合URL参数
   * @param params
   * @returns {string}
   */
  getParamsStr: function (params) {
    var paramStr = "";
    if (params) {
      for (var k in params) {
        if (k && params[k] != null) {
          var sParaVal = "";
          if (typeof params[k] == "string" || typeof params[k] == "number") {
            sParaVal = params[k];
          } else if (typeof params[k] == "object") {
            sParaVal = JSON.stringify(params[k]);
          }
          paramStr += '&' + k + '=' + sParaVal;
        }
      }
    }
    if (paramStr) {
      paramStr = "?" + paramStr.substring(1);
    }
    return paramStr;
  },
  /**
   * 基础ajax提交参数封装
   * @options Object ajax参数
   * @options.isPassFalse  Boolean 是否允许通过data.result == 'false'的情况
   * @iview 用于显示加载中动画
   * */
  ajax: function (option) {
    var t = this;
    let iview = gMain.components.iView;
    //请求数据防xss攻击处理
    if (typeof option.contentType !== 'boolean' && option.data) {
      var newData = "";
      var sType = typeof option.data;
      if (sType === "string") {
        newData = option.data;
      } else {
        newData = JSON.stringify(option.data);
      }
      newData = newData.replace(/<script/igm, "&lt;script").replace(/<\/script>/igm, "&lt;/script&gt;");
      if (sType === "string") {
        option.data = newData;
      } else {
        option.data = JSON.parse(newData);
      }
    }

    //导出下载文件的统一处理
    if(option.type == "download"){
      return t.handleDownload(option); //执行下载方法
    }

    //默认参数
    var data = {
      method: "post",
      responseType: "json",
      contentType: "application/json;charset=UTF-8",
      baseURL:gMain.apiPath,
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.readyState == 4) {
          iview.Message.error('请求出错，请重试');//给个错误提示
        }
      }
    };
    Object.assign(data,option);
    //重写success，如果传回的data.result值为true,才产生回调，供模块使用
    data.success = function (obj, textStatus, jqXHR) {
      //返回数据防xss攻击处理
      if (obj) {
        var newData = "";
        var sType = typeof obj;
        if (sType === "string") {
          newData = obj;
        } else {
          newData = JSON.stringify(obj);
        }
        newData = newData.replace(/<script/igm, "&lt;script").replace(/<\/script>/igm, "&lt;/script&gt;");
        if (sType === "string") {
          obj = newData;
        } else {
          obj = JSON.parse(newData);
        }
      }
      if (data.dataType == "html") {
        obj = JSON.parse(obj);
      }

      //如果后端返回的错误统一拦截提示
      /*if (obj.result == "false" && !option.isPassFalse) {
        obj.resultDesc && iview.Message.error(obj.resultDesc); //给个错误提示
      }*/
      typeof option.success == "function" && option.success(obj, textStatus, jqXHR);
    }
    data.error = function(data){
      if (data.request.readyState == 4) {
        iview.Message.error('请求出错，请重试');//给个错误提示
      }
      typeof option.error == "function" && option.error(data);
    }

    //调用ajax前先保存路由
    t.currentPath = location.pathname + location.hash;
    axios(data).then((res)=>{
      data.success(res.data);
    }).catch((error)=>{
      data.error(error);
    });
  },
  /**
   * 下载请求处理
   */
  handleDownload:function(option){
    var t = this;
    var url = option.url + t.getParamsStr(option.data);
    this.$router.push(encodeURI(url))
  },
  /**
   * 是否是移动端浏览器环境
   */
  isMobileBrowser:function () {
    var t = this;
    var flag = false;

    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    //如果是移动端就跳转到app下载页面
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      flag = true;
    } else {
      flag = false;
    }
    return flag;
  }
}
