(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["main"],{"02f4":function(t,e,n){var r=n("4588"),a=n("be13");t.exports=function(t){return function(e,n){var i,s,o=String(a(e)),u=r(n),l=o.length;return u<0||u>=l?t?"":void 0:(i=o.charCodeAt(u),i<55296||i>56319||u+1===l||(s=o.charCodeAt(u+1))<56320||s>57343?t?o.charAt(u):i:t?o.slice(u,u+2):s-56320+(i-55296<<10)+65536)}}},"0390":function(t,e,n){"use strict";var r=n("02f4")(!0);t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},"0bfb":function(t,e,n){"use strict";var r=n("cb7c");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"214f":function(t,e,n){"use strict";n("b0c5");var r=n("2aba"),a=n("32e9"),i=n("79e5"),s=n("be13"),o=n("2b4c"),u=n("520a"),l=o("species"),c=!i(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),f=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var h=o(t),d=!i(function(){var e={};return e[h]=function(){return 7},7!=""[t](e)}),v=d?!i(function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[l]=function(){return n}),n[h](""),!e}):void 0;if(!d||!v||"replace"===t&&!c||"split"===t&&!f){var y=/./[h],m=n(s,h,""[t],function(t,e,n,r,a){return e.exec===u?d&&!a?{done:!0,value:y.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),b=m[0],p=m[1];r(String.prototype,t,b),a(RegExp.prototype,h,2==e?function(t,e){return p.call(t,this,e)}:function(t){return p.call(t,this)})}}},"28a5":function(t,e,n){"use strict";var r=n("aae3"),a=n("cb7c"),i=n("ebd6"),s=n("0390"),o=n("9def"),u=n("5f1b"),l=n("520a"),c=n("79e5"),f=Math.min,h=[].push,d="split",v="length",y="lastIndex",m=4294967295,b=!c(function(){RegExp(m,"y")});n("214f")("split",2,function(t,e,n,c){var p;return p="c"=="abbc"[d](/(b)*/)[1]||4!="test"[d](/(?:)/,-1)[v]||2!="ab"[d](/(?:ab)*/)[v]||4!="."[d](/(.?)(.?)/)[v]||"."[d](/()()/)[v]>1||""[d](/.?/)[v]?function(t,e){var a=String(this);if(void 0===t&&0===e)return[];if(!r(t))return n.call(a,t,e);var i,s,o,u=[],c=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),f=0,d=void 0===e?m:e>>>0,b=new RegExp(t.source,c+"g");while(i=l.call(b,a)){if(s=b[y],s>f&&(u.push(a.slice(f,i.index)),i[v]>1&&i.index<a[v]&&h.apply(u,i.slice(1)),o=i[0][v],f=s,u[v]>=d))break;b[y]===i.index&&b[y]++}return f===a[v]?!o&&b.test("")||u.push(""):u.push(a.slice(f)),u[v]>d?u.slice(0,d):u}:"0"[d](void 0,0)[v]?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,r){var a=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,a,r):p.call(String(a),n,r)},function(t,e){var r=c(p,t,this,e,p!==n);if(r.done)return r.value;var l=a(t),h=String(this),d=i(l,RegExp),v=l.unicode,y=(l.ignoreCase?"i":"")+(l.multiline?"m":"")+(l.unicode?"u":"")+(b?"y":"g"),g=new d(b?l:"^(?:"+l.source+")",y),x=void 0===e?m:e>>>0;if(0===x)return[];if(0===h.length)return null===u(g,h)?[h]:[];var w=0,_=0,k=[];while(_<h.length){g.lastIndex=b?_:0;var z,I=u(g,b?h:h.slice(_));if(null===I||(z=f(o(g.lastIndex+(b?0:_)),h.length))===w)_=s(h,_,v);else{if(k.push(h.slice(w,_)),k.length===x)return k;for(var D=1;D<=I.length-1;D++)if(k.push(I[D]),k.length===x)return k;_=w=z}}return k.push(h.slice(w)),k}]})},"2f21":function(t,e,n){"use strict";var r=n("79e5");t.exports=function(t,e){return!!t&&r(function(){e?t.call(null,function(){},1):t.call(null)})}},3846:function(t,e,n){n("9e1e")&&"g"!=/./g.flags&&n("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:n("0bfb")})},"386b":function(t,e,n){var r=n("5ca1"),a=n("79e5"),i=n("be13"),s=/"/g,o=function(t,e,n,r){var a=String(i(t)),o="<"+e;return""!==n&&(o+=" "+n+'="'+String(r).replace(s,"&quot;")+'"'),o+">"+a+"</"+e+">"};t.exports=function(t,e){var n={};n[t]=e(o),r(r.P+r.F*a(function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}),"String",n)}},"454f":function(t,e,n){n("46a7");var r=n("584a").Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},"46a7":function(t,e,n){var r=n("63b6");r(r.S+r.F*!n("8e60"),"Object",{defineProperty:n("d9f6").f})},"50f9":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticStyle:{"margin-top":"50px"}},[n("b-jumbotron",{attrs:{header:"Gaussian Elimination",lead:"Gaussian Elimination Demo"}},[n("p",[t._v("developed by Xu.Wang")]),n("b-btn",{attrs:{variant:"primary",href:"https://github.com/RaymondMcGuire/TUT2019-Numerical-Computation"}},[t._v("\n      Source code\n    ")])],1),n("b-card",{attrs:{"bg-variant":"light jumbotron"}},[n("b-form-group",{staticClass:"mb-0",attrs:{"label-cols-lg":"3",label:"Input Parameters","label-size":"lg","label-class":"font-weight-bold pt-0"}},[n("b-form-group",{attrs:{"label-cols-sm":"3",label:"Matrix A:","label-align-sm":"right","label-for":"MatrixA"}},[n("b-form-textarea",{attrs:{id:"MatrixA",rows:"3","max-rows":"6"},model:{value:t.data.A,callback:function(e){t.$set(t.data,"A",e)},expression:"data.A"}})],1),n("b-form-group",{attrs:{"label-cols-sm":"3",label:"Vector b:","label-align-sm":"right","label-for":"Vectorb"}},[n("b-form-textarea",{attrs:{id:"Vectorb",rows:"3","max-rows":"6"},model:{value:t.data.b,callback:function(e){t.$set(t.data,"b",e)},expression:"data.b"}})],1)],1)],1),n("b-card",{staticStyle:{"margin-bottom":"2rem"},attrs:{"bg-variant":"light text-center"}},[n("b-btn",{attrs:{variant:"primary"},on:{click:t.compute}},[t._v("\n      Solve Equation System\n    ")])],1),n("b-card",{attrs:{"bg-variant":"light jumbotron"}},[n("b-form-group",{staticClass:"mb-0",attrs:{"label-cols-lg":"3",label:"Output","label-size":"lg","label-class":"font-weight-bold pt-0"}},[n("b-form-group",{attrs:{"label-cols-sm":"3",label:"Equation System:","label-align-sm":"right","label-for":"oformula"}},[n("vue-mathjax",{attrs:{id:"oformula",formula:t.data.formula}})],1),n("b-form-group",{attrs:{"label-cols-sm":"3",label:"Solutions:","label-align-sm":"right","label-for":"osolution"}},[n("vue-mathjax",{attrs:{id:"osolution",formula:t.data.osolution}})],1)],1)],1)],1)},a=[],i=(n("6b54"),n("87b3"),n("28a5"),n("d225")),s=n("85f2"),o=n.n(s);function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),o()(t,r.key,r)}}function l(t,e,n){return e&&u(t.prototype,e),n&&u(t,n),t}var c=n("308d"),f=n("6bb5"),h=n("4e2b"),d=n("9ab4"),v=n("60a3");function y(t,e){return t*t>e*e?t:e}function m(t,e){return t*t<e*e?t:e}function b(t,e){return 10*t*(10*e)/100}n("673e");var p=n("7618"),g=function(){function t(e,n){Object(i["a"])(this,t),this._dimension=e;var r=0;if(void 0===n)for(this._elements=new Array(e),r=0;r<e;r++)this._elements[r]=0;else for(this._elements=new Array(e),r=0;r<n.length;r++)this._elements[r]=n[r]}return l(t,[{key:"set",value:function(t){if(void 0!==t){if(t.size()!==this.size())return console.log("dimension is not correct!"),-1;for(var e=0;e<t.size();e++)this._elements[e]=t.data()[e]}}},{key:"setZero",value:function(){for(var t=0;t<this._dimension;t++)this._elements[t]=0}},{key:"setOne",value:function(){for(var t=0;t<this._dimension;t++)this._elements[t]=1}},{key:"data",value:function(){return this._elements}},{key:"at",value:function(t){return t<0||t>=this.size()?(console.log("index is not correct!"),-1):this._elements[t]}},{key:"dot",value:function(t){if(void 0===t)return console.log("others is not correct!"),-1;if(t.size()!==this.size())return console.log("dimension is not correct!"),-1;for(var e=0,n=0;n<this.size();n++)e+=this._elements[n]*t.data()[n];return e}},{key:"lengthSquared",value:function(){return this.dot(this)}},{key:"length",value:function(){return Math.sqrt(this.lengthSquared())}},{key:"normalize",value:function(){this.idiv(this.length())}},{key:"sum",value:function(){for(var t=0,e=0;e<this._dimension;e++)t+=this._elements[e];return t}},{key:"size",value:function(){return this._dimension}},{key:"avg",value:function(){return this.sum()/this.size()}},{key:"min",value:function(){for(var t=this._elements[0],e=1;e<this._dimension;e++)t=Math.min(t,this._elements[e]);return t}},{key:"max",value:function(){for(var t=this._elements[0],e=1;e<this._dimension;e++)t=Math.max(t,this._elements[e]);return t}},{key:"absmax",value:function(){for(var t=this._elements[0],e=1;e<this._dimension;e++)t=y(t,this._elements[e]);return t}},{key:"absmin",value:function(){for(var t=this._elements[0],e=1;e<this._dimension;e++)t=m(t,this._elements[e]);return t}},{key:"distanceSquaredTo",value:function(t){if(t.size()!==this.size())return console.log("dimension is not correct!"),-1;for(var e=0,n=0;n<this.size();n++){var r=this._elements[n]-t.data()[n];e+=r*r}return e}},{key:"distanceTo",value:function(t){return Math.sqrt(this.distanceSquaredTo(t))}},{key:"isEqual",value:function(t){if(this.size()!==t.size())return!1;for(var e=0;e<this.size();e++)if(this.at(e)!==t.at(e))return!1;return!0}},{key:"isSimilar",value:function(t,e){if(void 0===t)return!1;if(this.size()!==t.size())return!1;for(var n=0;n<this.size();n++)if(Math.abs(this.at(n)-t.at(n))>e)return!1;return!0}},{key:"add",value:function(e){var n=0;if("object"===Object(p["a"])(e)){var r=e;if(r.size()!==this.size())return new t(1,[-1]);var a=new t(this.size(),this.data());for(n=0;n<a.size();n++)a.data()[n]+=r.data()[n];return a}if("number"===typeof e){var i=e,s=new t(this.size(),this.data());for(n=0;n<s.size();n++)s.data()[n]+=i;return s}return new t(1,[-1])}},{key:"sub",value:function(e){var n=0;if("object"===Object(p["a"])(e)){var r=e;if(r.size()!==this.size())return new t(1,[-1]);var a=new t(this.size(),this.data());for(n=0;n<a.size();n++)a.data()[n]-=r.data()[n];return a}if("number"===typeof e){var i=e,s=new t(this.size(),this.data());for(n=0;n<s.size();n++)s.data()[n]-=i;return s}return new t(1,[-1])}},{key:"mul",value:function(e){var n=0;if("object"===Object(p["a"])(e)){var r=e;if(r.size()!==this.size())return new t(1,[-1]);var a=new t(this.size(),this.data());for(n=0;n<a.size();n++)a.data()[n]*=r.data()[n];return a}if("number"===typeof e){var i=e,s=new t(this.size(),this.data());for(n=0;n<s.size();n++)s.data()[n]*=i;return s}return new t(1,[-1])}},{key:"div",value:function(e){var n=0;if("object"===Object(p["a"])(e)){var r=e;if(r.size()!==this.size())return new t(1,[-1]);var a=new t(this.size(),this.data());for(n=0;n<a.size();n++)a.data()[n]/=r.data()[n];return a}if("number"===typeof e){var i=e;if(0===i)return new t(1,[-1]);var s=new t(this.size(),this.data());for(n=0;n<s.size();n++)s.data()[n]/=i;return s}return new t(1,[-1])}},{key:"idiv",value:function(t){this.set(this.div(t))}},{key:"iadd",value:function(t){this.set(this.add(t))}},{key:"isub",value:function(t){this.set(this.sub(t))}},{key:"imul",value:function(t){this.set(this.mul(t))}},{key:"setAt",value:function(t,e){if(t<0||t>=this.size())return-1;this._elements[t]=e}}]),t}(),x=(n("55dd"),function(){function t(e,n,r){if(Object(i["a"])(this,t),this._M=e,this._N=n,void 0===r)this._size=0,this._elements=[];else{this._size=r.length,this._elements=new Array(this.size());for(var a=0;a<r.length;a++)this._elements[a]=r[a];this._elements.sort(function(t,e){if(t[0]<e[0])return-1;if(t[0]>e[0])return 1;if(t[0]===e[0]){if(t[1]<e[1])return-1;if(t[1]>e[1])return 1}return 0})}}return l(t,[{key:"size",value:function(){return this._size}},{key:"rows",value:function(){return this._M}},{key:"cols",value:function(){return this._N}},{key:"data",value:function(){return this._elements}},{key:"set",value:function(t){if(t.rows()!==this.rows()||t.cols()!==this.cols())return console.log("dimension is not correct!"),-1;this._size=t.size(),this._elements=new Array(this.size());for(var e=0;e<t.size();e++)this._elements[e]=t.data()[e]}},{key:"forEachData",value:function(t){for(var e=0;e<this.size();e++)t(this.data()[e])}},{key:"forEachIndex",value:function(t){for(var e=0;e<this.size();e++){var n=this.data()[e];t(n[0],n[1])}}},{key:"_searchElemByRow",value:function(t){for(var e=this.data(),n=0;n<e.length;n++)if(e[n][0]===t)return n;return-1}},{key:"_searchElemByIndexs",value:function(t,e){for(var n=this.data(),r=0;r<n.length;r++)if(n[r][0]===t&&n[r][1]===e)return r;return-1}},{key:"getDataByIndexs",value:function(t,e){var n=this._searchElemByIndexs(t,e);return-1===n?0:this.data()[n][2]}},{key:"setDataByRowCol",value:function(t,e,n){var r=this._searchElemByIndexs(t,e);-1===r?(this._size+=1,this.data().push([t,e,n])):this.data()[r][2]=n}},{key:"addDataByIndexs",value:function(t,e,n){this._size+=1,this.data().push([t,e,n])}},{key:"setTupleByIndexs",value:function(t){var e=this._searchElemByIndexs(t[0],t[1]);-1===e?(this._size+=1,this.data().push(t)):this.data()[e]=t}},{key:"_transpose",value:function(){var e=this,n=new t(this.rows(),this.cols());return this.forEachIndex(function(t,r){n.setTupleByIndexs([r,t,e.getDataByIndexs(t,r)])}),n.data().sort(function(t,e){if(t[0]<e[0])return-1;if(t[0]>e[0])return 1;if(t[0]===e[0]){if(t[1]<e[1])return-1;if(t[1]>e[1])return 1}return 0}),n}},{key:"transpose",value:function(){this.set(this._transpose())}},{key:"mulMat",value:function(e){for(var n=this.rows(),r=e.cols(),a=new t(n,r),i=new Array(this.rows()),s=0;s<this.rows();s++)i[s]=[];this.forEachData(function(t){var e=t[0],n=t[1];i[e].push(n)});for(var o=0;o<e.cols();o++)for(var u=0,l=0;l<this.rows();l++)if(0!==i[l].length){for(var c=0,f=0;f<i[l].length;f++){var h=i[l][f],d=this.data()[u][2];u++,c+=b(d,e.getDataByIndexs(h,o))}0!==c&&a.addDataByIndexs(l,o,c)}return a.data().sort(function(t,e){if(t[0]<e[0])return-1;if(t[0]>e[0])return 1;if(t[0]===e[0]){if(t[1]<e[1])return-1;if(t[1]>e[1])return 1}return 0}),a}},{key:"spMat2Mat",value:function(){var t=new w(this.rows(),this.cols());return this.forEachData(function(e){t.setDataByIndexs(e[0],e[1],e[2])}),t}},{key:"spMat2Vec",value:function(){var t=this;if(1!==this.rows()&&1!==this.cols())return console.log("can not convert to vector!"),new g(1,[-1]);for(var e=this.rows()*this.cols(),n=new Array(e),r=0;r<e;r++)n[r]=0;this.forEachData(function(e){var r=e[1===t.rows()?1:0];n[r]=e[2]});var a=new g(e,n);return a}},{key:"mulVec",value:function(t){if(t.size()!==this.cols())return console.log("vector shape is not right!"),new g(1,[-1]);var e=new w(t.size(),1,t.data()),n=this.mulMat(e),r=n.spMat2Vec();return r}},{key:"printSparseMatrix",value:function(){var t="";this.forEachData(function(e){t+="["+e+"]"}),t+="",console.log(t)}}]),t}()),w=function(){function t(e,n,r){Object(i["a"])(this,t);var a=0;if(this._M=e,this._N=n,this._size=e*n,void 0===r)for(this._elements=new Array(this.size()),a=0;a<this.size();a++)this._elements[a]=0;else for(this._elements=new Array(this.size()),a=0;a<r.length;a++)this._elements[a]=r[a]}return l(t,[{key:"set",value:function(t){if(t.size()===this.size()&&t.rows()===this.rows()&&t.cols()===this.cols())for(var e=0;e<t.size();e++)this._elements[e]=t.data()[e];else console.log("dimension is not correct!")}},{key:"data",value:function(){return this._elements}},{key:"getDataByIndexs",value:function(t,e){var n=t*this._N+e;return this.data()[n]}},{key:"getDeterminant",value:function(e,n){var r=this,a=new t(this.rows()-1,this.cols()-1),i=0;return this.forEachIndex(function(t,s){if(t!==e&&s!==n){var o=Math.floor(i/(r.cols()-1)),u=i%(r.cols()-1);a.setDataByIndexs(o,u,r.getDataByIndexs(t,s)),i++}}),a}},{key:"setDataByIndexs",value:function(t,e,n){var r=t*this._N+e;this.data()[r]=n}},{key:"size",value:function(){return this._size}},{key:"rows",value:function(){return this._M}},{key:"cols",value:function(){return this._N}},{key:"forEachIndex",value:function(t){for(var e=0;e<this.rows();e++)for(var n=0;n<this.cols();n++)t(e,n)}},{key:"forEachData",value:function(t){for(var e=0;e<this.rows();e++)for(var n=0;n<this.cols();n++)t(this.getDataByIndexs(e,n))}},{key:"forEachRow",value:function(t){for(var e=0;e<this.rows();e++){for(var n=Array(this.cols()),r=0;r<this.cols();r++)n[r]=this.getDataByIndexs(e,r);t(n)}}},{key:"forEachCol",value:function(t){for(var e=0;e<this.cols();e++){for(var n=Array(this.rows()),r=0;r<this.rows();r++)n[r]=this.getDataByIndexs(r,e);t(n)}}},{key:"_ones",value:function(){var e=new t(this.rows(),this.cols());return e.forEachIndex(function(t,n){e.setDataByIndexs(t,n,1)}),e}},{key:"ones",value:function(){this.set(this._ones())}},{key:"_values",value:function(e){var n=new t(this.rows(),this.cols());return n.forEachIndex(function(t,r){n.setDataByIndexs(t,r,e)}),n}},{key:"setValues",value:function(t){this.set(this._values(t))}},{key:"_random",value:function(){var e=new t(this.rows(),this.cols());return e.forEachIndex(function(t,n){e.setDataByIndexs(t,n,Math.random())}),e}},{key:"random",value:function(){this.set(this._random())}},{key:"_transpose",value:function(){var e=this,n=new t(this.rows(),this.cols());return n.forEachIndex(function(t,r){n.setDataByIndexs(t,r,e.getDataByIndexs(r,t))}),n}},{key:"mat2SpMat",value:function(){var t=this,e=new Array;return this.forEachIndex(function(n,r){var a=t.getDataByIndexs(n,r);0!==a&&e.push([n,r,a])}),new x(this.rows(),this.cols(),e)}},{key:"mat2Vec",value:function(){if(1!==this.rows()&&1!==this.cols())return console.log("can not convert to vector!"),new g(1,[-1]);var t=new g(this.size(),this.data());return t}},{key:"transpose",value:function(){this.set(this._transpose())}},{key:"sub",value:function(e){var n=this,r=new t(this.rows(),this.cols());return r.forEachIndex(function(t,a){var i=n.getDataByIndexs(t,a)-e.getDataByIndexs(t,a);r.setDataByIndexs(t,a,i)}),r}},{key:"mulMat",value:function(e){var n=this,r=this.rows(),a=e.cols(),i=new t(r,a);return i.forEachIndex(function(t,r){for(var a=0,s=0;s<n.cols();s++)a+=b(n.getDataByIndexs(t,s),e.getDataByIndexs(s,r));i.setDataByIndexs(t,r,a)}),i}},{key:"mulVec",value:function(e){if(e.size()!==this.cols())return console.log("vector shape is not right!"),new g(1,[-1]);var n=new t(e.size(),1,e.data()),r=this.mulMat(n),a=r.mat2Vec();return a}},{key:"same",value:function(t){var e=this;return this.cols()===t.cols()&&this.rows()===t.rows()&&(this.forEachIndex(function(n,r){if(e.getDataByIndexs(n,r)!==t.getDataByIndexs(n,r))return!1}),!0)}},{key:"printMatrix",value:function(){var t="[\n";this.forEachRow(function(e){t+=e.join(","),t+="\n"}),t+="]",console.log(t)}}]),t}();function _(t){var e,n,r=0,a=0,i=t.rows();for(a=0;a<i-1;a++){var s=a,o=Math.abs(t.getDataByIndexs(a,a));for(e=a+1;e<i;e++)Math.abs(t.getDataByIndexs(e,a))>o&&(s=e,o=Math.abs(t.getDataByIndexs(e,a)));if(s!==a)for(e=a;e<=i;e++){var u=t.getDataByIndexs(a,e);t.setDataByIndexs(a,e,t.getDataByIndexs(s,e)),t.setDataByIndexs(s,e,u)}for(e=a+1;e<i;e++)for(n=a+1;n<=i;n++)r=t.getDataByIndexs(e,n)-t.getDataByIndexs(a,n)*t.getDataByIndexs(e,a)/t.getDataByIndexs(a,a),t.setDataByIndexs(e,n,r)}var l=[];for(a=i-1;a>=0;a--){for(n=a+1;n<i;n++)r=t.getDataByIndexs(a,i)-t.getDataByIndexs(a,n)*l[n],t.setDataByIndexs(a,i,r);l[a]=t.getDataByIndexs(a,i)/t.getDataByIndexs(a,a)}return l}var k=n("7b93");v["b"].use(k);var z=function(t){function e(){var t;return Object(i["a"])(this,e),t=Object(c["a"])(this,Object(f["a"])(e).apply(this,arguments)),t.data={A:"-2,-2,0\n2,1,1\n4,2,3",b:"-1\n2\n1",row:0,col:0,formula:"",osolution:""},t}return Object(h["a"])(e,t),l(e,[{key:"mounted",value:function(){this.compute()}},{key:"initFormula",value:function(){var t="$$\\left\\{\\begin{array}{c}",e=this.data.b.split("\n");this.data.row=e.length;var n=this.data.A.split("\n");this.data.col=n[0].split(",").length,this.m_A=new w(this.data.row,this.data.col+1);for(var r=0;r<this.data.row;r++){for(var a=n[r].split(","),i=0;i<this.data.col;i++){var s=+a[i];this.m_A.setDataByIndexs(r,i,s),t+=s.toString()+"x_"+(i+1).toString(),i===this.data.col-1?t+="= &":t+="+"}this.m_A.setDataByIndexs(r,this.data.col,+e[r]),t+=e[r]+"\\\\"}t+="\\end{array}\\right.$$",this.data.formula=t}},{key:"compute",value:function(){this.initFormula();for(var t=_(this.m_A),e="$$",n=0;n<t.length;n++){var r=t[n];e+="x_"+(n+1).toString()+"="+r+"\\\\"}e+="$$",this.data.osolution=e}}]),e}(v["b"]);z=d["a"]([v["a"]],z);var I=z,D=I,E=n("0c7c"),B=Object(E["a"])(D,r,a,!1,null,null,null);e["default"]=B.exports},"520a":function(t,e,n){"use strict";var r=n("0bfb"),a=RegExp.prototype.exec,i=String.prototype.replace,s=a,o="lastIndex",u=function(){var t=/a/,e=/b*/g;return a.call(t,"a"),a.call(e,"a"),0!==t[o]||0!==e[o]}(),l=void 0!==/()??/.exec("")[1],c=u||l;c&&(s=function(t){var e,n,s,c,f=this;return l&&(n=new RegExp("^"+f.source+"$(?!\\s)",r.call(f))),u&&(e=f[o]),s=a.call(f,t),u&&s&&(f[o]=f.global?s.index+s[0].length:e),l&&s&&s.length>1&&i.call(s[0],n,function(){for(c=1;c<arguments.length-2;c++)void 0===arguments[c]&&(s[c]=void 0)}),s}),t.exports=s},"55dd":function(t,e,n){"use strict";var r=n("5ca1"),a=n("d8e8"),i=n("4bf8"),s=n("79e5"),o=[].sort,u=[1,2,3];r(r.P+r.F*(s(function(){u.sort(void 0)})||!s(function(){u.sort(null)})||!n("2f21")(o)),"Array",{sort:function(t){return void 0===t?o.call(i(this)):o.call(i(this),a(t))}})},"5ee4":function(t,e,n){(function(e){t.exports=function(t){function e(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,n){var r=n(3)(n(2),n(4),null,null);t.exports=r.exports},function(t,n,r){"use strict";function a(t){t.component("vue-mathjax",s.a)}Object.defineProperty(n,"__esModule",{value:!0}),n.install=a;var i=r(0),s=r.n(i);r.d(n,"VueMathjax",function(){return s.a});var o={version:"0.0.8",install:a};n.default=o;var u=null;"undefined"!=typeof window?u=window.Vue:"undefined"!=typeof e&&(u=e.Vue),u&&u.use(o)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["formula"],watch:{formula:function(){this.renderMathJax()}},mounted:function(){this.renderMathJax()},methods:{renderContent:function(){this.$refs.mathJaxEl.textContent=this.formula},renderMathJax:function(){this.renderContent(),window.MathJax&&(window.MathJax.Hub.Config({tex2jax:{inlineMath:[["$","$"],["(",")"]],displayMath:[["$$","$$"],["[","]"]],processEscapes:!0,processEnvironments:!0},displayAlign:"center","HTML-CSS":{styles:{".MathJax_Display":{margin:0}},linebreaks:{automatic:!0}}}),window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub,this.$refs.mathJaxEl]))}}}},function(t,e){t.exports=function(t,e,n,r){var a,i=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(a=t,i=t.default);var o="function"==typeof i?i.options:i;if(e&&(o.render=e.render,o.staticRenderFns=e.staticRenderFns),n&&(o._scopeId=n),r){var u=o.computed||(o.computed={});Object.keys(r).forEach(function(t){var e=r[t];u[t]=function(){return e}})}return{esModule:a,exports:i,options:o}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",{ref:"mathJaxEl"},[t._v(t._s(t.formula))])},staticRenderFns:[]}}])}).call(this,n("24aa"))},"5f1b":function(t,e,n){"use strict";var r=n("23c6"),a=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var i=n.call(t,e);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return a.call(t,e)}},"673e":function(t,e,n){"use strict";n("386b")("sub",function(t){return function(){return t(this,"sub","","")}})},"6b54":function(t,e,n){"use strict";n("3846");var r=n("cb7c"),a=n("0bfb"),i=n("9e1e"),s="toString",o=/./[s],u=function(t){n("2aba")(RegExp.prototype,s,t,!0)};n("79e5")(function(){return"/a/b"!=o.call({source:"a",flags:"b"})})?u(function(){var t=r(this);return"/".concat(t.source,"/","flags"in t?t.flags:!i&&t instanceof RegExp?a.call(t):void 0)}):o.name!=s&&u(function(){return o.call(this)})},"73dd":function(t,e,n){},"7b93":function(t,e,n){"use strict";n.r(e);var r=n("5ee4"),a=n.n(r);for(var i in n.d(e,"default",function(){return a.a}),r)["default","default"].indexOf(i)<0&&function(t){n.d(e,t,function(){return r[t]})}(i);n("73dd")},"85f2":function(t,e,n){t.exports=n("454f")},"87b3":function(t,e,n){var r=Date.prototype,a="Invalid Date",i="toString",s=r[i],o=r.getTime;new Date(NaN)+""!=a&&n("2aba")(r,i,function(){var t=o.call(this);return t===t?s.call(this):a})},aae3:function(t,e,n){var r=n("d3f4"),a=n("2d95"),i=n("2b4c")("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==a(t))}},b0c5:function(t,e,n){"use strict";var r=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})}}]);
//# sourceMappingURL=main.019723eb.js.map