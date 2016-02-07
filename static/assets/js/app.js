/* -- global vars -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

var _myDebug = false;
_myDebug = true;

var sr_cscnr;
var browserCompatibility = true;
var loadingWindowLoad = false;
var loadingDownloadImages = false;

var clickVar = 'click';
var clickVarDefault = clickVar;










/* -- email -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

function kSja5k(
	x,		// if false == 'tel' else == 'mailto' 
	a4,		// hel
	a4b,	// lo
	a6,		// d2
	a6b,	// i
	a7,		// .
	a7b		// co
) { var a2 = "lto"; var a3 = ":"; var a1 = "mai"; var a5 = "@"; if(!x) { a2 = "el"; a1 = "t"; a5 = ""; } var b1 = "<a href='"; var b2 = "'>"; var b3 = "</a>"; var c1 = b1 + a1 + a2 + a3 + a4 + a4b + a5 + a6 + a6b + a7 + a7b + b2 + a4 + a4b + a5 + a6 + a6b + a7 + a7b + b3; document.write(c1); }








/* -- swipe -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */ //http://labs.rampinteractive.co.uk/touchSwipe/demos/Tap_vs_swipe.html

/*
(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(f){var p="left",o="right",e="up",x="down",c="in",z="out",m="none",s="auto",l="swipe",t="pinch",A="tap",j="doubletap",b="longtap",y="hold",D="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,d=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,B="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe"};f.fn.swipe=function(G){var F=f(this),E=F.data(B);if(E&&typeof G==="string"){if(E[G]){return E[G].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+G+" does not exist on jQuery.swipe")}}else{if(!E&&(typeof G==="object"||!G)){return w.apply(this,arguments)}}return F};f.fn.swipe.defaults=n;f.fn.swipe.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipe.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:z};f.fn.swipe.pageScroll={NONE:m,HORIZONTAL:D,VERTICAL:u,AUTO:s};f.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:i};function w(E){if(E&&(E.allowPageScroll===undefined&&(E.swipe!==undefined||E.swipeStatus!==undefined))){E.allowPageScroll=m}if(E.click!==undefined&&E.tap===undefined){E.tap=E.click}if(!E){E={}}E=f.extend({},f.fn.swipe.defaults,E);return this.each(function(){var G=f(this);var F=G.data(B);if(!F){F=new C(this,E);G.data(B,F)}})}function C(a4,av){var az=(a||d||!av.fallbackToMouseEvents),J=az?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",ay=az?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",U=az?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",S=az?null:"mouseleave",aD=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ag=0,aP=null,ab=0,a1=0,aZ=0,G=1,aq=0,aJ=0,M=null;var aR=f(a4);var Z="start";var W=0;var aQ=null;var T=0,a2=0,a5=0,ad=0,N=0;var aW=null,af=null;try{aR.bind(J,aN);aR.bind(aD,a9)}catch(ak){f.error("events not supported "+J+","+aD+" on jQuery.swipe")}this.enable=function(){aR.bind(J,aN);aR.bind(aD,a9);return aR};this.disable=function(){aK();return aR};this.destroy=function(){aK();aR.data(B,null);return aR};this.option=function(bc,bb){if(av[bc]!==undefined){if(bb===undefined){return av[bc]}else{av[bc]=bb}}else{f.error("Option "+bc+" does not exist on jQuery.swipe.options")}return null};function aN(bd){if(aB()){return}if(f(bd.target).closest(av.excludedElements,aR).length>0){return}var be=bd.originalEvent?bd.originalEvent:bd;var bc,bb=a?be.touches[0]:be;Z=g;if(a){W=be.touches.length}else{bd.preventDefault()}ag=0;aP=null;aJ=null;ab=0;a1=0;aZ=0;G=1;aq=0;aQ=aj();M=aa();R();if(!a||(W===av.fingers||av.fingers===i)||aX()){ai(0,bb);T=at();if(W==2){ai(1,be.touches[1]);a1=aZ=au(aQ[0].start,aQ[1].start)}if(av.swipeStatus||av.pinchStatus){bc=O(be,Z)}}else{bc=false}if(bc===false){Z=q;O(be,Z);return bc}else{if(av.hold){af=setTimeout(f.proxy(function(){aR.trigger("hold",[be.target]);if(av.hold){bc=av.hold.call(aR,be,be.target)}},this),av.longTapThreshold)}ao(true)}return null}function a3(be){var bh=be.originalEvent?be.originalEvent:be;if(Z===h||Z===q||am()){return}var bd,bc=a?bh.touches[0]:bh;var bf=aH(bc);a2=at();if(a){W=bh.touches.length}if(av.hold){clearTimeout(af)}Z=k;if(W==2){if(a1==0){ai(1,bh.touches[1]);a1=aZ=au(aQ[0].start,aQ[1].start)}else{aH(bh.touches[1]);aZ=au(aQ[0].end,aQ[1].end);aJ=ar(aQ[0].end,aQ[1].end)}G=a7(a1,aZ);aq=Math.abs(a1-aZ)}if((W===av.fingers||av.fingers===i)||!a||aX()){aP=aL(bf.start,bf.end);al(be,aP);ag=aS(bf.start,bf.end);ab=aM();aI(aP,ag);if(av.swipeStatus||av.pinchStatus){bd=O(bh,Z)}if(!av.triggerOnTouchEnd||av.triggerOnTouchLeave){var bb=true;if(av.triggerOnTouchLeave){var bg=aY(this);bb=E(bf.end,bg)}if(!av.triggerOnTouchEnd&&bb){Z=aC(k)}else{if(av.triggerOnTouchLeave&&!bb){Z=aC(h)}}if(Z==q||Z==h){O(bh,Z)}}}else{Z=q;O(bh,Z)}if(bd===false){Z=q;O(bh,Z)}}function L(bb){var bc=bb.originalEvent;if(a){if(bc.touches.length>0){F();return true}}if(am()){W=ad}a2=at();ab=aM();if(ba()||!an()){Z=q;O(bc,Z)}else{if(av.triggerOnTouchEnd||(av.triggerOnTouchEnd==false&&Z===k)){bb.preventDefault();Z=h;O(bc,Z)}else{if(!av.triggerOnTouchEnd&&a6()){Z=h;aF(bc,Z,A)}else{if(Z===k){Z=q;O(bc,Z)}}}}ao(false);return null}function a9(){W=0;a2=0;T=0;a1=0;aZ=0;G=1;R();ao(false)}function K(bb){var bc=bb.originalEvent;if(av.triggerOnTouchLeave){Z=aC(h);O(bc,Z)}}function aK(){aR.unbind(J,aN);aR.unbind(aD,a9);aR.unbind(ay,a3);aR.unbind(U,L);if(S){aR.unbind(S,K)}ao(false)}function aC(bf){var be=bf;var bd=aA();var bc=an();var bb=ba();if(!bd||bb){be=q}else{if(bc&&bf==k&&(!av.triggerOnTouchEnd||av.triggerOnTouchLeave)){be=h}else{if(!bc&&bf==h&&av.triggerOnTouchLeave){be=q}}}return be}function O(bd,bb){var bc=undefined;if(I()||V()){bc=aF(bd,bb,l)}else{if((P()||aX())&&bc!==false){bc=aF(bd,bb,t)}}if(aG()&&bc!==false){bc=aF(bd,bb,j)}else{if(ap()&&bc!==false){bc=aF(bd,bb,b)}else{if(ah()&&bc!==false){bc=aF(bd,bb,A)}}}if(bb===q){a9(bd)}if(bb===h){if(a){if(bd.touches.length==0){a9(bd)}}else{a9(bd)}}return bc}function aF(be,bb,bd){var bc=undefined;if(bd==l){aR.trigger("swipeStatus",[bb,aP||null,ag||0,ab||0,W,aQ]);if(av.swipeStatus){bc=av.swipeStatus.call(aR,be,bb,aP||null,ag||0,ab||0,W,aQ);if(bc===false){return false}}if(bb==h&&aV()){aR.trigger("swipe",[aP,ag,ab,W,aQ]);if(av.swipe){bc=av.swipe.call(aR,be,aP,ag,ab,W,aQ);if(bc===false){return false}}switch(aP){case p:aR.trigger("swipeLeft",[aP,ag,ab,W,aQ]);if(av.swipeLeft){bc=av.swipeLeft.call(aR,be,aP,ag,ab,W,aQ)}break;case o:aR.trigger("swipeRight",[aP,ag,ab,W,aQ]);if(av.swipeRight){bc=av.swipeRight.call(aR,be,aP,ag,ab,W,aQ)}break;case e:aR.trigger("swipeUp",[aP,ag,ab,W,aQ]);if(av.swipeUp){bc=av.swipeUp.call(aR,be,aP,ag,ab,W,aQ)}break;case x:aR.trigger("swipeDown",[aP,ag,ab,W,aQ]);if(av.swipeDown){bc=av.swipeDown.call(aR,be,aP,ag,ab,W,aQ)}break}}}if(bd==t){aR.trigger("pinchStatus",[bb,aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchStatus){bc=av.pinchStatus.call(aR,be,bb,aJ||null,aq||0,ab||0,W,G,aQ);if(bc===false){return false}}if(bb==h&&a8()){switch(aJ){case c:aR.trigger("pinchIn",[aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchIn){bc=av.pinchIn.call(aR,be,aJ||null,aq||0,ab||0,W,G,aQ)}break;case z:aR.trigger("pinchOut",[aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchOut){bc=av.pinchOut.call(aR,be,aJ||null,aq||0,ab||0,W,G,aQ)}break}}}if(bd==A){if(bb===q||bb===h){clearTimeout(aW);clearTimeout(af);if(Y()&&!H()){N=at();aW=setTimeout(f.proxy(function(){N=null;aR.trigger("tap",[be.target]);if(av.tap){bc=av.tap.call(aR,be,be.target)}},this),av.doubleTapThreshold)}else{N=null;aR.trigger("tap",[be.target]);if(av.tap){bc=av.tap.call(aR,be,be.target)}}}}else{if(bd==j){if(bb===q||bb===h){clearTimeout(aW);N=null;aR.trigger("doubletap",[be.target]);if(av.doubleTap){bc=av.doubleTap.call(aR,be,be.target)}}}else{if(bd==b){if(bb===q||bb===h){clearTimeout(aW);N=null;aR.trigger("longtap",[be.target]);if(av.longTap){bc=av.longTap.call(aR,be,be.target)}}}}}return bc}function an(){var bb=true;if(av.threshold!==null){bb=ag>=av.threshold}return bb}function ba(){var bb=false;if(av.cancelThreshold!==null&&aP!==null){bb=(aT(aP)-ag)>=av.cancelThreshold}return bb}function ae(){if(av.pinchThreshold!==null){return aq>=av.pinchThreshold}return true}function aA(){var bb;if(av.maxTimeThreshold){if(ab>=av.maxTimeThreshold){bb=false}else{bb=true}}else{bb=true}return bb}function al(bb,bc){if(av.allowPageScroll===m||aX()){bb.preventDefault()}else{var bd=av.allowPageScroll===s;switch(bc){case p:if((av.swipeLeft&&bd)||(!bd&&av.allowPageScroll!=D)){bb.preventDefault()}break;case o:if((av.swipeRight&&bd)||(!bd&&av.allowPageScroll!=D)){bb.preventDefault()}break;case e:if((av.swipeUp&&bd)||(!bd&&av.allowPageScroll!=u)){bb.preventDefault()}break;case x:if((av.swipeDown&&bd)||(!bd&&av.allowPageScroll!=u)){bb.preventDefault()}break}}}function a8(){var bc=aO();var bb=X();var bd=ae();return bc&&bb&&bd}function aX(){return !!(av.pinchStatus||av.pinchIn||av.pinchOut)}function P(){return !!(a8()&&aX())}function aV(){var be=aA();var bg=an();var bd=aO();var bb=X();var bc=ba();var bf=!bc&&bb&&bd&&bg&&be;return bf}function V(){return !!(av.swipe||av.swipeStatus||av.swipeLeft||av.swipeRight||av.swipeUp||av.swipeDown)}function I(){return !!(aV()&&V())}function aO(){return((W===av.fingers||av.fingers===i)||!a)}function X(){return aQ[0].end.x!==0}function a6(){return !!(av.tap)}function Y(){return !!(av.doubleTap)}function aU(){return !!(av.longTap)}function Q(){if(N==null){return false}var bb=at();return(Y()&&((bb-N)<=av.doubleTapThreshold))}function H(){return Q()}function ax(){return((W===1||!a)&&(isNaN(ag)||ag<av.threshold))}function a0(){return((ab>av.longTapThreshold)&&(ag<r))}function ah(){return !!(ax()&&a6())}function aG(){return !!(Q()&&Y())}function ap(){return !!(a0()&&aU())}function F(){a5=at();ad=event.touches.length+1}function R(){a5=0;ad=0}function am(){var bb=false;if(a5){var bc=at()-a5;if(bc<=av.fingerReleaseThreshold){bb=true}}return bb}function aB(){return !!(aR.data(B+"_intouch")===true)}function ao(bb){if(bb===true){aR.bind(ay,a3);aR.bind(U,L);if(S){aR.bind(S,K)}}else{aR.unbind(ay,a3,false);aR.unbind(U,L,false);if(S){aR.unbind(S,K,false)}}aR.data(B+"_intouch",bb===true)}function ai(bc,bb){var bd=bb.identifier!==undefined?bb.identifier:0;aQ[bc].identifier=bd;aQ[bc].start.x=aQ[bc].end.x=bb.pageX||bb.clientX;aQ[bc].start.y=aQ[bc].end.y=bb.pageY||bb.clientY;return aQ[bc]}function aH(bb){var bd=bb.identifier!==undefined?bb.identifier:0;var bc=ac(bd);bc.end.x=bb.pageX||bb.clientX;bc.end.y=bb.pageY||bb.clientY;return bc}function ac(bc){for(var bb=0;bb<aQ.length;bb++){if(aQ[bb].identifier==bc){return aQ[bb]}}}function aj(){var bb=[];for(var bc=0;bc<=5;bc++){bb.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return bb}function aI(bb,bc){bc=Math.max(bc,aT(bb));M[bb].distance=bc}function aT(bb){if(M[bb]){return M[bb].distance}return undefined}function aa(){var bb={};bb[p]=aw(p);bb[o]=aw(o);bb[e]=aw(e);bb[x]=aw(x);return bb}function aw(bb){return{direction:bb,distance:0}}function aM(){return a2-T}function au(be,bd){var bc=Math.abs(be.x-bd.x);var bb=Math.abs(be.y-bd.y);return Math.round(Math.sqrt(bc*bc+bb*bb))}function a7(bb,bc){var bd=(bc/bb)*1;return bd.toFixed(2)}function ar(){if(G<1){return z}else{return c}}function aS(bc,bb){return Math.round(Math.sqrt(Math.pow(bb.x-bc.x,2)+Math.pow(bb.y-bc.y,2)))}function aE(be,bc){var bb=be.x-bc.x;var bg=bc.y-be.y;var bd=Math.atan2(bg,bb);var bf=Math.round(bd*180/Math.PI);if(bf<0){bf=360-Math.abs(bf)}return bf}function aL(bc,bb){var bd=aE(bc,bb);if((bd<=45)&&(bd>=0)){return p}else{if((bd<=360)&&(bd>=315)){return p}else{if((bd>=135)&&(bd<=225)){return o}else{if((bd>45)&&(bd<135)){return x}else{return e}}}}}function at(){var bb=new Date();return bb.getTime()}function aY(bb){bb=f(bb);var bd=bb.offset();var bc={left:bd.left,right:bd.left+bb.outerWidth(),top:bd.top,bottom:bd.top+bb.outerHeight()};return bc}function E(bb,bc){return(bb.x>bc.left&&bb.x<bc.right&&bb.y>bc.top&&bb.y<bc.bottom)}}}));
*/




