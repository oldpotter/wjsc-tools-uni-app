(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pics/pics"],{"66c0":function(e,t,n){"use strict";n.r(t);var c=n("6c45"),i=n("c8bf");for(var a in i)"default"!==a&&function(e){n.d(t,e,function(){return i[e]})}(a);n("bfc9");var r=n("2877"),o=Object(r["a"])(i["default"],c["a"],c["b"],!1,null,null,null);t["default"]=o.exports},"6c45":function(e,t,n){"use strict";var c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("view",{staticStyle:{width:"100vw"}},[e._l(e.logos,function(e,t){return n("image",{key:t,staticStyle:{position:"absolute","z-index":"1"},style:{width:e.width+"px",height:e.height+"px"},attrs:{src:e.path,mode:"aspectFit"}})}),n("image",{staticStyle:{width:"100%"},attrs:{src:e.currentImagePath,mode:"widthFix",hidden:void 0==e.currentImagePath}}),n("button",{attrs:{type:"primary",hidden:0!=e.choosenImagePaths.length,eventid:"b3d36b4c-0"},on:{click:e.chooseImage}},[e._v("选择图片")]),n("button",{attrs:{type:"default",hidden:void 0==e.currentImagePath,eventid:"b3d36b4c-1"},on:{click:e.addLogo}},[e._v("添加Logo")]),n("view",{staticStyle:{display:"flex","flex-direction":"row","flex-wrap":"wrap"}},e._l(e.choosenImagePaths,function(t,c){return n("view",{key:c,style:{background:e.currentImageIndex==c?"red":"#ffffff"},attrs:{eventid:"b3d36b4c-2-"+c},on:{click:function(t){e.clickImage(c)}}},[n("image",{style:{width:e.screenWidth/3+"px",height:e.screenWidth/3+"px"},attrs:{src:t,mode:"aspectFit"}})])})),n("button",{attrs:{type:"primary",hidden:void 0==e.currentImagePath,eventid:"b3d36b4c-3"},on:{click:e.processPics}},[e._v("完成")])],2)},i=[];n.d(t,"a",function(){return c}),n.d(t,"b",function(){return i})},b6f0:function(e,t,n){"use strict";n("9bf7");var c=a(n("b0ce")),i=a(n("66c0"));function a(e){return e&&e.__esModule?e:{default:e}}Page((0,c.default)(i.default))},bfc9:function(e,t,n){"use strict";var c=n("f7fc"),i=n.n(c);i.a},c8bf:function(e,t,n){"use strict";n.r(t);var c=n("d2f4"),i=n.n(c);for(var a in c)"default"!==a&&function(e){n.d(t,e,function(){return c[e]})}(a);t["default"]=i.a},d2f4:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{choosenImagePaths:[],currentImageIndex:-1,currentImageHeight:0,screenWidth:e.getSystemInfoSync().screenWidth,logos:[]}},computed:{currentImagePath:function(){return this.choosenImagePaths[this.currentImageIndex]}},watch:{currentImageIndex:function(){var t=this;e.getImageInfo({src:t.choosenImagePaths[t.currentImageIndex],success:function(e){t.currentImageHeight=e.height;var n=e.width/t.screenWidth;t.currentImageHeight=e.height/n}})}},methods:{chooseImage:function(){var t=this;e.chooseImage({success:function(e){t.choosenImagePaths=e.tempFilePaths,t.currentImageIndex=0,t.opacity=1}})},clickImage:function(e){this.currentImageIndex=e},addLogo:function(){this.logos=[{path:"../../static/img/haizideyu.png",width:this.screenWidth/5,height:this.screenWidth/10}]},processPics:function(){var t=e.createSelectorQuery().select("#l11ogo");console.log(t.boundingClientRect())}}};t.default=n}).call(this,n("6e42")["default"])},f7fc:function(e,t,n){}},[["b6f0","common/runtime","common/vendor"]]]);