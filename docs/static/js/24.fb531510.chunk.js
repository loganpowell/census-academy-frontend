(this["webpackJsonpcope-frontend"]=this["webpackJsonpcope-frontend"]||[]).push([[24],{477:function(t,n,e){"use strict";e.r(n),e.d(n,"amplify_nav",(function(){return p})),e.d(n,"amplify_sign_out",(function(){return h}));var r=e(17),o=e(14),i=e(45),u=e(165),a=e(11),c=e(31),s=e(172),l=function(t,n,e,r){return new(e||(e=Promise))((function(o,i){function u(t){try{c(r.next(t))}catch(n){i(n)}}function a(t){try{c(r.throw(t))}catch(n){i(n)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(u,a)}c((r=r.apply(t,n||[])).next())}))},f=function(t,n){var e,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(e)throw new TypeError("Generator is already executing.");for(;u;)try{if(e=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=n.call(t,u)}catch(a){i=[6,a],r=0}finally{e=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},p=function(){function t(t){Object(r.k)(this,t)}return t.prototype.render=function(){return Object(r.i)("nav",{class:"nav"},Object(r.i)("slot",null))},t}();p.style=".nav{display:-ms-flexbox;display:flex;-ms-flex:1 1 0%;flex:1 1 0%;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:center;align-items:center}.nav>*{margin:0 0.5em}";var h=function(){function t(t){Object(r.k)(this,t),this.handleAuthStateChange=s.d,this.buttonText=a.a.SIGN_OUT}return t.prototype.signOut=function(t){return l(this,void 0,void 0,(function(){var n;return f(this,(function(e){switch(e.label){case 0:if(t&&t.preventDefault(),!u.a||"function"!==typeof u.a.signOut)throw new Error(c.d);e.label=1;case 1:return e.trys.push([1,3,,4]),[4,u.a.signOut()];case 2:return e.sent(),this.handleAuthStateChange(i.a.SignedOut),[3,4];case 3:return n=e.sent(),Object(s.a)(n),[3,4];case 4:return[2]}}))}))},t.prototype.render=function(){var t=this;return Object(r.i)("amplify-button",{slot:"sign-out",onClick:function(n){return t.signOut(n)},"data-test":"sign-out-button"},o.a.get(this.buttonText))},t}()}}]);
//# sourceMappingURL=24.fb531510.chunk.js.map