/* -- disable_scroll // enable_scroll -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
	
	if(window.addEventListener) {
		window.addEventListener('DOMMouseScroll', wheel, false);
	}
	
	window.onmousewheel = document.onmousewheel = wheel;
	document.onkeydown = keydown;
  
	//my
	if(window.addEventListener) {
		window.addEventListener('ontouchstart', wheel, false);
		window.addEventListener('ontouchmove', wheel, false);
	}
	
	window.ontouchmove = document.ontouchmove = wheel;

}

function enable_scroll() {

    if(window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }

    window.onmousewheel = document.onmousewheel = document.onkeydown = null;

	//my	
	if(window.addEventListener) {
		window.removeEventListener('ontouchstart', wheel, false);
		window.removeEventListener('ontouchmove', wheel, false);
	}
	
	window.ontouchmove = document.ontouchmove = null;

}







/* -- jQuery cycle2 swipe -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

(function(e){"use strict";e.event.special.swipe=e.event.special.swipe||{scrollSupressionThreshold:10,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,setup:function(){var i=e(this);i.bind("touchstart",function(t){function n(i){if(r){var t=i.originalEvent.touches?i.originalEvent.touches[0]:i;s={time:(new Date).getTime(),coords:[t.pageX,t.pageY]},Math.abs(r.coords[0]-s.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&i.preventDefault()}}var s,o=t.originalEvent.touches?t.originalEvent.touches[0]:t,r={time:(new Date).getTime(),coords:[o.pageX,o.pageY],origin:e(t.target)};i.bind("touchmove",n).one("touchend",function(){i.unbind("touchmove",n),r&&s&&s.time-r.time<e.event.special.swipe.durationThreshold&&Math.abs(r.coords[0]-s.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(r.coords[1]-s.coords[1])<e.event.special.swipe.verticalDistanceThreshold&&r.origin.trigger("swipe").trigger(r.coords[0]>s.coords[0]?"swipeleft":"swiperight"),r=s=void 0})})}},e.event.special.swipeleft=e.event.special.swipeleft||{setup:function(){e(this).bind("swipe",e.noop)}},e.event.special.swiperight=e.event.special.swiperight||e.event.special.swipeleft})(jQuery);






/* -- googleMaps -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

var customColor = [
	{
		featureType: "all",
		stylers: [{ saturation: -100 }]
	}
];







/* -- jQuery Placeholder > ie8 -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

(function($) {
  $.extend($,{ placeholder: {
      browser_supported: function() {
        return this._supported !== undefined ?
          this._supported :
          ( this._supported = !!('placeholder' in $('<input type="text">')[0]) );
      },
      shim: function(opts) {
        var config = {
          color: '#888',
          cls: 'placeholder',
          selector: 'input[placeholder], textarea[placeholder]'
        };
        $.extend(config,opts);
        return !this.browser_supported() && $(config.selector)._placeholder_shim(config);
      }
  }});

  $.extend($.fn,{
    _placeholder_shim: function(config) {
      function calcPositionCss(target)
      {
        var op = $(target).offsetParent().offset();
        var ot = $(target).offset();

        return {
          top: ot.top - op.top,
          left: ot.left - op.left,
          width: $(target).width()
        };
      }
      function adjustToResizing(label) {
      	var $target = label.data('target');
      	if(typeof $target !== "undefined") {
          label.css(calcPositionCss($target));
          $(window).one("resize", function () { adjustToResizing(label); });
        }
      }
      return this.each(function() {
        var $this = $(this);

        if( $this.is(':visible') ) {

          if( $this.data('placeholder') ) {
            var $ol = $this.data('placeholder');
            $ol.css(calcPositionCss($this));
            return true;
          }

          var possible_line_height = {};
          if( !$this.is('textarea') && $this.css('height') != 'auto') {
            possible_line_height = { lineHeight: $this.css('height'), whiteSpace: 'nowrap' };
          }

          var isBorderBox = ($this.css('box-sizing') === 'border-box');
          var isTextarea = $this.is('textarea');

          var ol = $('<label />')
            .text($this.attr('placeholder'))
            .addClass(config.cls)
            .css($.extend({
              position:'absolute',
              display: 'inline',
              'float':'none',
              overflow:'hidden',
              textAlign: 'left',
              color: config.color,
              cursor: 'text',
              paddingTop: !isTextarea && isBorderBox ? '0' : $this.css('padding-top'),
              paddingRight: $this.css('padding-right'),
              paddingBottom: !isTextarea && isBorderBox ? '0' : $this.css('padding-bottom'),
              paddingLeft: $this.css('padding-left'),
              fontSize: $this.css('font-size'),
              fontFamily: $this.css('font-family'),
              fontStyle: $this.css('font-style'),
              fontWeight: $this.css('font-weight'),
              textTransform: $this.css('text-transform'),
              backgroundColor: 'transparent',
              zIndex: 99
            }, possible_line_height))
            .css(calcPositionCss(this))
            .attr('for', this.id)
            .data('target',$this)
            .click(function(){
                if (!$(this).data('target').is(':disabled')) {
                    $(this).data('target').focus();
                }
            })
            .insertBefore(this);
          $this
            .data('placeholder',ol)
						.keydown(function(){
							ol.hide();
						})
						.blur(function() {
              ol[$this.val().length ? 'hide' : 'show']();
            }).triggerHandler('blur');
          $(window).one("resize", function () { adjustToResizing(ol); });
        }
      });
    }
  });
})(jQuery);

jQuery(document).add(window).bind('ready load', function() {
  if (jQuery.placeholder) {
    jQuery.placeholder.shim();
  }
});










/* -- jQuery UI msie -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */
/*!
 * jQuery Browser Plugin v0.0.6
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2013 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 2013-07-29T17:23:27-07:00
 */

