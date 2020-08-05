!function(){"use strict";const t="undefined"!=typeof window,e=t&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),i=t&&"IntersectionObserver"in window,n=t&&"classList"in document.createElement("p"),o=t&&window.devicePixelRatio>1,a={elements_selector:".lazy",container:e||t?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",data_bg_hidpi:"bg-hidpi",data_bg_multi:"bg-multi",data_bg_multi_hidpi:"bg-multi-hidpi",data_poster:"poster",class_applied:"applied",class_loading:"loading",class_loaded:"loaded",class_error:"error",unobserve_completed:!0,unobserve_entered:!1,cancel_on_exit:!0,callback_enter:null,callback_exit:null,callback_applied:null,callback_loading:null,callback_loaded:null,callback_error:null,callback_finish:null,callback_cancel:null,use_native:!1},r=t=>Object.assign({},a,t),s=function(t,e){var i;let n=new t(e);try{i=new CustomEvent("LazyLoad::Initialized",{detail:{instance:n}})}catch(t){(i=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:n})}window.dispatchEvent(i)},c=(t,e)=>t.getAttribute("data-"+e),l=(t,e,i)=>{var n="data-"+e;null!==i?t.setAttribute(n,i):t.removeAttribute(n)},d=t=>c(t,"ll-status"),u=(t,e)=>l(t,"ll-status",e),h=t=>u(t,null),g=t=>null===d(t),f=t=>"native"===d(t),m=["loading","loaded","applied","error"],p=(t,e,i,n)=>{t&&(void 0===n?void 0===i?t(e):t(e,i):t(e,i,n))},v=(t,e)=>{n?t.classList.add(e):t.className+=(t.className?" ":"")+e},b=(t,e)=>{n?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},w=t=>t.llTempImage,y=(t,e)=>{if(!e)return;const i=e._observer;i&&i.unobserve(t)},_=(t,e)=>{t&&(t.loadingCount+=e)},x=(t,e)=>{t&&(t.toLoadCount=e)},I=t=>{let e=[];for(let i,n=0;i=t.children[n];n+=1)"SOURCE"===i.tagName&&e.push(i);return e},L=(t,e,i)=>{i&&t.setAttribute(e,i)},R=(t,e)=>{t.removeAttribute(e)},E=t=>!!t.llOriginalAttrs,A=t=>{if(E(t))return;const e={};e.src=t.getAttribute("src"),e.srcset=t.getAttribute("srcset"),e.sizes=t.getAttribute("sizes"),t.llOriginalAttrs=e},k=t=>{if(!E(t))return;const e=t.llOriginalAttrs;L(t,"src",e.src),L(t,"srcset",e.srcset),L(t,"sizes",e.sizes)},S=(t,e)=>{L(t,"sizes",c(t,e.data_sizes)),L(t,"srcset",c(t,e.data_srcset)),L(t,"src",c(t,e.data_src))},H=t=>{R(t,"src"),R(t,"srcset"),R(t,"sizes")},C=(t,e)=>{const i=t.parentNode;if(!i||"PICTURE"!==i.tagName)return;I(i).forEach(e)},$=(t,e)=>{I(t).forEach(e)},N={IMG:(t,e)=>{C(t,t=>{A(t),S(t,e)}),A(t),S(t,e)},IFRAME:(t,e)=>{L(t,"src",c(t,e.data_src))},VIDEO:(t,e)=>{$(t,t=>{L(t,"src",c(t,e.data_src))}),L(t,"poster",c(t,e.data_poster)),L(t,"src",c(t,e.data_src)),t.load()}},T=(t,e)=>{const i=N[t.tagName];i&&i(t,e)},M=(t,e,i)=>{v(t,e.class_applied),u(t,"applied"),q(t,e),e.unobserve_completed&&y(t,e),p(e.callback_applied,t,i)},P=(t,e,i)=>{_(i,1),v(t,e.class_loading),u(t,"loading"),p(e.callback_loading,t,i)},z={IMG:(t,e)=>{l(t,e.data_src,null),l(t,e.data_srcset,null),l(t,e.data_sizes,null),C(t,t=>{l(t,e.data_srcset,null),l(t,e.data_sizes,null)})},IFRAME:(t,e)=>{l(t,e.data_src,null)},VIDEO:(t,e)=>{l(t,e.data_src,null),l(t,e.data_poster,null),$(t,t=>{l(t,e.data_src,null)})}},q=(t,e)=>{l(t,e.data_bg_multi,null),l(t,e.data_bg_multi_hidpi,null)},O=(t,e)=>{const i=z[t.tagName];i?i(t,e):((t,e)=>{l(t,e.data_bg,null),l(t,e.data_bg_hidpi,null)})(t,e)},j=["IMG","IFRAME","VIDEO"],F=(t,e)=>{!e||(t=>t.loadingCount>0)(e)||(t=>t.toLoadCount>0)(e)||p(t.callback_finish,e)},W=(t,e,i)=>{t.addEventListener(e,i),t.llEvLisnrs[e]=i},D=(t,e,i)=>{t.removeEventListener(e,i)},B=t=>!!t.llEvLisnrs,V=t=>{if(!B(t))return;const e=t.llEvLisnrs;for(let i in e){const n=e[i];D(t,i,n)}delete t.llEvLisnrs},G=(t,e,i)=>{(t=>{delete t.llTempImage})(t),_(i,-1),(t=>{t&&(t.toLoadCount-=1)})(i),b(t,e.class_loading),e.unobserve_completed&&y(t,i)},Y=(t,e,i)=>{const n=w(t)||t;if(B(n))return;((t,e,i)=>{B(t)||(t.llEvLisnrs={});const n="VIDEO"===t.tagName?"loadeddata":"load";W(t,n,e),W(t,"error",i)})(n,o=>{((t,e,i,n)=>{const o=f(e);G(e,i,n),v(e,i.class_loaded),u(e,"loaded"),O(e,i),p(i.callback_loaded,e,n),o||F(i,n)})(0,t,e,i),V(n)},o=>{((t,e,i,n)=>{const o=f(e);G(e,i,n),v(e,i.class_error),u(e,"error"),p(i.callback_error,e,n),o||F(i,n)})(0,t,e,i),V(n)})},U=(t,e,i)=>{(t=>{t.llTempImage=document.createElement("IMG")})(t),Y(t,e,i),((t,e,i)=>{const n=c(t,e.data_bg),a=c(t,e.data_bg_hidpi),r=o&&a?a:n;r&&(t.style.backgroundImage=`url("${r}")`,w(t).setAttribute("src",r),P(t,e,i))})(t,e,i),((t,e,i)=>{const n=c(t,e.data_bg_multi),a=c(t,e.data_bg_multi_hidpi),r=o&&a?a:n;r&&(t.style.backgroundImage=r,M(t,e,i))})(t,e,i)},J=(t,e,i)=>{(t=>j.indexOf(t.tagName)>-1)(t)?((t,e,i)=>{Y(t,e,i),T(t,e),P(t,e,i)})(t,e,i):U(t,e,i)},K=(t,e,i,n)=>{i.cancel_on_exit&&(t=>"loading"===d(t))(t)&&"IMG"===t.tagName&&(V(t),(t=>{C(t,t=>{H(t)}),H(t)})(t),(t=>{C(t,t=>{k(t)}),k(t)})(t),b(t,i.class_loading),_(n,-1),h(t),p(i.callback_cancel,t,e,n))},Q=(t,e,i,n)=>{u(t,"entered"),((t,e,i)=>{e.unobserve_entered&&y(t,i)})(t,i,n),p(i.callback_enter,t,e,n),(t=>m.indexOf(d(t))>=0)(t)||J(t,i,n)},X=["IMG","IFRAME"],Z=t=>t.use_native&&"loading"in HTMLImageElement.prototype,tt=(t,e,i)=>{t.forEach(t=>{-1!==X.indexOf(t.tagName)&&(t.setAttribute("loading","lazy"),((t,e,i)=>{Y(t,e,i),T(t,e),O(t,e),u(t,"native")})(t,e,i))}),x(i,0)},et=(t,e,i)=>{t.forEach(t=>(t=>t.isIntersecting||t.intersectionRatio>0)(t)?Q(t.target,t,e,i):((t,e,i,n)=>{g(t)||(K(t,e,i,n),p(i.callback_exit,t,e,n))})(t.target,t,e,i))},it=(t,e)=>{i&&!Z(t)&&(e._observer=new IntersectionObserver(i=>{et(i,t,e)},(t=>({root:t.container===document?null:t.container,rootMargin:t.thresholds||t.threshold+"px"}))(t)))},nt=t=>Array.prototype.slice.call(t),ot=t=>t.container.querySelectorAll(t.elements_selector),at=t=>(t=>"error"===d(t))(t),rt=(t,e)=>(t=>nt(t).filter(g))(t||ot(e)),st=(t,e)=>{var i;(i=ot(t),nt(i).filter(at)).forEach(e=>{b(e,t.class_error),h(e)}),e.update()},ct=function(e,i){const n=r(e);this._settings=n,this.loadingCount=0,it(n,this),((e,i)=>{t&&window.addEventListener("online",()=>{st(e,i)})})(n,this),this.update(i)};function lt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function dt(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function ut(t,e,i){return e&&dt(t.prototype,e),i&&dt(t,i),t}ct.prototype={update:function(t){const n=this._settings,o=rt(t,n);var a,r;(x(this,o.length),!e&&i)?Z(n)?tt(o,n,this):(a=this._observer,r=o,(t=>{t.disconnect()})(a),((t,e)=>{e.forEach(e=>{t.observe(e)})})(a,r)):this.loadAll(o)},destroy:function(){this._observer&&this._observer.disconnect(),ot(this._settings).forEach(t=>{delete t.llOriginalAttrs}),delete this._observer,delete this._settings,delete this.loadingCount,delete this.toLoadCount},loadAll:function(t){const e=this._settings;rt(t,e).forEach(t=>{y(t,this),J(t,e,this)})}},ct.load=(t,e)=>{const i=r(e);J(t,i)},ct.resetStatus=t=>{h(t)},t&&((t,e)=>{if(e)if(e.length)for(let i,n=0;i=e[n];n+=1)s(t,i);else s(t,e)})(ct,window.lazyLoadOptions);var ht=function(t,e,i,n){return(t/=n/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e},gt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ft=function(){var t=void 0,e=void 0,i=void 0,n=void 0,o=void 0,a=void 0,r=void 0,s=void 0,c=void 0,l=void 0,d=void 0,u=void 0;function h(){return window.scrollY||window.pageYOffset}function g(t){return t.getBoundingClientRect().top+e}function f(i){c||(c=i),d=o(l=i-c,e,r,s),window.scrollTo(0,d),l<s?window.requestAnimationFrame(f):function(){window.scrollTo(0,e+r),t&&a&&(t.setAttribute("tabindex","-1"),t.focus());"function"==typeof u&&u();c=!1}()}return function(c){var l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(s=l.duration||1e3,n=l.offset||0,u=l.callback,o=l.easing||ht,a=l.a11y||!1,e=h(),void 0===c?"undefined":gt(c)){case"number":t=void 0,a=!1,i=e+c;break;case"object":i=g(t=c);break;case"string":t=document.querySelector(c),i=g(t)}switch(r=i-e+n,gt(l.duration)){case"number":s=l.duration;break;case"function":s=l.duration(r)}window.requestAnimationFrame(f)}}(),mt=function t(e){var i=this;lt(this,t),this.anchor=e,this.targetID=this.anchor.getAttribute("href"),this.anchor.addEventListener("click",(function(){ft(i.targetID,{duration:1e3,callback:void 0,a11y:!1})}),!1)};function pt(t,e,i){return t(i={path:e,exports:{},require:function(t,e){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==e&&i.path)}},i.exports),i.exports}var vt=pt((function(t){!function(e){var i=function(t){return o(!0===t,!1,arguments)};function n(t,e){if("object"!==a(t))return e;for(var i in e)"object"===a(t[i])&&"object"===a(e[i])?t[i]=n(t[i],e[i]):t[i]=e[i];return t}function o(t,e,o){var r=o[0],s=o.length;(t||"object"!==a(r))&&(r={});for(var c=0;c<s;++c){var l=o[c];if("object"===a(l))for(var d in l)if("__proto__"!==d){var u=t?i.clone(l[d]):l[d];r[d]=e?n(r[d],u):u}}return r}function a(t){return{}.toString.call(t).slice(8,-1).toLowerCase()}i.recursive=function(t){return o(!0===t,!0,arguments)},i.clone=function(t){var e,n,o=t,r=a(t);if("array"===r)for(o=[],n=t.length,e=0;e<n;++e)o[e]=i.clone(t[e]);else if("object"===r)for(e in o={},t)o[e]=i.clone(t[e]);return o},e?t.exports=i:window.merge=i}(t&&t.exports)})),bt=pt((function(t){(t.exports=function(t){this.top=t.top,this.left=t.left,this.width=t.width,this.spacing=t.spacing,this.targetRowHeight=t.targetRowHeight,this.targetRowHeightTolerance=t.targetRowHeightTolerance,this.minAspectRatio=this.width/t.targetRowHeight*(1-t.targetRowHeightTolerance),this.maxAspectRatio=this.width/t.targetRowHeight*(1+t.targetRowHeightTolerance),this.edgeCaseMinRowHeight=t.edgeCaseMinRowHeight,this.edgeCaseMaxRowHeight=t.edgeCaseMaxRowHeight,this.widowLayoutStyle=t.widowLayoutStyle,this.isBreakoutRow=t.isBreakoutRow,this.items=[],this.height=0}).prototype={addItem:function(t){var e,i,n,o=this.items.concat(t),a=this.width-(o.length-1)*this.spacing,r=o.reduce((function(t,e){return t+e.aspectRatio}),0),s=a/this.targetRowHeight;return this.isBreakoutRow&&0===this.items.length&&t.aspectRatio>=1?(this.items.push(t),this.completeLayout(a/t.aspectRatio,"justify"),!0):r<this.minAspectRatio?(this.items.push(vt(t)),!0):r>this.maxAspectRatio?0===this.items.length?(this.items.push(vt(t)),this.completeLayout(a/r,"justify"),!0):(e=this.width-(this.items.length-1)*this.spacing,i=this.items.reduce((function(t,e){return t+e.aspectRatio}),0),n=e/this.targetRowHeight,Math.abs(r-s)>Math.abs(i-n)?(this.completeLayout(e/i,"justify"),!1):(this.items.push(vt(t)),this.completeLayout(a/r,"justify"),!0)):(this.items.push(vt(t)),this.completeLayout(a/r,"justify"),!0)},isLayoutComplete:function(){return this.height>0},completeLayout:function(t,e){var i,n,o,a,r,s=this.left,c=this.width-(this.items.length-1)*this.spacing;(void 0===e||["justify","center","left"].indexOf(e)<0)&&(e="left"),t!==(n=Math.max(this.edgeCaseMinRowHeight,Math.min(t,this.edgeCaseMaxRowHeight)))?(this.height=n,i=c/n/(c/t)):(this.height=t,i=1),this.items.forEach((function(t){t.top=this.top,t.width=t.aspectRatio*this.height*i,t.height=this.height,t.left=s,s+=t.width+this.spacing}),this),"justify"===e?(s-=this.spacing+this.left,o=(s-this.width)/this.items.length,a=this.items.map((function(t,e){return Math.round((e+1)*o)})),1===this.items.length?this.items[0].width-=Math.round(o):this.items.forEach((function(t,e){e>0?(t.left-=a[e-1],t.width-=a[e]-a[e-1]):t.width-=a[e]}))):"center"===e&&(r=(this.width-s)/2,this.items.forEach((function(t){t.left+=r+this.spacing}),this))},forceComplete:function(t,e){"number"==typeof e?this.completeLayout(e,this.widowLayoutStyle):this.completeLayout(this.targetRowHeight,this.widowLayoutStyle)},getItems:function(){return this.items}}}));function wt(t,e){var i;return!1!==t.fullWidthBreakoutRowCadence&&(e._rows.length+1)%t.fullWidthBreakoutRowCadence==0&&(i=!0),new bt({top:e._containerHeight,left:t.containerPadding.left,width:t.containerWidth-t.containerPadding.left-t.containerPadding.right,spacing:t.boxSpacing.horizontal,targetRowHeight:t.targetRowHeight,targetRowHeightTolerance:t.targetRowHeightTolerance,edgeCaseMinRowHeight:.5*t.targetRowHeight,edgeCaseMaxRowHeight:2*t.targetRowHeight,rightToLeft:!1,isBreakoutRow:i,widowLayoutStyle:t.widowLayoutStyle})}function yt(t,e,i){return e._rows.push(i),e._layoutItems=e._layoutItems.concat(i.getItems()),e._containerHeight+=i.height+t.boxSpacing.vertical,i.items}var _t=function(t,e){var i={},n={},o={containerWidth:1060,containerPadding:10,boxSpacing:10,targetRowHeight:320,targetRowHeightTolerance:.25,maxNumRows:Number.POSITIVE_INFINITY,forceAspectRatio:!1,showWidows:!0,fullWidthBreakoutRowCadence:!1,widowLayoutStyle:"left"},a={},r={};return i=vt(o,e=e||{}),a.top=isNaN(parseFloat(i.containerPadding.top))?i.containerPadding:i.containerPadding.top,a.right=isNaN(parseFloat(i.containerPadding.right))?i.containerPadding:i.containerPadding.right,a.bottom=isNaN(parseFloat(i.containerPadding.bottom))?i.containerPadding:i.containerPadding.bottom,a.left=isNaN(parseFloat(i.containerPadding.left))?i.containerPadding:i.containerPadding.left,r.horizontal=isNaN(parseFloat(i.boxSpacing.horizontal))?i.boxSpacing:i.boxSpacing.horizontal,r.vertical=isNaN(parseFloat(i.boxSpacing.vertical))?i.boxSpacing:i.boxSpacing.vertical,i.containerPadding=a,i.boxSpacing=r,n._layoutItems=[],n._awakeItems=[],n._inViewportItems=[],n._leadingOrphans=[],n._trailingOrphans=[],n._containerHeight=i.containerPadding.top,n._rows=[],n._orphans=[],i._widowCount=0,function(t,e,i){var n,o,a,r=[];return t.forceAspectRatio&&i.forEach((function(e){e.forcedAspectRatio=!0,e.aspectRatio=t.forceAspectRatio})),i.some((function(i,a){if(isNaN(i.aspectRatio))throw new Error("Item "+a+" has an invalid aspect ratio");if(o||(o=wt(t,e)),n=o.addItem(i),o.isLayoutComplete()){if(r=r.concat(yt(t,e,o)),e._rows.length>=t.maxNumRows)return o=null,!0;if(o=wt(t,e),!n&&(n=o.addItem(i),o.isLayoutComplete())){if(r=r.concat(yt(t,e,o)),e._rows.length>=t.maxNumRows)return o=null,!0;o=wt(t,e)}}})),o&&o.getItems().length&&t.showWidows&&(e._rows.length?(a=e._rows[e._rows.length-1].isBreakoutRow?e._rows[e._rows.length-1].targetRowHeight:e._rows[e._rows.length-1].height,o.forceComplete(!1,a)):o.forceComplete(!1),r=r.concat(yt(t,e,o)),t._widowCount=o.getItems().length),e._containerHeight=e._containerHeight-t.boxSpacing.vertical,e._containerHeight=e._containerHeight+t.containerPadding.bottom,{containerHeight:e._containerHeight,widowCount:t._widowCount,boxes:e._layoutItems}}(i,n,t.map((function(t){return t.width&&t.height?{aspectRatio:t.width/t.height}:{aspectRatio:t}})))},xt=function(){function t(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};lt(this,t),this.$container=e,this.$items=this.$container.querySelectorAll("[data-aspect-ratio]"),this.config=i,"project"===e.dataset.justifiedLayout&&(this.config.targetRowHeight=window.innerWidth/3),this.init()}return ut(t,[{key:"init",value:function(){this.aspectRatiosArray=this.getAspectRatiosArray(),this.geometry=_t(this.aspectRatiosArray,this.config),this.generateLayout()}},{key:"getAspectRatiosArray",value:function(){return Array.from(this.$items).map((function(t){return Number(t.dataset.aspectRatio)}))}},{key:"generateLayout",value:function(){var t=this;this.$items.forEach((function(e,i){t.geometry.boxes[i]?(e.style.width="".concat(t.geometry.boxes[i].width,"px"),e.style.height="".concat(t.geometry.boxes[i].height,"px"),e.style.top="".concat(t.geometry.boxes[i].top,"px"),e.style.left="".concat(t.geometry.boxes[i].left,"px")):e.style.display="none"})),this.$container.style.height="".concat(this.geometry.containerHeight,"px")}}]),t}(),It=function(){function t(e){if(lt(this,t),this.$lightbox=document.querySelector('[data-lightbox="lightbox"]'),!this.$lightbox)return console.warn("No lightbox to toggle!");this.$body=document.body,this.$toggles=e,this.$image=this.$lightbox.querySelector('[data-lightbox="item"] img'),this.$closes=this.$lightbox.querySelectorAll('[data-lightbox="close"]'),this.$previous=this.$lightbox.querySelector('[data-lightbox="<"]'),this.$next=this.$lightbox.querySelector('[data-lightbox=">"]'),this.$loading=this.$lightbox.querySelector('[data-lightbox="loading"]'),this.images=[],this.isActive=!1,this.currentIndex=0,this.loopToggles(),this.addEventListeners()}return ut(t,[{key:"loopToggles",value:function(){var t=this;this.$toggles.forEach((function(e,i){t.addToggleImageToImagesArray(e),t.addEventListenerToToggle(e,i)}))}},{key:"addToggleImageToImagesArray",value:function(t){var e=t.querySelector("img");this.images.push({src:e.getAttribute("data-src")||e.getAttribute("src"),srcset:e.getAttribute("data-srcset")||e.getAttribute("srcset")})}},{key:"toggleLoading",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.$lightbox.classList.toggle("is-loading",!t)}},{key:"addImageProcess",value:function(t){return new Promise((function(e,i){var n=new Image;n.onload=function(){return e(n)},n.onerror=i,n.src=t}))}},{key:"checkImage",value:function(t){return new Promise((function(e,i){var n;"string"==typeof t?(n=new Image).src=t:t instanceof HTMLImageElement&&(n=t),n.naturalWidth?e(n):n.complete?i(n):(n.onload=function(){n.naturalWidth?e(n):i(n)},n.onerror=function(){n.naturalWidth?e(n):i(n)})}))}},{key:"getImages",value:function(){var t=this;this.toggleLoading(!1);var e={current:this.images[this.currentIndex],previous:this.images[this.currentIndex-1],next:this.images[this.currentIndex+1]};this.$image.setAttribute("sizes","100vw"),this.$image.setAttribute("srcset",e.current.srcset),this.$image.setAttribute("src",e.current.src),this.$previous.style.display=e.previous?"":"none",this.$next.style.display=e.next?"":"none",setTimeout((function(){t.checkImage(t.$image).then((function(e){return t.toggleLoading(e)})).catch((function(t){return console.error(t.src,"Image failed to load :(")}))}),10)}},{key:"addEventListenerToToggle",value:function(t,e){var i=this;t.addEventListener("click",(function(t){i.currentIndex=e,i.isActive=!0,i.getImages(),i.$body.classList.toggle("lightbox-is-open"),i.$lightbox.classList.toggle("is-active"),i.$lightbox.style.pointerEvents="",t.preventDefault()}))}},{key:"closeLightbox",value:function(){this.isActive=!1,this.$body.classList.remove("lightbox-is-open"),this.$lightbox.classList.remove("is-active"),this.$lightbox.style.pointerEvents="none",this.$image.setAttribute("srcset",""),this.$image.setAttribute("src","")}},{key:"addEventListeners",value:function(){var t=this;this.$next.addEventListener("click",(function(e){t.currentIndex+=1,t.getImages(t.currentIndex),e.preventDefault()})),this.$previous.addEventListener("click",(function(e){t.currentIndex-=1,t.getImages(t.currentIndex),e.preventDefault()})),this.$closes.forEach((function(e){e.addEventListener("click",(function(e){t.closeLightbox(),e.preventDefault()}))})),document.addEventListener("keydown",(function(e){if(t.isActive)switch(e.key){case"Escape":t.closeLightbox();break;case"ArrowLeft":t.currentIndex-=1,t.images[t.currentIndex]?t.getImages(t.currentIndex):t.currentIndex+=1;break;case"ArrowRight":t.currentIndex+=1,t.images[t.currentIndex]?t.getImages(t.currentIndex):t.currentIndex-=1}}))}}]),t}();document.addEventListener("DOMContentLoaded",(function(){var t=document.body,e=document.querySelector("#header"),i=e.querySelector(".main-menu"),n=e.querySelector("#mobile-menu-toggle");new ct({elements_selector:"[data-lazy]"});n.addEventListener("click",(function(t){var e,n,o;t.preventDefault(),n="closed",o="open",(e=i).setAttribute("data-state",e.getAttribute("data-state")===n?o:n)}),!1);var o=document.querySelectorAll('a[href^="#"]');o.length>0&&o.forEach((function(t){new mt(t)}));var a=parseFloat(window.getComputedStyle(t).getPropertyValue("line-height")),r=document.querySelectorAll("[data-justified-layout]");r.length>0&&r.forEach((function(t){new xt(t,{boxSpacing:a/3,containerPadding:a,containerWidth:t.parentElement.clientWidth||window.clientWidth,targetRowHeight:400})}));var s=document.querySelectorAll("[data-intro]");s.length>0&&s.forEach((function(t){var e=t.children;e.length>0&&function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:19,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=2*Math.PI/t.length;t.forEach((function(t,o){var a=n*(o-i),r=Math.cos(a)*e,s=Math.sin(a)*e;t.style.transform="translate(calc(-50% + ".concat(r,"vmin), calc(-50% + ").concat(s,"vmin))"),t.addEventListener("mouseenter",(function(){t.style.boxShadow="".concat(.125*-r,"vmin ").concat(.125*-s,"vmin ").concat(3.25,"vmin rgba(0,0,0,.38)")})),t.addEventListener("mouseleave",(function(){t.style.boxShadow="0 0 0 rgba(0,0,0,0)"}))}))}(Array.from(e),19,1.7)}));var c=document.querySelectorAll('[data-toggle="lightbox"]');c&&(new It(c),function(t){var e,i=(t=t||{}).callback||function(){},n=t.activeCallback||function(){},o=t.idleTime||6e4,a=!0;function r(){a&&(a=!1,i())}function s(){a||(a=!0,n()),clearTimeout(e),e=setTimeout(r,o)}function c(t){window[t]("load",s),document[t]("mousemove",s),document[t]("scroll",s),document[t]("keypress",s),document[t]("click",s)}c("addEventListener"),s()}({callback:function(){return t.classList.add("is-idle")},activeCallback:function(){return t.classList.remove("is-idle")},idleTime:2e3}))}),!1),window.addEventListener("load",(function(){!function(){var t=document.querySelector("#footer"),e=window.getComputedStyle(t).getPropertyValue("display");t.style.display="none";var i=document.documentElement.clientHeight;document.body.clientHeight-.25*i>i&&(t.style.display=e)}(),document.querySelector(".loading").classList.remove("loading")}),!1)}();
//# sourceMappingURL=main.build.js.map
