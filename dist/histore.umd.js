!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.histore=e()}(this,function(){return function(){if(void 0===history)return{get:function(){},set:function(){}};var t=function(t){return function(e,n,o){return t.call(history,Object.assign({},history.state,e||{}),n,o)}};return history.pushState=t(history.pushState),history.replaceState=t(history.replaceState),{set:function(t,e){var n={};n[t]=e,history.replaceState(n)},get:function(t){return history.state&&history.state[t]}}}});
//# sourceMappingURL=histore.umd.js.map