(function( jQuery, window, undefined ) {
  "use strict";

  var matched, browser;

  jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

  	var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
  		/(chrome)[ \/]([\w.]+)/.exec( ua ) ||
  		/(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
  		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
  		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
  		/(msie) ([\w.]+)/.exec( ua ) ||
  		ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
  		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
  		[];

  	var platform_match = /(ipad)/.exec( ua ) ||
  		/(iphone)/.exec( ua ) ||
  		/(android)/.exec( ua ) ||
  		/(windows phone)/.exec( ua ) ||
  		/(win)/.exec( ua ) ||
  		/(mac)/.exec( ua ) ||
  		/(linux)/.exec( ua ) ||
  		/(cros)/i.exec( ua ) ||
  		[];

  	return {
  		browser: match[ 3 ] || match[ 1 ] || "",
  		version: match[ 2 ] || "0",
  		platform: platform_match[ 0 ] || ""
  	};
  };

  matched = jQuery.uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
  	browser[ matched.browser ] = true;
  	browser.version = matched.version;
  	browser.versionNumber = parseInt(matched.version);
  }

  if ( matched.platform ) {
  	browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
  	browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
  	browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
  	browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if ( browser.rv )
  {
  	var ie = "msie";

  	matched.browser = ie;
  	browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr )
  {
  	var opera = "opera";

  	matched.browser = opera;
  	browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android )
  {
  	var android = "android";

  	matched.browser = android;
  	browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  jQuery.browser = browser;
})( jQuery, window );














/* -- jQuery Easing -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});














/* -- parallax -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

$.fn.parallax = function(options) {

	var $$ = $(this);
	offset = $$.offset();

	var defaults = {
		"start": offset.top - $(window).height(),
		"stop": offset.top + $$.height(),		
		"coeff": 0.95
	};
	var opts = $.extend(defaults, options);

	return this.each(function(){
		$(window).bind('scroll', function() {
		
			windowTop = $(window).scrollTop();
			if((windowTop >= opts.start)) {
			
				var improve = 100 + ((opts.my * opts.coeff));
				if(opts.start == 0) improve = 0;
			
				newCoord = improve - (windowTop * opts.coeff);
				$$.css({
					"background-position": "0 "+ (newCoord*-1) + "px"
				});				
			}

		});
	});
	
};







/* -- scrollbar -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

var browser_ff = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent);
var browser_ie = /MSIE[\/\s](\d+\.\d+)/.test(navigator.userAgent);
var browser_ieNet = 0;
if(navigator.userAgent.indexOf(".NET") >= 0) browser_ieNet = 1;

var scrollCheck = 'body';
if(
browser_ff ||
browser_ie ||
browser_ieNet
) scrollCheck = 'html';






/* -- scrollbar width -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

$.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};











/* -- cookie -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

function setCookie(cname,cvalue,exdays) {

	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";;

}

function getCookie(cname) {

	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";

}










/* -- "Internet Explorer" & Co Compatibility -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

if(
	(jQuery.browser.name == 'msie' && jQuery.browser.versionNumber > 9) ||
	(jQuery.browser.name != 'msie')
) {
	browserCompatibility = true;
}













/* -- mobile/tablet/desktop checked -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

var isMobile = false;
var navigatorPlatformString = navigator.userAgent.toLowerCase();

if(
	(navigatorPlatformString.indexOf("android") != -1) ||
	(navigatorPlatformString.indexOf("webos") != -1) ||
	(navigatorPlatformString.indexOf("blackberry") != -1) ||
	(navigatorPlatformString.indexOf("iemobile") != -1) ||
	(navigatorPlatformString.indexOf("opera mini") != -1) ||
	(navigatorPlatformString.indexOf("ipad") != -1) ||
	(navigatorPlatformString.indexOf("iphone") != -1) ||
	(navigatorPlatformString.indexOf("ipod") != -1)
) {
	isMobile = true;
	clickVar = 'touchend';
	clickVarDefault = 'click';
	//clickVar = 'touchstart';
	//clickVarEnd = 'touchend';
}

/* safari ---------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_Opera = navigator.userAgent.indexOf("Presto") > -1;
if ((is_chrome)&&(is_safari)) {is_safari=false;}











/* -- tooltip -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

var tooltip = true;

function showSocialToolTip(e, text) {
    if (!tooltip) return false;
    var tooltiptext = text;
    $('#tooltip').css({ 'top': e.pageY - 5, 'left': e.pageX - 22 });
    $('#tooltip').html(tooltiptext);
    $('#tooltip').stop().fadeTo(10, 0, function () {
        $('#tooltip').show();
        $('#tooltip').stop().fadeTo(250, 1);
    });
    $('#tooltip').show();
}

function hideSocialToolTip() {
    $('#tooltip').stop().fadeTo(250, 0, function () {
        $('#tooltip').hide();
    });
    $('#tooltip').hide();
}
function moveSocialToolTip(e) {
    if (!tooltip) return false;
    $('#tooltip').css({ 'top': e.pageY - 5, 'left': e.pageX - 22 });
}













/* loading ---------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

var backgroundImageArray = new Array();

function backgroundLoadingEnd(x) {

	if(browserCompatibility) {

		if(x == 'downloadImages') {
			loadingDownloadImages = true;
		}
		
		if(x == 'windowLoad') {
			loadingWindowLoad = true;
		}
		
		if(loadingDownloadImages && loadingWindowLoad) {

			setTimeout(function() {

				$(scrollCheck).stop().animate({ scrollTop: 0 }, 0, function() {
				
					$('#loading').fadeTo(250,0,function() {
						$('#loading').hide();
					});
				
				});

			}, 350);
		
		}
	
	}

}

function backgroundLoading(i) {

	var loadCount = 0;
	var debug = 0;	
	
	var img = new Image();
	$(img).load(function() {
				
		if(i < backgroundImageArray.length) {

			loadCount = parseInt(((100/backgroundImageArray.length) * i));
			$('#loading .load').css({'width': loadCount + '%'});
			//$('#loading .count').text(loadCount + ' %');
			
			backgroundLoading(i+1);
			
		} else {
		
			loadCount = 100;
			$('#loading .load').css({'width': loadCount + '%'});
			//$('#loading .count').text(loadCount + ' %');
			
			setTimeout(function() {
			
				backgroundLoadingEnd('downloadImages');
			
			}, 350);
			
		}
	})
	.error(function() {
		
		backgroundLoadingEnd('downloadImages');
		
	})
	.attr('src', backgroundImageArray[i-1]);

}







/* -- loadpage -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

function loadPage(e,el) {

	e.preventDefault();

	var ahref = el.attr('href');
		
	$('#loading').show();

	$('#loading').fadeTo(250,1,function() {
	
		$('#loading .box').removeClass('loaded');

		setTimeout(function() {
			location = base + ahref;
		}, 200);

	});

}








/* -- window load -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

$(window).load(function() {

	//backgroundLoadingEnd('windowLoad');

});






/* -- window resize -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

$(window).resize(function() { });







/* -- window scroll -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

$(window).scroll(function() { });








/* -- document ready -- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function() {









	/* -- nav -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */
	
	$('#header .nav-button').on(clickVarDefault, function() {
	
		if($('html').hasClass('mobile')) {
			$('html').removeClass('mobile')
		} else {
			$('html').addClass('mobile')
		}
	
	});
	
	$('#layout .overlay').on(clickVarDefault, function() {

		if($('html').hasClass('mobile')) {
			$('html').removeClass('mobile')
		}
	
	});
	
	/* -- nav clone -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */
	
	$('#header .container > ul').clone().appendTo('#navm');
	
	/* -- nav click -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */
	
	$('#navm a').on('click', function(e) {
	
		e.preventDefault();
	
		var link = $(this);
		var event = e;
	
		$('html').removeClass('mobile');
		setTimeout(function() {
			loadPage(event,link);
		}, 300);

	});









	/* -- loadpage -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

	$('#header li a, .link').click(function(e) {
	
		loadPage(e,$(this));
	
	});

	
	
	




	/* -- check width example -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

	if(($(window).width() + $.scrollbarWidth()) > 767) {
	
	}

	
	
	
	
	
	/* -- swipe/tap example -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

	/*
	
	$("#clickexample").swipe({
		tap : function(event, target) {
		},
		doubleTap : function(event, target) {
		},
		longTap : function(event, target) {
		},
		swipe : function() {
		},
		threshold:50
	});
	
	*/

	
	
	
	
	
	
	
	
	/* -- tap, swipeleft, swiperight -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */
	
	/*
	
	$('.parent-example').on('tap', 'li', function() {
	
	});

	$('.parent-example li').on('tap', function() {
	
	});
	
	$(".parent-example li").on("taphold", function() { // the taphold event is triggered when the user taps on an element and hold for one second

	});
	
	$(".parent-example li").on("swipe", function() { // the swipe event is triggered when the user swipes over an element horizontally by more than 30px

	});
	
	$(".parent-example li").on("swipeleft", function() { // left direction by more than 30px

	});
	
	$(".parent-example li").on("swiperight", function() { // right direction by more than 30px

	});
	
	*/
	
	
	
	





	/* -- fancybox -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

	/*

	$("a.lightbox").fancybox({
			'opacity'			: true,
			'overlayShow'		: true,
			'transitionIn'		: 'fade',
			'transitionOut'		: 'fade',
			'titlePosition'		: 'outside',
			'overlayColor'		: '#fff',
			'overlayOpacity'	: 0.75,
			'padding'			: 0,
			'titleFormat'		: function() { return ''; }
	});
	
	*/
	
	
	
	
	
	
	
	
	
	
	/* -- disable_scroll // enable_scroll -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */	
	
	/*
	
	$('#header nav a').click(function(e) {
	
		e.preventDefault();
		
		disable_scroll();
	
		var ahref = $(this).attr('href');
		
		$(scrollCheck).stop().animate(
			{
				scrollTop: parseInt($(ahref).offset().top - $('#header').outerHeight()) + 2
			},
			{
				duration: 750,
				easing: 'easeInOutExpo',
				queue: false,
				complete: function() {
					setTimeout(function() {
						enable_scroll();
					}, 50);
				}
			}
		);

	});
	
	*/
	
	

	
	
	
	
	/* -- parallax -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */
	
	/*
	
	if(!isMobile) {
		$('.parallax').parallax({ "start":0, "coeff":-0.8 });
	}
	
	*/
	
	


	
	
	/* -- scrolltop -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

	$(scrollCheck).animate({ scrollTop: 0 }, 0);
	
	
	

	
	
	
	
	
	/* -- blank and fade when you click a link -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

	$('.blank').attr('target','_blank');
	
	
	
	
	
	
	/* -- loading -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

	/*

	var img = new Image();
	$(img).load(function() {
	
		//setTimeout(function() {
	
			$('#loading .box').addClass('loaded');

			$('*').each(function() {
			
				var backgroundImage = $(this).css('background-image');
				var putInArray = false;
				
				var check = backgroundImage.substr(0,3);

				if(check == 'url') {

				//if(backgroundImage != 'none') {
					backgroundImage = backgroundImage.split('url(').join('').split(')').join('');
					backgroundImage = backgroundImage.replace(base,'');
					backgroundImage = backgroundImage.replace('"',''); 
					backgroundImage = backgroundImage.replace('"','');
					
					if(backgroundImage.substr(0,4) == 'http') {
						backgroundImage = backgroundImage;
					} else {
						backgroundImage = base + backgroundImage;	
					}
					putInArray = true;

				} else if($(this).get(0).tagName == 'IMG') {

					backgroundImage = $(this).attr('src');
					putInArray = true;

				}
				
				if(putInArray) {
					backgroundImageArray[backgroundImageArray.length] = backgroundImage;
				}
			
			});

			backgroundLoading(1);
		
		//}, 300);

	})
	.attr('src', 'img/logo.png');
	
	*/
	

	
	
	
	
	/* -- form -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */	
	
	$("#form").submit(function() {
	
		var form = true;
		$("#form input").removeClass('error');
		
		if($("#form_name").val().length < 2) {
			$("#form_name").addClass('error');
			form = false;
		}
		
		var exp_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if(!exp_email.test($("#form_email").val())) {
			$("#form_email").addClass('error');
			form = false;
		}
		
		if($("#form_telephone").val().length < 2) {
			$("#form_telephone").addClass('error');
			form = false;
		}
	
		if(form) {
	
			$("#form input[type=submit]").attr('type','button');
			
			queryAjax = $.ajax({
				type: "post",   
				url : 'form.php',
				data: {
					form_name : $("#form_name").val(),
					form_email : $("#form_email").val(),
					form_company : $("#form_company").val(),
					form_telephone : $("#form_telephone").val(),
					form_textarea : $("#form_textarea").val()
				},
				async : true,
				success : function(text) {
				},
				error : function(text) {
				}
			});
		
			$('#form').slideUp(500, function() {
			
				$('#form').empty();
				$('#form').append('<img src="img/mail.png" width="240" /><h4 class="title">Message sent,<br/>Thank you!</h4>');
			
				$('#form').slideDown(500, function() {
				
				});
			
			});
		
		}
	
		return false;
	
	});	

	
	
	



	/* -- tooltip -- */
	/* ------------------------------------------------------------------------------------------------------------------------------------------------- */	

	$('.totp').on('mouseenter', function(e) {
		var text = $(this).attr('data-text');
		if(text != undefined) {
			showSocialToolTip(e, $(this).attr('data-text'));
			if($(this).hasClass('right')) {
				$('#tooltip').addClass('right')
			}
		}
	});
	
	$('.totp').on('mouseleave', function(e) {
		var text = $(this).attr('data-text');
		if(text != undefined) {
			hideSocialToolTip();
			$('#tooltip').removeClass('right')
		}
	});

	$('.totp').on(clickVar, function(e) {
		var text = $(this).attr('data-text');
		if(text != undefined) {
			hideSocialToolTip();
		    $('#tooltip').removeClass('right');
		}
	});

	$('.totp').on('mousemove', function(e) {
		var text = $(this).attr('data-text');
		if(text != undefined) {
			moveSocialToolTip(e);
		}
	});

	
	
	
	
	

});