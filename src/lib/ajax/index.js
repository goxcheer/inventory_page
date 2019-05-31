import commonAjax from './ajax'

const Ajax =  {
  /**
   * 基于$.ajax方法改写，使用方法与$.ajax一样,如：Ajax.ajax({});
   * */
  $ajax:function (options) {
    var oData = {};
    // 特殊的options处理
    Object.assign(oData,options);
    oData.success = function(obj){
      typeof options.success == "function" && options.success(obj);
    };
    return commonAjax.ajax(oData);
  },
}

export default Ajax
