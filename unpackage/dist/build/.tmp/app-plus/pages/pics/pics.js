(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pics/pics"],{"66c0":function(e,t,n){"use strict";n.r(t);var c=n("d6f1"),a=n("c8bf");for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);n("bfc9");var i=n("2877"),o=Object(i["a"])(a["default"],c["a"],c["b"],!1,null,null,null);t["default"]=o.exports},b6f0:function(e,t,n){"use strict";n("9bf7");var c=r(n("b0ce")),a=r(n("66c0"));function r(e){return e&&e.__esModule?e:{default:e}}Page((0,c.default)(a.default))},bfc9:function(e,t,n){"use strict";var c=n("f7fc"),a=n.n(c);a.a},c8bf:function(e,t,n){"use strict";n.r(t);var c=n("d2f4"),a=n.n(c);for(var r in c)"default"!==r&&function(e){n.d(t,e,function(){return c[e]})}(r);t["default"]=a.a},d2f4:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{choosenImagePaths:[],currentImageIndex:-1,currentImageHeight:0,screenWidth:e.getSystemInfoSync().screenWidth}},computed:{currentImagePath:function(){return this.choosenImagePaths[this.currentImageIndex]}},watch:{currentImageIndex:function(){var t=this;e.getImageInfo({src:t.choosenImagePaths[t.currentImageIndex],success:function(e){t.currentImageHeight=e.height;var n=e.width/t.screenWidth;t.currentImageHeight=e.height/n}})}},methods:{chooseImage:function(){var t=this;e.chooseImage({success:function(e){t.choosenImagePaths=e.tempFilePaths,t.currentImageIndex=0}})},clickImage:function(e){this.currentImageIndex=e}}};t.default=n}).call(this,n("6e42")["default"])},d6f1:function(e,t,n){"use strict";var c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("view",{staticStyle:{width:"100vw"}},[n("movable-area",{staticStyle:{width:"100%",background:"#0FAEFF",opacity:"0.33","z-index":"1"},style:{height:e.currentImageHeight+"px"},attrs:{hidden:void 0==e.currentImagePath,mpcomid:"b3d36b4c-1"}},[n("movable-view",{attrs:{direction:"all",mpcomid:"b3d36b4c-0"}},[e._v("xxxx")])],1),n("image",{ref:"c",staticStyle:{width:"100%",position:"absolute",top:"0"},attrs:{src:e.currentImagePath,mode:"widthFix",hidden:void 0==e.currentImagePath}}),n("button",{attrs:{type:"primary",hidden:0!=e.choosenImagePaths.length,eventid:"b3d36b4c-0"},on:{click:e.chooseImage}},[e._v("选择图片")]),n("view",{staticStyle:{display:"flex","flex-direction":"row","flex-wrap":"wrap"}},e._l(e.choosenImagePaths,function(t,c){return n("view",{key:c,style:{background:e.currentImageIndex==c?"red":"#ffffff"},attrs:{eventid:"b3d36b4c-1-"+c},on:{click:function(t){e.clickImage(c)}}},[n("image",{style:{width:e.screenWidth/3+"px",height:e.screenWidth/3+"px"},attrs:{src:t,mode:"aspectFit"}})])}))],1)},a=[];n.d(t,"a",function(){return c}),n.d(t,"b",function(){return a})},f7fc:function(e,t,n){}},[["b6f0","common/runtime","common/vendor"]]]);