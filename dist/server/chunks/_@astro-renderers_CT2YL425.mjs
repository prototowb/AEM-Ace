import require$$2 from '@babel/parser';
import require$$3 from 'estree-walker';
import require$$4 from 'source-map-js';
import require$$2$1 from '@vue/compiler-ssr';
import require$$3$1 from 'node:stream';
import React, { createElement } from 'react';
import ReactDOM from 'react-dom/server';

const setup = () => {};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var vue = {exports: {}};

var vue_cjs_prod = {};

var compilerDom_cjs_prod = {};

var compilerCore_cjs_prod = {};

var shared_cjs_prod = {};

/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/

var hasRequiredShared_cjs_prod;

function requireShared_cjs_prod () {
	if (hasRequiredShared_cjs_prod) return shared_cjs_prod;
	hasRequiredShared_cjs_prod = 1;

	Object.defineProperty(shared_cjs_prod, '__esModule', { value: true });

	/*! #__NO_SIDE_EFFECTS__ */
	// @__NO_SIDE_EFFECTS__
	function makeMap(str) {
	  const map = /* @__PURE__ */ Object.create(null);
	  for (const key of str.split(",")) map[key] = 1;
	  return (val) => val in map;
	}

	const EMPTY_OBJ = {};
	const EMPTY_ARR = [];
	const NOOP = () => {
	};
	const NO = () => false;
	const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
	(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
	const isModelListener = (key) => key.startsWith("onUpdate:");
	const extend = Object.assign;
	const remove = (arr, el) => {
	  const i = arr.indexOf(el);
	  if (i > -1) {
	    arr.splice(i, 1);
	  }
	};
	const hasOwnProperty = Object.prototype.hasOwnProperty;
	const hasOwn = (val, key) => hasOwnProperty.call(val, key);
	const isArray = Array.isArray;
	const isMap = (val) => toTypeString(val) === "[object Map]";
	const isSet = (val) => toTypeString(val) === "[object Set]";
	const isDate = (val) => toTypeString(val) === "[object Date]";
	const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
	const isFunction = (val) => typeof val === "function";
	const isString = (val) => typeof val === "string";
	const isSymbol = (val) => typeof val === "symbol";
	const isObject = (val) => val !== null && typeof val === "object";
	const isPromise = (val) => {
	  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
	};
	const objectToString = Object.prototype.toString;
	const toTypeString = (value) => objectToString.call(value);
	const toRawType = (value) => {
	  return toTypeString(value).slice(8, -1);
	};
	const isPlainObject = (val) => toTypeString(val) === "[object Object]";
	const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
	const isReservedProp = /* @__PURE__ */ makeMap(
	  // the leading comma is intentional so empty string "" is also included
	  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
	);
	const isBuiltInDirective = /* @__PURE__ */ makeMap(
	  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
	);
	const cacheStringFunction = (fn) => {
	  const cache = /* @__PURE__ */ Object.create(null);
	  return (str) => {
	    const hit = cache[str];
	    return hit || (cache[str] = fn(str));
	  };
	};
	const camelizeRE = /-(\w)/g;
	const camelize = cacheStringFunction(
	  (str) => {
	    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
	  }
	);
	const hyphenateRE = /\B([A-Z])/g;
	const hyphenate = cacheStringFunction(
	  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
	);
	const capitalize = cacheStringFunction((str) => {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	});
	const toHandlerKey = cacheStringFunction(
	  (str) => {
	    const s = str ? `on${capitalize(str)}` : ``;
	    return s;
	  }
	);
	const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
	const invokeArrayFns = (fns, ...arg) => {
	  for (let i = 0; i < fns.length; i++) {
	    fns[i](...arg);
	  }
	};
	const def = (obj, key, value, writable = false) => {
	  Object.defineProperty(obj, key, {
	    configurable: true,
	    enumerable: false,
	    writable,
	    value
	  });
	};
	const looseToNumber = (val) => {
	  const n = parseFloat(val);
	  return isNaN(n) ? val : n;
	};
	const toNumber = (val) => {
	  const n = isString(val) ? Number(val) : NaN;
	  return isNaN(n) ? val : n;
	};
	let _globalThis;
	const getGlobalThis = () => {
	  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : {});
	};
	const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
	function genPropsAccessExp(name) {
	  return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
	}
	function genCacheKey(source, options) {
	  return source + JSON.stringify(
	    options,
	    (_, val) => typeof val === "function" ? val.toString() : val
	  );
	}

	const PatchFlags = {
	  "TEXT": 1,
	  "1": "TEXT",
	  "CLASS": 2,
	  "2": "CLASS",
	  "STYLE": 4,
	  "4": "STYLE",
	  "PROPS": 8,
	  "8": "PROPS",
	  "FULL_PROPS": 16,
	  "16": "FULL_PROPS",
	  "NEED_HYDRATION": 32,
	  "32": "NEED_HYDRATION",
	  "STABLE_FRAGMENT": 64,
	  "64": "STABLE_FRAGMENT",
	  "KEYED_FRAGMENT": 128,
	  "128": "KEYED_FRAGMENT",
	  "UNKEYED_FRAGMENT": 256,
	  "256": "UNKEYED_FRAGMENT",
	  "NEED_PATCH": 512,
	  "512": "NEED_PATCH",
	  "DYNAMIC_SLOTS": 1024,
	  "1024": "DYNAMIC_SLOTS",
	  "DEV_ROOT_FRAGMENT": 2048,
	  "2048": "DEV_ROOT_FRAGMENT",
	  "CACHED": -1,
	  "-1": "CACHED",
	  "BAIL": -2,
	  "-2": "BAIL"
	};
	const PatchFlagNames = {
	  [1]: `TEXT`,
	  [2]: `CLASS`,
	  [4]: `STYLE`,
	  [8]: `PROPS`,
	  [16]: `FULL_PROPS`,
	  [32]: `NEED_HYDRATION`,
	  [64]: `STABLE_FRAGMENT`,
	  [128]: `KEYED_FRAGMENT`,
	  [256]: `UNKEYED_FRAGMENT`,
	  [512]: `NEED_PATCH`,
	  [1024]: `DYNAMIC_SLOTS`,
	  [2048]: `DEV_ROOT_FRAGMENT`,
	  [-1]: `CACHED`,
	  [-2]: `BAIL`
	};

	const ShapeFlags = {
	  "ELEMENT": 1,
	  "1": "ELEMENT",
	  "FUNCTIONAL_COMPONENT": 2,
	  "2": "FUNCTIONAL_COMPONENT",
	  "STATEFUL_COMPONENT": 4,
	  "4": "STATEFUL_COMPONENT",
	  "TEXT_CHILDREN": 8,
	  "8": "TEXT_CHILDREN",
	  "ARRAY_CHILDREN": 16,
	  "16": "ARRAY_CHILDREN",
	  "SLOTS_CHILDREN": 32,
	  "32": "SLOTS_CHILDREN",
	  "TELEPORT": 64,
	  "64": "TELEPORT",
	  "SUSPENSE": 128,
	  "128": "SUSPENSE",
	  "COMPONENT_SHOULD_KEEP_ALIVE": 256,
	  "256": "COMPONENT_SHOULD_KEEP_ALIVE",
	  "COMPONENT_KEPT_ALIVE": 512,
	  "512": "COMPONENT_KEPT_ALIVE",
	  "COMPONENT": 6,
	  "6": "COMPONENT"
	};

	const SlotFlags = {
	  "STABLE": 1,
	  "1": "STABLE",
	  "DYNAMIC": 2,
	  "2": "DYNAMIC",
	  "FORWARDED": 3,
	  "3": "FORWARDED"
	};
	const slotFlagsText = {
	  [1]: "STABLE",
	  [2]: "DYNAMIC",
	  [3]: "FORWARDED"
	};

	const GLOBALS_ALLOWED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol";
	const isGloballyAllowed = /* @__PURE__ */ makeMap(GLOBALS_ALLOWED);
	const isGloballyWhitelisted = isGloballyAllowed;

	const range = 2;
	function generateCodeFrame(source, start = 0, end = source.length) {
	  start = Math.max(0, Math.min(start, source.length));
	  end = Math.max(0, Math.min(end, source.length));
	  if (start > end) return "";
	  let lines = source.split(/(\r?\n)/);
	  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
	  lines = lines.filter((_, idx) => idx % 2 === 0);
	  let count = 0;
	  const res = [];
	  for (let i = 0; i < lines.length; i++) {
	    count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
	    if (count >= start) {
	      for (let j = i - range; j <= i + range || end > count; j++) {
	        if (j < 0 || j >= lines.length) continue;
	        const line = j + 1;
	        res.push(
	          `${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`
	        );
	        const lineLength = lines[j].length;
	        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
	        if (j === i) {
	          const pad = start - (count - (lineLength + newLineSeqLength));
	          const length = Math.max(
	            1,
	            end > count ? lineLength - pad : end - start
	          );
	          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
	        } else if (j > i) {
	          if (end > count) {
	            const length = Math.max(Math.min(end - count, lineLength), 1);
	            res.push(`   |  ` + "^".repeat(length));
	          }
	          count += lineLength + newLineSeqLength;
	        }
	      }
	      break;
	    }
	  }
	  return res.join("\n");
	}

	function normalizeStyle(value) {
	  if (isArray(value)) {
	    const res = {};
	    for (let i = 0; i < value.length; i++) {
	      const item = value[i];
	      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
	      if (normalized) {
	        for (const key in normalized) {
	          res[key] = normalized[key];
	        }
	      }
	    }
	    return res;
	  } else if (isString(value) || isObject(value)) {
	    return value;
	  }
	}
	const listDelimiterRE = /;(?![^(]*\))/g;
	const propertyDelimiterRE = /:([^]+)/;
	const styleCommentRE = /\/\*[^]*?\*\//g;
	function parseStringStyle(cssText) {
	  const ret = {};
	  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
	    if (item) {
	      const tmp = item.split(propertyDelimiterRE);
	      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return ret;
	}
	function stringifyStyle(styles) {
	  if (!styles) return "";
	  if (isString(styles)) return styles;
	  let ret = "";
	  for (const key in styles) {
	    const value = styles[key];
	    if (isString(value) || typeof value === "number") {
	      const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
	      ret += `${normalizedKey}:${value};`;
	    }
	  }
	  return ret;
	}
	function normalizeClass(value) {
	  let res = "";
	  if (isString(value)) {
	    res = value;
	  } else if (isArray(value)) {
	    for (let i = 0; i < value.length; i++) {
	      const normalized = normalizeClass(value[i]);
	      if (normalized) {
	        res += normalized + " ";
	      }
	    }
	  } else if (isObject(value)) {
	    for (const name in value) {
	      if (value[name]) {
	        res += name + " ";
	      }
	    }
	  }
	  return res.trim();
	}
	function normalizeProps(props) {
	  if (!props) return null;
	  let { class: klass, style } = props;
	  if (klass && !isString(klass)) {
	    props.class = normalizeClass(klass);
	  }
	  if (style) {
	    props.style = normalizeStyle(style);
	  }
	  return props;
	}

	const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
	const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
	const MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
	const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
	const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
	const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
	const isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS);
	const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);

	const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
	const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
	const isBooleanAttr = /* @__PURE__ */ makeMap(
	  specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
	);
	function includeBooleanAttr(value) {
	  return !!value || value === "";
	}
	const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
	const attrValidationCache = {};
	function isSSRSafeAttrName(name) {
	  if (attrValidationCache.hasOwnProperty(name)) {
	    return attrValidationCache[name];
	  }
	  const isUnsafe = unsafeAttrCharRE.test(name);
	  if (isUnsafe) {
	    console.error(`unsafe attribute name: ${name}`);
	  }
	  return attrValidationCache[name] = !isUnsafe;
	}
	const propsToAttrMap = {
	  acceptCharset: "accept-charset",
	  className: "class",
	  htmlFor: "for",
	  httpEquiv: "http-equiv"
	};
	const isKnownHtmlAttr = /* @__PURE__ */ makeMap(
	  `accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`
	);
	const isKnownSvgAttr = /* @__PURE__ */ makeMap(
	  `xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`
	);
	const isKnownMathMLAttr = /* @__PURE__ */ makeMap(
	  `accent,accentunder,actiontype,align,alignmentscope,altimg,altimg-height,altimg-valign,altimg-width,alttext,bevelled,close,columnsalign,columnlines,columnspan,denomalign,depth,dir,display,displaystyle,encoding,equalcolumns,equalrows,fence,fontstyle,fontweight,form,frame,framespacing,groupalign,height,href,id,indentalign,indentalignfirst,indentalignlast,indentshift,indentshiftfirst,indentshiftlast,indextype,justify,largetop,largeop,lquote,lspace,mathbackground,mathcolor,mathsize,mathvariant,maxsize,minlabelspacing,mode,other,overflow,position,rowalign,rowlines,rowspan,rquote,rspace,scriptlevel,scriptminsize,scriptsizemultiplier,selection,separator,separators,shift,side,src,stackalign,stretchy,subscriptshift,superscriptshift,symmetric,voffset,width,widths,xlink:href,xlink:show,xlink:type,xmlns`
	);
	function isRenderableAttrValue(value) {
	  if (value == null) {
	    return false;
	  }
	  const type = typeof value;
	  return type === "string" || type === "number" || type === "boolean";
	}

	const escapeRE = /["'&<>]/;
	function escapeHtml(string) {
	  const str = "" + string;
	  const match = escapeRE.exec(str);
	  if (!match) {
	    return str;
	  }
	  let html = "";
	  let escaped;
	  let index;
	  let lastIndex = 0;
	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34:
	        escaped = "&quot;";
	        break;
	      case 38:
	        escaped = "&amp;";
	        break;
	      case 39:
	        escaped = "&#39;";
	        break;
	      case 60:
	        escaped = "&lt;";
	        break;
	      case 62:
	        escaped = "&gt;";
	        break;
	      default:
	        continue;
	    }
	    if (lastIndex !== index) {
	      html += str.slice(lastIndex, index);
	    }
	    lastIndex = index + 1;
	    html += escaped;
	  }
	  return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
	}
	const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
	function escapeHtmlComment(src) {
	  return src.replace(commentStripRE, "");
	}
	const cssVarNameEscapeSymbolsRE = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
	function getEscapedCssVarName(key, doubleEscape) {
	  return key.replace(
	    cssVarNameEscapeSymbolsRE,
	    (s) => doubleEscape ? s === '"' ? '\\\\\\"' : `\\\\${s}` : `\\${s}`
	  );
	}

	function looseCompareArrays(a, b) {
	  if (a.length !== b.length) return false;
	  let equal = true;
	  for (let i = 0; equal && i < a.length; i++) {
	    equal = looseEqual(a[i], b[i]);
	  }
	  return equal;
	}
	function looseEqual(a, b) {
	  if (a === b) return true;
	  let aValidType = isDate(a);
	  let bValidType = isDate(b);
	  if (aValidType || bValidType) {
	    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
	  }
	  aValidType = isSymbol(a);
	  bValidType = isSymbol(b);
	  if (aValidType || bValidType) {
	    return a === b;
	  }
	  aValidType = isArray(a);
	  bValidType = isArray(b);
	  if (aValidType || bValidType) {
	    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
	  }
	  aValidType = isObject(a);
	  bValidType = isObject(b);
	  if (aValidType || bValidType) {
	    if (!aValidType || !bValidType) {
	      return false;
	    }
	    const aKeysCount = Object.keys(a).length;
	    const bKeysCount = Object.keys(b).length;
	    if (aKeysCount !== bKeysCount) {
	      return false;
	    }
	    for (const key in a) {
	      const aHasKey = a.hasOwnProperty(key);
	      const bHasKey = b.hasOwnProperty(key);
	      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
	        return false;
	      }
	    }
	  }
	  return String(a) === String(b);
	}
	function looseIndexOf(arr, val) {
	  return arr.findIndex((item) => looseEqual(item, val));
	}

	const isRef = (val) => {
	  return !!(val && val["__v_isRef"] === true);
	};
	const toDisplayString = (val) => {
	  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
	};
	const replacer = (_key, val) => {
	  if (isRef(val)) {
	    return replacer(_key, val.value);
	  } else if (isMap(val)) {
	    return {
	      [`Map(${val.size})`]: [...val.entries()].reduce(
	        (entries, [key, val2], i) => {
	          entries[stringifySymbol(key, i) + " =>"] = val2;
	          return entries;
	        },
	        {}
	      )
	    };
	  } else if (isSet(val)) {
	    return {
	      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
	    };
	  } else if (isSymbol(val)) {
	    return stringifySymbol(val);
	  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
	    return String(val);
	  }
	  return val;
	};
	const stringifySymbol = (v, i = "") => {
	  var _a;
	  return (
	    // Symbol.description in es2019+ so we need to cast here to pass
	    // the lib: es2016 check
	    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
	  );
	};

	function normalizeCssVarValue(value) {
	  if (value == null) {
	    return "initial";
	  }
	  if (typeof value === "string") {
	    return value === "" ? " " : value;
	  }
	  return String(value);
	}

	shared_cjs_prod.EMPTY_ARR = EMPTY_ARR;
	shared_cjs_prod.EMPTY_OBJ = EMPTY_OBJ;
	shared_cjs_prod.NO = NO;
	shared_cjs_prod.NOOP = NOOP;
	shared_cjs_prod.PatchFlagNames = PatchFlagNames;
	shared_cjs_prod.PatchFlags = PatchFlags;
	shared_cjs_prod.ShapeFlags = ShapeFlags;
	shared_cjs_prod.SlotFlags = SlotFlags;
	shared_cjs_prod.camelize = camelize;
	shared_cjs_prod.capitalize = capitalize;
	shared_cjs_prod.cssVarNameEscapeSymbolsRE = cssVarNameEscapeSymbolsRE;
	shared_cjs_prod.def = def;
	shared_cjs_prod.escapeHtml = escapeHtml;
	shared_cjs_prod.escapeHtmlComment = escapeHtmlComment;
	shared_cjs_prod.extend = extend;
	shared_cjs_prod.genCacheKey = genCacheKey;
	shared_cjs_prod.genPropsAccessExp = genPropsAccessExp;
	shared_cjs_prod.generateCodeFrame = generateCodeFrame;
	shared_cjs_prod.getEscapedCssVarName = getEscapedCssVarName;
	shared_cjs_prod.getGlobalThis = getGlobalThis;
	shared_cjs_prod.hasChanged = hasChanged;
	shared_cjs_prod.hasOwn = hasOwn;
	shared_cjs_prod.hyphenate = hyphenate;
	shared_cjs_prod.includeBooleanAttr = includeBooleanAttr;
	shared_cjs_prod.invokeArrayFns = invokeArrayFns;
	shared_cjs_prod.isArray = isArray;
	shared_cjs_prod.isBooleanAttr = isBooleanAttr;
	shared_cjs_prod.isBuiltInDirective = isBuiltInDirective;
	shared_cjs_prod.isDate = isDate;
	shared_cjs_prod.isFunction = isFunction;
	shared_cjs_prod.isGloballyAllowed = isGloballyAllowed;
	shared_cjs_prod.isGloballyWhitelisted = isGloballyWhitelisted;
	shared_cjs_prod.isHTMLTag = isHTMLTag;
	shared_cjs_prod.isIntegerKey = isIntegerKey;
	shared_cjs_prod.isKnownHtmlAttr = isKnownHtmlAttr;
	shared_cjs_prod.isKnownMathMLAttr = isKnownMathMLAttr;
	shared_cjs_prod.isKnownSvgAttr = isKnownSvgAttr;
	shared_cjs_prod.isMap = isMap;
	shared_cjs_prod.isMathMLTag = isMathMLTag;
	shared_cjs_prod.isModelListener = isModelListener;
	shared_cjs_prod.isObject = isObject;
	shared_cjs_prod.isOn = isOn;
	shared_cjs_prod.isPlainObject = isPlainObject;
	shared_cjs_prod.isPromise = isPromise;
	shared_cjs_prod.isRegExp = isRegExp;
	shared_cjs_prod.isRenderableAttrValue = isRenderableAttrValue;
	shared_cjs_prod.isReservedProp = isReservedProp;
	shared_cjs_prod.isSSRSafeAttrName = isSSRSafeAttrName;
	shared_cjs_prod.isSVGTag = isSVGTag;
	shared_cjs_prod.isSet = isSet;
	shared_cjs_prod.isSpecialBooleanAttr = isSpecialBooleanAttr;
	shared_cjs_prod.isString = isString;
	shared_cjs_prod.isSymbol = isSymbol;
	shared_cjs_prod.isVoidTag = isVoidTag;
	shared_cjs_prod.looseEqual = looseEqual;
	shared_cjs_prod.looseIndexOf = looseIndexOf;
	shared_cjs_prod.looseToNumber = looseToNumber;
	shared_cjs_prod.makeMap = makeMap;
	shared_cjs_prod.normalizeClass = normalizeClass;
	shared_cjs_prod.normalizeCssVarValue = normalizeCssVarValue;
	shared_cjs_prod.normalizeProps = normalizeProps;
	shared_cjs_prod.normalizeStyle = normalizeStyle;
	shared_cjs_prod.objectToString = objectToString;
	shared_cjs_prod.parseStringStyle = parseStringStyle;
	shared_cjs_prod.propsToAttrMap = propsToAttrMap;
	shared_cjs_prod.remove = remove;
	shared_cjs_prod.slotFlagsText = slotFlagsText;
	shared_cjs_prod.stringifyStyle = stringifyStyle;
	shared_cjs_prod.toDisplayString = toDisplayString;
	shared_cjs_prod.toHandlerKey = toHandlerKey;
	shared_cjs_prod.toNumber = toNumber;
	shared_cjs_prod.toRawType = toRawType;
	shared_cjs_prod.toTypeString = toTypeString;
	return shared_cjs_prod;
}

var decode = {};

var decodeDataHtml = {};

var hasRequiredDecodeDataHtml;

function requireDecodeDataHtml () {
	if (hasRequiredDecodeDataHtml) return decodeDataHtml;
	hasRequiredDecodeDataHtml = 1;
	// Generated using scripts/write-decode-map.ts
	Object.defineProperty(decodeDataHtml, "__esModule", { value: true });
	decodeDataHtml.default = new Uint16Array(
	// prettier-ignore
	"\u1d41<\xd5\u0131\u028a\u049d\u057b\u05d0\u0675\u06de\u07a2\u07d6\u080f\u0a4a\u0a91\u0da1\u0e6d\u0f09\u0f26\u10ca\u1228\u12e1\u1415\u149d\u14c3\u14df\u1525\0\0\0\0\0\0\u156b\u16cd\u198d\u1c12\u1ddd\u1f7e\u2060\u21b0\u228d\u23c0\u23fb\u2442\u2824\u2912\u2d08\u2e48\u2fce\u3016\u32ba\u3639\u37ac\u38fe\u3a28\u3a71\u3ae0\u3b2e\u0800EMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig\u803b\xc6\u40c6P\u803b&\u4026cute\u803b\xc1\u40c1reve;\u4102\u0100iyx}rc\u803b\xc2\u40c2;\u4410r;\uc000\ud835\udd04rave\u803b\xc0\u40c0pha;\u4391acr;\u4100d;\u6a53\u0100gp\x9d\xa1on;\u4104f;\uc000\ud835\udd38plyFunction;\u6061ing\u803b\xc5\u40c5\u0100cs\xbe\xc3r;\uc000\ud835\udc9cign;\u6254ilde\u803b\xc3\u40c3ml\u803b\xc4\u40c4\u0400aceforsu\xe5\xfb\xfe\u0117\u011c\u0122\u0127\u012a\u0100cr\xea\xf2kslash;\u6216\u0176\xf6\xf8;\u6ae7ed;\u6306y;\u4411\u0180crt\u0105\u010b\u0114ause;\u6235noullis;\u612ca;\u4392r;\uc000\ud835\udd05pf;\uc000\ud835\udd39eve;\u42d8c\xf2\u0113mpeq;\u624e\u0700HOacdefhilorsu\u014d\u0151\u0156\u0180\u019e\u01a2\u01b5\u01b7\u01ba\u01dc\u0215\u0273\u0278\u027ecy;\u4427PY\u803b\xa9\u40a9\u0180cpy\u015d\u0162\u017aute;\u4106\u0100;i\u0167\u0168\u62d2talDifferentialD;\u6145leys;\u612d\u0200aeio\u0189\u018e\u0194\u0198ron;\u410cdil\u803b\xc7\u40c7rc;\u4108nint;\u6230ot;\u410a\u0100dn\u01a7\u01adilla;\u40b8terDot;\u40b7\xf2\u017fi;\u43a7rcle\u0200DMPT\u01c7\u01cb\u01d1\u01d6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01e2\u01f8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020foubleQuote;\u601duote;\u6019\u0200lnpu\u021e\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6a74\u0180git\u022f\u0236\u023aruent;\u6261nt;\u622fourIntegral;\u622e\u0100fr\u024c\u024e;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6a2fcr;\uc000\ud835\udc9ep\u0100;C\u0284\u0285\u62d3ap;\u624d\u0580DJSZacefios\u02a0\u02ac\u02b0\u02b4\u02b8\u02cb\u02d7\u02e1\u02e6\u0333\u048d\u0100;o\u0179\u02a5trahd;\u6911cy;\u4402cy;\u4405cy;\u440f\u0180grs\u02bf\u02c4\u02c7ger;\u6021r;\u61a1hv;\u6ae4\u0100ay\u02d0\u02d5ron;\u410e;\u4414l\u0100;t\u02dd\u02de\u6207a;\u4394r;\uc000\ud835\udd07\u0100af\u02eb\u0327\u0100cm\u02f0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031ccute;\u40b4o\u0174\u030b\u030d;\u42d9bleAcute;\u42ddrave;\u4060ilde;\u42dcond;\u62c4ferentialD;\u6146\u0470\u033d\0\0\0\u0342\u0354\0\u0405f;\uc000\ud835\udd3b\u0180;DE\u0348\u0349\u034d\u40a8ot;\u60dcqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03cf\u03e2\u03f8ontourIntegra\xec\u0239o\u0274\u0379\0\0\u037b\xbb\u0349nArrow;\u61d3\u0100eo\u0387\u03a4ft\u0180ART\u0390\u0396\u03a1rrow;\u61d0ightArrow;\u61d4e\xe5\u02cang\u0100LR\u03ab\u03c4eft\u0100AR\u03b3\u03b9rrow;\u67f8ightArrow;\u67faightArrow;\u67f9ight\u0100AT\u03d8\u03derrow;\u61d2ee;\u62a8p\u0241\u03e9\0\0\u03efrrow;\u61d1ownArrow;\u61d5erticalBar;\u6225n\u0300ABLRTa\u0412\u042a\u0430\u045e\u047f\u037crrow\u0180;BU\u041d\u041e\u0422\u6193ar;\u6913pArrow;\u61f5reve;\u4311eft\u02d2\u043a\0\u0446\0\u0450ightVector;\u6950eeVector;\u695eector\u0100;B\u0459\u045a\u61bdar;\u6956ight\u01d4\u0467\0\u0471eeVector;\u695fector\u0100;B\u047a\u047b\u61c1ar;\u6957ee\u0100;A\u0486\u0487\u62a4rrow;\u61a7\u0100ct\u0492\u0497r;\uc000\ud835\udc9frok;\u4110\u0800NTacdfglmopqstux\u04bd\u04c0\u04c4\u04cb\u04de\u04e2\u04e7\u04ee\u04f5\u0521\u052f\u0536\u0552\u055d\u0560\u0565G;\u414aH\u803b\xd0\u40d0cute\u803b\xc9\u40c9\u0180aiy\u04d2\u04d7\u04dcron;\u411arc\u803b\xca\u40ca;\u442dot;\u4116r;\uc000\ud835\udd08rave\u803b\xc8\u40c8ement;\u6208\u0100ap\u04fa\u04fecr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65fberySmallSquare;\u65ab\u0100gp\u0526\u052aon;\u4118f;\uc000\ud835\udd3csilon;\u4395u\u0100ai\u053c\u0549l\u0100;T\u0542\u0543\u6a75ilde;\u6242librium;\u61cc\u0100ci\u0557\u055ar;\u6130m;\u6a73a;\u4397ml\u803b\xcb\u40cb\u0100ip\u056a\u056fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058d\u05b2\u05ccy;\u4424r;\uc000\ud835\udd09lled\u0253\u0597\0\0\u05a3mallSquare;\u65fcerySmallSquare;\u65aa\u0370\u05ba\0\u05bf\0\0\u05c4f;\uc000\ud835\udd3dAll;\u6200riertrf;\u6131c\xf2\u05cb\u0600JTabcdfgorst\u05e8\u05ec\u05ef\u05fa\u0600\u0612\u0616\u061b\u061d\u0623\u066c\u0672cy;\u4403\u803b>\u403emma\u0100;d\u05f7\u05f8\u4393;\u43dcreve;\u411e\u0180eiy\u0607\u060c\u0610dil;\u4122rc;\u411c;\u4413ot;\u4120r;\uc000\ud835\udd0a;\u62d9pf;\uc000\ud835\udd3eeater\u0300EFGLST\u0635\u0644\u064e\u0656\u065b\u0666qual\u0100;L\u063e\u063f\u6265ess;\u62dbullEqual;\u6267reater;\u6aa2ess;\u6277lantEqual;\u6a7eilde;\u6273cr;\uc000\ud835\udca2;\u626b\u0400Aacfiosu\u0685\u068b\u0696\u069b\u069e\u06aa\u06be\u06caRDcy;\u442a\u0100ct\u0690\u0694ek;\u42c7;\u405eirc;\u4124r;\u610clbertSpace;\u610b\u01f0\u06af\0\u06b2f;\u610dizontalLine;\u6500\u0100ct\u06c3\u06c5\xf2\u06a9rok;\u4126mp\u0144\u06d0\u06d8ownHum\xf0\u012fqual;\u624f\u0700EJOacdfgmnostu\u06fa\u06fe\u0703\u0707\u070e\u071a\u071e\u0721\u0728\u0744\u0778\u078b\u078f\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803b\xcd\u40cd\u0100iy\u0713\u0718rc\u803b\xce\u40ce;\u4418ot;\u4130r;\u6111rave\u803b\xcc\u40cc\u0180;ap\u0720\u072f\u073f\u0100cg\u0734\u0737r;\u412ainaryI;\u6148lie\xf3\u03dd\u01f4\u0749\0\u0762\u0100;e\u074d\u074e\u622c\u0100gr\u0753\u0758ral;\u622bsection;\u62c2isible\u0100CT\u076c\u0772omma;\u6063imes;\u6062\u0180gpt\u077f\u0783\u0788on;\u412ef;\uc000\ud835\udd40a;\u4399cr;\u6110ilde;\u4128\u01eb\u079a\0\u079ecy;\u4406l\u803b\xcf\u40cf\u0280cfosu\u07ac\u07b7\u07bc\u07c2\u07d0\u0100iy\u07b1\u07b5rc;\u4134;\u4419r;\uc000\ud835\udd0dpf;\uc000\ud835\udd41\u01e3\u07c7\0\u07ccr;\uc000\ud835\udca5rcy;\u4408kcy;\u4404\u0380HJacfos\u07e4\u07e8\u07ec\u07f1\u07fd\u0802\u0808cy;\u4425cy;\u440cppa;\u439a\u0100ey\u07f6\u07fbdil;\u4136;\u441ar;\uc000\ud835\udd0epf;\uc000\ud835\udd42cr;\uc000\ud835\udca6\u0580JTaceflmost\u0825\u0829\u082c\u0850\u0863\u09b3\u09b8\u09c7\u09cd\u0a37\u0a47cy;\u4409\u803b<\u403c\u0280cmnpr\u0837\u083c\u0841\u0844\u084dute;\u4139bda;\u439bg;\u67ealacetrf;\u6112r;\u619e\u0180aey\u0857\u085c\u0861ron;\u413ddil;\u413b;\u441b\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087e\u08a9\u08b1\u08e0\u08e6\u08fc\u092f\u095b\u0390\u096a\u0100nr\u0883\u088fgleBracket;\u67e8row\u0180;BR\u0899\u089a\u089e\u6190ar;\u61e4ightArrow;\u61c6eiling;\u6308o\u01f5\u08b7\0\u08c3bleBracket;\u67e6n\u01d4\u08c8\0\u08d2eeVector;\u6961ector\u0100;B\u08db\u08dc\u61c3ar;\u6959loor;\u630aight\u0100AV\u08ef\u08f5rrow;\u6194ector;\u694e\u0100er\u0901\u0917e\u0180;AV\u0909\u090a\u0910\u62a3rrow;\u61a4ector;\u695aiangle\u0180;BE\u0924\u0925\u0929\u62b2ar;\u69cfqual;\u62b4p\u0180DTV\u0937\u0942\u094cownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61bfar;\u6958ector\u0100;B\u0965\u0966\u61bcar;\u6952ight\xe1\u039cs\u0300EFGLST\u097e\u098b\u0995\u099d\u09a2\u09adqualGreater;\u62daullEqual;\u6266reater;\u6276ess;\u6aa1lantEqual;\u6a7dilde;\u6272r;\uc000\ud835\udd0f\u0100;e\u09bd\u09be\u62d8ftarrow;\u61daidot;\u413f\u0180npw\u09d4\u0a16\u0a1bg\u0200LRlr\u09de\u09f7\u0a02\u0a10eft\u0100AR\u09e6\u09ecrrow;\u67f5ightArrow;\u67f7ightArrow;\u67f6eft\u0100ar\u03b3\u0a0aight\xe1\u03bfight\xe1\u03caf;\uc000\ud835\udd43er\u0100LR\u0a22\u0a2ceftArrow;\u6199ightArrow;\u6198\u0180cht\u0a3e\u0a40\u0a42\xf2\u084c;\u61b0rok;\u4141;\u626a\u0400acefiosu\u0a5a\u0a5d\u0a60\u0a77\u0a7c\u0a85\u0a8b\u0a8ep;\u6905y;\u441c\u0100dl\u0a65\u0a6fiumSpace;\u605flintrf;\u6133r;\uc000\ud835\udd10nusPlus;\u6213pf;\uc000\ud835\udd44c\xf2\u0a76;\u439c\u0480Jacefostu\u0aa3\u0aa7\u0aad\u0ac0\u0b14\u0b19\u0d91\u0d97\u0d9ecy;\u440acute;\u4143\u0180aey\u0ab4\u0ab9\u0aberon;\u4147dil;\u4145;\u441d\u0180gsw\u0ac7\u0af0\u0b0eative\u0180MTV\u0ad3\u0adf\u0ae8ediumSpace;\u600bhi\u0100cn\u0ae6\u0ad8\xeb\u0ad9eryThi\xee\u0ad9ted\u0100GL\u0af8\u0b06reaterGreate\xf2\u0673essLes\xf3\u0a48Line;\u400ar;\uc000\ud835\udd11\u0200Bnpt\u0b22\u0b28\u0b37\u0b3areak;\u6060BreakingSpace;\u40a0f;\u6115\u0680;CDEGHLNPRSTV\u0b55\u0b56\u0b6a\u0b7c\u0ba1\u0beb\u0c04\u0c5e\u0c84\u0ca6\u0cd8\u0d61\u0d85\u6aec\u0100ou\u0b5b\u0b64ngruent;\u6262pCap;\u626doubleVerticalBar;\u6226\u0180lqx\u0b83\u0b8a\u0b9bement;\u6209ual\u0100;T\u0b92\u0b93\u6260ilde;\uc000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0bb6\u0bb7\u0bbd\u0bc9\u0bd3\u0bd8\u0be5\u626fqual;\u6271ullEqual;\uc000\u2267\u0338reater;\uc000\u226b\u0338ess;\u6279lantEqual;\uc000\u2a7e\u0338ilde;\u6275ump\u0144\u0bf2\u0bfdownHump;\uc000\u224e\u0338qual;\uc000\u224f\u0338e\u0100fs\u0c0a\u0c27tTriangle\u0180;BE\u0c1a\u0c1b\u0c21\u62eaar;\uc000\u29cf\u0338qual;\u62ecs\u0300;EGLST\u0c35\u0c36\u0c3c\u0c44\u0c4b\u0c58\u626equal;\u6270reater;\u6278ess;\uc000\u226a\u0338lantEqual;\uc000\u2a7d\u0338ilde;\u6274ested\u0100GL\u0c68\u0c79reaterGreater;\uc000\u2aa2\u0338essLess;\uc000\u2aa1\u0338recedes\u0180;ES\u0c92\u0c93\u0c9b\u6280qual;\uc000\u2aaf\u0338lantEqual;\u62e0\u0100ei\u0cab\u0cb9verseElement;\u620cghtTriangle\u0180;BE\u0ccb\u0ccc\u0cd2\u62ebar;\uc000\u29d0\u0338qual;\u62ed\u0100qu\u0cdd\u0d0cuareSu\u0100bp\u0ce8\u0cf9set\u0100;E\u0cf0\u0cf3\uc000\u228f\u0338qual;\u62e2erset\u0100;E\u0d03\u0d06\uc000\u2290\u0338qual;\u62e3\u0180bcp\u0d13\u0d24\u0d4eset\u0100;E\u0d1b\u0d1e\uc000\u2282\u20d2qual;\u6288ceeds\u0200;EST\u0d32\u0d33\u0d3b\u0d46\u6281qual;\uc000\u2ab0\u0338lantEqual;\u62e1ilde;\uc000\u227f\u0338erset\u0100;E\u0d58\u0d5b\uc000\u2283\u20d2qual;\u6289ilde\u0200;EFT\u0d6e\u0d6f\u0d75\u0d7f\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uc000\ud835\udca9ilde\u803b\xd1\u40d1;\u439d\u0700Eacdfgmoprstuv\u0dbd\u0dc2\u0dc9\u0dd5\u0ddb\u0de0\u0de7\u0dfc\u0e02\u0e20\u0e22\u0e32\u0e3f\u0e44lig;\u4152cute\u803b\xd3\u40d3\u0100iy\u0dce\u0dd3rc\u803b\xd4\u40d4;\u441eblac;\u4150r;\uc000\ud835\udd12rave\u803b\xd2\u40d2\u0180aei\u0dee\u0df2\u0df6cr;\u414cga;\u43a9cron;\u439fpf;\uc000\ud835\udd46enCurly\u0100DQ\u0e0e\u0e1aoubleQuote;\u601cuote;\u6018;\u6a54\u0100cl\u0e27\u0e2cr;\uc000\ud835\udcaaash\u803b\xd8\u40d8i\u016c\u0e37\u0e3cde\u803b\xd5\u40d5es;\u6a37ml\u803b\xd6\u40d6er\u0100BP\u0e4b\u0e60\u0100ar\u0e50\u0e53r;\u603eac\u0100ek\u0e5a\u0e5c;\u63deet;\u63b4arenthesis;\u63dc\u0480acfhilors\u0e7f\u0e87\u0e8a\u0e8f\u0e92\u0e94\u0e9d\u0eb0\u0efcrtialD;\u6202y;\u441fr;\uc000\ud835\udd13i;\u43a6;\u43a0usMinus;\u40b1\u0100ip\u0ea2\u0eadncareplan\xe5\u069df;\u6119\u0200;eio\u0eb9\u0eba\u0ee0\u0ee4\u6abbcedes\u0200;EST\u0ec8\u0ec9\u0ecf\u0eda\u627aqual;\u6aaflantEqual;\u627cilde;\u627eme;\u6033\u0100dp\u0ee9\u0eeeuct;\u620fortion\u0100;a\u0225\u0ef9l;\u621d\u0100ci\u0f01\u0f06r;\uc000\ud835\udcab;\u43a8\u0200Ufos\u0f11\u0f16\u0f1b\u0f1fOT\u803b\"\u4022r;\uc000\ud835\udd14pf;\u611acr;\uc000\ud835\udcac\u0600BEacefhiorsu\u0f3e\u0f43\u0f47\u0f60\u0f73\u0fa7\u0faa\u0fad\u1096\u10a9\u10b4\u10bearr;\u6910G\u803b\xae\u40ae\u0180cnr\u0f4e\u0f53\u0f56ute;\u4154g;\u67ebr\u0100;t\u0f5c\u0f5d\u61a0l;\u6916\u0180aey\u0f67\u0f6c\u0f71ron;\u4158dil;\u4156;\u4420\u0100;v\u0f78\u0f79\u611cerse\u0100EU\u0f82\u0f99\u0100lq\u0f87\u0f8eement;\u620builibrium;\u61cbpEquilibrium;\u696fr\xbb\u0f79o;\u43a1ght\u0400ACDFTUVa\u0fc1\u0feb\u0ff3\u1022\u1028\u105b\u1087\u03d8\u0100nr\u0fc6\u0fd2gleBracket;\u67e9row\u0180;BL\u0fdc\u0fdd\u0fe1\u6192ar;\u61e5eftArrow;\u61c4eiling;\u6309o\u01f5\u0ff9\0\u1005bleBracket;\u67e7n\u01d4\u100a\0\u1014eeVector;\u695dector\u0100;B\u101d\u101e\u61c2ar;\u6955loor;\u630b\u0100er\u102d\u1043e\u0180;AV\u1035\u1036\u103c\u62a2rrow;\u61a6ector;\u695biangle\u0180;BE\u1050\u1051\u1055\u62b3ar;\u69d0qual;\u62b5p\u0180DTV\u1063\u106e\u1078ownVector;\u694feeVector;\u695cector\u0100;B\u1082\u1083\u61bear;\u6954ector\u0100;B\u1091\u1092\u61c0ar;\u6953\u0100pu\u109b\u109ef;\u611dndImplies;\u6970ightarrow;\u61db\u0100ch\u10b9\u10bcr;\u611b;\u61b1leDelayed;\u69f4\u0680HOacfhimoqstu\u10e4\u10f1\u10f7\u10fd\u1119\u111e\u1151\u1156\u1161\u1167\u11b5\u11bb\u11bf\u0100Cc\u10e9\u10eeHcy;\u4429y;\u4428FTcy;\u442ccute;\u415a\u0280;aeiy\u1108\u1109\u110e\u1113\u1117\u6abcron;\u4160dil;\u415erc;\u415c;\u4421r;\uc000\ud835\udd16ort\u0200DLRU\u112a\u1134\u113e\u1149ownArrow\xbb\u041eeftArrow\xbb\u089aightArrow\xbb\u0fddpArrow;\u6191gma;\u43a3allCircle;\u6218pf;\uc000\ud835\udd4a\u0272\u116d\0\0\u1170t;\u621aare\u0200;ISU\u117b\u117c\u1189\u11af\u65a1ntersection;\u6293u\u0100bp\u118f\u119eset\u0100;E\u1197\u1198\u628fqual;\u6291erset\u0100;E\u11a8\u11a9\u6290qual;\u6292nion;\u6294cr;\uc000\ud835\udcaear;\u62c6\u0200bcmp\u11c8\u11db\u1209\u120b\u0100;s\u11cd\u11ce\u62d0et\u0100;E\u11cd\u11d5qual;\u6286\u0100ch\u11e0\u1205eeds\u0200;EST\u11ed\u11ee\u11f4\u11ff\u627bqual;\u6ab0lantEqual;\u627dilde;\u627fTh\xe1\u0f8c;\u6211\u0180;es\u1212\u1213\u1223\u62d1rset\u0100;E\u121c\u121d\u6283qual;\u6287et\xbb\u1213\u0580HRSacfhiors\u123e\u1244\u1249\u1255\u125e\u1271\u1276\u129f\u12c2\u12c8\u12d1ORN\u803b\xde\u40deADE;\u6122\u0100Hc\u124e\u1252cy;\u440by;\u4426\u0100bu\u125a\u125c;\u4009;\u43a4\u0180aey\u1265\u126a\u126fron;\u4164dil;\u4162;\u4422r;\uc000\ud835\udd17\u0100ei\u127b\u1289\u01f2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128e\u1298kSpace;\uc000\u205f\u200aSpace;\u6009lde\u0200;EFT\u12ab\u12ac\u12b2\u12bc\u623cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uc000\ud835\udd4bipleDot;\u60db\u0100ct\u12d6\u12dbr;\uc000\ud835\udcafrok;\u4166\u0ae1\u12f7\u130e\u131a\u1326\0\u132c\u1331\0\0\0\0\0\u1338\u133d\u1377\u1385\0\u13ff\u1404\u140a\u1410\u0100cr\u12fb\u1301ute\u803b\xda\u40dar\u0100;o\u1307\u1308\u619fcir;\u6949r\u01e3\u1313\0\u1316y;\u440eve;\u416c\u0100iy\u131e\u1323rc\u803b\xdb\u40db;\u4423blac;\u4170r;\uc000\ud835\udd18rave\u803b\xd9\u40d9acr;\u416a\u0100di\u1341\u1369er\u0100BP\u1348\u135d\u0100ar\u134d\u1350r;\u405fac\u0100ek\u1357\u1359;\u63dfet;\u63b5arenthesis;\u63ddon\u0100;P\u1370\u1371\u62c3lus;\u628e\u0100gp\u137b\u137fon;\u4172f;\uc000\ud835\udd4c\u0400ADETadps\u1395\u13ae\u13b8\u13c4\u03e8\u13d2\u13d7\u13f3rrow\u0180;BD\u1150\u13a0\u13a4ar;\u6912ownArrow;\u61c5ownArrow;\u6195quilibrium;\u696eee\u0100;A\u13cb\u13cc\u62a5rrow;\u61a5own\xe1\u03f3er\u0100LR\u13de\u13e8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13f9\u13fa\u43d2on;\u43a5ing;\u416ecr;\uc000\ud835\udcb0ilde;\u4168ml\u803b\xdc\u40dc\u0480Dbcdefosv\u1427\u142c\u1430\u1433\u143e\u1485\u148a\u1490\u1496ash;\u62abar;\u6aeby;\u4412ash\u0100;l\u143b\u143c\u62a9;\u6ae6\u0100er\u1443\u1445;\u62c1\u0180bty\u144c\u1450\u147aar;\u6016\u0100;i\u144f\u1455cal\u0200BLST\u1461\u1465\u146a\u1474ar;\u6223ine;\u407ceparator;\u6758ilde;\u6240ThinSpace;\u600ar;\uc000\ud835\udd19pf;\uc000\ud835\udd4dcr;\uc000\ud835\udcb1dash;\u62aa\u0280cefos\u14a7\u14ac\u14b1\u14b6\u14bcirc;\u4174dge;\u62c0r;\uc000\ud835\udd1apf;\uc000\ud835\udd4ecr;\uc000\ud835\udcb2\u0200fios\u14cb\u14d0\u14d2\u14d8r;\uc000\ud835\udd1b;\u439epf;\uc000\ud835\udd4fcr;\uc000\ud835\udcb3\u0480AIUacfosu\u14f1\u14f5\u14f9\u14fd\u1504\u150f\u1514\u151a\u1520cy;\u442fcy;\u4407cy;\u442ecute\u803b\xdd\u40dd\u0100iy\u1509\u150drc;\u4176;\u442br;\uc000\ud835\udd1cpf;\uc000\ud835\udd50cr;\uc000\ud835\udcb4ml;\u4178\u0400Hacdefos\u1535\u1539\u153f\u154b\u154f\u155d\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417d;\u4417ot;\u417b\u01f2\u1554\0\u155boWidt\xe8\u0ad9a;\u4396r;\u6128pf;\u6124cr;\uc000\ud835\udcb5\u0be1\u1583\u158a\u1590\0\u15b0\u15b6\u15bf\0\0\0\0\u15c6\u15db\u15eb\u165f\u166d\0\u1695\u169b\u16b2\u16b9\0\u16becute\u803b\xe1\u40e1reve;\u4103\u0300;Ediuy\u159c\u159d\u15a1\u15a3\u15a8\u15ad\u623e;\uc000\u223e\u0333;\u623frc\u803b\xe2\u40e2te\u80bb\xb4\u0306;\u4430lig\u803b\xe6\u40e6\u0100;r\xb2\u15ba;\uc000\ud835\udd1erave\u803b\xe0\u40e0\u0100ep\u15ca\u15d6\u0100fp\u15cf\u15d4sym;\u6135\xe8\u15d3ha;\u43b1\u0100ap\u15dfc\u0100cl\u15e4\u15e7r;\u4101g;\u6a3f\u0264\u15f0\0\0\u160a\u0280;adsv\u15fa\u15fb\u15ff\u1601\u1607\u6227nd;\u6a55;\u6a5clope;\u6a58;\u6a5a\u0380;elmrsz\u1618\u1619\u161b\u161e\u163f\u164f\u1659\u6220;\u69a4e\xbb\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163a\u163c\u163e;\u69a8;\u69a9;\u69aa;\u69ab;\u69ac;\u69ad;\u69ae;\u69aft\u0100;v\u1645\u1646\u621fb\u0100;d\u164c\u164d\u62be;\u699d\u0100pt\u1654\u1657h;\u6222\xbb\xb9arr;\u637c\u0100gp\u1663\u1667on;\u4105f;\uc000\ud835\udd52\u0380;Eaeiop\u12c1\u167b\u167d\u1682\u1684\u1687\u168a;\u6a70cir;\u6a6f;\u624ad;\u624bs;\u4027rox\u0100;e\u12c1\u1692\xf1\u1683ing\u803b\xe5\u40e5\u0180cty\u16a1\u16a6\u16a8r;\uc000\ud835\udcb6;\u402amp\u0100;e\u12c1\u16af\xf1\u0288ilde\u803b\xe3\u40e3ml\u803b\xe4\u40e4\u0100ci\u16c2\u16c8onin\xf4\u0272nt;\u6a11\u0800Nabcdefiklnoprsu\u16ed\u16f1\u1730\u173c\u1743\u1748\u1778\u177d\u17e0\u17e6\u1839\u1850\u170d\u193d\u1948\u1970ot;\u6aed\u0100cr\u16f6\u171ek\u0200ceps\u1700\u1705\u170d\u1713ong;\u624cpsilon;\u43f6rime;\u6035im\u0100;e\u171a\u171b\u623dq;\u62cd\u0176\u1722\u1726ee;\u62bded\u0100;g\u172c\u172d\u6305e\xbb\u172drk\u0100;t\u135c\u1737brk;\u63b6\u0100oy\u1701\u1741;\u4431quo;\u601e\u0280cmprt\u1753\u175b\u1761\u1764\u1768aus\u0100;e\u010a\u0109ptyv;\u69b0s\xe9\u170cno\xf5\u0113\u0180ahw\u176f\u1771\u1773;\u43b2;\u6136een;\u626cr;\uc000\ud835\udd1fg\u0380costuvw\u178d\u179d\u17b3\u17c1\u17d5\u17db\u17de\u0180aiu\u1794\u1796\u179a\xf0\u0760rc;\u65efp\xbb\u1371\u0180dpt\u17a4\u17a8\u17adot;\u6a00lus;\u6a01imes;\u6a02\u0271\u17b9\0\0\u17becup;\u6a06ar;\u6605riangle\u0100du\u17cd\u17d2own;\u65bdp;\u65b3plus;\u6a04e\xe5\u1444\xe5\u14adarow;\u690d\u0180ako\u17ed\u1826\u1835\u0100cn\u17f2\u1823k\u0180lst\u17fa\u05ab\u1802ozenge;\u69ebriangle\u0200;dlr\u1812\u1813\u1818\u181d\u65b4own;\u65beeft;\u65c2ight;\u65b8k;\u6423\u01b1\u182b\0\u1833\u01b2\u182f\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183e\u184d\u0100;q\u1843\u1846\uc000=\u20e5uiv;\uc000\u2261\u20e5t;\u6310\u0200ptwx\u1859\u185e\u1867\u186cf;\uc000\ud835\udd53\u0100;t\u13cb\u1863om\xbb\u13cctie;\u62c8\u0600DHUVbdhmptuv\u1885\u1896\u18aa\u18bb\u18d7\u18db\u18ec\u18ff\u1905\u190a\u1910\u1921\u0200LRlr\u188e\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18a1\u18a2\u18a4\u18a6\u18a8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18b3\u18b5\u18b7\u18b9;\u655d;\u655a;\u655c;\u6559\u0380;HLRhlr\u18ca\u18cb\u18cd\u18cf\u18d1\u18d3\u18d5\u6551;\u656c;\u6563;\u6560;\u656b;\u6562;\u655fox;\u69c9\u0200LRlr\u18e4\u18e6\u18e8\u18ea;\u6555;\u6552;\u6510;\u650c\u0280;DUdu\u06bd\u18f7\u18f9\u18fb\u18fd;\u6565;\u6568;\u652c;\u6534inus;\u629flus;\u629eimes;\u62a0\u0200LRlr\u1919\u191b\u191d\u191f;\u655b;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193b\u6502;\u656a;\u6561;\u655e;\u653c;\u6524;\u651c\u0100ev\u0123\u1942bar\u803b\xa6\u40a6\u0200ceio\u1951\u1956\u195a\u1960r;\uc000\ud835\udcb7mi;\u604fm\u0100;e\u171a\u171cl\u0180;bh\u1968\u1969\u196b\u405c;\u69c5sub;\u67c8\u016c\u1974\u197el\u0100;e\u1979\u197a\u6022t\xbb\u197ap\u0180;Ee\u012f\u1985\u1987;\u6aae\u0100;q\u06dc\u06db\u0ce1\u19a7\0\u19e8\u1a11\u1a15\u1a32\0\u1a37\u1a50\0\0\u1ab4\0\0\u1ac1\0\0\u1b21\u1b2e\u1b4d\u1b52\0\u1bfd\0\u1c0c\u0180cpr\u19ad\u19b2\u19ddute;\u4107\u0300;abcds\u19bf\u19c0\u19c4\u19ca\u19d5\u19d9\u6229nd;\u6a44rcup;\u6a49\u0100au\u19cf\u19d2p;\u6a4bp;\u6a47ot;\u6a40;\uc000\u2229\ufe00\u0100eo\u19e2\u19e5t;\u6041\xee\u0693\u0200aeiu\u19f0\u19fb\u1a01\u1a05\u01f0\u19f5\0\u19f8s;\u6a4don;\u410ddil\u803b\xe7\u40e7rc;\u4109ps\u0100;s\u1a0c\u1a0d\u6a4cm;\u6a50ot;\u410b\u0180dmn\u1a1b\u1a20\u1a26il\u80bb\xb8\u01adptyv;\u69b2t\u8100\xa2;e\u1a2d\u1a2e\u40a2r\xe4\u01b2r;\uc000\ud835\udd20\u0180cei\u1a3d\u1a40\u1a4dy;\u4447ck\u0100;m\u1a47\u1a48\u6713ark\xbb\u1a48;\u43c7r\u0380;Ecefms\u1a5f\u1a60\u1a62\u1a6b\u1aa4\u1aaa\u1aae\u65cb;\u69c3\u0180;el\u1a69\u1a6a\u1a6d\u42c6q;\u6257e\u0261\u1a74\0\0\u1a88rrow\u0100lr\u1a7c\u1a81eft;\u61baight;\u61bb\u0280RSacd\u1a92\u1a94\u1a96\u1a9a\u1a9f\xbb\u0f47;\u64c8st;\u629birc;\u629aash;\u629dnint;\u6a10id;\u6aefcir;\u69c2ubs\u0100;u\u1abb\u1abc\u6663it\xbb\u1abc\u02ec\u1ac7\u1ad4\u1afa\0\u1b0aon\u0100;e\u1acd\u1ace\u403a\u0100;q\xc7\xc6\u026d\u1ad9\0\0\u1ae2a\u0100;t\u1ade\u1adf\u402c;\u4040\u0180;fl\u1ae8\u1ae9\u1aeb\u6201\xee\u1160e\u0100mx\u1af1\u1af6ent\xbb\u1ae9e\xf3\u024d\u01e7\u1afe\0\u1b07\u0100;d\u12bb\u1b02ot;\u6a6dn\xf4\u0246\u0180fry\u1b10\u1b14\u1b17;\uc000\ud835\udd54o\xe4\u0254\u8100\xa9;s\u0155\u1b1dr;\u6117\u0100ao\u1b25\u1b29rr;\u61b5ss;\u6717\u0100cu\u1b32\u1b37r;\uc000\ud835\udcb8\u0100bp\u1b3c\u1b44\u0100;e\u1b41\u1b42\u6acf;\u6ad1\u0100;e\u1b49\u1b4a\u6ad0;\u6ad2dot;\u62ef\u0380delprvw\u1b60\u1b6c\u1b77\u1b82\u1bac\u1bd4\u1bf9arr\u0100lr\u1b68\u1b6a;\u6938;\u6935\u0270\u1b72\0\0\u1b75r;\u62dec;\u62dfarr\u0100;p\u1b7f\u1b80\u61b6;\u693d\u0300;bcdos\u1b8f\u1b90\u1b96\u1ba1\u1ba5\u1ba8\u622arcap;\u6a48\u0100au\u1b9b\u1b9ep;\u6a46p;\u6a4aot;\u628dr;\u6a45;\uc000\u222a\ufe00\u0200alrv\u1bb5\u1bbf\u1bde\u1be3rr\u0100;m\u1bbc\u1bbd\u61b7;\u693cy\u0180evw\u1bc7\u1bd4\u1bd8q\u0270\u1bce\0\0\u1bd2re\xe3\u1b73u\xe3\u1b75ee;\u62ceedge;\u62cfen\u803b\xa4\u40a4earrow\u0100lr\u1bee\u1bf3eft\xbb\u1b80ight\xbb\u1bbde\xe4\u1bdd\u0100ci\u1c01\u1c07onin\xf4\u01f7nt;\u6231lcty;\u632d\u0980AHabcdefhijlorstuwz\u1c38\u1c3b\u1c3f\u1c5d\u1c69\u1c75\u1c8a\u1c9e\u1cac\u1cb7\u1cfb\u1cff\u1d0d\u1d7b\u1d91\u1dab\u1dbb\u1dc6\u1dcdr\xf2\u0381ar;\u6965\u0200glrs\u1c48\u1c4d\u1c52\u1c54ger;\u6020eth;\u6138\xf2\u1133h\u0100;v\u1c5a\u1c5b\u6010\xbb\u090a\u016b\u1c61\u1c67arow;\u690fa\xe3\u0315\u0100ay\u1c6e\u1c73ron;\u410f;\u4434\u0180;ao\u0332\u1c7c\u1c84\u0100gr\u02bf\u1c81r;\u61catseq;\u6a77\u0180glm\u1c91\u1c94\u1c98\u803b\xb0\u40b0ta;\u43b4ptyv;\u69b1\u0100ir\u1ca3\u1ca8sht;\u697f;\uc000\ud835\udd21ar\u0100lr\u1cb3\u1cb5\xbb\u08dc\xbb\u101e\u0280aegsv\u1cc2\u0378\u1cd6\u1cdc\u1ce0m\u0180;os\u0326\u1cca\u1cd4nd\u0100;s\u0326\u1cd1uit;\u6666amma;\u43ddin;\u62f2\u0180;io\u1ce7\u1ce8\u1cf8\u40f7de\u8100\xf7;o\u1ce7\u1cf0ntimes;\u62c7n\xf8\u1cf7cy;\u4452c\u026f\u1d06\0\0\u1d0arn;\u631eop;\u630d\u0280lptuw\u1d18\u1d1d\u1d22\u1d49\u1d55lar;\u4024f;\uc000\ud835\udd55\u0280;emps\u030b\u1d2d\u1d37\u1d3d\u1d42q\u0100;d\u0352\u1d33ot;\u6251inus;\u6238lus;\u6214quare;\u62a1blebarwedg\xe5\xfan\u0180adh\u112e\u1d5d\u1d67ownarrow\xf3\u1c83arpoon\u0100lr\u1d72\u1d76ef\xf4\u1cb4igh\xf4\u1cb6\u0162\u1d7f\u1d85karo\xf7\u0f42\u026f\u1d8a\0\0\u1d8ern;\u631fop;\u630c\u0180cot\u1d98\u1da3\u1da6\u0100ry\u1d9d\u1da1;\uc000\ud835\udcb9;\u4455l;\u69f6rok;\u4111\u0100dr\u1db0\u1db4ot;\u62f1i\u0100;f\u1dba\u1816\u65bf\u0100ah\u1dc0\u1dc3r\xf2\u0429a\xf2\u0fa6angle;\u69a6\u0100ci\u1dd2\u1dd5y;\u445fgrarr;\u67ff\u0900Dacdefglmnopqrstux\u1e01\u1e09\u1e19\u1e38\u0578\u1e3c\u1e49\u1e61\u1e7e\u1ea5\u1eaf\u1ebd\u1ee1\u1f2a\u1f37\u1f44\u1f4e\u1f5a\u0100Do\u1e06\u1d34o\xf4\u1c89\u0100cs\u1e0e\u1e14ute\u803b\xe9\u40e9ter;\u6a6e\u0200aioy\u1e22\u1e27\u1e31\u1e36ron;\u411br\u0100;c\u1e2d\u1e2e\u6256\u803b\xea\u40ealon;\u6255;\u444dot;\u4117\u0100Dr\u1e41\u1e45ot;\u6252;\uc000\ud835\udd22\u0180;rs\u1e50\u1e51\u1e57\u6a9aave\u803b\xe8\u40e8\u0100;d\u1e5c\u1e5d\u6a96ot;\u6a98\u0200;ils\u1e6a\u1e6b\u1e72\u1e74\u6a99nters;\u63e7;\u6113\u0100;d\u1e79\u1e7a\u6a95ot;\u6a97\u0180aps\u1e85\u1e89\u1e97cr;\u4113ty\u0180;sv\u1e92\u1e93\u1e95\u6205et\xbb\u1e93p\u01001;\u1e9d\u1ea4\u0133\u1ea1\u1ea3;\u6004;\u6005\u6003\u0100gs\u1eaa\u1eac;\u414bp;\u6002\u0100gp\u1eb4\u1eb8on;\u4119f;\uc000\ud835\udd56\u0180als\u1ec4\u1ece\u1ed2r\u0100;s\u1eca\u1ecb\u62d5l;\u69e3us;\u6a71i\u0180;lv\u1eda\u1edb\u1edf\u43b5on\xbb\u1edb;\u43f5\u0200csuv\u1eea\u1ef3\u1f0b\u1f23\u0100io\u1eef\u1e31rc\xbb\u1e2e\u0269\u1ef9\0\0\u1efb\xed\u0548ant\u0100gl\u1f02\u1f06tr\xbb\u1e5dess\xbb\u1e7a\u0180aei\u1f12\u1f16\u1f1als;\u403dst;\u625fv\u0100;D\u0235\u1f20D;\u6a78parsl;\u69e5\u0100Da\u1f2f\u1f33ot;\u6253rr;\u6971\u0180cdi\u1f3e\u1f41\u1ef8r;\u612fo\xf4\u0352\u0100ah\u1f49\u1f4b;\u43b7\u803b\xf0\u40f0\u0100mr\u1f53\u1f57l\u803b\xeb\u40ebo;\u60ac\u0180cip\u1f61\u1f64\u1f67l;\u4021s\xf4\u056e\u0100eo\u1f6c\u1f74ctatio\xee\u0559nential\xe5\u0579\u09e1\u1f92\0\u1f9e\0\u1fa1\u1fa7\0\0\u1fc6\u1fcc\0\u1fd3\0\u1fe6\u1fea\u2000\0\u2008\u205allingdotse\xf1\u1e44y;\u4444male;\u6640\u0180ilr\u1fad\u1fb3\u1fc1lig;\u8000\ufb03\u0269\u1fb9\0\0\u1fbdg;\u8000\ufb00ig;\u8000\ufb04;\uc000\ud835\udd23lig;\u8000\ufb01lig;\uc000fj\u0180alt\u1fd9\u1fdc\u1fe1t;\u666dig;\u8000\ufb02ns;\u65b1of;\u4192\u01f0\u1fee\0\u1ff3f;\uc000\ud835\udd57\u0100ak\u05bf\u1ff7\u0100;v\u1ffc\u1ffd\u62d4;\u6ad9artint;\u6a0d\u0100ao\u200c\u2055\u0100cs\u2011\u2052\u03b1\u201a\u2030\u2038\u2045\u2048\0\u2050\u03b2\u2022\u2025\u2027\u202a\u202c\0\u202e\u803b\xbd\u40bd;\u6153\u803b\xbc\u40bc;\u6155;\u6159;\u615b\u01b3\u2034\0\u2036;\u6154;\u6156\u02b4\u203e\u2041\0\0\u2043\u803b\xbe\u40be;\u6157;\u615c5;\u6158\u01b6\u204c\0\u204e;\u615a;\u615d8;\u615el;\u6044wn;\u6322cr;\uc000\ud835\udcbb\u0880Eabcdefgijlnorstv\u2082\u2089\u209f\u20a5\u20b0\u20b4\u20f0\u20f5\u20fa\u20ff\u2103\u2112\u2138\u0317\u213e\u2152\u219e\u0100;l\u064d\u2087;\u6a8c\u0180cmp\u2090\u2095\u209dute;\u41f5ma\u0100;d\u209c\u1cda\u43b3;\u6a86reve;\u411f\u0100iy\u20aa\u20aerc;\u411d;\u4433ot;\u4121\u0200;lqs\u063e\u0642\u20bd\u20c9\u0180;qs\u063e\u064c\u20c4lan\xf4\u0665\u0200;cdl\u0665\u20d2\u20d5\u20e5c;\u6aa9ot\u0100;o\u20dc\u20dd\u6a80\u0100;l\u20e2\u20e3\u6a82;\u6a84\u0100;e\u20ea\u20ed\uc000\u22db\ufe00s;\u6a94r;\uc000\ud835\udd24\u0100;g\u0673\u061bmel;\u6137cy;\u4453\u0200;Eaj\u065a\u210c\u210e\u2110;\u6a92;\u6aa5;\u6aa4\u0200Eaes\u211b\u211d\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6a8arox\xbb\u2124\u0100;q\u212e\u212f\u6a88\u0100;q\u212e\u211bim;\u62e7pf;\uc000\ud835\udd58\u0100ci\u2143\u2146r;\u610am\u0180;el\u066b\u214e\u2150;\u6a8e;\u6a90\u8300>;cdlqr\u05ee\u2160\u216a\u216e\u2173\u2179\u0100ci\u2165\u2167;\u6aa7r;\u6a7aot;\u62d7Par;\u6995uest;\u6a7c\u0280adels\u2184\u216a\u2190\u0656\u219b\u01f0\u2189\0\u218epro\xf8\u209er;\u6978q\u0100lq\u063f\u2196les\xf3\u2088i\xed\u066b\u0100en\u21a3\u21adrtneqq;\uc000\u2269\ufe00\xc5\u21aa\u0500Aabcefkosy\u21c4\u21c7\u21f1\u21f5\u21fa\u2218\u221d\u222f\u2268\u227dr\xf2\u03a0\u0200ilmr\u21d0\u21d4\u21d7\u21dbrs\xf0\u1484f\xbb\u2024il\xf4\u06a9\u0100dr\u21e0\u21e4cy;\u444a\u0180;cw\u08f4\u21eb\u21efir;\u6948;\u61adar;\u610firc;\u4125\u0180alr\u2201\u220e\u2213rts\u0100;u\u2209\u220a\u6665it\xbb\u220alip;\u6026con;\u62b9r;\uc000\ud835\udd25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223a\u223e\u2243\u225e\u2263rr;\u61fftht;\u623bk\u0100lr\u2249\u2253eftarrow;\u61a9ightarrow;\u61aaf;\uc000\ud835\udd59bar;\u6015\u0180clt\u226f\u2274\u2278r;\uc000\ud835\udcbdas\xe8\u21f4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xbb\u1c5b\u0ae1\u22a3\0\u22aa\0\u22b8\u22c5\u22ce\0\u22d5\u22f3\0\0\u22f8\u2322\u2367\u2362\u237f\0\u2386\u23aa\u23b4cute\u803b\xed\u40ed\u0180;iy\u0771\u22b0\u22b5rc\u803b\xee\u40ee;\u4438\u0100cx\u22bc\u22bfy;\u4435cl\u803b\xa1\u40a1\u0100fr\u039f\u22c9;\uc000\ud835\udd26rave\u803b\xec\u40ec\u0200;ino\u073e\u22dd\u22e9\u22ee\u0100in\u22e2\u22e6nt;\u6a0ct;\u622dfin;\u69dcta;\u6129lig;\u4133\u0180aop\u22fe\u231a\u231d\u0180cgt\u2305\u2308\u2317r;\u412b\u0180elp\u071f\u230f\u2313in\xe5\u078ear\xf4\u0720h;\u4131f;\u62b7ed;\u41b5\u0280;cfot\u04f4\u232c\u2331\u233d\u2341are;\u6105in\u0100;t\u2338\u2339\u621eie;\u69dddo\xf4\u2319\u0280;celp\u0757\u234c\u2350\u235b\u2361al;\u62ba\u0100gr\u2355\u2359er\xf3\u1563\xe3\u234darhk;\u6a17rod;\u6a3c\u0200cgpt\u236f\u2372\u2376\u237by;\u4451on;\u412ff;\uc000\ud835\udd5aa;\u43b9uest\u803b\xbf\u40bf\u0100ci\u238a\u238fr;\uc000\ud835\udcben\u0280;Edsv\u04f4\u239b\u239d\u23a1\u04f3;\u62f9ot;\u62f5\u0100;v\u23a6\u23a7\u62f4;\u62f3\u0100;i\u0777\u23aelde;\u4129\u01eb\u23b8\0\u23bccy;\u4456l\u803b\xef\u40ef\u0300cfmosu\u23cc\u23d7\u23dc\u23e1\u23e7\u23f5\u0100iy\u23d1\u23d5rc;\u4135;\u4439r;\uc000\ud835\udd27ath;\u4237pf;\uc000\ud835\udd5b\u01e3\u23ec\0\u23f1r;\uc000\ud835\udcbfrcy;\u4458kcy;\u4454\u0400acfghjos\u240b\u2416\u2422\u2427\u242d\u2431\u2435\u243bppa\u0100;v\u2413\u2414\u43ba;\u43f0\u0100ey\u241b\u2420dil;\u4137;\u443ar;\uc000\ud835\udd28reen;\u4138cy;\u4445cy;\u445cpf;\uc000\ud835\udd5ccr;\uc000\ud835\udcc0\u0b80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248d\u2491\u250e\u253d\u255a\u2580\u264e\u265e\u2665\u2679\u267d\u269a\u26b2\u26d8\u275d\u2768\u278b\u27c0\u2801\u2812\u0180art\u2477\u247a\u247cr\xf2\u09c6\xf2\u0395ail;\u691barr;\u690e\u0100;g\u0994\u248b;\u6a8bar;\u6962\u0963\u24a5\0\u24aa\0\u24b1\0\0\0\0\0\u24b5\u24ba\0\u24c6\u24c8\u24cd\0\u24f9ute;\u413amptyv;\u69b4ra\xee\u084cbda;\u43bbg\u0180;dl\u088e\u24c1\u24c3;\u6991\xe5\u088e;\u6a85uo\u803b\xab\u40abr\u0400;bfhlpst\u0899\u24de\u24e6\u24e9\u24eb\u24ee\u24f1\u24f5\u0100;f\u089d\u24e3s;\u691fs;\u691d\xeb\u2252p;\u61abl;\u6939im;\u6973l;\u61a2\u0180;ae\u24ff\u2500\u2504\u6aabil;\u6919\u0100;s\u2509\u250a\u6aad;\uc000\u2aad\ufe00\u0180abr\u2515\u2519\u251drr;\u690crk;\u6772\u0100ak\u2522\u252cc\u0100ek\u2528\u252a;\u407b;\u405b\u0100es\u2531\u2533;\u698bl\u0100du\u2539\u253b;\u698f;\u698d\u0200aeuy\u2546\u254b\u2556\u2558ron;\u413e\u0100di\u2550\u2554il;\u413c\xec\u08b0\xe2\u2529;\u443b\u0200cqrs\u2563\u2566\u256d\u257da;\u6936uo\u0100;r\u0e19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694bh;\u61b2\u0280;fgqs\u258b\u258c\u0989\u25f3\u25ff\u6264t\u0280ahlrt\u2598\u25a4\u25b7\u25c2\u25e8rrow\u0100;t\u0899\u25a1a\xe9\u24f6arpoon\u0100du\u25af\u25b4own\xbb\u045ap\xbb\u0966eftarrows;\u61c7ight\u0180ahs\u25cd\u25d6\u25derrow\u0100;s\u08f4\u08a7arpoon\xf3\u0f98quigarro\xf7\u21f0hreetimes;\u62cb\u0180;qs\u258b\u0993\u25falan\xf4\u09ac\u0280;cdgs\u09ac\u260a\u260d\u261d\u2628c;\u6aa8ot\u0100;o\u2614\u2615\u6a7f\u0100;r\u261a\u261b\u6a81;\u6a83\u0100;e\u2622\u2625\uc000\u22da\ufe00s;\u6a93\u0280adegs\u2633\u2639\u263d\u2649\u264bppro\xf8\u24c6ot;\u62d6q\u0100gq\u2643\u2645\xf4\u0989gt\xf2\u248c\xf4\u099bi\xed\u09b2\u0180ilr\u2655\u08e1\u265asht;\u697c;\uc000\ud835\udd29\u0100;E\u099c\u2663;\u6a91\u0161\u2669\u2676r\u0100du\u25b2\u266e\u0100;l\u0965\u2673;\u696alk;\u6584cy;\u4459\u0280;acht\u0a48\u2688\u268b\u2691\u2696r\xf2\u25c1orne\xf2\u1d08ard;\u696bri;\u65fa\u0100io\u269f\u26a4dot;\u4140ust\u0100;a\u26ac\u26ad\u63b0che\xbb\u26ad\u0200Eaes\u26bb\u26bd\u26c9\u26d4;\u6268p\u0100;p\u26c3\u26c4\u6a89rox\xbb\u26c4\u0100;q\u26ce\u26cf\u6a87\u0100;q\u26ce\u26bbim;\u62e6\u0400abnoptwz\u26e9\u26f4\u26f7\u271a\u272f\u2741\u2747\u2750\u0100nr\u26ee\u26f1g;\u67ecr;\u61fdr\xeb\u08c1g\u0180lmr\u26ff\u270d\u2714eft\u0100ar\u09e6\u2707ight\xe1\u09f2apsto;\u67fcight\xe1\u09fdparrow\u0100lr\u2725\u2729ef\xf4\u24edight;\u61ac\u0180afl\u2736\u2739\u273dr;\u6985;\uc000\ud835\udd5dus;\u6a2dimes;\u6a34\u0161\u274b\u274fst;\u6217\xe1\u134e\u0180;ef\u2757\u2758\u1800\u65cange\xbb\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277c\u2785\u2787r\xf2\u08a8orne\xf2\u1d8car\u0100;d\u0f98\u2783;\u696d;\u600eri;\u62bf\u0300achiqt\u2798\u279d\u0a40\u27a2\u27ae\u27bbquo;\u6039r;\uc000\ud835\udcc1m\u0180;eg\u09b2\u27aa\u27ac;\u6a8d;\u6a8f\u0100bu\u252a\u27b3o\u0100;r\u0e1f\u27b9;\u601arok;\u4142\u8400<;cdhilqr\u082b\u27d2\u2639\u27dc\u27e0\u27e5\u27ea\u27f0\u0100ci\u27d7\u27d9;\u6aa6r;\u6a79re\xe5\u25f2mes;\u62c9arr;\u6976uest;\u6a7b\u0100Pi\u27f5\u27f9ar;\u6996\u0180;ef\u2800\u092d\u181b\u65c3r\u0100du\u2807\u280dshar;\u694ahar;\u6966\u0100en\u2817\u2821rtneqq;\uc000\u2268\ufe00\xc5\u281e\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288e\u2893\u28a0\u28a5\u28a8\u28da\u28e2\u28e4\u0a83\u28f3\u2902Dot;\u623a\u0200clpr\u284e\u2852\u2863\u287dr\u803b\xaf\u40af\u0100et\u2857\u2859;\u6642\u0100;e\u285e\u285f\u6720se\xbb\u285f\u0100;s\u103b\u2868to\u0200;dlu\u103b\u2873\u2877\u287bow\xee\u048cef\xf4\u090f\xf0\u13d1ker;\u65ae\u0100oy\u2887\u288cmma;\u6a29;\u443cash;\u6014asuredangle\xbb\u1626r;\uc000\ud835\udd2ao;\u6127\u0180cdn\u28af\u28b4\u28c9ro\u803b\xb5\u40b5\u0200;acd\u1464\u28bd\u28c0\u28c4s\xf4\u16a7ir;\u6af0ot\u80bb\xb7\u01b5us\u0180;bd\u28d2\u1903\u28d3\u6212\u0100;u\u1d3c\u28d8;\u6a2a\u0163\u28de\u28e1p;\u6adb\xf2\u2212\xf0\u0a81\u0100dp\u28e9\u28eeels;\u62a7f;\uc000\ud835\udd5e\u0100ct\u28f8\u28fdr;\uc000\ud835\udcc2pos\xbb\u159d\u0180;lm\u2909\u290a\u290d\u43bctimap;\u62b8\u0c00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297e\u2989\u2998\u29da\u29e9\u2a15\u2a1a\u2a58\u2a5d\u2a83\u2a95\u2aa4\u2aa8\u2b04\u2b07\u2b44\u2b7f\u2bae\u2c34\u2c67\u2c7c\u2ce9\u0100gt\u2947\u294b;\uc000\u22d9\u0338\u0100;v\u2950\u0bcf\uc000\u226b\u20d2\u0180elt\u295a\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61cdightarrow;\u61ce;\uc000\u22d8\u0338\u0100;v\u297b\u0c47\uc000\u226a\u20d2ightarrow;\u61cf\u0100Dd\u298e\u2993ash;\u62afash;\u62ae\u0280bcnpt\u29a3\u29a7\u29ac\u29b1\u29ccla\xbb\u02deute;\u4144g;\uc000\u2220\u20d2\u0280;Eiop\u0d84\u29bc\u29c0\u29c5\u29c8;\uc000\u2a70\u0338d;\uc000\u224b\u0338s;\u4149ro\xf8\u0d84ur\u0100;a\u29d3\u29d4\u666el\u0100;s\u29d3\u0b38\u01f3\u29df\0\u29e3p\u80bb\xa0\u0b37mp\u0100;e\u0bf9\u0c00\u0280aeouy\u29f4\u29fe\u2a03\u2a10\u2a13\u01f0\u29f9\0\u29fb;\u6a43on;\u4148dil;\u4146ng\u0100;d\u0d7e\u2a0aot;\uc000\u2a6d\u0338p;\u6a42;\u443dash;\u6013\u0380;Aadqsx\u0b92\u2a29\u2a2d\u2a3b\u2a41\u2a45\u2a50rr;\u61d7r\u0100hr\u2a33\u2a36k;\u6924\u0100;o\u13f2\u13f0ot;\uc000\u2250\u0338ui\xf6\u0b63\u0100ei\u2a4a\u2a4ear;\u6928\xed\u0b98ist\u0100;s\u0ba0\u0b9fr;\uc000\ud835\udd2b\u0200Eest\u0bc5\u2a66\u2a79\u2a7c\u0180;qs\u0bbc\u2a6d\u0be1\u0180;qs\u0bbc\u0bc5\u2a74lan\xf4\u0be2i\xed\u0bea\u0100;r\u0bb6\u2a81\xbb\u0bb7\u0180Aap\u2a8a\u2a8d\u2a91r\xf2\u2971rr;\u61aear;\u6af2\u0180;sv\u0f8d\u2a9c\u0f8c\u0100;d\u2aa1\u2aa2\u62fc;\u62facy;\u445a\u0380AEadest\u2ab7\u2aba\u2abe\u2ac2\u2ac5\u2af6\u2af9r\xf2\u2966;\uc000\u2266\u0338rr;\u619ar;\u6025\u0200;fqs\u0c3b\u2ace\u2ae3\u2aeft\u0100ar\u2ad4\u2ad9rro\xf7\u2ac1ightarro\xf7\u2a90\u0180;qs\u0c3b\u2aba\u2aealan\xf4\u0c55\u0100;s\u0c55\u2af4\xbb\u0c36i\xed\u0c5d\u0100;r\u0c35\u2afei\u0100;e\u0c1a\u0c25i\xe4\u0d90\u0100pt\u2b0c\u2b11f;\uc000\ud835\udd5f\u8180\xac;in\u2b19\u2b1a\u2b36\u40acn\u0200;Edv\u0b89\u2b24\u2b28\u2b2e;\uc000\u22f9\u0338ot;\uc000\u22f5\u0338\u01e1\u0b89\u2b33\u2b35;\u62f7;\u62f6i\u0100;v\u0cb8\u2b3c\u01e1\u0cb8\u2b41\u2b43;\u62fe;\u62fd\u0180aor\u2b4b\u2b63\u2b69r\u0200;ast\u0b7b\u2b55\u2b5a\u2b5flle\xec\u0b7bl;\uc000\u2afd\u20e5;\uc000\u2202\u0338lint;\u6a14\u0180;ce\u0c92\u2b70\u2b73u\xe5\u0ca5\u0100;c\u0c98\u2b78\u0100;e\u0c92\u2b7d\xf1\u0c98\u0200Aait\u2b88\u2b8b\u2b9d\u2ba7r\xf2\u2988rr\u0180;cw\u2b94\u2b95\u2b99\u619b;\uc000\u2933\u0338;\uc000\u219d\u0338ghtarrow\xbb\u2b95ri\u0100;e\u0ccb\u0cd6\u0380chimpqu\u2bbd\u2bcd\u2bd9\u2b04\u0b78\u2be4\u2bef\u0200;cer\u0d32\u2bc6\u0d37\u2bc9u\xe5\u0d45;\uc000\ud835\udcc3ort\u026d\u2b05\0\0\u2bd6ar\xe1\u2b56m\u0100;e\u0d6e\u2bdf\u0100;q\u0d74\u0d73su\u0100bp\u2beb\u2bed\xe5\u0cf8\xe5\u0d0b\u0180bcp\u2bf6\u2c11\u2c19\u0200;Ees\u2bff\u2c00\u0d22\u2c04\u6284;\uc000\u2ac5\u0338et\u0100;e\u0d1b\u2c0bq\u0100;q\u0d23\u2c00c\u0100;e\u0d32\u2c17\xf1\u0d38\u0200;Ees\u2c22\u2c23\u0d5f\u2c27\u6285;\uc000\u2ac6\u0338et\u0100;e\u0d58\u2c2eq\u0100;q\u0d60\u2c23\u0200gilr\u2c3d\u2c3f\u2c45\u2c47\xec\u0bd7lde\u803b\xf1\u40f1\xe7\u0c43iangle\u0100lr\u2c52\u2c5ceft\u0100;e\u0c1a\u2c5a\xf1\u0c26ight\u0100;e\u0ccb\u2c65\xf1\u0cd7\u0100;m\u2c6c\u2c6d\u43bd\u0180;es\u2c74\u2c75\u2c79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2c8f\u2c94\u2c99\u2c9e\u2ca3\u2cb0\u2cb6\u2cd3\u2ce3ash;\u62adarr;\u6904p;\uc000\u224d\u20d2ash;\u62ac\u0100et\u2ca8\u2cac;\uc000\u2265\u20d2;\uc000>\u20d2nfin;\u69de\u0180Aet\u2cbd\u2cc1\u2cc5rr;\u6902;\uc000\u2264\u20d2\u0100;r\u2cca\u2ccd\uc000<\u20d2ie;\uc000\u22b4\u20d2\u0100At\u2cd8\u2cdcrr;\u6903rie;\uc000\u22b5\u20d2im;\uc000\u223c\u20d2\u0180Aan\u2cf0\u2cf4\u2d02rr;\u61d6r\u0100hr\u2cfa\u2cfdk;\u6923\u0100;o\u13e7\u13e5ear;\u6927\u1253\u1a95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2d2d\0\u2d38\u2d48\u2d60\u2d65\u2d72\u2d84\u1b07\0\0\u2d8d\u2dab\0\u2dc8\u2dce\0\u2ddc\u2e19\u2e2b\u2e3e\u2e43\u0100cs\u2d31\u1a97ute\u803b\xf3\u40f3\u0100iy\u2d3c\u2d45r\u0100;c\u1a9e\u2d42\u803b\xf4\u40f4;\u443e\u0280abios\u1aa0\u2d52\u2d57\u01c8\u2d5alac;\u4151v;\u6a38old;\u69bclig;\u4153\u0100cr\u2d69\u2d6dir;\u69bf;\uc000\ud835\udd2c\u036f\u2d79\0\0\u2d7c\0\u2d82n;\u42dbave\u803b\xf2\u40f2;\u69c1\u0100bm\u2d88\u0df4ar;\u69b5\u0200acit\u2d95\u2d98\u2da5\u2da8r\xf2\u1a80\u0100ir\u2d9d\u2da0r;\u69beoss;\u69bbn\xe5\u0e52;\u69c0\u0180aei\u2db1\u2db5\u2db9cr;\u414dga;\u43c9\u0180cdn\u2dc0\u2dc5\u01cdron;\u43bf;\u69b6pf;\uc000\ud835\udd60\u0180ael\u2dd4\u2dd7\u01d2r;\u69b7rp;\u69b9\u0380;adiosv\u2dea\u2deb\u2dee\u2e08\u2e0d\u2e10\u2e16\u6228r\xf2\u1a86\u0200;efm\u2df7\u2df8\u2e02\u2e05\u6a5dr\u0100;o\u2dfe\u2dff\u6134f\xbb\u2dff\u803b\xaa\u40aa\u803b\xba\u40bagof;\u62b6r;\u6a56lope;\u6a57;\u6a5b\u0180clo\u2e1f\u2e21\u2e27\xf2\u2e01ash\u803b\xf8\u40f8l;\u6298i\u016c\u2e2f\u2e34de\u803b\xf5\u40f5es\u0100;a\u01db\u2e3as;\u6a36ml\u803b\xf6\u40f6bar;\u633d\u0ae1\u2e5e\0\u2e7d\0\u2e80\u2e9d\0\u2ea2\u2eb9\0\0\u2ecb\u0e9c\0\u2f13\0\0\u2f2b\u2fbc\0\u2fc8r\u0200;ast\u0403\u2e67\u2e72\u0e85\u8100\xb6;l\u2e6d\u2e6e\u40b6le\xec\u0403\u0269\u2e78\0\0\u2e7bm;\u6af3;\u6afdy;\u443fr\u0280cimpt\u2e8b\u2e8f\u2e93\u1865\u2e97nt;\u4025od;\u402eil;\u6030enk;\u6031r;\uc000\ud835\udd2d\u0180imo\u2ea8\u2eb0\u2eb4\u0100;v\u2ead\u2eae\u43c6;\u43d5ma\xf4\u0a76ne;\u660e\u0180;tv\u2ebf\u2ec0\u2ec8\u43c0chfork\xbb\u1ffd;\u43d6\u0100au\u2ecf\u2edfn\u0100ck\u2ed5\u2eddk\u0100;h\u21f4\u2edb;\u610e\xf6\u21f4s\u0480;abcdemst\u2ef3\u2ef4\u1908\u2ef9\u2efd\u2f04\u2f06\u2f0a\u2f0e\u402bcir;\u6a23ir;\u6a22\u0100ou\u1d40\u2f02;\u6a25;\u6a72n\u80bb\xb1\u0e9dim;\u6a26wo;\u6a27\u0180ipu\u2f19\u2f20\u2f25ntint;\u6a15f;\uc000\ud835\udd61nd\u803b\xa3\u40a3\u0500;Eaceinosu\u0ec8\u2f3f\u2f41\u2f44\u2f47\u2f81\u2f89\u2f92\u2f7e\u2fb6;\u6ab3p;\u6ab7u\xe5\u0ed9\u0100;c\u0ece\u2f4c\u0300;acens\u0ec8\u2f59\u2f5f\u2f66\u2f68\u2f7eppro\xf8\u2f43urlye\xf1\u0ed9\xf1\u0ece\u0180aes\u2f6f\u2f76\u2f7approx;\u6ab9qq;\u6ab5im;\u62e8i\xed\u0edfme\u0100;s\u2f88\u0eae\u6032\u0180Eas\u2f78\u2f90\u2f7a\xf0\u2f75\u0180dfp\u0eec\u2f99\u2faf\u0180als\u2fa0\u2fa5\u2faalar;\u632eine;\u6312urf;\u6313\u0100;t\u0efb\u2fb4\xef\u0efbrel;\u62b0\u0100ci\u2fc0\u2fc5r;\uc000\ud835\udcc5;\u43c8ncsp;\u6008\u0300fiopsu\u2fda\u22e2\u2fdf\u2fe5\u2feb\u2ff1r;\uc000\ud835\udd2epf;\uc000\ud835\udd62rime;\u6057cr;\uc000\ud835\udcc6\u0180aeo\u2ff8\u3009\u3013t\u0100ei\u2ffe\u3005rnion\xf3\u06b0nt;\u6a16st\u0100;e\u3010\u3011\u403f\xf1\u1f19\xf4\u0f14\u0a80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30e0\u310e\u312b\u3147\u3162\u3172\u318e\u3206\u3215\u3224\u3229\u3258\u326e\u3272\u3290\u32b0\u32b7\u0180art\u3047\u304a\u304cr\xf2\u10b3\xf2\u03ddail;\u691car\xf2\u1c65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307f\u308f\u3094\u30cc\u0100eu\u306d\u3071;\uc000\u223d\u0331te;\u4155i\xe3\u116emptyv;\u69b3g\u0200;del\u0fd1\u3089\u308b\u308d;\u6992;\u69a5\xe5\u0fd1uo\u803b\xbb\u40bbr\u0580;abcfhlpstw\u0fdc\u30ac\u30af\u30b7\u30b9\u30bc\u30be\u30c0\u30c3\u30c7\u30cap;\u6975\u0100;f\u0fe0\u30b4s;\u6920;\u6933s;\u691e\xeb\u225d\xf0\u272el;\u6945im;\u6974l;\u61a3;\u619d\u0100ai\u30d1\u30d5il;\u691ao\u0100;n\u30db\u30dc\u6236al\xf3\u0f1e\u0180abr\u30e7\u30ea\u30eer\xf2\u17e5rk;\u6773\u0100ak\u30f3\u30fdc\u0100ek\u30f9\u30fb;\u407d;\u405d\u0100es\u3102\u3104;\u698cl\u0100du\u310a\u310c;\u698e;\u6990\u0200aeuy\u3117\u311c\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xec\u0ff2\xe2\u30fa;\u4440\u0200clqs\u3134\u3137\u313d\u3144a;\u6937dhar;\u6969uo\u0100;r\u020e\u020dh;\u61b3\u0180acg\u314e\u315f\u0f44l\u0200;ips\u0f78\u3158\u315b\u109cn\xe5\u10bbar\xf4\u0fa9t;\u65ad\u0180ilr\u3169\u1023\u316esht;\u697d;\uc000\ud835\udd2f\u0100ao\u3177\u3186r\u0100du\u317d\u317f\xbb\u047b\u0100;l\u1091\u3184;\u696c\u0100;v\u318b\u318c\u43c1;\u43f1\u0180gns\u3195\u31f9\u31fcht\u0300ahlrst\u31a4\u31b0\u31c2\u31d8\u31e4\u31eerrow\u0100;t\u0fdc\u31ada\xe9\u30c8arpoon\u0100du\u31bb\u31bfow\xee\u317ep\xbb\u1092eft\u0100ah\u31ca\u31d0rrow\xf3\u0feaarpoon\xf3\u0551ightarrows;\u61c9quigarro\xf7\u30cbhreetimes;\u62ccg;\u42daingdotse\xf1\u1f32\u0180ahm\u320d\u3210\u3213r\xf2\u0feaa\xf2\u0551;\u600foust\u0100;a\u321e\u321f\u63b1che\xbb\u321fmid;\u6aee\u0200abpt\u3232\u323d\u3240\u3252\u0100nr\u3237\u323ag;\u67edr;\u61fer\xeb\u1003\u0180afl\u3247\u324a\u324er;\u6986;\uc000\ud835\udd63us;\u6a2eimes;\u6a35\u0100ap\u325d\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6a12ar\xf2\u31e3\u0200achq\u327b\u3280\u10bc\u3285quo;\u603ar;\uc000\ud835\udcc7\u0100bu\u30fb\u328ao\u0100;r\u0214\u0213\u0180hir\u3297\u329b\u32a0re\xe5\u31f8mes;\u62cai\u0200;efl\u32aa\u1059\u1821\u32ab\u65b9tri;\u69celuhar;\u6968;\u611e\u0d61\u32d5\u32db\u32df\u332c\u3338\u3371\0\u337a\u33a4\0\0\u33ec\u33f0\0\u3428\u3448\u345a\u34ad\u34b1\u34ca\u34f1\0\u3616\0\0\u3633cute;\u415bqu\xef\u27ba\u0500;Eaceinpsy\u11ed\u32f3\u32f5\u32ff\u3302\u330b\u330f\u331f\u3326\u3329;\u6ab4\u01f0\u32fa\0\u32fc;\u6ab8on;\u4161u\xe5\u11fe\u0100;d\u11f3\u3307il;\u415frc;\u415d\u0180Eas\u3316\u3318\u331b;\u6ab6p;\u6abaim;\u62e9olint;\u6a13i\xed\u1204;\u4441ot\u0180;be\u3334\u1d47\u3335\u62c5;\u6a66\u0380Aacmstx\u3346\u334a\u3357\u335b\u335e\u3363\u336drr;\u61d8r\u0100hr\u3350\u3352\xeb\u2228\u0100;o\u0a36\u0a34t\u803b\xa7\u40a7i;\u403bwar;\u6929m\u0100in\u3369\xf0nu\xf3\xf1t;\u6736r\u0100;o\u3376\u2055\uc000\ud835\udd30\u0200acoy\u3382\u3386\u3391\u33a0rp;\u666f\u0100hy\u338b\u338fcy;\u4449;\u4448rt\u026d\u3399\0\0\u339ci\xe4\u1464ara\xec\u2e6f\u803b\xad\u40ad\u0100gm\u33a8\u33b4ma\u0180;fv\u33b1\u33b2\u33b2\u43c3;\u43c2\u0400;deglnpr\u12ab\u33c5\u33c9\u33ce\u33d6\u33de\u33e1\u33e6ot;\u6a6a\u0100;q\u12b1\u12b0\u0100;E\u33d3\u33d4\u6a9e;\u6aa0\u0100;E\u33db\u33dc\u6a9d;\u6a9fe;\u6246lus;\u6a24arr;\u6972ar\xf2\u113d\u0200aeit\u33f8\u3408\u340f\u3417\u0100ls\u33fd\u3404lsetm\xe9\u336ahp;\u6a33parsl;\u69e4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341c\u341d\u6aaa\u0100;s\u3422\u3423\u6aac;\uc000\u2aac\ufe00\u0180flp\u342e\u3433\u3442tcy;\u444c\u0100;b\u3438\u3439\u402f\u0100;a\u343e\u343f\u69c4r;\u633ff;\uc000\ud835\udd64a\u0100dr\u344d\u0402es\u0100;u\u3454\u3455\u6660it\xbb\u3455\u0180csu\u3460\u3479\u349f\u0100au\u3465\u346fp\u0100;s\u1188\u346b;\uc000\u2293\ufe00p\u0100;s\u11b4\u3475;\uc000\u2294\ufe00u\u0100bp\u347f\u348f\u0180;es\u1197\u119c\u3486et\u0100;e\u1197\u348d\xf1\u119d\u0180;es\u11a8\u11ad\u3496et\u0100;e\u11a8\u349d\xf1\u11ae\u0180;af\u117b\u34a6\u05b0r\u0165\u34ab\u05b1\xbb\u117car\xf2\u1148\u0200cemt\u34b9\u34be\u34c2\u34c5r;\uc000\ud835\udcc8tm\xee\xf1i\xec\u3415ar\xe6\u11be\u0100ar\u34ce\u34d5r\u0100;f\u34d4\u17bf\u6606\u0100an\u34da\u34edight\u0100ep\u34e3\u34eapsilo\xee\u1ee0h\xe9\u2eafs\xbb\u2852\u0280bcmnp\u34fb\u355e\u1209\u358b\u358e\u0480;Edemnprs\u350e\u350f\u3511\u3515\u351e\u3523\u352c\u3531\u3536\u6282;\u6ac5ot;\u6abd\u0100;d\u11da\u351aot;\u6ac3ult;\u6ac1\u0100Ee\u3528\u352a;\u6acb;\u628alus;\u6abfarr;\u6979\u0180eiu\u353d\u3552\u3555t\u0180;en\u350e\u3545\u354bq\u0100;q\u11da\u350feq\u0100;q\u352b\u3528m;\u6ac7\u0100bp\u355a\u355c;\u6ad5;\u6ad3c\u0300;acens\u11ed\u356c\u3572\u3579\u357b\u3326ppro\xf8\u32faurlye\xf1\u11fe\xf1\u11f3\u0180aes\u3582\u3588\u331bppro\xf8\u331aq\xf1\u3317g;\u666a\u0680123;Edehlmnps\u35a9\u35ac\u35af\u121c\u35b2\u35b4\u35c0\u35c9\u35d5\u35da\u35df\u35e8\u35ed\u803b\xb9\u40b9\u803b\xb2\u40b2\u803b\xb3\u40b3;\u6ac6\u0100os\u35b9\u35bct;\u6abeub;\u6ad8\u0100;d\u1222\u35c5ot;\u6ac4s\u0100ou\u35cf\u35d2l;\u67c9b;\u6ad7arr;\u697bult;\u6ac2\u0100Ee\u35e4\u35e6;\u6acc;\u628blus;\u6ac0\u0180eiu\u35f4\u3609\u360ct\u0180;en\u121c\u35fc\u3602q\u0100;q\u1222\u35b2eq\u0100;q\u35e7\u35e4m;\u6ac8\u0100bp\u3611\u3613;\u6ad4;\u6ad6\u0180Aan\u361c\u3620\u362drr;\u61d9r\u0100hr\u3626\u3628\xeb\u222e\u0100;o\u0a2b\u0a29war;\u692alig\u803b\xdf\u40df\u0be1\u3651\u365d\u3660\u12ce\u3673\u3679\0\u367e\u36c2\0\0\0\0\0\u36db\u3703\0\u3709\u376c\0\0\0\u3787\u0272\u3656\0\0\u365bget;\u6316;\u43c4r\xeb\u0e5f\u0180aey\u3666\u366b\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uc000\ud835\udd31\u0200eiko\u3686\u369d\u36b5\u36bc\u01f2\u368b\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369b\u43b8ym;\u43d1\u0100cn\u36a2\u36b2k\u0100as\u36a8\u36aeppro\xf8\u12c1im\xbb\u12acs\xf0\u129e\u0100as\u36ba\u36ae\xf0\u12c1rn\u803b\xfe\u40fe\u01ec\u031f\u36c6\u22e7es\u8180\xd7;bd\u36cf\u36d0\u36d8\u40d7\u0100;a\u190f\u36d5r;\u6a31;\u6a30\u0180eps\u36e1\u36e3\u3700\xe1\u2a4d\u0200;bcf\u0486\u36ec\u36f0\u36f4ot;\u6336ir;\u6af1\u0100;o\u36f9\u36fc\uc000\ud835\udd65rk;\u6ada\xe1\u3362rime;\u6034\u0180aip\u370f\u3712\u3764d\xe5\u1248\u0380adempst\u3721\u374d\u3740\u3751\u3757\u375c\u375fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65b5own\xbb\u1dbbeft\u0100;e\u2800\u373e\xf1\u092e;\u625cight\u0100;e\u32aa\u374b\xf1\u105aot;\u65ecinus;\u6a3alus;\u6a39b;\u69cdime;\u6a3bezium;\u63e2\u0180cht\u3772\u377d\u3781\u0100ry\u3777\u377b;\uc000\ud835\udcc9;\u4446cy;\u445brok;\u4167\u0100io\u378b\u378ex\xf4\u1777head\u0100lr\u3797\u37a0eftarro\xf7\u084fightarrow\xbb\u0f5d\u0900AHabcdfghlmoprstuw\u37d0\u37d3\u37d7\u37e4\u37f0\u37fc\u380e\u381c\u3823\u3834\u3851\u385d\u386b\u38a9\u38cc\u38d2\u38ea\u38f6r\xf2\u03edar;\u6963\u0100cr\u37dc\u37e2ute\u803b\xfa\u40fa\xf2\u1150r\u01e3\u37ea\0\u37edy;\u445eve;\u416d\u0100iy\u37f5\u37farc\u803b\xfb\u40fb;\u4443\u0180abh\u3803\u3806\u380br\xf2\u13adlac;\u4171a\xf2\u13c3\u0100ir\u3813\u3818sht;\u697e;\uc000\ud835\udd32rave\u803b\xf9\u40f9\u0161\u3827\u3831r\u0100lr\u382c\u382e\xbb\u0957\xbb\u1083lk;\u6580\u0100ct\u3839\u384d\u026f\u383f\0\0\u384arn\u0100;e\u3845\u3846\u631cr\xbb\u3846op;\u630fri;\u65f8\u0100al\u3856\u385acr;\u416b\u80bb\xa8\u0349\u0100gp\u3862\u3866on;\u4173f;\uc000\ud835\udd66\u0300adhlsu\u114b\u3878\u387d\u1372\u3891\u38a0own\xe1\u13b3arpoon\u0100lr\u3888\u388cef\xf4\u382digh\xf4\u382fi\u0180;hl\u3899\u389a\u389c\u43c5\xbb\u13faon\xbb\u389aparrows;\u61c8\u0180cit\u38b0\u38c4\u38c8\u026f\u38b6\0\0\u38c1rn\u0100;e\u38bc\u38bd\u631dr\xbb\u38bdop;\u630eng;\u416fri;\u65f9cr;\uc000\ud835\udcca\u0180dir\u38d9\u38dd\u38e2ot;\u62f0lde;\u4169i\u0100;f\u3730\u38e8\xbb\u1813\u0100am\u38ef\u38f2r\xf2\u38a8l\u803b\xfc\u40fcangle;\u69a7\u0780ABDacdeflnoprsz\u391c\u391f\u3929\u392d\u39b5\u39b8\u39bd\u39df\u39e4\u39e8\u39f3\u39f9\u39fd\u3a01\u3a20r\xf2\u03f7ar\u0100;v\u3926\u3927\u6ae8;\u6ae9as\xe8\u03e1\u0100nr\u3932\u3937grt;\u699c\u0380eknprst\u34e3\u3946\u394b\u3952\u395d\u3964\u3996app\xe1\u2415othin\xe7\u1e96\u0180hir\u34eb\u2ec8\u3959op\xf4\u2fb5\u0100;h\u13b7\u3962\xef\u318d\u0100iu\u3969\u396dgm\xe1\u33b3\u0100bp\u3972\u3984setneq\u0100;q\u397d\u3980\uc000\u228a\ufe00;\uc000\u2acb\ufe00setneq\u0100;q\u398f\u3992\uc000\u228b\ufe00;\uc000\u2acc\ufe00\u0100hr\u399b\u399fet\xe1\u369ciangle\u0100lr\u39aa\u39afeft\xbb\u0925ight\xbb\u1051y;\u4432ash\xbb\u1036\u0180elr\u39c4\u39d2\u39d7\u0180;be\u2dea\u39cb\u39cfar;\u62bbq;\u625alip;\u62ee\u0100bt\u39dc\u1468a\xf2\u1469r;\uc000\ud835\udd33tr\xe9\u39aesu\u0100bp\u39ef\u39f1\xbb\u0d1c\xbb\u0d59pf;\uc000\ud835\udd67ro\xf0\u0efbtr\xe9\u39b4\u0100cu\u3a06\u3a0br;\uc000\ud835\udccb\u0100bp\u3a10\u3a18n\u0100Ee\u3980\u3a16\xbb\u397en\u0100Ee\u3992\u3a1e\xbb\u3990igzag;\u699a\u0380cefoprs\u3a36\u3a3b\u3a56\u3a5b\u3a54\u3a61\u3a6airc;\u4175\u0100di\u3a40\u3a51\u0100bg\u3a45\u3a49ar;\u6a5fe\u0100;q\u15fa\u3a4f;\u6259erp;\u6118r;\uc000\ud835\udd34pf;\uc000\ud835\udd68\u0100;e\u1479\u3a66at\xe8\u1479cr;\uc000\ud835\udccc\u0ae3\u178e\u3a87\0\u3a8b\0\u3a90\u3a9b\0\0\u3a9d\u3aa8\u3aab\u3aaf\0\0\u3ac3\u3ace\0\u3ad8\u17dc\u17dftr\xe9\u17d1r;\uc000\ud835\udd35\u0100Aa\u3a94\u3a97r\xf2\u03c3r\xf2\u09f6;\u43be\u0100Aa\u3aa1\u3aa4r\xf2\u03b8r\xf2\u09eba\xf0\u2713is;\u62fb\u0180dpt\u17a4\u3ab5\u3abe\u0100fl\u3aba\u17a9;\uc000\ud835\udd69im\xe5\u17b2\u0100Aa\u3ac7\u3acar\xf2\u03cer\xf2\u0a01\u0100cq\u3ad2\u17b8r;\uc000\ud835\udccd\u0100pt\u17d6\u3adcr\xe9\u17d4\u0400acefiosu\u3af0\u3afd\u3b08\u3b0c\u3b11\u3b15\u3b1b\u3b21c\u0100uy\u3af6\u3afbte\u803b\xfd\u40fd;\u444f\u0100iy\u3b02\u3b06rc;\u4177;\u444bn\u803b\xa5\u40a5r;\uc000\ud835\udd36cy;\u4457pf;\uc000\ud835\udd6acr;\uc000\ud835\udcce\u0100cm\u3b26\u3b29y;\u444el\u803b\xff\u40ff\u0500acdefhiosw\u3b42\u3b48\u3b54\u3b58\u3b64\u3b69\u3b6d\u3b74\u3b7a\u3b80cute;\u417a\u0100ay\u3b4d\u3b52ron;\u417e;\u4437ot;\u417c\u0100et\u3b5d\u3b61tr\xe6\u155fa;\u43b6r;\uc000\ud835\udd37cy;\u4436grarr;\u61ddpf;\uc000\ud835\udd6bcr;\uc000\ud835\udccf\u0100jn\u3b85\u3b87;\u600dj;\u600c"
	    .split("")
	    .map(function (c) { return c.charCodeAt(0); }));
	
	return decodeDataHtml;
}

var decodeDataXml = {};

var hasRequiredDecodeDataXml;

function requireDecodeDataXml () {
	if (hasRequiredDecodeDataXml) return decodeDataXml;
	hasRequiredDecodeDataXml = 1;
	// Generated using scripts/write-decode-map.ts
	Object.defineProperty(decodeDataXml, "__esModule", { value: true });
	decodeDataXml.default = new Uint16Array(
	// prettier-ignore
	"\u0200aglq\t\x15\x18\x1b\u026d\x0f\0\0\x12p;\u4026os;\u4027t;\u403et;\u403cuot;\u4022"
	    .split("")
	    .map(function (c) { return c.charCodeAt(0); }));
	
	return decodeDataXml;
}

var decode_codepoint = {};

var hasRequiredDecode_codepoint;

function requireDecode_codepoint () {
	if (hasRequiredDecode_codepoint) return decode_codepoint;
	hasRequiredDecode_codepoint = 1;
	(function (exports) {
		// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
		var _a;
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.replaceCodePoint = exports.fromCodePoint = void 0;
		var decodeMap = new Map([
		    [0, 65533],
		    // C1 Unicode control character reference replacements
		    [128, 8364],
		    [130, 8218],
		    [131, 402],
		    [132, 8222],
		    [133, 8230],
		    [134, 8224],
		    [135, 8225],
		    [136, 710],
		    [137, 8240],
		    [138, 352],
		    [139, 8249],
		    [140, 338],
		    [142, 381],
		    [145, 8216],
		    [146, 8217],
		    [147, 8220],
		    [148, 8221],
		    [149, 8226],
		    [150, 8211],
		    [151, 8212],
		    [152, 732],
		    [153, 8482],
		    [154, 353],
		    [155, 8250],
		    [156, 339],
		    [158, 382],
		    [159, 376],
		]);
		/**
		 * Polyfill for `String.fromCodePoint`. It is used to create a string from a Unicode code point.
		 */
		exports.fromCodePoint = 
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
		(_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function (codePoint) {
		    var output = "";
		    if (codePoint > 0xffff) {
		        codePoint -= 0x10000;
		        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
		        codePoint = 0xdc00 | (codePoint & 0x3ff);
		    }
		    output += String.fromCharCode(codePoint);
		    return output;
		};
		/**
		 * Replace the given code point with a replacement character if it is a
		 * surrogate or is outside the valid range. Otherwise return the code
		 * point unchanged.
		 */
		function replaceCodePoint(codePoint) {
		    var _a;
		    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
		        return 0xfffd;
		    }
		    return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
		}
		exports.replaceCodePoint = replaceCodePoint;
		/**
		 * Replace the code point if relevant, then convert it to a string.
		 *
		 * @deprecated Use `fromCodePoint(replaceCodePoint(codePoint))` instead.
		 * @param codePoint The code point to decode.
		 * @returns The decoded code point.
		 */
		function decodeCodePoint(codePoint) {
		    return (0, exports.fromCodePoint)(replaceCodePoint(codePoint));
		}
		exports.default = decodeCodePoint;
		
	} (decode_codepoint));
	return decode_codepoint;
}

var hasRequiredDecode;

function requireDecode () {
	if (hasRequiredDecode) return decode;
	hasRequiredDecode = 1;
	(function (exports) {
		var __createBinding = (decode && decode.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (decode && decode.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (decode && decode.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		var __importDefault = (decode && decode.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.decodeXML = exports.decodeHTMLStrict = exports.decodeHTMLAttribute = exports.decodeHTML = exports.determineBranch = exports.EntityDecoder = exports.DecodingMode = exports.BinTrieFlags = exports.fromCodePoint = exports.replaceCodePoint = exports.decodeCodePoint = exports.xmlDecodeTree = exports.htmlDecodeTree = void 0;
		var decode_data_html_js_1 = __importDefault(/*@__PURE__*/ requireDecodeDataHtml());
		exports.htmlDecodeTree = decode_data_html_js_1.default;
		var decode_data_xml_js_1 = __importDefault(/*@__PURE__*/ requireDecodeDataXml());
		exports.xmlDecodeTree = decode_data_xml_js_1.default;
		var decode_codepoint_js_1 = __importStar(/*@__PURE__*/ requireDecode_codepoint());
		exports.decodeCodePoint = decode_codepoint_js_1.default;
		var decode_codepoint_js_2 = /*@__PURE__*/ requireDecode_codepoint();
		Object.defineProperty(exports, "replaceCodePoint", { enumerable: true, get: function () { return decode_codepoint_js_2.replaceCodePoint; } });
		Object.defineProperty(exports, "fromCodePoint", { enumerable: true, get: function () { return decode_codepoint_js_2.fromCodePoint; } });
		var CharCodes;
		(function (CharCodes) {
		    CharCodes[CharCodes["NUM"] = 35] = "NUM";
		    CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
		    CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
		    CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
		    CharCodes[CharCodes["NINE"] = 57] = "NINE";
		    CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
		    CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
		    CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
		    CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
		    CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
		    CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
		    CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
		})(CharCodes || (CharCodes = {}));
		/** Bit that needs to be set to convert an upper case ASCII character to lower case */
		var TO_LOWER_BIT = 32;
		var BinTrieFlags;
		(function (BinTrieFlags) {
		    BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
		    BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
		    BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
		})(BinTrieFlags = exports.BinTrieFlags || (exports.BinTrieFlags = {}));
		function isNumber(code) {
		    return code >= CharCodes.ZERO && code <= CharCodes.NINE;
		}
		function isHexadecimalCharacter(code) {
		    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F) ||
		        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F));
		}
		function isAsciiAlphaNumeric(code) {
		    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z) ||
		        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z) ||
		        isNumber(code));
		}
		/**
		 * Checks if the given character is a valid end character for an entity in an attribute.
		 *
		 * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
		 * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
		 */
		function isEntityInAttributeInvalidEnd(code) {
		    return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
		}
		var EntityDecoderState;
		(function (EntityDecoderState) {
		    EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
		    EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
		    EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
		    EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
		    EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
		})(EntityDecoderState || (EntityDecoderState = {}));
		var DecodingMode;
		(function (DecodingMode) {
		    /** Entities in text nodes that can end with any character. */
		    DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
		    /** Only allow entities terminated with a semicolon. */
		    DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
		    /** Entities in attributes have limitations on ending characters. */
		    DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
		})(DecodingMode = exports.DecodingMode || (exports.DecodingMode = {}));
		/**
		 * Token decoder with support of writing partial entities.
		 */
		var EntityDecoder = /** @class */ (function () {
		    function EntityDecoder(
		    /** The tree used to decode entities. */
		    decodeTree, 
		    /**
		     * The function that is called when a codepoint is decoded.
		     *
		     * For multi-byte named entities, this will be called multiple times,
		     * with the second codepoint, and the same `consumed` value.
		     *
		     * @param codepoint The decoded codepoint.
		     * @param consumed The number of bytes consumed by the decoder.
		     */
		    emitCodePoint, 
		    /** An object that is used to produce errors. */
		    errors) {
		        this.decodeTree = decodeTree;
		        this.emitCodePoint = emitCodePoint;
		        this.errors = errors;
		        /** The current state of the decoder. */
		        this.state = EntityDecoderState.EntityStart;
		        /** Characters that were consumed while parsing an entity. */
		        this.consumed = 1;
		        /**
		         * The result of the entity.
		         *
		         * Either the result index of a numeric entity, or the codepoint of a
		         * numeric entity.
		         */
		        this.result = 0;
		        /** The current index in the decode tree. */
		        this.treeIndex = 0;
		        /** The number of characters that were consumed in excess. */
		        this.excess = 1;
		        /** The mode in which the decoder is operating. */
		        this.decodeMode = DecodingMode.Strict;
		    }
		    /** Resets the instance to make it reusable. */
		    EntityDecoder.prototype.startEntity = function (decodeMode) {
		        this.decodeMode = decodeMode;
		        this.state = EntityDecoderState.EntityStart;
		        this.result = 0;
		        this.treeIndex = 0;
		        this.excess = 1;
		        this.consumed = 1;
		    };
		    /**
		     * Write an entity to the decoder. This can be called multiple times with partial entities.
		     * If the entity is incomplete, the decoder will return -1.
		     *
		     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
		     * entity is incomplete, and resume when the next string is written.
		     *
		     * @param string The string containing the entity (or a continuation of the entity).
		     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
		     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
		     */
		    EntityDecoder.prototype.write = function (str, offset) {
		        switch (this.state) {
		            case EntityDecoderState.EntityStart: {
		                if (str.charCodeAt(offset) === CharCodes.NUM) {
		                    this.state = EntityDecoderState.NumericStart;
		                    this.consumed += 1;
		                    return this.stateNumericStart(str, offset + 1);
		                }
		                this.state = EntityDecoderState.NamedEntity;
		                return this.stateNamedEntity(str, offset);
		            }
		            case EntityDecoderState.NumericStart: {
		                return this.stateNumericStart(str, offset);
		            }
		            case EntityDecoderState.NumericDecimal: {
		                return this.stateNumericDecimal(str, offset);
		            }
		            case EntityDecoderState.NumericHex: {
		                return this.stateNumericHex(str, offset);
		            }
		            case EntityDecoderState.NamedEntity: {
		                return this.stateNamedEntity(str, offset);
		            }
		        }
		    };
		    /**
		     * Switches between the numeric decimal and hexadecimal states.
		     *
		     * Equivalent to the `Numeric character reference state` in the HTML spec.
		     *
		     * @param str The string containing the entity (or a continuation of the entity).
		     * @param offset The current offset.
		     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
		     */
		    EntityDecoder.prototype.stateNumericStart = function (str, offset) {
		        if (offset >= str.length) {
		            return -1;
		        }
		        if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
		            this.state = EntityDecoderState.NumericHex;
		            this.consumed += 1;
		            return this.stateNumericHex(str, offset + 1);
		        }
		        this.state = EntityDecoderState.NumericDecimal;
		        return this.stateNumericDecimal(str, offset);
		    };
		    EntityDecoder.prototype.addToNumericResult = function (str, start, end, base) {
		        if (start !== end) {
		            var digitCount = end - start;
		            this.result =
		                this.result * Math.pow(base, digitCount) +
		                    parseInt(str.substr(start, digitCount), base);
		            this.consumed += digitCount;
		        }
		    };
		    /**
		     * Parses a hexadecimal numeric entity.
		     *
		     * Equivalent to the `Hexademical character reference state` in the HTML spec.
		     *
		     * @param str The string containing the entity (or a continuation of the entity).
		     * @param offset The current offset.
		     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
		     */
		    EntityDecoder.prototype.stateNumericHex = function (str, offset) {
		        var startIdx = offset;
		        while (offset < str.length) {
		            var char = str.charCodeAt(offset);
		            if (isNumber(char) || isHexadecimalCharacter(char)) {
		                offset += 1;
		            }
		            else {
		                this.addToNumericResult(str, startIdx, offset, 16);
		                return this.emitNumericEntity(char, 3);
		            }
		        }
		        this.addToNumericResult(str, startIdx, offset, 16);
		        return -1;
		    };
		    /**
		     * Parses a decimal numeric entity.
		     *
		     * Equivalent to the `Decimal character reference state` in the HTML spec.
		     *
		     * @param str The string containing the entity (or a continuation of the entity).
		     * @param offset The current offset.
		     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
		     */
		    EntityDecoder.prototype.stateNumericDecimal = function (str, offset) {
		        var startIdx = offset;
		        while (offset < str.length) {
		            var char = str.charCodeAt(offset);
		            if (isNumber(char)) {
		                offset += 1;
		            }
		            else {
		                this.addToNumericResult(str, startIdx, offset, 10);
		                return this.emitNumericEntity(char, 2);
		            }
		        }
		        this.addToNumericResult(str, startIdx, offset, 10);
		        return -1;
		    };
		    /**
		     * Validate and emit a numeric entity.
		     *
		     * Implements the logic from the `Hexademical character reference start
		     * state` and `Numeric character reference end state` in the HTML spec.
		     *
		     * @param lastCp The last code point of the entity. Used to see if the
		     *               entity was terminated with a semicolon.
		     * @param expectedLength The minimum number of characters that should be
		     *                       consumed. Used to validate that at least one digit
		     *                       was consumed.
		     * @returns The number of characters that were consumed.
		     */
		    EntityDecoder.prototype.emitNumericEntity = function (lastCp, expectedLength) {
		        var _a;
		        // Ensure we consumed at least one digit.
		        if (this.consumed <= expectedLength) {
		            (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
		            return 0;
		        }
		        // Figure out if this is a legit end of the entity
		        if (lastCp === CharCodes.SEMI) {
		            this.consumed += 1;
		        }
		        else if (this.decodeMode === DecodingMode.Strict) {
		            return 0;
		        }
		        this.emitCodePoint((0, decode_codepoint_js_1.replaceCodePoint)(this.result), this.consumed);
		        if (this.errors) {
		            if (lastCp !== CharCodes.SEMI) {
		                this.errors.missingSemicolonAfterCharacterReference();
		            }
		            this.errors.validateNumericCharacterReference(this.result);
		        }
		        return this.consumed;
		    };
		    /**
		     * Parses a named entity.
		     *
		     * Equivalent to the `Named character reference state` in the HTML spec.
		     *
		     * @param str The string containing the entity (or a continuation of the entity).
		     * @param offset The current offset.
		     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
		     */
		    EntityDecoder.prototype.stateNamedEntity = function (str, offset) {
		        var decodeTree = this.decodeTree;
		        var current = decodeTree[this.treeIndex];
		        // The mask is the number of bytes of the value, including the current byte.
		        var valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
		        for (; offset < str.length; offset++, this.excess++) {
		            var char = str.charCodeAt(offset);
		            this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
		            if (this.treeIndex < 0) {
		                return this.result === 0 ||
		                    // If we are parsing an attribute
		                    (this.decodeMode === DecodingMode.Attribute &&
		                        // We shouldn't have consumed any characters after the entity,
		                        (valueLength === 0 ||
		                            // And there should be no invalid characters.
		                            isEntityInAttributeInvalidEnd(char)))
		                    ? 0
		                    : this.emitNotTerminatedNamedEntity();
		            }
		            current = decodeTree[this.treeIndex];
		            valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
		            // If the branch is a value, store it and continue
		            if (valueLength !== 0) {
		                // If the entity is terminated by a semicolon, we are done.
		                if (char === CharCodes.SEMI) {
		                    return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
		                }
		                // If we encounter a non-terminated (legacy) entity while parsing strictly, then ignore it.
		                if (this.decodeMode !== DecodingMode.Strict) {
		                    this.result = this.treeIndex;
		                    this.consumed += this.excess;
		                    this.excess = 0;
		                }
		            }
		        }
		        return -1;
		    };
		    /**
		     * Emit a named entity that was not terminated with a semicolon.
		     *
		     * @returns The number of characters consumed.
		     */
		    EntityDecoder.prototype.emitNotTerminatedNamedEntity = function () {
		        var _a;
		        var _b = this, result = _b.result, decodeTree = _b.decodeTree;
		        var valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
		        this.emitNamedEntityData(result, valueLength, this.consumed);
		        (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
		        return this.consumed;
		    };
		    /**
		     * Emit a named entity.
		     *
		     * @param result The index of the entity in the decode tree.
		     * @param valueLength The number of bytes in the entity.
		     * @param consumed The number of characters consumed.
		     *
		     * @returns The number of characters consumed.
		     */
		    EntityDecoder.prototype.emitNamedEntityData = function (result, valueLength, consumed) {
		        var decodeTree = this.decodeTree;
		        this.emitCodePoint(valueLength === 1
		            ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH
		            : decodeTree[result + 1], consumed);
		        if (valueLength === 3) {
		            // For multi-byte values, we need to emit the second byte.
		            this.emitCodePoint(decodeTree[result + 2], consumed);
		        }
		        return consumed;
		    };
		    /**
		     * Signal to the parser that the end of the input was reached.
		     *
		     * Remaining data will be emitted and relevant errors will be produced.
		     *
		     * @returns The number of characters consumed.
		     */
		    EntityDecoder.prototype.end = function () {
		        var _a;
		        switch (this.state) {
		            case EntityDecoderState.NamedEntity: {
		                // Emit a named entity if we have one.
		                return this.result !== 0 &&
		                    (this.decodeMode !== DecodingMode.Attribute ||
		                        this.result === this.treeIndex)
		                    ? this.emitNotTerminatedNamedEntity()
		                    : 0;
		            }
		            // Otherwise, emit a numeric entity if we have one.
		            case EntityDecoderState.NumericDecimal: {
		                return this.emitNumericEntity(0, 2);
		            }
		            case EntityDecoderState.NumericHex: {
		                return this.emitNumericEntity(0, 3);
		            }
		            case EntityDecoderState.NumericStart: {
		                (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
		                return 0;
		            }
		            case EntityDecoderState.EntityStart: {
		                // Return 0 if we have no entity.
		                return 0;
		            }
		        }
		    };
		    return EntityDecoder;
		}());
		exports.EntityDecoder = EntityDecoder;
		/**
		 * Creates a function that decodes entities in a string.
		 *
		 * @param decodeTree The decode tree.
		 * @returns A function that decodes entities in a string.
		 */
		function getDecoder(decodeTree) {
		    var ret = "";
		    var decoder = new EntityDecoder(decodeTree, function (str) { return (ret += (0, decode_codepoint_js_1.fromCodePoint)(str)); });
		    return function decodeWithTrie(str, decodeMode) {
		        var lastIndex = 0;
		        var offset = 0;
		        while ((offset = str.indexOf("&", offset)) >= 0) {
		            ret += str.slice(lastIndex, offset);
		            decoder.startEntity(decodeMode);
		            var len = decoder.write(str, 
		            // Skip the "&"
		            offset + 1);
		            if (len < 0) {
		                lastIndex = offset + decoder.end();
		                break;
		            }
		            lastIndex = offset + len;
		            // If `len` is 0, skip the current `&` and continue.
		            offset = len === 0 ? lastIndex + 1 : lastIndex;
		        }
		        var result = ret + str.slice(lastIndex);
		        // Make sure we don't keep a reference to the final string.
		        ret = "";
		        return result;
		    };
		}
		/**
		 * Determines the branch of the current node that is taken given the current
		 * character. This function is used to traverse the trie.
		 *
		 * @param decodeTree The trie.
		 * @param current The current node.
		 * @param nodeIdx The index right after the current node and its value.
		 * @param char The current character.
		 * @returns The index of the next node, or -1 if no branch is taken.
		 */
		function determineBranch(decodeTree, current, nodeIdx, char) {
		    var branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
		    var jumpOffset = current & BinTrieFlags.JUMP_TABLE;
		    // Case 1: Single branch encoded in jump offset
		    if (branchCount === 0) {
		        return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
		    }
		    // Case 2: Multiple branches encoded in jump table
		    if (jumpOffset) {
		        var value = char - jumpOffset;
		        return value < 0 || value >= branchCount
		            ? -1
		            : decodeTree[nodeIdx + value] - 1;
		    }
		    // Case 3: Multiple branches encoded in dictionary
		    // Binary search for the character.
		    var lo = nodeIdx;
		    var hi = lo + branchCount - 1;
		    while (lo <= hi) {
		        var mid = (lo + hi) >>> 1;
		        var midVal = decodeTree[mid];
		        if (midVal < char) {
		            lo = mid + 1;
		        }
		        else if (midVal > char) {
		            hi = mid - 1;
		        }
		        else {
		            return decodeTree[mid + branchCount];
		        }
		    }
		    return -1;
		}
		exports.determineBranch = determineBranch;
		var htmlDecoder = getDecoder(decode_data_html_js_1.default);
		var xmlDecoder = getDecoder(decode_data_xml_js_1.default);
		/**
		 * Decodes an HTML string.
		 *
		 * @param str The string to decode.
		 * @param mode The decoding mode.
		 * @returns The decoded string.
		 */
		function decodeHTML(str, mode) {
		    if (mode === void 0) { mode = DecodingMode.Legacy; }
		    return htmlDecoder(str, mode);
		}
		exports.decodeHTML = decodeHTML;
		/**
		 * Decodes an HTML string in an attribute.
		 *
		 * @param str The string to decode.
		 * @returns The decoded string.
		 */
		function decodeHTMLAttribute(str) {
		    return htmlDecoder(str, DecodingMode.Attribute);
		}
		exports.decodeHTMLAttribute = decodeHTMLAttribute;
		/**
		 * Decodes an HTML string, requiring all entities to be terminated by a semicolon.
		 *
		 * @param str The string to decode.
		 * @returns The decoded string.
		 */
		function decodeHTMLStrict(str) {
		    return htmlDecoder(str, DecodingMode.Strict);
		}
		exports.decodeHTMLStrict = decodeHTMLStrict;
		/**
		 * Decodes an XML string, requiring all entities to be terminated by a semicolon.
		 *
		 * @param str The string to decode.
		 * @returns The decoded string.
		 */
		function decodeXML(str) {
		    return xmlDecoder(str, DecodingMode.Strict);
		}
		exports.decodeXML = decodeXML;
		
	} (decode));
	return decode;
}

/**
* @vue/compiler-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/

var hasRequiredCompilerCore_cjs_prod;

function requireCompilerCore_cjs_prod () {
	if (hasRequiredCompilerCore_cjs_prod) return compilerCore_cjs_prod;
	hasRequiredCompilerCore_cjs_prod = 1;

	Object.defineProperty(compilerCore_cjs_prod, '__esModule', { value: true });

	var shared = /*@__PURE__*/ requireShared_cjs_prod();
	var decode_js = /*@__PURE__*/ requireDecode();
	var parser = require$$2;
	var estreeWalker = require$$3;
	var sourceMapJs = require$$4;

	const FRAGMENT = Symbol(``);
	const TELEPORT = Symbol(``);
	const SUSPENSE = Symbol(``);
	const KEEP_ALIVE = Symbol(``);
	const BASE_TRANSITION = Symbol(
	  ``
	);
	const OPEN_BLOCK = Symbol(``);
	const CREATE_BLOCK = Symbol(``);
	const CREATE_ELEMENT_BLOCK = Symbol(
	  ``
	);
	const CREATE_VNODE = Symbol(``);
	const CREATE_ELEMENT_VNODE = Symbol(
	  ``
	);
	const CREATE_COMMENT = Symbol(
	  ``
	);
	const CREATE_TEXT = Symbol(
	  ``
	);
	const CREATE_STATIC = Symbol(
	  ``
	);
	const RESOLVE_COMPONENT = Symbol(
	  ``
	);
	const RESOLVE_DYNAMIC_COMPONENT = Symbol(
	  ``
	);
	const RESOLVE_DIRECTIVE = Symbol(
	  ``
	);
	const RESOLVE_FILTER = Symbol(
	  ``
	);
	const WITH_DIRECTIVES = Symbol(
	  ``
	);
	const RENDER_LIST = Symbol(``);
	const RENDER_SLOT = Symbol(``);
	const CREATE_SLOTS = Symbol(``);
	const TO_DISPLAY_STRING = Symbol(
	  ``
	);
	const MERGE_PROPS = Symbol(``);
	const NORMALIZE_CLASS = Symbol(
	  ``
	);
	const NORMALIZE_STYLE = Symbol(
	  ``
	);
	const NORMALIZE_PROPS = Symbol(
	  ``
	);
	const GUARD_REACTIVE_PROPS = Symbol(
	  ``
	);
	const TO_HANDLERS = Symbol(``);
	const CAMELIZE = Symbol(``);
	const CAPITALIZE = Symbol(``);
	const TO_HANDLER_KEY = Symbol(
	  ``
	);
	const SET_BLOCK_TRACKING = Symbol(
	  ``
	);
	const PUSH_SCOPE_ID = Symbol(``);
	const POP_SCOPE_ID = Symbol(``);
	const WITH_CTX = Symbol(``);
	const UNREF = Symbol(``);
	const IS_REF = Symbol(``);
	const WITH_MEMO = Symbol(``);
	const IS_MEMO_SAME = Symbol(``);
	const helperNameMap = {
	  [FRAGMENT]: `Fragment`,
	  [TELEPORT]: `Teleport`,
	  [SUSPENSE]: `Suspense`,
	  [KEEP_ALIVE]: `KeepAlive`,
	  [BASE_TRANSITION]: `BaseTransition`,
	  [OPEN_BLOCK]: `openBlock`,
	  [CREATE_BLOCK]: `createBlock`,
	  [CREATE_ELEMENT_BLOCK]: `createElementBlock`,
	  [CREATE_VNODE]: `createVNode`,
	  [CREATE_ELEMENT_VNODE]: `createElementVNode`,
	  [CREATE_COMMENT]: `createCommentVNode`,
	  [CREATE_TEXT]: `createTextVNode`,
	  [CREATE_STATIC]: `createStaticVNode`,
	  [RESOLVE_COMPONENT]: `resolveComponent`,
	  [RESOLVE_DYNAMIC_COMPONENT]: `resolveDynamicComponent`,
	  [RESOLVE_DIRECTIVE]: `resolveDirective`,
	  [RESOLVE_FILTER]: `resolveFilter`,
	  [WITH_DIRECTIVES]: `withDirectives`,
	  [RENDER_LIST]: `renderList`,
	  [RENDER_SLOT]: `renderSlot`,
	  [CREATE_SLOTS]: `createSlots`,
	  [TO_DISPLAY_STRING]: `toDisplayString`,
	  [MERGE_PROPS]: `mergeProps`,
	  [NORMALIZE_CLASS]: `normalizeClass`,
	  [NORMALIZE_STYLE]: `normalizeStyle`,
	  [NORMALIZE_PROPS]: `normalizeProps`,
	  [GUARD_REACTIVE_PROPS]: `guardReactiveProps`,
	  [TO_HANDLERS]: `toHandlers`,
	  [CAMELIZE]: `camelize`,
	  [CAPITALIZE]: `capitalize`,
	  [TO_HANDLER_KEY]: `toHandlerKey`,
	  [SET_BLOCK_TRACKING]: `setBlockTracking`,
	  [PUSH_SCOPE_ID]: `pushScopeId`,
	  [POP_SCOPE_ID]: `popScopeId`,
	  [WITH_CTX]: `withCtx`,
	  [UNREF]: `unref`,
	  [IS_REF]: `isRef`,
	  [WITH_MEMO]: `withMemo`,
	  [IS_MEMO_SAME]: `isMemoSame`
	};
	function registerRuntimeHelpers(helpers) {
	  Object.getOwnPropertySymbols(helpers).forEach((s) => {
	    helperNameMap[s] = helpers[s];
	  });
	}

	const Namespaces = {
	  "HTML": 0,
	  "0": "HTML",
	  "SVG": 1,
	  "1": "SVG",
	  "MATH_ML": 2,
	  "2": "MATH_ML"
	};
	const NodeTypes = {
	  "ROOT": 0,
	  "0": "ROOT",
	  "ELEMENT": 1,
	  "1": "ELEMENT",
	  "TEXT": 2,
	  "2": "TEXT",
	  "COMMENT": 3,
	  "3": "COMMENT",
	  "SIMPLE_EXPRESSION": 4,
	  "4": "SIMPLE_EXPRESSION",
	  "INTERPOLATION": 5,
	  "5": "INTERPOLATION",
	  "ATTRIBUTE": 6,
	  "6": "ATTRIBUTE",
	  "DIRECTIVE": 7,
	  "7": "DIRECTIVE",
	  "COMPOUND_EXPRESSION": 8,
	  "8": "COMPOUND_EXPRESSION",
	  "IF": 9,
	  "9": "IF",
	  "IF_BRANCH": 10,
	  "10": "IF_BRANCH",
	  "FOR": 11,
	  "11": "FOR",
	  "TEXT_CALL": 12,
	  "12": "TEXT_CALL",
	  "VNODE_CALL": 13,
	  "13": "VNODE_CALL",
	  "JS_CALL_EXPRESSION": 14,
	  "14": "JS_CALL_EXPRESSION",
	  "JS_OBJECT_EXPRESSION": 15,
	  "15": "JS_OBJECT_EXPRESSION",
	  "JS_PROPERTY": 16,
	  "16": "JS_PROPERTY",
	  "JS_ARRAY_EXPRESSION": 17,
	  "17": "JS_ARRAY_EXPRESSION",
	  "JS_FUNCTION_EXPRESSION": 18,
	  "18": "JS_FUNCTION_EXPRESSION",
	  "JS_CONDITIONAL_EXPRESSION": 19,
	  "19": "JS_CONDITIONAL_EXPRESSION",
	  "JS_CACHE_EXPRESSION": 20,
	  "20": "JS_CACHE_EXPRESSION",
	  "JS_BLOCK_STATEMENT": 21,
	  "21": "JS_BLOCK_STATEMENT",
	  "JS_TEMPLATE_LITERAL": 22,
	  "22": "JS_TEMPLATE_LITERAL",
	  "JS_IF_STATEMENT": 23,
	  "23": "JS_IF_STATEMENT",
	  "JS_ASSIGNMENT_EXPRESSION": 24,
	  "24": "JS_ASSIGNMENT_EXPRESSION",
	  "JS_SEQUENCE_EXPRESSION": 25,
	  "25": "JS_SEQUENCE_EXPRESSION",
	  "JS_RETURN_STATEMENT": 26,
	  "26": "JS_RETURN_STATEMENT"
	};
	const ElementTypes = {
	  "ELEMENT": 0,
	  "0": "ELEMENT",
	  "COMPONENT": 1,
	  "1": "COMPONENT",
	  "SLOT": 2,
	  "2": "SLOT",
	  "TEMPLATE": 3,
	  "3": "TEMPLATE"
	};
	const ConstantTypes = {
	  "NOT_CONSTANT": 0,
	  "0": "NOT_CONSTANT",
	  "CAN_SKIP_PATCH": 1,
	  "1": "CAN_SKIP_PATCH",
	  "CAN_CACHE": 2,
	  "2": "CAN_CACHE",
	  "CAN_STRINGIFY": 3,
	  "3": "CAN_STRINGIFY"
	};
	const locStub = {
	  start: { line: 1, column: 1, offset: 0 },
	  end: { line: 1, column: 1, offset: 0 },
	  source: ""
	};
	function createRoot(children, source = "") {
	  return {
	    type: 0,
	    source,
	    children,
	    helpers: /* @__PURE__ */ new Set(),
	    components: [],
	    directives: [],
	    hoists: [],
	    imports: [],
	    cached: [],
	    temps: 0,
	    codegenNode: void 0,
	    loc: locStub
	  };
	}
	function createVNodeCall(context, tag, props, children, patchFlag, dynamicProps, directives, isBlock = false, disableTracking = false, isComponent = false, loc = locStub) {
	  if (context) {
	    if (isBlock) {
	      context.helper(OPEN_BLOCK);
	      context.helper(getVNodeBlockHelper(context.inSSR, isComponent));
	    } else {
	      context.helper(getVNodeHelper(context.inSSR, isComponent));
	    }
	    if (directives) {
	      context.helper(WITH_DIRECTIVES);
	    }
	  }
	  return {
	    type: 13,
	    tag,
	    props,
	    children,
	    patchFlag,
	    dynamicProps,
	    directives,
	    isBlock,
	    disableTracking,
	    isComponent,
	    loc
	  };
	}
	function createArrayExpression(elements, loc = locStub) {
	  return {
	    type: 17,
	    loc,
	    elements
	  };
	}
	function createObjectExpression(properties, loc = locStub) {
	  return {
	    type: 15,
	    loc,
	    properties
	  };
	}
	function createObjectProperty(key, value) {
	  return {
	    type: 16,
	    loc: locStub,
	    key: shared.isString(key) ? createSimpleExpression(key, true) : key,
	    value
	  };
	}
	function createSimpleExpression(content, isStatic = false, loc = locStub, constType = 0) {
	  return {
	    type: 4,
	    loc,
	    content,
	    isStatic,
	    constType: isStatic ? 3 : constType
	  };
	}
	function createInterpolation(content, loc) {
	  return {
	    type: 5,
	    loc,
	    content: shared.isString(content) ? createSimpleExpression(content, false, loc) : content
	  };
	}
	function createCompoundExpression(children, loc = locStub) {
	  return {
	    type: 8,
	    loc,
	    children
	  };
	}
	function createCallExpression(callee, args = [], loc = locStub) {
	  return {
	    type: 14,
	    loc,
	    callee,
	    arguments: args
	  };
	}
	function createFunctionExpression(params, returns = void 0, newline = false, isSlot = false, loc = locStub) {
	  return {
	    type: 18,
	    params,
	    returns,
	    newline,
	    isSlot,
	    loc
	  };
	}
	function createConditionalExpression(test, consequent, alternate, newline = true) {
	  return {
	    type: 19,
	    test,
	    consequent,
	    alternate,
	    newline,
	    loc: locStub
	  };
	}
	function createCacheExpression(index, value, needPauseTracking = false, inVOnce = false) {
	  return {
	    type: 20,
	    index,
	    value,
	    needPauseTracking,
	    inVOnce,
	    needArraySpread: false,
	    loc: locStub
	  };
	}
	function createBlockStatement(body) {
	  return {
	    type: 21,
	    body,
	    loc: locStub
	  };
	}
	function createTemplateLiteral(elements) {
	  return {
	    type: 22,
	    elements,
	    loc: locStub
	  };
	}
	function createIfStatement(test, consequent, alternate) {
	  return {
	    type: 23,
	    test,
	    consequent,
	    alternate,
	    loc: locStub
	  };
	}
	function createAssignmentExpression(left, right) {
	  return {
	    type: 24,
	    left,
	    right,
	    loc: locStub
	  };
	}
	function createSequenceExpression(expressions) {
	  return {
	    type: 25,
	    expressions,
	    loc: locStub
	  };
	}
	function createReturnStatement(returns) {
	  return {
	    type: 26,
	    returns,
	    loc: locStub
	  };
	}
	function getVNodeHelper(ssr, isComponent) {
	  return ssr || isComponent ? CREATE_VNODE : CREATE_ELEMENT_VNODE;
	}
	function getVNodeBlockHelper(ssr, isComponent) {
	  return ssr || isComponent ? CREATE_BLOCK : CREATE_ELEMENT_BLOCK;
	}
	function convertToBlock(node, { helper, removeHelper, inSSR }) {
	  if (!node.isBlock) {
	    node.isBlock = true;
	    removeHelper(getVNodeHelper(inSSR, node.isComponent));
	    helper(OPEN_BLOCK);
	    helper(getVNodeBlockHelper(inSSR, node.isComponent));
	  }
	}

	const defaultDelimitersOpen = new Uint8Array([123, 123]);
	const defaultDelimitersClose = new Uint8Array([125, 125]);
	function isTagStartChar(c) {
	  return c >= 97 && c <= 122 || c >= 65 && c <= 90;
	}
	function isWhitespace(c) {
	  return c === 32 || c === 10 || c === 9 || c === 12 || c === 13;
	}
	function isEndOfTagSection(c) {
	  return c === 47 || c === 62 || isWhitespace(c);
	}
	function toCharCodes(str) {
	  const ret = new Uint8Array(str.length);
	  for (let i = 0; i < str.length; i++) {
	    ret[i] = str.charCodeAt(i);
	  }
	  return ret;
	}
	const Sequences = {
	  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
	  // CDATA[
	  CdataEnd: new Uint8Array([93, 93, 62]),
	  // ]]>
	  CommentEnd: new Uint8Array([45, 45, 62]),
	  // `-->`
	  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
	  // `<\/script`
	  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
	  // `</style`
	  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
	  // `</title`
	  TextareaEnd: new Uint8Array([
	    60,
	    47,
	    116,
	    101,
	    120,
	    116,
	    97,
	    114,
	    101,
	    97
	  ])
	  // `</textarea
	};
	class Tokenizer {
	  constructor(stack, cbs) {
	    this.stack = stack;
	    this.cbs = cbs;
	    /** The current state the tokenizer is in. */
	    this.state = 1;
	    /** The read buffer. */
	    this.buffer = "";
	    /** The beginning of the section that is currently being read. */
	    this.sectionStart = 0;
	    /** The index within the buffer that we are currently looking at. */
	    this.index = 0;
	    /** The start of the last entity. */
	    this.entityStart = 0;
	    /** Some behavior, eg. when decoding entities, is done while we are in another state. This keeps track of the other state type. */
	    this.baseState = 1;
	    /** For special parsing behavior inside of script and style tags. */
	    this.inRCDATA = false;
	    /** For disabling RCDATA tags handling */
	    this.inXML = false;
	    /** For disabling interpolation parsing in v-pre */
	    this.inVPre = false;
	    /** Record newline positions for fast line / column calculation */
	    this.newlines = [];
	    this.mode = 0;
	    this.delimiterOpen = defaultDelimitersOpen;
	    this.delimiterClose = defaultDelimitersClose;
	    this.delimiterIndex = -1;
	    this.currentSequence = void 0;
	    this.sequenceIndex = 0;
	    {
	      this.entityDecoder = new decode_js.EntityDecoder(
	        decode_js.htmlDecodeTree,
	        (cp, consumed) => this.emitCodePoint(cp, consumed)
	      );
	    }
	  }
	  get inSFCRoot() {
	    return this.mode === 2 && this.stack.length === 0;
	  }
	  reset() {
	    this.state = 1;
	    this.mode = 0;
	    this.buffer = "";
	    this.sectionStart = 0;
	    this.index = 0;
	    this.baseState = 1;
	    this.inRCDATA = false;
	    this.currentSequence = void 0;
	    this.newlines.length = 0;
	    this.delimiterOpen = defaultDelimitersOpen;
	    this.delimiterClose = defaultDelimitersClose;
	  }
	  /**
	   * Generate Position object with line / column information using recorded
	   * newline positions. We know the index is always going to be an already
	   * processed index, so all the newlines up to this index should have been
	   * recorded.
	   */
	  getPos(index) {
	    let line = 1;
	    let column = index + 1;
	    for (let i = this.newlines.length - 1; i >= 0; i--) {
	      const newlineIndex = this.newlines[i];
	      if (index > newlineIndex) {
	        line = i + 2;
	        column = index - newlineIndex;
	        break;
	      }
	    }
	    return {
	      column,
	      line,
	      offset: index
	    };
	  }
	  peek() {
	    return this.buffer.charCodeAt(this.index + 1);
	  }
	  stateText(c) {
	    if (c === 60) {
	      if (this.index > this.sectionStart) {
	        this.cbs.ontext(this.sectionStart, this.index);
	      }
	      this.state = 5;
	      this.sectionStart = this.index;
	    } else if (c === 38) {
	      this.startEntity();
	    } else if (!this.inVPre && c === this.delimiterOpen[0]) {
	      this.state = 2;
	      this.delimiterIndex = 0;
	      this.stateInterpolationOpen(c);
	    }
	  }
	  stateInterpolationOpen(c) {
	    if (c === this.delimiterOpen[this.delimiterIndex]) {
	      if (this.delimiterIndex === this.delimiterOpen.length - 1) {
	        const start = this.index + 1 - this.delimiterOpen.length;
	        if (start > this.sectionStart) {
	          this.cbs.ontext(this.sectionStart, start);
	        }
	        this.state = 3;
	        this.sectionStart = start;
	      } else {
	        this.delimiterIndex++;
	      }
	    } else if (this.inRCDATA) {
	      this.state = 32;
	      this.stateInRCDATA(c);
	    } else {
	      this.state = 1;
	      this.stateText(c);
	    }
	  }
	  stateInterpolation(c) {
	    if (c === this.delimiterClose[0]) {
	      this.state = 4;
	      this.delimiterIndex = 0;
	      this.stateInterpolationClose(c);
	    }
	  }
	  stateInterpolationClose(c) {
	    if (c === this.delimiterClose[this.delimiterIndex]) {
	      if (this.delimiterIndex === this.delimiterClose.length - 1) {
	        this.cbs.oninterpolation(this.sectionStart, this.index + 1);
	        if (this.inRCDATA) {
	          this.state = 32;
	        } else {
	          this.state = 1;
	        }
	        this.sectionStart = this.index + 1;
	      } else {
	        this.delimiterIndex++;
	      }
	    } else {
	      this.state = 3;
	      this.stateInterpolation(c);
	    }
	  }
	  stateSpecialStartSequence(c) {
	    const isEnd = this.sequenceIndex === this.currentSequence.length;
	    const isMatch = isEnd ? (
	      // If we are at the end of the sequence, make sure the tag name has ended
	      isEndOfTagSection(c)
	    ) : (
	      // Otherwise, do a case-insensitive comparison
	      (c | 32) === this.currentSequence[this.sequenceIndex]
	    );
	    if (!isMatch) {
	      this.inRCDATA = false;
	    } else if (!isEnd) {
	      this.sequenceIndex++;
	      return;
	    }
	    this.sequenceIndex = 0;
	    this.state = 6;
	    this.stateInTagName(c);
	  }
	  /** Look for an end tag. For <title> and <textarea>, also decode entities. */
	  stateInRCDATA(c) {
	    if (this.sequenceIndex === this.currentSequence.length) {
	      if (c === 62 || isWhitespace(c)) {
	        const endOfText = this.index - this.currentSequence.length;
	        if (this.sectionStart < endOfText) {
	          const actualIndex = this.index;
	          this.index = endOfText;
	          this.cbs.ontext(this.sectionStart, endOfText);
	          this.index = actualIndex;
	        }
	        this.sectionStart = endOfText + 2;
	        this.stateInClosingTagName(c);
	        this.inRCDATA = false;
	        return;
	      }
	      this.sequenceIndex = 0;
	    }
	    if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
	      this.sequenceIndex += 1;
	    } else if (this.sequenceIndex === 0) {
	      if (this.currentSequence === Sequences.TitleEnd || this.currentSequence === Sequences.TextareaEnd && !this.inSFCRoot) {
	        if (c === 38) {
	          this.startEntity();
	        } else if (!this.inVPre && c === this.delimiterOpen[0]) {
	          this.state = 2;
	          this.delimiterIndex = 0;
	          this.stateInterpolationOpen(c);
	        }
	      } else if (this.fastForwardTo(60)) {
	        this.sequenceIndex = 1;
	      }
	    } else {
	      this.sequenceIndex = Number(c === 60);
	    }
	  }
	  stateCDATASequence(c) {
	    if (c === Sequences.Cdata[this.sequenceIndex]) {
	      if (++this.sequenceIndex === Sequences.Cdata.length) {
	        this.state = 28;
	        this.currentSequence = Sequences.CdataEnd;
	        this.sequenceIndex = 0;
	        this.sectionStart = this.index + 1;
	      }
	    } else {
	      this.sequenceIndex = 0;
	      this.state = 23;
	      this.stateInDeclaration(c);
	    }
	  }
	  /**
	   * When we wait for one specific character, we can speed things up
	   * by skipping through the buffer until we find it.
	   *
	   * @returns Whether the character was found.
	   */
	  fastForwardTo(c) {
	    while (++this.index < this.buffer.length) {
	      const cc = this.buffer.charCodeAt(this.index);
	      if (cc === 10) {
	        this.newlines.push(this.index);
	      }
	      if (cc === c) {
	        return true;
	      }
	    }
	    this.index = this.buffer.length - 1;
	    return false;
	  }
	  /**
	   * Comments and CDATA end with `-->` and `]]>`.
	   *
	   * Their common qualities are:
	   * - Their end sequences have a distinct character they start with.
	   * - That character is then repeated, so we have to check multiple repeats.
	   * - All characters but the start character of the sequence can be skipped.
	   */
	  stateInCommentLike(c) {
	    if (c === this.currentSequence[this.sequenceIndex]) {
	      if (++this.sequenceIndex === this.currentSequence.length) {
	        if (this.currentSequence === Sequences.CdataEnd) {
	          this.cbs.oncdata(this.sectionStart, this.index - 2);
	        } else {
	          this.cbs.oncomment(this.sectionStart, this.index - 2);
	        }
	        this.sequenceIndex = 0;
	        this.sectionStart = this.index + 1;
	        this.state = 1;
	      }
	    } else if (this.sequenceIndex === 0) {
	      if (this.fastForwardTo(this.currentSequence[0])) {
	        this.sequenceIndex = 1;
	      }
	    } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
	      this.sequenceIndex = 0;
	    }
	  }
	  startSpecial(sequence, offset) {
	    this.enterRCDATA(sequence, offset);
	    this.state = 31;
	  }
	  enterRCDATA(sequence, offset) {
	    this.inRCDATA = true;
	    this.currentSequence = sequence;
	    this.sequenceIndex = offset;
	  }
	  stateBeforeTagName(c) {
	    if (c === 33) {
	      this.state = 22;
	      this.sectionStart = this.index + 1;
	    } else if (c === 63) {
	      this.state = 24;
	      this.sectionStart = this.index + 1;
	    } else if (isTagStartChar(c)) {
	      this.sectionStart = this.index;
	      if (this.mode === 0) {
	        this.state = 6;
	      } else if (this.inSFCRoot) {
	        this.state = 34;
	      } else if (!this.inXML) {
	        if (c === 116) {
	          this.state = 30;
	        } else {
	          this.state = c === 115 ? 29 : 6;
	        }
	      } else {
	        this.state = 6;
	      }
	    } else if (c === 47) {
	      this.state = 8;
	    } else {
	      this.state = 1;
	      this.stateText(c);
	    }
	  }
	  stateInTagName(c) {
	    if (isEndOfTagSection(c)) {
	      this.handleTagName(c);
	    }
	  }
	  stateInSFCRootTagName(c) {
	    if (isEndOfTagSection(c)) {
	      const tag = this.buffer.slice(this.sectionStart, this.index);
	      if (tag !== "template") {
	        this.enterRCDATA(toCharCodes(`</` + tag), 0);
	      }
	      this.handleTagName(c);
	    }
	  }
	  handleTagName(c) {
	    this.cbs.onopentagname(this.sectionStart, this.index);
	    this.sectionStart = -1;
	    this.state = 11;
	    this.stateBeforeAttrName(c);
	  }
	  stateBeforeClosingTagName(c) {
	    if (isWhitespace(c)) ; else if (c === 62) {
	      {
	        this.cbs.onerr(14, this.index);
	      }
	      this.state = 1;
	      this.sectionStart = this.index + 1;
	    } else {
	      this.state = isTagStartChar(c) ? 9 : 27;
	      this.sectionStart = this.index;
	    }
	  }
	  stateInClosingTagName(c) {
	    if (c === 62 || isWhitespace(c)) {
	      this.cbs.onclosetag(this.sectionStart, this.index);
	      this.sectionStart = -1;
	      this.state = 10;
	      this.stateAfterClosingTagName(c);
	    }
	  }
	  stateAfterClosingTagName(c) {
	    if (c === 62) {
	      this.state = 1;
	      this.sectionStart = this.index + 1;
	    }
	  }
	  stateBeforeAttrName(c) {
	    if (c === 62) {
	      this.cbs.onopentagend(this.index);
	      if (this.inRCDATA) {
	        this.state = 32;
	      } else {
	        this.state = 1;
	      }
	      this.sectionStart = this.index + 1;
	    } else if (c === 47) {
	      this.state = 7;
	      if (this.peek() !== 62) {
	        this.cbs.onerr(22, this.index);
	      }
	    } else if (c === 60 && this.peek() === 47) {
	      this.cbs.onopentagend(this.index);
	      this.state = 5;
	      this.sectionStart = this.index;
	    } else if (!isWhitespace(c)) {
	      if (c === 61) {
	        this.cbs.onerr(
	          19,
	          this.index
	        );
	      }
	      this.handleAttrStart(c);
	    }
	  }
	  handleAttrStart(c) {
	    if (c === 118 && this.peek() === 45) {
	      this.state = 13;
	      this.sectionStart = this.index;
	    } else if (c === 46 || c === 58 || c === 64 || c === 35) {
	      this.cbs.ondirname(this.index, this.index + 1);
	      this.state = 14;
	      this.sectionStart = this.index + 1;
	    } else {
	      this.state = 12;
	      this.sectionStart = this.index;
	    }
	  }
	  stateInSelfClosingTag(c) {
	    if (c === 62) {
	      this.cbs.onselfclosingtag(this.index);
	      this.state = 1;
	      this.sectionStart = this.index + 1;
	      this.inRCDATA = false;
	    } else if (!isWhitespace(c)) {
	      this.state = 11;
	      this.stateBeforeAttrName(c);
	    }
	  }
	  stateInAttrName(c) {
	    if (c === 61 || isEndOfTagSection(c)) {
	      this.cbs.onattribname(this.sectionStart, this.index);
	      this.handleAttrNameEnd(c);
	    } else if (c === 34 || c === 39 || c === 60) {
	      this.cbs.onerr(
	        17,
	        this.index
	      );
	    }
	  }
	  stateInDirName(c) {
	    if (c === 61 || isEndOfTagSection(c)) {
	      this.cbs.ondirname(this.sectionStart, this.index);
	      this.handleAttrNameEnd(c);
	    } else if (c === 58) {
	      this.cbs.ondirname(this.sectionStart, this.index);
	      this.state = 14;
	      this.sectionStart = this.index + 1;
	    } else if (c === 46) {
	      this.cbs.ondirname(this.sectionStart, this.index);
	      this.state = 16;
	      this.sectionStart = this.index + 1;
	    }
	  }
	  stateInDirArg(c) {
	    if (c === 61 || isEndOfTagSection(c)) {
	      this.cbs.ondirarg(this.sectionStart, this.index);
	      this.handleAttrNameEnd(c);
	    } else if (c === 91) {
	      this.state = 15;
	    } else if (c === 46) {
	      this.cbs.ondirarg(this.sectionStart, this.index);
	      this.state = 16;
	      this.sectionStart = this.index + 1;
	    }
	  }
	  stateInDynamicDirArg(c) {
	    if (c === 93) {
	      this.state = 14;
	    } else if (c === 61 || isEndOfTagSection(c)) {
	      this.cbs.ondirarg(this.sectionStart, this.index + 1);
	      this.handleAttrNameEnd(c);
	      {
	        this.cbs.onerr(
	          27,
	          this.index
	        );
	      }
	    }
	  }
	  stateInDirModifier(c) {
	    if (c === 61 || isEndOfTagSection(c)) {
	      this.cbs.ondirmodifier(this.sectionStart, this.index);
	      this.handleAttrNameEnd(c);
	    } else if (c === 46) {
	      this.cbs.ondirmodifier(this.sectionStart, this.index);
	      this.sectionStart = this.index + 1;
	    }
	  }
	  handleAttrNameEnd(c) {
	    this.sectionStart = this.index;
	    this.state = 17;
	    this.cbs.onattribnameend(this.index);
	    this.stateAfterAttrName(c);
	  }
	  stateAfterAttrName(c) {
	    if (c === 61) {
	      this.state = 18;
	    } else if (c === 47 || c === 62) {
	      this.cbs.onattribend(0, this.sectionStart);
	      this.sectionStart = -1;
	      this.state = 11;
	      this.stateBeforeAttrName(c);
	    } else if (!isWhitespace(c)) {
	      this.cbs.onattribend(0, this.sectionStart);
	      this.handleAttrStart(c);
	    }
	  }
	  stateBeforeAttrValue(c) {
	    if (c === 34) {
	      this.state = 19;
	      this.sectionStart = this.index + 1;
	    } else if (c === 39) {
	      this.state = 20;
	      this.sectionStart = this.index + 1;
	    } else if (!isWhitespace(c)) {
	      this.sectionStart = this.index;
	      this.state = 21;
	      this.stateInAttrValueNoQuotes(c);
	    }
	  }
	  handleInAttrValue(c, quote) {
	    if (c === quote || false) {
	      this.cbs.onattribdata(this.sectionStart, this.index);
	      this.sectionStart = -1;
	      this.cbs.onattribend(
	        quote === 34 ? 3 : 2,
	        this.index + 1
	      );
	      this.state = 11;
	    } else if (c === 38) {
	      this.startEntity();
	    }
	  }
	  stateInAttrValueDoubleQuotes(c) {
	    this.handleInAttrValue(c, 34);
	  }
	  stateInAttrValueSingleQuotes(c) {
	    this.handleInAttrValue(c, 39);
	  }
	  stateInAttrValueNoQuotes(c) {
	    if (isWhitespace(c) || c === 62) {
	      this.cbs.onattribdata(this.sectionStart, this.index);
	      this.sectionStart = -1;
	      this.cbs.onattribend(1, this.index);
	      this.state = 11;
	      this.stateBeforeAttrName(c);
	    } else if (c === 34 || c === 39 || c === 60 || c === 61 || c === 96) {
	      this.cbs.onerr(
	        18,
	        this.index
	      );
	    } else if (c === 38) {
	      this.startEntity();
	    }
	  }
	  stateBeforeDeclaration(c) {
	    if (c === 91) {
	      this.state = 26;
	      this.sequenceIndex = 0;
	    } else {
	      this.state = c === 45 ? 25 : 23;
	    }
	  }
	  stateInDeclaration(c) {
	    if (c === 62 || this.fastForwardTo(62)) {
	      this.state = 1;
	      this.sectionStart = this.index + 1;
	    }
	  }
	  stateInProcessingInstruction(c) {
	    if (c === 62 || this.fastForwardTo(62)) {
	      this.cbs.onprocessinginstruction(this.sectionStart, this.index);
	      this.state = 1;
	      this.sectionStart = this.index + 1;
	    }
	  }
	  stateBeforeComment(c) {
	    if (c === 45) {
	      this.state = 28;
	      this.currentSequence = Sequences.CommentEnd;
	      this.sequenceIndex = 2;
	      this.sectionStart = this.index + 1;
	    } else {
	      this.state = 23;
	    }
	  }
	  stateInSpecialComment(c) {
	    if (c === 62 || this.fastForwardTo(62)) {
	      this.cbs.oncomment(this.sectionStart, this.index);
	      this.state = 1;
	      this.sectionStart = this.index + 1;
	    }
	  }
	  stateBeforeSpecialS(c) {
	    if (c === Sequences.ScriptEnd[3]) {
	      this.startSpecial(Sequences.ScriptEnd, 4);
	    } else if (c === Sequences.StyleEnd[3]) {
	      this.startSpecial(Sequences.StyleEnd, 4);
	    } else {
	      this.state = 6;
	      this.stateInTagName(c);
	    }
	  }
	  stateBeforeSpecialT(c) {
	    if (c === Sequences.TitleEnd[3]) {
	      this.startSpecial(Sequences.TitleEnd, 4);
	    } else if (c === Sequences.TextareaEnd[3]) {
	      this.startSpecial(Sequences.TextareaEnd, 4);
	    } else {
	      this.state = 6;
	      this.stateInTagName(c);
	    }
	  }
	  startEntity() {
	    {
	      this.baseState = this.state;
	      this.state = 33;
	      this.entityStart = this.index;
	      this.entityDecoder.startEntity(
	        this.baseState === 1 || this.baseState === 32 ? decode_js.DecodingMode.Legacy : decode_js.DecodingMode.Attribute
	      );
	    }
	  }
	  stateInEntity() {
	    {
	      const length = this.entityDecoder.write(this.buffer, this.index);
	      if (length >= 0) {
	        this.state = this.baseState;
	        if (length === 0) {
	          this.index = this.entityStart;
	        }
	      } else {
	        this.index = this.buffer.length - 1;
	      }
	    }
	  }
	  /**
	   * Iterates through the buffer, calling the function corresponding to the current state.
	   *
	   * States that are more likely to be hit are higher up, as a performance improvement.
	   */
	  parse(input) {
	    this.buffer = input;
	    while (this.index < this.buffer.length) {
	      const c = this.buffer.charCodeAt(this.index);
	      if (c === 10 && this.state !== 33) {
	        this.newlines.push(this.index);
	      }
	      switch (this.state) {
	        case 1: {
	          this.stateText(c);
	          break;
	        }
	        case 2: {
	          this.stateInterpolationOpen(c);
	          break;
	        }
	        case 3: {
	          this.stateInterpolation(c);
	          break;
	        }
	        case 4: {
	          this.stateInterpolationClose(c);
	          break;
	        }
	        case 31: {
	          this.stateSpecialStartSequence(c);
	          break;
	        }
	        case 32: {
	          this.stateInRCDATA(c);
	          break;
	        }
	        case 26: {
	          this.stateCDATASequence(c);
	          break;
	        }
	        case 19: {
	          this.stateInAttrValueDoubleQuotes(c);
	          break;
	        }
	        case 12: {
	          this.stateInAttrName(c);
	          break;
	        }
	        case 13: {
	          this.stateInDirName(c);
	          break;
	        }
	        case 14: {
	          this.stateInDirArg(c);
	          break;
	        }
	        case 15: {
	          this.stateInDynamicDirArg(c);
	          break;
	        }
	        case 16: {
	          this.stateInDirModifier(c);
	          break;
	        }
	        case 28: {
	          this.stateInCommentLike(c);
	          break;
	        }
	        case 27: {
	          this.stateInSpecialComment(c);
	          break;
	        }
	        case 11: {
	          this.stateBeforeAttrName(c);
	          break;
	        }
	        case 6: {
	          this.stateInTagName(c);
	          break;
	        }
	        case 34: {
	          this.stateInSFCRootTagName(c);
	          break;
	        }
	        case 9: {
	          this.stateInClosingTagName(c);
	          break;
	        }
	        case 5: {
	          this.stateBeforeTagName(c);
	          break;
	        }
	        case 17: {
	          this.stateAfterAttrName(c);
	          break;
	        }
	        case 20: {
	          this.stateInAttrValueSingleQuotes(c);
	          break;
	        }
	        case 18: {
	          this.stateBeforeAttrValue(c);
	          break;
	        }
	        case 8: {
	          this.stateBeforeClosingTagName(c);
	          break;
	        }
	        case 10: {
	          this.stateAfterClosingTagName(c);
	          break;
	        }
	        case 29: {
	          this.stateBeforeSpecialS(c);
	          break;
	        }
	        case 30: {
	          this.stateBeforeSpecialT(c);
	          break;
	        }
	        case 21: {
	          this.stateInAttrValueNoQuotes(c);
	          break;
	        }
	        case 7: {
	          this.stateInSelfClosingTag(c);
	          break;
	        }
	        case 23: {
	          this.stateInDeclaration(c);
	          break;
	        }
	        case 22: {
	          this.stateBeforeDeclaration(c);
	          break;
	        }
	        case 25: {
	          this.stateBeforeComment(c);
	          break;
	        }
	        case 24: {
	          this.stateInProcessingInstruction(c);
	          break;
	        }
	        case 33: {
	          this.stateInEntity();
	          break;
	        }
	      }
	      this.index++;
	    }
	    this.cleanup();
	    this.finish();
	  }
	  /**
	   * Remove data that has already been consumed from the buffer.
	   */
	  cleanup() {
	    if (this.sectionStart !== this.index) {
	      if (this.state === 1 || this.state === 32 && this.sequenceIndex === 0) {
	        this.cbs.ontext(this.sectionStart, this.index);
	        this.sectionStart = this.index;
	      } else if (this.state === 19 || this.state === 20 || this.state === 21) {
	        this.cbs.onattribdata(this.sectionStart, this.index);
	        this.sectionStart = this.index;
	      }
	    }
	  }
	  finish() {
	    if (this.state === 33) {
	      this.entityDecoder.end();
	      this.state = this.baseState;
	    }
	    this.handleTrailingData();
	    this.cbs.onend();
	  }
	  /** Handle any trailing data. */
	  handleTrailingData() {
	    const endIndex = this.buffer.length;
	    if (this.sectionStart >= endIndex) {
	      return;
	    }
	    if (this.state === 28) {
	      if (this.currentSequence === Sequences.CdataEnd) {
	        this.cbs.oncdata(this.sectionStart, endIndex);
	      } else {
	        this.cbs.oncomment(this.sectionStart, endIndex);
	      }
	    } else if (this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9) ; else {
	      this.cbs.ontext(this.sectionStart, endIndex);
	    }
	  }
	  emitCodePoint(cp, consumed) {
	    {
	      if (this.baseState !== 1 && this.baseState !== 32) {
	        if (this.sectionStart < this.entityStart) {
	          this.cbs.onattribdata(this.sectionStart, this.entityStart);
	        }
	        this.sectionStart = this.entityStart + consumed;
	        this.index = this.sectionStart - 1;
	        this.cbs.onattribentity(
	          decode_js.fromCodePoint(cp),
	          this.entityStart,
	          this.sectionStart
	        );
	      } else {
	        if (this.sectionStart < this.entityStart) {
	          this.cbs.ontext(this.sectionStart, this.entityStart);
	        }
	        this.sectionStart = this.entityStart + consumed;
	        this.index = this.sectionStart - 1;
	        this.cbs.ontextentity(
	          decode_js.fromCodePoint(cp),
	          this.entityStart,
	          this.sectionStart
	        );
	      }
	    }
	  }
	}

	const CompilerDeprecationTypes = {
	  "COMPILER_IS_ON_ELEMENT": "COMPILER_IS_ON_ELEMENT",
	  "COMPILER_V_BIND_SYNC": "COMPILER_V_BIND_SYNC",
	  "COMPILER_V_BIND_OBJECT_ORDER": "COMPILER_V_BIND_OBJECT_ORDER",
	  "COMPILER_V_ON_NATIVE": "COMPILER_V_ON_NATIVE",
	  "COMPILER_V_IF_V_FOR_PRECEDENCE": "COMPILER_V_IF_V_FOR_PRECEDENCE",
	  "COMPILER_NATIVE_TEMPLATE": "COMPILER_NATIVE_TEMPLATE",
	  "COMPILER_INLINE_TEMPLATE": "COMPILER_INLINE_TEMPLATE",
	  "COMPILER_FILTERS": "COMPILER_FILTERS"
	};
	const deprecationData = {
	  ["COMPILER_IS_ON_ELEMENT"]: {
	    message: `Platform-native elements with "is" prop will no longer be treated as components in Vue 3 unless the "is" value is explicitly prefixed with "vue:".`,
	    link: `https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html`
	  },
	  ["COMPILER_V_BIND_SYNC"]: {
	    message: (key) => `.sync modifier for v-bind has been removed. Use v-model with argument instead. \`v-bind:${key}.sync\` should be changed to \`v-model:${key}\`.`,
	    link: `https://v3-migration.vuejs.org/breaking-changes/v-model.html`
	  },
	  ["COMPILER_V_BIND_OBJECT_ORDER"]: {
	    message: `v-bind="obj" usage is now order sensitive and behaves like JavaScript object spread: it will now overwrite an existing non-mergeable attribute that appears before v-bind in the case of conflict. To retain 2.x behavior, move v-bind to make it the first attribute. You can also suppress this warning if the usage is intended.`,
	    link: `https://v3-migration.vuejs.org/breaking-changes/v-bind.html`
	  },
	  ["COMPILER_V_ON_NATIVE"]: {
	    message: `.native modifier for v-on has been removed as is no longer necessary.`,
	    link: `https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html`
	  },
	  ["COMPILER_V_IF_V_FOR_PRECEDENCE"]: {
	    message: `v-if / v-for precedence when used on the same element has changed in Vue 3: v-if now takes higher precedence and will no longer have access to v-for scope variables. It is best to avoid the ambiguity with <template> tags or use a computed property that filters v-for data source.`,
	    link: `https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html`
	  },
	  ["COMPILER_NATIVE_TEMPLATE"]: {
	    message: `<template> with no special directives will render as a native template element instead of its inner content in Vue 3.`
	  },
	  ["COMPILER_INLINE_TEMPLATE"]: {
	    message: `"inline-template" has been removed in Vue 3.`,
	    link: `https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html`
	  },
	  ["COMPILER_FILTERS"]: {
	    message: `filters have been removed in Vue 3. The "|" symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.`,
	    link: `https://v3-migration.vuejs.org/breaking-changes/filters.html`
	  }
	};
	function getCompatValue(key, { compatConfig }) {
	  const value = compatConfig && compatConfig[key];
	  if (key === "MODE") {
	    return value || 3;
	  } else {
	    return value;
	  }
	}
	function isCompatEnabled(key, context) {
	  const mode = getCompatValue("MODE", context);
	  const value = getCompatValue(key, context);
	  return mode === 3 ? value === true : value !== false;
	}
	function checkCompatEnabled(key, context, loc, ...args) {
	  const enabled = isCompatEnabled(key, context);
	  return enabled;
	}
	function warnDeprecation(key, context, loc, ...args) {
	  const val = getCompatValue(key, context);
	  if (val === "suppress-warning") {
	    return;
	  }
	  const { message, link } = deprecationData[key];
	  const msg = `(deprecation ${key}) ${typeof message === "function" ? message(...args) : message}${link ? `
  Details: ${link}` : ``}`;
	  const err = new SyntaxError(msg);
	  err.code = key;
	  if (loc) err.loc = loc;
	  context.onWarn(err);
	}

	function defaultOnError(error) {
	  throw error;
	}
	function defaultOnWarn(msg) {
	}
	function createCompilerError(code, loc, messages, additionalMessage) {
	  const msg = (messages || errorMessages)[code] + (additionalMessage || ``) ;
	  const error = new SyntaxError(String(msg));
	  error.code = code;
	  error.loc = loc;
	  return error;
	}
	const ErrorCodes = {
	  "ABRUPT_CLOSING_OF_EMPTY_COMMENT": 0,
	  "0": "ABRUPT_CLOSING_OF_EMPTY_COMMENT",
	  "CDATA_IN_HTML_CONTENT": 1,
	  "1": "CDATA_IN_HTML_CONTENT",
	  "DUPLICATE_ATTRIBUTE": 2,
	  "2": "DUPLICATE_ATTRIBUTE",
	  "END_TAG_WITH_ATTRIBUTES": 3,
	  "3": "END_TAG_WITH_ATTRIBUTES",
	  "END_TAG_WITH_TRAILING_SOLIDUS": 4,
	  "4": "END_TAG_WITH_TRAILING_SOLIDUS",
	  "EOF_BEFORE_TAG_NAME": 5,
	  "5": "EOF_BEFORE_TAG_NAME",
	  "EOF_IN_CDATA": 6,
	  "6": "EOF_IN_CDATA",
	  "EOF_IN_COMMENT": 7,
	  "7": "EOF_IN_COMMENT",
	  "EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT": 8,
	  "8": "EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT",
	  "EOF_IN_TAG": 9,
	  "9": "EOF_IN_TAG",
	  "INCORRECTLY_CLOSED_COMMENT": 10,
	  "10": "INCORRECTLY_CLOSED_COMMENT",
	  "INCORRECTLY_OPENED_COMMENT": 11,
	  "11": "INCORRECTLY_OPENED_COMMENT",
	  "INVALID_FIRST_CHARACTER_OF_TAG_NAME": 12,
	  "12": "INVALID_FIRST_CHARACTER_OF_TAG_NAME",
	  "MISSING_ATTRIBUTE_VALUE": 13,
	  "13": "MISSING_ATTRIBUTE_VALUE",
	  "MISSING_END_TAG_NAME": 14,
	  "14": "MISSING_END_TAG_NAME",
	  "MISSING_WHITESPACE_BETWEEN_ATTRIBUTES": 15,
	  "15": "MISSING_WHITESPACE_BETWEEN_ATTRIBUTES",
	  "NESTED_COMMENT": 16,
	  "16": "NESTED_COMMENT",
	  "UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME": 17,
	  "17": "UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME",
	  "UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE": 18,
	  "18": "UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE",
	  "UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME": 19,
	  "19": "UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME",
	  "UNEXPECTED_NULL_CHARACTER": 20,
	  "20": "UNEXPECTED_NULL_CHARACTER",
	  "UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME": 21,
	  "21": "UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME",
	  "UNEXPECTED_SOLIDUS_IN_TAG": 22,
	  "22": "UNEXPECTED_SOLIDUS_IN_TAG",
	  "X_INVALID_END_TAG": 23,
	  "23": "X_INVALID_END_TAG",
	  "X_MISSING_END_TAG": 24,
	  "24": "X_MISSING_END_TAG",
	  "X_MISSING_INTERPOLATION_END": 25,
	  "25": "X_MISSING_INTERPOLATION_END",
	  "X_MISSING_DIRECTIVE_NAME": 26,
	  "26": "X_MISSING_DIRECTIVE_NAME",
	  "X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END": 27,
	  "27": "X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END",
	  "X_V_IF_NO_EXPRESSION": 28,
	  "28": "X_V_IF_NO_EXPRESSION",
	  "X_V_IF_SAME_KEY": 29,
	  "29": "X_V_IF_SAME_KEY",
	  "X_V_ELSE_NO_ADJACENT_IF": 30,
	  "30": "X_V_ELSE_NO_ADJACENT_IF",
	  "X_V_FOR_NO_EXPRESSION": 31,
	  "31": "X_V_FOR_NO_EXPRESSION",
	  "X_V_FOR_MALFORMED_EXPRESSION": 32,
	  "32": "X_V_FOR_MALFORMED_EXPRESSION",
	  "X_V_FOR_TEMPLATE_KEY_PLACEMENT": 33,
	  "33": "X_V_FOR_TEMPLATE_KEY_PLACEMENT",
	  "X_V_BIND_NO_EXPRESSION": 34,
	  "34": "X_V_BIND_NO_EXPRESSION",
	  "X_V_ON_NO_EXPRESSION": 35,
	  "35": "X_V_ON_NO_EXPRESSION",
	  "X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET": 36,
	  "36": "X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET",
	  "X_V_SLOT_MIXED_SLOT_USAGE": 37,
	  "37": "X_V_SLOT_MIXED_SLOT_USAGE",
	  "X_V_SLOT_DUPLICATE_SLOT_NAMES": 38,
	  "38": "X_V_SLOT_DUPLICATE_SLOT_NAMES",
	  "X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN": 39,
	  "39": "X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN",
	  "X_V_SLOT_MISPLACED": 40,
	  "40": "X_V_SLOT_MISPLACED",
	  "X_V_MODEL_NO_EXPRESSION": 41,
	  "41": "X_V_MODEL_NO_EXPRESSION",
	  "X_V_MODEL_MALFORMED_EXPRESSION": 42,
	  "42": "X_V_MODEL_MALFORMED_EXPRESSION",
	  "X_V_MODEL_ON_SCOPE_VARIABLE": 43,
	  "43": "X_V_MODEL_ON_SCOPE_VARIABLE",
	  "X_V_MODEL_ON_PROPS": 44,
	  "44": "X_V_MODEL_ON_PROPS",
	  "X_INVALID_EXPRESSION": 45,
	  "45": "X_INVALID_EXPRESSION",
	  "X_KEEP_ALIVE_INVALID_CHILDREN": 46,
	  "46": "X_KEEP_ALIVE_INVALID_CHILDREN",
	  "X_PREFIX_ID_NOT_SUPPORTED": 47,
	  "47": "X_PREFIX_ID_NOT_SUPPORTED",
	  "X_MODULE_MODE_NOT_SUPPORTED": 48,
	  "48": "X_MODULE_MODE_NOT_SUPPORTED",
	  "X_CACHE_HANDLER_NOT_SUPPORTED": 49,
	  "49": "X_CACHE_HANDLER_NOT_SUPPORTED",
	  "X_SCOPE_ID_NOT_SUPPORTED": 50,
	  "50": "X_SCOPE_ID_NOT_SUPPORTED",
	  "X_VNODE_HOOKS": 51,
	  "51": "X_VNODE_HOOKS",
	  "X_V_BIND_INVALID_SAME_NAME_ARGUMENT": 52,
	  "52": "X_V_BIND_INVALID_SAME_NAME_ARGUMENT",
	  "__EXTEND_POINT__": 53,
	  "53": "__EXTEND_POINT__"
	};
	const errorMessages = {
	  // parse errors
	  [0]: "Illegal comment.",
	  [1]: "CDATA section is allowed only in XML context.",
	  [2]: "Duplicate attribute.",
	  [3]: "End tag cannot have attributes.",
	  [4]: "Illegal '/' in tags.",
	  [5]: "Unexpected EOF in tag.",
	  [6]: "Unexpected EOF in CDATA section.",
	  [7]: "Unexpected EOF in comment.",
	  [8]: "Unexpected EOF in script.",
	  [9]: "Unexpected EOF in tag.",
	  [10]: "Incorrectly closed comment.",
	  [11]: "Incorrectly opened comment.",
	  [12]: "Illegal tag name. Use '&lt;' to print '<'.",
	  [13]: "Attribute value was expected.",
	  [14]: "End tag name was expected.",
	  [15]: "Whitespace was expected.",
	  [16]: "Unexpected '<!--' in comment.",
	  [17]: `Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).`,
	  [18]: "Unquoted attribute value cannot contain U+0022 (\"), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (`).",
	  [19]: "Attribute name cannot start with '='.",
	  [21]: "'<?' is allowed only in XML context.",
	  [20]: `Unexpected null character.`,
	  [22]: "Illegal '/' in tags.",
	  // Vue-specific parse errors
	  [23]: "Invalid end tag.",
	  [24]: "Element is missing end tag.",
	  [25]: "Interpolation end sign was not found.",
	  [27]: "End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.",
	  [26]: "Legal directive name was expected.",
	  // transform errors
	  [28]: `v-if/v-else-if is missing expression.`,
	  [29]: `v-if/else branches must use unique keys.`,
	  [30]: `v-else/v-else-if has no adjacent v-if or v-else-if.`,
	  [31]: `v-for is missing expression.`,
	  [32]: `v-for has invalid expression.`,
	  [33]: `<template v-for> key should be placed on the <template> tag.`,
	  [34]: `v-bind is missing expression.`,
	  [52]: `v-bind with same-name shorthand only allows static argument.`,
	  [35]: `v-on is missing expression.`,
	  [36]: `Unexpected custom directive on <slot> outlet.`,
	  [37]: `Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.`,
	  [38]: `Duplicate slot names found. `,
	  [39]: `Extraneous children found when component already has explicitly named default slot. These children will be ignored.`,
	  [40]: `v-slot can only be used on components or <template> tags.`,
	  [41]: `v-model is missing expression.`,
	  [42]: `v-model value must be a valid JavaScript member expression.`,
	  [43]: `v-model cannot be used on v-for or v-slot scope variables because they are not writable.`,
	  [44]: `v-model cannot be used on a prop, because local prop bindings are not writable.
Use a v-bind binding combined with a v-on listener that emits update:x event instead.`,
	  [45]: `Error parsing JavaScript expression: `,
	  [46]: `<KeepAlive> expects exactly one child component.`,
	  [51]: `@vnode-* hooks in templates are no longer supported. Use the vue: prefix instead. For example, @vnode-mounted should be changed to @vue:mounted. @vnode-* hooks support has been removed in 3.4.`,
	  // generic errors
	  [47]: `"prefixIdentifiers" option is not supported in this build of compiler.`,
	  [48]: `ES module mode is not supported in this build of compiler.`,
	  [49]: `"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.`,
	  [50]: `"scopeId" option is only supported in module mode.`,
	  // just to fulfill types
	  [53]: ``
	};

	function walkIdentifiers(root, onIdentifier, includeAll = false, parentStack = [], knownIds = /* @__PURE__ */ Object.create(null)) {
	  const rootExp = root.type === "Program" ? root.body[0].type === "ExpressionStatement" && root.body[0].expression : root;
	  estreeWalker.walk(root, {
	    enter(node, parent) {
	      parent && parentStack.push(parent);
	      if (parent && parent.type.startsWith("TS") && !TS_NODE_TYPES.includes(parent.type)) {
	        return this.skip();
	      }
	      if (node.type === "Identifier") {
	        const isLocal = !!knownIds[node.name];
	        const isRefed = isReferencedIdentifier(node, parent, parentStack);
	        if (includeAll || isRefed && !isLocal) {
	          onIdentifier(node, parent, parentStack, isRefed, isLocal);
	        }
	      } else if (node.type === "ObjectProperty" && // eslint-disable-next-line no-restricted-syntax
	      (parent == null ? void 0 : parent.type) === "ObjectPattern") {
	        node.inPattern = true;
	      } else if (isFunctionType(node)) {
	        if (node.scopeIds) {
	          node.scopeIds.forEach((id) => markKnownIds(id, knownIds));
	        } else {
	          walkFunctionParams(
	            node,
	            (id) => markScopeIdentifier(node, id, knownIds)
	          );
	        }
	      } else if (node.type === "BlockStatement") {
	        if (node.scopeIds) {
	          node.scopeIds.forEach((id) => markKnownIds(id, knownIds));
	        } else {
	          walkBlockDeclarations(
	            node,
	            (id) => markScopeIdentifier(node, id, knownIds)
	          );
	        }
	      } else if (node.type === "CatchClause" && node.param) {
	        for (const id of extractIdentifiers(node.param)) {
	          markScopeIdentifier(node, id, knownIds);
	        }
	      } else if (isForStatement(node)) {
	        walkForStatement(
	          node,
	          false,
	          (id) => markScopeIdentifier(node, id, knownIds)
	        );
	      }
	    },
	    leave(node, parent) {
	      parent && parentStack.pop();
	      if (node !== rootExp && node.scopeIds) {
	        for (const id of node.scopeIds) {
	          knownIds[id]--;
	          if (knownIds[id] === 0) {
	            delete knownIds[id];
	          }
	        }
	      }
	    }
	  });
	}
	function isReferencedIdentifier(id, parent, parentStack) {
	  if (!parent) {
	    return true;
	  }
	  if (id.name === "arguments") {
	    return false;
	  }
	  if (isReferenced(id, parent, parentStack[parentStack.length - 2])) {
	    return true;
	  }
	  switch (parent.type) {
	    case "AssignmentExpression":
	    case "AssignmentPattern":
	      return true;
	    case "ObjectProperty":
	      return parent.key !== id && isInDestructureAssignment(parent, parentStack);
	    case "ArrayPattern":
	      return isInDestructureAssignment(parent, parentStack);
	  }
	  return false;
	}
	function isInDestructureAssignment(parent, parentStack) {
	  if (parent && (parent.type === "ObjectProperty" || parent.type === "ArrayPattern")) {
	    let i = parentStack.length;
	    while (i--) {
	      const p = parentStack[i];
	      if (p.type === "AssignmentExpression") {
	        return true;
	      } else if (p.type !== "ObjectProperty" && !p.type.endsWith("Pattern")) {
	        break;
	      }
	    }
	  }
	  return false;
	}
	function isInNewExpression(parentStack) {
	  let i = parentStack.length;
	  while (i--) {
	    const p = parentStack[i];
	    if (p.type === "NewExpression") {
	      return true;
	    } else if (p.type !== "MemberExpression") {
	      break;
	    }
	  }
	  return false;
	}
	function walkFunctionParams(node, onIdent) {
	  for (const p of node.params) {
	    for (const id of extractIdentifiers(p)) {
	      onIdent(id);
	    }
	  }
	}
	function walkBlockDeclarations(block, onIdent) {
	  for (const stmt of block.body) {
	    if (stmt.type === "VariableDeclaration") {
	      if (stmt.declare) continue;
	      for (const decl of stmt.declarations) {
	        for (const id of extractIdentifiers(decl.id)) {
	          onIdent(id);
	        }
	      }
	    } else if (stmt.type === "FunctionDeclaration" || stmt.type === "ClassDeclaration") {
	      if (stmt.declare || !stmt.id) continue;
	      onIdent(stmt.id);
	    } else if (isForStatement(stmt)) {
	      walkForStatement(stmt, true, onIdent);
	    }
	  }
	}
	function isForStatement(stmt) {
	  return stmt.type === "ForOfStatement" || stmt.type === "ForInStatement" || stmt.type === "ForStatement";
	}
	function walkForStatement(stmt, isVar, onIdent) {
	  const variable = stmt.type === "ForStatement" ? stmt.init : stmt.left;
	  if (variable && variable.type === "VariableDeclaration" && (variable.kind === "var" ? isVar : !isVar)) {
	    for (const decl of variable.declarations) {
	      for (const id of extractIdentifiers(decl.id)) {
	        onIdent(id);
	      }
	    }
	  }
	}
	function extractIdentifiers(param, nodes = []) {
	  switch (param.type) {
	    case "Identifier":
	      nodes.push(param);
	      break;
	    case "MemberExpression":
	      let object = param;
	      while (object.type === "MemberExpression") {
	        object = object.object;
	      }
	      nodes.push(object);
	      break;
	    case "ObjectPattern":
	      for (const prop of param.properties) {
	        if (prop.type === "RestElement") {
	          extractIdentifiers(prop.argument, nodes);
	        } else {
	          extractIdentifiers(prop.value, nodes);
	        }
	      }
	      break;
	    case "ArrayPattern":
	      param.elements.forEach((element) => {
	        if (element) extractIdentifiers(element, nodes);
	      });
	      break;
	    case "RestElement":
	      extractIdentifiers(param.argument, nodes);
	      break;
	    case "AssignmentPattern":
	      extractIdentifiers(param.left, nodes);
	      break;
	  }
	  return nodes;
	}
	function markKnownIds(name, knownIds) {
	  if (name in knownIds) {
	    knownIds[name]++;
	  } else {
	    knownIds[name] = 1;
	  }
	}
	function markScopeIdentifier(node, child, knownIds) {
	  const { name } = child;
	  if (node.scopeIds && node.scopeIds.has(name)) {
	    return;
	  }
	  markKnownIds(name, knownIds);
	  (node.scopeIds || (node.scopeIds = /* @__PURE__ */ new Set())).add(name);
	}
	const isFunctionType = (node) => {
	  return /Function(?:Expression|Declaration)$|Method$/.test(node.type);
	};
	const isStaticProperty = (node) => node && (node.type === "ObjectProperty" || node.type === "ObjectMethod") && !node.computed;
	const isStaticPropertyKey = (node, parent) => isStaticProperty(parent) && parent.key === node;
	function isReferenced(node, parent, grandparent) {
	  switch (parent.type) {
	    // yes: PARENT[NODE]
	    // yes: NODE.child
	    // no: parent.NODE
	    case "MemberExpression":
	    case "OptionalMemberExpression":
	      if (parent.property === node) {
	        return !!parent.computed;
	      }
	      return parent.object === node;
	    case "JSXMemberExpression":
	      return parent.object === node;
	    // no: let NODE = init;
	    // yes: let id = NODE;
	    case "VariableDeclarator":
	      return parent.init === node;
	    // yes: () => NODE
	    // no: (NODE) => {}
	    case "ArrowFunctionExpression":
	      return parent.body === node;
	    // no: class { #NODE; }
	    // no: class { get #NODE() {} }
	    // no: class { #NODE() {} }
	    // no: class { fn() { return this.#NODE; } }
	    case "PrivateName":
	      return false;
	    // no: class { NODE() {} }
	    // yes: class { [NODE]() {} }
	    // no: class { foo(NODE) {} }
	    case "ClassMethod":
	    case "ClassPrivateMethod":
	    case "ObjectMethod":
	      if (parent.key === node) {
	        return !!parent.computed;
	      }
	      return false;
	    // yes: { [NODE]: "" }
	    // no: { NODE: "" }
	    // depends: { NODE }
	    // depends: { key: NODE }
	    case "ObjectProperty":
	      if (parent.key === node) {
	        return !!parent.computed;
	      }
	      return !grandparent || grandparent.type !== "ObjectPattern";
	    // no: class { NODE = value; }
	    // yes: class { [NODE] = value; }
	    // yes: class { key = NODE; }
	    case "ClassProperty":
	      if (parent.key === node) {
	        return !!parent.computed;
	      }
	      return true;
	    case "ClassPrivateProperty":
	      return parent.key !== node;
	    // no: class NODE {}
	    // yes: class Foo extends NODE {}
	    case "ClassDeclaration":
	    case "ClassExpression":
	      return parent.superClass === node;
	    // yes: left = NODE;
	    // no: NODE = right;
	    case "AssignmentExpression":
	      return parent.right === node;
	    // no: [NODE = foo] = [];
	    // yes: [foo = NODE] = [];
	    case "AssignmentPattern":
	      return parent.right === node;
	    // no: NODE: for (;;) {}
	    case "LabeledStatement":
	      return false;
	    // no: try {} catch (NODE) {}
	    case "CatchClause":
	      return false;
	    // no: function foo(...NODE) {}
	    case "RestElement":
	      return false;
	    case "BreakStatement":
	    case "ContinueStatement":
	      return false;
	    // no: function NODE() {}
	    // no: function foo(NODE) {}
	    case "FunctionDeclaration":
	    case "FunctionExpression":
	      return false;
	    // no: export NODE from "foo";
	    // no: export * as NODE from "foo";
	    case "ExportNamespaceSpecifier":
	    case "ExportDefaultSpecifier":
	      return false;
	    // no: export { foo as NODE };
	    // yes: export { NODE as foo };
	    // no: export { NODE as foo } from "foo";
	    case "ExportSpecifier":
	      if (grandparent == null ? void 0 : grandparent.source) {
	        return false;
	      }
	      return parent.local === node;
	    // no: import NODE from "foo";
	    // no: import * as NODE from "foo";
	    // no: import { NODE as foo } from "foo";
	    // no: import { foo as NODE } from "foo";
	    // no: import NODE from "bar";
	    case "ImportDefaultSpecifier":
	    case "ImportNamespaceSpecifier":
	    case "ImportSpecifier":
	      return false;
	    // no: import "foo" assert { NODE: "json" }
	    case "ImportAttribute":
	      return false;
	    // no: <div NODE="foo" />
	    case "JSXAttribute":
	      return false;
	    // no: [NODE] = [];
	    // no: ({ NODE }) = [];
	    case "ObjectPattern":
	    case "ArrayPattern":
	      return false;
	    // no: new.NODE
	    // no: NODE.target
	    case "MetaProperty":
	      return false;
	    // yes: type X = { someProperty: NODE }
	    // no: type X = { NODE: OtherType }
	    case "ObjectTypeProperty":
	      return parent.key !== node;
	    // yes: enum X { Foo = NODE }
	    // no: enum X { NODE }
	    case "TSEnumMember":
	      return parent.id !== node;
	    // yes: { [NODE]: value }
	    // no: { NODE: value }
	    case "TSPropertySignature":
	      if (parent.key === node) {
	        return !!parent.computed;
	      }
	      return true;
	  }
	  return true;
	}
	const TS_NODE_TYPES = [
	  "TSAsExpression",
	  // foo as number
	  "TSTypeAssertion",
	  // (<number>foo)
	  "TSNonNullExpression",
	  // foo!
	  "TSInstantiationExpression",
	  // foo<string>
	  "TSSatisfiesExpression"
	  // foo satisfies T
	];
	function unwrapTSNode(node) {
	  if (TS_NODE_TYPES.includes(node.type)) {
	    return unwrapTSNode(node.expression);
	  } else {
	    return node;
	  }
	}

	const isStaticExp = (p) => p.type === 4 && p.isStatic;
	function isCoreComponent(tag) {
	  switch (tag) {
	    case "Teleport":
	    case "teleport":
	      return TELEPORT;
	    case "Suspense":
	    case "suspense":
	      return SUSPENSE;
	    case "KeepAlive":
	    case "keep-alive":
	      return KEEP_ALIVE;
	    case "BaseTransition":
	    case "base-transition":
	      return BASE_TRANSITION;
	  }
	}
	const nonIdentifierRE = /^$|^\d|[^\$\w\xA0-\uFFFF]/;
	const isSimpleIdentifier = (name) => !nonIdentifierRE.test(name);
	const validFirstIdentCharRE = /[A-Za-z_$\xA0-\uFFFF]/;
	const validIdentCharRE = /[\.\?\w$\xA0-\uFFFF]/;
	const whitespaceRE = /\s+[.[]\s*|\s*[.[]\s+/g;
	const getExpSource = (exp) => exp.type === 4 ? exp.content : exp.loc.source;
	const isMemberExpressionBrowser = (exp) => {
	  const path = getExpSource(exp).trim().replace(whitespaceRE, (s) => s.trim());
	  let state = 0 /* inMemberExp */;
	  let stateStack = [];
	  let currentOpenBracketCount = 0;
	  let currentOpenParensCount = 0;
	  let currentStringType = null;
	  for (let i = 0; i < path.length; i++) {
	    const char = path.charAt(i);
	    switch (state) {
	      case 0 /* inMemberExp */:
	        if (char === "[") {
	          stateStack.push(state);
	          state = 1 /* inBrackets */;
	          currentOpenBracketCount++;
	        } else if (char === "(") {
	          stateStack.push(state);
	          state = 2 /* inParens */;
	          currentOpenParensCount++;
	        } else if (!(i === 0 ? validFirstIdentCharRE : validIdentCharRE).test(char)) {
	          return false;
	        }
	        break;
	      case 1 /* inBrackets */:
	        if (char === `'` || char === `"` || char === "`") {
	          stateStack.push(state);
	          state = 3 /* inString */;
	          currentStringType = char;
	        } else if (char === `[`) {
	          currentOpenBracketCount++;
	        } else if (char === `]`) {
	          if (!--currentOpenBracketCount) {
	            state = stateStack.pop();
	          }
	        }
	        break;
	      case 2 /* inParens */:
	        if (char === `'` || char === `"` || char === "`") {
	          stateStack.push(state);
	          state = 3 /* inString */;
	          currentStringType = char;
	        } else if (char === `(`) {
	          currentOpenParensCount++;
	        } else if (char === `)`) {
	          if (i === path.length - 1) {
	            return false;
	          }
	          if (!--currentOpenParensCount) {
	            state = stateStack.pop();
	          }
	        }
	        break;
	      case 3 /* inString */:
	        if (char === currentStringType) {
	          state = stateStack.pop();
	          currentStringType = null;
	        }
	        break;
	    }
	  }
	  return !currentOpenBracketCount && !currentOpenParensCount;
	};
	const isMemberExpressionNode = (exp, context) => {
	  try {
	    let ret = exp.ast || parser.parseExpression(getExpSource(exp), {
	      plugins: context.expressionPlugins ? [...context.expressionPlugins, "typescript"] : ["typescript"]
	    });
	    ret = unwrapTSNode(ret);
	    return ret.type === "MemberExpression" || ret.type === "OptionalMemberExpression" || ret.type === "Identifier" && ret.name !== "undefined";
	  } catch (e) {
	    return false;
	  }
	};
	const isMemberExpression = isMemberExpressionNode;
	const fnExpRE = /^\s*(async\s*)?(\([^)]*?\)|[\w$_]+)\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/;
	const isFnExpressionBrowser = (exp) => fnExpRE.test(getExpSource(exp));
	const isFnExpressionNode = (exp, context) => {
	  try {
	    let ret = exp.ast || parser.parseExpression(getExpSource(exp), {
	      plugins: context.expressionPlugins ? [...context.expressionPlugins, "typescript"] : ["typescript"]
	    });
	    if (ret.type === "Program") {
	      ret = ret.body[0];
	      if (ret.type === "ExpressionStatement") {
	        ret = ret.expression;
	      }
	    }
	    ret = unwrapTSNode(ret);
	    return ret.type === "FunctionExpression" || ret.type === "ArrowFunctionExpression";
	  } catch (e) {
	    return false;
	  }
	};
	const isFnExpression = isFnExpressionNode;
	function advancePositionWithClone(pos, source, numberOfCharacters = source.length) {
	  return advancePositionWithMutation(
	    {
	      offset: pos.offset,
	      line: pos.line,
	      column: pos.column
	    },
	    source,
	    numberOfCharacters
	  );
	}
	function advancePositionWithMutation(pos, source, numberOfCharacters = source.length) {
	  let linesCount = 0;
	  let lastNewLinePos = -1;
	  for (let i = 0; i < numberOfCharacters; i++) {
	    if (source.charCodeAt(i) === 10) {
	      linesCount++;
	      lastNewLinePos = i;
	    }
	  }
	  pos.offset += numberOfCharacters;
	  pos.line += linesCount;
	  pos.column = lastNewLinePos === -1 ? pos.column + numberOfCharacters : numberOfCharacters - lastNewLinePos;
	  return pos;
	}
	function assert(condition, msg) {
	  if (!condition) {
	    throw new Error(msg || `unexpected compiler condition`);
	  }
	}
	function findDir(node, name, allowEmpty = false) {
	  for (let i = 0; i < node.props.length; i++) {
	    const p = node.props[i];
	    if (p.type === 7 && (allowEmpty || p.exp) && (shared.isString(name) ? p.name === name : name.test(p.name))) {
	      return p;
	    }
	  }
	}
	function findProp(node, name, dynamicOnly = false, allowEmpty = false) {
	  for (let i = 0; i < node.props.length; i++) {
	    const p = node.props[i];
	    if (p.type === 6) {
	      if (dynamicOnly) continue;
	      if (p.name === name && (p.value || allowEmpty)) {
	        return p;
	      }
	    } else if (p.name === "bind" && (p.exp || allowEmpty) && isStaticArgOf(p.arg, name)) {
	      return p;
	    }
	  }
	}
	function isStaticArgOf(arg, name) {
	  return !!(arg && isStaticExp(arg) && arg.content === name);
	}
	function hasDynamicKeyVBind(node) {
	  return node.props.some(
	    (p) => p.type === 7 && p.name === "bind" && (!p.arg || // v-bind="obj"
	    p.arg.type !== 4 || // v-bind:[_ctx.foo]
	    !p.arg.isStatic)
	    // v-bind:[foo]
	  );
	}
	function isText$1(node) {
	  return node.type === 5 || node.type === 2;
	}
	function isVPre(p) {
	  return p.type === 7 && p.name === "pre";
	}
	function isVSlot(p) {
	  return p.type === 7 && p.name === "slot";
	}
	function isTemplateNode(node) {
	  return node.type === 1 && node.tagType === 3;
	}
	function isSlotOutlet(node) {
	  return node.type === 1 && node.tagType === 2;
	}
	const propsHelperSet = /* @__PURE__ */ new Set([NORMALIZE_PROPS, GUARD_REACTIVE_PROPS]);
	function getUnnormalizedProps(props, callPath = []) {
	  if (props && !shared.isString(props) && props.type === 14) {
	    const callee = props.callee;
	    if (!shared.isString(callee) && propsHelperSet.has(callee)) {
	      return getUnnormalizedProps(
	        props.arguments[0],
	        callPath.concat(props)
	      );
	    }
	  }
	  return [props, callPath];
	}
	function injectProp(node, prop, context) {
	  let propsWithInjection;
	  let props = node.type === 13 ? node.props : node.arguments[2];
	  let callPath = [];
	  let parentCall;
	  if (props && !shared.isString(props) && props.type === 14) {
	    const ret = getUnnormalizedProps(props);
	    props = ret[0];
	    callPath = ret[1];
	    parentCall = callPath[callPath.length - 1];
	  }
	  if (props == null || shared.isString(props)) {
	    propsWithInjection = createObjectExpression([prop]);
	  } else if (props.type === 14) {
	    const first = props.arguments[0];
	    if (!shared.isString(first) && first.type === 15) {
	      if (!hasProp(prop, first)) {
	        first.properties.unshift(prop);
	      }
	    } else {
	      if (props.callee === TO_HANDLERS) {
	        propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
	          createObjectExpression([prop]),
	          props
	        ]);
	      } else {
	        props.arguments.unshift(createObjectExpression([prop]));
	      }
	    }
	    !propsWithInjection && (propsWithInjection = props);
	  } else if (props.type === 15) {
	    if (!hasProp(prop, props)) {
	      props.properties.unshift(prop);
	    }
	    propsWithInjection = props;
	  } else {
	    propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
	      createObjectExpression([prop]),
	      props
	    ]);
	    if (parentCall && parentCall.callee === GUARD_REACTIVE_PROPS) {
	      parentCall = callPath[callPath.length - 2];
	    }
	  }
	  if (node.type === 13) {
	    if (parentCall) {
	      parentCall.arguments[0] = propsWithInjection;
	    } else {
	      node.props = propsWithInjection;
	    }
	  } else {
	    if (parentCall) {
	      parentCall.arguments[0] = propsWithInjection;
	    } else {
	      node.arguments[2] = propsWithInjection;
	    }
	  }
	}
	function hasProp(prop, props) {
	  let result = false;
	  if (prop.key.type === 4) {
	    const propKeyName = prop.key.content;
	    result = props.properties.some(
	      (p) => p.key.type === 4 && p.key.content === propKeyName
	    );
	  }
	  return result;
	}
	function toValidAssetId(name, type) {
	  return `_${type}_${name.replace(/[^\w]/g, (searchValue, replaceValue) => {
	    return searchValue === "-" ? "_" : name.charCodeAt(replaceValue).toString();
	  })}`;
	}
	function hasScopeRef(node, ids) {
	  if (!node || Object.keys(ids).length === 0) {
	    return false;
	  }
	  switch (node.type) {
	    case 1:
	      for (let i = 0; i < node.props.length; i++) {
	        const p = node.props[i];
	        if (p.type === 7 && (hasScopeRef(p.arg, ids) || hasScopeRef(p.exp, ids))) {
	          return true;
	        }
	      }
	      return node.children.some((c) => hasScopeRef(c, ids));
	    case 11:
	      if (hasScopeRef(node.source, ids)) {
	        return true;
	      }
	      return node.children.some((c) => hasScopeRef(c, ids));
	    case 9:
	      return node.branches.some((b) => hasScopeRef(b, ids));
	    case 10:
	      if (hasScopeRef(node.condition, ids)) {
	        return true;
	      }
	      return node.children.some((c) => hasScopeRef(c, ids));
	    case 4:
	      return !node.isStatic && isSimpleIdentifier(node.content) && !!ids[node.content];
	    case 8:
	      return node.children.some((c) => shared.isObject(c) && hasScopeRef(c, ids));
	    case 5:
	    case 12:
	      return hasScopeRef(node.content, ids);
	    case 2:
	    case 3:
	    case 20:
	      return false;
	    default:
	      return false;
	  }
	}
	function getMemoedVNodeCall(node) {
	  if (node.type === 14 && node.callee === WITH_MEMO) {
	    return node.arguments[1].returns;
	  } else {
	    return node;
	  }
	}
	const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;

	const defaultParserOptions = {
	  parseMode: "base",
	  ns: 0,
	  delimiters: [`{{`, `}}`],
	  getNamespace: () => 0,
	  isVoidTag: shared.NO,
	  isPreTag: shared.NO,
	  isIgnoreNewlineTag: shared.NO,
	  isCustomElement: shared.NO,
	  onError: defaultOnError,
	  onWarn: defaultOnWarn,
	  comments: false,
	  prefixIdentifiers: false
	};
	let currentOptions = defaultParserOptions;
	let currentRoot = null;
	let currentInput = "";
	let currentOpenTag = null;
	let currentProp = null;
	let currentAttrValue = "";
	let currentAttrStartIndex = -1;
	let currentAttrEndIndex = -1;
	let inPre = 0;
	let inVPre = false;
	let currentVPreBoundary = null;
	const stack = [];
	const tokenizer = new Tokenizer(stack, {
	  onerr: emitError,
	  ontext(start, end) {
	    onText(getSlice(start, end), start, end);
	  },
	  ontextentity(char, start, end) {
	    onText(char, start, end);
	  },
	  oninterpolation(start, end) {
	    if (inVPre) {
	      return onText(getSlice(start, end), start, end);
	    }
	    let innerStart = start + tokenizer.delimiterOpen.length;
	    let innerEnd = end - tokenizer.delimiterClose.length;
	    while (isWhitespace(currentInput.charCodeAt(innerStart))) {
	      innerStart++;
	    }
	    while (isWhitespace(currentInput.charCodeAt(innerEnd - 1))) {
	      innerEnd--;
	    }
	    let exp = getSlice(innerStart, innerEnd);
	    if (exp.includes("&")) {
	      {
	        exp = decode_js.decodeHTML(exp);
	      }
	    }
	    addNode({
	      type: 5,
	      content: createExp(exp, false, getLoc(innerStart, innerEnd)),
	      loc: getLoc(start, end)
	    });
	  },
	  onopentagname(start, end) {
	    const name = getSlice(start, end);
	    currentOpenTag = {
	      type: 1,
	      tag: name,
	      ns: currentOptions.getNamespace(name, stack[0], currentOptions.ns),
	      tagType: 0,
	      // will be refined on tag close
	      props: [],
	      children: [],
	      loc: getLoc(start - 1, end),
	      codegenNode: void 0
	    };
	  },
	  onopentagend(end) {
	    endOpenTag(end);
	  },
	  onclosetag(start, end) {
	    const name = getSlice(start, end);
	    if (!currentOptions.isVoidTag(name)) {
	      let found = false;
	      for (let i = 0; i < stack.length; i++) {
	        const e = stack[i];
	        if (e.tag.toLowerCase() === name.toLowerCase()) {
	          found = true;
	          if (i > 0) {
	            emitError(24, stack[0].loc.start.offset);
	          }
	          for (let j = 0; j <= i; j++) {
	            const el = stack.shift();
	            onCloseTag(el, end, j < i);
	          }
	          break;
	        }
	      }
	      if (!found) {
	        emitError(23, backTrack(start, 60));
	      }
	    }
	  },
	  onselfclosingtag(end) {
	    const name = currentOpenTag.tag;
	    currentOpenTag.isSelfClosing = true;
	    endOpenTag(end);
	    if (stack[0] && stack[0].tag === name) {
	      onCloseTag(stack.shift(), end);
	    }
	  },
	  onattribname(start, end) {
	    currentProp = {
	      type: 6,
	      name: getSlice(start, end),
	      nameLoc: getLoc(start, end),
	      value: void 0,
	      loc: getLoc(start)
	    };
	  },
	  ondirname(start, end) {
	    const raw = getSlice(start, end);
	    const name = raw === "." || raw === ":" ? "bind" : raw === "@" ? "on" : raw === "#" ? "slot" : raw.slice(2);
	    if (!inVPre && name === "") {
	      emitError(26, start);
	    }
	    if (inVPre || name === "") {
	      currentProp = {
	        type: 6,
	        name: raw,
	        nameLoc: getLoc(start, end),
	        value: void 0,
	        loc: getLoc(start)
	      };
	    } else {
	      currentProp = {
	        type: 7,
	        name,
	        rawName: raw,
	        exp: void 0,
	        arg: void 0,
	        modifiers: raw === "." ? [createSimpleExpression("prop")] : [],
	        loc: getLoc(start)
	      };
	      if (name === "pre") {
	        inVPre = tokenizer.inVPre = true;
	        currentVPreBoundary = currentOpenTag;
	        const props = currentOpenTag.props;
	        for (let i = 0; i < props.length; i++) {
	          if (props[i].type === 7) {
	            props[i] = dirToAttr(props[i]);
	          }
	        }
	      }
	    }
	  },
	  ondirarg(start, end) {
	    if (start === end) return;
	    const arg = getSlice(start, end);
	    if (inVPre && !isVPre(currentProp)) {
	      currentProp.name += arg;
	      setLocEnd(currentProp.nameLoc, end);
	    } else {
	      const isStatic = arg[0] !== `[`;
	      currentProp.arg = createExp(
	        isStatic ? arg : arg.slice(1, -1),
	        isStatic,
	        getLoc(start, end),
	        isStatic ? 3 : 0
	      );
	    }
	  },
	  ondirmodifier(start, end) {
	    const mod = getSlice(start, end);
	    if (inVPre && !isVPre(currentProp)) {
	      currentProp.name += "." + mod;
	      setLocEnd(currentProp.nameLoc, end);
	    } else if (currentProp.name === "slot") {
	      const arg = currentProp.arg;
	      if (arg) {
	        arg.content += "." + mod;
	        setLocEnd(arg.loc, end);
	      }
	    } else {
	      const exp = createSimpleExpression(mod, true, getLoc(start, end));
	      currentProp.modifiers.push(exp);
	    }
	  },
	  onattribdata(start, end) {
	    currentAttrValue += getSlice(start, end);
	    if (currentAttrStartIndex < 0) currentAttrStartIndex = start;
	    currentAttrEndIndex = end;
	  },
	  onattribentity(char, start, end) {
	    currentAttrValue += char;
	    if (currentAttrStartIndex < 0) currentAttrStartIndex = start;
	    currentAttrEndIndex = end;
	  },
	  onattribnameend(end) {
	    const start = currentProp.loc.start.offset;
	    const name = getSlice(start, end);
	    if (currentProp.type === 7) {
	      currentProp.rawName = name;
	    }
	    if (currentOpenTag.props.some(
	      (p) => (p.type === 7 ? p.rawName : p.name) === name
	    )) {
	      emitError(2, start);
	    }
	  },
	  onattribend(quote, end) {
	    if (currentOpenTag && currentProp) {
	      setLocEnd(currentProp.loc, end);
	      if (quote !== 0) {
	        if (currentProp.type === 6) {
	          if (currentProp.name === "class") {
	            currentAttrValue = condense(currentAttrValue).trim();
	          }
	          if (quote === 1 && !currentAttrValue) {
	            emitError(13, end);
	          }
	          currentProp.value = {
	            type: 2,
	            content: currentAttrValue,
	            loc: quote === 1 ? getLoc(currentAttrStartIndex, currentAttrEndIndex) : getLoc(currentAttrStartIndex - 1, currentAttrEndIndex + 1)
	          };
	          if (tokenizer.inSFCRoot && currentOpenTag.tag === "template" && currentProp.name === "lang" && currentAttrValue && currentAttrValue !== "html") {
	            tokenizer.enterRCDATA(toCharCodes(`</template`), 0);
	          }
	        } else {
	          let expParseMode = 0 /* Normal */;
	          {
	            if (currentProp.name === "for") {
	              expParseMode = 3 /* Skip */;
	            } else if (currentProp.name === "slot") {
	              expParseMode = 1 /* Params */;
	            } else if (currentProp.name === "on" && currentAttrValue.includes(";")) {
	              expParseMode = 2 /* Statements */;
	            }
	          }
	          currentProp.exp = createExp(
	            currentAttrValue,
	            false,
	            getLoc(currentAttrStartIndex, currentAttrEndIndex),
	            0,
	            expParseMode
	          );
	          if (currentProp.name === "for") {
	            currentProp.forParseResult = parseForExpression(currentProp.exp);
	          }
	          let syncIndex = -1;
	          if (currentProp.name === "bind" && (syncIndex = currentProp.modifiers.findIndex(
	            (mod) => mod.content === "sync"
	          )) > -1 && checkCompatEnabled(
	            "COMPILER_V_BIND_SYNC",
	            currentOptions,
	            currentProp.loc,
	            currentProp.arg.loc.source
	          )) {
	            currentProp.name = "model";
	            currentProp.modifiers.splice(syncIndex, 1);
	          }
	        }
	      }
	      if (currentProp.type !== 7 || currentProp.name !== "pre") {
	        currentOpenTag.props.push(currentProp);
	      }
	    }
	    currentAttrValue = "";
	    currentAttrStartIndex = currentAttrEndIndex = -1;
	  },
	  oncomment(start, end) {
	    if (currentOptions.comments) {
	      addNode({
	        type: 3,
	        content: getSlice(start, end),
	        loc: getLoc(start - 4, end + 3)
	      });
	    }
	  },
	  onend() {
	    const end = currentInput.length;
	    if (tokenizer.state !== 1) {
	      switch (tokenizer.state) {
	        case 5:
	        case 8:
	          emitError(5, end);
	          break;
	        case 3:
	        case 4:
	          emitError(
	            25,
	            tokenizer.sectionStart
	          );
	          break;
	        case 28:
	          if (tokenizer.currentSequence === Sequences.CdataEnd) {
	            emitError(6, end);
	          } else {
	            emitError(7, end);
	          }
	          break;
	        case 6:
	        case 7:
	        case 9:
	        case 11:
	        case 12:
	        case 13:
	        case 14:
	        case 15:
	        case 16:
	        case 17:
	        case 18:
	        case 19:
	        // "
	        case 20:
	        // '
	        case 21:
	          emitError(9, end);
	          break;
	      }
	    }
	    for (let index = 0; index < stack.length; index++) {
	      onCloseTag(stack[index], end - 1);
	      emitError(24, stack[index].loc.start.offset);
	    }
	  },
	  oncdata(start, end) {
	    if (stack[0].ns !== 0) {
	      onText(getSlice(start, end), start, end);
	    } else {
	      emitError(1, start - 9);
	    }
	  },
	  onprocessinginstruction(start) {
	    if ((stack[0] ? stack[0].ns : currentOptions.ns) === 0) {
	      emitError(
	        21,
	        start - 1
	      );
	    }
	  }
	});
	const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
	const stripParensRE = /^\(|\)$/g;
	function parseForExpression(input) {
	  const loc = input.loc;
	  const exp = input.content;
	  const inMatch = exp.match(forAliasRE);
	  if (!inMatch) return;
	  const [, LHS, RHS] = inMatch;
	  const createAliasExpression = (content, offset, asParam = false) => {
	    const start = loc.start.offset + offset;
	    const end = start + content.length;
	    return createExp(
	      content,
	      false,
	      getLoc(start, end),
	      0,
	      asParam ? 1 /* Params */ : 0 /* Normal */
	    );
	  };
	  const result = {
	    source: createAliasExpression(RHS.trim(), exp.indexOf(RHS, LHS.length)),
	    value: void 0,
	    key: void 0,
	    index: void 0,
	    finalized: false
	  };
	  let valueContent = LHS.trim().replace(stripParensRE, "").trim();
	  const trimmedOffset = LHS.indexOf(valueContent);
	  const iteratorMatch = valueContent.match(forIteratorRE);
	  if (iteratorMatch) {
	    valueContent = valueContent.replace(forIteratorRE, "").trim();
	    const keyContent = iteratorMatch[1].trim();
	    let keyOffset;
	    if (keyContent) {
	      keyOffset = exp.indexOf(keyContent, trimmedOffset + valueContent.length);
	      result.key = createAliasExpression(keyContent, keyOffset, true);
	    }
	    if (iteratorMatch[2]) {
	      const indexContent = iteratorMatch[2].trim();
	      if (indexContent) {
	        result.index = createAliasExpression(
	          indexContent,
	          exp.indexOf(
	            indexContent,
	            result.key ? keyOffset + keyContent.length : trimmedOffset + valueContent.length
	          ),
	          true
	        );
	      }
	    }
	  }
	  if (valueContent) {
	    result.value = createAliasExpression(valueContent, trimmedOffset, true);
	  }
	  return result;
	}
	function getSlice(start, end) {
	  return currentInput.slice(start, end);
	}
	function endOpenTag(end) {
	  if (tokenizer.inSFCRoot) {
	    currentOpenTag.innerLoc = getLoc(end + 1, end + 1);
	  }
	  addNode(currentOpenTag);
	  const { tag, ns } = currentOpenTag;
	  if (ns === 0 && currentOptions.isPreTag(tag)) {
	    inPre++;
	  }
	  if (currentOptions.isVoidTag(tag)) {
	    onCloseTag(currentOpenTag, end);
	  } else {
	    stack.unshift(currentOpenTag);
	    if (ns === 1 || ns === 2) {
	      tokenizer.inXML = true;
	    }
	  }
	  currentOpenTag = null;
	}
	function onText(content, start, end) {
	  const parent = stack[0] || currentRoot;
	  const lastNode = parent.children[parent.children.length - 1];
	  if (lastNode && lastNode.type === 2) {
	    lastNode.content += content;
	    setLocEnd(lastNode.loc, end);
	  } else {
	    parent.children.push({
	      type: 2,
	      content,
	      loc: getLoc(start, end)
	    });
	  }
	}
	function onCloseTag(el, end, isImplied = false) {
	  if (isImplied) {
	    setLocEnd(el.loc, backTrack(end, 60));
	  } else {
	    setLocEnd(el.loc, lookAhead(end, 62) + 1);
	  }
	  if (tokenizer.inSFCRoot) {
	    if (el.children.length) {
	      el.innerLoc.end = shared.extend({}, el.children[el.children.length - 1].loc.end);
	    } else {
	      el.innerLoc.end = shared.extend({}, el.innerLoc.start);
	    }
	    el.innerLoc.source = getSlice(
	      el.innerLoc.start.offset,
	      el.innerLoc.end.offset
	    );
	  }
	  const { tag, ns, children } = el;
	  if (!inVPre) {
	    if (tag === "slot") {
	      el.tagType = 2;
	    } else if (isFragmentTemplate(el)) {
	      el.tagType = 3;
	    } else if (isComponent(el)) {
	      el.tagType = 1;
	    }
	  }
	  if (!tokenizer.inRCDATA) {
	    el.children = condenseWhitespace(children);
	  }
	  if (ns === 0 && currentOptions.isIgnoreNewlineTag(tag)) {
	    const first = children[0];
	    if (first && first.type === 2) {
	      first.content = first.content.replace(/^\r?\n/, "");
	    }
	  }
	  if (ns === 0 && currentOptions.isPreTag(tag)) {
	    inPre--;
	  }
	  if (currentVPreBoundary === el) {
	    inVPre = tokenizer.inVPre = false;
	    currentVPreBoundary = null;
	  }
	  if (tokenizer.inXML && (stack[0] ? stack[0].ns : currentOptions.ns) === 0) {
	    tokenizer.inXML = false;
	  }
	  {
	    const props = el.props;
	    if (!tokenizer.inSFCRoot && isCompatEnabled(
	      "COMPILER_NATIVE_TEMPLATE",
	      currentOptions
	    ) && el.tag === "template" && !isFragmentTemplate(el)) {
	      const parent = stack[0] || currentRoot;
	      const index = parent.children.indexOf(el);
	      parent.children.splice(index, 1, ...el.children);
	    }
	    const inlineTemplateProp = props.find(
	      (p) => p.type === 6 && p.name === "inline-template"
	    );
	    if (inlineTemplateProp && checkCompatEnabled(
	      "COMPILER_INLINE_TEMPLATE",
	      currentOptions,
	      inlineTemplateProp.loc
	    ) && el.children.length) {
	      inlineTemplateProp.value = {
	        type: 2,
	        content: getSlice(
	          el.children[0].loc.start.offset,
	          el.children[el.children.length - 1].loc.end.offset
	        ),
	        loc: inlineTemplateProp.loc
	      };
	    }
	  }
	}
	function lookAhead(index, c) {
	  let i = index;
	  while (currentInput.charCodeAt(i) !== c && i < currentInput.length - 1) i++;
	  return i;
	}
	function backTrack(index, c) {
	  let i = index;
	  while (currentInput.charCodeAt(i) !== c && i >= 0) i--;
	  return i;
	}
	const specialTemplateDir = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
	function isFragmentTemplate({ tag, props }) {
	  if (tag === "template") {
	    for (let i = 0; i < props.length; i++) {
	      if (props[i].type === 7 && specialTemplateDir.has(props[i].name)) {
	        return true;
	      }
	    }
	  }
	  return false;
	}
	function isComponent({ tag, props }) {
	  if (currentOptions.isCustomElement(tag)) {
	    return false;
	  }
	  if (tag === "component" || isUpperCase(tag.charCodeAt(0)) || isCoreComponent(tag) || currentOptions.isBuiltInComponent && currentOptions.isBuiltInComponent(tag) || currentOptions.isNativeTag && !currentOptions.isNativeTag(tag)) {
	    return true;
	  }
	  for (let i = 0; i < props.length; i++) {
	    const p = props[i];
	    if (p.type === 6) {
	      if (p.name === "is" && p.value) {
	        if (p.value.content.startsWith("vue:")) {
	          return true;
	        } else if (checkCompatEnabled(
	          "COMPILER_IS_ON_ELEMENT",
	          currentOptions,
	          p.loc
	        )) {
	          return true;
	        }
	      }
	    } else if (// :is on plain element - only treat as component in compat mode
	    p.name === "bind" && isStaticArgOf(p.arg, "is") && checkCompatEnabled(
	      "COMPILER_IS_ON_ELEMENT",
	      currentOptions,
	      p.loc
	    )) {
	      return true;
	    }
	  }
	  return false;
	}
	function isUpperCase(c) {
	  return c > 64 && c < 91;
	}
	const windowsNewlineRE = /\r\n/g;
	function condenseWhitespace(nodes) {
	  const shouldCondense = currentOptions.whitespace !== "preserve";
	  let removedWhitespace = false;
	  for (let i = 0; i < nodes.length; i++) {
	    const node = nodes[i];
	    if (node.type === 2) {
	      if (!inPre) {
	        if (isAllWhitespace(node.content)) {
	          const prev = nodes[i - 1] && nodes[i - 1].type;
	          const next = nodes[i + 1] && nodes[i + 1].type;
	          if (!prev || !next || shouldCondense && (prev === 3 && (next === 3 || next === 1) || prev === 1 && (next === 3 || next === 1 && hasNewlineChar(node.content)))) {
	            removedWhitespace = true;
	            nodes[i] = null;
	          } else {
	            node.content = " ";
	          }
	        } else if (shouldCondense) {
	          node.content = condense(node.content);
	        }
	      } else {
	        node.content = node.content.replace(windowsNewlineRE, "\n");
	      }
	    }
	  }
	  return removedWhitespace ? nodes.filter(Boolean) : nodes;
	}
	function isAllWhitespace(str) {
	  for (let i = 0; i < str.length; i++) {
	    if (!isWhitespace(str.charCodeAt(i))) {
	      return false;
	    }
	  }
	  return true;
	}
	function hasNewlineChar(str) {
	  for (let i = 0; i < str.length; i++) {
	    const c = str.charCodeAt(i);
	    if (c === 10 || c === 13) {
	      return true;
	    }
	  }
	  return false;
	}
	function condense(str) {
	  let ret = "";
	  let prevCharIsWhitespace = false;
	  for (let i = 0; i < str.length; i++) {
	    if (isWhitespace(str.charCodeAt(i))) {
	      if (!prevCharIsWhitespace) {
	        ret += " ";
	        prevCharIsWhitespace = true;
	      }
	    } else {
	      ret += str[i];
	      prevCharIsWhitespace = false;
	    }
	  }
	  return ret;
	}
	function addNode(node) {
	  (stack[0] || currentRoot).children.push(node);
	}
	function getLoc(start, end) {
	  return {
	    start: tokenizer.getPos(start),
	    // @ts-expect-error allow late attachment
	    end: end == null ? end : tokenizer.getPos(end),
	    // @ts-expect-error allow late attachment
	    source: end == null ? end : getSlice(start, end)
	  };
	}
	function cloneLoc(loc) {
	  return getLoc(loc.start.offset, loc.end.offset);
	}
	function setLocEnd(loc, end) {
	  loc.end = tokenizer.getPos(end);
	  loc.source = getSlice(loc.start.offset, end);
	}
	function dirToAttr(dir) {
	  const attr = {
	    type: 6,
	    name: dir.rawName,
	    nameLoc: getLoc(
	      dir.loc.start.offset,
	      dir.loc.start.offset + dir.rawName.length
	    ),
	    value: void 0,
	    loc: dir.loc
	  };
	  if (dir.exp) {
	    const loc = dir.exp.loc;
	    if (loc.end.offset < dir.loc.end.offset) {
	      loc.start.offset--;
	      loc.start.column--;
	      loc.end.offset++;
	      loc.end.column++;
	    }
	    attr.value = {
	      type: 2,
	      content: dir.exp.content,
	      loc
	    };
	  }
	  return attr;
	}
	function createExp(content, isStatic = false, loc, constType = 0, parseMode = 0 /* Normal */) {
	  const exp = createSimpleExpression(content, isStatic, loc, constType);
	  if (!isStatic && currentOptions.prefixIdentifiers && parseMode !== 3 /* Skip */ && content.trim()) {
	    if (isSimpleIdentifier(content)) {
	      exp.ast = null;
	      return exp;
	    }
	    try {
	      const plugins = currentOptions.expressionPlugins;
	      const options = {
	        plugins: plugins ? [...plugins, "typescript"] : ["typescript"]
	      };
	      if (parseMode === 2 /* Statements */) {
	        exp.ast = parser.parse(` ${content} `, options).program;
	      } else if (parseMode === 1 /* Params */) {
	        exp.ast = parser.parseExpression(`(${content})=>{}`, options);
	      } else {
	        exp.ast = parser.parseExpression(`(${content})`, options);
	      }
	    } catch (e) {
	      exp.ast = false;
	      emitError(45, loc.start.offset, e.message);
	    }
	  }
	  return exp;
	}
	function emitError(code, index, message) {
	  currentOptions.onError(
	    createCompilerError(code, getLoc(index, index), void 0, message)
	  );
	}
	function reset() {
	  tokenizer.reset();
	  currentOpenTag = null;
	  currentProp = null;
	  currentAttrValue = "";
	  currentAttrStartIndex = -1;
	  currentAttrEndIndex = -1;
	  stack.length = 0;
	}
	function baseParse(input, options) {
	  reset();
	  currentInput = input;
	  currentOptions = shared.extend({}, defaultParserOptions);
	  if (options) {
	    let key;
	    for (key in options) {
	      if (options[key] != null) {
	        currentOptions[key] = options[key];
	      }
	    }
	  }
	  tokenizer.mode = currentOptions.parseMode === "html" ? 1 : currentOptions.parseMode === "sfc" ? 2 : 0;
	  tokenizer.inXML = currentOptions.ns === 1 || currentOptions.ns === 2;
	  const delimiters = options && options.delimiters;
	  if (delimiters) {
	    tokenizer.delimiterOpen = toCharCodes(delimiters[0]);
	    tokenizer.delimiterClose = toCharCodes(delimiters[1]);
	  }
	  const root = currentRoot = createRoot([], input);
	  tokenizer.parse(currentInput);
	  root.loc = getLoc(0, input.length);
	  root.children = condenseWhitespace(root.children);
	  currentRoot = null;
	  return root;
	}

	function cacheStatic(root, context) {
	  walk(
	    root,
	    void 0,
	    context,
	    // Root node is unfortunately non-hoistable due to potential parent
	    // fallthrough attributes.
	    !!getSingleElementRoot(root)
	  );
	}
	function getSingleElementRoot(root) {
	  const children = root.children.filter((x) => x.type !== 3);
	  return children.length === 1 && children[0].type === 1 && !isSlotOutlet(children[0]) ? children[0] : null;
	}
	function walk(node, parent, context, doNotHoistNode = false, inFor = false) {
	  const { children } = node;
	  const toCache = [];
	  for (let i = 0; i < children.length; i++) {
	    const child = children[i];
	    if (child.type === 1 && child.tagType === 0) {
	      const constantType = doNotHoistNode ? 0 : getConstantType(child, context);
	      if (constantType > 0) {
	        if (constantType >= 2) {
	          child.codegenNode.patchFlag = -1;
	          toCache.push(child);
	          continue;
	        }
	      } else {
	        const codegenNode = child.codegenNode;
	        if (codegenNode.type === 13) {
	          const flag = codegenNode.patchFlag;
	          if ((flag === void 0 || flag === 512 || flag === 1) && getGeneratedPropsConstantType(child, context) >= 2) {
	            const props = getNodeProps(child);
	            if (props) {
	              codegenNode.props = context.hoist(props);
	            }
	          }
	          if (codegenNode.dynamicProps) {
	            codegenNode.dynamicProps = context.hoist(codegenNode.dynamicProps);
	          }
	        }
	      }
	    } else if (child.type === 12) {
	      const constantType = doNotHoistNode ? 0 : getConstantType(child, context);
	      if (constantType >= 2) {
	        if (child.codegenNode.type === 14 && child.codegenNode.arguments.length > 0) {
	          child.codegenNode.arguments.push(
	            -1 + (``)
	          );
	        }
	        toCache.push(child);
	        continue;
	      }
	    }
	    if (child.type === 1) {
	      const isComponent = child.tagType === 1;
	      if (isComponent) {
	        context.scopes.vSlot++;
	      }
	      walk(child, node, context, false, inFor);
	      if (isComponent) {
	        context.scopes.vSlot--;
	      }
	    } else if (child.type === 11) {
	      walk(child, node, context, child.children.length === 1, true);
	    } else if (child.type === 9) {
	      for (let i2 = 0; i2 < child.branches.length; i2++) {
	        walk(
	          child.branches[i2],
	          node,
	          context,
	          child.branches[i2].children.length === 1,
	          inFor
	        );
	      }
	    }
	  }
	  let cachedAsArray = false;
	  const slotCacheKeys = [];
	  if (toCache.length === children.length && node.type === 1) {
	    if (node.tagType === 0 && node.codegenNode && node.codegenNode.type === 13 && shared.isArray(node.codegenNode.children)) {
	      node.codegenNode.children = getCacheExpression(
	        createArrayExpression(node.codegenNode.children)
	      );
	      cachedAsArray = true;
	    } else if (node.tagType === 1 && node.codegenNode && node.codegenNode.type === 13 && node.codegenNode.children && !shared.isArray(node.codegenNode.children) && node.codegenNode.children.type === 15) {
	      const slot = getSlotNode(node.codegenNode, "default");
	      if (slot) {
	        slotCacheKeys.push(context.cached.length);
	        slot.returns = getCacheExpression(
	          createArrayExpression(slot.returns)
	        );
	        cachedAsArray = true;
	      }
	    } else if (node.tagType === 3 && parent && parent.type === 1 && parent.tagType === 1 && parent.codegenNode && parent.codegenNode.type === 13 && parent.codegenNode.children && !shared.isArray(parent.codegenNode.children) && parent.codegenNode.children.type === 15) {
	      const slotName = findDir(node, "slot", true);
	      const slot = slotName && slotName.arg && getSlotNode(parent.codegenNode, slotName.arg);
	      if (slot) {
	        slotCacheKeys.push(context.cached.length);
	        slot.returns = getCacheExpression(
	          createArrayExpression(slot.returns)
	        );
	        cachedAsArray = true;
	      }
	    }
	  }
	  if (!cachedAsArray) {
	    for (const child of toCache) {
	      slotCacheKeys.push(context.cached.length);
	      child.codegenNode = context.cache(child.codegenNode);
	    }
	  }
	  if (slotCacheKeys.length && node.type === 1 && node.tagType === 1 && node.codegenNode && node.codegenNode.type === 13 && node.codegenNode.children && !shared.isArray(node.codegenNode.children) && node.codegenNode.children.type === 15) {
	    node.codegenNode.children.properties.push(
	      createObjectProperty(
	        `__`,
	        createSimpleExpression(JSON.stringify(slotCacheKeys), false)
	      )
	    );
	  }
	  function getCacheExpression(value) {
	    const exp = context.cache(value);
	    if (inFor && context.hmr) {
	      exp.needArraySpread = true;
	    }
	    return exp;
	  }
	  function getSlotNode(node2, name) {
	    if (node2.children && !shared.isArray(node2.children) && node2.children.type === 15) {
	      const slot = node2.children.properties.find(
	        (p) => p.key === name || p.key.content === name
	      );
	      return slot && slot.value;
	    }
	  }
	  if (toCache.length && context.transformHoist) {
	    context.transformHoist(children, context, node);
	  }
	}
	function getConstantType(node, context) {
	  const { constantCache } = context;
	  switch (node.type) {
	    case 1:
	      if (node.tagType !== 0) {
	        return 0;
	      }
	      const cached = constantCache.get(node);
	      if (cached !== void 0) {
	        return cached;
	      }
	      const codegenNode = node.codegenNode;
	      if (codegenNode.type !== 13) {
	        return 0;
	      }
	      if (codegenNode.isBlock && node.tag !== "svg" && node.tag !== "foreignObject" && node.tag !== "math") {
	        return 0;
	      }
	      if (codegenNode.patchFlag === void 0) {
	        let returnType2 = 3;
	        const generatedPropsType = getGeneratedPropsConstantType(node, context);
	        if (generatedPropsType === 0) {
	          constantCache.set(node, 0);
	          return 0;
	        }
	        if (generatedPropsType < returnType2) {
	          returnType2 = generatedPropsType;
	        }
	        for (let i = 0; i < node.children.length; i++) {
	          const childType = getConstantType(node.children[i], context);
	          if (childType === 0) {
	            constantCache.set(node, 0);
	            return 0;
	          }
	          if (childType < returnType2) {
	            returnType2 = childType;
	          }
	        }
	        if (returnType2 > 1) {
	          for (let i = 0; i < node.props.length; i++) {
	            const p = node.props[i];
	            if (p.type === 7 && p.name === "bind" && p.exp) {
	              const expType = getConstantType(p.exp, context);
	              if (expType === 0) {
	                constantCache.set(node, 0);
	                return 0;
	              }
	              if (expType < returnType2) {
	                returnType2 = expType;
	              }
	            }
	          }
	        }
	        if (codegenNode.isBlock) {
	          for (let i = 0; i < node.props.length; i++) {
	            const p = node.props[i];
	            if (p.type === 7) {
	              constantCache.set(node, 0);
	              return 0;
	            }
	          }
	          context.removeHelper(OPEN_BLOCK);
	          context.removeHelper(
	            getVNodeBlockHelper(context.inSSR, codegenNode.isComponent)
	          );
	          codegenNode.isBlock = false;
	          context.helper(getVNodeHelper(context.inSSR, codegenNode.isComponent));
	        }
	        constantCache.set(node, returnType2);
	        return returnType2;
	      } else {
	        constantCache.set(node, 0);
	        return 0;
	      }
	    case 2:
	    case 3:
	      return 3;
	    case 9:
	    case 11:
	    case 10:
	      return 0;
	    case 5:
	    case 12:
	      return getConstantType(node.content, context);
	    case 4:
	      return node.constType;
	    case 8:
	      let returnType = 3;
	      for (let i = 0; i < node.children.length; i++) {
	        const child = node.children[i];
	        if (shared.isString(child) || shared.isSymbol(child)) {
	          continue;
	        }
	        const childType = getConstantType(child, context);
	        if (childType === 0) {
	          return 0;
	        } else if (childType < returnType) {
	          returnType = childType;
	        }
	      }
	      return returnType;
	    case 20:
	      return 2;
	    default:
	      return 0;
	  }
	}
	const allowHoistedHelperSet = /* @__PURE__ */ new Set([
	  NORMALIZE_CLASS,
	  NORMALIZE_STYLE,
	  NORMALIZE_PROPS,
	  GUARD_REACTIVE_PROPS
	]);
	function getConstantTypeOfHelperCall(value, context) {
	  if (value.type === 14 && !shared.isString(value.callee) && allowHoistedHelperSet.has(value.callee)) {
	    const arg = value.arguments[0];
	    if (arg.type === 4) {
	      return getConstantType(arg, context);
	    } else if (arg.type === 14) {
	      return getConstantTypeOfHelperCall(arg, context);
	    }
	  }
	  return 0;
	}
	function getGeneratedPropsConstantType(node, context) {
	  let returnType = 3;
	  const props = getNodeProps(node);
	  if (props && props.type === 15) {
	    const { properties } = props;
	    for (let i = 0; i < properties.length; i++) {
	      const { key, value } = properties[i];
	      const keyType = getConstantType(key, context);
	      if (keyType === 0) {
	        return keyType;
	      }
	      if (keyType < returnType) {
	        returnType = keyType;
	      }
	      let valueType;
	      if (value.type === 4) {
	        valueType = getConstantType(value, context);
	      } else if (value.type === 14) {
	        valueType = getConstantTypeOfHelperCall(value, context);
	      } else {
	        valueType = 0;
	      }
	      if (valueType === 0) {
	        return valueType;
	      }
	      if (valueType < returnType) {
	        returnType = valueType;
	      }
	    }
	  }
	  return returnType;
	}
	function getNodeProps(node) {
	  const codegenNode = node.codegenNode;
	  if (codegenNode.type === 13) {
	    return codegenNode.props;
	  }
	}

	function createTransformContext(root, {
	  filename = "",
	  prefixIdentifiers = false,
	  hoistStatic = false,
	  hmr = false,
	  cacheHandlers = false,
	  nodeTransforms = [],
	  directiveTransforms = {},
	  transformHoist = null,
	  isBuiltInComponent = shared.NOOP,
	  isCustomElement = shared.NOOP,
	  expressionPlugins = [],
	  scopeId = null,
	  slotted = true,
	  ssr = false,
	  inSSR = false,
	  ssrCssVars = ``,
	  bindingMetadata = shared.EMPTY_OBJ,
	  inline = false,
	  isTS = false,
	  onError = defaultOnError,
	  onWarn = defaultOnWarn,
	  compatConfig
	}) {
	  const nameMatch = filename.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/);
	  const context = {
	    // options
	    filename,
	    selfName: nameMatch && shared.capitalize(shared.camelize(nameMatch[1])),
	    prefixIdentifiers,
	    hoistStatic,
	    hmr,
	    cacheHandlers,
	    nodeTransforms,
	    directiveTransforms,
	    transformHoist,
	    isBuiltInComponent,
	    isCustomElement,
	    expressionPlugins,
	    scopeId,
	    slotted,
	    ssr,
	    inSSR,
	    ssrCssVars,
	    bindingMetadata,
	    inline,
	    isTS,
	    onError,
	    onWarn,
	    compatConfig,
	    // state
	    root,
	    helpers: /* @__PURE__ */ new Map(),
	    components: /* @__PURE__ */ new Set(),
	    directives: /* @__PURE__ */ new Set(),
	    hoists: [],
	    imports: [],
	    cached: [],
	    constantCache: /* @__PURE__ */ new WeakMap(),
	    temps: 0,
	    identifiers: /* @__PURE__ */ Object.create(null),
	    scopes: {
	      vFor: 0,
	      vSlot: 0,
	      vPre: 0,
	      vOnce: 0
	    },
	    parent: null,
	    grandParent: null,
	    currentNode: root,
	    childIndex: 0,
	    inVOnce: false,
	    // methods
	    helper(name) {
	      const count = context.helpers.get(name) || 0;
	      context.helpers.set(name, count + 1);
	      return name;
	    },
	    removeHelper(name) {
	      const count = context.helpers.get(name);
	      if (count) {
	        const currentCount = count - 1;
	        if (!currentCount) {
	          context.helpers.delete(name);
	        } else {
	          context.helpers.set(name, currentCount);
	        }
	      }
	    },
	    helperString(name) {
	      return `_${helperNameMap[context.helper(name)]}`;
	    },
	    replaceNode(node) {
	      context.parent.children[context.childIndex] = context.currentNode = node;
	    },
	    removeNode(node) {
	      const list = context.parent.children;
	      const removalIndex = node ? list.indexOf(node) : context.currentNode ? context.childIndex : -1;
	      if (!node || node === context.currentNode) {
	        context.currentNode = null;
	        context.onNodeRemoved();
	      } else {
	        if (context.childIndex > removalIndex) {
	          context.childIndex--;
	          context.onNodeRemoved();
	        }
	      }
	      context.parent.children.splice(removalIndex, 1);
	    },
	    onNodeRemoved: shared.NOOP,
	    addIdentifiers(exp) {
	      {
	        if (shared.isString(exp)) {
	          addId(exp);
	        } else if (exp.identifiers) {
	          exp.identifiers.forEach(addId);
	        } else if (exp.type === 4) {
	          addId(exp.content);
	        }
	      }
	    },
	    removeIdentifiers(exp) {
	      {
	        if (shared.isString(exp)) {
	          removeId(exp);
	        } else if (exp.identifiers) {
	          exp.identifiers.forEach(removeId);
	        } else if (exp.type === 4) {
	          removeId(exp.content);
	        }
	      }
	    },
	    hoist(exp) {
	      if (shared.isString(exp)) exp = createSimpleExpression(exp);
	      context.hoists.push(exp);
	      const identifier = createSimpleExpression(
	        `_hoisted_${context.hoists.length}`,
	        false,
	        exp.loc,
	        2
	      );
	      identifier.hoisted = exp;
	      return identifier;
	    },
	    cache(exp, isVNode = false, inVOnce = false) {
	      const cacheExp = createCacheExpression(
	        context.cached.length,
	        exp,
	        isVNode,
	        inVOnce
	      );
	      context.cached.push(cacheExp);
	      return cacheExp;
	    }
	  };
	  {
	    context.filters = /* @__PURE__ */ new Set();
	  }
	  function addId(id) {
	    const { identifiers } = context;
	    if (identifiers[id] === void 0) {
	      identifiers[id] = 0;
	    }
	    identifiers[id]++;
	  }
	  function removeId(id) {
	    context.identifiers[id]--;
	  }
	  return context;
	}
	function transform(root, options) {
	  const context = createTransformContext(root, options);
	  traverseNode(root, context);
	  if (options.hoistStatic) {
	    cacheStatic(root, context);
	  }
	  if (!options.ssr) {
	    createRootCodegen(root, context);
	  }
	  root.helpers = /* @__PURE__ */ new Set([...context.helpers.keys()]);
	  root.components = [...context.components];
	  root.directives = [...context.directives];
	  root.imports = context.imports;
	  root.hoists = context.hoists;
	  root.temps = context.temps;
	  root.cached = context.cached;
	  root.transformed = true;
	  {
	    root.filters = [...context.filters];
	  }
	}
	function createRootCodegen(root, context) {
	  const { helper } = context;
	  const { children } = root;
	  if (children.length === 1) {
	    const singleElementRootChild = getSingleElementRoot(root);
	    if (singleElementRootChild && singleElementRootChild.codegenNode) {
	      const codegenNode = singleElementRootChild.codegenNode;
	      if (codegenNode.type === 13) {
	        convertToBlock(codegenNode, context);
	      }
	      root.codegenNode = codegenNode;
	    } else {
	      root.codegenNode = children[0];
	    }
	  } else if (children.length > 1) {
	    let patchFlag = 64;
	    root.codegenNode = createVNodeCall(
	      context,
	      helper(FRAGMENT),
	      void 0,
	      root.children,
	      patchFlag,
	      void 0,
	      void 0,
	      true,
	      void 0,
	      false
	    );
	  } else ;
	}
	function traverseChildren(parent, context) {
	  let i = 0;
	  const nodeRemoved = () => {
	    i--;
	  };
	  for (; i < parent.children.length; i++) {
	    const child = parent.children[i];
	    if (shared.isString(child)) continue;
	    context.grandParent = context.parent;
	    context.parent = parent;
	    context.childIndex = i;
	    context.onNodeRemoved = nodeRemoved;
	    traverseNode(child, context);
	  }
	}
	function traverseNode(node, context) {
	  context.currentNode = node;
	  const { nodeTransforms } = context;
	  const exitFns = [];
	  for (let i2 = 0; i2 < nodeTransforms.length; i2++) {
	    const onExit = nodeTransforms[i2](node, context);
	    if (onExit) {
	      if (shared.isArray(onExit)) {
	        exitFns.push(...onExit);
	      } else {
	        exitFns.push(onExit);
	      }
	    }
	    if (!context.currentNode) {
	      return;
	    } else {
	      node = context.currentNode;
	    }
	  }
	  switch (node.type) {
	    case 3:
	      if (!context.ssr) {
	        context.helper(CREATE_COMMENT);
	      }
	      break;
	    case 5:
	      if (!context.ssr) {
	        context.helper(TO_DISPLAY_STRING);
	      }
	      break;
	    // for container types, further traverse downwards
	    case 9:
	      for (let i2 = 0; i2 < node.branches.length; i2++) {
	        traverseNode(node.branches[i2], context);
	      }
	      break;
	    case 10:
	    case 11:
	    case 1:
	    case 0:
	      traverseChildren(node, context);
	      break;
	  }
	  context.currentNode = node;
	  let i = exitFns.length;
	  while (i--) {
	    exitFns[i]();
	  }
	}
	function createStructuralDirectiveTransform(name, fn) {
	  const matches = shared.isString(name) ? (n) => n === name : (n) => name.test(n);
	  return (node, context) => {
	    if (node.type === 1) {
	      const { props } = node;
	      if (node.tagType === 3 && props.some(isVSlot)) {
	        return;
	      }
	      const exitFns = [];
	      for (let i = 0; i < props.length; i++) {
	        const prop = props[i];
	        if (prop.type === 7 && matches(prop.name)) {
	          props.splice(i, 1);
	          i--;
	          const onExit = fn(node, prop, context);
	          if (onExit) exitFns.push(onExit);
	        }
	      }
	      return exitFns;
	    }
	  };
	}

	const PURE_ANNOTATION = `/*@__PURE__*/`;
	const aliasHelper = (s) => `${helperNameMap[s]}: _${helperNameMap[s]}`;
	function createCodegenContext(ast, {
	  mode = "function",
	  prefixIdentifiers = mode === "module",
	  sourceMap = false,
	  filename = `template.vue.html`,
	  scopeId = null,
	  optimizeImports = false,
	  runtimeGlobalName = `Vue`,
	  runtimeModuleName = `vue`,
	  ssrRuntimeModuleName = "vue/server-renderer",
	  ssr = false,
	  isTS = false,
	  inSSR = false
	}) {
	  const context = {
	    mode,
	    prefixIdentifiers,
	    sourceMap,
	    filename,
	    scopeId,
	    optimizeImports,
	    runtimeGlobalName,
	    runtimeModuleName,
	    ssrRuntimeModuleName,
	    ssr,
	    isTS,
	    inSSR,
	    source: ast.source,
	    code: ``,
	    column: 1,
	    line: 1,
	    offset: 0,
	    indentLevel: 0,
	    pure: false,
	    map: void 0,
	    helper(key) {
	      return `_${helperNameMap[key]}`;
	    },
	    push(code, newlineIndex = -2 /* None */, node) {
	      context.code += code;
	      if (context.map) {
	        if (node) {
	          let name;
	          if (node.type === 4 && !node.isStatic) {
	            const content = node.content.replace(/^_ctx\./, "");
	            if (content !== node.content && isSimpleIdentifier(content)) {
	              name = content;
	            }
	          }
	          if (node.loc.source) {
	            addMapping(node.loc.start, name);
	          }
	        }
	        if (newlineIndex === -3 /* Unknown */) {
	          advancePositionWithMutation(context, code);
	        } else {
	          context.offset += code.length;
	          if (newlineIndex === -2 /* None */) {
	            context.column += code.length;
	          } else {
	            if (newlineIndex === -1 /* End */) {
	              newlineIndex = code.length - 1;
	            }
	            context.line++;
	            context.column = code.length - newlineIndex;
	          }
	        }
	        if (node && node.loc !== locStub && node.loc.source) {
	          addMapping(node.loc.end);
	        }
	      }
	    },
	    indent() {
	      newline(++context.indentLevel);
	    },
	    deindent(withoutNewLine = false) {
	      if (withoutNewLine) {
	        --context.indentLevel;
	      } else {
	        newline(--context.indentLevel);
	      }
	    },
	    newline() {
	      newline(context.indentLevel);
	    }
	  };
	  function newline(n) {
	    context.push("\n" + `  `.repeat(n), 0 /* Start */);
	  }
	  function addMapping(loc, name = null) {
	    const { _names, _mappings } = context.map;
	    if (name !== null && !_names.has(name)) _names.add(name);
	    _mappings.add({
	      originalLine: loc.line,
	      originalColumn: loc.column - 1,
	      // source-map column is 0 based
	      generatedLine: context.line,
	      generatedColumn: context.column - 1,
	      source: filename,
	      name
	    });
	  }
	  if (sourceMap) {
	    context.map = new sourceMapJs.SourceMapGenerator();
	    context.map.setSourceContent(filename, context.source);
	    context.map._sources.add(filename);
	  }
	  return context;
	}
	function generate(ast, options = {}) {
	  const context = createCodegenContext(ast, options);
	  if (options.onContextCreated) options.onContextCreated(context);
	  const {
	    mode,
	    push,
	    prefixIdentifiers,
	    indent,
	    deindent,
	    newline,
	    scopeId,
	    ssr
	  } = context;
	  const helpers = Array.from(ast.helpers);
	  const hasHelpers = helpers.length > 0;
	  const useWithBlock = !prefixIdentifiers && mode !== "module";
	  const genScopeId = scopeId != null && mode === "module";
	  const isSetupInlined = !!options.inline;
	  const preambleContext = isSetupInlined ? createCodegenContext(ast, options) : context;
	  if (mode === "module") {
	    genModulePreamble(ast, preambleContext, genScopeId, isSetupInlined);
	  } else {
	    genFunctionPreamble(ast, preambleContext);
	  }
	  const functionName = ssr ? `ssrRender` : `render`;
	  const args = ssr ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"];
	  if (options.bindingMetadata && !options.inline) {
	    args.push("$props", "$setup", "$data", "$options");
	  }
	  const signature = options.isTS ? args.map((arg) => `${arg}: any`).join(",") : args.join(", ");
	  if (isSetupInlined) {
	    push(`(${signature}) => {`);
	  } else {
	    push(`function ${functionName}(${signature}) {`);
	  }
	  indent();
	  if (useWithBlock) {
	    push(`with (_ctx) {`);
	    indent();
	    if (hasHelpers) {
	      push(
	        `const { ${helpers.map(aliasHelper).join(", ")} } = _Vue
`,
	        -1 /* End */
	      );
	      newline();
	    }
	  }
	  if (ast.components.length) {
	    genAssets(ast.components, "component", context);
	    if (ast.directives.length || ast.temps > 0) {
	      newline();
	    }
	  }
	  if (ast.directives.length) {
	    genAssets(ast.directives, "directive", context);
	    if (ast.temps > 0) {
	      newline();
	    }
	  }
	  if (ast.filters && ast.filters.length) {
	    newline();
	    genAssets(ast.filters, "filter", context);
	    newline();
	  }
	  if (ast.temps > 0) {
	    push(`let `);
	    for (let i = 0; i < ast.temps; i++) {
	      push(`${i > 0 ? `, ` : ``}_temp${i}`);
	    }
	  }
	  if (ast.components.length || ast.directives.length || ast.temps) {
	    push(`
`, 0 /* Start */);
	    newline();
	  }
	  if (!ssr) {
	    push(`return `);
	  }
	  if (ast.codegenNode) {
	    genNode(ast.codegenNode, context);
	  } else {
	    push(`null`);
	  }
	  if (useWithBlock) {
	    deindent();
	    push(`}`);
	  }
	  deindent();
	  push(`}`);
	  return {
	    ast,
	    code: context.code,
	    preamble: isSetupInlined ? preambleContext.code : ``,
	    map: context.map ? context.map.toJSON() : void 0
	  };
	}
	function genFunctionPreamble(ast, context) {
	  const {
	    ssr,
	    prefixIdentifiers,
	    push,
	    newline,
	    runtimeModuleName,
	    runtimeGlobalName,
	    ssrRuntimeModuleName
	  } = context;
	  const VueBinding = ssr ? `require(${JSON.stringify(runtimeModuleName)})` : runtimeGlobalName;
	  const helpers = Array.from(ast.helpers);
	  if (helpers.length > 0) {
	    if (prefixIdentifiers) {
	      push(
	        `const { ${helpers.map(aliasHelper).join(", ")} } = ${VueBinding}
`,
	        -1 /* End */
	      );
	    } else {
	      push(`const _Vue = ${VueBinding}
`, -1 /* End */);
	      if (ast.hoists.length) {
	        const staticHelpers = [
	          CREATE_VNODE,
	          CREATE_ELEMENT_VNODE,
	          CREATE_COMMENT,
	          CREATE_TEXT,
	          CREATE_STATIC
	        ].filter((helper) => helpers.includes(helper)).map(aliasHelper).join(", ");
	        push(`const { ${staticHelpers} } = _Vue
`, -1 /* End */);
	      }
	    }
	  }
	  if (ast.ssrHelpers && ast.ssrHelpers.length) {
	    push(
	      `const { ${ast.ssrHelpers.map(aliasHelper).join(", ")} } = require("${ssrRuntimeModuleName}")
`,
	      -1 /* End */
	    );
	  }
	  genHoists(ast.hoists, context);
	  newline();
	  push(`return `);
	}
	function genModulePreamble(ast, context, genScopeId, inline) {
	  const {
	    push,
	    newline,
	    optimizeImports,
	    runtimeModuleName,
	    ssrRuntimeModuleName
	  } = context;
	  if (ast.helpers.size) {
	    const helpers = Array.from(ast.helpers);
	    if (optimizeImports) {
	      push(
	        `import { ${helpers.map((s) => helperNameMap[s]).join(", ")} } from ${JSON.stringify(runtimeModuleName)}
`,
	        -1 /* End */
	      );
	      push(
	        `
// Binding optimization for webpack code-split
const ${helpers.map((s) => `_${helperNameMap[s]} = ${helperNameMap[s]}`).join(", ")}
`,
	        -1 /* End */
	      );
	    } else {
	      push(
	        `import { ${helpers.map((s) => `${helperNameMap[s]} as _${helperNameMap[s]}`).join(", ")} } from ${JSON.stringify(runtimeModuleName)}
`,
	        -1 /* End */
	      );
	    }
	  }
	  if (ast.ssrHelpers && ast.ssrHelpers.length) {
	    push(
	      `import { ${ast.ssrHelpers.map((s) => `${helperNameMap[s]} as _${helperNameMap[s]}`).join(", ")} } from "${ssrRuntimeModuleName}"
`,
	      -1 /* End */
	    );
	  }
	  if (ast.imports.length) {
	    genImports(ast.imports, context);
	    newline();
	  }
	  genHoists(ast.hoists, context);
	  newline();
	  if (!inline) {
	    push(`export `);
	  }
	}
	function genAssets(assets, type, { helper, push, newline, isTS }) {
	  const resolver = helper(
	    type === "filter" ? RESOLVE_FILTER : type === "component" ? RESOLVE_COMPONENT : RESOLVE_DIRECTIVE
	  );
	  for (let i = 0; i < assets.length; i++) {
	    let id = assets[i];
	    const maybeSelfReference = id.endsWith("__self");
	    if (maybeSelfReference) {
	      id = id.slice(0, -6);
	    }
	    push(
	      `const ${toValidAssetId(id, type)} = ${resolver}(${JSON.stringify(id)}${maybeSelfReference ? `, true` : ``})${isTS ? `!` : ``}`
	    );
	    if (i < assets.length - 1) {
	      newline();
	    }
	  }
	}
	function genHoists(hoists, context) {
	  if (!hoists.length) {
	    return;
	  }
	  context.pure = true;
	  const { push, newline } = context;
	  newline();
	  for (let i = 0; i < hoists.length; i++) {
	    const exp = hoists[i];
	    if (exp) {
	      push(`const _hoisted_${i + 1} = `);
	      genNode(exp, context);
	      newline();
	    }
	  }
	  context.pure = false;
	}
	function genImports(importsOptions, context) {
	  if (!importsOptions.length) {
	    return;
	  }
	  importsOptions.forEach((imports) => {
	    context.push(`import `);
	    genNode(imports.exp, context);
	    context.push(` from '${imports.path}'`);
	    context.newline();
	  });
	}
	function isText(n) {
	  return shared.isString(n) || n.type === 4 || n.type === 2 || n.type === 5 || n.type === 8;
	}
	function genNodeListAsArray(nodes, context) {
	  const multilines = nodes.length > 3 || nodes.some((n) => shared.isArray(n) || !isText(n));
	  context.push(`[`);
	  multilines && context.indent();
	  genNodeList(nodes, context, multilines);
	  multilines && context.deindent();
	  context.push(`]`);
	}
	function genNodeList(nodes, context, multilines = false, comma = true) {
	  const { push, newline } = context;
	  for (let i = 0; i < nodes.length; i++) {
	    const node = nodes[i];
	    if (shared.isString(node)) {
	      push(node, -3 /* Unknown */);
	    } else if (shared.isArray(node)) {
	      genNodeListAsArray(node, context);
	    } else {
	      genNode(node, context);
	    }
	    if (i < nodes.length - 1) {
	      if (multilines) {
	        comma && push(",");
	        newline();
	      } else {
	        comma && push(", ");
	      }
	    }
	  }
	}
	function genNode(node, context) {
	  if (shared.isString(node)) {
	    context.push(node, -3 /* Unknown */);
	    return;
	  }
	  if (shared.isSymbol(node)) {
	    context.push(context.helper(node));
	    return;
	  }
	  switch (node.type) {
	    case 1:
	    case 9:
	    case 11:
	      genNode(node.codegenNode, context);
	      break;
	    case 2:
	      genText(node, context);
	      break;
	    case 4:
	      genExpression(node, context);
	      break;
	    case 5:
	      genInterpolation(node, context);
	      break;
	    case 12:
	      genNode(node.codegenNode, context);
	      break;
	    case 8:
	      genCompoundExpression(node, context);
	      break;
	    case 3:
	      genComment(node, context);
	      break;
	    case 13:
	      genVNodeCall(node, context);
	      break;
	    case 14:
	      genCallExpression(node, context);
	      break;
	    case 15:
	      genObjectExpression(node, context);
	      break;
	    case 17:
	      genArrayExpression(node, context);
	      break;
	    case 18:
	      genFunctionExpression(node, context);
	      break;
	    case 19:
	      genConditionalExpression(node, context);
	      break;
	    case 20:
	      genCacheExpression(node, context);
	      break;
	    case 21:
	      genNodeList(node.body, context, true, false);
	      break;
	    // SSR only types
	    case 22:
	      genTemplateLiteral(node, context);
	      break;
	    case 23:
	      genIfStatement(node, context);
	      break;
	    case 24:
	      genAssignmentExpression(node, context);
	      break;
	    case 25:
	      genSequenceExpression(node, context);
	      break;
	    case 26:
	      genReturnStatement(node, context);
	      break;
	  }
	}
	function genText(node, context) {
	  context.push(JSON.stringify(node.content), -3 /* Unknown */, node);
	}
	function genExpression(node, context) {
	  const { content, isStatic } = node;
	  context.push(
	    isStatic ? JSON.stringify(content) : content,
	    -3 /* Unknown */,
	    node
	  );
	}
	function genInterpolation(node, context) {
	  const { push, helper, pure } = context;
	  if (pure) push(PURE_ANNOTATION);
	  push(`${helper(TO_DISPLAY_STRING)}(`);
	  genNode(node.content, context);
	  push(`)`);
	}
	function genCompoundExpression(node, context) {
	  for (let i = 0; i < node.children.length; i++) {
	    const child = node.children[i];
	    if (shared.isString(child)) {
	      context.push(child, -3 /* Unknown */);
	    } else {
	      genNode(child, context);
	    }
	  }
	}
	function genExpressionAsPropertyKey(node, context) {
	  const { push } = context;
	  if (node.type === 8) {
	    push(`[`);
	    genCompoundExpression(node, context);
	    push(`]`);
	  } else if (node.isStatic) {
	    const text = isSimpleIdentifier(node.content) ? node.content : JSON.stringify(node.content);
	    push(text, -2 /* None */, node);
	  } else {
	    push(`[${node.content}]`, -3 /* Unknown */, node);
	  }
	}
	function genComment(node, context) {
	  const { push, helper, pure } = context;
	  if (pure) {
	    push(PURE_ANNOTATION);
	  }
	  push(
	    `${helper(CREATE_COMMENT)}(${JSON.stringify(node.content)})`,
	    -3 /* Unknown */,
	    node
	  );
	}
	function genVNodeCall(node, context) {
	  const { push, helper, pure } = context;
	  const {
	    tag,
	    props,
	    children,
	    patchFlag,
	    dynamicProps,
	    directives,
	    isBlock,
	    disableTracking,
	    isComponent
	  } = node;
	  let patchFlagString;
	  if (patchFlag) {
	    {
	      patchFlagString = String(patchFlag);
	    }
	  }
	  if (directives) {
	    push(helper(WITH_DIRECTIVES) + `(`);
	  }
	  if (isBlock) {
	    push(`(${helper(OPEN_BLOCK)}(${disableTracking ? `true` : ``}), `);
	  }
	  if (pure) {
	    push(PURE_ANNOTATION);
	  }
	  const callHelper = isBlock ? getVNodeBlockHelper(context.inSSR, isComponent) : getVNodeHelper(context.inSSR, isComponent);
	  push(helper(callHelper) + `(`, -2 /* None */, node);
	  genNodeList(
	    genNullableArgs([tag, props, children, patchFlagString, dynamicProps]),
	    context
	  );
	  push(`)`);
	  if (isBlock) {
	    push(`)`);
	  }
	  if (directives) {
	    push(`, `);
	    genNode(directives, context);
	    push(`)`);
	  }
	}
	function genNullableArgs(args) {
	  let i = args.length;
	  while (i--) {
	    if (args[i] != null) break;
	  }
	  return args.slice(0, i + 1).map((arg) => arg || `null`);
	}
	function genCallExpression(node, context) {
	  const { push, helper, pure } = context;
	  const callee = shared.isString(node.callee) ? node.callee : helper(node.callee);
	  if (pure) {
	    push(PURE_ANNOTATION);
	  }
	  push(callee + `(`, -2 /* None */, node);
	  genNodeList(node.arguments, context);
	  push(`)`);
	}
	function genObjectExpression(node, context) {
	  const { push, indent, deindent, newline } = context;
	  const { properties } = node;
	  if (!properties.length) {
	    push(`{}`, -2 /* None */, node);
	    return;
	  }
	  const multilines = properties.length > 1 || properties.some((p) => p.value.type !== 4);
	  push(multilines ? `{` : `{ `);
	  multilines && indent();
	  for (let i = 0; i < properties.length; i++) {
	    const { key, value } = properties[i];
	    genExpressionAsPropertyKey(key, context);
	    push(`: `);
	    genNode(value, context);
	    if (i < properties.length - 1) {
	      push(`,`);
	      newline();
	    }
	  }
	  multilines && deindent();
	  push(multilines ? `}` : ` }`);
	}
	function genArrayExpression(node, context) {
	  genNodeListAsArray(node.elements, context);
	}
	function genFunctionExpression(node, context) {
	  const { push, indent, deindent } = context;
	  const { params, returns, body, newline, isSlot } = node;
	  if (isSlot) {
	    push(`_${helperNameMap[WITH_CTX]}(`);
	  }
	  push(`(`, -2 /* None */, node);
	  if (shared.isArray(params)) {
	    genNodeList(params, context);
	  } else if (params) {
	    genNode(params, context);
	  }
	  push(`) => `);
	  if (newline || body) {
	    push(`{`);
	    indent();
	  }
	  if (returns) {
	    if (newline) {
	      push(`return `);
	    }
	    if (shared.isArray(returns)) {
	      genNodeListAsArray(returns, context);
	    } else {
	      genNode(returns, context);
	    }
	  } else if (body) {
	    genNode(body, context);
	  }
	  if (newline || body) {
	    deindent();
	    push(`}`);
	  }
	  if (isSlot) {
	    if (node.isNonScopedSlot) {
	      push(`, undefined, true`);
	    }
	    push(`)`);
	  }
	}
	function genConditionalExpression(node, context) {
	  const { test, consequent, alternate, newline: needNewline } = node;
	  const { push, indent, deindent, newline } = context;
	  if (test.type === 4) {
	    const needsParens = !isSimpleIdentifier(test.content);
	    needsParens && push(`(`);
	    genExpression(test, context);
	    needsParens && push(`)`);
	  } else {
	    push(`(`);
	    genNode(test, context);
	    push(`)`);
	  }
	  needNewline && indent();
	  context.indentLevel++;
	  needNewline || push(` `);
	  push(`? `);
	  genNode(consequent, context);
	  context.indentLevel--;
	  needNewline && newline();
	  needNewline || push(` `);
	  push(`: `);
	  const isNested = alternate.type === 19;
	  if (!isNested) {
	    context.indentLevel++;
	  }
	  genNode(alternate, context);
	  if (!isNested) {
	    context.indentLevel--;
	  }
	  needNewline && deindent(
	    true
	    /* without newline */
	  );
	}
	function genCacheExpression(node, context) {
	  const { push, helper, indent, deindent, newline } = context;
	  const { needPauseTracking, needArraySpread } = node;
	  if (needArraySpread) {
	    push(`[...(`);
	  }
	  push(`_cache[${node.index}] || (`);
	  if (needPauseTracking) {
	    indent();
	    push(`${helper(SET_BLOCK_TRACKING)}(-1`);
	    if (node.inVOnce) push(`, true`);
	    push(`),`);
	    newline();
	    push(`(`);
	  }
	  push(`_cache[${node.index}] = `);
	  genNode(node.value, context);
	  if (needPauseTracking) {
	    push(`).cacheIndex = ${node.index},`);
	    newline();
	    push(`${helper(SET_BLOCK_TRACKING)}(1),`);
	    newline();
	    push(`_cache[${node.index}]`);
	    deindent();
	  }
	  push(`)`);
	  if (needArraySpread) {
	    push(`)]`);
	  }
	}
	function genTemplateLiteral(node, context) {
	  const { push, indent, deindent } = context;
	  push("`");
	  const l = node.elements.length;
	  const multilines = l > 3;
	  for (let i = 0; i < l; i++) {
	    const e = node.elements[i];
	    if (shared.isString(e)) {
	      push(e.replace(/(`|\$|\\)/g, "\\$1"), -3 /* Unknown */);
	    } else {
	      push("${");
	      if (multilines) indent();
	      genNode(e, context);
	      if (multilines) deindent();
	      push("}");
	    }
	  }
	  push("`");
	}
	function genIfStatement(node, context) {
	  const { push, indent, deindent } = context;
	  const { test, consequent, alternate } = node;
	  push(`if (`);
	  genNode(test, context);
	  push(`) {`);
	  indent();
	  genNode(consequent, context);
	  deindent();
	  push(`}`);
	  if (alternate) {
	    push(` else `);
	    if (alternate.type === 23) {
	      genIfStatement(alternate, context);
	    } else {
	      push(`{`);
	      indent();
	      genNode(alternate, context);
	      deindent();
	      push(`}`);
	    }
	  }
	}
	function genAssignmentExpression(node, context) {
	  genNode(node.left, context);
	  context.push(` = `);
	  genNode(node.right, context);
	}
	function genSequenceExpression(node, context) {
	  context.push(`(`);
	  genNodeList(node.expressions, context);
	  context.push(`)`);
	}
	function genReturnStatement({ returns }, context) {
	  context.push(`return `);
	  if (shared.isArray(returns)) {
	    genNodeListAsArray(returns, context);
	  } else {
	    genNode(returns, context);
	  }
	}

	const isLiteralWhitelisted = /* @__PURE__ */ shared.makeMap("true,false,null,this");
	const transformExpression = (node, context) => {
	  if (node.type === 5) {
	    node.content = processExpression(
	      node.content,
	      context
	    );
	  } else if (node.type === 1) {
	    const memo = findDir(node, "memo");
	    for (let i = 0; i < node.props.length; i++) {
	      const dir = node.props[i];
	      if (dir.type === 7 && dir.name !== "for") {
	        const exp = dir.exp;
	        const arg = dir.arg;
	        if (exp && exp.type === 4 && !(dir.name === "on" && arg) && // key has been processed in transformFor(vMemo + vFor)
	        !(memo && arg && arg.type === 4 && arg.content === "key")) {
	          dir.exp = processExpression(
	            exp,
	            context,
	            // slot args must be processed as function params
	            dir.name === "slot"
	          );
	        }
	        if (arg && arg.type === 4 && !arg.isStatic) {
	          dir.arg = processExpression(arg, context);
	        }
	      }
	    }
	  }
	};
	function processExpression(node, context, asParams = false, asRawStatements = false, localVars = Object.create(context.identifiers)) {
	  if (!context.prefixIdentifiers || !node.content.trim()) {
	    return node;
	  }
	  const { inline, bindingMetadata } = context;
	  const rewriteIdentifier = (raw, parent, id) => {
	    const type = shared.hasOwn(bindingMetadata, raw) && bindingMetadata[raw];
	    if (inline) {
	      const isAssignmentLVal = parent && parent.type === "AssignmentExpression" && parent.left === id;
	      const isUpdateArg = parent && parent.type === "UpdateExpression" && parent.argument === id;
	      const isDestructureAssignment = parent && isInDestructureAssignment(parent, parentStack);
	      const isNewExpression = parent && isInNewExpression(parentStack);
	      const wrapWithUnref = (raw2) => {
	        const wrapped = `${context.helperString(UNREF)}(${raw2})`;
	        return isNewExpression ? `(${wrapped})` : wrapped;
	      };
	      if (isConst(type) || type === "setup-reactive-const" || localVars[raw]) {
	        return raw;
	      } else if (type === "setup-ref") {
	        return `${raw}.value`;
	      } else if (type === "setup-maybe-ref") {
	        return isAssignmentLVal || isUpdateArg || isDestructureAssignment ? `${raw}.value` : wrapWithUnref(raw);
	      } else if (type === "setup-let") {
	        if (isAssignmentLVal) {
	          const { right: rVal, operator } = parent;
	          const rExp = rawExp.slice(rVal.start - 1, rVal.end - 1);
	          const rExpString = stringifyExpression(
	            processExpression(
	              createSimpleExpression(rExp, false),
	              context,
	              false,
	              false,
	              knownIds
	            )
	          );
	          return `${context.helperString(IS_REF)}(${raw})${context.isTS ? ` //@ts-ignore
` : ``} ? ${raw}.value ${operator} ${rExpString} : ${raw}`;
	        } else if (isUpdateArg) {
	          id.start = parent.start;
	          id.end = parent.end;
	          const { prefix: isPrefix, operator } = parent;
	          const prefix = isPrefix ? operator : ``;
	          const postfix = isPrefix ? `` : operator;
	          return `${context.helperString(IS_REF)}(${raw})${context.isTS ? ` //@ts-ignore
` : ``} ? ${prefix}${raw}.value${postfix} : ${prefix}${raw}${postfix}`;
	        } else if (isDestructureAssignment) {
	          return raw;
	        } else {
	          return wrapWithUnref(raw);
	        }
	      } else if (type === "props") {
	        return shared.genPropsAccessExp(raw);
	      } else if (type === "props-aliased") {
	        return shared.genPropsAccessExp(bindingMetadata.__propsAliases[raw]);
	      }
	    } else {
	      if (type && type.startsWith("setup") || type === "literal-const") {
	        return `$setup.${raw}`;
	      } else if (type === "props-aliased") {
	        return `$props['${bindingMetadata.__propsAliases[raw]}']`;
	      } else if (type) {
	        return `$${type}.${raw}`;
	      }
	    }
	    return `_ctx.${raw}`;
	  };
	  const rawExp = node.content;
	  let ast = node.ast;
	  if (ast === false) {
	    return node;
	  }
	  if (ast === null || !ast && isSimpleIdentifier(rawExp)) {
	    const isScopeVarReference = context.identifiers[rawExp];
	    const isAllowedGlobal = shared.isGloballyAllowed(rawExp);
	    const isLiteral = isLiteralWhitelisted(rawExp);
	    if (!asParams && !isScopeVarReference && !isLiteral && (!isAllowedGlobal || bindingMetadata[rawExp])) {
	      if (isConst(bindingMetadata[rawExp])) {
	        node.constType = 1;
	      }
	      node.content = rewriteIdentifier(rawExp);
	    } else if (!isScopeVarReference) {
	      if (isLiteral) {
	        node.constType = 3;
	      } else {
	        node.constType = 2;
	      }
	    }
	    return node;
	  }
	  if (!ast) {
	    const source = asRawStatements ? ` ${rawExp} ` : `(${rawExp})${asParams ? `=>{}` : ``}`;
	    try {
	      ast = parser.parseExpression(source, {
	        sourceType: "module",
	        plugins: context.expressionPlugins
	      });
	    } catch (e) {
	      context.onError(
	        createCompilerError(
	          45,
	          node.loc,
	          void 0,
	          e.message
	        )
	      );
	      return node;
	    }
	  }
	  const ids = [];
	  const parentStack = [];
	  const knownIds = Object.create(context.identifiers);
	  walkIdentifiers(
	    ast,
	    (node2, parent, _, isReferenced, isLocal) => {
	      if (isStaticPropertyKey(node2, parent)) {
	        return;
	      }
	      if (node2.name.startsWith("_filter_")) {
	        return;
	      }
	      const needPrefix = isReferenced && canPrefix(node2);
	      if (needPrefix && !isLocal) {
	        if (isStaticProperty(parent) && parent.shorthand) {
	          node2.prefix = `${node2.name}: `;
	        }
	        node2.name = rewriteIdentifier(node2.name, parent, node2);
	        ids.push(node2);
	      } else {
	        if (!(needPrefix && isLocal) && (!parent || parent.type !== "CallExpression" && parent.type !== "NewExpression" && parent.type !== "MemberExpression")) {
	          node2.isConstant = true;
	        }
	        ids.push(node2);
	      }
	    },
	    true,
	    // invoke on ALL identifiers
	    parentStack,
	    knownIds
	  );
	  const children = [];
	  ids.sort((a, b) => a.start - b.start);
	  ids.forEach((id, i) => {
	    const start = id.start - 1;
	    const end = id.end - 1;
	    const last = ids[i - 1];
	    const leadingText = rawExp.slice(last ? last.end - 1 : 0, start);
	    if (leadingText.length || id.prefix) {
	      children.push(leadingText + (id.prefix || ``));
	    }
	    const source = rawExp.slice(start, end);
	    children.push(
	      createSimpleExpression(
	        id.name,
	        false,
	        {
	          start: advancePositionWithClone(node.loc.start, source, start),
	          end: advancePositionWithClone(node.loc.start, source, end),
	          source
	        },
	        id.isConstant ? 3 : 0
	      )
	    );
	    if (i === ids.length - 1 && end < rawExp.length) {
	      children.push(rawExp.slice(end));
	    }
	  });
	  let ret;
	  if (children.length) {
	    ret = createCompoundExpression(children, node.loc);
	    ret.ast = ast;
	  } else {
	    ret = node;
	    ret.constType = 3;
	  }
	  ret.identifiers = Object.keys(knownIds);
	  return ret;
	}
	function canPrefix(id) {
	  if (shared.isGloballyAllowed(id.name)) {
	    return false;
	  }
	  if (id.name === "require") {
	    return false;
	  }
	  return true;
	}
	function stringifyExpression(exp) {
	  if (shared.isString(exp)) {
	    return exp;
	  } else if (exp.type === 4) {
	    return exp.content;
	  } else {
	    return exp.children.map(stringifyExpression).join("");
	  }
	}
	function isConst(type) {
	  return type === "setup-const" || type === "literal-const";
	}

	const transformIf = createStructuralDirectiveTransform(
	  /^(if|else|else-if)$/,
	  (node, dir, context) => {
	    return processIf(node, dir, context, (ifNode, branch, isRoot) => {
	      const siblings = context.parent.children;
	      let i = siblings.indexOf(ifNode);
	      let key = 0;
	      while (i-- >= 0) {
	        const sibling = siblings[i];
	        if (sibling && sibling.type === 9) {
	          key += sibling.branches.length;
	        }
	      }
	      return () => {
	        if (isRoot) {
	          ifNode.codegenNode = createCodegenNodeForBranch(
	            branch,
	            key,
	            context
	          );
	        } else {
	          const parentCondition = getParentCondition(ifNode.codegenNode);
	          parentCondition.alternate = createCodegenNodeForBranch(
	            branch,
	            key + ifNode.branches.length - 1,
	            context
	          );
	        }
	      };
	    });
	  }
	);
	function processIf(node, dir, context, processCodegen) {
	  if (dir.name !== "else" && (!dir.exp || !dir.exp.content.trim())) {
	    const loc = dir.exp ? dir.exp.loc : node.loc;
	    context.onError(
	      createCompilerError(28, dir.loc)
	    );
	    dir.exp = createSimpleExpression(`true`, false, loc);
	  }
	  if (context.prefixIdentifiers && dir.exp) {
	    dir.exp = processExpression(dir.exp, context);
	  }
	  if (dir.name === "if") {
	    const branch = createIfBranch(node, dir);
	    const ifNode = {
	      type: 9,
	      loc: cloneLoc(node.loc),
	      branches: [branch]
	    };
	    context.replaceNode(ifNode);
	    if (processCodegen) {
	      return processCodegen(ifNode, branch, true);
	    }
	  } else {
	    const siblings = context.parent.children;
	    let i = siblings.indexOf(node);
	    while (i-- >= -1) {
	      const sibling = siblings[i];
	      if (sibling && sibling.type === 3) {
	        context.removeNode(sibling);
	        continue;
	      }
	      if (sibling && sibling.type === 2 && !sibling.content.trim().length) {
	        context.removeNode(sibling);
	        continue;
	      }
	      if (sibling && sibling.type === 9) {
	        if (dir.name === "else-if" && sibling.branches[sibling.branches.length - 1].condition === void 0) {
	          context.onError(
	            createCompilerError(30, node.loc)
	          );
	        }
	        context.removeNode();
	        const branch = createIfBranch(node, dir);
	        {
	          const key = branch.userKey;
	          if (key) {
	            sibling.branches.forEach(({ userKey }) => {
	              if (isSameKey(userKey, key)) {
	                context.onError(
	                  createCompilerError(
	                    29,
	                    branch.userKey.loc
	                  )
	                );
	              }
	            });
	          }
	        }
	        sibling.branches.push(branch);
	        const onExit = processCodegen && processCodegen(sibling, branch, false);
	        traverseNode(branch, context);
	        if (onExit) onExit();
	        context.currentNode = null;
	      } else {
	        context.onError(
	          createCompilerError(30, node.loc)
	        );
	      }
	      break;
	    }
	  }
	}
	function createIfBranch(node, dir) {
	  const isTemplateIf = node.tagType === 3;
	  return {
	    type: 10,
	    loc: node.loc,
	    condition: dir.name === "else" ? void 0 : dir.exp,
	    children: isTemplateIf && !findDir(node, "for") ? node.children : [node],
	    userKey: findProp(node, `key`),
	    isTemplateIf
	  };
	}
	function createCodegenNodeForBranch(branch, keyIndex, context) {
	  if (branch.condition) {
	    return createConditionalExpression(
	      branch.condition,
	      createChildrenCodegenNode(branch, keyIndex, context),
	      // make sure to pass in asBlock: true so that the comment node call
	      // closes the current block.
	      createCallExpression(context.helper(CREATE_COMMENT), [
	        '""',
	        "true"
	      ])
	    );
	  } else {
	    return createChildrenCodegenNode(branch, keyIndex, context);
	  }
	}
	function createChildrenCodegenNode(branch, keyIndex, context) {
	  const { helper } = context;
	  const keyProperty = createObjectProperty(
	    `key`,
	    createSimpleExpression(
	      `${keyIndex}`,
	      false,
	      locStub,
	      2
	    )
	  );
	  const { children } = branch;
	  const firstChild = children[0];
	  const needFragmentWrapper = children.length !== 1 || firstChild.type !== 1;
	  if (needFragmentWrapper) {
	    if (children.length === 1 && firstChild.type === 11) {
	      const vnodeCall = firstChild.codegenNode;
	      injectProp(vnodeCall, keyProperty, context);
	      return vnodeCall;
	    } else {
	      let patchFlag = 64;
	      return createVNodeCall(
	        context,
	        helper(FRAGMENT),
	        createObjectExpression([keyProperty]),
	        children,
	        patchFlag,
	        void 0,
	        void 0,
	        true,
	        false,
	        false,
	        branch.loc
	      );
	    }
	  } else {
	    const ret = firstChild.codegenNode;
	    const vnodeCall = getMemoedVNodeCall(ret);
	    if (vnodeCall.type === 13) {
	      convertToBlock(vnodeCall, context);
	    }
	    injectProp(vnodeCall, keyProperty, context);
	    return ret;
	  }
	}
	function isSameKey(a, b) {
	  if (!a || a.type !== b.type) {
	    return false;
	  }
	  if (a.type === 6) {
	    if (a.value.content !== b.value.content) {
	      return false;
	    }
	  } else {
	    const exp = a.exp;
	    const branchExp = b.exp;
	    if (exp.type !== branchExp.type) {
	      return false;
	    }
	    if (exp.type !== 4 || exp.isStatic !== branchExp.isStatic || exp.content !== branchExp.content) {
	      return false;
	    }
	  }
	  return true;
	}
	function getParentCondition(node) {
	  while (true) {
	    if (node.type === 19) {
	      if (node.alternate.type === 19) {
	        node = node.alternate;
	      } else {
	        return node;
	      }
	    } else if (node.type === 20) {
	      node = node.value;
	    }
	  }
	}

	const transformBind = (dir, _node, context) => {
	  const { modifiers, loc } = dir;
	  const arg = dir.arg;
	  let { exp } = dir;
	  if (exp && exp.type === 4 && !exp.content.trim()) {
	    {
	      context.onError(
	        createCompilerError(34, loc)
	      );
	      return {
	        props: [
	          createObjectProperty(arg, createSimpleExpression("", true, loc))
	        ]
	      };
	    }
	  }
	  if (!exp) {
	    if (arg.type !== 4 || !arg.isStatic) {
	      context.onError(
	        createCompilerError(
	          52,
	          arg.loc
	        )
	      );
	      return {
	        props: [
	          createObjectProperty(arg, createSimpleExpression("", true, loc))
	        ]
	      };
	    }
	    transformBindShorthand(dir, context);
	    exp = dir.exp;
	  }
	  if (arg.type !== 4) {
	    arg.children.unshift(`(`);
	    arg.children.push(`) || ""`);
	  } else if (!arg.isStatic) {
	    arg.content = arg.content ? `${arg.content} || ""` : `""`;
	  }
	  if (modifiers.some((mod) => mod.content === "camel")) {
	    if (arg.type === 4) {
	      if (arg.isStatic) {
	        arg.content = shared.camelize(arg.content);
	      } else {
	        arg.content = `${context.helperString(CAMELIZE)}(${arg.content})`;
	      }
	    } else {
	      arg.children.unshift(`${context.helperString(CAMELIZE)}(`);
	      arg.children.push(`)`);
	    }
	  }
	  if (!context.inSSR) {
	    if (modifiers.some((mod) => mod.content === "prop")) {
	      injectPrefix(arg, ".");
	    }
	    if (modifiers.some((mod) => mod.content === "attr")) {
	      injectPrefix(arg, "^");
	    }
	  }
	  return {
	    props: [createObjectProperty(arg, exp)]
	  };
	};
	const transformBindShorthand = (dir, context) => {
	  const arg = dir.arg;
	  const propName = shared.camelize(arg.content);
	  dir.exp = createSimpleExpression(propName, false, arg.loc);
	  {
	    dir.exp = processExpression(dir.exp, context);
	  }
	};
	const injectPrefix = (arg, prefix) => {
	  if (arg.type === 4) {
	    if (arg.isStatic) {
	      arg.content = prefix + arg.content;
	    } else {
	      arg.content = `\`${prefix}\${${arg.content}}\``;
	    }
	  } else {
	    arg.children.unshift(`'${prefix}' + (`);
	    arg.children.push(`)`);
	  }
	};

	const transformFor = createStructuralDirectiveTransform(
	  "for",
	  (node, dir, context) => {
	    const { helper, removeHelper } = context;
	    return processFor(node, dir, context, (forNode) => {
	      const renderExp = createCallExpression(helper(RENDER_LIST), [
	        forNode.source
	      ]);
	      const isTemplate = isTemplateNode(node);
	      const memo = findDir(node, "memo");
	      const keyProp = findProp(node, `key`, false, true);
	      const isDirKey = keyProp && keyProp.type === 7;
	      if (isDirKey && !keyProp.exp) {
	        transformBindShorthand(keyProp, context);
	      }
	      let keyExp = keyProp && (keyProp.type === 6 ? keyProp.value ? createSimpleExpression(keyProp.value.content, true) : void 0 : keyProp.exp);
	      if (memo && keyExp && isDirKey) {
	        {
	          keyProp.exp = keyExp = processExpression(
	            keyExp,
	            context
	          );
	        }
	      }
	      const keyProperty = keyProp && keyExp ? createObjectProperty(`key`, keyExp) : null;
	      if (isTemplate) {
	        if (memo) {
	          memo.exp = processExpression(
	            memo.exp,
	            context
	          );
	        }
	        if (keyProperty && keyProp.type !== 6) {
	          keyProperty.value = processExpression(
	            keyProperty.value,
	            context
	          );
	        }
	      }
	      const isStableFragment = forNode.source.type === 4 && forNode.source.constType > 0;
	      const fragmentFlag = isStableFragment ? 64 : keyProp ? 128 : 256;
	      forNode.codegenNode = createVNodeCall(
	        context,
	        helper(FRAGMENT),
	        void 0,
	        renderExp,
	        fragmentFlag,
	        void 0,
	        void 0,
	        true,
	        !isStableFragment,
	        false,
	        node.loc
	      );
	      return () => {
	        let childBlock;
	        const { children } = forNode;
	        if (isTemplate) {
	          node.children.some((c) => {
	            if (c.type === 1) {
	              const key = findProp(c, "key");
	              if (key) {
	                context.onError(
	                  createCompilerError(
	                    33,
	                    key.loc
	                  )
	                );
	                return true;
	              }
	            }
	          });
	        }
	        const needFragmentWrapper = children.length !== 1 || children[0].type !== 1;
	        const slotOutlet = isSlotOutlet(node) ? node : isTemplate && node.children.length === 1 && isSlotOutlet(node.children[0]) ? node.children[0] : null;
	        if (slotOutlet) {
	          childBlock = slotOutlet.codegenNode;
	          if (isTemplate && keyProperty) {
	            injectProp(childBlock, keyProperty, context);
	          }
	        } else if (needFragmentWrapper) {
	          childBlock = createVNodeCall(
	            context,
	            helper(FRAGMENT),
	            keyProperty ? createObjectExpression([keyProperty]) : void 0,
	            node.children,
	            64,
	            void 0,
	            void 0,
	            true,
	            void 0,
	            false
	          );
	        } else {
	          childBlock = children[0].codegenNode;
	          if (isTemplate && keyProperty) {
	            injectProp(childBlock, keyProperty, context);
	          }
	          if (childBlock.isBlock !== !isStableFragment) {
	            if (childBlock.isBlock) {
	              removeHelper(OPEN_BLOCK);
	              removeHelper(
	                getVNodeBlockHelper(context.inSSR, childBlock.isComponent)
	              );
	            } else {
	              removeHelper(
	                getVNodeHelper(context.inSSR, childBlock.isComponent)
	              );
	            }
	          }
	          childBlock.isBlock = !isStableFragment;
	          if (childBlock.isBlock) {
	            helper(OPEN_BLOCK);
	            helper(getVNodeBlockHelper(context.inSSR, childBlock.isComponent));
	          } else {
	            helper(getVNodeHelper(context.inSSR, childBlock.isComponent));
	          }
	        }
	        if (memo) {
	          const loop = createFunctionExpression(
	            createForLoopParams(forNode.parseResult, [
	              createSimpleExpression(`_cached`)
	            ])
	          );
	          loop.body = createBlockStatement([
	            createCompoundExpression([`const _memo = (`, memo.exp, `)`]),
	            createCompoundExpression([
	              `if (_cached`,
	              ...keyExp ? [` && _cached.key === `, keyExp] : [],
	              ` && ${context.helperString(
	                IS_MEMO_SAME
	              )}(_cached, _memo)) return _cached`
	            ]),
	            createCompoundExpression([`const _item = `, childBlock]),
	            createSimpleExpression(`_item.memo = _memo`),
	            createSimpleExpression(`return _item`)
	          ]);
	          renderExp.arguments.push(
	            loop,
	            createSimpleExpression(`_cache`),
	            createSimpleExpression(String(context.cached.length))
	          );
	          context.cached.push(null);
	        } else {
	          renderExp.arguments.push(
	            createFunctionExpression(
	              createForLoopParams(forNode.parseResult),
	              childBlock,
	              true
	            )
	          );
	        }
	      };
	    });
	  }
	);
	function processFor(node, dir, context, processCodegen) {
	  if (!dir.exp) {
	    context.onError(
	      createCompilerError(31, dir.loc)
	    );
	    return;
	  }
	  const parseResult = dir.forParseResult;
	  if (!parseResult) {
	    context.onError(
	      createCompilerError(32, dir.loc)
	    );
	    return;
	  }
	  finalizeForParseResult(parseResult, context);
	  const { addIdentifiers, removeIdentifiers, scopes } = context;
	  const { source, value, key, index } = parseResult;
	  const forNode = {
	    type: 11,
	    loc: dir.loc,
	    source,
	    valueAlias: value,
	    keyAlias: key,
	    objectIndexAlias: index,
	    parseResult,
	    children: isTemplateNode(node) ? node.children : [node]
	  };
	  context.replaceNode(forNode);
	  scopes.vFor++;
	  if (context.prefixIdentifiers) {
	    value && addIdentifiers(value);
	    key && addIdentifiers(key);
	    index && addIdentifiers(index);
	  }
	  const onExit = processCodegen && processCodegen(forNode);
	  return () => {
	    scopes.vFor--;
	    if (context.prefixIdentifiers) {
	      value && removeIdentifiers(value);
	      key && removeIdentifiers(key);
	      index && removeIdentifiers(index);
	    }
	    if (onExit) onExit();
	  };
	}
	function finalizeForParseResult(result, context) {
	  if (result.finalized) return;
	  if (context.prefixIdentifiers) {
	    result.source = processExpression(
	      result.source,
	      context
	    );
	    if (result.key) {
	      result.key = processExpression(
	        result.key,
	        context,
	        true
	      );
	    }
	    if (result.index) {
	      result.index = processExpression(
	        result.index,
	        context,
	        true
	      );
	    }
	    if (result.value) {
	      result.value = processExpression(
	        result.value,
	        context,
	        true
	      );
	    }
	  }
	  result.finalized = true;
	}
	function createForLoopParams({ value, key, index }, memoArgs = []) {
	  return createParamsList([value, key, index, ...memoArgs]);
	}
	function createParamsList(args) {
	  let i = args.length;
	  while (i--) {
	    if (args[i]) break;
	  }
	  return args.slice(0, i + 1).map((arg, i2) => arg || createSimpleExpression(`_`.repeat(i2 + 1), false));
	}

	const defaultFallback = createSimpleExpression(`undefined`, false);
	const trackSlotScopes = (node, context) => {
	  if (node.type === 1 && (node.tagType === 1 || node.tagType === 3)) {
	    const vSlot = findDir(node, "slot");
	    if (vSlot) {
	      const slotProps = vSlot.exp;
	      if (context.prefixIdentifiers) {
	        slotProps && context.addIdentifiers(slotProps);
	      }
	      context.scopes.vSlot++;
	      return () => {
	        if (context.prefixIdentifiers) {
	          slotProps && context.removeIdentifiers(slotProps);
	        }
	        context.scopes.vSlot--;
	      };
	    }
	  }
	};
	const trackVForSlotScopes = (node, context) => {
	  let vFor;
	  if (isTemplateNode(node) && node.props.some(isVSlot) && (vFor = findDir(node, "for"))) {
	    const result = vFor.forParseResult;
	    if (result) {
	      finalizeForParseResult(result, context);
	      const { value, key, index } = result;
	      const { addIdentifiers, removeIdentifiers } = context;
	      value && addIdentifiers(value);
	      key && addIdentifiers(key);
	      index && addIdentifiers(index);
	      return () => {
	        value && removeIdentifiers(value);
	        key && removeIdentifiers(key);
	        index && removeIdentifiers(index);
	      };
	    }
	  }
	};
	const buildClientSlotFn = (props, _vForExp, children, loc) => createFunctionExpression(
	  props,
	  children,
	  false,
	  true,
	  children.length ? children[0].loc : loc
	);
	function buildSlots(node, context, buildSlotFn = buildClientSlotFn) {
	  context.helper(WITH_CTX);
	  const { children, loc } = node;
	  const slotsProperties = [];
	  const dynamicSlots = [];
	  let hasDynamicSlots = context.scopes.vSlot > 0 || context.scopes.vFor > 0;
	  if (!context.ssr && context.prefixIdentifiers) {
	    hasDynamicSlots = hasScopeRef(node, context.identifiers);
	  }
	  const onComponentSlot = findDir(node, "slot", true);
	  if (onComponentSlot) {
	    const { arg, exp } = onComponentSlot;
	    if (arg && !isStaticExp(arg)) {
	      hasDynamicSlots = true;
	    }
	    slotsProperties.push(
	      createObjectProperty(
	        arg || createSimpleExpression("default", true),
	        buildSlotFn(exp, void 0, children, loc)
	      )
	    );
	  }
	  let hasTemplateSlots = false;
	  let hasNamedDefaultSlot = false;
	  const implicitDefaultChildren = [];
	  const seenSlotNames = /* @__PURE__ */ new Set();
	  let conditionalBranchIndex = 0;
	  for (let i = 0; i < children.length; i++) {
	    const slotElement = children[i];
	    let slotDir;
	    if (!isTemplateNode(slotElement) || !(slotDir = findDir(slotElement, "slot", true))) {
	      if (slotElement.type !== 3) {
	        implicitDefaultChildren.push(slotElement);
	      }
	      continue;
	    }
	    if (onComponentSlot) {
	      context.onError(
	        createCompilerError(37, slotDir.loc)
	      );
	      break;
	    }
	    hasTemplateSlots = true;
	    const { children: slotChildren, loc: slotLoc } = slotElement;
	    const {
	      arg: slotName = createSimpleExpression(`default`, true),
	      exp: slotProps,
	      loc: dirLoc
	    } = slotDir;
	    let staticSlotName;
	    if (isStaticExp(slotName)) {
	      staticSlotName = slotName ? slotName.content : `default`;
	    } else {
	      hasDynamicSlots = true;
	    }
	    const vFor = findDir(slotElement, "for");
	    const slotFunction = buildSlotFn(slotProps, vFor, slotChildren, slotLoc);
	    let vIf;
	    let vElse;
	    if (vIf = findDir(slotElement, "if")) {
	      hasDynamicSlots = true;
	      dynamicSlots.push(
	        createConditionalExpression(
	          vIf.exp,
	          buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++),
	          defaultFallback
	        )
	      );
	    } else if (vElse = findDir(
	      slotElement,
	      /^else(-if)?$/,
	      true
	      /* allowEmpty */
	    )) {
	      let j = i;
	      let prev;
	      while (j--) {
	        prev = children[j];
	        if (prev.type !== 3 && isNonWhitespaceContent(prev)) {
	          break;
	        }
	      }
	      if (prev && isTemplateNode(prev) && findDir(prev, /^(else-)?if$/)) {
	        let conditional = dynamicSlots[dynamicSlots.length - 1];
	        while (conditional.alternate.type === 19) {
	          conditional = conditional.alternate;
	        }
	        conditional.alternate = vElse.exp ? createConditionalExpression(
	          vElse.exp,
	          buildDynamicSlot(
	            slotName,
	            slotFunction,
	            conditionalBranchIndex++
	          ),
	          defaultFallback
	        ) : buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++);
	      } else {
	        context.onError(
	          createCompilerError(30, vElse.loc)
	        );
	      }
	    } else if (vFor) {
	      hasDynamicSlots = true;
	      const parseResult = vFor.forParseResult;
	      if (parseResult) {
	        finalizeForParseResult(parseResult, context);
	        dynamicSlots.push(
	          createCallExpression(context.helper(RENDER_LIST), [
	            parseResult.source,
	            createFunctionExpression(
	              createForLoopParams(parseResult),
	              buildDynamicSlot(slotName, slotFunction),
	              true
	            )
	          ])
	        );
	      } else {
	        context.onError(
	          createCompilerError(
	            32,
	            vFor.loc
	          )
	        );
	      }
	    } else {
	      if (staticSlotName) {
	        if (seenSlotNames.has(staticSlotName)) {
	          context.onError(
	            createCompilerError(
	              38,
	              dirLoc
	            )
	          );
	          continue;
	        }
	        seenSlotNames.add(staticSlotName);
	        if (staticSlotName === "default") {
	          hasNamedDefaultSlot = true;
	        }
	      }
	      slotsProperties.push(createObjectProperty(slotName, slotFunction));
	    }
	  }
	  if (!onComponentSlot) {
	    const buildDefaultSlotProperty = (props, children2) => {
	      const fn = buildSlotFn(props, void 0, children2, loc);
	      if (context.compatConfig) {
	        fn.isNonScopedSlot = true;
	      }
	      return createObjectProperty(`default`, fn);
	    };
	    if (!hasTemplateSlots) {
	      slotsProperties.push(buildDefaultSlotProperty(void 0, children));
	    } else if (implicitDefaultChildren.length && // #3766
	    // with whitespace: 'preserve', whitespaces between slots will end up in
	    // implicitDefaultChildren. Ignore if all implicit children are whitespaces.
	    implicitDefaultChildren.some((node2) => isNonWhitespaceContent(node2))) {
	      if (hasNamedDefaultSlot) {
	        context.onError(
	          createCompilerError(
	            39,
	            implicitDefaultChildren[0].loc
	          )
	        );
	      } else {
	        slotsProperties.push(
	          buildDefaultSlotProperty(void 0, implicitDefaultChildren)
	        );
	      }
	    }
	  }
	  const slotFlag = hasDynamicSlots ? 2 : hasForwardedSlots(node.children) ? 3 : 1;
	  let slots = createObjectExpression(
	    slotsProperties.concat(
	      createObjectProperty(
	        `_`,
	        // 2 = compiled but dynamic = can skip normalization, but must run diff
	        // 1 = compiled and static = can skip normalization AND diff as optimized
	        createSimpleExpression(
	          slotFlag + (``),
	          false
	        )
	      )
	    ),
	    loc
	  );
	  if (dynamicSlots.length) {
	    slots = createCallExpression(context.helper(CREATE_SLOTS), [
	      slots,
	      createArrayExpression(dynamicSlots)
	    ]);
	  }
	  return {
	    slots,
	    hasDynamicSlots
	  };
	}
	function buildDynamicSlot(name, fn, index) {
	  const props = [
	    createObjectProperty(`name`, name),
	    createObjectProperty(`fn`, fn)
	  ];
	  if (index != null) {
	    props.push(
	      createObjectProperty(`key`, createSimpleExpression(String(index), true))
	    );
	  }
	  return createObjectExpression(props);
	}
	function hasForwardedSlots(children) {
	  for (let i = 0; i < children.length; i++) {
	    const child = children[i];
	    switch (child.type) {
	      case 1:
	        if (child.tagType === 2 || hasForwardedSlots(child.children)) {
	          return true;
	        }
	        break;
	      case 9:
	        if (hasForwardedSlots(child.branches)) return true;
	        break;
	      case 10:
	      case 11:
	        if (hasForwardedSlots(child.children)) return true;
	        break;
	    }
	  }
	  return false;
	}
	function isNonWhitespaceContent(node) {
	  if (node.type !== 2 && node.type !== 12)
	    return true;
	  return node.type === 2 ? !!node.content.trim() : isNonWhitespaceContent(node.content);
	}

	const directiveImportMap = /* @__PURE__ */ new WeakMap();
	const transformElement = (node, context) => {
	  return function postTransformElement() {
	    node = context.currentNode;
	    if (!(node.type === 1 && (node.tagType === 0 || node.tagType === 1))) {
	      return;
	    }
	    const { tag, props } = node;
	    const isComponent = node.tagType === 1;
	    let vnodeTag = isComponent ? resolveComponentType(node, context) : `"${tag}"`;
	    const isDynamicComponent = shared.isObject(vnodeTag) && vnodeTag.callee === RESOLVE_DYNAMIC_COMPONENT;
	    let vnodeProps;
	    let vnodeChildren;
	    let patchFlag = 0;
	    let vnodeDynamicProps;
	    let dynamicPropNames;
	    let vnodeDirectives;
	    let shouldUseBlock = (
	      // dynamic component may resolve to plain elements
	      isDynamicComponent || vnodeTag === TELEPORT || vnodeTag === SUSPENSE || !isComponent && // <svg> and <foreignObject> must be forced into blocks so that block
	      // updates inside get proper isSVG flag at runtime. (#639, #643)
	      // This is technically web-specific, but splitting the logic out of core
	      // leads to too much unnecessary complexity.
	      (tag === "svg" || tag === "foreignObject" || tag === "math")
	    );
	    if (props.length > 0) {
	      const propsBuildResult = buildProps(
	        node,
	        context,
	        void 0,
	        isComponent,
	        isDynamicComponent
	      );
	      vnodeProps = propsBuildResult.props;
	      patchFlag = propsBuildResult.patchFlag;
	      dynamicPropNames = propsBuildResult.dynamicPropNames;
	      const directives = propsBuildResult.directives;
	      vnodeDirectives = directives && directives.length ? createArrayExpression(
	        directives.map((dir) => buildDirectiveArgs(dir, context))
	      ) : void 0;
	      if (propsBuildResult.shouldUseBlock) {
	        shouldUseBlock = true;
	      }
	    }
	    if (node.children.length > 0) {
	      if (vnodeTag === KEEP_ALIVE) {
	        shouldUseBlock = true;
	        patchFlag |= 1024;
	      }
	      const shouldBuildAsSlots = isComponent && // Teleport is not a real component and has dedicated runtime handling
	      vnodeTag !== TELEPORT && // explained above.
	      vnodeTag !== KEEP_ALIVE;
	      if (shouldBuildAsSlots) {
	        const { slots, hasDynamicSlots } = buildSlots(node, context);
	        vnodeChildren = slots;
	        if (hasDynamicSlots) {
	          patchFlag |= 1024;
	        }
	      } else if (node.children.length === 1 && vnodeTag !== TELEPORT) {
	        const child = node.children[0];
	        const type = child.type;
	        const hasDynamicTextChild = type === 5 || type === 8;
	        if (hasDynamicTextChild && getConstantType(child, context) === 0) {
	          patchFlag |= 1;
	        }
	        if (hasDynamicTextChild || type === 2) {
	          vnodeChildren = child;
	        } else {
	          vnodeChildren = node.children;
	        }
	      } else {
	        vnodeChildren = node.children;
	      }
	    }
	    if (dynamicPropNames && dynamicPropNames.length) {
	      vnodeDynamicProps = stringifyDynamicPropNames(dynamicPropNames);
	    }
	    node.codegenNode = createVNodeCall(
	      context,
	      vnodeTag,
	      vnodeProps,
	      vnodeChildren,
	      patchFlag === 0 ? void 0 : patchFlag,
	      vnodeDynamicProps,
	      vnodeDirectives,
	      !!shouldUseBlock,
	      false,
	      isComponent,
	      node.loc
	    );
	  };
	};
	function resolveComponentType(node, context, ssr = false) {
	  let { tag } = node;
	  const isExplicitDynamic = isComponentTag(tag);
	  const isProp = findProp(
	    node,
	    "is",
	    false,
	    true
	    /* allow empty */
	  );
	  if (isProp) {
	    if (isExplicitDynamic || isCompatEnabled(
	      "COMPILER_IS_ON_ELEMENT",
	      context
	    )) {
	      let exp;
	      if (isProp.type === 6) {
	        exp = isProp.value && createSimpleExpression(isProp.value.content, true);
	      } else {
	        exp = isProp.exp;
	        if (!exp) {
	          exp = createSimpleExpression(`is`, false, isProp.arg.loc);
	          {
	            exp = isProp.exp = processExpression(exp, context);
	          }
	        }
	      }
	      if (exp) {
	        return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [
	          exp
	        ]);
	      }
	    } else if (isProp.type === 6 && isProp.value.content.startsWith("vue:")) {
	      tag = isProp.value.content.slice(4);
	    }
	  }
	  const builtIn = isCoreComponent(tag) || context.isBuiltInComponent(tag);
	  if (builtIn) {
	    if (!ssr) context.helper(builtIn);
	    return builtIn;
	  }
	  {
	    const fromSetup = resolveSetupReference(tag, context);
	    if (fromSetup) {
	      return fromSetup;
	    }
	    const dotIndex = tag.indexOf(".");
	    if (dotIndex > 0) {
	      const ns = resolveSetupReference(tag.slice(0, dotIndex), context);
	      if (ns) {
	        return ns + tag.slice(dotIndex);
	      }
	    }
	  }
	  if (context.selfName && shared.capitalize(shared.camelize(tag)) === context.selfName) {
	    context.helper(RESOLVE_COMPONENT);
	    context.components.add(tag + `__self`);
	    return toValidAssetId(tag, `component`);
	  }
	  context.helper(RESOLVE_COMPONENT);
	  context.components.add(tag);
	  return toValidAssetId(tag, `component`);
	}
	function resolveSetupReference(name, context) {
	  const bindings = context.bindingMetadata;
	  if (!bindings || bindings.__isScriptSetup === false) {
	    return;
	  }
	  const camelName = shared.camelize(name);
	  const PascalName = shared.capitalize(camelName);
	  const checkType = (type) => {
	    if (bindings[name] === type) {
	      return name;
	    }
	    if (bindings[camelName] === type) {
	      return camelName;
	    }
	    if (bindings[PascalName] === type) {
	      return PascalName;
	    }
	  };
	  const fromConst = checkType("setup-const") || checkType("setup-reactive-const") || checkType("literal-const");
	  if (fromConst) {
	    return context.inline ? (
	      // in inline mode, const setup bindings (e.g. imports) can be used as-is
	      fromConst
	    ) : `$setup[${JSON.stringify(fromConst)}]`;
	  }
	  const fromMaybeRef = checkType("setup-let") || checkType("setup-ref") || checkType("setup-maybe-ref");
	  if (fromMaybeRef) {
	    return context.inline ? (
	      // setup scope bindings that may be refs need to be unrefed
	      `${context.helperString(UNREF)}(${fromMaybeRef})`
	    ) : `$setup[${JSON.stringify(fromMaybeRef)}]`;
	  }
	  const fromProps = checkType("props");
	  if (fromProps) {
	    return `${context.helperString(UNREF)}(${context.inline ? "__props" : "$props"}[${JSON.stringify(fromProps)}])`;
	  }
	}
	function buildProps(node, context, props = node.props, isComponent, isDynamicComponent, ssr = false) {
	  const { tag, loc: elementLoc, children } = node;
	  let properties = [];
	  const mergeArgs = [];
	  const runtimeDirectives = [];
	  const hasChildren = children.length > 0;
	  let shouldUseBlock = false;
	  let patchFlag = 0;
	  let hasRef = false;
	  let hasClassBinding = false;
	  let hasStyleBinding = false;
	  let hasHydrationEventBinding = false;
	  let hasDynamicKeys = false;
	  let hasVnodeHook = false;
	  const dynamicPropNames = [];
	  const pushMergeArg = (arg) => {
	    if (properties.length) {
	      mergeArgs.push(
	        createObjectExpression(dedupeProperties(properties), elementLoc)
	      );
	      properties = [];
	    }
	    if (arg) mergeArgs.push(arg);
	  };
	  const pushRefVForMarker = () => {
	    if (context.scopes.vFor > 0) {
	      properties.push(
	        createObjectProperty(
	          createSimpleExpression("ref_for", true),
	          createSimpleExpression("true")
	        )
	      );
	    }
	  };
	  const analyzePatchFlag = ({ key, value }) => {
	    if (isStaticExp(key)) {
	      const name = key.content;
	      const isEventHandler = shared.isOn(name);
	      if (isEventHandler && (!isComponent || isDynamicComponent) && // omit the flag for click handlers because hydration gives click
	      // dedicated fast path.
	      name.toLowerCase() !== "onclick" && // omit v-model handlers
	      name !== "onUpdate:modelValue" && // omit onVnodeXXX hooks
	      !shared.isReservedProp(name)) {
	        hasHydrationEventBinding = true;
	      }
	      if (isEventHandler && shared.isReservedProp(name)) {
	        hasVnodeHook = true;
	      }
	      if (isEventHandler && value.type === 14) {
	        value = value.arguments[0];
	      }
	      if (value.type === 20 || (value.type === 4 || value.type === 8) && getConstantType(value, context) > 0) {
	        return;
	      }
	      if (name === "ref") {
	        hasRef = true;
	      } else if (name === "class") {
	        hasClassBinding = true;
	      } else if (name === "style") {
	        hasStyleBinding = true;
	      } else if (name !== "key" && !dynamicPropNames.includes(name)) {
	        dynamicPropNames.push(name);
	      }
	      if (isComponent && (name === "class" || name === "style") && !dynamicPropNames.includes(name)) {
	        dynamicPropNames.push(name);
	      }
	    } else {
	      hasDynamicKeys = true;
	    }
	  };
	  for (let i = 0; i < props.length; i++) {
	    const prop = props[i];
	    if (prop.type === 6) {
	      const { loc, name, nameLoc, value } = prop;
	      let isStatic = true;
	      if (name === "ref") {
	        hasRef = true;
	        pushRefVForMarker();
	        if (value && context.inline) {
	          const binding = context.bindingMetadata[value.content];
	          if (binding === "setup-let" || binding === "setup-ref" || binding === "setup-maybe-ref") {
	            isStatic = false;
	            properties.push(
	              createObjectProperty(
	                createSimpleExpression("ref_key", true),
	                createSimpleExpression(value.content, true, value.loc)
	              )
	            );
	          }
	        }
	      }
	      if (name === "is" && (isComponentTag(tag) || value && value.content.startsWith("vue:") || isCompatEnabled(
	        "COMPILER_IS_ON_ELEMENT",
	        context
	      ))) {
	        continue;
	      }
	      properties.push(
	        createObjectProperty(
	          createSimpleExpression(name, true, nameLoc),
	          createSimpleExpression(
	            value ? value.content : "",
	            isStatic,
	            value ? value.loc : loc
	          )
	        )
	      );
	    } else {
	      const { name, arg, exp, loc, modifiers } = prop;
	      const isVBind = name === "bind";
	      const isVOn = name === "on";
	      if (name === "slot") {
	        if (!isComponent) {
	          context.onError(
	            createCompilerError(40, loc)
	          );
	        }
	        continue;
	      }
	      if (name === "once" || name === "memo") {
	        continue;
	      }
	      if (name === "is" || isVBind && isStaticArgOf(arg, "is") && (isComponentTag(tag) || isCompatEnabled(
	        "COMPILER_IS_ON_ELEMENT",
	        context
	      ))) {
	        continue;
	      }
	      if (isVOn && ssr) {
	        continue;
	      }
	      if (
	        // #938: elements with dynamic keys should be forced into blocks
	        isVBind && isStaticArgOf(arg, "key") || // inline before-update hooks need to force block so that it is invoked
	        // before children
	        isVOn && hasChildren && isStaticArgOf(arg, "vue:before-update")
	      ) {
	        shouldUseBlock = true;
	      }
	      if (isVBind && isStaticArgOf(arg, "ref")) {
	        pushRefVForMarker();
	      }
	      if (!arg && (isVBind || isVOn)) {
	        hasDynamicKeys = true;
	        if (exp) {
	          if (isVBind) {
	            {
	              pushMergeArg();
	              if (isCompatEnabled(
	                "COMPILER_V_BIND_OBJECT_ORDER",
	                context
	              )) {
	                mergeArgs.unshift(exp);
	                continue;
	              }
	            }
	            pushRefVForMarker();
	            pushMergeArg();
	            mergeArgs.push(exp);
	          } else {
	            pushMergeArg({
	              type: 14,
	              loc,
	              callee: context.helper(TO_HANDLERS),
	              arguments: isComponent ? [exp] : [exp, `true`]
	            });
	          }
	        } else {
	          context.onError(
	            createCompilerError(
	              isVBind ? 34 : 35,
	              loc
	            )
	          );
	        }
	        continue;
	      }
	      if (isVBind && modifiers.some((mod) => mod.content === "prop")) {
	        patchFlag |= 32;
	      }
	      const directiveTransform = context.directiveTransforms[name];
	      if (directiveTransform) {
	        const { props: props2, needRuntime } = directiveTransform(prop, node, context);
	        !ssr && props2.forEach(analyzePatchFlag);
	        if (isVOn && arg && !isStaticExp(arg)) {
	          pushMergeArg(createObjectExpression(props2, elementLoc));
	        } else {
	          properties.push(...props2);
	        }
	        if (needRuntime) {
	          runtimeDirectives.push(prop);
	          if (shared.isSymbol(needRuntime)) {
	            directiveImportMap.set(prop, needRuntime);
	          }
	        }
	      } else if (!shared.isBuiltInDirective(name)) {
	        runtimeDirectives.push(prop);
	        if (hasChildren) {
	          shouldUseBlock = true;
	        }
	      }
	    }
	  }
	  let propsExpression = void 0;
	  if (mergeArgs.length) {
	    pushMergeArg();
	    if (mergeArgs.length > 1) {
	      propsExpression = createCallExpression(
	        context.helper(MERGE_PROPS),
	        mergeArgs,
	        elementLoc
	      );
	    } else {
	      propsExpression = mergeArgs[0];
	    }
	  } else if (properties.length) {
	    propsExpression = createObjectExpression(
	      dedupeProperties(properties),
	      elementLoc
	    );
	  }
	  if (hasDynamicKeys) {
	    patchFlag |= 16;
	  } else {
	    if (hasClassBinding && !isComponent) {
	      patchFlag |= 2;
	    }
	    if (hasStyleBinding && !isComponent) {
	      patchFlag |= 4;
	    }
	    if (dynamicPropNames.length) {
	      patchFlag |= 8;
	    }
	    if (hasHydrationEventBinding) {
	      patchFlag |= 32;
	    }
	  }
	  if (!shouldUseBlock && (patchFlag === 0 || patchFlag === 32) && (hasRef || hasVnodeHook || runtimeDirectives.length > 0)) {
	    patchFlag |= 512;
	  }
	  if (!context.inSSR && propsExpression) {
	    switch (propsExpression.type) {
	      case 15:
	        let classKeyIndex = -1;
	        let styleKeyIndex = -1;
	        let hasDynamicKey = false;
	        for (let i = 0; i < propsExpression.properties.length; i++) {
	          const key = propsExpression.properties[i].key;
	          if (isStaticExp(key)) {
	            if (key.content === "class") {
	              classKeyIndex = i;
	            } else if (key.content === "style") {
	              styleKeyIndex = i;
	            }
	          } else if (!key.isHandlerKey) {
	            hasDynamicKey = true;
	          }
	        }
	        const classProp = propsExpression.properties[classKeyIndex];
	        const styleProp = propsExpression.properties[styleKeyIndex];
	        if (!hasDynamicKey) {
	          if (classProp && !isStaticExp(classProp.value)) {
	            classProp.value = createCallExpression(
	              context.helper(NORMALIZE_CLASS),
	              [classProp.value]
	            );
	          }
	          if (styleProp && // the static style is compiled into an object,
	          // so use `hasStyleBinding` to ensure that it is a dynamic style binding
	          (hasStyleBinding || styleProp.value.type === 4 && styleProp.value.content.trim()[0] === `[` || // v-bind:style and style both exist,
	          // v-bind:style with static literal object
	          styleProp.value.type === 17)) {
	            styleProp.value = createCallExpression(
	              context.helper(NORMALIZE_STYLE),
	              [styleProp.value]
	            );
	          }
	        } else {
	          propsExpression = createCallExpression(
	            context.helper(NORMALIZE_PROPS),
	            [propsExpression]
	          );
	        }
	        break;
	      case 14:
	        break;
	      default:
	        propsExpression = createCallExpression(
	          context.helper(NORMALIZE_PROPS),
	          [
	            createCallExpression(context.helper(GUARD_REACTIVE_PROPS), [
	              propsExpression
	            ])
	          ]
	        );
	        break;
	    }
	  }
	  return {
	    props: propsExpression,
	    directives: runtimeDirectives,
	    patchFlag,
	    dynamicPropNames,
	    shouldUseBlock
	  };
	}
	function dedupeProperties(properties) {
	  const knownProps = /* @__PURE__ */ new Map();
	  const deduped = [];
	  for (let i = 0; i < properties.length; i++) {
	    const prop = properties[i];
	    if (prop.key.type === 8 || !prop.key.isStatic) {
	      deduped.push(prop);
	      continue;
	    }
	    const name = prop.key.content;
	    const existing = knownProps.get(name);
	    if (existing) {
	      if (name === "style" || name === "class" || shared.isOn(name)) {
	        mergeAsArray(existing, prop);
	      }
	    } else {
	      knownProps.set(name, prop);
	      deduped.push(prop);
	    }
	  }
	  return deduped;
	}
	function mergeAsArray(existing, incoming) {
	  if (existing.value.type === 17) {
	    existing.value.elements.push(incoming.value);
	  } else {
	    existing.value = createArrayExpression(
	      [existing.value, incoming.value],
	      existing.loc
	    );
	  }
	}
	function buildDirectiveArgs(dir, context) {
	  const dirArgs = [];
	  const runtime = directiveImportMap.get(dir);
	  if (runtime) {
	    dirArgs.push(context.helperString(runtime));
	  } else {
	    const fromSetup = resolveSetupReference("v-" + dir.name, context);
	    if (fromSetup) {
	      dirArgs.push(fromSetup);
	    } else {
	      context.helper(RESOLVE_DIRECTIVE);
	      context.directives.add(dir.name);
	      dirArgs.push(toValidAssetId(dir.name, `directive`));
	    }
	  }
	  const { loc } = dir;
	  if (dir.exp) dirArgs.push(dir.exp);
	  if (dir.arg) {
	    if (!dir.exp) {
	      dirArgs.push(`void 0`);
	    }
	    dirArgs.push(dir.arg);
	  }
	  if (Object.keys(dir.modifiers).length) {
	    if (!dir.arg) {
	      if (!dir.exp) {
	        dirArgs.push(`void 0`);
	      }
	      dirArgs.push(`void 0`);
	    }
	    const trueExpression = createSimpleExpression(`true`, false, loc);
	    dirArgs.push(
	      createObjectExpression(
	        dir.modifiers.map(
	          (modifier) => createObjectProperty(modifier, trueExpression)
	        ),
	        loc
	      )
	    );
	  }
	  return createArrayExpression(dirArgs, dir.loc);
	}
	function stringifyDynamicPropNames(props) {
	  let propsNamesString = `[`;
	  for (let i = 0, l = props.length; i < l; i++) {
	    propsNamesString += JSON.stringify(props[i]);
	    if (i < l - 1) propsNamesString += ", ";
	  }
	  return propsNamesString + `]`;
	}
	function isComponentTag(tag) {
	  return tag === "component" || tag === "Component";
	}

	const transformSlotOutlet = (node, context) => {
	  if (isSlotOutlet(node)) {
	    const { children, loc } = node;
	    const { slotName, slotProps } = processSlotOutlet(node, context);
	    const slotArgs = [
	      context.prefixIdentifiers ? `_ctx.$slots` : `$slots`,
	      slotName,
	      "{}",
	      "undefined",
	      "true"
	    ];
	    let expectedLen = 2;
	    if (slotProps) {
	      slotArgs[2] = slotProps;
	      expectedLen = 3;
	    }
	    if (children.length) {
	      slotArgs[3] = createFunctionExpression([], children, false, false, loc);
	      expectedLen = 4;
	    }
	    if (context.scopeId && !context.slotted) {
	      expectedLen = 5;
	    }
	    slotArgs.splice(expectedLen);
	    node.codegenNode = createCallExpression(
	      context.helper(RENDER_SLOT),
	      slotArgs,
	      loc
	    );
	  }
	};
	function processSlotOutlet(node, context) {
	  let slotName = `"default"`;
	  let slotProps = void 0;
	  const nonNameProps = [];
	  for (let i = 0; i < node.props.length; i++) {
	    const p = node.props[i];
	    if (p.type === 6) {
	      if (p.value) {
	        if (p.name === "name") {
	          slotName = JSON.stringify(p.value.content);
	        } else {
	          p.name = shared.camelize(p.name);
	          nonNameProps.push(p);
	        }
	      }
	    } else {
	      if (p.name === "bind" && isStaticArgOf(p.arg, "name")) {
	        if (p.exp) {
	          slotName = p.exp;
	        } else if (p.arg && p.arg.type === 4) {
	          const name = shared.camelize(p.arg.content);
	          slotName = p.exp = createSimpleExpression(name, false, p.arg.loc);
	          {
	            slotName = p.exp = processExpression(p.exp, context);
	          }
	        }
	      } else {
	        if (p.name === "bind" && p.arg && isStaticExp(p.arg)) {
	          p.arg.content = shared.camelize(p.arg.content);
	        }
	        nonNameProps.push(p);
	      }
	    }
	  }
	  if (nonNameProps.length > 0) {
	    const { props, directives } = buildProps(
	      node,
	      context,
	      nonNameProps,
	      false,
	      false
	    );
	    slotProps = props;
	    if (directives.length) {
	      context.onError(
	        createCompilerError(
	          36,
	          directives[0].loc
	        )
	      );
	    }
	  }
	  return {
	    slotName,
	    slotProps
	  };
	}

	const transformOn = (dir, node, context, augmentor) => {
	  const { loc, modifiers, arg } = dir;
	  if (!dir.exp && !modifiers.length) {
	    context.onError(createCompilerError(35, loc));
	  }
	  let eventName;
	  if (arg.type === 4) {
	    if (arg.isStatic) {
	      let rawName = arg.content;
	      if (rawName.startsWith("vue:")) {
	        rawName = `vnode-${rawName.slice(4)}`;
	      }
	      const eventString = node.tagType !== 0 || rawName.startsWith("vnode") || !/[A-Z]/.test(rawName) ? (
	        // for non-element and vnode lifecycle event listeners, auto convert
	        // it to camelCase. See issue #2249
	        shared.toHandlerKey(shared.camelize(rawName))
	      ) : (
	        // preserve case for plain element listeners that have uppercase
	        // letters, as these may be custom elements' custom events
	        `on:${rawName}`
	      );
	      eventName = createSimpleExpression(eventString, true, arg.loc);
	    } else {
	      eventName = createCompoundExpression([
	        `${context.helperString(TO_HANDLER_KEY)}(`,
	        arg,
	        `)`
	      ]);
	    }
	  } else {
	    eventName = arg;
	    eventName.children.unshift(`${context.helperString(TO_HANDLER_KEY)}(`);
	    eventName.children.push(`)`);
	  }
	  let exp = dir.exp;
	  if (exp && !exp.content.trim()) {
	    exp = void 0;
	  }
	  let shouldCache = context.cacheHandlers && !exp && !context.inVOnce;
	  if (exp) {
	    const isMemberExp = isMemberExpression(exp, context);
	    const isInlineStatement = !(isMemberExp || isFnExpression(exp, context));
	    const hasMultipleStatements = exp.content.includes(`;`);
	    if (context.prefixIdentifiers) {
	      isInlineStatement && context.addIdentifiers(`$event`);
	      exp = dir.exp = processExpression(
	        exp,
	        context,
	        false,
	        hasMultipleStatements
	      );
	      isInlineStatement && context.removeIdentifiers(`$event`);
	      shouldCache = context.cacheHandlers && // unnecessary to cache inside v-once
	      !context.inVOnce && // runtime constants don't need to be cached
	      // (this is analyzed by compileScript in SFC <script setup>)
	      !(exp.type === 4 && exp.constType > 0) && // #1541 bail if this is a member exp handler passed to a component -
	      // we need to use the original function to preserve arity,
	      // e.g. <transition> relies on checking cb.length to determine
	      // transition end handling. Inline function is ok since its arity
	      // is preserved even when cached.
	      !(isMemberExp && node.tagType === 1) && // bail if the function references closure variables (v-for, v-slot)
	      // it must be passed fresh to avoid stale values.
	      !hasScopeRef(exp, context.identifiers);
	      if (shouldCache && isMemberExp) {
	        if (exp.type === 4) {
	          exp.content = `${exp.content} && ${exp.content}(...args)`;
	        } else {
	          exp.children = [...exp.children, ` && `, ...exp.children, `(...args)`];
	        }
	      }
	    }
	    if (isInlineStatement || shouldCache && isMemberExp) {
	      exp = createCompoundExpression([
	        `${isInlineStatement ? context.isTS ? `($event: any)` : `$event` : `${context.isTS ? `
//@ts-ignore
` : ``}(...args)`} => ${hasMultipleStatements ? `{` : `(`}`,
	        exp,
	        hasMultipleStatements ? `}` : `)`
	      ]);
	    }
	  }
	  let ret = {
	    props: [
	      createObjectProperty(
	        eventName,
	        exp || createSimpleExpression(`() => {}`, false, loc)
	      )
	    ]
	  };
	  if (augmentor) {
	    ret = augmentor(ret);
	  }
	  if (shouldCache) {
	    ret.props[0].value = context.cache(ret.props[0].value);
	  }
	  ret.props.forEach((p) => p.key.isHandlerKey = true);
	  return ret;
	};

	const transformText = (node, context) => {
	  if (node.type === 0 || node.type === 1 || node.type === 11 || node.type === 10) {
	    return () => {
	      const children = node.children;
	      let currentContainer = void 0;
	      let hasText = false;
	      for (let i = 0; i < children.length; i++) {
	        const child = children[i];
	        if (isText$1(child)) {
	          hasText = true;
	          for (let j = i + 1; j < children.length; j++) {
	            const next = children[j];
	            if (isText$1(next)) {
	              if (!currentContainer) {
	                currentContainer = children[i] = createCompoundExpression(
	                  [child],
	                  child.loc
	                );
	              }
	              currentContainer.children.push(` + `, next);
	              children.splice(j, 1);
	              j--;
	            } else {
	              currentContainer = void 0;
	              break;
	            }
	          }
	        }
	      }
	      if (!hasText || // if this is a plain element with a single text child, leave it
	      // as-is since the runtime has dedicated fast path for this by directly
	      // setting textContent of the element.
	      // for component root it's always normalized anyway.
	      children.length === 1 && (node.type === 0 || node.type === 1 && node.tagType === 0 && // #3756
	      // custom directives can potentially add DOM elements arbitrarily,
	      // we need to avoid setting textContent of the element at runtime
	      // to avoid accidentally overwriting the DOM elements added
	      // by the user through custom directives.
	      !node.props.find(
	        (p) => p.type === 7 && !context.directiveTransforms[p.name]
	      ) && // in compat mode, <template> tags with no special directives
	      // will be rendered as a fragment so its children must be
	      // converted into vnodes.
	      !(node.tag === "template"))) {
	        return;
	      }
	      for (let i = 0; i < children.length; i++) {
	        const child = children[i];
	        if (isText$1(child) || child.type === 8) {
	          const callArgs = [];
	          if (child.type !== 2 || child.content !== " ") {
	            callArgs.push(child);
	          }
	          if (!context.ssr && getConstantType(child, context) === 0) {
	            callArgs.push(
	              1 + (``)
	            );
	          }
	          children[i] = {
	            type: 12,
	            content: child,
	            loc: child.loc,
	            codegenNode: createCallExpression(
	              context.helper(CREATE_TEXT),
	              callArgs
	            )
	          };
	        }
	      }
	    };
	  }
	};

	const seen$1 = /* @__PURE__ */ new WeakSet();
	const transformOnce = (node, context) => {
	  if (node.type === 1 && findDir(node, "once", true)) {
	    if (seen$1.has(node) || context.inVOnce || context.inSSR) {
	      return;
	    }
	    seen$1.add(node);
	    context.inVOnce = true;
	    context.helper(SET_BLOCK_TRACKING);
	    return () => {
	      context.inVOnce = false;
	      const cur = context.currentNode;
	      if (cur.codegenNode) {
	        cur.codegenNode = context.cache(
	          cur.codegenNode,
	          true,
	          true
	        );
	      }
	    };
	  }
	};

	const transformModel = (dir, node, context) => {
	  const { exp, arg } = dir;
	  if (!exp) {
	    context.onError(
	      createCompilerError(41, dir.loc)
	    );
	    return createTransformProps();
	  }
	  const rawExp = exp.loc.source.trim();
	  const expString = exp.type === 4 ? exp.content : rawExp;
	  const bindingType = context.bindingMetadata[rawExp];
	  if (bindingType === "props" || bindingType === "props-aliased") {
	    context.onError(createCompilerError(44, exp.loc));
	    return createTransformProps();
	  }
	  const maybeRef = context.inline && (bindingType === "setup-let" || bindingType === "setup-ref" || bindingType === "setup-maybe-ref");
	  if (!expString.trim() || !isMemberExpression(exp, context) && !maybeRef) {
	    context.onError(
	      createCompilerError(42, exp.loc)
	    );
	    return createTransformProps();
	  }
	  if (context.prefixIdentifiers && isSimpleIdentifier(expString) && context.identifiers[expString]) {
	    context.onError(
	      createCompilerError(43, exp.loc)
	    );
	    return createTransformProps();
	  }
	  const propName = arg ? arg : createSimpleExpression("modelValue", true);
	  const eventName = arg ? isStaticExp(arg) ? `onUpdate:${shared.camelize(arg.content)}` : createCompoundExpression(['"onUpdate:" + ', arg]) : `onUpdate:modelValue`;
	  let assignmentExp;
	  const eventArg = context.isTS ? `($event: any)` : `$event`;
	  if (maybeRef) {
	    if (bindingType === "setup-ref") {
	      assignmentExp = createCompoundExpression([
	        `${eventArg} => ((`,
	        createSimpleExpression(rawExp, false, exp.loc),
	        `).value = $event)`
	      ]);
	    } else {
	      const altAssignment = bindingType === "setup-let" ? `${rawExp} = $event` : `null`;
	      assignmentExp = createCompoundExpression([
	        `${eventArg} => (${context.helperString(IS_REF)}(${rawExp}) ? (`,
	        createSimpleExpression(rawExp, false, exp.loc),
	        `).value = $event : ${altAssignment})`
	      ]);
	    }
	  } else {
	    assignmentExp = createCompoundExpression([
	      `${eventArg} => ((`,
	      exp,
	      `) = $event)`
	    ]);
	  }
	  const props = [
	    // modelValue: foo
	    createObjectProperty(propName, dir.exp),
	    // "onUpdate:modelValue": $event => (foo = $event)
	    createObjectProperty(eventName, assignmentExp)
	  ];
	  if (context.prefixIdentifiers && !context.inVOnce && context.cacheHandlers && !hasScopeRef(exp, context.identifiers)) {
	    props[1].value = context.cache(props[1].value);
	  }
	  if (dir.modifiers.length && node.tagType === 1) {
	    const modifiers = dir.modifiers.map((m) => m.content).map((m) => (isSimpleIdentifier(m) ? m : JSON.stringify(m)) + `: true`).join(`, `);
	    const modifiersKey = arg ? isStaticExp(arg) ? `${arg.content}Modifiers` : createCompoundExpression([arg, ' + "Modifiers"']) : `modelModifiers`;
	    props.push(
	      createObjectProperty(
	        modifiersKey,
	        createSimpleExpression(
	          `{ ${modifiers} }`,
	          false,
	          dir.loc,
	          2
	        )
	      )
	    );
	  }
	  return createTransformProps(props);
	};
	function createTransformProps(props = []) {
	  return { props };
	}

	const validDivisionCharRE = /[\w).+\-_$\]]/;
	const transformFilter = (node, context) => {
	  if (!isCompatEnabled("COMPILER_FILTERS", context)) {
	    return;
	  }
	  if (node.type === 5) {
	    rewriteFilter(node.content, context);
	  } else if (node.type === 1) {
	    node.props.forEach((prop) => {
	      if (prop.type === 7 && prop.name !== "for" && prop.exp) {
	        rewriteFilter(prop.exp, context);
	      }
	    });
	  }
	};
	function rewriteFilter(node, context) {
	  if (node.type === 4) {
	    parseFilter(node, context);
	  } else {
	    for (let i = 0; i < node.children.length; i++) {
	      const child = node.children[i];
	      if (typeof child !== "object") continue;
	      if (child.type === 4) {
	        parseFilter(child, context);
	      } else if (child.type === 8) {
	        rewriteFilter(node, context);
	      } else if (child.type === 5) {
	        rewriteFilter(child.content, context);
	      }
	    }
	  }
	}
	function parseFilter(node, context) {
	  const exp = node.content;
	  let inSingle = false;
	  let inDouble = false;
	  let inTemplateString = false;
	  let inRegex = false;
	  let curly = 0;
	  let square = 0;
	  let paren = 0;
	  let lastFilterIndex = 0;
	  let c, prev, i, expression, filters = [];
	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      if (c === 39 && prev !== 92) inSingle = false;
	    } else if (inDouble) {
	      if (c === 34 && prev !== 92) inDouble = false;
	    } else if (inTemplateString) {
	      if (c === 96 && prev !== 92) inTemplateString = false;
	    } else if (inRegex) {
	      if (c === 47 && prev !== 92) inRegex = false;
	    } else if (c === 124 && // pipe
	    exp.charCodeAt(i + 1) !== 124 && exp.charCodeAt(i - 1) !== 124 && !curly && !square && !paren) {
	      if (expression === void 0) {
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 34:
	          inDouble = true;
	          break;
	        // "
	        case 39:
	          inSingle = true;
	          break;
	        // '
	        case 96:
	          inTemplateString = true;
	          break;
	        // `
	        case 40:
	          paren++;
	          break;
	        // (
	        case 41:
	          paren--;
	          break;
	        // )
	        case 91:
	          square++;
	          break;
	        // [
	        case 93:
	          square--;
	          break;
	        // ]
	        case 123:
	          curly++;
	          break;
	        // {
	        case 125:
	          curly--;
	          break;
	      }
	      if (c === 47) {
	        let j = i - 1;
	        let p;
	        for (; j >= 0; j--) {
	          p = exp.charAt(j);
	          if (p !== " ") break;
	        }
	        if (!p || !validDivisionCharRE.test(p)) {
	          inRegex = true;
	        }
	      }
	    }
	  }
	  if (expression === void 0) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }
	  function pushFilter() {
	    filters.push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }
	  if (filters.length) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i], context);
	    }
	    node.content = expression;
	    node.ast = void 0;
	  }
	}
	function wrapFilter(exp, filter, context) {
	  context.helper(RESOLVE_FILTER);
	  const i = filter.indexOf("(");
	  if (i < 0) {
	    context.filters.add(filter);
	    return `${toValidAssetId(filter, "filter")}(${exp})`;
	  } else {
	    const name = filter.slice(0, i);
	    const args = filter.slice(i + 1);
	    context.filters.add(name);
	    return `${toValidAssetId(name, "filter")}(${exp}${args !== ")" ? "," + args : args}`;
	  }
	}

	const seen = /* @__PURE__ */ new WeakSet();
	const transformMemo = (node, context) => {
	  if (node.type === 1) {
	    const dir = findDir(node, "memo");
	    if (!dir || seen.has(node)) {
	      return;
	    }
	    seen.add(node);
	    return () => {
	      const codegenNode = node.codegenNode || context.currentNode.codegenNode;
	      if (codegenNode && codegenNode.type === 13) {
	        if (node.tagType !== 1) {
	          convertToBlock(codegenNode, context);
	        }
	        node.codegenNode = createCallExpression(context.helper(WITH_MEMO), [
	          dir.exp,
	          createFunctionExpression(void 0, codegenNode),
	          `_cache`,
	          String(context.cached.length)
	        ]);
	        context.cached.push(null);
	      }
	    };
	  }
	};

	function getBaseTransformPreset(prefixIdentifiers) {
	  return [
	    [
	      transformOnce,
	      transformIf,
	      transformMemo,
	      transformFor,
	      ...[transformFilter] ,
	      ...prefixIdentifiers ? [
	        // order is important
	        trackVForSlotScopes,
	        transformExpression
	      ] : [],
	      transformSlotOutlet,
	      transformElement,
	      trackSlotScopes,
	      transformText
	    ],
	    {
	      on: transformOn,
	      bind: transformBind,
	      model: transformModel
	    }
	  ];
	}
	function baseCompile(source, options = {}) {
	  const onError = options.onError || defaultOnError;
	  const isModuleMode = options.mode === "module";
	  const prefixIdentifiers = options.prefixIdentifiers === true || isModuleMode;
	  if (!prefixIdentifiers && options.cacheHandlers) {
	    onError(createCompilerError(49));
	  }
	  if (options.scopeId && !isModuleMode) {
	    onError(createCompilerError(50));
	  }
	  const resolvedOptions = shared.extend({}, options, {
	    prefixIdentifiers
	  });
	  const ast = shared.isString(source) ? baseParse(source, resolvedOptions) : source;
	  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset(prefixIdentifiers);
	  if (options.isTS) {
	    const { expressionPlugins } = options;
	    if (!expressionPlugins || !expressionPlugins.includes("typescript")) {
	      options.expressionPlugins = [...expressionPlugins || [], "typescript"];
	    }
	  }
	  transform(
	    ast,
	    shared.extend({}, resolvedOptions, {
	      nodeTransforms: [
	        ...nodeTransforms,
	        ...options.nodeTransforms || []
	        // user transforms
	      ],
	      directiveTransforms: shared.extend(
	        {},
	        directiveTransforms,
	        options.directiveTransforms || {}
	        // user transforms
	      )
	    })
	  );
	  return generate(ast, resolvedOptions);
	}

	const BindingTypes = {
	  "DATA": "data",
	  "PROPS": "props",
	  "PROPS_ALIASED": "props-aliased",
	  "SETUP_LET": "setup-let",
	  "SETUP_CONST": "setup-const",
	  "SETUP_REACTIVE_CONST": "setup-reactive-const",
	  "SETUP_MAYBE_REF": "setup-maybe-ref",
	  "SETUP_REF": "setup-ref",
	  "OPTIONS": "options",
	  "LITERAL_CONST": "literal-const"
	};

	const noopDirectiveTransform = () => ({ props: [] });

	compilerCore_cjs_prod.generateCodeFrame = shared.generateCodeFrame;
	compilerCore_cjs_prod.BASE_TRANSITION = BASE_TRANSITION;
	compilerCore_cjs_prod.BindingTypes = BindingTypes;
	compilerCore_cjs_prod.CAMELIZE = CAMELIZE;
	compilerCore_cjs_prod.CAPITALIZE = CAPITALIZE;
	compilerCore_cjs_prod.CREATE_BLOCK = CREATE_BLOCK;
	compilerCore_cjs_prod.CREATE_COMMENT = CREATE_COMMENT;
	compilerCore_cjs_prod.CREATE_ELEMENT_BLOCK = CREATE_ELEMENT_BLOCK;
	compilerCore_cjs_prod.CREATE_ELEMENT_VNODE = CREATE_ELEMENT_VNODE;
	compilerCore_cjs_prod.CREATE_SLOTS = CREATE_SLOTS;
	compilerCore_cjs_prod.CREATE_STATIC = CREATE_STATIC;
	compilerCore_cjs_prod.CREATE_TEXT = CREATE_TEXT;
	compilerCore_cjs_prod.CREATE_VNODE = CREATE_VNODE;
	compilerCore_cjs_prod.CompilerDeprecationTypes = CompilerDeprecationTypes;
	compilerCore_cjs_prod.ConstantTypes = ConstantTypes;
	compilerCore_cjs_prod.ElementTypes = ElementTypes;
	compilerCore_cjs_prod.ErrorCodes = ErrorCodes;
	compilerCore_cjs_prod.FRAGMENT = FRAGMENT;
	compilerCore_cjs_prod.GUARD_REACTIVE_PROPS = GUARD_REACTIVE_PROPS;
	compilerCore_cjs_prod.IS_MEMO_SAME = IS_MEMO_SAME;
	compilerCore_cjs_prod.IS_REF = IS_REF;
	compilerCore_cjs_prod.KEEP_ALIVE = KEEP_ALIVE;
	compilerCore_cjs_prod.MERGE_PROPS = MERGE_PROPS;
	compilerCore_cjs_prod.NORMALIZE_CLASS = NORMALIZE_CLASS;
	compilerCore_cjs_prod.NORMALIZE_PROPS = NORMALIZE_PROPS;
	compilerCore_cjs_prod.NORMALIZE_STYLE = NORMALIZE_STYLE;
	compilerCore_cjs_prod.Namespaces = Namespaces;
	compilerCore_cjs_prod.NodeTypes = NodeTypes;
	compilerCore_cjs_prod.OPEN_BLOCK = OPEN_BLOCK;
	compilerCore_cjs_prod.POP_SCOPE_ID = POP_SCOPE_ID;
	compilerCore_cjs_prod.PUSH_SCOPE_ID = PUSH_SCOPE_ID;
	compilerCore_cjs_prod.RENDER_LIST = RENDER_LIST;
	compilerCore_cjs_prod.RENDER_SLOT = RENDER_SLOT;
	compilerCore_cjs_prod.RESOLVE_COMPONENT = RESOLVE_COMPONENT;
	compilerCore_cjs_prod.RESOLVE_DIRECTIVE = RESOLVE_DIRECTIVE;
	compilerCore_cjs_prod.RESOLVE_DYNAMIC_COMPONENT = RESOLVE_DYNAMIC_COMPONENT;
	compilerCore_cjs_prod.RESOLVE_FILTER = RESOLVE_FILTER;
	compilerCore_cjs_prod.SET_BLOCK_TRACKING = SET_BLOCK_TRACKING;
	compilerCore_cjs_prod.SUSPENSE = SUSPENSE;
	compilerCore_cjs_prod.TELEPORT = TELEPORT;
	compilerCore_cjs_prod.TO_DISPLAY_STRING = TO_DISPLAY_STRING;
	compilerCore_cjs_prod.TO_HANDLERS = TO_HANDLERS;
	compilerCore_cjs_prod.TO_HANDLER_KEY = TO_HANDLER_KEY;
	compilerCore_cjs_prod.TS_NODE_TYPES = TS_NODE_TYPES;
	compilerCore_cjs_prod.UNREF = UNREF;
	compilerCore_cjs_prod.WITH_CTX = WITH_CTX;
	compilerCore_cjs_prod.WITH_DIRECTIVES = WITH_DIRECTIVES;
	compilerCore_cjs_prod.WITH_MEMO = WITH_MEMO;
	compilerCore_cjs_prod.advancePositionWithClone = advancePositionWithClone;
	compilerCore_cjs_prod.advancePositionWithMutation = advancePositionWithMutation;
	compilerCore_cjs_prod.assert = assert;
	compilerCore_cjs_prod.baseCompile = baseCompile;
	compilerCore_cjs_prod.baseParse = baseParse;
	compilerCore_cjs_prod.buildDirectiveArgs = buildDirectiveArgs;
	compilerCore_cjs_prod.buildProps = buildProps;
	compilerCore_cjs_prod.buildSlots = buildSlots;
	compilerCore_cjs_prod.checkCompatEnabled = checkCompatEnabled;
	compilerCore_cjs_prod.convertToBlock = convertToBlock;
	compilerCore_cjs_prod.createArrayExpression = createArrayExpression;
	compilerCore_cjs_prod.createAssignmentExpression = createAssignmentExpression;
	compilerCore_cjs_prod.createBlockStatement = createBlockStatement;
	compilerCore_cjs_prod.createCacheExpression = createCacheExpression;
	compilerCore_cjs_prod.createCallExpression = createCallExpression;
	compilerCore_cjs_prod.createCompilerError = createCompilerError;
	compilerCore_cjs_prod.createCompoundExpression = createCompoundExpression;
	compilerCore_cjs_prod.createConditionalExpression = createConditionalExpression;
	compilerCore_cjs_prod.createForLoopParams = createForLoopParams;
	compilerCore_cjs_prod.createFunctionExpression = createFunctionExpression;
	compilerCore_cjs_prod.createIfStatement = createIfStatement;
	compilerCore_cjs_prod.createInterpolation = createInterpolation;
	compilerCore_cjs_prod.createObjectExpression = createObjectExpression;
	compilerCore_cjs_prod.createObjectProperty = createObjectProperty;
	compilerCore_cjs_prod.createReturnStatement = createReturnStatement;
	compilerCore_cjs_prod.createRoot = createRoot;
	compilerCore_cjs_prod.createSequenceExpression = createSequenceExpression;
	compilerCore_cjs_prod.createSimpleExpression = createSimpleExpression;
	compilerCore_cjs_prod.createStructuralDirectiveTransform = createStructuralDirectiveTransform;
	compilerCore_cjs_prod.createTemplateLiteral = createTemplateLiteral;
	compilerCore_cjs_prod.createTransformContext = createTransformContext;
	compilerCore_cjs_prod.createVNodeCall = createVNodeCall;
	compilerCore_cjs_prod.errorMessages = errorMessages;
	compilerCore_cjs_prod.extractIdentifiers = extractIdentifiers;
	compilerCore_cjs_prod.findDir = findDir;
	compilerCore_cjs_prod.findProp = findProp;
	compilerCore_cjs_prod.forAliasRE = forAliasRE;
	compilerCore_cjs_prod.generate = generate;
	compilerCore_cjs_prod.getBaseTransformPreset = getBaseTransformPreset;
	compilerCore_cjs_prod.getConstantType = getConstantType;
	compilerCore_cjs_prod.getMemoedVNodeCall = getMemoedVNodeCall;
	compilerCore_cjs_prod.getVNodeBlockHelper = getVNodeBlockHelper;
	compilerCore_cjs_prod.getVNodeHelper = getVNodeHelper;
	compilerCore_cjs_prod.hasDynamicKeyVBind = hasDynamicKeyVBind;
	compilerCore_cjs_prod.hasScopeRef = hasScopeRef;
	compilerCore_cjs_prod.helperNameMap = helperNameMap;
	compilerCore_cjs_prod.injectProp = injectProp;
	compilerCore_cjs_prod.isCoreComponent = isCoreComponent;
	compilerCore_cjs_prod.isFnExpression = isFnExpression;
	compilerCore_cjs_prod.isFnExpressionBrowser = isFnExpressionBrowser;
	compilerCore_cjs_prod.isFnExpressionNode = isFnExpressionNode;
	compilerCore_cjs_prod.isFunctionType = isFunctionType;
	compilerCore_cjs_prod.isInDestructureAssignment = isInDestructureAssignment;
	compilerCore_cjs_prod.isInNewExpression = isInNewExpression;
	compilerCore_cjs_prod.isMemberExpression = isMemberExpression;
	compilerCore_cjs_prod.isMemberExpressionBrowser = isMemberExpressionBrowser;
	compilerCore_cjs_prod.isMemberExpressionNode = isMemberExpressionNode;
	compilerCore_cjs_prod.isReferencedIdentifier = isReferencedIdentifier;
	compilerCore_cjs_prod.isSimpleIdentifier = isSimpleIdentifier;
	compilerCore_cjs_prod.isSlotOutlet = isSlotOutlet;
	compilerCore_cjs_prod.isStaticArgOf = isStaticArgOf;
	compilerCore_cjs_prod.isStaticExp = isStaticExp;
	compilerCore_cjs_prod.isStaticProperty = isStaticProperty;
	compilerCore_cjs_prod.isStaticPropertyKey = isStaticPropertyKey;
	compilerCore_cjs_prod.isTemplateNode = isTemplateNode;
	compilerCore_cjs_prod.isText = isText$1;
	compilerCore_cjs_prod.isVPre = isVPre;
	compilerCore_cjs_prod.isVSlot = isVSlot;
	compilerCore_cjs_prod.locStub = locStub;
	compilerCore_cjs_prod.noopDirectiveTransform = noopDirectiveTransform;
	compilerCore_cjs_prod.processExpression = processExpression;
	compilerCore_cjs_prod.processFor = processFor;
	compilerCore_cjs_prod.processIf = processIf;
	compilerCore_cjs_prod.processSlotOutlet = processSlotOutlet;
	compilerCore_cjs_prod.registerRuntimeHelpers = registerRuntimeHelpers;
	compilerCore_cjs_prod.resolveComponentType = resolveComponentType;
	compilerCore_cjs_prod.stringifyExpression = stringifyExpression;
	compilerCore_cjs_prod.toValidAssetId = toValidAssetId;
	compilerCore_cjs_prod.trackSlotScopes = trackSlotScopes;
	compilerCore_cjs_prod.trackVForSlotScopes = trackVForSlotScopes;
	compilerCore_cjs_prod.transform = transform;
	compilerCore_cjs_prod.transformBind = transformBind;
	compilerCore_cjs_prod.transformElement = transformElement;
	compilerCore_cjs_prod.transformExpression = transformExpression;
	compilerCore_cjs_prod.transformModel = transformModel;
	compilerCore_cjs_prod.transformOn = transformOn;
	compilerCore_cjs_prod.traverseNode = traverseNode;
	compilerCore_cjs_prod.unwrapTSNode = unwrapTSNode;
	compilerCore_cjs_prod.walkBlockDeclarations = walkBlockDeclarations;
	compilerCore_cjs_prod.walkFunctionParams = walkFunctionParams;
	compilerCore_cjs_prod.walkIdentifiers = walkIdentifiers;
	compilerCore_cjs_prod.warnDeprecation = warnDeprecation;
	return compilerCore_cjs_prod;
}

/**
* @vue/compiler-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/

var hasRequiredCompilerDom_cjs_prod;

function requireCompilerDom_cjs_prod () {
	if (hasRequiredCompilerDom_cjs_prod) return compilerDom_cjs_prod;
	hasRequiredCompilerDom_cjs_prod = 1;
	(function (exports) {

		Object.defineProperty(exports, '__esModule', { value: true });

		var compilerCore = requireCompilerCore_cjs_prod();
		var shared = /*@__PURE__*/ requireShared_cjs_prod();

		const V_MODEL_RADIO = Symbol(``);
		const V_MODEL_CHECKBOX = Symbol(
		  ``
		);
		const V_MODEL_TEXT = Symbol(``);
		const V_MODEL_SELECT = Symbol(
		  ``
		);
		const V_MODEL_DYNAMIC = Symbol(
		  ``
		);
		const V_ON_WITH_MODIFIERS = Symbol(
		  ``
		);
		const V_ON_WITH_KEYS = Symbol(
		  ``
		);
		const V_SHOW = Symbol(``);
		const TRANSITION = Symbol(``);
		const TRANSITION_GROUP = Symbol(
		  ``
		);
		compilerCore.registerRuntimeHelpers({
		  [V_MODEL_RADIO]: `vModelRadio`,
		  [V_MODEL_CHECKBOX]: `vModelCheckbox`,
		  [V_MODEL_TEXT]: `vModelText`,
		  [V_MODEL_SELECT]: `vModelSelect`,
		  [V_MODEL_DYNAMIC]: `vModelDynamic`,
		  [V_ON_WITH_MODIFIERS]: `withModifiers`,
		  [V_ON_WITH_KEYS]: `withKeys`,
		  [V_SHOW]: `vShow`,
		  [TRANSITION]: `Transition`,
		  [TRANSITION_GROUP]: `TransitionGroup`
		});

		const parserOptions = {
		  parseMode: "html",
		  isVoidTag: shared.isVoidTag,
		  isNativeTag: (tag) => shared.isHTMLTag(tag) || shared.isSVGTag(tag) || shared.isMathMLTag(tag),
		  isPreTag: (tag) => tag === "pre",
		  isIgnoreNewlineTag: (tag) => tag === "pre" || tag === "textarea",
		  decodeEntities: void 0,
		  isBuiltInComponent: (tag) => {
		    if (tag === "Transition" || tag === "transition") {
		      return TRANSITION;
		    } else if (tag === "TransitionGroup" || tag === "transition-group") {
		      return TRANSITION_GROUP;
		    }
		  },
		  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
		  getNamespace(tag, parent, rootNamespace) {
		    let ns = parent ? parent.ns : rootNamespace;
		    if (parent && ns === 2) {
		      if (parent.tag === "annotation-xml") {
		        if (tag === "svg") {
		          return 1;
		        }
		        if (parent.props.some(
		          (a) => a.type === 6 && a.name === "encoding" && a.value != null && (a.value.content === "text/html" || a.value.content === "application/xhtml+xml")
		        )) {
		          ns = 0;
		        }
		      } else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== "mglyph" && tag !== "malignmark") {
		        ns = 0;
		      }
		    } else if (parent && ns === 1) {
		      if (parent.tag === "foreignObject" || parent.tag === "desc" || parent.tag === "title") {
		        ns = 0;
		      }
		    }
		    if (ns === 0) {
		      if (tag === "svg") {
		        return 1;
		      }
		      if (tag === "math") {
		        return 2;
		      }
		    }
		    return ns;
		  }
		};

		const transformStyle = (node) => {
		  if (node.type === 1) {
		    node.props.forEach((p, i) => {
		      if (p.type === 6 && p.name === "style" && p.value) {
		        node.props[i] = {
		          type: 7,
		          name: `bind`,
		          arg: compilerCore.createSimpleExpression(`style`, true, p.loc),
		          exp: parseInlineCSS(p.value.content, p.loc),
		          modifiers: [],
		          loc: p.loc
		        };
		      }
		    });
		  }
		};
		const parseInlineCSS = (cssText, loc) => {
		  const normalized = shared.parseStringStyle(cssText);
		  return compilerCore.createSimpleExpression(
		    JSON.stringify(normalized),
		    false,
		    loc,
		    3
		  );
		};

		function createDOMCompilerError(code, loc) {
		  return compilerCore.createCompilerError(
		    code,
		    loc,
		    DOMErrorMessages 
		  );
		}
		const DOMErrorCodes = {
		  "X_V_HTML_NO_EXPRESSION": 53,
		  "53": "X_V_HTML_NO_EXPRESSION",
		  "X_V_HTML_WITH_CHILDREN": 54,
		  "54": "X_V_HTML_WITH_CHILDREN",
		  "X_V_TEXT_NO_EXPRESSION": 55,
		  "55": "X_V_TEXT_NO_EXPRESSION",
		  "X_V_TEXT_WITH_CHILDREN": 56,
		  "56": "X_V_TEXT_WITH_CHILDREN",
		  "X_V_MODEL_ON_INVALID_ELEMENT": 57,
		  "57": "X_V_MODEL_ON_INVALID_ELEMENT",
		  "X_V_MODEL_ARG_ON_ELEMENT": 58,
		  "58": "X_V_MODEL_ARG_ON_ELEMENT",
		  "X_V_MODEL_ON_FILE_INPUT_ELEMENT": 59,
		  "59": "X_V_MODEL_ON_FILE_INPUT_ELEMENT",
		  "X_V_MODEL_UNNECESSARY_VALUE": 60,
		  "60": "X_V_MODEL_UNNECESSARY_VALUE",
		  "X_V_SHOW_NO_EXPRESSION": 61,
		  "61": "X_V_SHOW_NO_EXPRESSION",
		  "X_TRANSITION_INVALID_CHILDREN": 62,
		  "62": "X_TRANSITION_INVALID_CHILDREN",
		  "X_IGNORED_SIDE_EFFECT_TAG": 63,
		  "63": "X_IGNORED_SIDE_EFFECT_TAG",
		  "__EXTEND_POINT__": 64,
		  "64": "__EXTEND_POINT__"
		};
		const DOMErrorMessages = {
		  [53]: `v-html is missing expression.`,
		  [54]: `v-html will override element children.`,
		  [55]: `v-text is missing expression.`,
		  [56]: `v-text will override element children.`,
		  [57]: `v-model can only be used on <input>, <textarea> and <select> elements.`,
		  [58]: `v-model argument is not supported on plain elements.`,
		  [59]: `v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.`,
		  [60]: `Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.`,
		  [61]: `v-show is missing expression.`,
		  [62]: `<Transition> expects exactly one child element or component.`,
		  [63]: `Tags with side effect (<script> and <style>) are ignored in client component templates.`
		};

		const transformVHtml = (dir, node, context) => {
		  const { exp, loc } = dir;
		  if (!exp) {
		    context.onError(
		      createDOMCompilerError(53, loc)
		    );
		  }
		  if (node.children.length) {
		    context.onError(
		      createDOMCompilerError(54, loc)
		    );
		    node.children.length = 0;
		  }
		  return {
		    props: [
		      compilerCore.createObjectProperty(
		        compilerCore.createSimpleExpression(`innerHTML`, true, loc),
		        exp || compilerCore.createSimpleExpression("", true)
		      )
		    ]
		  };
		};

		const transformVText = (dir, node, context) => {
		  const { exp, loc } = dir;
		  if (!exp) {
		    context.onError(
		      createDOMCompilerError(55, loc)
		    );
		  }
		  if (node.children.length) {
		    context.onError(
		      createDOMCompilerError(56, loc)
		    );
		    node.children.length = 0;
		  }
		  return {
		    props: [
		      compilerCore.createObjectProperty(
		        compilerCore.createSimpleExpression(`textContent`, true),
		        exp ? compilerCore.getConstantType(exp, context) > 0 ? exp : compilerCore.createCallExpression(
		          context.helperString(compilerCore.TO_DISPLAY_STRING),
		          [exp],
		          loc
		        ) : compilerCore.createSimpleExpression("", true)
		      )
		    ]
		  };
		};

		const transformModel = (dir, node, context) => {
		  const baseResult = compilerCore.transformModel(dir, node, context);
		  if (!baseResult.props.length || node.tagType === 1) {
		    return baseResult;
		  }
		  if (dir.arg) {
		    context.onError(
		      createDOMCompilerError(
		        58,
		        dir.arg.loc
		      )
		    );
		  }
		  const { tag } = node;
		  const isCustomElement = context.isCustomElement(tag);
		  if (tag === "input" || tag === "textarea" || tag === "select" || isCustomElement) {
		    let directiveToUse = V_MODEL_TEXT;
		    let isInvalidType = false;
		    if (tag === "input" || isCustomElement) {
		      const type = compilerCore.findProp(node, `type`);
		      if (type) {
		        if (type.type === 7) {
		          directiveToUse = V_MODEL_DYNAMIC;
		        } else if (type.value) {
		          switch (type.value.content) {
		            case "radio":
		              directiveToUse = V_MODEL_RADIO;
		              break;
		            case "checkbox":
		              directiveToUse = V_MODEL_CHECKBOX;
		              break;
		            case "file":
		              isInvalidType = true;
		              context.onError(
		                createDOMCompilerError(
		                  59,
		                  dir.loc
		                )
		              );
		              break;
		          }
		        }
		      } else if (compilerCore.hasDynamicKeyVBind(node)) {
		        directiveToUse = V_MODEL_DYNAMIC;
		      } else ;
		    } else if (tag === "select") {
		      directiveToUse = V_MODEL_SELECT;
		    } else ;
		    if (!isInvalidType) {
		      baseResult.needRuntime = context.helper(directiveToUse);
		    }
		  } else {
		    context.onError(
		      createDOMCompilerError(
		        57,
		        dir.loc
		      )
		    );
		  }
		  baseResult.props = baseResult.props.filter(
		    (p) => !(p.key.type === 4 && p.key.content === "modelValue")
		  );
		  return baseResult;
		};

		const isEventOptionModifier = /* @__PURE__ */ shared.makeMap(`passive,once,capture`);
		const isNonKeyModifier = /* @__PURE__ */ shared.makeMap(
		  // event propagation management
		  `stop,prevent,self,ctrl,shift,alt,meta,exact,middle`
		);
		const maybeKeyModifier = /* @__PURE__ */ shared.makeMap("left,right");
		const isKeyboardEvent = /* @__PURE__ */ shared.makeMap(`onkeyup,onkeydown,onkeypress`);
		const resolveModifiers = (key, modifiers, context, loc) => {
		  const keyModifiers = [];
		  const nonKeyModifiers = [];
		  const eventOptionModifiers = [];
		  for (let i = 0; i < modifiers.length; i++) {
		    const modifier = modifiers[i].content;
		    if (modifier === "native" && compilerCore.checkCompatEnabled(
		      "COMPILER_V_ON_NATIVE",
		      context,
		      loc
		    )) {
		      eventOptionModifiers.push(modifier);
		    } else if (isEventOptionModifier(modifier)) {
		      eventOptionModifiers.push(modifier);
		    } else {
		      if (maybeKeyModifier(modifier)) {
		        if (compilerCore.isStaticExp(key)) {
		          if (isKeyboardEvent(key.content.toLowerCase())) {
		            keyModifiers.push(modifier);
		          } else {
		            nonKeyModifiers.push(modifier);
		          }
		        } else {
		          keyModifiers.push(modifier);
		          nonKeyModifiers.push(modifier);
		        }
		      } else {
		        if (isNonKeyModifier(modifier)) {
		          nonKeyModifiers.push(modifier);
		        } else {
		          keyModifiers.push(modifier);
		        }
		      }
		    }
		  }
		  return {
		    keyModifiers,
		    nonKeyModifiers,
		    eventOptionModifiers
		  };
		};
		const transformClick = (key, event) => {
		  const isStaticClick = compilerCore.isStaticExp(key) && key.content.toLowerCase() === "onclick";
		  return isStaticClick ? compilerCore.createSimpleExpression(event, true) : key.type !== 4 ? compilerCore.createCompoundExpression([
		    `(`,
		    key,
		    `) === "onClick" ? "${event}" : (`,
		    key,
		    `)`
		  ]) : key;
		};
		const transformOn = (dir, node, context) => {
		  return compilerCore.transformOn(dir, node, context, (baseResult) => {
		    const { modifiers } = dir;
		    if (!modifiers.length) return baseResult;
		    let { key, value: handlerExp } = baseResult.props[0];
		    const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = resolveModifiers(key, modifiers, context, dir.loc);
		    if (nonKeyModifiers.includes("right")) {
		      key = transformClick(key, `onContextmenu`);
		    }
		    if (nonKeyModifiers.includes("middle")) {
		      key = transformClick(key, `onMouseup`);
		    }
		    if (nonKeyModifiers.length) {
		      handlerExp = compilerCore.createCallExpression(context.helper(V_ON_WITH_MODIFIERS), [
		        handlerExp,
		        JSON.stringify(nonKeyModifiers)
		      ]);
		    }
		    if (keyModifiers.length && // if event name is dynamic, always wrap with keys guard
		    (!compilerCore.isStaticExp(key) || isKeyboardEvent(key.content.toLowerCase()))) {
		      handlerExp = compilerCore.createCallExpression(context.helper(V_ON_WITH_KEYS), [
		        handlerExp,
		        JSON.stringify(keyModifiers)
		      ]);
		    }
		    if (eventOptionModifiers.length) {
		      const modifierPostfix = eventOptionModifiers.map(shared.capitalize).join("");
		      key = compilerCore.isStaticExp(key) ? compilerCore.createSimpleExpression(`${key.content}${modifierPostfix}`, true) : compilerCore.createCompoundExpression([`(`, key, `) + "${modifierPostfix}"`]);
		    }
		    return {
		      props: [compilerCore.createObjectProperty(key, handlerExp)]
		    };
		  });
		};

		const transformShow = (dir, node, context) => {
		  const { exp, loc } = dir;
		  if (!exp) {
		    context.onError(
		      createDOMCompilerError(61, loc)
		    );
		  }
		  return {
		    props: [],
		    needRuntime: context.helper(V_SHOW)
		  };
		};

		const expReplaceRE = /__VUE_EXP_START__(.*?)__VUE_EXP_END__/g;
		const stringifyStatic = (children, context, parent) => {
		  if (context.scopes.vSlot > 0) {
		    return;
		  }
		  const isParentCached = parent.type === 1 && parent.codegenNode && parent.codegenNode.type === 13 && parent.codegenNode.children && !shared.isArray(parent.codegenNode.children) && parent.codegenNode.children.type === 20;
		  let nc = 0;
		  let ec = 0;
		  const currentChunk = [];
		  const stringifyCurrentChunk = (currentIndex) => {
		    if (nc >= 20 || ec >= 5) {
		      const staticCall = compilerCore.createCallExpression(context.helper(compilerCore.CREATE_STATIC), [
		        JSON.stringify(
		          currentChunk.map((node) => stringifyNode(node, context)).join("")
		        ).replace(expReplaceRE, `" + $1 + "`),
		        // the 2nd argument indicates the number of DOM nodes this static vnode
		        // will insert / hydrate
		        String(currentChunk.length)
		      ]);
		      const deleteCount = currentChunk.length - 1;
		      if (isParentCached) {
		        children.splice(
		          currentIndex - currentChunk.length,
		          currentChunk.length,
		          // @ts-expect-error
		          staticCall
		        );
		      } else {
		        currentChunk[0].codegenNode.value = staticCall;
		        if (currentChunk.length > 1) {
		          children.splice(currentIndex - currentChunk.length + 1, deleteCount);
		          const cacheIndex = context.cached.indexOf(
		            currentChunk[currentChunk.length - 1].codegenNode
		          );
		          if (cacheIndex > -1) {
		            for (let i2 = cacheIndex; i2 < context.cached.length; i2++) {
		              const c = context.cached[i2];
		              if (c) c.index -= deleteCount;
		            }
		            context.cached.splice(cacheIndex - deleteCount + 1, deleteCount);
		          }
		        }
		      }
		      return deleteCount;
		    }
		    return 0;
		  };
		  let i = 0;
		  for (; i < children.length; i++) {
		    const child = children[i];
		    const isCached = isParentCached || getCachedNode(child);
		    if (isCached) {
		      const result = analyzeNode(child);
		      if (result) {
		        nc += result[0];
		        ec += result[1];
		        currentChunk.push(child);
		        continue;
		      }
		    }
		    i -= stringifyCurrentChunk(i);
		    nc = 0;
		    ec = 0;
		    currentChunk.length = 0;
		  }
		  stringifyCurrentChunk(i);
		};
		const getCachedNode = (node) => {
		  if ((node.type === 1 && node.tagType === 0 || node.type === 12) && node.codegenNode && node.codegenNode.type === 20) {
		    return node.codegenNode;
		  }
		};
		const dataAriaRE = /^(data|aria)-/;
		const isStringifiableAttr = (name, ns) => {
		  return (ns === 0 ? shared.isKnownHtmlAttr(name) : ns === 1 ? shared.isKnownSvgAttr(name) : ns === 2 ? shared.isKnownMathMLAttr(name) : false) || dataAriaRE.test(name);
		};
		const isNonStringifiable = /* @__PURE__ */ shared.makeMap(
		  `caption,thead,tr,th,tbody,td,tfoot,colgroup,col`
		);
		function analyzeNode(node) {
		  if (node.type === 1 && isNonStringifiable(node.tag)) {
		    return false;
		  }
		  if (node.type === 12) {
		    return [1, 0];
		  }
		  let nc = 1;
		  let ec = node.props.length > 0 ? 1 : 0;
		  let bailed = false;
		  const bail = () => {
		    bailed = true;
		    return false;
		  };
		  function walk(node2) {
		    const isOptionTag = node2.tag === "option" && node2.ns === 0;
		    for (let i = 0; i < node2.props.length; i++) {
		      const p = node2.props[i];
		      if (p.type === 6 && !isStringifiableAttr(p.name, node2.ns)) {
		        return bail();
		      }
		      if (p.type === 7 && p.name === "bind") {
		        if (p.arg && (p.arg.type === 8 || p.arg.isStatic && !isStringifiableAttr(p.arg.content, node2.ns))) {
		          return bail();
		        }
		        if (p.exp && (p.exp.type === 8 || p.exp.constType < 3)) {
		          return bail();
		        }
		        if (isOptionTag && compilerCore.isStaticArgOf(p.arg, "value") && p.exp && !p.exp.isStatic) {
		          return bail();
		        }
		      }
		    }
		    for (let i = 0; i < node2.children.length; i++) {
		      nc++;
		      const child = node2.children[i];
		      if (child.type === 1) {
		        if (child.props.length > 0) {
		          ec++;
		        }
		        walk(child);
		        if (bailed) {
		          return false;
		        }
		      }
		    }
		    return true;
		  }
		  return walk(node) ? [nc, ec] : false;
		}
		function stringifyNode(node, context) {
		  if (shared.isString(node)) {
		    return node;
		  }
		  if (shared.isSymbol(node)) {
		    return ``;
		  }
		  switch (node.type) {
		    case 1:
		      return stringifyElement(node, context);
		    case 2:
		      return shared.escapeHtml(node.content);
		    case 3:
		      return `<!--${shared.escapeHtml(node.content)}-->`;
		    case 5:
		      return shared.escapeHtml(shared.toDisplayString(evaluateConstant(node.content)));
		    case 8:
		      return shared.escapeHtml(evaluateConstant(node));
		    case 12:
		      return stringifyNode(node.content, context);
		    default:
		      return "";
		  }
		}
		function stringifyElement(node, context) {
		  let res = `<${node.tag}`;
		  let innerHTML = "";
		  for (let i = 0; i < node.props.length; i++) {
		    const p = node.props[i];
		    if (p.type === 6) {
		      res += ` ${p.name}`;
		      if (p.value) {
		        res += `="${shared.escapeHtml(p.value.content)}"`;
		      }
		    } else if (p.type === 7) {
		      if (p.name === "bind") {
		        const exp = p.exp;
		        if (exp.content[0] === "_") {
		          res += ` ${p.arg.content}="__VUE_EXP_START__${exp.content}__VUE_EXP_END__"`;
		          continue;
		        }
		        if (shared.isBooleanAttr(p.arg.content) && exp.content === "false") {
		          continue;
		        }
		        let evaluated = evaluateConstant(exp);
		        if (evaluated != null) {
		          const arg = p.arg && p.arg.content;
		          if (arg === "class") {
		            evaluated = shared.normalizeClass(evaluated);
		          } else if (arg === "style") {
		            evaluated = shared.stringifyStyle(shared.normalizeStyle(evaluated));
		          }
		          res += ` ${p.arg.content}="${shared.escapeHtml(
		            evaluated
		          )}"`;
		        }
		      } else if (p.name === "html") {
		        innerHTML = evaluateConstant(p.exp);
		      } else if (p.name === "text") {
		        innerHTML = shared.escapeHtml(
		          shared.toDisplayString(evaluateConstant(p.exp))
		        );
		      }
		    }
		  }
		  if (context.scopeId) {
		    res += ` ${context.scopeId}`;
		  }
		  res += `>`;
		  if (innerHTML) {
		    res += innerHTML;
		  } else {
		    for (let i = 0; i < node.children.length; i++) {
		      res += stringifyNode(node.children[i], context);
		    }
		  }
		  if (!shared.isVoidTag(node.tag)) {
		    res += `</${node.tag}>`;
		  }
		  return res;
		}
		function evaluateConstant(exp) {
		  if (exp.type === 4) {
		    return new Function(`return (${exp.content})`)();
		  } else {
		    let res = ``;
		    exp.children.forEach((c) => {
		      if (shared.isString(c) || shared.isSymbol(c)) {
		        return;
		      }
		      if (c.type === 2) {
		        res += c.content;
		      } else if (c.type === 5) {
		        res += shared.toDisplayString(evaluateConstant(c.content));
		      } else {
		        res += evaluateConstant(c);
		      }
		    });
		    return res;
		  }
		}

		const ignoreSideEffectTags = (node, context) => {
		  if (node.type === 1 && node.tagType === 0 && (node.tag === "script" || node.tag === "style")) {
		    context.removeNode();
		  }
		};

		const DOMNodeTransforms = [
		  transformStyle,
		  ...[]
		];
		const DOMDirectiveTransforms = {
		  cloak: compilerCore.noopDirectiveTransform,
		  html: transformVHtml,
		  text: transformVText,
		  model: transformModel,
		  // override compiler-core
		  on: transformOn,
		  // override compiler-core
		  show: transformShow
		};
		function compile(src, options = {}) {
		  return compilerCore.baseCompile(
		    src,
		    shared.extend({}, parserOptions, options, {
		      nodeTransforms: [
		        // ignore <script> and <tag>
		        // this is not put inside DOMNodeTransforms because that list is used
		        // by compiler-ssr to generate vnode fallback branches
		        ignoreSideEffectTags,
		        ...DOMNodeTransforms,
		        ...options.nodeTransforms || []
		      ],
		      directiveTransforms: shared.extend(
		        {},
		        DOMDirectiveTransforms,
		        options.directiveTransforms || {}
		      ),
		      transformHoist: stringifyStatic
		    })
		  );
		}
		function parse(template, options = {}) {
		  return compilerCore.baseParse(template, shared.extend({}, parserOptions, options));
		}

		exports.DOMDirectiveTransforms = DOMDirectiveTransforms;
		exports.DOMErrorCodes = DOMErrorCodes;
		exports.DOMErrorMessages = DOMErrorMessages;
		exports.DOMNodeTransforms = DOMNodeTransforms;
		exports.TRANSITION = TRANSITION;
		exports.TRANSITION_GROUP = TRANSITION_GROUP;
		exports.V_MODEL_CHECKBOX = V_MODEL_CHECKBOX;
		exports.V_MODEL_DYNAMIC = V_MODEL_DYNAMIC;
		exports.V_MODEL_RADIO = V_MODEL_RADIO;
		exports.V_MODEL_SELECT = V_MODEL_SELECT;
		exports.V_MODEL_TEXT = V_MODEL_TEXT;
		exports.V_ON_WITH_KEYS = V_ON_WITH_KEYS;
		exports.V_ON_WITH_MODIFIERS = V_ON_WITH_MODIFIERS;
		exports.V_SHOW = V_SHOW;
		exports.compile = compile;
		exports.createDOMCompilerError = createDOMCompilerError;
		exports.parse = parse;
		exports.parserOptions = parserOptions;
		exports.transformStyle = transformStyle;
		Object.keys(compilerCore).forEach(function (k) {
		  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = compilerCore[k];
		}); 
	} (compilerDom_cjs_prod));
	return compilerDom_cjs_prod;
}

var runtimeDom_cjs_prod = {};

var runtimeCore_cjs_prod = {};

var reactivity_cjs_prod = {};

/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/

var hasRequiredReactivity_cjs_prod;

function requireReactivity_cjs_prod () {
	if (hasRequiredReactivity_cjs_prod) return reactivity_cjs_prod;
	hasRequiredReactivity_cjs_prod = 1;

	Object.defineProperty(reactivity_cjs_prod, '__esModule', { value: true });

	var shared = /*@__PURE__*/ requireShared_cjs_prod();

	let activeEffectScope;
	class EffectScope {
	  constructor(detached = false) {
	    this.detached = detached;
	    /**
	     * @internal
	     */
	    this._active = true;
	    /**
	     * @internal track `on` calls, allow `on` call multiple times
	     */
	    this._on = 0;
	    /**
	     * @internal
	     */
	    this.effects = [];
	    /**
	     * @internal
	     */
	    this.cleanups = [];
	    this._isPaused = false;
	    this.parent = activeEffectScope;
	    if (!detached && activeEffectScope) {
	      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
	        this
	      ) - 1;
	    }
	  }
	  get active() {
	    return this._active;
	  }
	  pause() {
	    if (this._active) {
	      this._isPaused = true;
	      let i, l;
	      if (this.scopes) {
	        for (i = 0, l = this.scopes.length; i < l; i++) {
	          this.scopes[i].pause();
	        }
	      }
	      for (i = 0, l = this.effects.length; i < l; i++) {
	        this.effects[i].pause();
	      }
	    }
	  }
	  /**
	   * Resumes the effect scope, including all child scopes and effects.
	   */
	  resume() {
	    if (this._active) {
	      if (this._isPaused) {
	        this._isPaused = false;
	        let i, l;
	        if (this.scopes) {
	          for (i = 0, l = this.scopes.length; i < l; i++) {
	            this.scopes[i].resume();
	          }
	        }
	        for (i = 0, l = this.effects.length; i < l; i++) {
	          this.effects[i].resume();
	        }
	      }
	    }
	  }
	  run(fn) {
	    if (this._active) {
	      const currentEffectScope = activeEffectScope;
	      try {
	        activeEffectScope = this;
	        return fn();
	      } finally {
	        activeEffectScope = currentEffectScope;
	      }
	    }
	  }
	  /**
	   * This should only be called on non-detached scopes
	   * @internal
	   */
	  on() {
	    if (++this._on === 1) {
	      this.prevScope = activeEffectScope;
	      activeEffectScope = this;
	    }
	  }
	  /**
	   * This should only be called on non-detached scopes
	   * @internal
	   */
	  off() {
	    if (this._on > 0 && --this._on === 0) {
	      activeEffectScope = this.prevScope;
	      this.prevScope = void 0;
	    }
	  }
	  stop(fromParent) {
	    if (this._active) {
	      this._active = false;
	      let i, l;
	      for (i = 0, l = this.effects.length; i < l; i++) {
	        this.effects[i].stop();
	      }
	      this.effects.length = 0;
	      for (i = 0, l = this.cleanups.length; i < l; i++) {
	        this.cleanups[i]();
	      }
	      this.cleanups.length = 0;
	      if (this.scopes) {
	        for (i = 0, l = this.scopes.length; i < l; i++) {
	          this.scopes[i].stop(true);
	        }
	        this.scopes.length = 0;
	      }
	      if (!this.detached && this.parent && !fromParent) {
	        const last = this.parent.scopes.pop();
	        if (last && last !== this) {
	          this.parent.scopes[this.index] = last;
	          last.index = this.index;
	        }
	      }
	      this.parent = void 0;
	    }
	  }
	}
	function effectScope(detached) {
	  return new EffectScope(detached);
	}
	function getCurrentScope() {
	  return activeEffectScope;
	}
	function onScopeDispose(fn, failSilently = false) {
	  if (activeEffectScope) {
	    activeEffectScope.cleanups.push(fn);
	  }
	}

	let activeSub;
	const EffectFlags = {
	  "ACTIVE": 1,
	  "1": "ACTIVE",
	  "RUNNING": 2,
	  "2": "RUNNING",
	  "TRACKING": 4,
	  "4": "TRACKING",
	  "NOTIFIED": 8,
	  "8": "NOTIFIED",
	  "DIRTY": 16,
	  "16": "DIRTY",
	  "ALLOW_RECURSE": 32,
	  "32": "ALLOW_RECURSE",
	  "PAUSED": 64,
	  "64": "PAUSED",
	  "EVALUATED": 128,
	  "128": "EVALUATED"
	};
	const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
	class ReactiveEffect {
	  constructor(fn) {
	    this.fn = fn;
	    /**
	     * @internal
	     */
	    this.deps = void 0;
	    /**
	     * @internal
	     */
	    this.depsTail = void 0;
	    /**
	     * @internal
	     */
	    this.flags = 1 | 4;
	    /**
	     * @internal
	     */
	    this.next = void 0;
	    /**
	     * @internal
	     */
	    this.cleanup = void 0;
	    this.scheduler = void 0;
	    if (activeEffectScope && activeEffectScope.active) {
	      activeEffectScope.effects.push(this);
	    }
	  }
	  pause() {
	    this.flags |= 64;
	  }
	  resume() {
	    if (this.flags & 64) {
	      this.flags &= -65;
	      if (pausedQueueEffects.has(this)) {
	        pausedQueueEffects.delete(this);
	        this.trigger();
	      }
	    }
	  }
	  /**
	   * @internal
	   */
	  notify() {
	    if (this.flags & 2 && !(this.flags & 32)) {
	      return;
	    }
	    if (!(this.flags & 8)) {
	      batch(this);
	    }
	  }
	  run() {
	    if (!(this.flags & 1)) {
	      return this.fn();
	    }
	    this.flags |= 2;
	    cleanupEffect(this);
	    prepareDeps(this);
	    const prevEffect = activeSub;
	    const prevShouldTrack = shouldTrack;
	    activeSub = this;
	    shouldTrack = true;
	    try {
	      return this.fn();
	    } finally {
	      cleanupDeps(this);
	      activeSub = prevEffect;
	      shouldTrack = prevShouldTrack;
	      this.flags &= -3;
	    }
	  }
	  stop() {
	    if (this.flags & 1) {
	      for (let link = this.deps; link; link = link.nextDep) {
	        removeSub(link);
	      }
	      this.deps = this.depsTail = void 0;
	      cleanupEffect(this);
	      this.onStop && this.onStop();
	      this.flags &= -2;
	    }
	  }
	  trigger() {
	    if (this.flags & 64) {
	      pausedQueueEffects.add(this);
	    } else if (this.scheduler) {
	      this.scheduler();
	    } else {
	      this.runIfDirty();
	    }
	  }
	  /**
	   * @internal
	   */
	  runIfDirty() {
	    if (isDirty(this)) {
	      this.run();
	    }
	  }
	  get dirty() {
	    return isDirty(this);
	  }
	}
	let batchDepth = 0;
	let batchedSub;
	let batchedComputed;
	function batch(sub, isComputed = false) {
	  sub.flags |= 8;
	  if (isComputed) {
	    sub.next = batchedComputed;
	    batchedComputed = sub;
	    return;
	  }
	  sub.next = batchedSub;
	  batchedSub = sub;
	}
	function startBatch() {
	  batchDepth++;
	}
	function endBatch() {
	  if (--batchDepth > 0) {
	    return;
	  }
	  if (batchedComputed) {
	    let e = batchedComputed;
	    batchedComputed = void 0;
	    while (e) {
	      const next = e.next;
	      e.next = void 0;
	      e.flags &= -9;
	      e = next;
	    }
	  }
	  let error;
	  while (batchedSub) {
	    let e = batchedSub;
	    batchedSub = void 0;
	    while (e) {
	      const next = e.next;
	      e.next = void 0;
	      e.flags &= -9;
	      if (e.flags & 1) {
	        try {
	          ;
	          e.trigger();
	        } catch (err) {
	          if (!error) error = err;
	        }
	      }
	      e = next;
	    }
	  }
	  if (error) throw error;
	}
	function prepareDeps(sub) {
	  for (let link = sub.deps; link; link = link.nextDep) {
	    link.version = -1;
	    link.prevActiveLink = link.dep.activeLink;
	    link.dep.activeLink = link;
	  }
	}
	function cleanupDeps(sub) {
	  let head;
	  let tail = sub.depsTail;
	  let link = tail;
	  while (link) {
	    const prev = link.prevDep;
	    if (link.version === -1) {
	      if (link === tail) tail = prev;
	      removeSub(link);
	      removeDep(link);
	    } else {
	      head = link;
	    }
	    link.dep.activeLink = link.prevActiveLink;
	    link.prevActiveLink = void 0;
	    link = prev;
	  }
	  sub.deps = head;
	  sub.depsTail = tail;
	}
	function isDirty(sub) {
	  for (let link = sub.deps; link; link = link.nextDep) {
	    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
	      return true;
	    }
	  }
	  if (sub._dirty) {
	    return true;
	  }
	  return false;
	}
	function refreshComputed(computed) {
	  if (computed.flags & 4 && !(computed.flags & 16)) {
	    return;
	  }
	  computed.flags &= -17;
	  if (computed.globalVersion === globalVersion) {
	    return;
	  }
	  computed.globalVersion = globalVersion;
	  if (!computed.isSSR && computed.flags & 128 && (!computed.deps && !computed._dirty || !isDirty(computed))) {
	    return;
	  }
	  computed.flags |= 2;
	  const dep = computed.dep;
	  const prevSub = activeSub;
	  const prevShouldTrack = shouldTrack;
	  activeSub = computed;
	  shouldTrack = true;
	  try {
	    prepareDeps(computed);
	    const value = computed.fn(computed._value);
	    if (dep.version === 0 || shared.hasChanged(value, computed._value)) {
	      computed.flags |= 128;
	      computed._value = value;
	      dep.version++;
	    }
	  } catch (err) {
	    dep.version++;
	    throw err;
	  } finally {
	    activeSub = prevSub;
	    shouldTrack = prevShouldTrack;
	    cleanupDeps(computed);
	    computed.flags &= -3;
	  }
	}
	function removeSub(link, soft = false) {
	  const { dep, prevSub, nextSub } = link;
	  if (prevSub) {
	    prevSub.nextSub = nextSub;
	    link.prevSub = void 0;
	  }
	  if (nextSub) {
	    nextSub.prevSub = prevSub;
	    link.nextSub = void 0;
	  }
	  if (dep.subs === link) {
	    dep.subs = prevSub;
	    if (!prevSub && dep.computed) {
	      dep.computed.flags &= -5;
	      for (let l = dep.computed.deps; l; l = l.nextDep) {
	        removeSub(l, true);
	      }
	    }
	  }
	  if (!soft && !--dep.sc && dep.map) {
	    dep.map.delete(dep.key);
	  }
	}
	function removeDep(link) {
	  const { prevDep, nextDep } = link;
	  if (prevDep) {
	    prevDep.nextDep = nextDep;
	    link.prevDep = void 0;
	  }
	  if (nextDep) {
	    nextDep.prevDep = prevDep;
	    link.nextDep = void 0;
	  }
	}
	function effect(fn, options) {
	  if (fn.effect instanceof ReactiveEffect) {
	    fn = fn.effect.fn;
	  }
	  const e = new ReactiveEffect(fn);
	  if (options) {
	    shared.extend(e, options);
	  }
	  try {
	    e.run();
	  } catch (err) {
	    e.stop();
	    throw err;
	  }
	  const runner = e.run.bind(e);
	  runner.effect = e;
	  return runner;
	}
	function stop(runner) {
	  runner.effect.stop();
	}
	let shouldTrack = true;
	const trackStack = [];
	function pauseTracking() {
	  trackStack.push(shouldTrack);
	  shouldTrack = false;
	}
	function enableTracking() {
	  trackStack.push(shouldTrack);
	  shouldTrack = true;
	}
	function resetTracking() {
	  const last = trackStack.pop();
	  shouldTrack = last === void 0 ? true : last;
	}
	function onEffectCleanup(fn, failSilently = false) {
	  if (activeSub instanceof ReactiveEffect) {
	    activeSub.cleanup = fn;
	  }
	}
	function cleanupEffect(e) {
	  const { cleanup } = e;
	  e.cleanup = void 0;
	  if (cleanup) {
	    const prevSub = activeSub;
	    activeSub = void 0;
	    try {
	      cleanup();
	    } finally {
	      activeSub = prevSub;
	    }
	  }
	}

	let globalVersion = 0;
	class Link {
	  constructor(sub, dep) {
	    this.sub = sub;
	    this.dep = dep;
	    this.version = dep.version;
	    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	  }
	}
	class Dep {
	  // TODO isolatedDeclarations "__v_skip"
	  constructor(computed) {
	    this.computed = computed;
	    this.version = 0;
	    /**
	     * Link between this dep and the current active effect
	     */
	    this.activeLink = void 0;
	    /**
	     * Doubly linked list representing the subscribing effects (tail)
	     */
	    this.subs = void 0;
	    /**
	     * For object property deps cleanup
	     */
	    this.map = void 0;
	    this.key = void 0;
	    /**
	     * Subscriber counter
	     */
	    this.sc = 0;
	    /**
	     * @internal
	     */
	    this.__v_skip = true;
	  }
	  track(debugInfo) {
	    if (!activeSub || !shouldTrack || activeSub === this.computed) {
	      return;
	    }
	    let link = this.activeLink;
	    if (link === void 0 || link.sub !== activeSub) {
	      link = this.activeLink = new Link(activeSub, this);
	      if (!activeSub.deps) {
	        activeSub.deps = activeSub.depsTail = link;
	      } else {
	        link.prevDep = activeSub.depsTail;
	        activeSub.depsTail.nextDep = link;
	        activeSub.depsTail = link;
	      }
	      addSub(link);
	    } else if (link.version === -1) {
	      link.version = this.version;
	      if (link.nextDep) {
	        const next = link.nextDep;
	        next.prevDep = link.prevDep;
	        if (link.prevDep) {
	          link.prevDep.nextDep = next;
	        }
	        link.prevDep = activeSub.depsTail;
	        link.nextDep = void 0;
	        activeSub.depsTail.nextDep = link;
	        activeSub.depsTail = link;
	        if (activeSub.deps === link) {
	          activeSub.deps = next;
	        }
	      }
	    }
	    return link;
	  }
	  trigger(debugInfo) {
	    this.version++;
	    globalVersion++;
	    this.notify(debugInfo);
	  }
	  notify(debugInfo) {
	    startBatch();
	    try {
	      if (false) ;
	      for (let link = this.subs; link; link = link.prevSub) {
	        if (link.sub.notify()) {
	          ;
	          link.sub.dep.notify();
	        }
	      }
	    } finally {
	      endBatch();
	    }
	  }
	}
	function addSub(link) {
	  link.dep.sc++;
	  if (link.sub.flags & 4) {
	    const computed = link.dep.computed;
	    if (computed && !link.dep.subs) {
	      computed.flags |= 4 | 16;
	      for (let l = computed.deps; l; l = l.nextDep) {
	        addSub(l);
	      }
	    }
	    const currentTail = link.dep.subs;
	    if (currentTail !== link) {
	      link.prevSub = currentTail;
	      if (currentTail) currentTail.nextSub = link;
	    }
	    link.dep.subs = link;
	  }
	}
	const targetMap = /* @__PURE__ */ new WeakMap();
	const ITERATE_KEY = Symbol(
	  ""
	);
	const MAP_KEY_ITERATE_KEY = Symbol(
	  ""
	);
	const ARRAY_ITERATE_KEY = Symbol(
	  ""
	);
	function track(target, type, key) {
	  if (shouldTrack && activeSub) {
	    let depsMap = targetMap.get(target);
	    if (!depsMap) {
	      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
	    }
	    let dep = depsMap.get(key);
	    if (!dep) {
	      depsMap.set(key, dep = new Dep());
	      dep.map = depsMap;
	      dep.key = key;
	    }
	    {
	      dep.track();
	    }
	  }
	}
	function trigger(target, type, key, newValue, oldValue, oldTarget) {
	  const depsMap = targetMap.get(target);
	  if (!depsMap) {
	    globalVersion++;
	    return;
	  }
	  const run = (dep) => {
	    if (dep) {
	      {
	        dep.trigger();
	      }
	    }
	  };
	  startBatch();
	  if (type === "clear") {
	    depsMap.forEach(run);
	  } else {
	    const targetIsArray = shared.isArray(target);
	    const isArrayIndex = targetIsArray && shared.isIntegerKey(key);
	    if (targetIsArray && key === "length") {
	      const newLength = Number(newValue);
	      depsMap.forEach((dep, key2) => {
	        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !shared.isSymbol(key2) && key2 >= newLength) {
	          run(dep);
	        }
	      });
	    } else {
	      if (key !== void 0 || depsMap.has(void 0)) {
	        run(depsMap.get(key));
	      }
	      if (isArrayIndex) {
	        run(depsMap.get(ARRAY_ITERATE_KEY));
	      }
	      switch (type) {
	        case "add":
	          if (!targetIsArray) {
	            run(depsMap.get(ITERATE_KEY));
	            if (shared.isMap(target)) {
	              run(depsMap.get(MAP_KEY_ITERATE_KEY));
	            }
	          } else if (isArrayIndex) {
	            run(depsMap.get("length"));
	          }
	          break;
	        case "delete":
	          if (!targetIsArray) {
	            run(depsMap.get(ITERATE_KEY));
	            if (shared.isMap(target)) {
	              run(depsMap.get(MAP_KEY_ITERATE_KEY));
	            }
	          }
	          break;
	        case "set":
	          if (shared.isMap(target)) {
	            run(depsMap.get(ITERATE_KEY));
	          }
	          break;
	      }
	    }
	  }
	  endBatch();
	}
	function getDepFromReactive(object, key) {
	  const depMap = targetMap.get(object);
	  return depMap && depMap.get(key);
	}

	function reactiveReadArray(array) {
	  const raw = toRaw(array);
	  if (raw === array) return raw;
	  track(raw, "iterate", ARRAY_ITERATE_KEY);
	  return isShallow(array) ? raw : raw.map(toReactive);
	}
	function shallowReadArray(arr) {
	  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
	  return arr;
	}
	const arrayInstrumentations = {
	  __proto__: null,
	  [Symbol.iterator]() {
	    return iterator(this, Symbol.iterator, toReactive);
	  },
	  concat(...args) {
	    return reactiveReadArray(this).concat(
	      ...args.map((x) => shared.isArray(x) ? reactiveReadArray(x) : x)
	    );
	  },
	  entries() {
	    return iterator(this, "entries", (value) => {
	      value[1] = toReactive(value[1]);
	      return value;
	    });
	  },
	  every(fn, thisArg) {
	    return apply(this, "every", fn, thisArg, void 0, arguments);
	  },
	  filter(fn, thisArg) {
	    return apply(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
	  },
	  find(fn, thisArg) {
	    return apply(this, "find", fn, thisArg, toReactive, arguments);
	  },
	  findIndex(fn, thisArg) {
	    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
	  },
	  findLast(fn, thisArg) {
	    return apply(this, "findLast", fn, thisArg, toReactive, arguments);
	  },
	  findLastIndex(fn, thisArg) {
	    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
	  },
	  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
	  forEach(fn, thisArg) {
	    return apply(this, "forEach", fn, thisArg, void 0, arguments);
	  },
	  includes(...args) {
	    return searchProxy(this, "includes", args);
	  },
	  indexOf(...args) {
	    return searchProxy(this, "indexOf", args);
	  },
	  join(separator) {
	    return reactiveReadArray(this).join(separator);
	  },
	  // keys() iterator only reads `length`, no optimisation required
	  lastIndexOf(...args) {
	    return searchProxy(this, "lastIndexOf", args);
	  },
	  map(fn, thisArg) {
	    return apply(this, "map", fn, thisArg, void 0, arguments);
	  },
	  pop() {
	    return noTracking(this, "pop");
	  },
	  push(...args) {
	    return noTracking(this, "push", args);
	  },
	  reduce(fn, ...args) {
	    return reduce(this, "reduce", fn, args);
	  },
	  reduceRight(fn, ...args) {
	    return reduce(this, "reduceRight", fn, args);
	  },
	  shift() {
	    return noTracking(this, "shift");
	  },
	  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
	  some(fn, thisArg) {
	    return apply(this, "some", fn, thisArg, void 0, arguments);
	  },
	  splice(...args) {
	    return noTracking(this, "splice", args);
	  },
	  toReversed() {
	    return reactiveReadArray(this).toReversed();
	  },
	  toSorted(comparer) {
	    return reactiveReadArray(this).toSorted(comparer);
	  },
	  toSpliced(...args) {
	    return reactiveReadArray(this).toSpliced(...args);
	  },
	  unshift(...args) {
	    return noTracking(this, "unshift", args);
	  },
	  values() {
	    return iterator(this, "values", toReactive);
	  }
	};
	function iterator(self, method, wrapValue) {
	  const arr = shallowReadArray(self);
	  const iter = arr[method]();
	  if (arr !== self && !isShallow(self)) {
	    iter._next = iter.next;
	    iter.next = () => {
	      const result = iter._next();
	      if (result.value) {
	        result.value = wrapValue(result.value);
	      }
	      return result;
	    };
	  }
	  return iter;
	}
	const arrayProto = Array.prototype;
	function apply(self, method, fn, thisArg, wrappedRetFn, args) {
	  const arr = shallowReadArray(self);
	  const needsWrap = arr !== self && !isShallow(self);
	  const methodFn = arr[method];
	  if (methodFn !== arrayProto[method]) {
	    const result2 = methodFn.apply(self, args);
	    return needsWrap ? toReactive(result2) : result2;
	  }
	  let wrappedFn = fn;
	  if (arr !== self) {
	    if (needsWrap) {
	      wrappedFn = function(item, index) {
	        return fn.call(this, toReactive(item), index, self);
	      };
	    } else if (fn.length > 2) {
	      wrappedFn = function(item, index) {
	        return fn.call(this, item, index, self);
	      };
	    }
	  }
	  const result = methodFn.call(arr, wrappedFn, thisArg);
	  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
	}
	function reduce(self, method, fn, args) {
	  const arr = shallowReadArray(self);
	  let wrappedFn = fn;
	  if (arr !== self) {
	    if (!isShallow(self)) {
	      wrappedFn = function(acc, item, index) {
	        return fn.call(this, acc, toReactive(item), index, self);
	      };
	    } else if (fn.length > 3) {
	      wrappedFn = function(acc, item, index) {
	        return fn.call(this, acc, item, index, self);
	      };
	    }
	  }
	  return arr[method](wrappedFn, ...args);
	}
	function searchProxy(self, method, args) {
	  const arr = toRaw(self);
	  track(arr, "iterate", ARRAY_ITERATE_KEY);
	  const res = arr[method](...args);
	  if ((res === -1 || res === false) && isProxy(args[0])) {
	    args[0] = toRaw(args[0]);
	    return arr[method](...args);
	  }
	  return res;
	}
	function noTracking(self, method, args = []) {
	  pauseTracking();
	  startBatch();
	  const res = toRaw(self)[method].apply(self, args);
	  endBatch();
	  resetTracking();
	  return res;
	}

	const isNonTrackableKeys = /* @__PURE__ */ shared.makeMap(`__proto__,__v_isRef,__isVue`);
	const builtInSymbols = new Set(
	  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(shared.isSymbol)
	);
	function hasOwnProperty(key) {
	  if (!shared.isSymbol(key)) key = String(key);
	  const obj = toRaw(this);
	  track(obj, "has", key);
	  return obj.hasOwnProperty(key);
	}
	class BaseReactiveHandler {
	  constructor(_isReadonly = false, _isShallow = false) {
	    this._isReadonly = _isReadonly;
	    this._isShallow = _isShallow;
	  }
	  get(target, key, receiver) {
	    if (key === "__v_skip") return target["__v_skip"];
	    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
	    if (key === "__v_isReactive") {
	      return !isReadonly2;
	    } else if (key === "__v_isReadonly") {
	      return isReadonly2;
	    } else if (key === "__v_isShallow") {
	      return isShallow2;
	    } else if (key === "__v_raw") {
	      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
	      // this means the receiver is a user proxy of the reactive proxy
	      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
	        return target;
	      }
	      return;
	    }
	    const targetIsArray = shared.isArray(target);
	    if (!isReadonly2) {
	      let fn;
	      if (targetIsArray && (fn = arrayInstrumentations[key])) {
	        return fn;
	      }
	      if (key === "hasOwnProperty") {
	        return hasOwnProperty;
	      }
	    }
	    const res = Reflect.get(
	      target,
	      key,
	      // if this is a proxy wrapping a ref, return methods using the raw ref
	      // as receiver so that we don't have to call `toRaw` on the ref in all
	      // its class methods
	      isRef(target) ? target : receiver
	    );
	    if (shared.isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
	      return res;
	    }
	    if (!isReadonly2) {
	      track(target, "get", key);
	    }
	    if (isShallow2) {
	      return res;
	    }
	    if (isRef(res)) {
	      return targetIsArray && shared.isIntegerKey(key) ? res : res.value;
	    }
	    if (shared.isObject(res)) {
	      return isReadonly2 ? readonly(res) : reactive(res);
	    }
	    return res;
	  }
	}
	class MutableReactiveHandler extends BaseReactiveHandler {
	  constructor(isShallow2 = false) {
	    super(false, isShallow2);
	  }
	  set(target, key, value, receiver) {
	    let oldValue = target[key];
	    if (!this._isShallow) {
	      const isOldValueReadonly = isReadonly(oldValue);
	      if (!isShallow(value) && !isReadonly(value)) {
	        oldValue = toRaw(oldValue);
	        value = toRaw(value);
	      }
	      if (!shared.isArray(target) && isRef(oldValue) && !isRef(value)) {
	        if (isOldValueReadonly) {
	          return false;
	        } else {
	          oldValue.value = value;
	          return true;
	        }
	      }
	    }
	    const hadKey = shared.isArray(target) && shared.isIntegerKey(key) ? Number(key) < target.length : shared.hasOwn(target, key);
	    const result = Reflect.set(
	      target,
	      key,
	      value,
	      isRef(target) ? target : receiver
	    );
	    if (target === toRaw(receiver)) {
	      if (!hadKey) {
	        trigger(target, "add", key, value);
	      } else if (shared.hasChanged(value, oldValue)) {
	        trigger(target, "set", key, value);
	      }
	    }
	    return result;
	  }
	  deleteProperty(target, key) {
	    const hadKey = shared.hasOwn(target, key);
	    target[key];
	    const result = Reflect.deleteProperty(target, key);
	    if (result && hadKey) {
	      trigger(target, "delete", key, void 0);
	    }
	    return result;
	  }
	  has(target, key) {
	    const result = Reflect.has(target, key);
	    if (!shared.isSymbol(key) || !builtInSymbols.has(key)) {
	      track(target, "has", key);
	    }
	    return result;
	  }
	  ownKeys(target) {
	    track(
	      target,
	      "iterate",
	      shared.isArray(target) ? "length" : ITERATE_KEY
	    );
	    return Reflect.ownKeys(target);
	  }
	}
	class ReadonlyReactiveHandler extends BaseReactiveHandler {
	  constructor(isShallow2 = false) {
	    super(true, isShallow2);
	  }
	  set(target, key) {
	    return true;
	  }
	  deleteProperty(target, key) {
	    return true;
	  }
	}
	const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
	const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
	const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
	const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);

	const toShallow = (value) => value;
	const getProto = (v) => Reflect.getPrototypeOf(v);
	function createIterableMethod(method, isReadonly2, isShallow2) {
	  return function(...args) {
	    const target = this["__v_raw"];
	    const rawTarget = toRaw(target);
	    const targetIsMap = shared.isMap(rawTarget);
	    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
	    const isKeyOnly = method === "keys" && targetIsMap;
	    const innerIterator = target[method](...args);
	    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
	    !isReadonly2 && track(
	      rawTarget,
	      "iterate",
	      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
	    );
	    return {
	      // iterator protocol
	      next() {
	        const { value, done } = innerIterator.next();
	        return done ? { value, done } : {
	          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
	          done
	        };
	      },
	      // iterable protocol
	      [Symbol.iterator]() {
	        return this;
	      }
	    };
	  };
	}
	function createReadonlyMethod(type) {
	  return function(...args) {
	    return type === "delete" ? false : type === "clear" ? void 0 : this;
	  };
	}
	function createInstrumentations(readonly, shallow) {
	  const instrumentations = {
	    get(key) {
	      const target = this["__v_raw"];
	      const rawTarget = toRaw(target);
	      const rawKey = toRaw(key);
	      if (!readonly) {
	        if (shared.hasChanged(key, rawKey)) {
	          track(rawTarget, "get", key);
	        }
	        track(rawTarget, "get", rawKey);
	      }
	      const { has } = getProto(rawTarget);
	      const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
	      if (has.call(rawTarget, key)) {
	        return wrap(target.get(key));
	      } else if (has.call(rawTarget, rawKey)) {
	        return wrap(target.get(rawKey));
	      } else if (target !== rawTarget) {
	        target.get(key);
	      }
	    },
	    get size() {
	      const target = this["__v_raw"];
	      !readonly && track(toRaw(target), "iterate", ITERATE_KEY);
	      return Reflect.get(target, "size", target);
	    },
	    has(key) {
	      const target = this["__v_raw"];
	      const rawTarget = toRaw(target);
	      const rawKey = toRaw(key);
	      if (!readonly) {
	        if (shared.hasChanged(key, rawKey)) {
	          track(rawTarget, "has", key);
	        }
	        track(rawTarget, "has", rawKey);
	      }
	      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
	    },
	    forEach(callback, thisArg) {
	      const observed = this;
	      const target = observed["__v_raw"];
	      const rawTarget = toRaw(target);
	      const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
	      !readonly && track(rawTarget, "iterate", ITERATE_KEY);
	      return target.forEach((value, key) => {
	        return callback.call(thisArg, wrap(value), wrap(key), observed);
	      });
	    }
	  };
	  shared.extend(
	    instrumentations,
	    readonly ? {
	      add: createReadonlyMethod("add"),
	      set: createReadonlyMethod("set"),
	      delete: createReadonlyMethod("delete"),
	      clear: createReadonlyMethod("clear")
	    } : {
	      add(value) {
	        if (!shallow && !isShallow(value) && !isReadonly(value)) {
	          value = toRaw(value);
	        }
	        const target = toRaw(this);
	        const proto = getProto(target);
	        const hadKey = proto.has.call(target, value);
	        if (!hadKey) {
	          target.add(value);
	          trigger(target, "add", value, value);
	        }
	        return this;
	      },
	      set(key, value) {
	        if (!shallow && !isShallow(value) && !isReadonly(value)) {
	          value = toRaw(value);
	        }
	        const target = toRaw(this);
	        const { has, get } = getProto(target);
	        let hadKey = has.call(target, key);
	        if (!hadKey) {
	          key = toRaw(key);
	          hadKey = has.call(target, key);
	        }
	        const oldValue = get.call(target, key);
	        target.set(key, value);
	        if (!hadKey) {
	          trigger(target, "add", key, value);
	        } else if (shared.hasChanged(value, oldValue)) {
	          trigger(target, "set", key, value);
	        }
	        return this;
	      },
	      delete(key) {
	        const target = toRaw(this);
	        const { has, get } = getProto(target);
	        let hadKey = has.call(target, key);
	        if (!hadKey) {
	          key = toRaw(key);
	          hadKey = has.call(target, key);
	        }
	        get ? get.call(target, key) : void 0;
	        const result = target.delete(key);
	        if (hadKey) {
	          trigger(target, "delete", key, void 0);
	        }
	        return result;
	      },
	      clear() {
	        const target = toRaw(this);
	        const hadItems = target.size !== 0;
	        const result = target.clear();
	        if (hadItems) {
	          trigger(
	            target,
	            "clear",
	            void 0,
	            void 0);
	        }
	        return result;
	      }
	    }
	  );
	  const iteratorMethods = [
	    "keys",
	    "values",
	    "entries",
	    Symbol.iterator
	  ];
	  iteratorMethods.forEach((method) => {
	    instrumentations[method] = createIterableMethod(method, readonly, shallow);
	  });
	  return instrumentations;
	}
	function createInstrumentationGetter(isReadonly2, shallow) {
	  const instrumentations = createInstrumentations(isReadonly2, shallow);
	  return (target, key, receiver) => {
	    if (key === "__v_isReactive") {
	      return !isReadonly2;
	    } else if (key === "__v_isReadonly") {
	      return isReadonly2;
	    } else if (key === "__v_raw") {
	      return target;
	    }
	    return Reflect.get(
	      shared.hasOwn(instrumentations, key) && key in target ? instrumentations : target,
	      key,
	      receiver
	    );
	  };
	}
	const mutableCollectionHandlers = {
	  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
	};
	const shallowCollectionHandlers = {
	  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
	};
	const readonlyCollectionHandlers = {
	  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
	};
	const shallowReadonlyCollectionHandlers = {
	  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
	};

	const reactiveMap = /* @__PURE__ */ new WeakMap();
	const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
	const readonlyMap = /* @__PURE__ */ new WeakMap();
	const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
	function targetTypeMap(rawType) {
	  switch (rawType) {
	    case "Object":
	    case "Array":
	      return 1 /* COMMON */;
	    case "Map":
	    case "Set":
	    case "WeakMap":
	    case "WeakSet":
	      return 2 /* COLLECTION */;
	    default:
	      return 0 /* INVALID */;
	  }
	}
	function getTargetType(value) {
	  return value["__v_skip"] || !Object.isExtensible(value) ? 0 /* INVALID */ : targetTypeMap(shared.toRawType(value));
	}
	function reactive(target) {
	  if (isReadonly(target)) {
	    return target;
	  }
	  return createReactiveObject(
	    target,
	    false,
	    mutableHandlers,
	    mutableCollectionHandlers,
	    reactiveMap
	  );
	}
	function shallowReactive(target) {
	  return createReactiveObject(
	    target,
	    false,
	    shallowReactiveHandlers,
	    shallowCollectionHandlers,
	    shallowReactiveMap
	  );
	}
	function readonly(target) {
	  return createReactiveObject(
	    target,
	    true,
	    readonlyHandlers,
	    readonlyCollectionHandlers,
	    readonlyMap
	  );
	}
	function shallowReadonly(target) {
	  return createReactiveObject(
	    target,
	    true,
	    shallowReadonlyHandlers,
	    shallowReadonlyCollectionHandlers,
	    shallowReadonlyMap
	  );
	}
	function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
	  if (!shared.isObject(target)) {
	    return target;
	  }
	  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
	    return target;
	  }
	  const targetType = getTargetType(target);
	  if (targetType === 0 /* INVALID */) {
	    return target;
	  }
	  const existingProxy = proxyMap.get(target);
	  if (existingProxy) {
	    return existingProxy;
	  }
	  const proxy = new Proxy(
	    target,
	    targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers
	  );
	  proxyMap.set(target, proxy);
	  return proxy;
	}
	function isReactive(value) {
	  if (isReadonly(value)) {
	    return isReactive(value["__v_raw"]);
	  }
	  return !!(value && value["__v_isReactive"]);
	}
	function isReadonly(value) {
	  return !!(value && value["__v_isReadonly"]);
	}
	function isShallow(value) {
	  return !!(value && value["__v_isShallow"]);
	}
	function isProxy(value) {
	  return value ? !!value["__v_raw"] : false;
	}
	function toRaw(observed) {
	  const raw = observed && observed["__v_raw"];
	  return raw ? toRaw(raw) : observed;
	}
	function markRaw(value) {
	  if (!shared.hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
	    shared.def(value, "__v_skip", true);
	  }
	  return value;
	}
	const toReactive = (value) => shared.isObject(value) ? reactive(value) : value;
	const toReadonly = (value) => shared.isObject(value) ? readonly(value) : value;

	function isRef(r) {
	  return r ? r["__v_isRef"] === true : false;
	}
	function ref(value) {
	  return createRef(value, false);
	}
	function shallowRef(value) {
	  return createRef(value, true);
	}
	function createRef(rawValue, shallow) {
	  if (isRef(rawValue)) {
	    return rawValue;
	  }
	  return new RefImpl(rawValue, shallow);
	}
	class RefImpl {
	  constructor(value, isShallow2) {
	    this.dep = new Dep();
	    this["__v_isRef"] = true;
	    this["__v_isShallow"] = false;
	    this._rawValue = isShallow2 ? value : toRaw(value);
	    this._value = isShallow2 ? value : toReactive(value);
	    this["__v_isShallow"] = isShallow2;
	  }
	  get value() {
	    {
	      this.dep.track();
	    }
	    return this._value;
	  }
	  set value(newValue) {
	    const oldValue = this._rawValue;
	    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
	    newValue = useDirectValue ? newValue : toRaw(newValue);
	    if (shared.hasChanged(newValue, oldValue)) {
	      this._rawValue = newValue;
	      this._value = useDirectValue ? newValue : toReactive(newValue);
	      {
	        this.dep.trigger();
	      }
	    }
	  }
	}
	function triggerRef(ref2) {
	  if (ref2.dep) {
	    {
	      ref2.dep.trigger();
	    }
	  }
	}
	function unref(ref2) {
	  return isRef(ref2) ? ref2.value : ref2;
	}
	function toValue(source) {
	  return shared.isFunction(source) ? source() : unref(source);
	}
	const shallowUnwrapHandlers = {
	  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
	  set: (target, key, value, receiver) => {
	    const oldValue = target[key];
	    if (isRef(oldValue) && !isRef(value)) {
	      oldValue.value = value;
	      return true;
	    } else {
	      return Reflect.set(target, key, value, receiver);
	    }
	  }
	};
	function proxyRefs(objectWithRefs) {
	  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
	}
	class CustomRefImpl {
	  constructor(factory) {
	    this["__v_isRef"] = true;
	    this._value = void 0;
	    const dep = this.dep = new Dep();
	    const { get, set } = factory(dep.track.bind(dep), dep.trigger.bind(dep));
	    this._get = get;
	    this._set = set;
	  }
	  get value() {
	    return this._value = this._get();
	  }
	  set value(newVal) {
	    this._set(newVal);
	  }
	}
	function customRef(factory) {
	  return new CustomRefImpl(factory);
	}
	function toRefs(object) {
	  const ret = shared.isArray(object) ? new Array(object.length) : {};
	  for (const key in object) {
	    ret[key] = propertyToRef(object, key);
	  }
	  return ret;
	}
	class ObjectRefImpl {
	  constructor(_object, _key, _defaultValue) {
	    this._object = _object;
	    this._key = _key;
	    this._defaultValue = _defaultValue;
	    this["__v_isRef"] = true;
	    this._value = void 0;
	  }
	  get value() {
	    const val = this._object[this._key];
	    return this._value = val === void 0 ? this._defaultValue : val;
	  }
	  set value(newVal) {
	    this._object[this._key] = newVal;
	  }
	  get dep() {
	    return getDepFromReactive(toRaw(this._object), this._key);
	  }
	}
	class GetterRefImpl {
	  constructor(_getter) {
	    this._getter = _getter;
	    this["__v_isRef"] = true;
	    this["__v_isReadonly"] = true;
	    this._value = void 0;
	  }
	  get value() {
	    return this._value = this._getter();
	  }
	}
	function toRef(source, key, defaultValue) {
	  if (isRef(source)) {
	    return source;
	  } else if (shared.isFunction(source)) {
	    return new GetterRefImpl(source);
	  } else if (shared.isObject(source) && arguments.length > 1) {
	    return propertyToRef(source, key, defaultValue);
	  } else {
	    return ref(source);
	  }
	}
	function propertyToRef(source, key, defaultValue) {
	  const val = source[key];
	  return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
	}

	class ComputedRefImpl {
	  constructor(fn, setter, isSSR) {
	    this.fn = fn;
	    this.setter = setter;
	    /**
	     * @internal
	     */
	    this._value = void 0;
	    /**
	     * @internal
	     */
	    this.dep = new Dep(this);
	    /**
	     * @internal
	     */
	    this.__v_isRef = true;
	    // TODO isolatedDeclarations "__v_isReadonly"
	    // A computed is also a subscriber that tracks other deps
	    /**
	     * @internal
	     */
	    this.deps = void 0;
	    /**
	     * @internal
	     */
	    this.depsTail = void 0;
	    /**
	     * @internal
	     */
	    this.flags = 16;
	    /**
	     * @internal
	     */
	    this.globalVersion = globalVersion - 1;
	    /**
	     * @internal
	     */
	    this.next = void 0;
	    // for backwards compat
	    this.effect = this;
	    this["__v_isReadonly"] = !setter;
	    this.isSSR = isSSR;
	  }
	  /**
	   * @internal
	   */
	  notify() {
	    this.flags |= 16;
	    if (!(this.flags & 8) && // avoid infinite self recursion
	    activeSub !== this) {
	      batch(this, true);
	      return true;
	    }
	  }
	  get value() {
	    const link = this.dep.track();
	    refreshComputed(this);
	    if (link) {
	      link.version = this.dep.version;
	    }
	    return this._value;
	  }
	  set value(newValue) {
	    if (this.setter) {
	      this.setter(newValue);
	    }
	  }
	}
	function computed(getterOrOptions, debugOptions, isSSR = false) {
	  let getter;
	  let setter;
	  if (shared.isFunction(getterOrOptions)) {
	    getter = getterOrOptions;
	  } else {
	    getter = getterOrOptions.get;
	    setter = getterOrOptions.set;
	  }
	  const cRef = new ComputedRefImpl(getter, setter, isSSR);
	  return cRef;
	}

	const TrackOpTypes = {
	  "GET": "get",
	  "HAS": "has",
	  "ITERATE": "iterate"
	};
	const TriggerOpTypes = {
	  "SET": "set",
	  "ADD": "add",
	  "DELETE": "delete",
	  "CLEAR": "clear"
	};
	const ReactiveFlags = {
	  "SKIP": "__v_skip",
	  "IS_REACTIVE": "__v_isReactive",
	  "IS_READONLY": "__v_isReadonly",
	  "IS_SHALLOW": "__v_isShallow",
	  "RAW": "__v_raw",
	  "IS_REF": "__v_isRef"
	};

	const WatchErrorCodes = {
	  "WATCH_GETTER": 2,
	  "2": "WATCH_GETTER",
	  "WATCH_CALLBACK": 3,
	  "3": "WATCH_CALLBACK",
	  "WATCH_CLEANUP": 4,
	  "4": "WATCH_CLEANUP"
	};
	const INITIAL_WATCHER_VALUE = {};
	const cleanupMap = /* @__PURE__ */ new WeakMap();
	let activeWatcher = void 0;
	function getCurrentWatcher() {
	  return activeWatcher;
	}
	function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
	  if (owner) {
	    let cleanups = cleanupMap.get(owner);
	    if (!cleanups) cleanupMap.set(owner, cleanups = []);
	    cleanups.push(cleanupFn);
	  }
	}
	function watch(source, cb, options = shared.EMPTY_OBJ) {
	  const { immediate, deep, once, scheduler, augmentJob, call } = options;
	  const reactiveGetter = (source2) => {
	    if (deep) return source2;
	    if (isShallow(source2) || deep === false || deep === 0)
	      return traverse(source2, 1);
	    return traverse(source2);
	  };
	  let effect;
	  let getter;
	  let cleanup;
	  let boundCleanup;
	  let forceTrigger = false;
	  let isMultiSource = false;
	  if (isRef(source)) {
	    getter = () => source.value;
	    forceTrigger = isShallow(source);
	  } else if (isReactive(source)) {
	    getter = () => reactiveGetter(source);
	    forceTrigger = true;
	  } else if (shared.isArray(source)) {
	    isMultiSource = true;
	    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
	    getter = () => source.map((s) => {
	      if (isRef(s)) {
	        return s.value;
	      } else if (isReactive(s)) {
	        return reactiveGetter(s);
	      } else if (shared.isFunction(s)) {
	        return call ? call(s, 2) : s();
	      } else ;
	    });
	  } else if (shared.isFunction(source)) {
	    if (cb) {
	      getter = call ? () => call(source, 2) : source;
	    } else {
	      getter = () => {
	        if (cleanup) {
	          pauseTracking();
	          try {
	            cleanup();
	          } finally {
	            resetTracking();
	          }
	        }
	        const currentEffect = activeWatcher;
	        activeWatcher = effect;
	        try {
	          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
	        } finally {
	          activeWatcher = currentEffect;
	        }
	      };
	    }
	  } else {
	    getter = shared.NOOP;
	  }
	  if (cb && deep) {
	    const baseGetter = getter;
	    const depth = deep === true ? Infinity : deep;
	    getter = () => traverse(baseGetter(), depth);
	  }
	  const scope = getCurrentScope();
	  const watchHandle = () => {
	    effect.stop();
	    if (scope && scope.active) {
	      shared.remove(scope.effects, effect);
	    }
	  };
	  if (once && cb) {
	    const _cb = cb;
	    cb = (...args) => {
	      _cb(...args);
	      watchHandle();
	    };
	  }
	  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
	  const job = (immediateFirstRun) => {
	    if (!(effect.flags & 1) || !effect.dirty && !immediateFirstRun) {
	      return;
	    }
	    if (cb) {
	      const newValue = effect.run();
	      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => shared.hasChanged(v, oldValue[i])) : shared.hasChanged(newValue, oldValue))) {
	        if (cleanup) {
	          cleanup();
	        }
	        const currentWatcher = activeWatcher;
	        activeWatcher = effect;
	        try {
	          const args = [
	            newValue,
	            // pass undefined as the old value when it's changed for the first time
	            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
	            boundCleanup
	          ];
	          oldValue = newValue;
	          call ? call(cb, 3, args) : (
	            // @ts-expect-error
	            cb(...args)
	          );
	        } finally {
	          activeWatcher = currentWatcher;
	        }
	      }
	    } else {
	      effect.run();
	    }
	  };
	  if (augmentJob) {
	    augmentJob(job);
	  }
	  effect = new ReactiveEffect(getter);
	  effect.scheduler = scheduler ? () => scheduler(job, false) : job;
	  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect);
	  cleanup = effect.onStop = () => {
	    const cleanups = cleanupMap.get(effect);
	    if (cleanups) {
	      if (call) {
	        call(cleanups, 4);
	      } else {
	        for (const cleanup2 of cleanups) cleanup2();
	      }
	      cleanupMap.delete(effect);
	    }
	  };
	  if (cb) {
	    if (immediate) {
	      job(true);
	    } else {
	      oldValue = effect.run();
	    }
	  } else if (scheduler) {
	    scheduler(job.bind(null, true), true);
	  } else {
	    effect.run();
	  }
	  watchHandle.pause = effect.pause.bind(effect);
	  watchHandle.resume = effect.resume.bind(effect);
	  watchHandle.stop = watchHandle;
	  return watchHandle;
	}
	function traverse(value, depth = Infinity, seen) {
	  if (depth <= 0 || !shared.isObject(value) || value["__v_skip"]) {
	    return value;
	  }
	  seen = seen || /* @__PURE__ */ new Set();
	  if (seen.has(value)) {
	    return value;
	  }
	  seen.add(value);
	  depth--;
	  if (isRef(value)) {
	    traverse(value.value, depth, seen);
	  } else if (shared.isArray(value)) {
	    for (let i = 0; i < value.length; i++) {
	      traverse(value[i], depth, seen);
	    }
	  } else if (shared.isSet(value) || shared.isMap(value)) {
	    value.forEach((v) => {
	      traverse(v, depth, seen);
	    });
	  } else if (shared.isPlainObject(value)) {
	    for (const key in value) {
	      traverse(value[key], depth, seen);
	    }
	    for (const key of Object.getOwnPropertySymbols(value)) {
	      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
	        traverse(value[key], depth, seen);
	      }
	    }
	  }
	  return value;
	}

	reactivity_cjs_prod.ARRAY_ITERATE_KEY = ARRAY_ITERATE_KEY;
	reactivity_cjs_prod.EffectFlags = EffectFlags;
	reactivity_cjs_prod.EffectScope = EffectScope;
	reactivity_cjs_prod.ITERATE_KEY = ITERATE_KEY;
	reactivity_cjs_prod.MAP_KEY_ITERATE_KEY = MAP_KEY_ITERATE_KEY;
	reactivity_cjs_prod.ReactiveEffect = ReactiveEffect;
	reactivity_cjs_prod.ReactiveFlags = ReactiveFlags;
	reactivity_cjs_prod.TrackOpTypes = TrackOpTypes;
	reactivity_cjs_prod.TriggerOpTypes = TriggerOpTypes;
	reactivity_cjs_prod.WatchErrorCodes = WatchErrorCodes;
	reactivity_cjs_prod.computed = computed;
	reactivity_cjs_prod.customRef = customRef;
	reactivity_cjs_prod.effect = effect;
	reactivity_cjs_prod.effectScope = effectScope;
	reactivity_cjs_prod.enableTracking = enableTracking;
	reactivity_cjs_prod.getCurrentScope = getCurrentScope;
	reactivity_cjs_prod.getCurrentWatcher = getCurrentWatcher;
	reactivity_cjs_prod.isProxy = isProxy;
	reactivity_cjs_prod.isReactive = isReactive;
	reactivity_cjs_prod.isReadonly = isReadonly;
	reactivity_cjs_prod.isRef = isRef;
	reactivity_cjs_prod.isShallow = isShallow;
	reactivity_cjs_prod.markRaw = markRaw;
	reactivity_cjs_prod.onEffectCleanup = onEffectCleanup;
	reactivity_cjs_prod.onScopeDispose = onScopeDispose;
	reactivity_cjs_prod.onWatcherCleanup = onWatcherCleanup;
	reactivity_cjs_prod.pauseTracking = pauseTracking;
	reactivity_cjs_prod.proxyRefs = proxyRefs;
	reactivity_cjs_prod.reactive = reactive;
	reactivity_cjs_prod.reactiveReadArray = reactiveReadArray;
	reactivity_cjs_prod.readonly = readonly;
	reactivity_cjs_prod.ref = ref;
	reactivity_cjs_prod.resetTracking = resetTracking;
	reactivity_cjs_prod.shallowReactive = shallowReactive;
	reactivity_cjs_prod.shallowReadArray = shallowReadArray;
	reactivity_cjs_prod.shallowReadonly = shallowReadonly;
	reactivity_cjs_prod.shallowRef = shallowRef;
	reactivity_cjs_prod.stop = stop;
	reactivity_cjs_prod.toRaw = toRaw;
	reactivity_cjs_prod.toReactive = toReactive;
	reactivity_cjs_prod.toReadonly = toReadonly;
	reactivity_cjs_prod.toRef = toRef;
	reactivity_cjs_prod.toRefs = toRefs;
	reactivity_cjs_prod.toValue = toValue;
	reactivity_cjs_prod.track = track;
	reactivity_cjs_prod.traverse = traverse;
	reactivity_cjs_prod.trigger = trigger;
	reactivity_cjs_prod.triggerRef = triggerRef;
	reactivity_cjs_prod.unref = unref;
	reactivity_cjs_prod.watch = watch;
	return reactivity_cjs_prod;
}

/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/

var hasRequiredRuntimeCore_cjs_prod;

function requireRuntimeCore_cjs_prod () {
	if (hasRequiredRuntimeCore_cjs_prod) return runtimeCore_cjs_prod;
	hasRequiredRuntimeCore_cjs_prod = 1;

	Object.defineProperty(runtimeCore_cjs_prod, '__esModule', { value: true });

	var reactivity = /*@__PURE__*/ requireReactivity_cjs_prod();
	var shared = /*@__PURE__*/ requireShared_cjs_prod();

	function pushWarningContext(vnode) {
	}
	function popWarningContext() {
	}
	function assertNumber(val, type) {
	  return;
	}

	const ErrorCodes = {
	  "SETUP_FUNCTION": 0,
	  "0": "SETUP_FUNCTION",
	  "RENDER_FUNCTION": 1,
	  "1": "RENDER_FUNCTION",
	  "NATIVE_EVENT_HANDLER": 5,
	  "5": "NATIVE_EVENT_HANDLER",
	  "COMPONENT_EVENT_HANDLER": 6,
	  "6": "COMPONENT_EVENT_HANDLER",
	  "VNODE_HOOK": 7,
	  "7": "VNODE_HOOK",
	  "DIRECTIVE_HOOK": 8,
	  "8": "DIRECTIVE_HOOK",
	  "TRANSITION_HOOK": 9,
	  "9": "TRANSITION_HOOK",
	  "APP_ERROR_HANDLER": 10,
	  "10": "APP_ERROR_HANDLER",
	  "APP_WARN_HANDLER": 11,
	  "11": "APP_WARN_HANDLER",
	  "FUNCTION_REF": 12,
	  "12": "FUNCTION_REF",
	  "ASYNC_COMPONENT_LOADER": 13,
	  "13": "ASYNC_COMPONENT_LOADER",
	  "SCHEDULER": 14,
	  "14": "SCHEDULER",
	  "COMPONENT_UPDATE": 15,
	  "15": "COMPONENT_UPDATE",
	  "APP_UNMOUNT_CLEANUP": 16,
	  "16": "APP_UNMOUNT_CLEANUP"
	};
	const ErrorTypeStrings$1 = {
	  ["sp"]: "serverPrefetch hook",
	  ["bc"]: "beforeCreate hook",
	  ["c"]: "created hook",
	  ["bm"]: "beforeMount hook",
	  ["m"]: "mounted hook",
	  ["bu"]: "beforeUpdate hook",
	  ["u"]: "updated",
	  ["bum"]: "beforeUnmount hook",
	  ["um"]: "unmounted hook",
	  ["a"]: "activated hook",
	  ["da"]: "deactivated hook",
	  ["ec"]: "errorCaptured hook",
	  ["rtc"]: "renderTracked hook",
	  ["rtg"]: "renderTriggered hook",
	  [0]: "setup function",
	  [1]: "render function",
	  [2]: "watcher getter",
	  [3]: "watcher callback",
	  [4]: "watcher cleanup function",
	  [5]: "native event handler",
	  [6]: "component event handler",
	  [7]: "vnode hook",
	  [8]: "directive hook",
	  [9]: "transition hook",
	  [10]: "app errorHandler",
	  [11]: "app warnHandler",
	  [12]: "ref function",
	  [13]: "async component loader",
	  [14]: "scheduler flush",
	  [15]: "component update",
	  [16]: "app unmount cleanup function"
	};
	function callWithErrorHandling(fn, instance, type, args) {
	  try {
	    return args ? fn(...args) : fn();
	  } catch (err) {
	    handleError(err, instance, type);
	  }
	}
	function callWithAsyncErrorHandling(fn, instance, type, args) {
	  if (shared.isFunction(fn)) {
	    const res = callWithErrorHandling(fn, instance, type, args);
	    if (res && shared.isPromise(res)) {
	      res.catch((err) => {
	        handleError(err, instance, type);
	      });
	    }
	    return res;
	  }
	  if (shared.isArray(fn)) {
	    const values = [];
	    for (let i = 0; i < fn.length; i++) {
	      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
	    }
	    return values;
	  }
	}
	function handleError(err, instance, type, throwInDev = true) {
	  const contextVNode = instance ? instance.vnode : null;
	  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || shared.EMPTY_OBJ;
	  if (instance) {
	    let cur = instance.parent;
	    const exposedInstance = instance.proxy;
	    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
	    while (cur) {
	      const errorCapturedHooks = cur.ec;
	      if (errorCapturedHooks) {
	        for (let i = 0; i < errorCapturedHooks.length; i++) {
	          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
	            return;
	          }
	        }
	      }
	      cur = cur.parent;
	    }
	    if (errorHandler) {
	      reactivity.pauseTracking();
	      callWithErrorHandling(errorHandler, null, 10, [
	        err,
	        exposedInstance,
	        errorInfo
	      ]);
	      reactivity.resetTracking();
	      return;
	    }
	  }
	  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
	}
	function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
	  if (throwInProd) {
	    throw err;
	  } else {
	    console.error(err);
	  }
	}

	const queue = [];
	let flushIndex = -1;
	const pendingPostFlushCbs = [];
	let activePostFlushCbs = null;
	let postFlushIndex = 0;
	const resolvedPromise = /* @__PURE__ */ Promise.resolve();
	let currentFlushPromise = null;
	function nextTick(fn) {
	  const p = currentFlushPromise || resolvedPromise;
	  return fn ? p.then(this ? fn.bind(this) : fn) : p;
	}
	function findInsertionIndex(id) {
	  let start = flushIndex + 1;
	  let end = queue.length;
	  while (start < end) {
	    const middle = start + end >>> 1;
	    const middleJob = queue[middle];
	    const middleJobId = getId(middleJob);
	    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
	      start = middle + 1;
	    } else {
	      end = middle;
	    }
	  }
	  return start;
	}
	function queueJob(job) {
	  if (!(job.flags & 1)) {
	    const jobId = getId(job);
	    const lastJob = queue[queue.length - 1];
	    if (!lastJob || // fast path when the job id is larger than the tail
	    !(job.flags & 2) && jobId >= getId(lastJob)) {
	      queue.push(job);
	    } else {
	      queue.splice(findInsertionIndex(jobId), 0, job);
	    }
	    job.flags |= 1;
	    queueFlush();
	  }
	}
	function queueFlush() {
	  if (!currentFlushPromise) {
	    currentFlushPromise = resolvedPromise.then(flushJobs);
	  }
	}
	function queuePostFlushCb(cb) {
	  if (!shared.isArray(cb)) {
	    if (activePostFlushCbs && cb.id === -1) {
	      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
	    } else if (!(cb.flags & 1)) {
	      pendingPostFlushCbs.push(cb);
	      cb.flags |= 1;
	    }
	  } else {
	    pendingPostFlushCbs.push(...cb);
	  }
	  queueFlush();
	}
	function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
	  for (; i < queue.length; i++) {
	    const cb = queue[i];
	    if (cb && cb.flags & 2) {
	      if (instance && cb.id !== instance.uid) {
	        continue;
	      }
	      queue.splice(i, 1);
	      i--;
	      if (cb.flags & 4) {
	        cb.flags &= -2;
	      }
	      cb();
	      if (!(cb.flags & 4)) {
	        cb.flags &= -2;
	      }
	    }
	  }
	}
	function flushPostFlushCbs(seen) {
	  if (pendingPostFlushCbs.length) {
	    const deduped = [...new Set(pendingPostFlushCbs)].sort(
	      (a, b) => getId(a) - getId(b)
	    );
	    pendingPostFlushCbs.length = 0;
	    if (activePostFlushCbs) {
	      activePostFlushCbs.push(...deduped);
	      return;
	    }
	    activePostFlushCbs = deduped;
	    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
	      const cb = activePostFlushCbs[postFlushIndex];
	      if (cb.flags & 4) {
	        cb.flags &= -2;
	      }
	      if (!(cb.flags & 8)) cb();
	      cb.flags &= -2;
	    }
	    activePostFlushCbs = null;
	    postFlushIndex = 0;
	  }
	}
	const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
	function flushJobs(seen) {
	  try {
	    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
	      const job = queue[flushIndex];
	      if (job && !(job.flags & 8)) {
	        if (false) ;
	        if (job.flags & 4) {
	          job.flags &= ~1;
	        }
	        callWithErrorHandling(
	          job,
	          job.i,
	          job.i ? 15 : 14
	        );
	        if (!(job.flags & 4)) {
	          job.flags &= ~1;
	        }
	      }
	    }
	  } finally {
	    for (; flushIndex < queue.length; flushIndex++) {
	      const job = queue[flushIndex];
	      if (job) {
	        job.flags &= -2;
	      }
	    }
	    flushIndex = -1;
	    queue.length = 0;
	    flushPostFlushCbs();
	    currentFlushPromise = null;
	    if (queue.length || pendingPostFlushCbs.length) {
	      flushJobs();
	    }
	  }
	}

	let currentRenderingInstance = null;
	let currentScopeId = null;
	function setCurrentRenderingInstance(instance) {
	  const prev = currentRenderingInstance;
	  currentRenderingInstance = instance;
	  currentScopeId = instance && instance.type.__scopeId || null;
	  return prev;
	}
	function pushScopeId(id) {
	  currentScopeId = id;
	}
	function popScopeId() {
	  currentScopeId = null;
	}
	const withScopeId = (_id) => withCtx;
	function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
	  if (!ctx) return fn;
	  if (fn._n) {
	    return fn;
	  }
	  const renderFnWithContext = (...args) => {
	    if (renderFnWithContext._d) {
	      setBlockTracking(-1);
	    }
	    const prevInstance = setCurrentRenderingInstance(ctx);
	    let res;
	    try {
	      res = fn(...args);
	    } finally {
	      setCurrentRenderingInstance(prevInstance);
	      if (renderFnWithContext._d) {
	        setBlockTracking(1);
	      }
	    }
	    return res;
	  };
	  renderFnWithContext._n = true;
	  renderFnWithContext._c = true;
	  renderFnWithContext._d = true;
	  return renderFnWithContext;
	}

	function withDirectives(vnode, directives) {
	  if (currentRenderingInstance === null) {
	    return vnode;
	  }
	  const instance = getComponentPublicInstance(currentRenderingInstance);
	  const bindings = vnode.dirs || (vnode.dirs = []);
	  for (let i = 0; i < directives.length; i++) {
	    let [dir, value, arg, modifiers = shared.EMPTY_OBJ] = directives[i];
	    if (dir) {
	      if (shared.isFunction(dir)) {
	        dir = {
	          mounted: dir,
	          updated: dir
	        };
	      }
	      if (dir.deep) {
	        reactivity.traverse(value);
	      }
	      bindings.push({
	        dir,
	        instance,
	        value,
	        oldValue: void 0,
	        arg,
	        modifiers
	      });
	    }
	  }
	  return vnode;
	}
	function invokeDirectiveHook(vnode, prevVNode, instance, name) {
	  const bindings = vnode.dirs;
	  const oldBindings = prevVNode && prevVNode.dirs;
	  for (let i = 0; i < bindings.length; i++) {
	    const binding = bindings[i];
	    if (oldBindings) {
	      binding.oldValue = oldBindings[i].value;
	    }
	    let hook = binding.dir[name];
	    if (hook) {
	      reactivity.pauseTracking();
	      callWithAsyncErrorHandling(hook, instance, 8, [
	        vnode.el,
	        binding,
	        vnode,
	        prevVNode
	      ]);
	      reactivity.resetTracking();
	    }
	  }
	}

	const TeleportEndKey = Symbol("_vte");
	const isTeleport = (type) => type.__isTeleport;
	const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
	const isTeleportDeferred = (props) => props && (props.defer || props.defer === "");
	const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
	const isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
	const resolveTarget = (props, select) => {
	  const targetSelector = props && props.to;
	  if (shared.isString(targetSelector)) {
	    if (!select) {
	      return null;
	    } else {
	      const target = select(targetSelector);
	      return target;
	    }
	  } else {
	    return targetSelector;
	  }
	};
	const TeleportImpl = {
	  name: "Teleport",
	  __isTeleport: true,
	  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
	    const {
	      mc: mountChildren,
	      pc: patchChildren,
	      pbc: patchBlockChildren,
	      o: { insert, querySelector, createText, createComment }
	    } = internals;
	    const disabled = isTeleportDisabled(n2.props);
	    let { shapeFlag, children, dynamicChildren } = n2;
	    if (n1 == null) {
	      const placeholder = n2.el = createText("");
	      const mainAnchor = n2.anchor = createText("");
	      insert(placeholder, container, anchor);
	      insert(mainAnchor, container, anchor);
	      const mount = (container2, anchor2) => {
	        if (shapeFlag & 16) {
	          if (parentComponent && parentComponent.isCE) {
	            parentComponent.ce._teleportTarget = container2;
	          }
	          mountChildren(
	            children,
	            container2,
	            anchor2,
	            parentComponent,
	            parentSuspense,
	            namespace,
	            slotScopeIds,
	            optimized
	          );
	        }
	      };
	      const mountToTarget = () => {
	        const target = n2.target = resolveTarget(n2.props, querySelector);
	        const targetAnchor = prepareAnchor(target, n2, createText, insert);
	        if (target) {
	          if (namespace !== "svg" && isTargetSVG(target)) {
	            namespace = "svg";
	          } else if (namespace !== "mathml" && isTargetMathML(target)) {
	            namespace = "mathml";
	          }
	          if (!disabled) {
	            mount(target, targetAnchor);
	            updateCssVars(n2, false);
	          }
	        }
	      };
	      if (disabled) {
	        mount(container, mainAnchor);
	        updateCssVars(n2, true);
	      }
	      if (isTeleportDeferred(n2.props)) {
	        n2.el.__isMounted = false;
	        queuePostRenderEffect(() => {
	          mountToTarget();
	          delete n2.el.__isMounted;
	        }, parentSuspense);
	      } else {
	        mountToTarget();
	      }
	    } else {
	      if (isTeleportDeferred(n2.props) && n1.el.__isMounted === false) {
	        queuePostRenderEffect(() => {
	          TeleportImpl.process(
	            n1,
	            n2,
	            container,
	            anchor,
	            parentComponent,
	            parentSuspense,
	            namespace,
	            slotScopeIds,
	            optimized,
	            internals
	          );
	        }, parentSuspense);
	        return;
	      }
	      n2.el = n1.el;
	      n2.targetStart = n1.targetStart;
	      const mainAnchor = n2.anchor = n1.anchor;
	      const target = n2.target = n1.target;
	      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
	      const wasDisabled = isTeleportDisabled(n1.props);
	      const currentContainer = wasDisabled ? container : target;
	      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
	      if (namespace === "svg" || isTargetSVG(target)) {
	        namespace = "svg";
	      } else if (namespace === "mathml" || isTargetMathML(target)) {
	        namespace = "mathml";
	      }
	      if (dynamicChildren) {
	        patchBlockChildren(
	          n1.dynamicChildren,
	          dynamicChildren,
	          currentContainer,
	          parentComponent,
	          parentSuspense,
	          namespace,
	          slotScopeIds
	        );
	        traverseStaticChildren(n1, n2, true);
	      } else if (!optimized) {
	        patchChildren(
	          n1,
	          n2,
	          currentContainer,
	          currentAnchor,
	          parentComponent,
	          parentSuspense,
	          namespace,
	          slotScopeIds,
	          false
	        );
	      }
	      if (disabled) {
	        if (!wasDisabled) {
	          moveTeleport(
	            n2,
	            container,
	            mainAnchor,
	            internals,
	            1
	          );
	        } else {
	          if (n2.props && n1.props && n2.props.to !== n1.props.to) {
	            n2.props.to = n1.props.to;
	          }
	        }
	      } else {
	        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
	          const nextTarget = n2.target = resolveTarget(
	            n2.props,
	            querySelector
	          );
	          if (nextTarget) {
	            moveTeleport(
	              n2,
	              nextTarget,
	              null,
	              internals,
	              0
	            );
	          }
	        } else if (wasDisabled) {
	          moveTeleport(
	            n2,
	            target,
	            targetAnchor,
	            internals,
	            1
	          );
	        }
	      }
	      updateCssVars(n2, disabled);
	    }
	  },
	  remove(vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
	    const {
	      shapeFlag,
	      children,
	      anchor,
	      targetStart,
	      targetAnchor,
	      target,
	      props
	    } = vnode;
	    if (target) {
	      hostRemove(targetStart);
	      hostRemove(targetAnchor);
	    }
	    doRemove && hostRemove(anchor);
	    if (shapeFlag & 16) {
	      const shouldRemove = doRemove || !isTeleportDisabled(props);
	      for (let i = 0; i < children.length; i++) {
	        const child = children[i];
	        unmount(
	          child,
	          parentComponent,
	          parentSuspense,
	          shouldRemove,
	          !!child.dynamicChildren
	        );
	      }
	    }
	  },
	  move: moveTeleport,
	  hydrate: hydrateTeleport
	};
	function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
	  if (moveType === 0) {
	    insert(vnode.targetAnchor, container, parentAnchor);
	  }
	  const { el, anchor, shapeFlag, children, props } = vnode;
	  const isReorder = moveType === 2;
	  if (isReorder) {
	    insert(el, container, parentAnchor);
	  }
	  if (!isReorder || isTeleportDisabled(props)) {
	    if (shapeFlag & 16) {
	      for (let i = 0; i < children.length; i++) {
	        move(
	          children[i],
	          container,
	          parentAnchor,
	          2
	        );
	      }
	    }
	  }
	  if (isReorder) {
	    insert(anchor, container, parentAnchor);
	  }
	}
	function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
	  o: { nextSibling, parentNode, querySelector, insert, createText }
	}, hydrateChildren) {
	  const target = vnode.target = resolveTarget(
	    vnode.props,
	    querySelector
	  );
	  if (target) {
	    const disabled = isTeleportDisabled(vnode.props);
	    const targetNode = target._lpa || target.firstChild;
	    if (vnode.shapeFlag & 16) {
	      if (disabled) {
	        vnode.anchor = hydrateChildren(
	          nextSibling(node),
	          vnode,
	          parentNode(node),
	          parentComponent,
	          parentSuspense,
	          slotScopeIds,
	          optimized
	        );
	        vnode.targetStart = targetNode;
	        vnode.targetAnchor = targetNode && nextSibling(targetNode);
	      } else {
	        vnode.anchor = nextSibling(node);
	        let targetAnchor = targetNode;
	        while (targetAnchor) {
	          if (targetAnchor && targetAnchor.nodeType === 8) {
	            if (targetAnchor.data === "teleport start anchor") {
	              vnode.targetStart = targetAnchor;
	            } else if (targetAnchor.data === "teleport anchor") {
	              vnode.targetAnchor = targetAnchor;
	              target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
	              break;
	            }
	          }
	          targetAnchor = nextSibling(targetAnchor);
	        }
	        if (!vnode.targetAnchor) {
	          prepareAnchor(target, vnode, createText, insert);
	        }
	        hydrateChildren(
	          targetNode && nextSibling(targetNode),
	          vnode,
	          target,
	          parentComponent,
	          parentSuspense,
	          slotScopeIds,
	          optimized
	        );
	      }
	    }
	    updateCssVars(vnode, disabled);
	  }
	  return vnode.anchor && nextSibling(vnode.anchor);
	}
	const Teleport = TeleportImpl;
	function updateCssVars(vnode, isDisabled) {
	  const ctx = vnode.ctx;
	  if (ctx && ctx.ut) {
	    let node, anchor;
	    if (isDisabled) {
	      node = vnode.el;
	      anchor = vnode.anchor;
	    } else {
	      node = vnode.targetStart;
	      anchor = vnode.targetAnchor;
	    }
	    while (node && node !== anchor) {
	      if (node.nodeType === 1) node.setAttribute("data-v-owner", ctx.uid);
	      node = node.nextSibling;
	    }
	    ctx.ut();
	  }
	}
	function prepareAnchor(target, vnode, createText, insert) {
	  const targetStart = vnode.targetStart = createText("");
	  const targetAnchor = vnode.targetAnchor = createText("");
	  targetStart[TeleportEndKey] = targetAnchor;
	  if (target) {
	    insert(targetStart, target);
	    insert(targetAnchor, target);
	  }
	  return targetAnchor;
	}

	const leaveCbKey = Symbol("_leaveCb");
	const enterCbKey = Symbol("_enterCb");
	function useTransitionState() {
	  const state = {
	    isMounted: false,
	    isLeaving: false,
	    isUnmounting: false,
	    leavingVNodes: /* @__PURE__ */ new Map()
	  };
	  onMounted(() => {
	    state.isMounted = true;
	  });
	  onBeforeUnmount(() => {
	    state.isUnmounting = true;
	  });
	  return state;
	}
	const TransitionHookValidator = [Function, Array];
	const BaseTransitionPropsValidators = {
	  mode: String,
	  appear: Boolean,
	  persisted: Boolean,
	  // enter
	  onBeforeEnter: TransitionHookValidator,
	  onEnter: TransitionHookValidator,
	  onAfterEnter: TransitionHookValidator,
	  onEnterCancelled: TransitionHookValidator,
	  // leave
	  onBeforeLeave: TransitionHookValidator,
	  onLeave: TransitionHookValidator,
	  onAfterLeave: TransitionHookValidator,
	  onLeaveCancelled: TransitionHookValidator,
	  // appear
	  onBeforeAppear: TransitionHookValidator,
	  onAppear: TransitionHookValidator,
	  onAfterAppear: TransitionHookValidator,
	  onAppearCancelled: TransitionHookValidator
	};
	const recursiveGetSubtree = (instance) => {
	  const subTree = instance.subTree;
	  return subTree.component ? recursiveGetSubtree(subTree.component) : subTree;
	};
	const BaseTransitionImpl = {
	  name: `BaseTransition`,
	  props: BaseTransitionPropsValidators,
	  setup(props, { slots }) {
	    const instance = getCurrentInstance();
	    const state = useTransitionState();
	    return () => {
	      const children = slots.default && getTransitionRawChildren(slots.default(), true);
	      if (!children || !children.length) {
	        return;
	      }
	      const child = findNonCommentChild(children);
	      const rawProps = reactivity.toRaw(props);
	      const { mode } = rawProps;
	      if (state.isLeaving) {
	        return emptyPlaceholder(child);
	      }
	      const innerChild = getInnerChild$1(child);
	      if (!innerChild) {
	        return emptyPlaceholder(child);
	      }
	      let enterHooks = resolveTransitionHooks(
	        innerChild,
	        rawProps,
	        state,
	        instance,
	        // #11061, ensure enterHooks is fresh after clone
	        (hooks) => enterHooks = hooks
	      );
	      if (innerChild.type !== Comment) {
	        setTransitionHooks(innerChild, enterHooks);
	      }
	      let oldInnerChild = instance.subTree && getInnerChild$1(instance.subTree);
	      if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(innerChild, oldInnerChild) && recursiveGetSubtree(instance).type !== Comment) {
	        let leavingHooks = resolveTransitionHooks(
	          oldInnerChild,
	          rawProps,
	          state,
	          instance
	        );
	        setTransitionHooks(oldInnerChild, leavingHooks);
	        if (mode === "out-in" && innerChild.type !== Comment) {
	          state.isLeaving = true;
	          leavingHooks.afterLeave = () => {
	            state.isLeaving = false;
	            if (!(instance.job.flags & 8)) {
	              instance.update();
	            }
	            delete leavingHooks.afterLeave;
	            oldInnerChild = void 0;
	          };
	          return emptyPlaceholder(child);
	        } else if (mode === "in-out" && innerChild.type !== Comment) {
	          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
	            const leavingVNodesCache = getLeavingNodesForType(
	              state,
	              oldInnerChild
	            );
	            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
	            el[leaveCbKey] = () => {
	              earlyRemove();
	              el[leaveCbKey] = void 0;
	              delete enterHooks.delayedLeave;
	              oldInnerChild = void 0;
	            };
	            enterHooks.delayedLeave = () => {
	              delayedLeave();
	              delete enterHooks.delayedLeave;
	              oldInnerChild = void 0;
	            };
	          };
	        } else {
	          oldInnerChild = void 0;
	        }
	      } else if (oldInnerChild) {
	        oldInnerChild = void 0;
	      }
	      return child;
	    };
	  }
	};
	function findNonCommentChild(children) {
	  let child = children[0];
	  if (children.length > 1) {
	    for (const c of children) {
	      if (c.type !== Comment) {
	        child = c;
	        break;
	      }
	    }
	  }
	  return child;
	}
	const BaseTransition = BaseTransitionImpl;
	function getLeavingNodesForType(state, vnode) {
	  const { leavingVNodes } = state;
	  let leavingVNodesCache = leavingVNodes.get(vnode.type);
	  if (!leavingVNodesCache) {
	    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
	    leavingVNodes.set(vnode.type, leavingVNodesCache);
	  }
	  return leavingVNodesCache;
	}
	function resolveTransitionHooks(vnode, props, state, instance, postClone) {
	  const {
	    appear,
	    mode,
	    persisted = false,
	    onBeforeEnter,
	    onEnter,
	    onAfterEnter,
	    onEnterCancelled,
	    onBeforeLeave,
	    onLeave,
	    onAfterLeave,
	    onLeaveCancelled,
	    onBeforeAppear,
	    onAppear,
	    onAfterAppear,
	    onAppearCancelled
	  } = props;
	  const key = String(vnode.key);
	  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
	  const callHook = (hook, args) => {
	    hook && callWithAsyncErrorHandling(
	      hook,
	      instance,
	      9,
	      args
	    );
	  };
	  const callAsyncHook = (hook, args) => {
	    const done = args[1];
	    callHook(hook, args);
	    if (shared.isArray(hook)) {
	      if (hook.every((hook2) => hook2.length <= 1)) done();
	    } else if (hook.length <= 1) {
	      done();
	    }
	  };
	  const hooks = {
	    mode,
	    persisted,
	    beforeEnter(el) {
	      let hook = onBeforeEnter;
	      if (!state.isMounted) {
	        if (appear) {
	          hook = onBeforeAppear || onBeforeEnter;
	        } else {
	          return;
	        }
	      }
	      if (el[leaveCbKey]) {
	        el[leaveCbKey](
	          true
	          /* cancelled */
	        );
	      }
	      const leavingVNode = leavingVNodesCache[key];
	      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
	        leavingVNode.el[leaveCbKey]();
	      }
	      callHook(hook, [el]);
	    },
	    enter(el) {
	      let hook = onEnter;
	      let afterHook = onAfterEnter;
	      let cancelHook = onEnterCancelled;
	      if (!state.isMounted) {
	        if (appear) {
	          hook = onAppear || onEnter;
	          afterHook = onAfterAppear || onAfterEnter;
	          cancelHook = onAppearCancelled || onEnterCancelled;
	        } else {
	          return;
	        }
	      }
	      let called = false;
	      const done = el[enterCbKey] = (cancelled) => {
	        if (called) return;
	        called = true;
	        if (cancelled) {
	          callHook(cancelHook, [el]);
	        } else {
	          callHook(afterHook, [el]);
	        }
	        if (hooks.delayedLeave) {
	          hooks.delayedLeave();
	        }
	        el[enterCbKey] = void 0;
	      };
	      if (hook) {
	        callAsyncHook(hook, [el, done]);
	      } else {
	        done();
	      }
	    },
	    leave(el, remove) {
	      const key2 = String(vnode.key);
	      if (el[enterCbKey]) {
	        el[enterCbKey](
	          true
	          /* cancelled */
	        );
	      }
	      if (state.isUnmounting) {
	        return remove();
	      }
	      callHook(onBeforeLeave, [el]);
	      let called = false;
	      const done = el[leaveCbKey] = (cancelled) => {
	        if (called) return;
	        called = true;
	        remove();
	        if (cancelled) {
	          callHook(onLeaveCancelled, [el]);
	        } else {
	          callHook(onAfterLeave, [el]);
	        }
	        el[leaveCbKey] = void 0;
	        if (leavingVNodesCache[key2] === vnode) {
	          delete leavingVNodesCache[key2];
	        }
	      };
	      leavingVNodesCache[key2] = vnode;
	      if (onLeave) {
	        callAsyncHook(onLeave, [el, done]);
	      } else {
	        done();
	      }
	    },
	    clone(vnode2) {
	      const hooks2 = resolveTransitionHooks(
	        vnode2,
	        props,
	        state,
	        instance,
	        postClone
	      );
	      if (postClone) postClone(hooks2);
	      return hooks2;
	    }
	  };
	  return hooks;
	}
	function emptyPlaceholder(vnode) {
	  if (isKeepAlive(vnode)) {
	    vnode = cloneVNode(vnode);
	    vnode.children = null;
	    return vnode;
	  }
	}
	function getInnerChild$1(vnode) {
	  if (!isKeepAlive(vnode)) {
	    if (isTeleport(vnode.type) && vnode.children) {
	      return findNonCommentChild(vnode.children);
	    }
	    return vnode;
	  }
	  if (vnode.component) {
	    return vnode.component.subTree;
	  }
	  const { shapeFlag, children } = vnode;
	  if (children) {
	    if (shapeFlag & 16) {
	      return children[0];
	    }
	    if (shapeFlag & 32 && shared.isFunction(children.default)) {
	      return children.default();
	    }
	  }
	}
	function setTransitionHooks(vnode, hooks) {
	  if (vnode.shapeFlag & 6 && vnode.component) {
	    vnode.transition = hooks;
	    setTransitionHooks(vnode.component.subTree, hooks);
	  } else if (vnode.shapeFlag & 128) {
	    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
	    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
	  } else {
	    vnode.transition = hooks;
	  }
	}
	function getTransitionRawChildren(children, keepComment = false, parentKey) {
	  let ret = [];
	  let keyedFragmentCount = 0;
	  for (let i = 0; i < children.length; i++) {
	    let child = children[i];
	    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
	    if (child.type === Fragment) {
	      if (child.patchFlag & 128) keyedFragmentCount++;
	      ret = ret.concat(
	        getTransitionRawChildren(child.children, keepComment, key)
	      );
	    } else if (keepComment || child.type !== Comment) {
	      ret.push(key != null ? cloneVNode(child, { key }) : child);
	    }
	  }
	  if (keyedFragmentCount > 1) {
	    for (let i = 0; i < ret.length; i++) {
	      ret[i].patchFlag = -2;
	    }
	  }
	  return ret;
	}

	/*! #__NO_SIDE_EFFECTS__ */
	// @__NO_SIDE_EFFECTS__
	function defineComponent(options, extraOptions) {
	  return shared.isFunction(options) ? (
	    // #8236: extend call and options.name access are considered side-effects
	    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
	    /* @__PURE__ */ (() => shared.extend({ name: options.name }, extraOptions, { setup: options }))()
	  ) : options;
	}

	function useId() {
	  const i = getCurrentInstance();
	  if (i) {
	    return (i.appContext.config.idPrefix || "v") + "-" + i.ids[0] + i.ids[1]++;
	  }
	  return "";
	}
	function markAsyncBoundary(instance) {
	  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
	}

	function useTemplateRef(key) {
	  const i = getCurrentInstance();
	  const r = reactivity.shallowRef(null);
	  if (i) {
	    const refs = i.refs === shared.EMPTY_OBJ ? i.refs = {} : i.refs;
	    {
	      Object.defineProperty(refs, key, {
	        enumerable: true,
	        get: () => r.value,
	        set: (val) => r.value = val
	      });
	    }
	  }
	  const ret = r;
	  return ret;
	}

	function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
	  if (shared.isArray(rawRef)) {
	    rawRef.forEach(
	      (r, i) => setRef(
	        r,
	        oldRawRef && (shared.isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
	        parentSuspense,
	        vnode,
	        isUnmount
	      )
	    );
	    return;
	  }
	  if (isAsyncWrapper(vnode) && !isUnmount) {
	    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
	      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
	    }
	    return;
	  }
	  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
	  const value = isUnmount ? null : refValue;
	  const { i: owner, r: ref } = rawRef;
	  const oldRef = oldRawRef && oldRawRef.r;
	  const refs = owner.refs === shared.EMPTY_OBJ ? owner.refs = {} : owner.refs;
	  const setupState = owner.setupState;
	  const rawSetupState = reactivity.toRaw(setupState);
	  const canSetSetupRef = setupState === shared.EMPTY_OBJ ? () => false : (key) => {
	    return shared.hasOwn(rawSetupState, key);
	  };
	  if (oldRef != null && oldRef !== ref) {
	    if (shared.isString(oldRef)) {
	      refs[oldRef] = null;
	      if (canSetSetupRef(oldRef)) {
	        setupState[oldRef] = null;
	      }
	    } else if (reactivity.isRef(oldRef)) {
	      oldRef.value = null;
	    }
	  }
	  if (shared.isFunction(ref)) {
	    callWithErrorHandling(ref, owner, 12, [value, refs]);
	  } else {
	    const _isString = shared.isString(ref);
	    const _isRef = reactivity.isRef(ref);
	    if (_isString || _isRef) {
	      const doSet = () => {
	        if (rawRef.f) {
	          const existing = _isString ? canSetSetupRef(ref) ? setupState[ref] : refs[ref] : ref.value;
	          if (isUnmount) {
	            shared.isArray(existing) && shared.remove(existing, refValue);
	          } else {
	            if (!shared.isArray(existing)) {
	              if (_isString) {
	                refs[ref] = [refValue];
	                if (canSetSetupRef(ref)) {
	                  setupState[ref] = refs[ref];
	                }
	              } else {
	                ref.value = [refValue];
	                if (rawRef.k) refs[rawRef.k] = ref.value;
	              }
	            } else if (!existing.includes(refValue)) {
	              existing.push(refValue);
	            }
	          }
	        } else if (_isString) {
	          refs[ref] = value;
	          if (canSetSetupRef(ref)) {
	            setupState[ref] = value;
	          }
	        } else if (_isRef) {
	          ref.value = value;
	          if (rawRef.k) refs[rawRef.k] = value;
	        } else ;
	      };
	      if (value) {
	        doSet.id = -1;
	        queuePostRenderEffect(doSet, parentSuspense);
	      } else {
	        doSet();
	      }
	    }
	  }
	}

	let hasLoggedMismatchError = false;
	const logMismatchError = () => {
	  if (hasLoggedMismatchError) {
	    return;
	  }
	  console.error("Hydration completed but contains mismatches.");
	  hasLoggedMismatchError = true;
	};
	const isSVGContainer = (container) => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject";
	const isMathMLContainer = (container) => container.namespaceURI.includes("MathML");
	const getContainerType = (container) => {
	  if (container.nodeType !== 1) return void 0;
	  if (isSVGContainer(container)) return "svg";
	  if (isMathMLContainer(container)) return "mathml";
	  return void 0;
	};
	const isComment = (node) => node.nodeType === 8;
	function createHydrationFunctions(rendererInternals) {
	  const {
	    mt: mountComponent,
	    p: patch,
	    o: {
	      patchProp,
	      createText,
	      nextSibling,
	      parentNode,
	      remove,
	      insert,
	      createComment
	    }
	  } = rendererInternals;
	  const hydrate = (vnode, container) => {
	    if (!container.hasChildNodes()) {
	      patch(null, vnode, container);
	      flushPostFlushCbs();
	      container._vnode = vnode;
	      return;
	    }
	    hydrateNode(container.firstChild, vnode, null, null, null);
	    flushPostFlushCbs();
	    container._vnode = vnode;
	  };
	  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
	    optimized = optimized || !!vnode.dynamicChildren;
	    const isFragmentStart = isComment(node) && node.data === "[";
	    const onMismatch = () => handleMismatch(
	      node,
	      vnode,
	      parentComponent,
	      parentSuspense,
	      slotScopeIds,
	      isFragmentStart
	    );
	    const { type, ref, shapeFlag, patchFlag } = vnode;
	    let domType = node.nodeType;
	    vnode.el = node;
	    if (patchFlag === -2) {
	      optimized = false;
	      vnode.dynamicChildren = null;
	    }
	    let nextNode = null;
	    switch (type) {
	      case Text:
	        if (domType !== 3) {
	          if (vnode.children === "") {
	            insert(vnode.el = createText(""), parentNode(node), node);
	            nextNode = node;
	          } else {
	            nextNode = onMismatch();
	          }
	        } else {
	          if (node.data !== vnode.children) {
	            logMismatchError();
	            node.data = vnode.children;
	          }
	          nextNode = nextSibling(node);
	        }
	        break;
	      case Comment:
	        if (isTemplateNode(node)) {
	          nextNode = nextSibling(node);
	          replaceNode(
	            vnode.el = node.content.firstChild,
	            node,
	            parentComponent
	          );
	        } else if (domType !== 8 || isFragmentStart) {
	          nextNode = onMismatch();
	        } else {
	          nextNode = nextSibling(node);
	        }
	        break;
	      case Static:
	        if (isFragmentStart) {
	          node = nextSibling(node);
	          domType = node.nodeType;
	        }
	        if (domType === 1 || domType === 3) {
	          nextNode = node;
	          const needToAdoptContent = !vnode.children.length;
	          for (let i = 0; i < vnode.staticCount; i++) {
	            if (needToAdoptContent)
	              vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
	            if (i === vnode.staticCount - 1) {
	              vnode.anchor = nextNode;
	            }
	            nextNode = nextSibling(nextNode);
	          }
	          return isFragmentStart ? nextSibling(nextNode) : nextNode;
	        } else {
	          onMismatch();
	        }
	        break;
	      case Fragment:
	        if (!isFragmentStart) {
	          nextNode = onMismatch();
	        } else {
	          nextNode = hydrateFragment(
	            node,
	            vnode,
	            parentComponent,
	            parentSuspense,
	            slotScopeIds,
	            optimized
	          );
	        }
	        break;
	      default:
	        if (shapeFlag & 1) {
	          if ((domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) {
	            nextNode = onMismatch();
	          } else {
	            nextNode = hydrateElement(
	              node,
	              vnode,
	              parentComponent,
	              parentSuspense,
	              slotScopeIds,
	              optimized
	            );
	          }
	        } else if (shapeFlag & 6) {
	          vnode.slotScopeIds = slotScopeIds;
	          const container = parentNode(node);
	          if (isFragmentStart) {
	            nextNode = locateClosingAnchor(node);
	          } else if (isComment(node) && node.data === "teleport start") {
	            nextNode = locateClosingAnchor(node, node.data, "teleport end");
	          } else {
	            nextNode = nextSibling(node);
	          }
	          mountComponent(
	            vnode,
	            container,
	            null,
	            parentComponent,
	            parentSuspense,
	            getContainerType(container),
	            optimized
	          );
	          if (isAsyncWrapper(vnode) && !vnode.type.__asyncResolved) {
	            let subTree;
	            if (isFragmentStart) {
	              subTree = createVNode(Fragment);
	              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
	            } else {
	              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
	            }
	            subTree.el = node;
	            vnode.component.subTree = subTree;
	          }
	        } else if (shapeFlag & 64) {
	          if (domType !== 8) {
	            nextNode = onMismatch();
	          } else {
	            nextNode = vnode.type.hydrate(
	              node,
	              vnode,
	              parentComponent,
	              parentSuspense,
	              slotScopeIds,
	              optimized,
	              rendererInternals,
	              hydrateChildren
	            );
	          }
	        } else if (shapeFlag & 128) {
	          nextNode = vnode.type.hydrate(
	            node,
	            vnode,
	            parentComponent,
	            parentSuspense,
	            getContainerType(parentNode(node)),
	            slotScopeIds,
	            optimized,
	            rendererInternals,
	            hydrateNode
	          );
	        } else ;
	    }
	    if (ref != null) {
	      setRef(ref, null, parentSuspense, vnode);
	    }
	    return nextNode;
	  };
	  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
	    optimized = optimized || !!vnode.dynamicChildren;
	    const { type, props, patchFlag, shapeFlag, dirs, transition } = vnode;
	    const forcePatch = type === "input" || type === "option";
	    if (forcePatch || patchFlag !== -1) {
	      if (dirs) {
	        invokeDirectiveHook(vnode, null, parentComponent, "created");
	      }
	      let needCallTransitionHooks = false;
	      if (isTemplateNode(el)) {
	        needCallTransitionHooks = needTransition(
	          null,
	          // no need check parentSuspense in hydration
	          transition
	        ) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
	        const content = el.content.firstChild;
	        if (needCallTransitionHooks) {
	          const cls = content.getAttribute("class");
	          if (cls) content.$cls = cls;
	          transition.beforeEnter(content);
	        }
	        replaceNode(content, el, parentComponent);
	        vnode.el = el = content;
	      }
	      if (shapeFlag & 16 && // skip if element has innerHTML / textContent
	      !(props && (props.innerHTML || props.textContent))) {
	        let next = hydrateChildren(
	          el.firstChild,
	          vnode,
	          el,
	          parentComponent,
	          parentSuspense,
	          slotScopeIds,
	          optimized
	        );
	        while (next) {
	          if (!isMismatchAllowed(el, 1 /* CHILDREN */)) {
	            logMismatchError();
	          }
	          const cur = next;
	          next = next.nextSibling;
	          remove(cur);
	        }
	      } else if (shapeFlag & 8) {
	        let clientText = vnode.children;
	        if (clientText[0] === "\n" && (el.tagName === "PRE" || el.tagName === "TEXTAREA")) {
	          clientText = clientText.slice(1);
	        }
	        if (el.textContent !== clientText) {
	          if (!isMismatchAllowed(el, 0 /* TEXT */)) {
	            logMismatchError();
	          }
	          el.textContent = vnode.children;
	        }
	      }
	      if (props) {
	        if (forcePatch || !optimized || patchFlag & (16 | 32)) {
	          const isCustomElement = el.tagName.includes("-");
	          for (const key in props) {
	            if (forcePatch && (key.endsWith("value") || key === "indeterminate") || shared.isOn(key) && !shared.isReservedProp(key) || // force hydrate v-bind with .prop modifiers
	            key[0] === "." || isCustomElement) {
	              patchProp(el, key, null, props[key], void 0, parentComponent);
	            }
	          }
	        } else if (props.onClick) {
	          patchProp(
	            el,
	            "onClick",
	            null,
	            props.onClick,
	            void 0,
	            parentComponent
	          );
	        } else if (patchFlag & 4 && reactivity.isReactive(props.style)) {
	          for (const key in props.style) props.style[key];
	        }
	      }
	      let vnodeHooks;
	      if (vnodeHooks = props && props.onVnodeBeforeMount) {
	        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
	      }
	      if (dirs) {
	        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
	      }
	      if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) {
	        queueEffectWithSuspense(() => {
	          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
	          needCallTransitionHooks && transition.enter(el);
	          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
	        }, parentSuspense);
	      }
	    }
	    return el.nextSibling;
	  };
	  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
	    optimized = optimized || !!parentVNode.dynamicChildren;
	    const children = parentVNode.children;
	    const l = children.length;
	    for (let i = 0; i < l; i++) {
	      const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
	      const isText = vnode.type === Text;
	      if (node) {
	        if (isText && !optimized) {
	          if (i + 1 < l && normalizeVNode(children[i + 1]).type === Text) {
	            insert(
	              createText(
	                node.data.slice(vnode.children.length)
	              ),
	              container,
	              nextSibling(node)
	            );
	            node.data = vnode.children;
	          }
	        }
	        node = hydrateNode(
	          node,
	          vnode,
	          parentComponent,
	          parentSuspense,
	          slotScopeIds,
	          optimized
	        );
	      } else if (isText && !vnode.children) {
	        insert(vnode.el = createText(""), container);
	      } else {
	        if (!isMismatchAllowed(container, 1 /* CHILDREN */)) {
	          logMismatchError();
	        }
	        patch(
	          null,
	          vnode,
	          container,
	          null,
	          parentComponent,
	          parentSuspense,
	          getContainerType(container),
	          slotScopeIds
	        );
	      }
	    }
	    return node;
	  };
	  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
	    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
	    if (fragmentSlotScopeIds) {
	      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
	    }
	    const container = parentNode(node);
	    const next = hydrateChildren(
	      nextSibling(node),
	      vnode,
	      container,
	      parentComponent,
	      parentSuspense,
	      slotScopeIds,
	      optimized
	    );
	    if (next && isComment(next) && next.data === "]") {
	      return nextSibling(vnode.anchor = next);
	    } else {
	      logMismatchError();
	      insert(vnode.anchor = createComment(`]`), container, next);
	      return next;
	    }
	  };
	  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
	    if (!isMismatchAllowed(node.parentElement, 1 /* CHILDREN */)) {
	      logMismatchError();
	    }
	    vnode.el = null;
	    if (isFragment) {
	      const end = locateClosingAnchor(node);
	      while (true) {
	        const next2 = nextSibling(node);
	        if (next2 && next2 !== end) {
	          remove(next2);
	        } else {
	          break;
	        }
	      }
	    }
	    const next = nextSibling(node);
	    const container = parentNode(node);
	    remove(node);
	    patch(
	      null,
	      vnode,
	      container,
	      next,
	      parentComponent,
	      parentSuspense,
	      getContainerType(container),
	      slotScopeIds
	    );
	    if (parentComponent) {
	      parentComponent.vnode.el = vnode.el;
	      updateHOCHostEl(parentComponent, vnode.el);
	    }
	    return next;
	  };
	  const locateClosingAnchor = (node, open = "[", close = "]") => {
	    let match = 0;
	    while (node) {
	      node = nextSibling(node);
	      if (node && isComment(node)) {
	        if (node.data === open) match++;
	        if (node.data === close) {
	          if (match === 0) {
	            return nextSibling(node);
	          } else {
	            match--;
	          }
	        }
	      }
	    }
	    return node;
	  };
	  const replaceNode = (newNode, oldNode, parentComponent) => {
	    const parentNode2 = oldNode.parentNode;
	    if (parentNode2) {
	      parentNode2.replaceChild(newNode, oldNode);
	    }
	    let parent = parentComponent;
	    while (parent) {
	      if (parent.vnode.el === oldNode) {
	        parent.vnode.el = parent.subTree.el = newNode;
	      }
	      parent = parent.parent;
	    }
	  };
	  const isTemplateNode = (node) => {
	    return node.nodeType === 1 && node.tagName === "TEMPLATE";
	  };
	  return [hydrate, hydrateNode];
	}
	const allowMismatchAttr = "data-allow-mismatch";
	const MismatchTypeString = {
	  [0 /* TEXT */]: "text",
	  [1 /* CHILDREN */]: "children",
	  [2 /* CLASS */]: "class",
	  [3 /* STYLE */]: "style",
	  [4 /* ATTRIBUTE */]: "attribute"
	};
	function isMismatchAllowed(el, allowedType) {
	  if (allowedType === 0 /* TEXT */ || allowedType === 1 /* CHILDREN */) {
	    while (el && !el.hasAttribute(allowMismatchAttr)) {
	      el = el.parentElement;
	    }
	  }
	  const allowedAttr = el && el.getAttribute(allowMismatchAttr);
	  if (allowedAttr == null) {
	    return false;
	  } else if (allowedAttr === "") {
	    return true;
	  } else {
	    const list = allowedAttr.split(",");
	    if (allowedType === 0 /* TEXT */ && list.includes("children")) {
	      return true;
	    }
	    return list.includes(MismatchTypeString[allowedType]);
	  }
	}

	const requestIdleCallback = shared.getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
	const cancelIdleCallback = shared.getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
	const hydrateOnIdle = (timeout = 1e4) => (hydrate) => {
	  const id = requestIdleCallback(hydrate, { timeout });
	  return () => cancelIdleCallback(id);
	};
	function elementIsVisibleInViewport(el) {
	  const { top, left, bottom, right } = el.getBoundingClientRect();
	  const { innerHeight, innerWidth } = window;
	  return (top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight) && (left > 0 && left < innerWidth || right > 0 && right < innerWidth);
	}
	const hydrateOnVisible = (opts) => (hydrate, forEach) => {
	  const ob = new IntersectionObserver((entries) => {
	    for (const e of entries) {
	      if (!e.isIntersecting) continue;
	      ob.disconnect();
	      hydrate();
	      break;
	    }
	  }, opts);
	  forEach((el) => {
	    if (!(el instanceof Element)) return;
	    if (elementIsVisibleInViewport(el)) {
	      hydrate();
	      ob.disconnect();
	      return false;
	    }
	    ob.observe(el);
	  });
	  return () => ob.disconnect();
	};
	const hydrateOnMediaQuery = (query) => (hydrate) => {
	  if (query) {
	    const mql = matchMedia(query);
	    if (mql.matches) {
	      hydrate();
	    } else {
	      mql.addEventListener("change", hydrate, { once: true });
	      return () => mql.removeEventListener("change", hydrate);
	    }
	  }
	};
	const hydrateOnInteraction = (interactions = []) => (hydrate, forEach) => {
	  if (shared.isString(interactions)) interactions = [interactions];
	  let hasHydrated = false;
	  const doHydrate = (e) => {
	    if (!hasHydrated) {
	      hasHydrated = true;
	      teardown();
	      hydrate();
	      e.target.dispatchEvent(new e.constructor(e.type, e));
	    }
	  };
	  const teardown = () => {
	    forEach((el) => {
	      for (const i of interactions) {
	        el.removeEventListener(i, doHydrate);
	      }
	    });
	  };
	  forEach((el) => {
	    for (const i of interactions) {
	      el.addEventListener(i, doHydrate, { once: true });
	    }
	  });
	  return teardown;
	};
	function forEachElement(node, cb) {
	  if (isComment(node) && node.data === "[") {
	    let depth = 1;
	    let next = node.nextSibling;
	    while (next) {
	      if (next.nodeType === 1) {
	        const result = cb(next);
	        if (result === false) {
	          break;
	        }
	      } else if (isComment(next)) {
	        if (next.data === "]") {
	          if (--depth === 0) break;
	        } else if (next.data === "[") {
	          depth++;
	        }
	      }
	      next = next.nextSibling;
	    }
	  } else {
	    cb(node);
	  }
	}

	const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
	/*! #__NO_SIDE_EFFECTS__ */
	// @__NO_SIDE_EFFECTS__
	function defineAsyncComponent(source) {
	  if (shared.isFunction(source)) {
	    source = { loader: source };
	  }
	  const {
	    loader,
	    loadingComponent,
	    errorComponent,
	    delay = 200,
	    hydrate: hydrateStrategy,
	    timeout,
	    // undefined = never times out
	    suspensible = true,
	    onError: userOnError
	  } = source;
	  let pendingRequest = null;
	  let resolvedComp;
	  let retries = 0;
	  const retry = () => {
	    retries++;
	    pendingRequest = null;
	    return load();
	  };
	  const load = () => {
	    let thisRequest;
	    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
	      err = err instanceof Error ? err : new Error(String(err));
	      if (userOnError) {
	        return new Promise((resolve, reject) => {
	          const userRetry = () => resolve(retry());
	          const userFail = () => reject(err);
	          userOnError(err, userRetry, userFail, retries + 1);
	        });
	      } else {
	        throw err;
	      }
	    }).then((comp) => {
	      if (thisRequest !== pendingRequest && pendingRequest) {
	        return pendingRequest;
	      }
	      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
	        comp = comp.default;
	      }
	      resolvedComp = comp;
	      return comp;
	    }));
	  };
	  return defineComponent({
	    name: "AsyncComponentWrapper",
	    __asyncLoader: load,
	    __asyncHydrate(el, instance, hydrate) {
	      let patched = false;
	      (instance.bu || (instance.bu = [])).push(() => patched = true);
	      const performHydrate = () => {
	        if (patched) {
	          return;
	        }
	        hydrate();
	      };
	      const doHydrate = hydrateStrategy ? () => {
	        const teardown = hydrateStrategy(
	          performHydrate,
	          (cb) => forEachElement(el, cb)
	        );
	        if (teardown) {
	          (instance.bum || (instance.bum = [])).push(teardown);
	        }
	      } : performHydrate;
	      if (resolvedComp) {
	        doHydrate();
	      } else {
	        load().then(() => !instance.isUnmounted && doHydrate());
	      }
	    },
	    get __asyncResolved() {
	      return resolvedComp;
	    },
	    setup() {
	      const instance = currentInstance;
	      markAsyncBoundary(instance);
	      if (resolvedComp) {
	        return () => createInnerComp(resolvedComp, instance);
	      }
	      const onError = (err) => {
	        pendingRequest = null;
	        handleError(
	          err,
	          instance,
	          13,
	          !errorComponent
	        );
	      };
	      if (suspensible && instance.suspense || isInSSRComponentSetup) {
	        return load().then((comp) => {
	          return () => createInnerComp(comp, instance);
	        }).catch((err) => {
	          onError(err);
	          return () => errorComponent ? createVNode(errorComponent, {
	            error: err
	          }) : null;
	        });
	      }
	      const loaded = reactivity.ref(false);
	      const error = reactivity.ref();
	      const delayed = reactivity.ref(!!delay);
	      if (delay) {
	        setTimeout(() => {
	          delayed.value = false;
	        }, delay);
	      }
	      if (timeout != null) {
	        setTimeout(() => {
	          if (!loaded.value && !error.value) {
	            const err = new Error(
	              `Async component timed out after ${timeout}ms.`
	            );
	            onError(err);
	            error.value = err;
	          }
	        }, timeout);
	      }
	      load().then(() => {
	        loaded.value = true;
	        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
	          instance.parent.update();
	        }
	      }).catch((err) => {
	        onError(err);
	        error.value = err;
	      });
	      return () => {
	        if (loaded.value && resolvedComp) {
	          return createInnerComp(resolvedComp, instance);
	        } else if (error.value && errorComponent) {
	          return createVNode(errorComponent, {
	            error: error.value
	          });
	        } else if (loadingComponent && !delayed.value) {
	          return createVNode(loadingComponent);
	        }
	      };
	    }
	  });
	}
	function createInnerComp(comp, parent) {
	  const { ref: ref2, props, children, ce } = parent.vnode;
	  const vnode = createVNode(comp, props, children);
	  vnode.ref = ref2;
	  vnode.ce = ce;
	  delete parent.vnode.ce;
	  return vnode;
	}

	const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
	const KeepAliveImpl = {
	  name: `KeepAlive`,
	  // Marker for special handling inside the renderer. We are not using a ===
	  // check directly on KeepAlive in the renderer, because importing it directly
	  // would prevent it from being tree-shaken.
	  __isKeepAlive: true,
	  props: {
	    include: [String, RegExp, Array],
	    exclude: [String, RegExp, Array],
	    max: [String, Number]
	  },
	  setup(props, { slots }) {
	    const instance = getCurrentInstance();
	    const sharedContext = instance.ctx;
	    if (!sharedContext.renderer) {
	      return () => {
	        const children = slots.default && slots.default();
	        return children && children.length === 1 ? children[0] : children;
	      };
	    }
	    const cache = /* @__PURE__ */ new Map();
	    const keys = /* @__PURE__ */ new Set();
	    let current = null;
	    const parentSuspense = instance.suspense;
	    const {
	      renderer: {
	        p: patch,
	        m: move,
	        um: _unmount,
	        o: { createElement }
	      }
	    } = sharedContext;
	    const storageContainer = createElement("div");
	    sharedContext.activate = (vnode, container, anchor, namespace, optimized) => {
	      const instance2 = vnode.component;
	      move(vnode, container, anchor, 0, parentSuspense);
	      patch(
	        instance2.vnode,
	        vnode,
	        container,
	        anchor,
	        instance2,
	        parentSuspense,
	        namespace,
	        vnode.slotScopeIds,
	        optimized
	      );
	      queuePostRenderEffect(() => {
	        instance2.isDeactivated = false;
	        if (instance2.a) {
	          shared.invokeArrayFns(instance2.a);
	        }
	        const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
	        if (vnodeHook) {
	          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
	        }
	      }, parentSuspense);
	    };
	    sharedContext.deactivate = (vnode) => {
	      const instance2 = vnode.component;
	      invalidateMount(instance2.m);
	      invalidateMount(instance2.a);
	      move(vnode, storageContainer, null, 1, parentSuspense);
	      queuePostRenderEffect(() => {
	        if (instance2.da) {
	          shared.invokeArrayFns(instance2.da);
	        }
	        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
	        if (vnodeHook) {
	          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
	        }
	        instance2.isDeactivated = true;
	      }, parentSuspense);
	    };
	    function unmount(vnode) {
	      resetShapeFlag(vnode);
	      _unmount(vnode, instance, parentSuspense, true);
	    }
	    function pruneCache(filter) {
	      cache.forEach((vnode, key) => {
	        const name = getComponentName(vnode.type);
	        if (name && !filter(name)) {
	          pruneCacheEntry(key);
	        }
	      });
	    }
	    function pruneCacheEntry(key) {
	      const cached = cache.get(key);
	      if (cached && (!current || !isSameVNodeType(cached, current))) {
	        unmount(cached);
	      } else if (current) {
	        resetShapeFlag(current);
	      }
	      cache.delete(key);
	      keys.delete(key);
	    }
	    watch(
	      () => [props.include, props.exclude],
	      ([include, exclude]) => {
	        include && pruneCache((name) => matches(include, name));
	        exclude && pruneCache((name) => !matches(exclude, name));
	      },
	      // prune post-render after `current` has been updated
	      { flush: "post", deep: true }
	    );
	    let pendingCacheKey = null;
	    const cacheSubtree = () => {
	      if (pendingCacheKey != null) {
	        if (isSuspense(instance.subTree.type)) {
	          queuePostRenderEffect(() => {
	            cache.set(pendingCacheKey, getInnerChild(instance.subTree));
	          }, instance.subTree.suspense);
	        } else {
	          cache.set(pendingCacheKey, getInnerChild(instance.subTree));
	        }
	      }
	    };
	    onMounted(cacheSubtree);
	    onUpdated(cacheSubtree);
	    onBeforeUnmount(() => {
	      cache.forEach((cached) => {
	        const { subTree, suspense } = instance;
	        const vnode = getInnerChild(subTree);
	        if (cached.type === vnode.type && cached.key === vnode.key) {
	          resetShapeFlag(vnode);
	          const da = vnode.component.da;
	          da && queuePostRenderEffect(da, suspense);
	          return;
	        }
	        unmount(cached);
	      });
	    });
	    return () => {
	      pendingCacheKey = null;
	      if (!slots.default) {
	        return current = null;
	      }
	      const children = slots.default();
	      const rawVNode = children[0];
	      if (children.length > 1) {
	        current = null;
	        return children;
	      } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
	        current = null;
	        return rawVNode;
	      }
	      let vnode = getInnerChild(rawVNode);
	      if (vnode.type === Comment) {
	        current = null;
	        return vnode;
	      }
	      const comp = vnode.type;
	      const name = getComponentName(
	        isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp
	      );
	      const { include, exclude, max } = props;
	      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
	        vnode.shapeFlag &= -257;
	        current = vnode;
	        return rawVNode;
	      }
	      const key = vnode.key == null ? comp : vnode.key;
	      const cachedVNode = cache.get(key);
	      if (vnode.el) {
	        vnode = cloneVNode(vnode);
	        if (rawVNode.shapeFlag & 128) {
	          rawVNode.ssContent = vnode;
	        }
	      }
	      pendingCacheKey = key;
	      if (cachedVNode) {
	        vnode.el = cachedVNode.el;
	        vnode.component = cachedVNode.component;
	        if (vnode.transition) {
	          setTransitionHooks(vnode, vnode.transition);
	        }
	        vnode.shapeFlag |= 512;
	        keys.delete(key);
	        keys.add(key);
	      } else {
	        keys.add(key);
	        if (max && keys.size > parseInt(max, 10)) {
	          pruneCacheEntry(keys.values().next().value);
	        }
	      }
	      vnode.shapeFlag |= 256;
	      current = vnode;
	      return isSuspense(rawVNode.type) ? rawVNode : vnode;
	    };
	  }
	};
	const KeepAlive = KeepAliveImpl;
	function matches(pattern, name) {
	  if (shared.isArray(pattern)) {
	    return pattern.some((p) => matches(p, name));
	  } else if (shared.isString(pattern)) {
	    return pattern.split(",").includes(name);
	  } else if (shared.isRegExp(pattern)) {
	    pattern.lastIndex = 0;
	    return pattern.test(name);
	  }
	  return false;
	}
	function onActivated(hook, target) {
	  registerKeepAliveHook(hook, "a", target);
	}
	function onDeactivated(hook, target) {
	  registerKeepAliveHook(hook, "da", target);
	}
	function registerKeepAliveHook(hook, type, target = currentInstance) {
	  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
	    let current = target;
	    while (current) {
	      if (current.isDeactivated) {
	        return;
	      }
	      current = current.parent;
	    }
	    return hook();
	  });
	  injectHook(type, wrappedHook, target);
	  if (target) {
	    let current = target.parent;
	    while (current && current.parent) {
	      if (isKeepAlive(current.parent.vnode)) {
	        injectToKeepAliveRoot(wrappedHook, type, target, current);
	      }
	      current = current.parent;
	    }
	  }
	}
	function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
	  const injected = injectHook(
	    type,
	    hook,
	    keepAliveRoot,
	    true
	    /* prepend */
	  );
	  onUnmounted(() => {
	    shared.remove(keepAliveRoot[type], injected);
	  }, target);
	}
	function resetShapeFlag(vnode) {
	  vnode.shapeFlag &= -257;
	  vnode.shapeFlag &= -513;
	}
	function getInnerChild(vnode) {
	  return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
	}

	function injectHook(type, hook, target = currentInstance, prepend = false) {
	  if (target) {
	    const hooks = target[type] || (target[type] = []);
	    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
	      reactivity.pauseTracking();
	      const reset = setCurrentInstance(target);
	      const res = callWithAsyncErrorHandling(hook, target, type, args);
	      reset();
	      reactivity.resetTracking();
	      return res;
	    });
	    if (prepend) {
	      hooks.unshift(wrappedHook);
	    } else {
	      hooks.push(wrappedHook);
	    }
	    return wrappedHook;
	  }
	}
	const createHook = (lifecycle) => (hook, target = currentInstance) => {
	  if (!isInSSRComponentSetup || lifecycle === "sp") {
	    injectHook(lifecycle, (...args) => hook(...args), target);
	  }
	};
	const onBeforeMount = createHook("bm");
	const onMounted = createHook("m");
	const onBeforeUpdate = createHook(
	  "bu"
	);
	const onUpdated = createHook("u");
	const onBeforeUnmount = createHook(
	  "bum"
	);
	const onUnmounted = createHook("um");
	const onServerPrefetch = createHook(
	  "sp"
	);
	const onRenderTriggered = createHook("rtg");
	const onRenderTracked = createHook("rtc");
	function onErrorCaptured(hook, target = currentInstance) {
	  injectHook("ec", hook, target);
	}

	const COMPONENTS = "components";
	const DIRECTIVES = "directives";
	function resolveComponent(name, maybeSelfReference) {
	  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
	}
	const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
	function resolveDynamicComponent(component) {
	  if (shared.isString(component)) {
	    return resolveAsset(COMPONENTS, component, false) || component;
	  } else {
	    return component || NULL_DYNAMIC_COMPONENT;
	  }
	}
	function resolveDirective(name) {
	  return resolveAsset(DIRECTIVES, name);
	}
	function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
	  const instance = currentRenderingInstance || currentInstance;
	  if (instance) {
	    const Component = instance.type;
	    if (type === COMPONENTS) {
	      const selfName = getComponentName(
	        Component,
	        false
	      );
	      if (selfName && (selfName === name || selfName === shared.camelize(name) || selfName === shared.capitalize(shared.camelize(name)))) {
	        return Component;
	      }
	    }
	    const res = (
	      // local registration
	      // check instance[type] first which is resolved for options API
	      resolve(instance[type] || Component[type], name) || // global registration
	      resolve(instance.appContext[type], name)
	    );
	    if (!res && maybeSelfReference) {
	      return Component;
	    }
	    return res;
	  }
	}
	function resolve(registry, name) {
	  return registry && (registry[name] || registry[shared.camelize(name)] || registry[shared.capitalize(shared.camelize(name))]);
	}

	function renderList(source, renderItem, cache, index) {
	  let ret;
	  const cached = cache && cache[index];
	  const sourceIsArray = shared.isArray(source);
	  if (sourceIsArray || shared.isString(source)) {
	    const sourceIsReactiveArray = sourceIsArray && reactivity.isReactive(source);
	    let needsWrap = false;
	    let isReadonlySource = false;
	    if (sourceIsReactiveArray) {
	      needsWrap = !reactivity.isShallow(source);
	      isReadonlySource = reactivity.isReadonly(source);
	      source = reactivity.shallowReadArray(source);
	    }
	    ret = new Array(source.length);
	    for (let i = 0, l = source.length; i < l; i++) {
	      ret[i] = renderItem(
	        needsWrap ? isReadonlySource ? reactivity.toReadonly(reactivity.toReactive(source[i])) : reactivity.toReactive(source[i]) : source[i],
	        i,
	        void 0,
	        cached && cached[i]
	      );
	    }
	  } else if (typeof source === "number") {
	    ret = new Array(source);
	    for (let i = 0; i < source; i++) {
	      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
	    }
	  } else if (shared.isObject(source)) {
	    if (source[Symbol.iterator]) {
	      ret = Array.from(
	        source,
	        (item, i) => renderItem(item, i, void 0, cached && cached[i])
	      );
	    } else {
	      const keys = Object.keys(source);
	      ret = new Array(keys.length);
	      for (let i = 0, l = keys.length; i < l; i++) {
	        const key = keys[i];
	        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
	      }
	    }
	  } else {
	    ret = [];
	  }
	  if (cache) {
	    cache[index] = ret;
	  }
	  return ret;
	}

	function createSlots(slots, dynamicSlots) {
	  for (let i = 0; i < dynamicSlots.length; i++) {
	    const slot = dynamicSlots[i];
	    if (shared.isArray(slot)) {
	      for (let j = 0; j < slot.length; j++) {
	        slots[slot[j].name] = slot[j].fn;
	      }
	    } else if (slot) {
	      slots[slot.name] = slot.key ? (...args) => {
	        const res = slot.fn(...args);
	        if (res) res.key = slot.key;
	        return res;
	      } : slot.fn;
	    }
	  }
	  return slots;
	}

	function renderSlot(slots, name, props = {}, fallback, noSlotted) {
	  if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) {
	    if (name !== "default") props.name = name;
	    return openBlock(), createBlock(
	      Fragment,
	      null,
	      [createVNode("slot", props, fallback && fallback())],
	      64
	    );
	  }
	  let slot = slots[name];
	  if (slot && slot._c) {
	    slot._d = false;
	  }
	  openBlock();
	  const validSlotContent = slot && ensureValidVNode(slot(props));
	  const slotKey = props.key || // slot content array of a dynamic conditional slot may have a branch
	  // key attached in the `createSlots` helper, respect that
	  validSlotContent && validSlotContent.key;
	  const rendered = createBlock(
	    Fragment,
	    {
	      key: (slotKey && !shared.isSymbol(slotKey) ? slotKey : `_${name}`) + // #7256 force differentiate fallback content from actual content
	      (!validSlotContent && fallback ? "_fb" : "")
	    },
	    validSlotContent || (fallback ? fallback() : []),
	    validSlotContent && slots._ === 1 ? 64 : -2
	  );
	  if (!noSlotted && rendered.scopeId) {
	    rendered.slotScopeIds = [rendered.scopeId + "-s"];
	  }
	  if (slot && slot._c) {
	    slot._d = true;
	  }
	  return rendered;
	}
	function ensureValidVNode(vnodes) {
	  return vnodes.some((child) => {
	    if (!isVNode(child)) return true;
	    if (child.type === Comment) return false;
	    if (child.type === Fragment && !ensureValidVNode(child.children))
	      return false;
	    return true;
	  }) ? vnodes : null;
	}

	function toHandlers(obj, preserveCaseIfNecessary) {
	  const ret = {};
	  for (const key in obj) {
	    ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : shared.toHandlerKey(key)] = obj[key];
	  }
	  return ret;
	}

	const getPublicInstance = (i) => {
	  if (!i) return null;
	  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
	  return getPublicInstance(i.parent);
	};
	const publicPropertiesMap = (
	  // Move PURE marker to new line to workaround compiler discarding it
	  // due to type annotation
	  /* @__PURE__ */ shared.extend(/* @__PURE__ */ Object.create(null), {
	    $: (i) => i,
	    $el: (i) => i.vnode.el,
	    $data: (i) => i.data,
	    $props: (i) => i.props,
	    $attrs: (i) => i.attrs,
	    $slots: (i) => i.slots,
	    $refs: (i) => i.refs,
	    $parent: (i) => getPublicInstance(i.parent),
	    $root: (i) => getPublicInstance(i.root),
	    $host: (i) => i.ce,
	    $emit: (i) => i.emit,
	    $options: (i) => resolveMergedOptions(i) ,
	    $forceUpdate: (i) => i.f || (i.f = () => {
	      queueJob(i.update);
	    }),
	    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
	    $watch: (i) => instanceWatch.bind(i) 
	  })
	);
	const hasSetupBinding = (state, key) => state !== shared.EMPTY_OBJ && !state.__isScriptSetup && shared.hasOwn(state, key);
	const PublicInstanceProxyHandlers = {
	  get({ _: instance }, key) {
	    if (key === "__v_skip") {
	      return true;
	    }
	    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
	    let normalizedProps;
	    if (key[0] !== "$") {
	      const n = accessCache[key];
	      if (n !== void 0) {
	        switch (n) {
	          case 1 /* SETUP */:
	            return setupState[key];
	          case 2 /* DATA */:
	            return data[key];
	          case 4 /* CONTEXT */:
	            return ctx[key];
	          case 3 /* PROPS */:
	            return props[key];
	        }
	      } else if (hasSetupBinding(setupState, key)) {
	        accessCache[key] = 1 /* SETUP */;
	        return setupState[key];
	      } else if (data !== shared.EMPTY_OBJ && shared.hasOwn(data, key)) {
	        accessCache[key] = 2 /* DATA */;
	        return data[key];
	      } else if (
	        // only cache other properties when instance has declared (thus stable)
	        // props
	        (normalizedProps = instance.propsOptions[0]) && shared.hasOwn(normalizedProps, key)
	      ) {
	        accessCache[key] = 3 /* PROPS */;
	        return props[key];
	      } else if (ctx !== shared.EMPTY_OBJ && shared.hasOwn(ctx, key)) {
	        accessCache[key] = 4 /* CONTEXT */;
	        return ctx[key];
	      } else if (shouldCacheAccess) {
	        accessCache[key] = 0 /* OTHER */;
	      }
	    }
	    const publicGetter = publicPropertiesMap[key];
	    let cssModule, globalProperties;
	    if (publicGetter) {
	      if (key === "$attrs") {
	        reactivity.track(instance.attrs, "get", "");
	      }
	      return publicGetter(instance);
	    } else if (
	      // css module (injected by vue-loader)
	      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
	    ) {
	      return cssModule;
	    } else if (ctx !== shared.EMPTY_OBJ && shared.hasOwn(ctx, key)) {
	      accessCache[key] = 4 /* CONTEXT */;
	      return ctx[key];
	    } else if (
	      // global properties
	      globalProperties = appContext.config.globalProperties, shared.hasOwn(globalProperties, key)
	    ) {
	      {
	        return globalProperties[key];
	      }
	    } else ;
	  },
	  set({ _: instance }, key, value) {
	    const { data, setupState, ctx } = instance;
	    if (hasSetupBinding(setupState, key)) {
	      setupState[key] = value;
	      return true;
	    } else if (data !== shared.EMPTY_OBJ && shared.hasOwn(data, key)) {
	      data[key] = value;
	      return true;
	    } else if (shared.hasOwn(instance.props, key)) {
	      return false;
	    }
	    if (key[0] === "$" && key.slice(1) in instance) {
	      return false;
	    } else {
	      {
	        ctx[key] = value;
	      }
	    }
	    return true;
	  },
	  has({
	    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
	  }, key) {
	    let normalizedProps;
	    return !!accessCache[key] || data !== shared.EMPTY_OBJ && shared.hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && shared.hasOwn(normalizedProps, key) || shared.hasOwn(ctx, key) || shared.hasOwn(publicPropertiesMap, key) || shared.hasOwn(appContext.config.globalProperties, key);
	  },
	  defineProperty(target, key, descriptor) {
	    if (descriptor.get != null) {
	      target._.accessCache[key] = 0;
	    } else if (shared.hasOwn(descriptor, "value")) {
	      this.set(target, key, descriptor.value, null);
	    }
	    return Reflect.defineProperty(target, key, descriptor);
	  }
	};
	const RuntimeCompiledPublicInstanceProxyHandlers = /* @__PURE__ */ shared.extend({}, PublicInstanceProxyHandlers, {
	  get(target, key) {
	    if (key === Symbol.unscopables) {
	      return;
	    }
	    return PublicInstanceProxyHandlers.get(target, key, target);
	  },
	  has(_, key) {
	    const has = key[0] !== "_" && !shared.isGloballyAllowed(key);
	    return has;
	  }
	});

	function defineProps() {
	  return null;
	}
	function defineEmits() {
	  return null;
	}
	function defineExpose(exposed) {
	}
	function defineOptions(options) {
	}
	function defineSlots() {
	  return null;
	}
	function defineModel() {
	}
	function withDefaults(props, defaults) {
	  return null;
	}
	function useSlots() {
	  return getContext().slots;
	}
	function useAttrs() {
	  return getContext().attrs;
	}
	function getContext(calledFunctionName) {
	  const i = getCurrentInstance();
	  return i.setupContext || (i.setupContext = createSetupContext(i));
	}
	function normalizePropsOrEmits(props) {
	  return shared.isArray(props) ? props.reduce(
	    (normalized, p) => (normalized[p] = null, normalized),
	    {}
	  ) : props;
	}
	function mergeDefaults(raw, defaults) {
	  const props = normalizePropsOrEmits(raw);
	  for (const key in defaults) {
	    if (key.startsWith("__skip")) continue;
	    let opt = props[key];
	    if (opt) {
	      if (shared.isArray(opt) || shared.isFunction(opt)) {
	        opt = props[key] = { type: opt, default: defaults[key] };
	      } else {
	        opt.default = defaults[key];
	      }
	    } else if (opt === null) {
	      opt = props[key] = { default: defaults[key] };
	    } else ;
	    if (opt && defaults[`__skip_${key}`]) {
	      opt.skipFactory = true;
	    }
	  }
	  return props;
	}
	function mergeModels(a, b) {
	  if (!a || !b) return a || b;
	  if (shared.isArray(a) && shared.isArray(b)) return a.concat(b);
	  return shared.extend({}, normalizePropsOrEmits(a), normalizePropsOrEmits(b));
	}
	function createPropsRestProxy(props, excludedKeys) {
	  const ret = {};
	  for (const key in props) {
	    if (!excludedKeys.includes(key)) {
	      Object.defineProperty(ret, key, {
	        enumerable: true,
	        get: () => props[key]
	      });
	    }
	  }
	  return ret;
	}
	function withAsyncContext(getAwaitable) {
	  const ctx = getCurrentInstance();
	  let awaitable = getAwaitable();
	  unsetCurrentInstance();
	  if (shared.isPromise(awaitable)) {
	    awaitable = awaitable.catch((e) => {
	      setCurrentInstance(ctx);
	      throw e;
	    });
	  }
	  return [awaitable, () => setCurrentInstance(ctx)];
	}

	let shouldCacheAccess = true;
	function applyOptions(instance) {
	  const options = resolveMergedOptions(instance);
	  const publicThis = instance.proxy;
	  const ctx = instance.ctx;
	  shouldCacheAccess = false;
	  if (options.beforeCreate) {
	    callHook(options.beforeCreate, instance, "bc");
	  }
	  const {
	    // state
	    data: dataOptions,
	    computed: computedOptions,
	    methods,
	    watch: watchOptions,
	    provide: provideOptions,
	    inject: injectOptions,
	    // lifecycle
	    created,
	    beforeMount,
	    mounted,
	    beforeUpdate,
	    updated,
	    activated,
	    deactivated,
	    beforeDestroy,
	    beforeUnmount,
	    destroyed,
	    unmounted,
	    render,
	    renderTracked,
	    renderTriggered,
	    errorCaptured,
	    serverPrefetch,
	    // public API
	    expose,
	    inheritAttrs,
	    // assets
	    components,
	    directives,
	    filters
	  } = options;
	  const checkDuplicateProperties = null;
	  if (injectOptions) {
	    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
	  }
	  if (methods) {
	    for (const key in methods) {
	      const methodHandler = methods[key];
	      if (shared.isFunction(methodHandler)) {
	        {
	          ctx[key] = methodHandler.bind(publicThis);
	        }
	      }
	    }
	  }
	  if (dataOptions) {
	    const data = dataOptions.call(publicThis, publicThis);
	    if (!shared.isObject(data)) ; else {
	      instance.data = reactivity.reactive(data);
	    }
	  }
	  shouldCacheAccess = true;
	  if (computedOptions) {
	    for (const key in computedOptions) {
	      const opt = computedOptions[key];
	      const get = shared.isFunction(opt) ? opt.bind(publicThis, publicThis) : shared.isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : shared.NOOP;
	      const set = !shared.isFunction(opt) && shared.isFunction(opt.set) ? opt.set.bind(publicThis) : shared.NOOP;
	      const c = computed({
	        get,
	        set
	      });
	      Object.defineProperty(ctx, key, {
	        enumerable: true,
	        configurable: true,
	        get: () => c.value,
	        set: (v) => c.value = v
	      });
	    }
	  }
	  if (watchOptions) {
	    for (const key in watchOptions) {
	      createWatcher(watchOptions[key], ctx, publicThis, key);
	    }
	  }
	  if (provideOptions) {
	    const provides = shared.isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
	    Reflect.ownKeys(provides).forEach((key) => {
	      provide(key, provides[key]);
	    });
	  }
	  if (created) {
	    callHook(created, instance, "c");
	  }
	  function registerLifecycleHook(register, hook) {
	    if (shared.isArray(hook)) {
	      hook.forEach((_hook) => register(_hook.bind(publicThis)));
	    } else if (hook) {
	      register(hook.bind(publicThis));
	    }
	  }
	  registerLifecycleHook(onBeforeMount, beforeMount);
	  registerLifecycleHook(onMounted, mounted);
	  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
	  registerLifecycleHook(onUpdated, updated);
	  registerLifecycleHook(onActivated, activated);
	  registerLifecycleHook(onDeactivated, deactivated);
	  registerLifecycleHook(onErrorCaptured, errorCaptured);
	  registerLifecycleHook(onRenderTracked, renderTracked);
	  registerLifecycleHook(onRenderTriggered, renderTriggered);
	  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
	  registerLifecycleHook(onUnmounted, unmounted);
	  registerLifecycleHook(onServerPrefetch, serverPrefetch);
	  if (shared.isArray(expose)) {
	    if (expose.length) {
	      const exposed = instance.exposed || (instance.exposed = {});
	      expose.forEach((key) => {
	        Object.defineProperty(exposed, key, {
	          get: () => publicThis[key],
	          set: (val) => publicThis[key] = val,
	          enumerable: true
	        });
	      });
	    } else if (!instance.exposed) {
	      instance.exposed = {};
	    }
	  }
	  if (render && instance.render === shared.NOOP) {
	    instance.render = render;
	  }
	  if (inheritAttrs != null) {
	    instance.inheritAttrs = inheritAttrs;
	  }
	  if (components) instance.components = components;
	  if (directives) instance.directives = directives;
	  if (serverPrefetch) {
	    markAsyncBoundary(instance);
	  }
	}
	function resolveInjections(injectOptions, ctx, checkDuplicateProperties = shared.NOOP) {
	  if (shared.isArray(injectOptions)) {
	    injectOptions = normalizeInject(injectOptions);
	  }
	  for (const key in injectOptions) {
	    const opt = injectOptions[key];
	    let injected;
	    if (shared.isObject(opt)) {
	      if ("default" in opt) {
	        injected = inject(
	          opt.from || key,
	          opt.default,
	          true
	        );
	      } else {
	        injected = inject(opt.from || key);
	      }
	    } else {
	      injected = inject(opt);
	    }
	    if (reactivity.isRef(injected)) {
	      Object.defineProperty(ctx, key, {
	        enumerable: true,
	        configurable: true,
	        get: () => injected.value,
	        set: (v) => injected.value = v
	      });
	    } else {
	      ctx[key] = injected;
	    }
	  }
	}
	function callHook(hook, instance, type) {
	  callWithAsyncErrorHandling(
	    shared.isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy),
	    instance,
	    type
	  );
	}
	function createWatcher(raw, ctx, publicThis, key) {
	  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
	  if (shared.isString(raw)) {
	    const handler = ctx[raw];
	    if (shared.isFunction(handler)) {
	      {
	        watch(getter, handler);
	      }
	    }
	  } else if (shared.isFunction(raw)) {
	    {
	      watch(getter, raw.bind(publicThis));
	    }
	  } else if (shared.isObject(raw)) {
	    if (shared.isArray(raw)) {
	      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
	    } else {
	      const handler = shared.isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
	      if (shared.isFunction(handler)) {
	        watch(getter, handler, raw);
	      }
	    }
	  } else ;
	}
	function resolveMergedOptions(instance) {
	  const base = instance.type;
	  const { mixins, extends: extendsOptions } = base;
	  const {
	    mixins: globalMixins,
	    optionsCache: cache,
	    config: { optionMergeStrategies }
	  } = instance.appContext;
	  const cached = cache.get(base);
	  let resolved;
	  if (cached) {
	    resolved = cached;
	  } else if (!globalMixins.length && !mixins && !extendsOptions) {
	    {
	      resolved = base;
	    }
	  } else {
	    resolved = {};
	    if (globalMixins.length) {
	      globalMixins.forEach(
	        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
	      );
	    }
	    mergeOptions(resolved, base, optionMergeStrategies);
	  }
	  if (shared.isObject(base)) {
	    cache.set(base, resolved);
	  }
	  return resolved;
	}
	function mergeOptions(to, from, strats, asMixin = false) {
	  const { mixins, extends: extendsOptions } = from;
	  if (extendsOptions) {
	    mergeOptions(to, extendsOptions, strats, true);
	  }
	  if (mixins) {
	    mixins.forEach(
	      (m) => mergeOptions(to, m, strats, true)
	    );
	  }
	  for (const key in from) {
	    if (asMixin && key === "expose") ; else {
	      const strat = internalOptionMergeStrats[key] || strats && strats[key];
	      to[key] = strat ? strat(to[key], from[key]) : from[key];
	    }
	  }
	  return to;
	}
	const internalOptionMergeStrats = {
	  data: mergeDataFn,
	  props: mergeEmitsOrPropsOptions,
	  emits: mergeEmitsOrPropsOptions,
	  // objects
	  methods: mergeObjectOptions,
	  computed: mergeObjectOptions,
	  // lifecycle
	  beforeCreate: mergeAsArray,
	  created: mergeAsArray,
	  beforeMount: mergeAsArray,
	  mounted: mergeAsArray,
	  beforeUpdate: mergeAsArray,
	  updated: mergeAsArray,
	  beforeDestroy: mergeAsArray,
	  beforeUnmount: mergeAsArray,
	  destroyed: mergeAsArray,
	  unmounted: mergeAsArray,
	  activated: mergeAsArray,
	  deactivated: mergeAsArray,
	  errorCaptured: mergeAsArray,
	  serverPrefetch: mergeAsArray,
	  // assets
	  components: mergeObjectOptions,
	  directives: mergeObjectOptions,
	  // watch
	  watch: mergeWatchOptions,
	  // provide / inject
	  provide: mergeDataFn,
	  inject: mergeInject
	};
	function mergeDataFn(to, from) {
	  if (!from) {
	    return to;
	  }
	  if (!to) {
	    return from;
	  }
	  return function mergedDataFn() {
	    return (shared.extend)(
	      shared.isFunction(to) ? to.call(this, this) : to,
	      shared.isFunction(from) ? from.call(this, this) : from
	    );
	  };
	}
	function mergeInject(to, from) {
	  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
	}
	function normalizeInject(raw) {
	  if (shared.isArray(raw)) {
	    const res = {};
	    for (let i = 0; i < raw.length; i++) {
	      res[raw[i]] = raw[i];
	    }
	    return res;
	  }
	  return raw;
	}
	function mergeAsArray(to, from) {
	  return to ? [...new Set([].concat(to, from))] : from;
	}
	function mergeObjectOptions(to, from) {
	  return to ? shared.extend(/* @__PURE__ */ Object.create(null), to, from) : from;
	}
	function mergeEmitsOrPropsOptions(to, from) {
	  if (to) {
	    if (shared.isArray(to) && shared.isArray(from)) {
	      return [.../* @__PURE__ */ new Set([...to, ...from])];
	    }
	    return shared.extend(
	      /* @__PURE__ */ Object.create(null),
	      normalizePropsOrEmits(to),
	      normalizePropsOrEmits(from != null ? from : {})
	    );
	  } else {
	    return from;
	  }
	}
	function mergeWatchOptions(to, from) {
	  if (!to) return from;
	  if (!from) return to;
	  const merged = shared.extend(/* @__PURE__ */ Object.create(null), to);
	  for (const key in from) {
	    merged[key] = mergeAsArray(to[key], from[key]);
	  }
	  return merged;
	}

	function createAppContext() {
	  return {
	    app: null,
	    config: {
	      isNativeTag: shared.NO,
	      performance: false,
	      globalProperties: {},
	      optionMergeStrategies: {},
	      errorHandler: void 0,
	      warnHandler: void 0,
	      compilerOptions: {}
	    },
	    mixins: [],
	    components: {},
	    directives: {},
	    provides: /* @__PURE__ */ Object.create(null),
	    optionsCache: /* @__PURE__ */ new WeakMap(),
	    propsCache: /* @__PURE__ */ new WeakMap(),
	    emitsCache: /* @__PURE__ */ new WeakMap()
	  };
	}
	let uid$1 = 0;
	function createAppAPI(render, hydrate) {
	  return function createApp(rootComponent, rootProps = null) {
	    if (!shared.isFunction(rootComponent)) {
	      rootComponent = shared.extend({}, rootComponent);
	    }
	    if (rootProps != null && !shared.isObject(rootProps)) {
	      rootProps = null;
	    }
	    const context = createAppContext();
	    const installedPlugins = /* @__PURE__ */ new WeakSet();
	    const pluginCleanupFns = [];
	    let isMounted = false;
	    const app = context.app = {
	      _uid: uid$1++,
	      _component: rootComponent,
	      _props: rootProps,
	      _container: null,
	      _context: context,
	      _instance: null,
	      version,
	      get config() {
	        return context.config;
	      },
	      set config(v) {
	      },
	      use(plugin, ...options) {
	        if (installedPlugins.has(plugin)) ; else if (plugin && shared.isFunction(plugin.install)) {
	          installedPlugins.add(plugin);
	          plugin.install(app, ...options);
	        } else if (shared.isFunction(plugin)) {
	          installedPlugins.add(plugin);
	          plugin(app, ...options);
	        } else ;
	        return app;
	      },
	      mixin(mixin) {
	        {
	          if (!context.mixins.includes(mixin)) {
	            context.mixins.push(mixin);
	          }
	        }
	        return app;
	      },
	      component(name, component) {
	        if (!component) {
	          return context.components[name];
	        }
	        context.components[name] = component;
	        return app;
	      },
	      directive(name, directive) {
	        if (!directive) {
	          return context.directives[name];
	        }
	        context.directives[name] = directive;
	        return app;
	      },
	      mount(rootContainer, isHydrate, namespace) {
	        if (!isMounted) {
	          const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
	          vnode.appContext = context;
	          if (namespace === true) {
	            namespace = "svg";
	          } else if (namespace === false) {
	            namespace = void 0;
	          }
	          if (isHydrate && hydrate) {
	            hydrate(vnode, rootContainer);
	          } else {
	            render(vnode, rootContainer, namespace);
	          }
	          isMounted = true;
	          app._container = rootContainer;
	          rootContainer.__vue_app__ = app;
	          return getComponentPublicInstance(vnode.component);
	        }
	      },
	      onUnmount(cleanupFn) {
	        pluginCleanupFns.push(cleanupFn);
	      },
	      unmount() {
	        if (isMounted) {
	          callWithAsyncErrorHandling(
	            pluginCleanupFns,
	            app._instance,
	            16
	          );
	          render(null, app._container);
	          delete app._container.__vue_app__;
	        }
	      },
	      provide(key, value) {
	        context.provides[key] = value;
	        return app;
	      },
	      runWithContext(fn) {
	        const lastApp = currentApp;
	        currentApp = app;
	        try {
	          return fn();
	        } finally {
	          currentApp = lastApp;
	        }
	      }
	    };
	    return app;
	  };
	}
	let currentApp = null;

	function provide(key, value) {
	  if (!currentInstance) ; else {
	    let provides = currentInstance.provides;
	    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
	    if (parentProvides === provides) {
	      provides = currentInstance.provides = Object.create(parentProvides);
	    }
	    provides[key] = value;
	  }
	}
	function inject(key, defaultValue, treatDefaultAsFactory = false) {
	  const instance = getCurrentInstance();
	  if (instance || currentApp) {
	    let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
	    if (provides && key in provides) {
	      return provides[key];
	    } else if (arguments.length > 1) {
	      return treatDefaultAsFactory && shared.isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
	    } else ;
	  }
	}
	function hasInjectionContext() {
	  return !!(getCurrentInstance() || currentApp);
	}

	const internalObjectProto = {};
	const createInternalObject = () => Object.create(internalObjectProto);
	const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;

	function initProps(instance, rawProps, isStateful, isSSR = false) {
	  const props = {};
	  const attrs = createInternalObject();
	  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
	  setFullProps(instance, rawProps, props, attrs);
	  for (const key in instance.propsOptions[0]) {
	    if (!(key in props)) {
	      props[key] = void 0;
	    }
	  }
	  if (isStateful) {
	    instance.props = isSSR ? props : reactivity.shallowReactive(props);
	  } else {
	    if (!instance.type.props) {
	      instance.props = attrs;
	    } else {
	      instance.props = props;
	    }
	  }
	  instance.attrs = attrs;
	}
	function updateProps(instance, rawProps, rawPrevProps, optimized) {
	  const {
	    props,
	    attrs,
	    vnode: { patchFlag }
	  } = instance;
	  const rawCurrentProps = reactivity.toRaw(props);
	  const [options] = instance.propsOptions;
	  let hasAttrsChanged = false;
	  if (
	    // always force full diff in dev
	    // - #1942 if hmr is enabled with sfc component
	    // - vite#872 non-sfc component used by sfc component
	    (optimized || patchFlag > 0) && !(patchFlag & 16)
	  ) {
	    if (patchFlag & 8) {
	      const propsToUpdate = instance.vnode.dynamicProps;
	      for (let i = 0; i < propsToUpdate.length; i++) {
	        let key = propsToUpdate[i];
	        if (isEmitListener(instance.emitsOptions, key)) {
	          continue;
	        }
	        const value = rawProps[key];
	        if (options) {
	          if (shared.hasOwn(attrs, key)) {
	            if (value !== attrs[key]) {
	              attrs[key] = value;
	              hasAttrsChanged = true;
	            }
	          } else {
	            const camelizedKey = shared.camelize(key);
	            props[camelizedKey] = resolvePropValue(
	              options,
	              rawCurrentProps,
	              camelizedKey,
	              value,
	              instance,
	              false
	            );
	          }
	        } else {
	          if (value !== attrs[key]) {
	            attrs[key] = value;
	            hasAttrsChanged = true;
	          }
	        }
	      }
	    }
	  } else {
	    if (setFullProps(instance, rawProps, props, attrs)) {
	      hasAttrsChanged = true;
	    }
	    let kebabKey;
	    for (const key in rawCurrentProps) {
	      if (!rawProps || // for camelCase
	      !shared.hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
	      // and converted to camelCase (#955)
	      ((kebabKey = shared.hyphenate(key)) === key || !shared.hasOwn(rawProps, kebabKey))) {
	        if (options) {
	          if (rawPrevProps && // for camelCase
	          (rawPrevProps[key] !== void 0 || // for kebab-case
	          rawPrevProps[kebabKey] !== void 0)) {
	            props[key] = resolvePropValue(
	              options,
	              rawCurrentProps,
	              key,
	              void 0,
	              instance,
	              true
	            );
	          }
	        } else {
	          delete props[key];
	        }
	      }
	    }
	    if (attrs !== rawCurrentProps) {
	      for (const key in attrs) {
	        if (!rawProps || !shared.hasOwn(rawProps, key) && true) {
	          delete attrs[key];
	          hasAttrsChanged = true;
	        }
	      }
	    }
	  }
	  if (hasAttrsChanged) {
	    reactivity.trigger(instance.attrs, "set", "");
	  }
	}
	function setFullProps(instance, rawProps, props, attrs) {
	  const [options, needCastKeys] = instance.propsOptions;
	  let hasAttrsChanged = false;
	  let rawCastValues;
	  if (rawProps) {
	    for (let key in rawProps) {
	      if (shared.isReservedProp(key)) {
	        continue;
	      }
	      const value = rawProps[key];
	      let camelKey;
	      if (options && shared.hasOwn(options, camelKey = shared.camelize(key))) {
	        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
	          props[camelKey] = value;
	        } else {
	          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
	        }
	      } else if (!isEmitListener(instance.emitsOptions, key)) {
	        if (!(key in attrs) || value !== attrs[key]) {
	          attrs[key] = value;
	          hasAttrsChanged = true;
	        }
	      }
	    }
	  }
	  if (needCastKeys) {
	    const rawCurrentProps = reactivity.toRaw(props);
	    const castValues = rawCastValues || shared.EMPTY_OBJ;
	    for (let i = 0; i < needCastKeys.length; i++) {
	      const key = needCastKeys[i];
	      props[key] = resolvePropValue(
	        options,
	        rawCurrentProps,
	        key,
	        castValues[key],
	        instance,
	        !shared.hasOwn(castValues, key)
	      );
	    }
	  }
	  return hasAttrsChanged;
	}
	function resolvePropValue(options, props, key, value, instance, isAbsent) {
	  const opt = options[key];
	  if (opt != null) {
	    const hasDefault = shared.hasOwn(opt, "default");
	    if (hasDefault && value === void 0) {
	      const defaultValue = opt.default;
	      if (opt.type !== Function && !opt.skipFactory && shared.isFunction(defaultValue)) {
	        const { propsDefaults } = instance;
	        if (key in propsDefaults) {
	          value = propsDefaults[key];
	        } else {
	          const reset = setCurrentInstance(instance);
	          value = propsDefaults[key] = defaultValue.call(
	            null,
	            props
	          );
	          reset();
	        }
	      } else {
	        value = defaultValue;
	      }
	      if (instance.ce) {
	        instance.ce._setProp(key, value);
	      }
	    }
	    if (opt[0 /* shouldCast */]) {
	      if (isAbsent && !hasDefault) {
	        value = false;
	      } else if (opt[1 /* shouldCastTrue */] && (value === "" || value === shared.hyphenate(key))) {
	        value = true;
	      }
	    }
	  }
	  return value;
	}
	const mixinPropsCache = /* @__PURE__ */ new WeakMap();
	function normalizePropsOptions(comp, appContext, asMixin = false) {
	  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
	  const cached = cache.get(comp);
	  if (cached) {
	    return cached;
	  }
	  const raw = comp.props;
	  const normalized = {};
	  const needCastKeys = [];
	  let hasExtends = false;
	  if (!shared.isFunction(comp)) {
	    const extendProps = (raw2) => {
	      hasExtends = true;
	      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
	      shared.extend(normalized, props);
	      if (keys) needCastKeys.push(...keys);
	    };
	    if (!asMixin && appContext.mixins.length) {
	      appContext.mixins.forEach(extendProps);
	    }
	    if (comp.extends) {
	      extendProps(comp.extends);
	    }
	    if (comp.mixins) {
	      comp.mixins.forEach(extendProps);
	    }
	  }
	  if (!raw && !hasExtends) {
	    if (shared.isObject(comp)) {
	      cache.set(comp, shared.EMPTY_ARR);
	    }
	    return shared.EMPTY_ARR;
	  }
	  if (shared.isArray(raw)) {
	    for (let i = 0; i < raw.length; i++) {
	      const normalizedKey = shared.camelize(raw[i]);
	      if (validatePropName(normalizedKey)) {
	        normalized[normalizedKey] = shared.EMPTY_OBJ;
	      }
	    }
	  } else if (raw) {
	    for (const key in raw) {
	      const normalizedKey = shared.camelize(key);
	      if (validatePropName(normalizedKey)) {
	        const opt = raw[key];
	        const prop = normalized[normalizedKey] = shared.isArray(opt) || shared.isFunction(opt) ? { type: opt } : shared.extend({}, opt);
	        const propType = prop.type;
	        let shouldCast = false;
	        let shouldCastTrue = true;
	        if (shared.isArray(propType)) {
	          for (let index = 0; index < propType.length; ++index) {
	            const type = propType[index];
	            const typeName = shared.isFunction(type) && type.name;
	            if (typeName === "Boolean") {
	              shouldCast = true;
	              break;
	            } else if (typeName === "String") {
	              shouldCastTrue = false;
	            }
	          }
	        } else {
	          shouldCast = shared.isFunction(propType) && propType.name === "Boolean";
	        }
	        prop[0 /* shouldCast */] = shouldCast;
	        prop[1 /* shouldCastTrue */] = shouldCastTrue;
	        if (shouldCast || shared.hasOwn(prop, "default")) {
	          needCastKeys.push(normalizedKey);
	        }
	      }
	    }
	  }
	  const res = [normalized, needCastKeys];
	  if (shared.isObject(comp)) {
	    cache.set(comp, res);
	  }
	  return res;
	}
	function validatePropName(key) {
	  if (key[0] !== "$" && !shared.isReservedProp(key)) {
	    return true;
	  }
	  return false;
	}

	const isInternalKey = (key) => key === "_" || key === "__" || key === "_ctx" || key === "$stable";
	const normalizeSlotValue = (value) => shared.isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
	const normalizeSlot = (key, rawSlot, ctx) => {
	  if (rawSlot._n) {
	    return rawSlot;
	  }
	  const normalized = withCtx((...args) => {
	    if (false) ;
	    return normalizeSlotValue(rawSlot(...args));
	  }, ctx);
	  normalized._c = false;
	  return normalized;
	};
	const normalizeObjectSlots = (rawSlots, slots, instance) => {
	  const ctx = rawSlots._ctx;
	  for (const key in rawSlots) {
	    if (isInternalKey(key)) continue;
	    const value = rawSlots[key];
	    if (shared.isFunction(value)) {
	      slots[key] = normalizeSlot(key, value, ctx);
	    } else if (value != null) {
	      const normalized = normalizeSlotValue(value);
	      slots[key] = () => normalized;
	    }
	  }
	};
	const normalizeVNodeSlots = (instance, children) => {
	  const normalized = normalizeSlotValue(children);
	  instance.slots.default = () => normalized;
	};
	const assignSlots = (slots, children, optimized) => {
	  for (const key in children) {
	    if (optimized || !isInternalKey(key)) {
	      slots[key] = children[key];
	    }
	  }
	};
	const initSlots = (instance, children, optimized) => {
	  const slots = instance.slots = createInternalObject();
	  if (instance.vnode.shapeFlag & 32) {
	    const cacheIndexes = children.__;
	    if (cacheIndexes) shared.def(slots, "__", cacheIndexes, true);
	    const type = children._;
	    if (type) {
	      assignSlots(slots, children, optimized);
	      if (optimized) {
	        shared.def(slots, "_", type, true);
	      }
	    } else {
	      normalizeObjectSlots(children, slots);
	    }
	  } else if (children) {
	    normalizeVNodeSlots(instance, children);
	  }
	};
	const updateSlots = (instance, children, optimized) => {
	  const { vnode, slots } = instance;
	  let needDeletionCheck = true;
	  let deletionComparisonTarget = shared.EMPTY_OBJ;
	  if (vnode.shapeFlag & 32) {
	    const type = children._;
	    if (type) {
	      if (optimized && type === 1) {
	        needDeletionCheck = false;
	      } else {
	        assignSlots(slots, children, optimized);
	      }
	    } else {
	      needDeletionCheck = !children.$stable;
	      normalizeObjectSlots(children, slots);
	    }
	    deletionComparisonTarget = children;
	  } else if (children) {
	    normalizeVNodeSlots(instance, children);
	    deletionComparisonTarget = { default: 1 };
	  }
	  if (needDeletionCheck) {
	    for (const key in slots) {
	      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
	        delete slots[key];
	      }
	    }
	  }
	};

	const queuePostRenderEffect = queueEffectWithSuspense ;
	function createRenderer(options) {
	  return baseCreateRenderer(options);
	}
	function createHydrationRenderer(options) {
	  return baseCreateRenderer(options, createHydrationFunctions);
	}
	function baseCreateRenderer(options, createHydrationFns) {
	  const target = shared.getGlobalThis();
	  target.__VUE__ = true;
	  const {
	    insert: hostInsert,
	    remove: hostRemove,
	    patchProp: hostPatchProp,
	    createElement: hostCreateElement,
	    createText: hostCreateText,
	    createComment: hostCreateComment,
	    setText: hostSetText,
	    setElementText: hostSetElementText,
	    parentNode: hostParentNode,
	    nextSibling: hostNextSibling,
	    setScopeId: hostSetScopeId = shared.NOOP,
	    insertStaticContent: hostInsertStaticContent
	  } = options;
	  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
	    if (n1 === n2) {
	      return;
	    }
	    if (n1 && !isSameVNodeType(n1, n2)) {
	      anchor = getNextHostNode(n1);
	      unmount(n1, parentComponent, parentSuspense, true);
	      n1 = null;
	    }
	    if (n2.patchFlag === -2) {
	      optimized = false;
	      n2.dynamicChildren = null;
	    }
	    const { type, ref, shapeFlag } = n2;
	    switch (type) {
	      case Text:
	        processText(n1, n2, container, anchor);
	        break;
	      case Comment:
	        processCommentNode(n1, n2, container, anchor);
	        break;
	      case Static:
	        if (n1 == null) {
	          mountStaticNode(n2, container, anchor, namespace);
	        }
	        break;
	      case Fragment:
	        processFragment(
	          n1,
	          n2,
	          container,
	          anchor,
	          parentComponent,
	          parentSuspense,
	          namespace,
	          slotScopeIds,
	          optimized
	        );
	        break;
	      default:
	        if (shapeFlag & 1) {
	          processElement(
	            n1,
	            n2,
	            container,
	            anchor,
	            parentComponent,
	            parentSuspense,
	            namespace,
	            slotScopeIds,
	            optimized
	          );
	        } else if (shapeFlag & 6) {
	          processComponent(
	            n1,
	            n2,
	            container,
	            anchor,
	            parentComponent,
	            parentSuspense,
	            namespace,
	            slotScopeIds,
	            optimized
	          );
	        } else if (shapeFlag & 64) {
	          type.process(
	            n1,
	            n2,
	            container,
	            anchor,
	            parentComponent,
	            parentSuspense,
	            namespace,
	            slotScopeIds,
	            optimized,
	            internals
	          );
	        } else if (shapeFlag & 128) {
	          type.process(
	            n1,
	            n2,
	            container,
	            anchor,
	            parentComponent,
	            parentSuspense,
	            namespace,
	            slotScopeIds,
	            optimized,
	            internals
	          );
	        } else ;
	    }
	    if (ref != null && parentComponent) {
	      setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
	    } else if (ref == null && n1 && n1.ref != null) {
	      setRef(n1.ref, null, parentSuspense, n1, true);
	    }
	  };
	  const processText = (n1, n2, container, anchor) => {
	    if (n1 == null) {
	      hostInsert(
	        n2.el = hostCreateText(n2.children),
	        container,
	        anchor
	      );
	    } else {
	      const el = n2.el = n1.el;
	      if (n2.children !== n1.children) {
	        hostSetText(el, n2.children);
	      }
	    }
	  };
	  const processCommentNode = (n1, n2, container, anchor) => {
	    if (n1 == null) {
	      hostInsert(
	        n2.el = hostCreateComment(n2.children || ""),
	        container,
	        anchor
	      );
	    } else {
	      n2.el = n1.el;
	    }
	  };
	  const mountStaticNode = (n2, container, anchor, namespace) => {
	    [n2.el, n2.anchor] = hostInsertStaticContent(
	      n2.children,
	      container,
	      anchor,
	      namespace,
	      n2.el,
	      n2.anchor
	    );
	  };
	  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
	    let next;
	    while (el && el !== anchor) {
	      next = hostNextSibling(el);
	      hostInsert(el, container, nextSibling);
	      el = next;
	    }
	    hostInsert(anchor, container, nextSibling);
	  };
	  const removeStaticNode = ({ el, anchor }) => {
	    let next;
	    while (el && el !== anchor) {
	      next = hostNextSibling(el);
	      hostRemove(el);
	      el = next;
	    }
	    hostRemove(anchor);
	  };
	  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
	    if (n2.type === "svg") {
	      namespace = "svg";
	    } else if (n2.type === "math") {
	      namespace = "mathml";
	    }
	    if (n1 == null) {
	      mountElement(
	        n2,
	        container,
	        anchor,
	        parentComponent,
	        parentSuspense,
	        namespace,
	        slotScopeIds,
	        optimized
	      );
	    } else {
	      patchElement(
	        n1,
	        n2,
	        parentComponent,
	        parentSuspense,
	        namespace,
	        slotScopeIds,
	        optimized
	      );
	    }
	  };
	  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
	    let el;
	    let vnodeHook;
	    const { props, shapeFlag, transition, dirs } = vnode;
	    el = vnode.el = hostCreateElement(
	      vnode.type,
	      namespace,
	      props && props.is,
	      props
	    );
	    if (shapeFlag & 8) {
	      hostSetElementText(el, vnode.children);
	    } else if (shapeFlag & 16) {
	      mountChildren(
	        vnode.children,
	        el,
	        null,
	        parentComponent,
	        parentSuspense,
	        resolveChildrenNamespace(vnode, namespace),
	        slotScopeIds,
	        optimized
	      );
	    }
	    if (dirs) {
	      invokeDirectiveHook(vnode, null, parentComponent, "created");
	    }
	    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
	    if (props) {
	      for (const key in props) {
	        if (key !== "value" && !shared.isReservedProp(key)) {
	          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
	        }
	      }
	      if ("value" in props) {
	        hostPatchProp(el, "value", null, props.value, namespace);
	      }
	      if (vnodeHook = props.onVnodeBeforeMount) {
	        invokeVNodeHook(vnodeHook, parentComponent, vnode);
	      }
	    }
	    if (dirs) {
	      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
	    }
	    const needCallTransitionHooks = needTransition(parentSuspense, transition);
	    if (needCallTransitionHooks) {
	      transition.beforeEnter(el);
	    }
	    hostInsert(el, container, anchor);
	    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
	      queuePostRenderEffect(() => {
	        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
	        needCallTransitionHooks && transition.enter(el);
	        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
	      }, parentSuspense);
	    }
	  };
	  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
	    if (scopeId) {
	      hostSetScopeId(el, scopeId);
	    }
	    if (slotScopeIds) {
	      for (let i = 0; i < slotScopeIds.length; i++) {
	        hostSetScopeId(el, slotScopeIds[i]);
	      }
	    }
	    if (parentComponent) {
	      let subTree = parentComponent.subTree;
	      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
	        const parentVNode = parentComponent.vnode;
	        setScopeId(
	          el,
	          parentVNode,
	          parentVNode.scopeId,
	          parentVNode.slotScopeIds,
	          parentComponent.parent
	        );
	      }
	    }
	  };
	  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
	    for (let i = start; i < children.length; i++) {
	      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
	      patch(
	        null,
	        child,
	        container,
	        anchor,
	        parentComponent,
	        parentSuspense,
	        namespace,
	        slotScopeIds,
	        optimized
	      );
	    }
	  };
	  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
	    const el = n2.el = n1.el;
	    let { patchFlag, dynamicChildren, dirs } = n2;
	    patchFlag |= n1.patchFlag & 16;
	    const oldProps = n1.props || shared.EMPTY_OBJ;
	    const newProps = n2.props || shared.EMPTY_OBJ;
	    let vnodeHook;
	    parentComponent && toggleRecurse(parentComponent, false);
	    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
	      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
	    }
	    if (dirs) {
	      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
	    }
	    parentComponent && toggleRecurse(parentComponent, true);
	    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
	      hostSetElementText(el, "");
	    }
	    if (dynamicChildren) {
	      patchBlockChildren(
	        n1.dynamicChildren,
	        dynamicChildren,
	        el,
	        parentComponent,
	        parentSuspense,
	        resolveChildrenNamespace(n2, namespace),
	        slotScopeIds
	      );
	    } else if (!optimized) {
	      patchChildren(
	        n1,
	        n2,
	        el,
	        null,
	        parentComponent,
	        parentSuspense,
	        resolveChildrenNamespace(n2, namespace),
	        slotScopeIds,
	        false
	      );
	    }
	    if (patchFlag > 0) {
	      if (patchFlag & 16) {
	        patchProps(el, oldProps, newProps, parentComponent, namespace);
	      } else {
	        if (patchFlag & 2) {
	          if (oldProps.class !== newProps.class) {
	            hostPatchProp(el, "class", null, newProps.class, namespace);
	          }
	        }
	        if (patchFlag & 4) {
	          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
	        }
	        if (patchFlag & 8) {
	          const propsToUpdate = n2.dynamicProps;
	          for (let i = 0; i < propsToUpdate.length; i++) {
	            const key = propsToUpdate[i];
	            const prev = oldProps[key];
	            const next = newProps[key];
	            if (next !== prev || key === "value") {
	              hostPatchProp(el, key, prev, next, namespace, parentComponent);
	            }
	          }
	        }
	      }
	      if (patchFlag & 1) {
	        if (n1.children !== n2.children) {
	          hostSetElementText(el, n2.children);
	        }
	      }
	    } else if (!optimized && dynamicChildren == null) {
	      patchProps(el, oldProps, newProps, parentComponent, namespace);
	    }
	    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
	      queuePostRenderEffect(() => {
	        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
	        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
	      }, parentSuspense);
	    }
	  };
	  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
	    for (let i = 0; i < newChildren.length; i++) {
	      const oldVNode = oldChildren[i];
	      const newVNode = newChildren[i];
	      const container = (
	        // oldVNode may be an errored async setup() component inside Suspense
	        // which will not have a mounted element
	        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
	        // of the Fragment itself so it can move its children.
	        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
	        // which also requires the correct parent container
	        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
	        oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
	          // In other cases, the parent container is not actually used so we
	          // just pass the block element here to avoid a DOM parentNode call.
	          fallbackContainer
	        )
	      );
	      patch(
	        oldVNode,
	        newVNode,
	        container,
	        null,
	        parentComponent,
	        parentSuspense,
	        namespace,
	        slotScopeIds,
	        true
	      );
	    }
	  };
	  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
	    if (oldProps !== newProps) {
	      if (oldProps !== shared.EMPTY_OBJ) {
	        for (const key in oldProps) {
	          if (!shared.isReservedProp(key) && !(key in newProps)) {
	            hostPatchProp(
	              el,
	              key,
	              oldProps[key],
	              null,
	              namespace,
	              parentComponent
	            );
	          }
	        }
	      }
	      for (const key in newProps) {
	        if (shared.isReservedProp(key)) continue;
	        const next = newProps[key];
	        const prev = oldProps[key];
	        if (next !== prev && key !== "value") {
	          hostPatchProp(el, key, prev, next, namespace, parentComponent);
	        }
	      }
	      if ("value" in newProps) {
	        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
	      }
	    }
	  };
	  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
	    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
	    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
	    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
	    if (fragmentSlotScopeIds) {
	      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
	    }
	    if (n1 == null) {
	      hostInsert(fragmentStartAnchor, container, anchor);
	      hostInsert(fragmentEndAnchor, container, anchor);
	      mountChildren(
	        // #10007
	        // such fragment like `<></>` will be compiled into
	        // a fragment which doesn't have a children.
	        // In this case fallback to an empty array
	        n2.children || [],
	        container,
	        fragmentEndAnchor,
	        parentComponent,
	        parentSuspense,
	        namespace,
	        slotScopeIds,
	        optimized
	      );
	    } else {
	      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
	      // of renderSlot() with no valid children
	      n1.dynamicChildren) {
	        patchBlockChildren(
	          n1.dynamicChildren,
	          dynamicChildren,
	          container,
	          parentComponent,
	          parentSuspense,
	          namespace,
	          slotScopeIds
	        );
	        if (
	          // #2080 if the stable fragment has a key, it's a <template v-for> that may
	          //  get moved around. Make sure all root level vnodes inherit el.
	          // #2134 or if it's a component root, it may also get moved around
	          // as the component is being moved.
	          n2.key != null || parentComponent && n2 === parentComponent.subTree
	        ) {
	          traverseStaticChildren(
	            n1,
	            n2,
	            true
	            /* shallow */
	          );
	        }
	      } else {
	        patchChildren(
	          n1,
	          n2,
	          container,
	          fragmentEndAnchor,
	          parentComponent,
	          parentSuspense,
	          namespace,
	          slotScopeIds,
	          optimized
	        );
	      }
	    }
	  };
	  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
	    n2.slotScopeIds = slotScopeIds;
	    if (n1 == null) {
	      if (n2.shapeFlag & 512) {
	        parentComponent.ctx.activate(
	          n2,
	          container,
	          anchor,
	          namespace,
	          optimized
	        );
	      } else {
	        mountComponent(
	          n2,
	          container,
	          anchor,
	          parentComponent,
	          parentSuspense,
	          namespace,
	          optimized
	        );
	      }
	    } else {
	      updateComponent(n1, n2, optimized);
	    }
	  };
	  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
	    const instance = (initialVNode.component = createComponentInstance(
	      initialVNode,
	      parentComponent,
	      parentSuspense
	    ));
	    if (isKeepAlive(initialVNode)) {
	      instance.ctx.renderer = internals;
	    }
	    {
	      setupComponent(instance, false, optimized);
	    }
	    if (instance.asyncDep) {
	      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
	      if (!initialVNode.el) {
	        const placeholder = instance.subTree = createVNode(Comment);
	        processCommentNode(null, placeholder, container, anchor);
	        initialVNode.placeholder = placeholder.el;
	      }
	    } else {
	      setupRenderEffect(
	        instance,
	        initialVNode,
	        container,
	        anchor,
	        parentSuspense,
	        namespace,
	        optimized
	      );
	    }
	  };
	  const updateComponent = (n1, n2, optimized) => {
	    const instance = n2.component = n1.component;
	    if (shouldUpdateComponent(n1, n2, optimized)) {
	      if (instance.asyncDep && !instance.asyncResolved) {
	        updateComponentPreRender(instance, n2, optimized);
	        return;
	      } else {
	        instance.next = n2;
	        instance.update();
	      }
	    } else {
	      n2.el = n1.el;
	      instance.vnode = n2;
	    }
	  };
	  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
	    const componentUpdateFn = () => {
	      if (!instance.isMounted) {
	        let vnodeHook;
	        const { el, props } = initialVNode;
	        const { bm, m, parent, root, type } = instance;
	        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
	        toggleRecurse(instance, false);
	        if (bm) {
	          shared.invokeArrayFns(bm);
	        }
	        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
	          invokeVNodeHook(vnodeHook, parent, initialVNode);
	        }
	        toggleRecurse(instance, true);
	        if (el && hydrateNode) {
	          const hydrateSubTree = () => {
	            instance.subTree = renderComponentRoot(instance);
	            hydrateNode(
	              el,
	              instance.subTree,
	              instance,
	              parentSuspense,
	              null
	            );
	          };
	          if (isAsyncWrapperVNode && type.__asyncHydrate) {
	            type.__asyncHydrate(
	              el,
	              instance,
	              hydrateSubTree
	            );
	          } else {
	            hydrateSubTree();
	          }
	        } else {
	          if (root.ce && // @ts-expect-error _def is private
	          root.ce._def.shadowRoot !== false) {
	            root.ce._injectChildStyle(type);
	          }
	          const subTree = instance.subTree = renderComponentRoot(instance);
	          patch(
	            null,
	            subTree,
	            container,
	            anchor,
	            instance,
	            parentSuspense,
	            namespace
	          );
	          initialVNode.el = subTree.el;
	        }
	        if (m) {
	          queuePostRenderEffect(m, parentSuspense);
	        }
	        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
	          const scopedInitialVNode = initialVNode;
	          queuePostRenderEffect(
	            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
	            parentSuspense
	          );
	        }
	        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
	          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
	        }
	        instance.isMounted = true;
	        initialVNode = container = anchor = null;
	      } else {
	        let { next, bu, u, parent, vnode } = instance;
	        {
	          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
	          if (nonHydratedAsyncRoot) {
	            if (next) {
	              next.el = vnode.el;
	              updateComponentPreRender(instance, next, optimized);
	            }
	            nonHydratedAsyncRoot.asyncDep.then(() => {
	              if (!instance.isUnmounted) {
	                componentUpdateFn();
	              }
	            });
	            return;
	          }
	        }
	        let originNext = next;
	        let vnodeHook;
	        toggleRecurse(instance, false);
	        if (next) {
	          next.el = vnode.el;
	          updateComponentPreRender(instance, next, optimized);
	        } else {
	          next = vnode;
	        }
	        if (bu) {
	          shared.invokeArrayFns(bu);
	        }
	        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
	          invokeVNodeHook(vnodeHook, parent, next, vnode);
	        }
	        toggleRecurse(instance, true);
	        const nextTree = renderComponentRoot(instance);
	        const prevTree = instance.subTree;
	        instance.subTree = nextTree;
	        patch(
	          prevTree,
	          nextTree,
	          // parent may have changed if it's in a teleport
	          hostParentNode(prevTree.el),
	          // anchor may have changed if it's in a fragment
	          getNextHostNode(prevTree),
	          instance,
	          parentSuspense,
	          namespace
	        );
	        next.el = nextTree.el;
	        if (originNext === null) {
	          updateHOCHostEl(instance, nextTree.el);
	        }
	        if (u) {
	          queuePostRenderEffect(u, parentSuspense);
	        }
	        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
	          queuePostRenderEffect(
	            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
	            parentSuspense
	          );
	        }
	      }
	    };
	    instance.scope.on();
	    const effect = instance.effect = new reactivity.ReactiveEffect(componentUpdateFn);
	    instance.scope.off();
	    const update = instance.update = effect.run.bind(effect);
	    const job = instance.job = effect.runIfDirty.bind(effect);
	    job.i = instance;
	    job.id = instance.uid;
	    effect.scheduler = () => queueJob(job);
	    toggleRecurse(instance, true);
	    update();
	  };
	  const updateComponentPreRender = (instance, nextVNode, optimized) => {
	    nextVNode.component = instance;
	    const prevProps = instance.vnode.props;
	    instance.vnode = nextVNode;
	    instance.next = null;
	    updateProps(instance, nextVNode.props, prevProps, optimized);
	    updateSlots(instance, nextVNode.children, optimized);
	    reactivity.pauseTracking();
	    flushPreFlushCbs(instance);
	    reactivity.resetTracking();
	  };
	  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
	    const c1 = n1 && n1.children;
	    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
	    const c2 = n2.children;
	    const { patchFlag, shapeFlag } = n2;
	    if (patchFlag > 0) {
	      if (patchFlag & 128) {
	        patchKeyedChildren(
	          c1,
	          c2,
	          container,
	          anchor,
	          parentComponent,
	          parentSuspense,
	          namespace,
	          slotScopeIds,
	          optimized
	        );
	        return;
	      } else if (patchFlag & 256) {
	        patchUnkeyedChildren(
	          c1,
	          c2,
	          container,
	          anchor,
	          parentComponent,
	          parentSuspense,
	          namespace,
	          slotScopeIds,
	          optimized
	        );
	        return;
	      }
	    }
	    if (shapeFlag & 8) {
	      if (prevShapeFlag & 16) {
	        unmountChildren(c1, parentComponent, parentSuspense);
	      }
	      if (c2 !== c1) {
	        hostSetElementText(container, c2);
	      }
	    } else {
	      if (prevShapeFlag & 16) {
	        if (shapeFlag & 16) {
	          patchKeyedChildren(
	            c1,
	            c2,
	            container,
	            anchor,
	            parentComponent,
	            parentSuspense,
	            namespace,
	            slotScopeIds,
	            optimized
	          );
	        } else {
	          unmountChildren(c1, parentComponent, parentSuspense, true);
	        }
	      } else {
	        if (prevShapeFlag & 8) {
	          hostSetElementText(container, "");
	        }
	        if (shapeFlag & 16) {
	          mountChildren(
	            c2,
	            container,
	            anchor,
	            parentComponent,
	            parentSuspense,
	            namespace,
	            slotScopeIds,
	            optimized
	          );
	        }
	      }
	    }
	  };
	  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
	    c1 = c1 || shared.EMPTY_ARR;
	    c2 = c2 || shared.EMPTY_ARR;
	    const oldLength = c1.length;
	    const newLength = c2.length;
	    const commonLength = Math.min(oldLength, newLength);
	    let i;
	    for (i = 0; i < commonLength; i++) {
	      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
	      patch(
	        c1[i],
	        nextChild,
	        container,
	        null,
	        parentComponent,
	        parentSuspense,
	        namespace,
	        slotScopeIds,
	        optimized
	      );
	    }
	    if (oldLength > newLength) {
	      unmountChildren(
	        c1,
	        parentComponent,
	        parentSuspense,
	        true,
	        false,
	        commonLength
	      );
	    } else {
	      mountChildren(
	        c2,
	        container,
	        anchor,
	        parentComponent,
	        parentSuspense,
	        namespace,
	        slotScopeIds,
	        optimized,
	        commonLength
	      );
	    }
	  };
	  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
	    let i = 0;
	    const l2 = c2.length;
	    let e1 = c1.length - 1;
	    let e2 = l2 - 1;
	    while (i <= e1 && i <= e2) {
	      const n1 = c1[i];
	      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
	      if (isSameVNodeType(n1, n2)) {
	        patch(
	          n1,
	          n2,
	          container,
	          null,
	          parentComponent,
	          parentSuspense,
	          namespace,
	          slotScopeIds,
	          optimized
	        );
	      } else {
	        break;
	      }
	      i++;
	    }
	    while (i <= e1 && i <= e2) {
	      const n1 = c1[e1];
	      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
	      if (isSameVNodeType(n1, n2)) {
	        patch(
	          n1,
	          n2,
	          container,
	          null,
	          parentComponent,
	          parentSuspense,
	          namespace,
	          slotScopeIds,
	          optimized
	        );
	      } else {
	        break;
	      }
	      e1--;
	      e2--;
	    }
	    if (i > e1) {
	      if (i <= e2) {
	        const nextPos = e2 + 1;
	        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
	        while (i <= e2) {
	          patch(
	            null,
	            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
	            container,
	            anchor,
	            parentComponent,
	            parentSuspense,
	            namespace,
	            slotScopeIds,
	            optimized
	          );
	          i++;
	        }
	      }
	    } else if (i > e2) {
	      while (i <= e1) {
	        unmount(c1[i], parentComponent, parentSuspense, true);
	        i++;
	      }
	    } else {
	      const s1 = i;
	      const s2 = i;
	      const keyToNewIndexMap = /* @__PURE__ */ new Map();
	      for (i = s2; i <= e2; i++) {
	        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
	        if (nextChild.key != null) {
	          keyToNewIndexMap.set(nextChild.key, i);
	        }
	      }
	      let j;
	      let patched = 0;
	      const toBePatched = e2 - s2 + 1;
	      let moved = false;
	      let maxNewIndexSoFar = 0;
	      const newIndexToOldIndexMap = new Array(toBePatched);
	      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
	      for (i = s1; i <= e1; i++) {
	        const prevChild = c1[i];
	        if (patched >= toBePatched) {
	          unmount(prevChild, parentComponent, parentSuspense, true);
	          continue;
	        }
	        let newIndex;
	        if (prevChild.key != null) {
	          newIndex = keyToNewIndexMap.get(prevChild.key);
	        } else {
	          for (j = s2; j <= e2; j++) {
	            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
	              newIndex = j;
	              break;
	            }
	          }
	        }
	        if (newIndex === void 0) {
	          unmount(prevChild, parentComponent, parentSuspense, true);
	        } else {
	          newIndexToOldIndexMap[newIndex - s2] = i + 1;
	          if (newIndex >= maxNewIndexSoFar) {
	            maxNewIndexSoFar = newIndex;
	          } else {
	            moved = true;
	          }
	          patch(
	            prevChild,
	            c2[newIndex],
	            container,
	            null,
	            parentComponent,
	            parentSuspense,
	            namespace,
	            slotScopeIds,
	            optimized
	          );
	          patched++;
	        }
	      }
	      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : shared.EMPTY_ARR;
	      j = increasingNewIndexSequence.length - 1;
	      for (i = toBePatched - 1; i >= 0; i--) {
	        const nextIndex = s2 + i;
	        const nextChild = c2[nextIndex];
	        const anchorVNode = c2[nextIndex + 1];
	        const anchor = nextIndex + 1 < l2 ? (
	          // #13559, fallback to el placeholder for unresolved async component
	          anchorVNode.el || anchorVNode.placeholder
	        ) : parentAnchor;
	        if (newIndexToOldIndexMap[i] === 0) {
	          patch(
	            null,
	            nextChild,
	            container,
	            anchor,
	            parentComponent,
	            parentSuspense,
	            namespace,
	            slotScopeIds,
	            optimized
	          );
	        } else if (moved) {
	          if (j < 0 || i !== increasingNewIndexSequence[j]) {
	            move(nextChild, container, anchor, 2);
	          } else {
	            j--;
	          }
	        }
	      }
	    }
	  };
	  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
	    const { el, type, transition, children, shapeFlag } = vnode;
	    if (shapeFlag & 6) {
	      move(vnode.component.subTree, container, anchor, moveType);
	      return;
	    }
	    if (shapeFlag & 128) {
	      vnode.suspense.move(container, anchor, moveType);
	      return;
	    }
	    if (shapeFlag & 64) {
	      type.move(vnode, container, anchor, internals);
	      return;
	    }
	    if (type === Fragment) {
	      hostInsert(el, container, anchor);
	      for (let i = 0; i < children.length; i++) {
	        move(children[i], container, anchor, moveType);
	      }
	      hostInsert(vnode.anchor, container, anchor);
	      return;
	    }
	    if (type === Static) {
	      moveStaticNode(vnode, container, anchor);
	      return;
	    }
	    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
	    if (needTransition2) {
	      if (moveType === 0) {
	        transition.beforeEnter(el);
	        hostInsert(el, container, anchor);
	        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
	      } else {
	        const { leave, delayLeave, afterLeave } = transition;
	        const remove2 = () => {
	          if (vnode.ctx.isUnmounted) {
	            hostRemove(el);
	          } else {
	            hostInsert(el, container, anchor);
	          }
	        };
	        const performLeave = () => {
	          leave(el, () => {
	            remove2();
	            afterLeave && afterLeave();
	          });
	        };
	        if (delayLeave) {
	          delayLeave(el, remove2, performLeave);
	        } else {
	          performLeave();
	        }
	      }
	    } else {
	      hostInsert(el, container, anchor);
	    }
	  };
	  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
	    const {
	      type,
	      props,
	      ref,
	      children,
	      dynamicChildren,
	      shapeFlag,
	      patchFlag,
	      dirs,
	      cacheIndex
	    } = vnode;
	    if (patchFlag === -2) {
	      optimized = false;
	    }
	    if (ref != null) {
	      reactivity.pauseTracking();
	      setRef(ref, null, parentSuspense, vnode, true);
	      reactivity.resetTracking();
	    }
	    if (cacheIndex != null) {
	      parentComponent.renderCache[cacheIndex] = void 0;
	    }
	    if (shapeFlag & 256) {
	      parentComponent.ctx.deactivate(vnode);
	      return;
	    }
	    const shouldInvokeDirs = shapeFlag & 1 && dirs;
	    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
	    let vnodeHook;
	    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
	      invokeVNodeHook(vnodeHook, parentComponent, vnode);
	    }
	    if (shapeFlag & 6) {
	      unmountComponent(vnode.component, parentSuspense, doRemove);
	    } else {
	      if (shapeFlag & 128) {
	        vnode.suspense.unmount(parentSuspense, doRemove);
	        return;
	      }
	      if (shouldInvokeDirs) {
	        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
	      }
	      if (shapeFlag & 64) {
	        vnode.type.remove(
	          vnode,
	          parentComponent,
	          parentSuspense,
	          internals,
	          doRemove
	        );
	      } else if (dynamicChildren && // #5154
	      // when v-once is used inside a block, setBlockTracking(-1) marks the
	      // parent block with hasOnce: true
	      // so that it doesn't take the fast path during unmount - otherwise
	      // components nested in v-once are never unmounted.
	      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
	      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
	        unmountChildren(
	          dynamicChildren,
	          parentComponent,
	          parentSuspense,
	          false,
	          true
	        );
	      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
	        unmountChildren(children, parentComponent, parentSuspense);
	      }
	      if (doRemove) {
	        remove(vnode);
	      }
	    }
	    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
	      queuePostRenderEffect(() => {
	        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
	        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
	      }, parentSuspense);
	    }
	  };
	  const remove = (vnode) => {
	    const { type, el, anchor, transition } = vnode;
	    if (type === Fragment) {
	      {
	        removeFragment(el, anchor);
	      }
	      return;
	    }
	    if (type === Static) {
	      removeStaticNode(vnode);
	      return;
	    }
	    const performRemove = () => {
	      hostRemove(el);
	      if (transition && !transition.persisted && transition.afterLeave) {
	        transition.afterLeave();
	      }
	    };
	    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
	      const { leave, delayLeave } = transition;
	      const performLeave = () => leave(el, performRemove);
	      if (delayLeave) {
	        delayLeave(vnode.el, performRemove, performLeave);
	      } else {
	        performLeave();
	      }
	    } else {
	      performRemove();
	    }
	  };
	  const removeFragment = (cur, end) => {
	    let next;
	    while (cur !== end) {
	      next = hostNextSibling(cur);
	      hostRemove(cur);
	      cur = next;
	    }
	    hostRemove(end);
	  };
	  const unmountComponent = (instance, parentSuspense, doRemove) => {
	    const {
	      bum,
	      scope,
	      job,
	      subTree,
	      um,
	      m,
	      a,
	      parent,
	      slots: { __: slotCacheKeys }
	    } = instance;
	    invalidateMount(m);
	    invalidateMount(a);
	    if (bum) {
	      shared.invokeArrayFns(bum);
	    }
	    if (parent && shared.isArray(slotCacheKeys)) {
	      slotCacheKeys.forEach((v) => {
	        parent.renderCache[v] = void 0;
	      });
	    }
	    scope.stop();
	    if (job) {
	      job.flags |= 8;
	      unmount(subTree, instance, parentSuspense, doRemove);
	    }
	    if (um) {
	      queuePostRenderEffect(um, parentSuspense);
	    }
	    queuePostRenderEffect(() => {
	      instance.isUnmounted = true;
	    }, parentSuspense);
	    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
	      parentSuspense.deps--;
	      if (parentSuspense.deps === 0) {
	        parentSuspense.resolve();
	      }
	    }
	  };
	  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
	    for (let i = start; i < children.length; i++) {
	      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
	    }
	  };
	  const getNextHostNode = (vnode) => {
	    if (vnode.shapeFlag & 6) {
	      return getNextHostNode(vnode.component.subTree);
	    }
	    if (vnode.shapeFlag & 128) {
	      return vnode.suspense.next();
	    }
	    const el = hostNextSibling(vnode.anchor || vnode.el);
	    const teleportEnd = el && el[TeleportEndKey];
	    return teleportEnd ? hostNextSibling(teleportEnd) : el;
	  };
	  let isFlushing = false;
	  const render = (vnode, container, namespace) => {
	    if (vnode == null) {
	      if (container._vnode) {
	        unmount(container._vnode, null, null, true);
	      }
	    } else {
	      patch(
	        container._vnode || null,
	        vnode,
	        container,
	        null,
	        null,
	        null,
	        namespace
	      );
	    }
	    container._vnode = vnode;
	    if (!isFlushing) {
	      isFlushing = true;
	      flushPreFlushCbs();
	      flushPostFlushCbs();
	      isFlushing = false;
	    }
	  };
	  const internals = {
	    p: patch,
	    um: unmount,
	    m: move,
	    r: remove,
	    mt: mountComponent,
	    mc: mountChildren,
	    pc: patchChildren,
	    pbc: patchBlockChildren,
	    n: getNextHostNode,
	    o: options
	  };
	  let hydrate;
	  let hydrateNode;
	  if (createHydrationFns) {
	    [hydrate, hydrateNode] = createHydrationFns(
	      internals
	    );
	  }
	  return {
	    render,
	    hydrate,
	    createApp: createAppAPI(render, hydrate)
	  };
	}
	function resolveChildrenNamespace({ type, props }, currentNamespace) {
	  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
	}
	function toggleRecurse({ effect, job }, allowed) {
	  if (allowed) {
	    effect.flags |= 32;
	    job.flags |= 4;
	  } else {
	    effect.flags &= -33;
	    job.flags &= -5;
	  }
	}
	function needTransition(parentSuspense, transition) {
	  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
	}
	function traverseStaticChildren(n1, n2, shallow = false) {
	  const ch1 = n1.children;
	  const ch2 = n2.children;
	  if (shared.isArray(ch1) && shared.isArray(ch2)) {
	    for (let i = 0; i < ch1.length; i++) {
	      const c1 = ch1[i];
	      let c2 = ch2[i];
	      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
	        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
	          c2 = ch2[i] = cloneIfMounted(ch2[i]);
	          c2.el = c1.el;
	        }
	        if (!shallow && c2.patchFlag !== -2)
	          traverseStaticChildren(c1, c2);
	      }
	      if (c2.type === Text) {
	        c2.el = c1.el;
	      }
	      if (c2.type === Comment && !c2.el) {
	        c2.el = c1.el;
	      }
	    }
	  }
	}
	function getSequence(arr) {
	  const p = arr.slice();
	  const result = [0];
	  let i, j, u, v, c;
	  const len = arr.length;
	  for (i = 0; i < len; i++) {
	    const arrI = arr[i];
	    if (arrI !== 0) {
	      j = result[result.length - 1];
	      if (arr[j] < arrI) {
	        p[i] = j;
	        result.push(i);
	        continue;
	      }
	      u = 0;
	      v = result.length - 1;
	      while (u < v) {
	        c = u + v >> 1;
	        if (arr[result[c]] < arrI) {
	          u = c + 1;
	        } else {
	          v = c;
	        }
	      }
	      if (arrI < arr[result[u]]) {
	        if (u > 0) {
	          p[i] = result[u - 1];
	        }
	        result[u] = i;
	      }
	    }
	  }
	  u = result.length;
	  v = result[u - 1];
	  while (u-- > 0) {
	    result[u] = v;
	    v = p[v];
	  }
	  return result;
	}
	function locateNonHydratedAsyncRoot(instance) {
	  const subComponent = instance.subTree.component;
	  if (subComponent) {
	    if (subComponent.asyncDep && !subComponent.asyncResolved) {
	      return subComponent;
	    } else {
	      return locateNonHydratedAsyncRoot(subComponent);
	    }
	  }
	}
	function invalidateMount(hooks) {
	  if (hooks) {
	    for (let i = 0; i < hooks.length; i++)
	      hooks[i].flags |= 8;
	  }
	}

	const ssrContextKey = Symbol.for("v-scx");
	const useSSRContext = () => {
	  {
	    const ctx = inject(ssrContextKey);
	    return ctx;
	  }
	};

	function watchEffect(effect, options) {
	  return doWatch(effect, null, options);
	}
	function watchPostEffect(effect, options) {
	  return doWatch(
	    effect,
	    null,
	    { flush: "post" }
	  );
	}
	function watchSyncEffect(effect, options) {
	  return doWatch(
	    effect,
	    null,
	    { flush: "sync" }
	  );
	}
	function watch(source, cb, options) {
	  return doWatch(source, cb, options);
	}
	function doWatch(source, cb, options = shared.EMPTY_OBJ) {
	  const { immediate, deep, flush, once } = options;
	  const baseWatchOptions = shared.extend({}, options);
	  const runsImmediately = cb && immediate || !cb && flush !== "post";
	  let ssrCleanup;
	  if (isInSSRComponentSetup) {
	    if (flush === "sync") {
	      const ctx = useSSRContext();
	      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
	    } else if (!runsImmediately) {
	      const watchStopHandle = () => {
	      };
	      watchStopHandle.stop = shared.NOOP;
	      watchStopHandle.resume = shared.NOOP;
	      watchStopHandle.pause = shared.NOOP;
	      return watchStopHandle;
	    }
	  }
	  const instance = currentInstance;
	  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
	  let isPre = false;
	  if (flush === "post") {
	    baseWatchOptions.scheduler = (job) => {
	      queuePostRenderEffect(job, instance && instance.suspense);
	    };
	  } else if (flush !== "sync") {
	    isPre = true;
	    baseWatchOptions.scheduler = (job, isFirstRun) => {
	      if (isFirstRun) {
	        job();
	      } else {
	        queueJob(job);
	      }
	    };
	  }
	  baseWatchOptions.augmentJob = (job) => {
	    if (cb) {
	      job.flags |= 4;
	    }
	    if (isPre) {
	      job.flags |= 2;
	      if (instance) {
	        job.id = instance.uid;
	        job.i = instance;
	      }
	    }
	  };
	  const watchHandle = reactivity.watch(source, cb, baseWatchOptions);
	  if (isInSSRComponentSetup) {
	    if (ssrCleanup) {
	      ssrCleanup.push(watchHandle);
	    } else if (runsImmediately) {
	      watchHandle();
	    }
	  }
	  return watchHandle;
	}
	function instanceWatch(source, value, options) {
	  const publicThis = this.proxy;
	  const getter = shared.isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
	  let cb;
	  if (shared.isFunction(value)) {
	    cb = value;
	  } else {
	    cb = value.handler;
	    options = value;
	  }
	  const reset = setCurrentInstance(this);
	  const res = doWatch(getter, cb.bind(publicThis), options);
	  reset();
	  return res;
	}
	function createPathGetter(ctx, path) {
	  const segments = path.split(".");
	  return () => {
	    let cur = ctx;
	    for (let i = 0; i < segments.length && cur; i++) {
	      cur = cur[segments[i]];
	    }
	    return cur;
	  };
	}

	function useModel(props, name, options = shared.EMPTY_OBJ) {
	  const i = getCurrentInstance();
	  const camelizedName = shared.camelize(name);
	  const hyphenatedName = shared.hyphenate(name);
	  const modifiers = getModelModifiers(props, camelizedName);
	  const res = reactivity.customRef((track, trigger) => {
	    let localValue;
	    let prevSetValue = shared.EMPTY_OBJ;
	    let prevEmittedValue;
	    watchSyncEffect(() => {
	      const propValue = props[camelizedName];
	      if (shared.hasChanged(localValue, propValue)) {
	        localValue = propValue;
	        trigger();
	      }
	    });
	    return {
	      get() {
	        track();
	        return options.get ? options.get(localValue) : localValue;
	      },
	      set(value) {
	        const emittedValue = options.set ? options.set(value) : value;
	        if (!shared.hasChanged(emittedValue, localValue) && !(prevSetValue !== shared.EMPTY_OBJ && shared.hasChanged(value, prevSetValue))) {
	          return;
	        }
	        const rawProps = i.vnode.props;
	        if (!(rawProps && // check if parent has passed v-model
	        (name in rawProps || camelizedName in rawProps || hyphenatedName in rawProps) && (`onUpdate:${name}` in rawProps || `onUpdate:${camelizedName}` in rawProps || `onUpdate:${hyphenatedName}` in rawProps))) {
	          localValue = value;
	          trigger();
	        }
	        i.emit(`update:${name}`, emittedValue);
	        if (shared.hasChanged(value, emittedValue) && shared.hasChanged(value, prevSetValue) && !shared.hasChanged(emittedValue, prevEmittedValue)) {
	          trigger();
	        }
	        prevSetValue = value;
	        prevEmittedValue = emittedValue;
	      }
	    };
	  });
	  res[Symbol.iterator] = () => {
	    let i2 = 0;
	    return {
	      next() {
	        if (i2 < 2) {
	          return { value: i2++ ? modifiers || shared.EMPTY_OBJ : res, done: false };
	        } else {
	          return { done: true };
	        }
	      }
	    };
	  };
	  return res;
	}
	const getModelModifiers = (props, modelName) => {
	  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${shared.camelize(modelName)}Modifiers`] || props[`${shared.hyphenate(modelName)}Modifiers`];
	};

	function emit(instance, event, ...rawArgs) {
	  if (instance.isUnmounted) return;
	  const props = instance.vnode.props || shared.EMPTY_OBJ;
	  let args = rawArgs;
	  const isModelListener = event.startsWith("update:");
	  const modifiers = isModelListener && getModelModifiers(props, event.slice(7));
	  if (modifiers) {
	    if (modifiers.trim) {
	      args = rawArgs.map((a) => shared.isString(a) ? a.trim() : a);
	    }
	    if (modifiers.number) {
	      args = rawArgs.map(shared.looseToNumber);
	    }
	  }
	  let handlerName;
	  let handler = props[handlerName = shared.toHandlerKey(event)] || // also try camelCase event handler (#2249)
	  props[handlerName = shared.toHandlerKey(shared.camelize(event))];
	  if (!handler && isModelListener) {
	    handler = props[handlerName = shared.toHandlerKey(shared.hyphenate(event))];
	  }
	  if (handler) {
	    callWithAsyncErrorHandling(
	      handler,
	      instance,
	      6,
	      args
	    );
	  }
	  const onceHandler = props[handlerName + `Once`];
	  if (onceHandler) {
	    if (!instance.emitted) {
	      instance.emitted = {};
	    } else if (instance.emitted[handlerName]) {
	      return;
	    }
	    instance.emitted[handlerName] = true;
	    callWithAsyncErrorHandling(
	      onceHandler,
	      instance,
	      6,
	      args
	    );
	  }
	}
	function normalizeEmitsOptions(comp, appContext, asMixin = false) {
	  const cache = appContext.emitsCache;
	  const cached = cache.get(comp);
	  if (cached !== void 0) {
	    return cached;
	  }
	  const raw = comp.emits;
	  let normalized = {};
	  let hasExtends = false;
	  if (!shared.isFunction(comp)) {
	    const extendEmits = (raw2) => {
	      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
	      if (normalizedFromExtend) {
	        hasExtends = true;
	        shared.extend(normalized, normalizedFromExtend);
	      }
	    };
	    if (!asMixin && appContext.mixins.length) {
	      appContext.mixins.forEach(extendEmits);
	    }
	    if (comp.extends) {
	      extendEmits(comp.extends);
	    }
	    if (comp.mixins) {
	      comp.mixins.forEach(extendEmits);
	    }
	  }
	  if (!raw && !hasExtends) {
	    if (shared.isObject(comp)) {
	      cache.set(comp, null);
	    }
	    return null;
	  }
	  if (shared.isArray(raw)) {
	    raw.forEach((key) => normalized[key] = null);
	  } else {
	    shared.extend(normalized, raw);
	  }
	  if (shared.isObject(comp)) {
	    cache.set(comp, normalized);
	  }
	  return normalized;
	}
	function isEmitListener(options, key) {
	  if (!options || !shared.isOn(key)) {
	    return false;
	  }
	  key = key.slice(2).replace(/Once$/, "");
	  return shared.hasOwn(options, key[0].toLowerCase() + key.slice(1)) || shared.hasOwn(options, shared.hyphenate(key)) || shared.hasOwn(options, key);
	}

	function markAttrsAccessed() {
	}
	function renderComponentRoot(instance) {
	  const {
	    type: Component,
	    vnode,
	    proxy,
	    withProxy,
	    propsOptions: [propsOptions],
	    slots,
	    attrs,
	    emit,
	    render,
	    renderCache,
	    props,
	    data,
	    setupState,
	    ctx,
	    inheritAttrs
	  } = instance;
	  const prev = setCurrentRenderingInstance(instance);
	  let result;
	  let fallthroughAttrs;
	  try {
	    if (vnode.shapeFlag & 4) {
	      const proxyToUse = withProxy || proxy;
	      const thisProxy = false ? new Proxy(proxyToUse, {
	        get(target, key, receiver) {
	          warn(
	            `Property '${String(
	              key
	            )}' was accessed via 'this'. Avoid using 'this' in templates.`
	          );
	          return Reflect.get(target, key, receiver);
	        }
	      }) : proxyToUse;
	      result = normalizeVNode(
	        render.call(
	          thisProxy,
	          proxyToUse,
	          renderCache,
	          false ? shallowReadonly(props) : props,
	          setupState,
	          data,
	          ctx
	        )
	      );
	      fallthroughAttrs = attrs;
	    } else {
	      const render2 = Component;
	      if (false) ;
	      result = normalizeVNode(
	        render2.length > 1 ? render2(
	          false ? shallowReadonly(props) : props,
	          false ? {
	            get attrs() {
	              markAttrsAccessed();
	              return shallowReadonly(attrs);
	            },
	            slots,
	            emit
	          } : { attrs, slots, emit }
	        ) : render2(
	          false ? shallowReadonly(props) : props,
	          null
	        )
	      );
	      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
	    }
	  } catch (err) {
	    blockStack.length = 0;
	    handleError(err, instance, 1);
	    result = createVNode(Comment);
	  }
	  let root = result;
	  if (fallthroughAttrs && inheritAttrs !== false) {
	    const keys = Object.keys(fallthroughAttrs);
	    const { shapeFlag } = root;
	    if (keys.length) {
	      if (shapeFlag & (1 | 6)) {
	        if (propsOptions && keys.some(shared.isModelListener)) {
	          fallthroughAttrs = filterModelListeners(
	            fallthroughAttrs,
	            propsOptions
	          );
	        }
	        root = cloneVNode(root, fallthroughAttrs, false, true);
	      }
	    }
	  }
	  if (vnode.dirs) {
	    root = cloneVNode(root, null, false, true);
	    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
	  }
	  if (vnode.transition) {
	    setTransitionHooks(root, vnode.transition);
	  }
	  {
	    result = root;
	  }
	  setCurrentRenderingInstance(prev);
	  return result;
	}
	function filterSingleRoot(children, recurse = true) {
	  let singleRoot;
	  for (let i = 0; i < children.length; i++) {
	    const child = children[i];
	    if (isVNode(child)) {
	      if (child.type !== Comment || child.children === "v-if") {
	        if (singleRoot) {
	          return;
	        } else {
	          singleRoot = child;
	        }
	      }
	    } else {
	      return;
	    }
	  }
	  return singleRoot;
	}
	const getFunctionalFallthrough = (attrs) => {
	  let res;
	  for (const key in attrs) {
	    if (key === "class" || key === "style" || shared.isOn(key)) {
	      (res || (res = {}))[key] = attrs[key];
	    }
	  }
	  return res;
	};
	const filterModelListeners = (attrs, props) => {
	  const res = {};
	  for (const key in attrs) {
	    if (!shared.isModelListener(key) || !(key.slice(9) in props)) {
	      res[key] = attrs[key];
	    }
	  }
	  return res;
	};
	function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
	  const { props: prevProps, children: prevChildren, component } = prevVNode;
	  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
	  const emits = component.emitsOptions;
	  if (nextVNode.dirs || nextVNode.transition) {
	    return true;
	  }
	  if (optimized && patchFlag >= 0) {
	    if (patchFlag & 1024) {
	      return true;
	    }
	    if (patchFlag & 16) {
	      if (!prevProps) {
	        return !!nextProps;
	      }
	      return hasPropsChanged(prevProps, nextProps, emits);
	    } else if (patchFlag & 8) {
	      const dynamicProps = nextVNode.dynamicProps;
	      for (let i = 0; i < dynamicProps.length; i++) {
	        const key = dynamicProps[i];
	        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
	          return true;
	        }
	      }
	    }
	  } else {
	    if (prevChildren || nextChildren) {
	      if (!nextChildren || !nextChildren.$stable) {
	        return true;
	      }
	    }
	    if (prevProps === nextProps) {
	      return false;
	    }
	    if (!prevProps) {
	      return !!nextProps;
	    }
	    if (!nextProps) {
	      return true;
	    }
	    return hasPropsChanged(prevProps, nextProps, emits);
	  }
	  return false;
	}
	function hasPropsChanged(prevProps, nextProps, emitsOptions) {
	  const nextKeys = Object.keys(nextProps);
	  if (nextKeys.length !== Object.keys(prevProps).length) {
	    return true;
	  }
	  for (let i = 0; i < nextKeys.length; i++) {
	    const key = nextKeys[i];
	    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
	      return true;
	    }
	  }
	  return false;
	}
	function updateHOCHostEl({ vnode, parent }, el) {
	  while (parent) {
	    const root = parent.subTree;
	    if (root.suspense && root.suspense.activeBranch === vnode) {
	      root.el = vnode.el;
	    }
	    if (root === vnode) {
	      (vnode = parent.vnode).el = el;
	      parent = parent.parent;
	    } else {
	      break;
	    }
	  }
	}

	const isSuspense = (type) => type.__isSuspense;
	let suspenseId = 0;
	const SuspenseImpl = {
	  name: "Suspense",
	  // In order to make Suspense tree-shakable, we need to avoid importing it
	  // directly in the renderer. The renderer checks for the __isSuspense flag
	  // on a vnode's type and calls the `process` method, passing in renderer
	  // internals.
	  __isSuspense: true,
	  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
	    if (n1 == null) {
	      mountSuspense(
	        n2,
	        container,
	        anchor,
	        parentComponent,
	        parentSuspense,
	        namespace,
	        slotScopeIds,
	        optimized,
	        rendererInternals
	      );
	    } else {
	      if (parentSuspense && parentSuspense.deps > 0 && !n1.suspense.isInFallback) {
	        n2.suspense = n1.suspense;
	        n2.suspense.vnode = n2;
	        n2.el = n1.el;
	        return;
	      }
	      patchSuspense(
	        n1,
	        n2,
	        container,
	        anchor,
	        parentComponent,
	        namespace,
	        slotScopeIds,
	        optimized,
	        rendererInternals
	      );
	    }
	  },
	  hydrate: hydrateSuspense,
	  normalize: normalizeSuspenseChildren
	};
	const Suspense = SuspenseImpl ;
	function triggerEvent(vnode, name) {
	  const eventListener = vnode.props && vnode.props[name];
	  if (shared.isFunction(eventListener)) {
	    eventListener();
	  }
	}
	function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
	  const {
	    p: patch,
	    o: { createElement }
	  } = rendererInternals;
	  const hiddenContainer = createElement("div");
	  const suspense = vnode.suspense = createSuspenseBoundary(
	    vnode,
	    parentSuspense,
	    parentComponent,
	    container,
	    hiddenContainer,
	    anchor,
	    namespace,
	    slotScopeIds,
	    optimized,
	    rendererInternals
	  );
	  patch(
	    null,
	    suspense.pendingBranch = vnode.ssContent,
	    hiddenContainer,
	    null,
	    parentComponent,
	    suspense,
	    namespace,
	    slotScopeIds
	  );
	  if (suspense.deps > 0) {
	    triggerEvent(vnode, "onPending");
	    triggerEvent(vnode, "onFallback");
	    patch(
	      null,
	      vnode.ssFallback,
	      container,
	      anchor,
	      parentComponent,
	      null,
	      // fallback tree will not have suspense context
	      namespace,
	      slotScopeIds
	    );
	    setActiveBranch(suspense, vnode.ssFallback);
	  } else {
	    suspense.resolve(false, true);
	  }
	}
	function patchSuspense(n1, n2, container, anchor, parentComponent, namespace, slotScopeIds, optimized, { p: patch, um: unmount, o: { createElement } }) {
	  const suspense = n2.suspense = n1.suspense;
	  suspense.vnode = n2;
	  n2.el = n1.el;
	  const newBranch = n2.ssContent;
	  const newFallback = n2.ssFallback;
	  const { activeBranch, pendingBranch, isInFallback, isHydrating } = suspense;
	  if (pendingBranch) {
	    suspense.pendingBranch = newBranch;
	    if (isSameVNodeType(newBranch, pendingBranch)) {
	      patch(
	        pendingBranch,
	        newBranch,
	        suspense.hiddenContainer,
	        null,
	        parentComponent,
	        suspense,
	        namespace,
	        slotScopeIds,
	        optimized
	      );
	      if (suspense.deps <= 0) {
	        suspense.resolve();
	      } else if (isInFallback) {
	        if (!isHydrating) {
	          patch(
	            activeBranch,
	            newFallback,
	            container,
	            anchor,
	            parentComponent,
	            null,
	            // fallback tree will not have suspense context
	            namespace,
	            slotScopeIds,
	            optimized
	          );
	          setActiveBranch(suspense, newFallback);
	        }
	      }
	    } else {
	      suspense.pendingId = suspenseId++;
	      if (isHydrating) {
	        suspense.isHydrating = false;
	        suspense.activeBranch = pendingBranch;
	      } else {
	        unmount(pendingBranch, parentComponent, suspense);
	      }
	      suspense.deps = 0;
	      suspense.effects.length = 0;
	      suspense.hiddenContainer = createElement("div");
	      if (isInFallback) {
	        patch(
	          null,
	          newBranch,
	          suspense.hiddenContainer,
	          null,
	          parentComponent,
	          suspense,
	          namespace,
	          slotScopeIds,
	          optimized
	        );
	        if (suspense.deps <= 0) {
	          suspense.resolve();
	        } else {
	          patch(
	            activeBranch,
	            newFallback,
	            container,
	            anchor,
	            parentComponent,
	            null,
	            // fallback tree will not have suspense context
	            namespace,
	            slotScopeIds,
	            optimized
	          );
	          setActiveBranch(suspense, newFallback);
	        }
	      } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
	        patch(
	          activeBranch,
	          newBranch,
	          container,
	          anchor,
	          parentComponent,
	          suspense,
	          namespace,
	          slotScopeIds,
	          optimized
	        );
	        suspense.resolve(true);
	      } else {
	        patch(
	          null,
	          newBranch,
	          suspense.hiddenContainer,
	          null,
	          parentComponent,
	          suspense,
	          namespace,
	          slotScopeIds,
	          optimized
	        );
	        if (suspense.deps <= 0) {
	          suspense.resolve();
	        }
	      }
	    }
	  } else {
	    if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
	      patch(
	        activeBranch,
	        newBranch,
	        container,
	        anchor,
	        parentComponent,
	        suspense,
	        namespace,
	        slotScopeIds,
	        optimized
	      );
	      setActiveBranch(suspense, newBranch);
	    } else {
	      triggerEvent(n2, "onPending");
	      suspense.pendingBranch = newBranch;
	      if (newBranch.shapeFlag & 512) {
	        suspense.pendingId = newBranch.component.suspenseId;
	      } else {
	        suspense.pendingId = suspenseId++;
	      }
	      patch(
	        null,
	        newBranch,
	        suspense.hiddenContainer,
	        null,
	        parentComponent,
	        suspense,
	        namespace,
	        slotScopeIds,
	        optimized
	      );
	      if (suspense.deps <= 0) {
	        suspense.resolve();
	      } else {
	        const { timeout, pendingId } = suspense;
	        if (timeout > 0) {
	          setTimeout(() => {
	            if (suspense.pendingId === pendingId) {
	              suspense.fallback(newFallback);
	            }
	          }, timeout);
	        } else if (timeout === 0) {
	          suspense.fallback(newFallback);
	        }
	      }
	    }
	  }
	}
	function createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals, isHydrating = false) {
	  const {
	    p: patch,
	    m: move,
	    um: unmount,
	    n: next,
	    o: { parentNode, remove }
	  } = rendererInternals;
	  let parentSuspenseId;
	  const isSuspensible = isVNodeSuspensible(vnode);
	  if (isSuspensible) {
	    if (parentSuspense && parentSuspense.pendingBranch) {
	      parentSuspenseId = parentSuspense.pendingId;
	      parentSuspense.deps++;
	    }
	  }
	  const timeout = vnode.props ? shared.toNumber(vnode.props.timeout) : void 0;
	  const initialAnchor = anchor;
	  const suspense = {
	    vnode,
	    parent: parentSuspense,
	    parentComponent,
	    namespace,
	    container,
	    hiddenContainer,
	    deps: 0,
	    pendingId: suspenseId++,
	    timeout: typeof timeout === "number" ? timeout : -1,
	    activeBranch: null,
	    pendingBranch: null,
	    isInFallback: !isHydrating,
	    isHydrating,
	    isUnmounted: false,
	    effects: [],
	    resolve(resume = false, sync = false) {
	      const {
	        vnode: vnode2,
	        activeBranch,
	        pendingBranch,
	        pendingId,
	        effects,
	        parentComponent: parentComponent2,
	        container: container2
	      } = suspense;
	      let delayEnter = false;
	      if (suspense.isHydrating) {
	        suspense.isHydrating = false;
	      } else if (!resume) {
	        delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === "out-in";
	        if (delayEnter) {
	          activeBranch.transition.afterLeave = () => {
	            if (pendingId === suspense.pendingId) {
	              move(
	                pendingBranch,
	                container2,
	                anchor === initialAnchor ? next(activeBranch) : anchor,
	                0
	              );
	              queuePostFlushCb(effects);
	            }
	          };
	        }
	        if (activeBranch) {
	          if (parentNode(activeBranch.el) === container2) {
	            anchor = next(activeBranch);
	          }
	          unmount(activeBranch, parentComponent2, suspense, true);
	        }
	        if (!delayEnter) {
	          move(pendingBranch, container2, anchor, 0);
	        }
	      }
	      setActiveBranch(suspense, pendingBranch);
	      suspense.pendingBranch = null;
	      suspense.isInFallback = false;
	      let parent = suspense.parent;
	      let hasUnresolvedAncestor = false;
	      while (parent) {
	        if (parent.pendingBranch) {
	          parent.effects.push(...effects);
	          hasUnresolvedAncestor = true;
	          break;
	        }
	        parent = parent.parent;
	      }
	      if (!hasUnresolvedAncestor && !delayEnter) {
	        queuePostFlushCb(effects);
	      }
	      suspense.effects = [];
	      if (isSuspensible) {
	        if (parentSuspense && parentSuspense.pendingBranch && parentSuspenseId === parentSuspense.pendingId) {
	          parentSuspense.deps--;
	          if (parentSuspense.deps === 0 && !sync) {
	            parentSuspense.resolve();
	          }
	        }
	      }
	      triggerEvent(vnode2, "onResolve");
	    },
	    fallback(fallbackVNode) {
	      if (!suspense.pendingBranch) {
	        return;
	      }
	      const { vnode: vnode2, activeBranch, parentComponent: parentComponent2, container: container2, namespace: namespace2 } = suspense;
	      triggerEvent(vnode2, "onFallback");
	      const anchor2 = next(activeBranch);
	      const mountFallback = () => {
	        if (!suspense.isInFallback) {
	          return;
	        }
	        patch(
	          null,
	          fallbackVNode,
	          container2,
	          anchor2,
	          parentComponent2,
	          null,
	          // fallback tree will not have suspense context
	          namespace2,
	          slotScopeIds,
	          optimized
	        );
	        setActiveBranch(suspense, fallbackVNode);
	      };
	      const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === "out-in";
	      if (delayEnter) {
	        activeBranch.transition.afterLeave = mountFallback;
	      }
	      suspense.isInFallback = true;
	      unmount(
	        activeBranch,
	        parentComponent2,
	        null,
	        // no suspense so unmount hooks fire now
	        true
	        // shouldRemove
	      );
	      if (!delayEnter) {
	        mountFallback();
	      }
	    },
	    move(container2, anchor2, type) {
	      suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type);
	      suspense.container = container2;
	    },
	    next() {
	      return suspense.activeBranch && next(suspense.activeBranch);
	    },
	    registerDep(instance, setupRenderEffect, optimized2) {
	      const isInPendingSuspense = !!suspense.pendingBranch;
	      if (isInPendingSuspense) {
	        suspense.deps++;
	      }
	      const hydratedEl = instance.vnode.el;
	      instance.asyncDep.catch((err) => {
	        handleError(err, instance, 0);
	      }).then((asyncSetupResult) => {
	        if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) {
	          return;
	        }
	        instance.asyncResolved = true;
	        const { vnode: vnode2 } = instance;
	        handleSetupResult(instance, asyncSetupResult, false);
	        if (hydratedEl) {
	          vnode2.el = hydratedEl;
	        }
	        const placeholder = !hydratedEl && instance.subTree.el;
	        setupRenderEffect(
	          instance,
	          vnode2,
	          // component may have been moved before resolve.
	          // if this is not a hydration, instance.subTree will be the comment
	          // placeholder.
	          parentNode(hydratedEl || instance.subTree.el),
	          // anchor will not be used if this is hydration, so only need to
	          // consider the comment placeholder case.
	          hydratedEl ? null : next(instance.subTree),
	          suspense,
	          namespace,
	          optimized2
	        );
	        if (placeholder) {
	          remove(placeholder);
	        }
	        updateHOCHostEl(instance, vnode2.el);
	        if (isInPendingSuspense && --suspense.deps === 0) {
	          suspense.resolve();
	        }
	      });
	    },
	    unmount(parentSuspense2, doRemove) {
	      suspense.isUnmounted = true;
	      if (suspense.activeBranch) {
	        unmount(
	          suspense.activeBranch,
	          parentComponent,
	          parentSuspense2,
	          doRemove
	        );
	      }
	      if (suspense.pendingBranch) {
	        unmount(
	          suspense.pendingBranch,
	          parentComponent,
	          parentSuspense2,
	          doRemove
	        );
	      }
	    }
	  };
	  return suspense;
	}
	function hydrateSuspense(node, vnode, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals, hydrateNode) {
	  const suspense = vnode.suspense = createSuspenseBoundary(
	    vnode,
	    parentSuspense,
	    parentComponent,
	    node.parentNode,
	    // eslint-disable-next-line no-restricted-globals
	    document.createElement("div"),
	    null,
	    namespace,
	    slotScopeIds,
	    optimized,
	    rendererInternals,
	    true
	  );
	  const result = hydrateNode(
	    node,
	    suspense.pendingBranch = vnode.ssContent,
	    parentComponent,
	    suspense,
	    slotScopeIds,
	    optimized
	  );
	  if (suspense.deps === 0) {
	    suspense.resolve(false, true);
	  }
	  return result;
	}
	function normalizeSuspenseChildren(vnode) {
	  const { shapeFlag, children } = vnode;
	  const isSlotChildren = shapeFlag & 32;
	  vnode.ssContent = normalizeSuspenseSlot(
	    isSlotChildren ? children.default : children
	  );
	  vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment);
	}
	function normalizeSuspenseSlot(s) {
	  let block;
	  if (shared.isFunction(s)) {
	    const trackBlock = isBlockTreeEnabled && s._c;
	    if (trackBlock) {
	      s._d = false;
	      openBlock();
	    }
	    s = s();
	    if (trackBlock) {
	      s._d = true;
	      block = currentBlock;
	      closeBlock();
	    }
	  }
	  if (shared.isArray(s)) {
	    const singleChild = filterSingleRoot(s);
	    s = singleChild;
	  }
	  s = normalizeVNode(s);
	  if (block && !s.dynamicChildren) {
	    s.dynamicChildren = block.filter((c) => c !== s);
	  }
	  return s;
	}
	function queueEffectWithSuspense(fn, suspense) {
	  if (suspense && suspense.pendingBranch) {
	    if (shared.isArray(fn)) {
	      suspense.effects.push(...fn);
	    } else {
	      suspense.effects.push(fn);
	    }
	  } else {
	    queuePostFlushCb(fn);
	  }
	}
	function setActiveBranch(suspense, branch) {
	  suspense.activeBranch = branch;
	  const { vnode, parentComponent } = suspense;
	  let el = branch.el;
	  while (!el && branch.component) {
	    branch = branch.component.subTree;
	    el = branch.el;
	  }
	  vnode.el = el;
	  if (parentComponent && parentComponent.subTree === vnode) {
	    parentComponent.vnode.el = el;
	    updateHOCHostEl(parentComponent, el);
	  }
	}
	function isVNodeSuspensible(vnode) {
	  const suspensible = vnode.props && vnode.props.suspensible;
	  return suspensible != null && suspensible !== false;
	}

	const Fragment = Symbol.for("v-fgt");
	const Text = Symbol.for("v-txt");
	const Comment = Symbol.for("v-cmt");
	const Static = Symbol.for("v-stc");
	const blockStack = [];
	let currentBlock = null;
	function openBlock(disableTracking = false) {
	  blockStack.push(currentBlock = disableTracking ? null : []);
	}
	function closeBlock() {
	  blockStack.pop();
	  currentBlock = blockStack[blockStack.length - 1] || null;
	}
	let isBlockTreeEnabled = 1;
	function setBlockTracking(value, inVOnce = false) {
	  isBlockTreeEnabled += value;
	  if (value < 0 && currentBlock && inVOnce) {
	    currentBlock.hasOnce = true;
	  }
	}
	function setupBlock(vnode) {
	  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || shared.EMPTY_ARR : null;
	  closeBlock();
	  if (isBlockTreeEnabled > 0 && currentBlock) {
	    currentBlock.push(vnode);
	  }
	  return vnode;
	}
	function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
	  return setupBlock(
	    createBaseVNode(
	      type,
	      props,
	      children,
	      patchFlag,
	      dynamicProps,
	      shapeFlag,
	      true
	    )
	  );
	}
	function createBlock(type, props, children, patchFlag, dynamicProps) {
	  return setupBlock(
	    createVNode(
	      type,
	      props,
	      children,
	      patchFlag,
	      dynamicProps,
	      true
	    )
	  );
	}
	function isVNode(value) {
	  return value ? value.__v_isVNode === true : false;
	}
	function isSameVNodeType(n1, n2) {
	  return n1.type === n2.type && n1.key === n2.key;
	}
	function transformVNodeArgs(transformer) {
	}
	const normalizeKey = ({ key }) => key != null ? key : null;
	const normalizeRef = ({
	  ref,
	  ref_key,
	  ref_for
	}) => {
	  if (typeof ref === "number") {
	    ref = "" + ref;
	  }
	  return ref != null ? shared.isString(ref) || reactivity.isRef(ref) || shared.isFunction(ref) ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for } : ref : null;
	};
	function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
	  const vnode = {
	    __v_isVNode: true,
	    __v_skip: true,
	    type,
	    props,
	    key: props && normalizeKey(props),
	    ref: props && normalizeRef(props),
	    scopeId: currentScopeId,
	    slotScopeIds: null,
	    children,
	    component: null,
	    suspense: null,
	    ssContent: null,
	    ssFallback: null,
	    dirs: null,
	    transition: null,
	    el: null,
	    anchor: null,
	    target: null,
	    targetStart: null,
	    targetAnchor: null,
	    staticCount: 0,
	    shapeFlag,
	    patchFlag,
	    dynamicProps,
	    dynamicChildren: null,
	    appContext: null,
	    ctx: currentRenderingInstance
	  };
	  if (needFullChildrenNormalization) {
	    normalizeChildren(vnode, children);
	    if (shapeFlag & 128) {
	      type.normalize(vnode);
	    }
	  } else if (children) {
	    vnode.shapeFlag |= shared.isString(children) ? 8 : 16;
	  }
	  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
	  !isBlockNode && // has current parent block
	  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
	  // component nodes also should always be patched, because even if the
	  // component doesn't need to update, it needs to persist the instance on to
	  // the next vnode so that it can be properly unmounted later.
	  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
	  // vnode should not be considered dynamic due to handler caching.
	  vnode.patchFlag !== 32) {
	    currentBlock.push(vnode);
	  }
	  return vnode;
	}
	const createVNode = _createVNode;
	function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
	  if (!type || type === NULL_DYNAMIC_COMPONENT) {
	    type = Comment;
	  }
	  if (isVNode(type)) {
	    const cloned = cloneVNode(
	      type,
	      props,
	      true
	      /* mergeRef: true */
	    );
	    if (children) {
	      normalizeChildren(cloned, children);
	    }
	    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
	      if (cloned.shapeFlag & 6) {
	        currentBlock[currentBlock.indexOf(type)] = cloned;
	      } else {
	        currentBlock.push(cloned);
	      }
	    }
	    cloned.patchFlag = -2;
	    return cloned;
	  }
	  if (isClassComponent(type)) {
	    type = type.__vccOpts;
	  }
	  if (props) {
	    props = guardReactiveProps(props);
	    let { class: klass, style } = props;
	    if (klass && !shared.isString(klass)) {
	      props.class = shared.normalizeClass(klass);
	    }
	    if (shared.isObject(style)) {
	      if (reactivity.isProxy(style) && !shared.isArray(style)) {
	        style = shared.extend({}, style);
	      }
	      props.style = shared.normalizeStyle(style);
	    }
	  }
	  const shapeFlag = shared.isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : shared.isObject(type) ? 4 : shared.isFunction(type) ? 2 : 0;
	  return createBaseVNode(
	    type,
	    props,
	    children,
	    patchFlag,
	    dynamicProps,
	    shapeFlag,
	    isBlockNode,
	    true
	  );
	}
	function guardReactiveProps(props) {
	  if (!props) return null;
	  return reactivity.isProxy(props) || isInternalObject(props) ? shared.extend({}, props) : props;
	}
	function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
	  const { props, ref, patchFlag, children, transition } = vnode;
	  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
	  const cloned = {
	    __v_isVNode: true,
	    __v_skip: true,
	    type: vnode.type,
	    props: mergedProps,
	    key: mergedProps && normalizeKey(mergedProps),
	    ref: extraProps && extraProps.ref ? (
	      // #2078 in the case of <component :is="vnode" ref="extra"/>
	      // if the vnode itself already has a ref, cloneVNode will need to merge
	      // the refs so the single vnode can be set on multiple refs
	      mergeRef && ref ? shared.isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps)
	    ) : ref,
	    scopeId: vnode.scopeId,
	    slotScopeIds: vnode.slotScopeIds,
	    children: children,
	    target: vnode.target,
	    targetStart: vnode.targetStart,
	    targetAnchor: vnode.targetAnchor,
	    staticCount: vnode.staticCount,
	    shapeFlag: vnode.shapeFlag,
	    // if the vnode is cloned with extra props, we can no longer assume its
	    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
	    // note: preserve flag for fragments since they use the flag for children
	    // fast paths only.
	    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
	    dynamicProps: vnode.dynamicProps,
	    dynamicChildren: vnode.dynamicChildren,
	    appContext: vnode.appContext,
	    dirs: vnode.dirs,
	    transition,
	    // These should technically only be non-null on mounted VNodes. However,
	    // they *should* be copied for kept-alive vnodes. So we just always copy
	    // them since them being non-null during a mount doesn't affect the logic as
	    // they will simply be overwritten.
	    component: vnode.component,
	    suspense: vnode.suspense,
	    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
	    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
	    placeholder: vnode.placeholder,
	    el: vnode.el,
	    anchor: vnode.anchor,
	    ctx: vnode.ctx,
	    ce: vnode.ce
	  };
	  if (transition && cloneTransition) {
	    setTransitionHooks(
	      cloned,
	      transition.clone(cloned)
	    );
	  }
	  return cloned;
	}
	function createTextVNode(text = " ", flag = 0) {
	  return createVNode(Text, null, text, flag);
	}
	function createStaticVNode(content, numberOfNodes) {
	  const vnode = createVNode(Static, null, content);
	  vnode.staticCount = numberOfNodes;
	  return vnode;
	}
	function createCommentVNode(text = "", asBlock = false) {
	  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
	}
	function normalizeVNode(child) {
	  if (child == null || typeof child === "boolean") {
	    return createVNode(Comment);
	  } else if (shared.isArray(child)) {
	    return createVNode(
	      Fragment,
	      null,
	      // #3666, avoid reference pollution when reusing vnode
	      child.slice()
	    );
	  } else if (isVNode(child)) {
	    return cloneIfMounted(child);
	  } else {
	    return createVNode(Text, null, String(child));
	  }
	}
	function cloneIfMounted(child) {
	  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
	}
	function normalizeChildren(vnode, children) {
	  let type = 0;
	  const { shapeFlag } = vnode;
	  if (children == null) {
	    children = null;
	  } else if (shared.isArray(children)) {
	    type = 16;
	  } else if (typeof children === "object") {
	    if (shapeFlag & (1 | 64)) {
	      const slot = children.default;
	      if (slot) {
	        slot._c && (slot._d = false);
	        normalizeChildren(vnode, slot());
	        slot._c && (slot._d = true);
	      }
	      return;
	    } else {
	      type = 32;
	      const slotFlag = children._;
	      if (!slotFlag && !isInternalObject(children)) {
	        children._ctx = currentRenderingInstance;
	      } else if (slotFlag === 3 && currentRenderingInstance) {
	        if (currentRenderingInstance.slots._ === 1) {
	          children._ = 1;
	        } else {
	          children._ = 2;
	          vnode.patchFlag |= 1024;
	        }
	      }
	    }
	  } else if (shared.isFunction(children)) {
	    children = { default: children, _ctx: currentRenderingInstance };
	    type = 32;
	  } else {
	    children = String(children);
	    if (shapeFlag & 64) {
	      type = 16;
	      children = [createTextVNode(children)];
	    } else {
	      type = 8;
	    }
	  }
	  vnode.children = children;
	  vnode.shapeFlag |= type;
	}
	function mergeProps(...args) {
	  const ret = {};
	  for (let i = 0; i < args.length; i++) {
	    const toMerge = args[i];
	    for (const key in toMerge) {
	      if (key === "class") {
	        if (ret.class !== toMerge.class) {
	          ret.class = shared.normalizeClass([ret.class, toMerge.class]);
	        }
	      } else if (key === "style") {
	        ret.style = shared.normalizeStyle([ret.style, toMerge.style]);
	      } else if (shared.isOn(key)) {
	        const existing = ret[key];
	        const incoming = toMerge[key];
	        if (incoming && existing !== incoming && !(shared.isArray(existing) && existing.includes(incoming))) {
	          ret[key] = existing ? [].concat(existing, incoming) : incoming;
	        }
	      } else if (key !== "") {
	        ret[key] = toMerge[key];
	      }
	    }
	  }
	  return ret;
	}
	function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
	  callWithAsyncErrorHandling(hook, instance, 7, [
	    vnode,
	    prevVNode
	  ]);
	}

	const emptyAppContext = createAppContext();
	let uid = 0;
	function createComponentInstance(vnode, parent, suspense) {
	  const type = vnode.type;
	  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
	  const instance = {
	    uid: uid++,
	    vnode,
	    type,
	    parent,
	    appContext,
	    root: null,
	    // to be immediately set
	    next: null,
	    subTree: null,
	    // will be set synchronously right after creation
	    effect: null,
	    update: null,
	    // will be set synchronously right after creation
	    job: null,
	    scope: new reactivity.EffectScope(
	      true
	      /* detached */
	    ),
	    render: null,
	    proxy: null,
	    exposed: null,
	    exposeProxy: null,
	    withProxy: null,
	    provides: parent ? parent.provides : Object.create(appContext.provides),
	    ids: parent ? parent.ids : ["", 0, 0],
	    accessCache: null,
	    renderCache: [],
	    // local resolved assets
	    components: null,
	    directives: null,
	    // resolved props and emits options
	    propsOptions: normalizePropsOptions(type, appContext),
	    emitsOptions: normalizeEmitsOptions(type, appContext),
	    // emit
	    emit: null,
	    // to be set immediately
	    emitted: null,
	    // props default value
	    propsDefaults: shared.EMPTY_OBJ,
	    // inheritAttrs
	    inheritAttrs: type.inheritAttrs,
	    // state
	    ctx: shared.EMPTY_OBJ,
	    data: shared.EMPTY_OBJ,
	    props: shared.EMPTY_OBJ,
	    attrs: shared.EMPTY_OBJ,
	    slots: shared.EMPTY_OBJ,
	    refs: shared.EMPTY_OBJ,
	    setupState: shared.EMPTY_OBJ,
	    setupContext: null,
	    // suspense related
	    suspense,
	    suspenseId: suspense ? suspense.pendingId : 0,
	    asyncDep: null,
	    asyncResolved: false,
	    // lifecycle hooks
	    // not using enums here because it results in computed properties
	    isMounted: false,
	    isUnmounted: false,
	    isDeactivated: false,
	    bc: null,
	    c: null,
	    bm: null,
	    m: null,
	    bu: null,
	    u: null,
	    um: null,
	    bum: null,
	    da: null,
	    a: null,
	    rtg: null,
	    rtc: null,
	    ec: null,
	    sp: null
	  };
	  {
	    instance.ctx = { _: instance };
	  }
	  instance.root = parent ? parent.root : instance;
	  instance.emit = emit.bind(null, instance);
	  if (vnode.ce) {
	    vnode.ce(instance);
	  }
	  return instance;
	}
	let currentInstance = null;
	const getCurrentInstance = () => currentInstance || currentRenderingInstance;
	let internalSetCurrentInstance;
	let setInSSRSetupState;
	{
	  const g = shared.getGlobalThis();
	  const registerGlobalSetter = (key, setter) => {
	    let setters;
	    if (!(setters = g[key])) setters = g[key] = [];
	    setters.push(setter);
	    return (v) => {
	      if (setters.length > 1) setters.forEach((set) => set(v));
	      else setters[0](v);
	    };
	  };
	  internalSetCurrentInstance = registerGlobalSetter(
	    `__VUE_INSTANCE_SETTERS__`,
	    (v) => currentInstance = v
	  );
	  setInSSRSetupState = registerGlobalSetter(
	    `__VUE_SSR_SETTERS__`,
	    (v) => isInSSRComponentSetup = v
	  );
	}
	const setCurrentInstance = (instance) => {
	  const prev = currentInstance;
	  internalSetCurrentInstance(instance);
	  instance.scope.on();
	  return () => {
	    instance.scope.off();
	    internalSetCurrentInstance(prev);
	  };
	};
	const unsetCurrentInstance = () => {
	  currentInstance && currentInstance.scope.off();
	  internalSetCurrentInstance(null);
	};
	function isStatefulComponent(instance) {
	  return instance.vnode.shapeFlag & 4;
	}
	let isInSSRComponentSetup = false;
	function setupComponent(instance, isSSR = false, optimized = false) {
	  isSSR && setInSSRSetupState(isSSR);
	  const { props, children } = instance.vnode;
	  const isStateful = isStatefulComponent(instance);
	  initProps(instance, props, isStateful, isSSR);
	  initSlots(instance, children, optimized || isSSR);
	  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
	  isSSR && setInSSRSetupState(false);
	  return setupResult;
	}
	function setupStatefulComponent(instance, isSSR) {
	  const Component = instance.type;
	  instance.accessCache = /* @__PURE__ */ Object.create(null);
	  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
	  const { setup } = Component;
	  if (setup) {
	    reactivity.pauseTracking();
	    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
	    const reset = setCurrentInstance(instance);
	    const setupResult = callWithErrorHandling(
	      setup,
	      instance,
	      0,
	      [
	        instance.props,
	        setupContext
	      ]
	    );
	    const isAsyncSetup = shared.isPromise(setupResult);
	    reactivity.resetTracking();
	    reset();
	    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
	      markAsyncBoundary(instance);
	    }
	    if (isAsyncSetup) {
	      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
	      if (isSSR) {
	        return setupResult.then((resolvedResult) => {
	          handleSetupResult(instance, resolvedResult, isSSR);
	        }).catch((e) => {
	          handleError(e, instance, 0);
	        });
	      } else {
	        instance.asyncDep = setupResult;
	      }
	    } else {
	      handleSetupResult(instance, setupResult, isSSR);
	    }
	  } else {
	    finishComponentSetup(instance, isSSR);
	  }
	}
	function handleSetupResult(instance, setupResult, isSSR) {
	  if (shared.isFunction(setupResult)) {
	    if (instance.type.__ssrInlineRender) {
	      instance.ssrRender = setupResult;
	    } else {
	      instance.render = setupResult;
	    }
	  } else if (shared.isObject(setupResult)) {
	    instance.setupState = reactivity.proxyRefs(setupResult);
	  } else ;
	  finishComponentSetup(instance, isSSR);
	}
	let compile;
	let installWithProxy;
	function registerRuntimeCompiler(_compile) {
	  compile = _compile;
	  installWithProxy = (i) => {
	    if (i.render._rc) {
	      i.withProxy = new Proxy(i.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
	    }
	  };
	}
	const isRuntimeOnly = () => !compile;
	function finishComponentSetup(instance, isSSR, skipOptions) {
	  const Component = instance.type;
	  if (!instance.render) {
	    if (!isSSR && compile && !Component.render) {
	      const template = Component.template || resolveMergedOptions(instance).template;
	      if (template) {
	        const { isCustomElement, compilerOptions } = instance.appContext.config;
	        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
	        const finalCompilerOptions = shared.extend(
	          shared.extend(
	            {
	              isCustomElement,
	              delimiters
	            },
	            compilerOptions
	          ),
	          componentCompilerOptions
	        );
	        Component.render = compile(template, finalCompilerOptions);
	      }
	    }
	    instance.render = Component.render || shared.NOOP;
	    if (installWithProxy) {
	      installWithProxy(instance);
	    }
	  }
	  {
	    const reset = setCurrentInstance(instance);
	    reactivity.pauseTracking();
	    try {
	      applyOptions(instance);
	    } finally {
	      reactivity.resetTracking();
	      reset();
	    }
	  }
	}
	const attrsProxyHandlers = {
	  get(target, key) {
	    reactivity.track(target, "get", "");
	    return target[key];
	  }
	};
	function createSetupContext(instance) {
	  const expose = (exposed) => {
	    instance.exposed = exposed || {};
	  };
	  {
	    return {
	      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
	      slots: instance.slots,
	      emit: instance.emit,
	      expose
	    };
	  }
	}
	function getComponentPublicInstance(instance) {
	  if (instance.exposed) {
	    return instance.exposeProxy || (instance.exposeProxy = new Proxy(reactivity.proxyRefs(reactivity.markRaw(instance.exposed)), {
	      get(target, key) {
	        if (key in target) {
	          return target[key];
	        } else if (key in publicPropertiesMap) {
	          return publicPropertiesMap[key](instance);
	        }
	      },
	      has(target, key) {
	        return key in target || key in publicPropertiesMap;
	      }
	    }));
	  } else {
	    return instance.proxy;
	  }
	}
	function getComponentName(Component, includeInferred = true) {
	  return shared.isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
	}
	function isClassComponent(value) {
	  return shared.isFunction(value) && "__vccOpts" in value;
	}

	const computed = (getterOrOptions, debugOptions) => {
	  const c = reactivity.computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
	  return c;
	};

	function h(type, propsOrChildren, children) {
	  const l = arguments.length;
	  if (l === 2) {
	    if (shared.isObject(propsOrChildren) && !shared.isArray(propsOrChildren)) {
	      if (isVNode(propsOrChildren)) {
	        return createVNode(type, null, [propsOrChildren]);
	      }
	      return createVNode(type, propsOrChildren);
	    } else {
	      return createVNode(type, null, propsOrChildren);
	    }
	  } else {
	    if (l > 3) {
	      children = Array.prototype.slice.call(arguments, 2);
	    } else if (l === 3 && isVNode(children)) {
	      children = [children];
	    }
	    return createVNode(type, propsOrChildren, children);
	  }
	}

	function initCustomFormatter() {
	  {
	    return;
	  }
	}

	function withMemo(memo, render, cache, index) {
	  const cached = cache[index];
	  if (cached && isMemoSame(cached, memo)) {
	    return cached;
	  }
	  const ret = render();
	  ret.memo = memo.slice();
	  ret.cacheIndex = index;
	  return cache[index] = ret;
	}
	function isMemoSame(cached, memo) {
	  const prev = cached.memo;
	  if (prev.length != memo.length) {
	    return false;
	  }
	  for (let i = 0; i < prev.length; i++) {
	    if (shared.hasChanged(prev[i], memo[i])) {
	      return false;
	    }
	  }
	  if (isBlockTreeEnabled > 0 && currentBlock) {
	    currentBlock.push(cached);
	  }
	  return true;
	}

	const version = "3.5.18";
	const warn$1 = shared.NOOP;
	const ErrorTypeStrings = ErrorTypeStrings$1 ;
	const devtools = void 0;
	const setDevtoolsHook = shared.NOOP;
	const _ssrUtils = {
	  createComponentInstance,
	  setupComponent,
	  renderComponentRoot,
	  setCurrentRenderingInstance,
	  isVNode: isVNode,
	  normalizeVNode,
	  getComponentPublicInstance,
	  ensureValidVNode,
	  pushWarningContext,
	  popWarningContext
	};
	const ssrUtils = _ssrUtils ;
	const resolveFilter = null;
	const compatUtils = null;
	const DeprecationTypes = null;

	runtimeCore_cjs_prod.EffectScope = reactivity.EffectScope;
	runtimeCore_cjs_prod.ReactiveEffect = reactivity.ReactiveEffect;
	runtimeCore_cjs_prod.TrackOpTypes = reactivity.TrackOpTypes;
	runtimeCore_cjs_prod.TriggerOpTypes = reactivity.TriggerOpTypes;
	runtimeCore_cjs_prod.customRef = reactivity.customRef;
	runtimeCore_cjs_prod.effect = reactivity.effect;
	runtimeCore_cjs_prod.effectScope = reactivity.effectScope;
	runtimeCore_cjs_prod.getCurrentScope = reactivity.getCurrentScope;
	runtimeCore_cjs_prod.getCurrentWatcher = reactivity.getCurrentWatcher;
	runtimeCore_cjs_prod.isProxy = reactivity.isProxy;
	runtimeCore_cjs_prod.isReactive = reactivity.isReactive;
	runtimeCore_cjs_prod.isReadonly = reactivity.isReadonly;
	runtimeCore_cjs_prod.isRef = reactivity.isRef;
	runtimeCore_cjs_prod.isShallow = reactivity.isShallow;
	runtimeCore_cjs_prod.markRaw = reactivity.markRaw;
	runtimeCore_cjs_prod.onScopeDispose = reactivity.onScopeDispose;
	runtimeCore_cjs_prod.onWatcherCleanup = reactivity.onWatcherCleanup;
	runtimeCore_cjs_prod.proxyRefs = reactivity.proxyRefs;
	runtimeCore_cjs_prod.reactive = reactivity.reactive;
	runtimeCore_cjs_prod.readonly = reactivity.readonly;
	runtimeCore_cjs_prod.ref = reactivity.ref;
	runtimeCore_cjs_prod.shallowReactive = reactivity.shallowReactive;
	runtimeCore_cjs_prod.shallowReadonly = reactivity.shallowReadonly;
	runtimeCore_cjs_prod.shallowRef = reactivity.shallowRef;
	runtimeCore_cjs_prod.stop = reactivity.stop;
	runtimeCore_cjs_prod.toRaw = reactivity.toRaw;
	runtimeCore_cjs_prod.toRef = reactivity.toRef;
	runtimeCore_cjs_prod.toRefs = reactivity.toRefs;
	runtimeCore_cjs_prod.toValue = reactivity.toValue;
	runtimeCore_cjs_prod.triggerRef = reactivity.triggerRef;
	runtimeCore_cjs_prod.unref = reactivity.unref;
	runtimeCore_cjs_prod.camelize = shared.camelize;
	runtimeCore_cjs_prod.capitalize = shared.capitalize;
	runtimeCore_cjs_prod.normalizeClass = shared.normalizeClass;
	runtimeCore_cjs_prod.normalizeProps = shared.normalizeProps;
	runtimeCore_cjs_prod.normalizeStyle = shared.normalizeStyle;
	runtimeCore_cjs_prod.toDisplayString = shared.toDisplayString;
	runtimeCore_cjs_prod.toHandlerKey = shared.toHandlerKey;
	runtimeCore_cjs_prod.BaseTransition = BaseTransition;
	runtimeCore_cjs_prod.BaseTransitionPropsValidators = BaseTransitionPropsValidators;
	runtimeCore_cjs_prod.Comment = Comment;
	runtimeCore_cjs_prod.DeprecationTypes = DeprecationTypes;
	runtimeCore_cjs_prod.ErrorCodes = ErrorCodes;
	runtimeCore_cjs_prod.ErrorTypeStrings = ErrorTypeStrings;
	runtimeCore_cjs_prod.Fragment = Fragment;
	runtimeCore_cjs_prod.KeepAlive = KeepAlive;
	runtimeCore_cjs_prod.Static = Static;
	runtimeCore_cjs_prod.Suspense = Suspense;
	runtimeCore_cjs_prod.Teleport = Teleport;
	runtimeCore_cjs_prod.Text = Text;
	runtimeCore_cjs_prod.assertNumber = assertNumber;
	runtimeCore_cjs_prod.callWithAsyncErrorHandling = callWithAsyncErrorHandling;
	runtimeCore_cjs_prod.callWithErrorHandling = callWithErrorHandling;
	runtimeCore_cjs_prod.cloneVNode = cloneVNode;
	runtimeCore_cjs_prod.compatUtils = compatUtils;
	runtimeCore_cjs_prod.computed = computed;
	runtimeCore_cjs_prod.createBlock = createBlock;
	runtimeCore_cjs_prod.createCommentVNode = createCommentVNode;
	runtimeCore_cjs_prod.createElementBlock = createElementBlock;
	runtimeCore_cjs_prod.createElementVNode = createBaseVNode;
	runtimeCore_cjs_prod.createHydrationRenderer = createHydrationRenderer;
	runtimeCore_cjs_prod.createPropsRestProxy = createPropsRestProxy;
	runtimeCore_cjs_prod.createRenderer = createRenderer;
	runtimeCore_cjs_prod.createSlots = createSlots;
	runtimeCore_cjs_prod.createStaticVNode = createStaticVNode;
	runtimeCore_cjs_prod.createTextVNode = createTextVNode;
	runtimeCore_cjs_prod.createVNode = createVNode;
	runtimeCore_cjs_prod.defineAsyncComponent = defineAsyncComponent;
	runtimeCore_cjs_prod.defineComponent = defineComponent;
	runtimeCore_cjs_prod.defineEmits = defineEmits;
	runtimeCore_cjs_prod.defineExpose = defineExpose;
	runtimeCore_cjs_prod.defineModel = defineModel;
	runtimeCore_cjs_prod.defineOptions = defineOptions;
	runtimeCore_cjs_prod.defineProps = defineProps;
	runtimeCore_cjs_prod.defineSlots = defineSlots;
	runtimeCore_cjs_prod.devtools = devtools;
	runtimeCore_cjs_prod.getCurrentInstance = getCurrentInstance;
	runtimeCore_cjs_prod.getTransitionRawChildren = getTransitionRawChildren;
	runtimeCore_cjs_prod.guardReactiveProps = guardReactiveProps;
	runtimeCore_cjs_prod.h = h;
	runtimeCore_cjs_prod.handleError = handleError;
	runtimeCore_cjs_prod.hasInjectionContext = hasInjectionContext;
	runtimeCore_cjs_prod.hydrateOnIdle = hydrateOnIdle;
	runtimeCore_cjs_prod.hydrateOnInteraction = hydrateOnInteraction;
	runtimeCore_cjs_prod.hydrateOnMediaQuery = hydrateOnMediaQuery;
	runtimeCore_cjs_prod.hydrateOnVisible = hydrateOnVisible;
	runtimeCore_cjs_prod.initCustomFormatter = initCustomFormatter;
	runtimeCore_cjs_prod.inject = inject;
	runtimeCore_cjs_prod.isMemoSame = isMemoSame;
	runtimeCore_cjs_prod.isRuntimeOnly = isRuntimeOnly;
	runtimeCore_cjs_prod.isVNode = isVNode;
	runtimeCore_cjs_prod.mergeDefaults = mergeDefaults;
	runtimeCore_cjs_prod.mergeModels = mergeModels;
	runtimeCore_cjs_prod.mergeProps = mergeProps;
	runtimeCore_cjs_prod.nextTick = nextTick;
	runtimeCore_cjs_prod.onActivated = onActivated;
	runtimeCore_cjs_prod.onBeforeMount = onBeforeMount;
	runtimeCore_cjs_prod.onBeforeUnmount = onBeforeUnmount;
	runtimeCore_cjs_prod.onBeforeUpdate = onBeforeUpdate;
	runtimeCore_cjs_prod.onDeactivated = onDeactivated;
	runtimeCore_cjs_prod.onErrorCaptured = onErrorCaptured;
	runtimeCore_cjs_prod.onMounted = onMounted;
	runtimeCore_cjs_prod.onRenderTracked = onRenderTracked;
	runtimeCore_cjs_prod.onRenderTriggered = onRenderTriggered;
	runtimeCore_cjs_prod.onServerPrefetch = onServerPrefetch;
	runtimeCore_cjs_prod.onUnmounted = onUnmounted;
	runtimeCore_cjs_prod.onUpdated = onUpdated;
	runtimeCore_cjs_prod.openBlock = openBlock;
	runtimeCore_cjs_prod.popScopeId = popScopeId;
	runtimeCore_cjs_prod.provide = provide;
	runtimeCore_cjs_prod.pushScopeId = pushScopeId;
	runtimeCore_cjs_prod.queuePostFlushCb = queuePostFlushCb;
	runtimeCore_cjs_prod.registerRuntimeCompiler = registerRuntimeCompiler;
	runtimeCore_cjs_prod.renderList = renderList;
	runtimeCore_cjs_prod.renderSlot = renderSlot;
	runtimeCore_cjs_prod.resolveComponent = resolveComponent;
	runtimeCore_cjs_prod.resolveDirective = resolveDirective;
	runtimeCore_cjs_prod.resolveDynamicComponent = resolveDynamicComponent;
	runtimeCore_cjs_prod.resolveFilter = resolveFilter;
	runtimeCore_cjs_prod.resolveTransitionHooks = resolveTransitionHooks;
	runtimeCore_cjs_prod.setBlockTracking = setBlockTracking;
	runtimeCore_cjs_prod.setDevtoolsHook = setDevtoolsHook;
	runtimeCore_cjs_prod.setTransitionHooks = setTransitionHooks;
	runtimeCore_cjs_prod.ssrContextKey = ssrContextKey;
	runtimeCore_cjs_prod.ssrUtils = ssrUtils;
	runtimeCore_cjs_prod.toHandlers = toHandlers;
	runtimeCore_cjs_prod.transformVNodeArgs = transformVNodeArgs;
	runtimeCore_cjs_prod.useAttrs = useAttrs;
	runtimeCore_cjs_prod.useId = useId;
	runtimeCore_cjs_prod.useModel = useModel;
	runtimeCore_cjs_prod.useSSRContext = useSSRContext;
	runtimeCore_cjs_prod.useSlots = useSlots;
	runtimeCore_cjs_prod.useTemplateRef = useTemplateRef;
	runtimeCore_cjs_prod.useTransitionState = useTransitionState;
	runtimeCore_cjs_prod.version = version;
	runtimeCore_cjs_prod.warn = warn$1;
	runtimeCore_cjs_prod.watch = watch;
	runtimeCore_cjs_prod.watchEffect = watchEffect;
	runtimeCore_cjs_prod.watchPostEffect = watchPostEffect;
	runtimeCore_cjs_prod.watchSyncEffect = watchSyncEffect;
	runtimeCore_cjs_prod.withAsyncContext = withAsyncContext;
	runtimeCore_cjs_prod.withCtx = withCtx;
	runtimeCore_cjs_prod.withDefaults = withDefaults;
	runtimeCore_cjs_prod.withDirectives = withDirectives;
	runtimeCore_cjs_prod.withMemo = withMemo;
	runtimeCore_cjs_prod.withScopeId = withScopeId;
	return runtimeCore_cjs_prod;
}

/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/

var hasRequiredRuntimeDom_cjs_prod;

function requireRuntimeDom_cjs_prod () {
	if (hasRequiredRuntimeDom_cjs_prod) return runtimeDom_cjs_prod;
	hasRequiredRuntimeDom_cjs_prod = 1;
	(function (exports) {

		Object.defineProperty(exports, '__esModule', { value: true });

		var runtimeCore = /*@__PURE__*/ requireRuntimeCore_cjs_prod();
		var shared = /*@__PURE__*/ requireShared_cjs_prod();

		let policy = void 0;
		const tt = typeof window !== "undefined" && window.trustedTypes;
		if (tt) {
		  try {
		    policy = /* @__PURE__ */ tt.createPolicy("vue", {
		      createHTML: (val) => val
		    });
		  } catch (e) {
		  }
		}
		const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
		const svgNS = "http://www.w3.org/2000/svg";
		const mathmlNS = "http://www.w3.org/1998/Math/MathML";
		const doc = typeof document !== "undefined" ? document : null;
		const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
		const nodeOps = {
		  insert: (child, parent, anchor) => {
		    parent.insertBefore(child, anchor || null);
		  },
		  remove: (child) => {
		    const parent = child.parentNode;
		    if (parent) {
		      parent.removeChild(child);
		    }
		  },
		  createElement: (tag, namespace, is, props) => {
		    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
		    if (tag === "select" && props && props.multiple != null) {
		      el.setAttribute("multiple", props.multiple);
		    }
		    return el;
		  },
		  createText: (text) => doc.createTextNode(text),
		  createComment: (text) => doc.createComment(text),
		  setText: (node, text) => {
		    node.nodeValue = text;
		  },
		  setElementText: (el, text) => {
		    el.textContent = text;
		  },
		  parentNode: (node) => node.parentNode,
		  nextSibling: (node) => node.nextSibling,
		  querySelector: (selector) => doc.querySelector(selector),
		  setScopeId(el, id) {
		    el.setAttribute(id, "");
		  },
		  // __UNSAFE__
		  // Reason: innerHTML.
		  // Static content here can only come from compiled templates.
		  // As long as the user only uses trusted templates, this is safe.
		  insertStaticContent(content, parent, anchor, namespace, start, end) {
		    const before = anchor ? anchor.previousSibling : parent.lastChild;
		    if (start && (start === end || start.nextSibling)) {
		      while (true) {
		        parent.insertBefore(start.cloneNode(true), anchor);
		        if (start === end || !(start = start.nextSibling)) break;
		      }
		    } else {
		      templateContainer.innerHTML = unsafeToTrustedHTML(
		        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
		      );
		      const template = templateContainer.content;
		      if (namespace === "svg" || namespace === "mathml") {
		        const wrapper = template.firstChild;
		        while (wrapper.firstChild) {
		          template.appendChild(wrapper.firstChild);
		        }
		        template.removeChild(wrapper);
		      }
		      parent.insertBefore(template, anchor);
		    }
		    return [
		      // first
		      before ? before.nextSibling : parent.firstChild,
		      // last
		      anchor ? anchor.previousSibling : parent.lastChild
		    ];
		  }
		};

		const TRANSITION = "transition";
		const ANIMATION = "animation";
		const vtcKey = Symbol("_vtc");
		const DOMTransitionPropsValidators = {
		  name: String,
		  type: String,
		  css: {
		    type: Boolean,
		    default: true
		  },
		  duration: [String, Number, Object],
		  enterFromClass: String,
		  enterActiveClass: String,
		  enterToClass: String,
		  appearFromClass: String,
		  appearActiveClass: String,
		  appearToClass: String,
		  leaveFromClass: String,
		  leaveActiveClass: String,
		  leaveToClass: String
		};
		const TransitionPropsValidators = /* @__PURE__ */ shared.extend(
		  {},
		  runtimeCore.BaseTransitionPropsValidators,
		  DOMTransitionPropsValidators
		);
		const decorate$1 = (t) => {
		  t.displayName = "Transition";
		  t.props = TransitionPropsValidators;
		  return t;
		};
		const Transition = /* @__PURE__ */ decorate$1(
		  (props, { slots }) => runtimeCore.h(runtimeCore.BaseTransition, resolveTransitionProps(props), slots)
		);
		const callHook = (hook, args = []) => {
		  if (shared.isArray(hook)) {
		    hook.forEach((h2) => h2(...args));
		  } else if (hook) {
		    hook(...args);
		  }
		};
		const hasExplicitCallback = (hook) => {
		  return hook ? shared.isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
		};
		function resolveTransitionProps(rawProps) {
		  const baseProps = {};
		  for (const key in rawProps) {
		    if (!(key in DOMTransitionPropsValidators)) {
		      baseProps[key] = rawProps[key];
		    }
		  }
		  if (rawProps.css === false) {
		    return baseProps;
		  }
		  const {
		    name = "v",
		    type,
		    duration,
		    enterFromClass = `${name}-enter-from`,
		    enterActiveClass = `${name}-enter-active`,
		    enterToClass = `${name}-enter-to`,
		    appearFromClass = enterFromClass,
		    appearActiveClass = enterActiveClass,
		    appearToClass = enterToClass,
		    leaveFromClass = `${name}-leave-from`,
		    leaveActiveClass = `${name}-leave-active`,
		    leaveToClass = `${name}-leave-to`
		  } = rawProps;
		  const durations = normalizeDuration(duration);
		  const enterDuration = durations && durations[0];
		  const leaveDuration = durations && durations[1];
		  const {
		    onBeforeEnter,
		    onEnter,
		    onEnterCancelled,
		    onLeave,
		    onLeaveCancelled,
		    onBeforeAppear = onBeforeEnter,
		    onAppear = onEnter,
		    onAppearCancelled = onEnterCancelled
		  } = baseProps;
		  const finishEnter = (el, isAppear, done, isCancelled) => {
		    el._enterCancelled = isCancelled;
		    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
		    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
		    done && done();
		  };
		  const finishLeave = (el, done) => {
		    el._isLeaving = false;
		    removeTransitionClass(el, leaveFromClass);
		    removeTransitionClass(el, leaveToClass);
		    removeTransitionClass(el, leaveActiveClass);
		    done && done();
		  };
		  const makeEnterHook = (isAppear) => {
		    return (el, done) => {
		      const hook = isAppear ? onAppear : onEnter;
		      const resolve = () => finishEnter(el, isAppear, done);
		      callHook(hook, [el, resolve]);
		      nextFrame(() => {
		        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
		        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
		        if (!hasExplicitCallback(hook)) {
		          whenTransitionEnds(el, type, enterDuration, resolve);
		        }
		      });
		    };
		  };
		  return shared.extend(baseProps, {
		    onBeforeEnter(el) {
		      callHook(onBeforeEnter, [el]);
		      addTransitionClass(el, enterFromClass);
		      addTransitionClass(el, enterActiveClass);
		    },
		    onBeforeAppear(el) {
		      callHook(onBeforeAppear, [el]);
		      addTransitionClass(el, appearFromClass);
		      addTransitionClass(el, appearActiveClass);
		    },
		    onEnter: makeEnterHook(false),
		    onAppear: makeEnterHook(true),
		    onLeave(el, done) {
		      el._isLeaving = true;
		      const resolve = () => finishLeave(el, done);
		      addTransitionClass(el, leaveFromClass);
		      if (!el._enterCancelled) {
		        forceReflow();
		        addTransitionClass(el, leaveActiveClass);
		      } else {
		        addTransitionClass(el, leaveActiveClass);
		        forceReflow();
		      }
		      nextFrame(() => {
		        if (!el._isLeaving) {
		          return;
		        }
		        removeTransitionClass(el, leaveFromClass);
		        addTransitionClass(el, leaveToClass);
		        if (!hasExplicitCallback(onLeave)) {
		          whenTransitionEnds(el, type, leaveDuration, resolve);
		        }
		      });
		      callHook(onLeave, [el, resolve]);
		    },
		    onEnterCancelled(el) {
		      finishEnter(el, false, void 0, true);
		      callHook(onEnterCancelled, [el]);
		    },
		    onAppearCancelled(el) {
		      finishEnter(el, true, void 0, true);
		      callHook(onAppearCancelled, [el]);
		    },
		    onLeaveCancelled(el) {
		      finishLeave(el);
		      callHook(onLeaveCancelled, [el]);
		    }
		  });
		}
		function normalizeDuration(duration) {
		  if (duration == null) {
		    return null;
		  } else if (shared.isObject(duration)) {
		    return [NumberOf(duration.enter), NumberOf(duration.leave)];
		  } else {
		    const n = NumberOf(duration);
		    return [n, n];
		  }
		}
		function NumberOf(val) {
		  const res = shared.toNumber(val);
		  return res;
		}
		function addTransitionClass(el, cls) {
		  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
		  (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
		}
		function removeTransitionClass(el, cls) {
		  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
		  const _vtc = el[vtcKey];
		  if (_vtc) {
		    _vtc.delete(cls);
		    if (!_vtc.size) {
		      el[vtcKey] = void 0;
		    }
		  }
		}
		function nextFrame(cb) {
		  requestAnimationFrame(() => {
		    requestAnimationFrame(cb);
		  });
		}
		let endId = 0;
		function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
		  const id = el._endId = ++endId;
		  const resolveIfNotStale = () => {
		    if (id === el._endId) {
		      resolve();
		    }
		  };
		  if (explicitTimeout != null) {
		    return setTimeout(resolveIfNotStale, explicitTimeout);
		  }
		  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
		  if (!type) {
		    return resolve();
		  }
		  const endEvent = type + "end";
		  let ended = 0;
		  const end = () => {
		    el.removeEventListener(endEvent, onEnd);
		    resolveIfNotStale();
		  };
		  const onEnd = (e) => {
		    if (e.target === el && ++ended >= propCount) {
		      end();
		    }
		  };
		  setTimeout(() => {
		    if (ended < propCount) {
		      end();
		    }
		  }, timeout + 1);
		  el.addEventListener(endEvent, onEnd);
		}
		function getTransitionInfo(el, expectedType) {
		  const styles = window.getComputedStyle(el);
		  const getStyleProperties = (key) => (styles[key] || "").split(", ");
		  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
		  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
		  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
		  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
		  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
		  const animationTimeout = getTimeout(animationDelays, animationDurations);
		  let type = null;
		  let timeout = 0;
		  let propCount = 0;
		  if (expectedType === TRANSITION) {
		    if (transitionTimeout > 0) {
		      type = TRANSITION;
		      timeout = transitionTimeout;
		      propCount = transitionDurations.length;
		    }
		  } else if (expectedType === ANIMATION) {
		    if (animationTimeout > 0) {
		      type = ANIMATION;
		      timeout = animationTimeout;
		      propCount = animationDurations.length;
		    }
		  } else {
		    timeout = Math.max(transitionTimeout, animationTimeout);
		    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
		    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
		  }
		  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(
		    getStyleProperties(`${TRANSITION}Property`).toString()
		  );
		  return {
		    type,
		    timeout,
		    propCount,
		    hasTransform
		  };
		}
		function getTimeout(delays, durations) {
		  while (delays.length < durations.length) {
		    delays = delays.concat(delays);
		  }
		  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
		}
		function toMs(s) {
		  if (s === "auto") return 0;
		  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
		}
		function forceReflow() {
		  return document.body.offsetHeight;
		}

		function patchClass(el, value, isSVG) {
		  const transitionClasses = el[vtcKey];
		  if (transitionClasses) {
		    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
		  }
		  if (value == null) {
		    el.removeAttribute("class");
		  } else if (isSVG) {
		    el.setAttribute("class", value);
		  } else {
		    el.className = value;
		  }
		}

		const vShowOriginalDisplay = Symbol("_vod");
		const vShowHidden = Symbol("_vsh");
		const vShow = {
		  beforeMount(el, { value }, { transition }) {
		    el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
		    if (transition && value) {
		      transition.beforeEnter(el);
		    } else {
		      setDisplay(el, value);
		    }
		  },
		  mounted(el, { value }, { transition }) {
		    if (transition && value) {
		      transition.enter(el);
		    }
		  },
		  updated(el, { value, oldValue }, { transition }) {
		    if (!value === !oldValue) return;
		    if (transition) {
		      if (value) {
		        transition.beforeEnter(el);
		        setDisplay(el, true);
		        transition.enter(el);
		      } else {
		        transition.leave(el, () => {
		          setDisplay(el, false);
		        });
		      }
		    } else {
		      setDisplay(el, value);
		    }
		  },
		  beforeUnmount(el, { value }) {
		    setDisplay(el, value);
		  }
		};
		function setDisplay(el, value) {
		  el.style.display = value ? el[vShowOriginalDisplay] : "none";
		  el[vShowHidden] = !value;
		}
		function initVShowForSSR() {
		  vShow.getSSRProps = ({ value }) => {
		    if (!value) {
		      return { style: { display: "none" } };
		    }
		  };
		}

		const CSS_VAR_TEXT = Symbol("");
		function useCssVars(getter) {
		  return;
		}

		const displayRE = /(^|;)\s*display\s*:/;
		function patchStyle(el, prev, next) {
		  const style = el.style;
		  const isCssString = shared.isString(next);
		  let hasControlledDisplay = false;
		  if (next && !isCssString) {
		    if (prev) {
		      if (!shared.isString(prev)) {
		        for (const key in prev) {
		          if (next[key] == null) {
		            setStyle(style, key, "");
		          }
		        }
		      } else {
		        for (const prevStyle of prev.split(";")) {
		          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
		          if (next[key] == null) {
		            setStyle(style, key, "");
		          }
		        }
		      }
		    }
		    for (const key in next) {
		      if (key === "display") {
		        hasControlledDisplay = true;
		      }
		      setStyle(style, key, next[key]);
		    }
		  } else {
		    if (isCssString) {
		      if (prev !== next) {
		        const cssVarText = style[CSS_VAR_TEXT];
		        if (cssVarText) {
		          next += ";" + cssVarText;
		        }
		        style.cssText = next;
		        hasControlledDisplay = displayRE.test(next);
		      }
		    } else if (prev) {
		      el.removeAttribute("style");
		    }
		  }
		  if (vShowOriginalDisplay in el) {
		    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
		    if (el[vShowHidden]) {
		      style.display = "none";
		    }
		  }
		}
		const importantRE = /\s*!important$/;
		function setStyle(style, name, val) {
		  if (shared.isArray(val)) {
		    val.forEach((v) => setStyle(style, name, v));
		  } else {
		    if (val == null) val = "";
		    if (name.startsWith("--")) {
		      style.setProperty(name, val);
		    } else {
		      const prefixed = autoPrefix(style, name);
		      if (importantRE.test(val)) {
		        style.setProperty(
		          shared.hyphenate(prefixed),
		          val.replace(importantRE, ""),
		          "important"
		        );
		      } else {
		        style[prefixed] = val;
		      }
		    }
		  }
		}
		const prefixes = ["Webkit", "Moz", "ms"];
		const prefixCache = {};
		function autoPrefix(style, rawName) {
		  const cached = prefixCache[rawName];
		  if (cached) {
		    return cached;
		  }
		  let name = runtimeCore.camelize(rawName);
		  if (name !== "filter" && name in style) {
		    return prefixCache[rawName] = name;
		  }
		  name = shared.capitalize(name);
		  for (let i = 0; i < prefixes.length; i++) {
		    const prefixed = prefixes[i] + name;
		    if (prefixed in style) {
		      return prefixCache[rawName] = prefixed;
		    }
		  }
		  return rawName;
		}

		const xlinkNS = "http://www.w3.org/1999/xlink";
		function patchAttr(el, key, value, isSVG, instance, isBoolean = shared.isSpecialBooleanAttr(key)) {
		  if (isSVG && key.startsWith("xlink:")) {
		    if (value == null) {
		      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
		    } else {
		      el.setAttributeNS(xlinkNS, key, value);
		    }
		  } else {
		    if (value == null || isBoolean && !shared.includeBooleanAttr(value)) {
		      el.removeAttribute(key);
		    } else {
		      el.setAttribute(
		        key,
		        isBoolean ? "" : shared.isSymbol(value) ? String(value) : value
		      );
		    }
		  }
		}

		function patchDOMProp(el, key, value, parentComponent, attrName) {
		  if (key === "innerHTML" || key === "textContent") {
		    if (value != null) {
		      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
		    }
		    return;
		  }
		  const tag = el.tagName;
		  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
		  !tag.includes("-")) {
		    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
		    const newValue = value == null ? (
		      // #11647: value should be set as empty string for null and undefined,
		      // but <input type="checkbox"> should be set as 'on'.
		      el.type === "checkbox" ? "on" : ""
		    ) : String(value);
		    if (oldValue !== newValue || !("_value" in el)) {
		      el.value = newValue;
		    }
		    if (value == null) {
		      el.removeAttribute(key);
		    }
		    el._value = value;
		    return;
		  }
		  let needRemove = false;
		  if (value === "" || value == null) {
		    const type = typeof el[key];
		    if (type === "boolean") {
		      value = shared.includeBooleanAttr(value);
		    } else if (value == null && type === "string") {
		      value = "";
		      needRemove = true;
		    } else if (type === "number") {
		      value = 0;
		      needRemove = true;
		    }
		  }
		  try {
		    el[key] = value;
		  } catch (e) {
		  }
		  needRemove && el.removeAttribute(attrName || key);
		}

		function addEventListener(el, event, handler, options) {
		  el.addEventListener(event, handler, options);
		}
		function removeEventListener(el, event, handler, options) {
		  el.removeEventListener(event, handler, options);
		}
		const veiKey = Symbol("_vei");
		function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
		  const invokers = el[veiKey] || (el[veiKey] = {});
		  const existingInvoker = invokers[rawName];
		  if (nextValue && existingInvoker) {
		    existingInvoker.value = nextValue;
		  } else {
		    const [name, options] = parseName(rawName);
		    if (nextValue) {
		      const invoker = invokers[rawName] = createInvoker(
		        nextValue,
		        instance
		      );
		      addEventListener(el, name, invoker, options);
		    } else if (existingInvoker) {
		      removeEventListener(el, name, existingInvoker, options);
		      invokers[rawName] = void 0;
		    }
		  }
		}
		const optionsModifierRE = /(?:Once|Passive|Capture)$/;
		function parseName(name) {
		  let options;
		  if (optionsModifierRE.test(name)) {
		    options = {};
		    let m;
		    while (m = name.match(optionsModifierRE)) {
		      name = name.slice(0, name.length - m[0].length);
		      options[m[0].toLowerCase()] = true;
		    }
		  }
		  const event = name[2] === ":" ? name.slice(3) : shared.hyphenate(name.slice(2));
		  return [event, options];
		}
		let cachedNow = 0;
		const p = /* @__PURE__ */ Promise.resolve();
		const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
		function createInvoker(initialValue, instance) {
		  const invoker = (e) => {
		    if (!e._vts) {
		      e._vts = Date.now();
		    } else if (e._vts <= invoker.attached) {
		      return;
		    }
		    runtimeCore.callWithAsyncErrorHandling(
		      patchStopImmediatePropagation(e, invoker.value),
		      instance,
		      5,
		      [e]
		    );
		  };
		  invoker.value = initialValue;
		  invoker.attached = getNow();
		  return invoker;
		}
		function patchStopImmediatePropagation(e, value) {
		  if (shared.isArray(value)) {
		    const originalStop = e.stopImmediatePropagation;
		    e.stopImmediatePropagation = () => {
		      originalStop.call(e);
		      e._stopped = true;
		    };
		    return value.map(
		      (fn) => (e2) => !e2._stopped && fn && fn(e2)
		    );
		  } else {
		    return value;
		  }
		}

		const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
		key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
		const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
		  const isSVG = namespace === "svg";
		  if (key === "class") {
		    patchClass(el, nextValue, isSVG);
		  } else if (key === "style") {
		    patchStyle(el, prevValue, nextValue);
		  } else if (shared.isOn(key)) {
		    if (!shared.isModelListener(key)) {
		      patchEvent(el, key, prevValue, nextValue, parentComponent);
		    }
		  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
		    patchDOMProp(el, key, nextValue);
		    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
		      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
		    }
		  } else if (
		    // #11081 force set props for possible async custom element
		    el._isVueCE && (/[A-Z]/.test(key) || !shared.isString(nextValue))
		  ) {
		    patchDOMProp(el, shared.camelize(key), nextValue, parentComponent, key);
		  } else {
		    if (key === "true-value") {
		      el._trueValue = nextValue;
		    } else if (key === "false-value") {
		      el._falseValue = nextValue;
		    }
		    patchAttr(el, key, nextValue, isSVG);
		  }
		};
		function shouldSetAsProp(el, key, value, isSVG) {
		  if (isSVG) {
		    if (key === "innerHTML" || key === "textContent") {
		      return true;
		    }
		    if (key in el && isNativeOn(key) && shared.isFunction(value)) {
		      return true;
		    }
		    return false;
		  }
		  if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
		    return false;
		  }
		  if (key === "form") {
		    return false;
		  }
		  if (key === "list" && el.tagName === "INPUT") {
		    return false;
		  }
		  if (key === "type" && el.tagName === "TEXTAREA") {
		    return false;
		  }
		  if (key === "width" || key === "height") {
		    const tag = el.tagName;
		    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
		      return false;
		    }
		  }
		  if (isNativeOn(key) && shared.isString(value)) {
		    return false;
		  }
		  return key in el;
		}

		const REMOVAL = {};
		/*! #__NO_SIDE_EFFECTS__ */
		// @__NO_SIDE_EFFECTS__
		function defineCustomElement(options, extraOptions, _createApp) {
		  const Comp = runtimeCore.defineComponent(options, extraOptions);
		  if (shared.isPlainObject(Comp)) shared.extend(Comp, extraOptions);
		  class VueCustomElement extends VueElement {
		    constructor(initialProps) {
		      super(Comp, initialProps, _createApp);
		    }
		  }
		  VueCustomElement.def = Comp;
		  return VueCustomElement;
		}
		/*! #__NO_SIDE_EFFECTS__ */
		const defineSSRCustomElement = /* @__NO_SIDE_EFFECTS__ */ (options, extraOptions) => {
		  return /* @__PURE__ */ defineCustomElement(options, extraOptions, createSSRApp);
		};
		const BaseClass = typeof HTMLElement !== "undefined" ? HTMLElement : class {
		};
		class VueElement extends BaseClass {
		  constructor(_def, _props = {}, _createApp = createApp) {
		    super();
		    this._def = _def;
		    this._props = _props;
		    this._createApp = _createApp;
		    this._isVueCE = true;
		    /**
		     * @internal
		     */
		    this._instance = null;
		    /**
		     * @internal
		     */
		    this._app = null;
		    /**
		     * @internal
		     */
		    this._nonce = this._def.nonce;
		    this._connected = false;
		    this._resolved = false;
		    this._numberProps = null;
		    this._styleChildren = /* @__PURE__ */ new WeakSet();
		    this._ob = null;
		    if (this.shadowRoot && _createApp !== createApp) {
		      this._root = this.shadowRoot;
		    } else {
		      if (_def.shadowRoot !== false) {
		        this.attachShadow({ mode: "open" });
		        this._root = this.shadowRoot;
		      } else {
		        this._root = this;
		      }
		    }
		  }
		  connectedCallback() {
		    if (!this.isConnected) return;
		    if (!this.shadowRoot && !this._resolved) {
		      this._parseSlots();
		    }
		    this._connected = true;
		    let parent = this;
		    while (parent = parent && (parent.parentNode || parent.host)) {
		      if (parent instanceof VueElement) {
		        this._parent = parent;
		        break;
		      }
		    }
		    if (!this._instance) {
		      if (this._resolved) {
		        this._mount(this._def);
		      } else {
		        if (parent && parent._pendingResolve) {
		          this._pendingResolve = parent._pendingResolve.then(() => {
		            this._pendingResolve = void 0;
		            this._resolveDef();
		          });
		        } else {
		          this._resolveDef();
		        }
		      }
		    }
		  }
		  _setParent(parent = this._parent) {
		    if (parent) {
		      this._instance.parent = parent._instance;
		      this._inheritParentContext(parent);
		    }
		  }
		  _inheritParentContext(parent = this._parent) {
		    if (parent && this._app) {
		      Object.setPrototypeOf(
		        this._app._context.provides,
		        parent._instance.provides
		      );
		    }
		  }
		  disconnectedCallback() {
		    this._connected = false;
		    runtimeCore.nextTick(() => {
		      if (!this._connected) {
		        if (this._ob) {
		          this._ob.disconnect();
		          this._ob = null;
		        }
		        this._app && this._app.unmount();
		        if (this._instance) this._instance.ce = void 0;
		        this._app = this._instance = null;
		      }
		    });
		  }
		  /**
		   * resolve inner component definition (handle possible async component)
		   */
		  _resolveDef() {
		    if (this._pendingResolve) {
		      return;
		    }
		    for (let i = 0; i < this.attributes.length; i++) {
		      this._setAttr(this.attributes[i].name);
		    }
		    this._ob = new MutationObserver((mutations) => {
		      for (const m of mutations) {
		        this._setAttr(m.attributeName);
		      }
		    });
		    this._ob.observe(this, { attributes: true });
		    const resolve = (def, isAsync = false) => {
		      this._resolved = true;
		      this._pendingResolve = void 0;
		      const { props, styles } = def;
		      let numberProps;
		      if (props && !shared.isArray(props)) {
		        for (const key in props) {
		          const opt = props[key];
		          if (opt === Number || opt && opt.type === Number) {
		            if (key in this._props) {
		              this._props[key] = shared.toNumber(this._props[key]);
		            }
		            (numberProps || (numberProps = /* @__PURE__ */ Object.create(null)))[shared.camelize(key)] = true;
		          }
		        }
		      }
		      this._numberProps = numberProps;
		      this._resolveProps(def);
		      if (this.shadowRoot) {
		        this._applyStyles(styles);
		      }
		      this._mount(def);
		    };
		    const asyncDef = this._def.__asyncLoader;
		    if (asyncDef) {
		      this._pendingResolve = asyncDef().then((def) => {
		        def.configureApp = this._def.configureApp;
		        resolve(this._def = def, true);
		      });
		    } else {
		      resolve(this._def);
		    }
		  }
		  _mount(def) {
		    this._app = this._createApp(def);
		    this._inheritParentContext();
		    if (def.configureApp) {
		      def.configureApp(this._app);
		    }
		    this._app._ceVNode = this._createVNode();
		    this._app.mount(this._root);
		    const exposed = this._instance && this._instance.exposed;
		    if (!exposed) return;
		    for (const key in exposed) {
		      if (!shared.hasOwn(this, key)) {
		        Object.defineProperty(this, key, {
		          // unwrap ref to be consistent with public instance behavior
		          get: () => runtimeCore.unref(exposed[key])
		        });
		      }
		    }
		  }
		  _resolveProps(def) {
		    const { props } = def;
		    const declaredPropKeys = shared.isArray(props) ? props : Object.keys(props || {});
		    for (const key of Object.keys(this)) {
		      if (key[0] !== "_" && declaredPropKeys.includes(key)) {
		        this._setProp(key, this[key]);
		      }
		    }
		    for (const key of declaredPropKeys.map(shared.camelize)) {
		      Object.defineProperty(this, key, {
		        get() {
		          return this._getProp(key);
		        },
		        set(val) {
		          this._setProp(key, val, true, true);
		        }
		      });
		    }
		  }
		  _setAttr(key) {
		    if (key.startsWith("data-v-")) return;
		    const has = this.hasAttribute(key);
		    let value = has ? this.getAttribute(key) : REMOVAL;
		    const camelKey = shared.camelize(key);
		    if (has && this._numberProps && this._numberProps[camelKey]) {
		      value = shared.toNumber(value);
		    }
		    this._setProp(camelKey, value, false, true);
		  }
		  /**
		   * @internal
		   */
		  _getProp(key) {
		    return this._props[key];
		  }
		  /**
		   * @internal
		   */
		  _setProp(key, val, shouldReflect = true, shouldUpdate = false) {
		    if (val !== this._props[key]) {
		      if (val === REMOVAL) {
		        delete this._props[key];
		      } else {
		        this._props[key] = val;
		        if (key === "key" && this._app) {
		          this._app._ceVNode.key = val;
		        }
		      }
		      if (shouldUpdate && this._instance) {
		        this._update();
		      }
		      if (shouldReflect) {
		        const ob = this._ob;
		        ob && ob.disconnect();
		        if (val === true) {
		          this.setAttribute(shared.hyphenate(key), "");
		        } else if (typeof val === "string" || typeof val === "number") {
		          this.setAttribute(shared.hyphenate(key), val + "");
		        } else if (!val) {
		          this.removeAttribute(shared.hyphenate(key));
		        }
		        ob && ob.observe(this, { attributes: true });
		      }
		    }
		  }
		  _update() {
		    const vnode = this._createVNode();
		    if (this._app) vnode.appContext = this._app._context;
		    render(vnode, this._root);
		  }
		  _createVNode() {
		    const baseProps = {};
		    if (!this.shadowRoot) {
		      baseProps.onVnodeMounted = baseProps.onVnodeUpdated = this._renderSlots.bind(this);
		    }
		    const vnode = runtimeCore.createVNode(this._def, shared.extend(baseProps, this._props));
		    if (!this._instance) {
		      vnode.ce = (instance) => {
		        this._instance = instance;
		        instance.ce = this;
		        instance.isCE = true;
		        const dispatch = (event, args) => {
		          this.dispatchEvent(
		            new CustomEvent(
		              event,
		              shared.isPlainObject(args[0]) ? shared.extend({ detail: args }, args[0]) : { detail: args }
		            )
		          );
		        };
		        instance.emit = (event, ...args) => {
		          dispatch(event, args);
		          if (shared.hyphenate(event) !== event) {
		            dispatch(shared.hyphenate(event), args);
		          }
		        };
		        this._setParent();
		      };
		    }
		    return vnode;
		  }
		  _applyStyles(styles, owner) {
		    if (!styles) return;
		    if (owner) {
		      if (owner === this._def || this._styleChildren.has(owner)) {
		        return;
		      }
		      this._styleChildren.add(owner);
		    }
		    const nonce = this._nonce;
		    for (let i = styles.length - 1; i >= 0; i--) {
		      const s = document.createElement("style");
		      if (nonce) s.setAttribute("nonce", nonce);
		      s.textContent = styles[i];
		      this.shadowRoot.prepend(s);
		    }
		  }
		  /**
		   * Only called when shadowRoot is false
		   */
		  _parseSlots() {
		    const slots = this._slots = {};
		    let n;
		    while (n = this.firstChild) {
		      const slotName = n.nodeType === 1 && n.getAttribute("slot") || "default";
		      (slots[slotName] || (slots[slotName] = [])).push(n);
		      this.removeChild(n);
		    }
		  }
		  /**
		   * Only called when shadowRoot is false
		   */
		  _renderSlots() {
		    const outlets = (this._teleportTarget || this).querySelectorAll("slot");
		    const scopeId = this._instance.type.__scopeId;
		    for (let i = 0; i < outlets.length; i++) {
		      const o = outlets[i];
		      const slotName = o.getAttribute("name") || "default";
		      const content = this._slots[slotName];
		      const parent = o.parentNode;
		      if (content) {
		        for (const n of content) {
		          if (scopeId && n.nodeType === 1) {
		            const id = scopeId + "-s";
		            const walker = document.createTreeWalker(n, 1);
		            n.setAttribute(id, "");
		            let child;
		            while (child = walker.nextNode()) {
		              child.setAttribute(id, "");
		            }
		          }
		          parent.insertBefore(n, o);
		        }
		      } else {
		        while (o.firstChild) parent.insertBefore(o.firstChild, o);
		      }
		      parent.removeChild(o);
		    }
		  }
		  /**
		   * @internal
		   */
		  _injectChildStyle(comp) {
		    this._applyStyles(comp.styles, comp);
		  }
		  /**
		   * @internal
		   */
		  _removeChildStyle(comp) {
		  }
		}
		function useHost(caller) {
		  const instance = runtimeCore.getCurrentInstance();
		  const el = instance && instance.ce;
		  if (el) {
		    return el;
		  }
		  return null;
		}
		function useShadowRoot() {
		  const el = useHost();
		  return el && el.shadowRoot;
		}

		function useCssModule(name = "$style") {
		  {
		    const instance = runtimeCore.getCurrentInstance();
		    if (!instance) {
		      return shared.EMPTY_OBJ;
		    }
		    const modules = instance.type.__cssModules;
		    if (!modules) {
		      return shared.EMPTY_OBJ;
		    }
		    const mod = modules[name];
		    if (!mod) {
		      return shared.EMPTY_OBJ;
		    }
		    return mod;
		  }
		}

		const positionMap = /* @__PURE__ */ new WeakMap();
		const newPositionMap = /* @__PURE__ */ new WeakMap();
		const moveCbKey = Symbol("_moveCb");
		const enterCbKey = Symbol("_enterCb");
		const decorate = (t) => {
		  delete t.props.mode;
		  return t;
		};
		const TransitionGroupImpl = /* @__PURE__ */ decorate({
		  name: "TransitionGroup",
		  props: /* @__PURE__ */ shared.extend({}, TransitionPropsValidators, {
		    tag: String,
		    moveClass: String
		  }),
		  setup(props, { slots }) {
		    const instance = runtimeCore.getCurrentInstance();
		    const state = runtimeCore.useTransitionState();
		    let prevChildren;
		    let children;
		    runtimeCore.onUpdated(() => {
		      if (!prevChildren.length) {
		        return;
		      }
		      const moveClass = props.moveClass || `${props.name || "v"}-move`;
		      if (!hasCSSTransform(
		        prevChildren[0].el,
		        instance.vnode.el,
		        moveClass
		      )) {
		        prevChildren = [];
		        return;
		      }
		      prevChildren.forEach(callPendingCbs);
		      prevChildren.forEach(recordPosition);
		      const movedChildren = prevChildren.filter(applyTranslation);
		      forceReflow();
		      movedChildren.forEach((c) => {
		        const el = c.el;
		        const style = el.style;
		        addTransitionClass(el, moveClass);
		        style.transform = style.webkitTransform = style.transitionDuration = "";
		        const cb = el[moveCbKey] = (e) => {
		          if (e && e.target !== el) {
		            return;
		          }
		          if (!e || /transform$/.test(e.propertyName)) {
		            el.removeEventListener("transitionend", cb);
		            el[moveCbKey] = null;
		            removeTransitionClass(el, moveClass);
		          }
		        };
		        el.addEventListener("transitionend", cb);
		      });
		      prevChildren = [];
		    });
		    return () => {
		      const rawProps = runtimeCore.toRaw(props);
		      const cssTransitionProps = resolveTransitionProps(rawProps);
		      let tag = rawProps.tag || runtimeCore.Fragment;
		      prevChildren = [];
		      if (children) {
		        for (let i = 0; i < children.length; i++) {
		          const child = children[i];
		          if (child.el && child.el instanceof Element) {
		            prevChildren.push(child);
		            runtimeCore.setTransitionHooks(
		              child,
		              runtimeCore.resolveTransitionHooks(
		                child,
		                cssTransitionProps,
		                state,
		                instance
		              )
		            );
		            positionMap.set(
		              child,
		              child.el.getBoundingClientRect()
		            );
		          }
		        }
		      }
		      children = slots.default ? runtimeCore.getTransitionRawChildren(slots.default()) : [];
		      for (let i = 0; i < children.length; i++) {
		        const child = children[i];
		        if (child.key != null) {
		          runtimeCore.setTransitionHooks(
		            child,
		            runtimeCore.resolveTransitionHooks(child, cssTransitionProps, state, instance)
		          );
		        }
		      }
		      return runtimeCore.createVNode(tag, null, children);
		    };
		  }
		});
		const TransitionGroup = TransitionGroupImpl;
		function callPendingCbs(c) {
		  const el = c.el;
		  if (el[moveCbKey]) {
		    el[moveCbKey]();
		  }
		  if (el[enterCbKey]) {
		    el[enterCbKey]();
		  }
		}
		function recordPosition(c) {
		  newPositionMap.set(c, c.el.getBoundingClientRect());
		}
		function applyTranslation(c) {
		  const oldPos = positionMap.get(c);
		  const newPos = newPositionMap.get(c);
		  const dx = oldPos.left - newPos.left;
		  const dy = oldPos.top - newPos.top;
		  if (dx || dy) {
		    const s = c.el.style;
		    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
		    s.transitionDuration = "0s";
		    return c;
		  }
		}
		function hasCSSTransform(el, root, moveClass) {
		  const clone = el.cloneNode();
		  const _vtc = el[vtcKey];
		  if (_vtc) {
		    _vtc.forEach((cls) => {
		      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
		    });
		  }
		  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
		  clone.style.display = "none";
		  const container = root.nodeType === 1 ? root : root.parentNode;
		  container.appendChild(clone);
		  const { hasTransform } = getTransitionInfo(clone);
		  container.removeChild(clone);
		  return hasTransform;
		}

		const getModelAssigner = (vnode) => {
		  const fn = vnode.props["onUpdate:modelValue"] || false;
		  return shared.isArray(fn) ? (value) => shared.invokeArrayFns(fn, value) : fn;
		};
		function onCompositionStart(e) {
		  e.target.composing = true;
		}
		function onCompositionEnd(e) {
		  const target = e.target;
		  if (target.composing) {
		    target.composing = false;
		    target.dispatchEvent(new Event("input"));
		  }
		}
		const assignKey = Symbol("_assign");
		const vModelText = {
		  created(el, { modifiers: { lazy, trim, number } }, vnode) {
		    el[assignKey] = getModelAssigner(vnode);
		    const castToNumber = number || vnode.props && vnode.props.type === "number";
		    addEventListener(el, lazy ? "change" : "input", (e) => {
		      if (e.target.composing) return;
		      let domValue = el.value;
		      if (trim) {
		        domValue = domValue.trim();
		      }
		      if (castToNumber) {
		        domValue = shared.looseToNumber(domValue);
		      }
		      el[assignKey](domValue);
		    });
		    if (trim) {
		      addEventListener(el, "change", () => {
		        el.value = el.value.trim();
		      });
		    }
		    if (!lazy) {
		      addEventListener(el, "compositionstart", onCompositionStart);
		      addEventListener(el, "compositionend", onCompositionEnd);
		      addEventListener(el, "change", onCompositionEnd);
		    }
		  },
		  // set value on mounted so it's after min/max for type="range"
		  mounted(el, { value }) {
		    el.value = value == null ? "" : value;
		  },
		  beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
		    el[assignKey] = getModelAssigner(vnode);
		    if (el.composing) return;
		    const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? shared.looseToNumber(el.value) : el.value;
		    const newValue = value == null ? "" : value;
		    if (elValue === newValue) {
		      return;
		    }
		    if (document.activeElement === el && el.type !== "range") {
		      if (lazy && value === oldValue) {
		        return;
		      }
		      if (trim && el.value.trim() === newValue) {
		        return;
		      }
		    }
		    el.value = newValue;
		  }
		};
		const vModelCheckbox = {
		  // #4096 array checkboxes need to be deep traversed
		  deep: true,
		  created(el, _, vnode) {
		    el[assignKey] = getModelAssigner(vnode);
		    addEventListener(el, "change", () => {
		      const modelValue = el._modelValue;
		      const elementValue = getValue(el);
		      const checked = el.checked;
		      const assign = el[assignKey];
		      if (shared.isArray(modelValue)) {
		        const index = shared.looseIndexOf(modelValue, elementValue);
		        const found = index !== -1;
		        if (checked && !found) {
		          assign(modelValue.concat(elementValue));
		        } else if (!checked && found) {
		          const filtered = [...modelValue];
		          filtered.splice(index, 1);
		          assign(filtered);
		        }
		      } else if (shared.isSet(modelValue)) {
		        const cloned = new Set(modelValue);
		        if (checked) {
		          cloned.add(elementValue);
		        } else {
		          cloned.delete(elementValue);
		        }
		        assign(cloned);
		      } else {
		        assign(getCheckboxValue(el, checked));
		      }
		    });
		  },
		  // set initial checked on mount to wait for true-value/false-value
		  mounted: setChecked,
		  beforeUpdate(el, binding, vnode) {
		    el[assignKey] = getModelAssigner(vnode);
		    setChecked(el, binding, vnode);
		  }
		};
		function setChecked(el, { value, oldValue }, vnode) {
		  el._modelValue = value;
		  let checked;
		  if (shared.isArray(value)) {
		    checked = shared.looseIndexOf(value, vnode.props.value) > -1;
		  } else if (shared.isSet(value)) {
		    checked = value.has(vnode.props.value);
		  } else {
		    if (value === oldValue) return;
		    checked = shared.looseEqual(value, getCheckboxValue(el, true));
		  }
		  if (el.checked !== checked) {
		    el.checked = checked;
		  }
		}
		const vModelRadio = {
		  created(el, { value }, vnode) {
		    el.checked = shared.looseEqual(value, vnode.props.value);
		    el[assignKey] = getModelAssigner(vnode);
		    addEventListener(el, "change", () => {
		      el[assignKey](getValue(el));
		    });
		  },
		  beforeUpdate(el, { value, oldValue }, vnode) {
		    el[assignKey] = getModelAssigner(vnode);
		    if (value !== oldValue) {
		      el.checked = shared.looseEqual(value, vnode.props.value);
		    }
		  }
		};
		const vModelSelect = {
		  // <select multiple> value need to be deep traversed
		  deep: true,
		  created(el, { value, modifiers: { number } }, vnode) {
		    const isSetModel = shared.isSet(value);
		    addEventListener(el, "change", () => {
		      const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map(
		        (o) => number ? shared.looseToNumber(getValue(o)) : getValue(o)
		      );
		      el[assignKey](
		        el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]
		      );
		      el._assigning = true;
		      runtimeCore.nextTick(() => {
		        el._assigning = false;
		      });
		    });
		    el[assignKey] = getModelAssigner(vnode);
		  },
		  // set value in mounted & updated because <select> relies on its children
		  // <option>s.
		  mounted(el, { value }) {
		    setSelected(el, value);
		  },
		  beforeUpdate(el, _binding, vnode) {
		    el[assignKey] = getModelAssigner(vnode);
		  },
		  updated(el, { value }) {
		    if (!el._assigning) {
		      setSelected(el, value);
		    }
		  }
		};
		function setSelected(el, value) {
		  const isMultiple = el.multiple;
		  const isArrayValue = shared.isArray(value);
		  if (isMultiple && !isArrayValue && !shared.isSet(value)) {
		    return;
		  }
		  for (let i = 0, l = el.options.length; i < l; i++) {
		    const option = el.options[i];
		    const optionValue = getValue(option);
		    if (isMultiple) {
		      if (isArrayValue) {
		        const optionType = typeof optionValue;
		        if (optionType === "string" || optionType === "number") {
		          option.selected = value.some((v) => String(v) === String(optionValue));
		        } else {
		          option.selected = shared.looseIndexOf(value, optionValue) > -1;
		        }
		      } else {
		        option.selected = value.has(optionValue);
		      }
		    } else if (shared.looseEqual(getValue(option), value)) {
		      if (el.selectedIndex !== i) el.selectedIndex = i;
		      return;
		    }
		  }
		  if (!isMultiple && el.selectedIndex !== -1) {
		    el.selectedIndex = -1;
		  }
		}
		function getValue(el) {
		  return "_value" in el ? el._value : el.value;
		}
		function getCheckboxValue(el, checked) {
		  const key = checked ? "_trueValue" : "_falseValue";
		  return key in el ? el[key] : checked;
		}
		const vModelDynamic = {
		  created(el, binding, vnode) {
		    callModelHook(el, binding, vnode, null, "created");
		  },
		  mounted(el, binding, vnode) {
		    callModelHook(el, binding, vnode, null, "mounted");
		  },
		  beforeUpdate(el, binding, vnode, prevVNode) {
		    callModelHook(el, binding, vnode, prevVNode, "beforeUpdate");
		  },
		  updated(el, binding, vnode, prevVNode) {
		    callModelHook(el, binding, vnode, prevVNode, "updated");
		  }
		};
		function resolveDynamicModel(tagName, type) {
		  switch (tagName) {
		    case "SELECT":
		      return vModelSelect;
		    case "TEXTAREA":
		      return vModelText;
		    default:
		      switch (type) {
		        case "checkbox":
		          return vModelCheckbox;
		        case "radio":
		          return vModelRadio;
		        default:
		          return vModelText;
		      }
		  }
		}
		function callModelHook(el, binding, vnode, prevVNode, hook) {
		  const modelToUse = resolveDynamicModel(
		    el.tagName,
		    vnode.props && vnode.props.type
		  );
		  const fn = modelToUse[hook];
		  fn && fn(el, binding, vnode, prevVNode);
		}
		function initVModelForSSR() {
		  vModelText.getSSRProps = ({ value }) => ({ value });
		  vModelRadio.getSSRProps = ({ value }, vnode) => {
		    if (vnode.props && shared.looseEqual(vnode.props.value, value)) {
		      return { checked: true };
		    }
		  };
		  vModelCheckbox.getSSRProps = ({ value }, vnode) => {
		    if (shared.isArray(value)) {
		      if (vnode.props && shared.looseIndexOf(value, vnode.props.value) > -1) {
		        return { checked: true };
		      }
		    } else if (shared.isSet(value)) {
		      if (vnode.props && value.has(vnode.props.value)) {
		        return { checked: true };
		      }
		    } else if (value) {
		      return { checked: true };
		    }
		  };
		  vModelDynamic.getSSRProps = (binding, vnode) => {
		    if (typeof vnode.type !== "string") {
		      return;
		    }
		    const modelToUse = resolveDynamicModel(
		      // resolveDynamicModel expects an uppercase tag name, but vnode.type is lowercase
		      vnode.type.toUpperCase(),
		      vnode.props && vnode.props.type
		    );
		    if (modelToUse.getSSRProps) {
		      return modelToUse.getSSRProps(binding, vnode);
		    }
		  };
		}

		const systemModifiers = ["ctrl", "shift", "alt", "meta"];
		const modifierGuards = {
		  stop: (e) => e.stopPropagation(),
		  prevent: (e) => e.preventDefault(),
		  self: (e) => e.target !== e.currentTarget,
		  ctrl: (e) => !e.ctrlKey,
		  shift: (e) => !e.shiftKey,
		  alt: (e) => !e.altKey,
		  meta: (e) => !e.metaKey,
		  left: (e) => "button" in e && e.button !== 0,
		  middle: (e) => "button" in e && e.button !== 1,
		  right: (e) => "button" in e && e.button !== 2,
		  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
		};
		const withModifiers = (fn, modifiers) => {
		  const cache = fn._withMods || (fn._withMods = {});
		  const cacheKey = modifiers.join(".");
		  return cache[cacheKey] || (cache[cacheKey] = (event, ...args) => {
		    for (let i = 0; i < modifiers.length; i++) {
		      const guard = modifierGuards[modifiers[i]];
		      if (guard && guard(event, modifiers)) return;
		    }
		    return fn(event, ...args);
		  });
		};
		const keyNames = {
		  esc: "escape",
		  space: " ",
		  up: "arrow-up",
		  left: "arrow-left",
		  right: "arrow-right",
		  down: "arrow-down",
		  delete: "backspace"
		};
		const withKeys = (fn, modifiers) => {
		  const cache = fn._withKeys || (fn._withKeys = {});
		  const cacheKey = modifiers.join(".");
		  return cache[cacheKey] || (cache[cacheKey] = (event) => {
		    if (!("key" in event)) {
		      return;
		    }
		    const eventKey = shared.hyphenate(event.key);
		    if (modifiers.some(
		      (k) => k === eventKey || keyNames[k] === eventKey
		    )) {
		      return fn(event);
		    }
		  });
		};

		const rendererOptions = /* @__PURE__ */ shared.extend({ patchProp }, nodeOps);
		let renderer;
		let enabledHydration = false;
		function ensureRenderer() {
		  return renderer || (renderer = runtimeCore.createRenderer(rendererOptions));
		}
		function ensureHydrationRenderer() {
		  renderer = enabledHydration ? renderer : runtimeCore.createHydrationRenderer(rendererOptions);
		  enabledHydration = true;
		  return renderer;
		}
		const render = (...args) => {
		  ensureRenderer().render(...args);
		};
		const hydrate = (...args) => {
		  ensureHydrationRenderer().hydrate(...args);
		};
		const createApp = (...args) => {
		  const app = ensureRenderer().createApp(...args);
		  const { mount } = app;
		  app.mount = (containerOrSelector) => {
		    const container = normalizeContainer(containerOrSelector);
		    if (!container) return;
		    const component = app._component;
		    if (!shared.isFunction(component) && !component.render && !component.template) {
		      component.template = container.innerHTML;
		    }
		    if (container.nodeType === 1) {
		      container.textContent = "";
		    }
		    const proxy = mount(container, false, resolveRootNamespace(container));
		    if (container instanceof Element) {
		      container.removeAttribute("v-cloak");
		      container.setAttribute("data-v-app", "");
		    }
		    return proxy;
		  };
		  return app;
		};
		const createSSRApp = (...args) => {
		  const app = ensureHydrationRenderer().createApp(...args);
		  const { mount } = app;
		  app.mount = (containerOrSelector) => {
		    const container = normalizeContainer(containerOrSelector);
		    if (container) {
		      return mount(container, true, resolveRootNamespace(container));
		    }
		  };
		  return app;
		};
		function resolveRootNamespace(container) {
		  if (container instanceof SVGElement) {
		    return "svg";
		  }
		  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
		    return "mathml";
		  }
		}
		function normalizeContainer(container) {
		  if (shared.isString(container)) {
		    const res = document.querySelector(container);
		    return res;
		  }
		  return container;
		}
		let ssrDirectiveInitialized = false;
		const initDirectivesForSSR = () => {
		  if (!ssrDirectiveInitialized) {
		    ssrDirectiveInitialized = true;
		    initVModelForSSR();
		    initVShowForSSR();
		  }
		} ;

		exports.Transition = Transition;
		exports.TransitionGroup = TransitionGroup;
		exports.VueElement = VueElement;
		exports.createApp = createApp;
		exports.createSSRApp = createSSRApp;
		exports.defineCustomElement = defineCustomElement;
		exports.defineSSRCustomElement = defineSSRCustomElement;
		exports.hydrate = hydrate;
		exports.initDirectivesForSSR = initDirectivesForSSR;
		exports.render = render;
		exports.useCssModule = useCssModule;
		exports.useCssVars = useCssVars;
		exports.useHost = useHost;
		exports.useShadowRoot = useShadowRoot;
		exports.vModelCheckbox = vModelCheckbox;
		exports.vModelDynamic = vModelDynamic;
		exports.vModelRadio = vModelRadio;
		exports.vModelSelect = vModelSelect;
		exports.vModelText = vModelText;
		exports.vShow = vShow;
		exports.withKeys = withKeys;
		exports.withModifiers = withModifiers;
		Object.keys(runtimeCore).forEach(function (k) {
		  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = runtimeCore[k];
		}); 
	} (runtimeDom_cjs_prod));
	return runtimeDom_cjs_prod;
}

/**
* vue v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/

var hasRequiredVue_cjs_prod;

function requireVue_cjs_prod () {
	if (hasRequiredVue_cjs_prod) return vue_cjs_prod;
	hasRequiredVue_cjs_prod = 1;
	(function (exports) {

		Object.defineProperty(exports, '__esModule', { value: true });

		var compilerDom = /*@__PURE__*/ requireCompilerDom_cjs_prod();
		var runtimeDom = /*@__PURE__*/ requireRuntimeDom_cjs_prod();
		var shared = /*@__PURE__*/ requireShared_cjs_prod();

		function _interopNamespaceDefault(e) {
		  var n = Object.create(null);
		  if (e) {
		    for (var k in e) {
		      n[k] = e[k];
		    }
		  }
		  n.default = e;
		  return Object.freeze(n);
		}

		var runtimeDom__namespace = /*#__PURE__*/_interopNamespaceDefault(runtimeDom);

		const compileCache = /* @__PURE__ */ Object.create(null);
		function compileToFunction(template, options) {
		  if (!shared.isString(template)) {
		    if (template.nodeType) {
		      template = template.innerHTML;
		    } else {
		      return shared.NOOP;
		    }
		  }
		  const key = shared.genCacheKey(template, options);
		  const cached = compileCache[key];
		  if (cached) {
		    return cached;
		  }
		  if (template[0] === "#") {
		    const el = document.querySelector(template);
		    template = el ? el.innerHTML : ``;
		  }
		  const opts = shared.extend(
		    {
		      hoistStatic: true,
		      onError: void 0,
		      onWarn: shared.NOOP
		    },
		    options
		  );
		  if (!opts.isCustomElement && typeof customElements !== "undefined") {
		    opts.isCustomElement = (tag) => !!customElements.get(tag);
		  }
		  const { code } = compilerDom.compile(template, opts);
		  const render = new Function("Vue", code)(runtimeDom__namespace);
		  render._rc = true;
		  return compileCache[key] = render;
		}
		runtimeDom.registerRuntimeCompiler(compileToFunction);

		exports.compile = compileToFunction;
		Object.keys(runtimeDom).forEach(function (k) {
		  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = runtimeDom[k];
		}); 
	} (vue_cjs_prod));
	return vue_cjs_prod;
}

var vue_cjs = {};

/**
* vue v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/

var hasRequiredVue_cjs;

function requireVue_cjs () {
	if (hasRequiredVue_cjs) return vue_cjs;
	hasRequiredVue_cjs = 1;
	(function (exports) {

		Object.defineProperty(exports, '__esModule', { value: true });

		var compilerDom = /*@__PURE__*/ requireCompilerDom_cjs_prod();
		var runtimeDom = /*@__PURE__*/ requireRuntimeDom_cjs_prod();
		var shared = /*@__PURE__*/ requireShared_cjs_prod();

		function _interopNamespaceDefault(e) {
		  var n = Object.create(null);
		  if (e) {
		    for (var k in e) {
		      n[k] = e[k];
		    }
		  }
		  n.default = e;
		  return Object.freeze(n);
		}

		var runtimeDom__namespace = /*#__PURE__*/_interopNamespaceDefault(runtimeDom);

		const compileCache = /* @__PURE__ */ Object.create(null);
		function compileToFunction(template, options) {
		  if (!shared.isString(template)) {
		    if (template.nodeType) {
		      template = template.innerHTML;
		    } else {
		      runtimeDom.warn(`invalid template option: `, template);
		      return shared.NOOP;
		    }
		  }
		  const key = shared.genCacheKey(template, options);
		  const cached = compileCache[key];
		  if (cached) {
		    return cached;
		  }
		  if (template[0] === "#") {
		    const el = document.querySelector(template);
		    if (!el) {
		      runtimeDom.warn(`Template element not found or is empty: ${template}`);
		    }
		    template = el ? el.innerHTML : ``;
		  }
		  const opts = shared.extend(
		    {
		      hoistStatic: true,
		      onError: onError ,
		      onWarn: (e) => onError(e, true) 
		    },
		    options
		  );
		  if (!opts.isCustomElement && typeof customElements !== "undefined") {
		    opts.isCustomElement = (tag) => !!customElements.get(tag);
		  }
		  const { code } = compilerDom.compile(template, opts);
		  function onError(err, asWarning = false) {
		    const message = asWarning ? err.message : `Template compilation error: ${err.message}`;
		    const codeFrame = err.loc && shared.generateCodeFrame(
		      template,
		      err.loc.start.offset,
		      err.loc.end.offset
		    );
		    runtimeDom.warn(codeFrame ? `${message}
${codeFrame}` : message);
		  }
		  const render = new Function("Vue", code)(runtimeDom__namespace);
		  render._rc = true;
		  return compileCache[key] = render;
		}
		runtimeDom.registerRuntimeCompiler(compileToFunction);

		exports.compile = compileToFunction;
		Object.keys(runtimeDom).forEach(function (k) {
		  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = runtimeDom[k];
		}); 
	} (vue_cjs));
	return vue_cjs;
}

var hasRequiredVue;

function requireVue () {
	if (hasRequiredVue) return vue.exports;
	hasRequiredVue = 1;

	if (process.env.NODE_ENV === 'production') {
	  vue.exports = requireVue_cjs_prod();
	} else {
	  vue.exports = requireVue_cjs();
	}
	return vue.exports;
}

var vueExports = requireVue();

var serverRenderer_cjs_prod = {};

/**
* @vue/server-renderer v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/

var hasRequiredServerRenderer_cjs_prod;

function requireServerRenderer_cjs_prod () {
	if (hasRequiredServerRenderer_cjs_prod) return serverRenderer_cjs_prod;
	hasRequiredServerRenderer_cjs_prod = 1;

	Object.defineProperty(serverRenderer_cjs_prod, '__esModule', { value: true });

	var Vue = requireVue_cjs_prod();
	var shared = /*@__PURE__*/ requireShared_cjs_prod();
	var compilerSsr = require$$2$1;

	function _interopNamespaceDefault(e) {
	  var n = Object.create(null);
	  if (e) {
	    for (var k in e) {
	      n[k] = e[k];
	    }
	  }
	  n.default = e;
	  return Object.freeze(n);
	}

	var Vue__namespace = /*#__PURE__*/_interopNamespaceDefault(Vue);

	const shouldIgnoreProp = /* @__PURE__ */ shared.makeMap(
	  `,key,ref,innerHTML,textContent,ref_key,ref_for`
	);
	function ssrRenderAttrs(props, tag) {
	  let ret = "";
	  for (const key in props) {
	    if (shouldIgnoreProp(key) || shared.isOn(key) || tag === "textarea" && key === "value") {
	      continue;
	    }
	    const value = props[key];
	    if (key === "class") {
	      ret += ` class="${ssrRenderClass(value)}"`;
	    } else if (key === "style") {
	      ret += ` style="${ssrRenderStyle(value)}"`;
	    } else if (key === "className") {
	      ret += ` class="${String(value)}"`;
	    } else {
	      ret += ssrRenderDynamicAttr(key, value, tag);
	    }
	  }
	  return ret;
	}
	function ssrRenderDynamicAttr(key, value, tag) {
	  if (!shared.isRenderableAttrValue(value)) {
	    return ``;
	  }
	  const attrKey = tag && (tag.indexOf("-") > 0 || shared.isSVGTag(tag)) ? key : shared.propsToAttrMap[key] || key.toLowerCase();
	  if (shared.isBooleanAttr(attrKey)) {
	    return shared.includeBooleanAttr(value) ? ` ${attrKey}` : ``;
	  } else if (shared.isSSRSafeAttrName(attrKey)) {
	    return value === "" ? ` ${attrKey}` : ` ${attrKey}="${shared.escapeHtml(value)}"`;
	  } else {
	    console.warn(
	      `[@vue/server-renderer] Skipped rendering unsafe attribute name: ${attrKey}`
	    );
	    return ``;
	  }
	}
	function ssrRenderAttr(key, value) {
	  if (!shared.isRenderableAttrValue(value)) {
	    return ``;
	  }
	  return ` ${key}="${shared.escapeHtml(value)}"`;
	}
	function ssrRenderClass(raw) {
	  return shared.escapeHtml(shared.normalizeClass(raw));
	}
	function ssrRenderStyle(raw) {
	  if (!raw) {
	    return "";
	  }
	  if (shared.isString(raw)) {
	    return shared.escapeHtml(raw);
	  }
	  const styles = shared.normalizeStyle(ssrResetCssVars(raw));
	  return shared.escapeHtml(shared.stringifyStyle(styles));
	}
	function ssrResetCssVars(raw) {
	  if (!shared.isArray(raw) && shared.isObject(raw)) {
	    const res = {};
	    for (const key in raw) {
	      if (key.startsWith(":--")) {
	        res[key.slice(1)] = shared.normalizeCssVarValue(raw[key]);
	      } else {
	        res[key] = raw[key];
	      }
	    }
	    return res;
	  }
	  return raw;
	}

	function ssrRenderComponent(comp, props = null, children = null, parentComponent = null, slotScopeId) {
	  return renderComponentVNode(
	    Vue.createVNode(comp, props, children),
	    parentComponent,
	    slotScopeId
	  );
	}

	const { ensureValidVNode } = Vue.ssrUtils;
	function ssrRenderSlot(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId) {
	  push(`<!--[-->`);
	  ssrRenderSlotInner(
	    slots,
	    slotName,
	    slotProps,
	    fallbackRenderFn,
	    push,
	    parentComponent,
	    slotScopeId
	  );
	  push(`<!--]-->`);
	}
	function ssrRenderSlotInner(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId, transition) {
	  const slotFn = slots[slotName];
	  if (slotFn) {
	    const slotBuffer = [];
	    const bufferedPush = (item) => {
	      slotBuffer.push(item);
	    };
	    const ret = slotFn(
	      slotProps,
	      bufferedPush,
	      parentComponent,
	      slotScopeId ? " " + slotScopeId : ""
	    );
	    if (shared.isArray(ret)) {
	      const validSlotContent = ensureValidVNode(ret);
	      if (validSlotContent) {
	        renderVNodeChildren(
	          push,
	          validSlotContent,
	          parentComponent,
	          slotScopeId
	        );
	      } else if (fallbackRenderFn) {
	        fallbackRenderFn();
	      } else if (transition) {
	        push(`<!---->`);
	      }
	    } else {
	      let isEmptySlot = true;
	      if (transition) {
	        isEmptySlot = false;
	      } else {
	        for (let i = 0; i < slotBuffer.length; i++) {
	          if (!isComment(slotBuffer[i])) {
	            isEmptySlot = false;
	            break;
	          }
	        }
	      }
	      if (isEmptySlot) {
	        if (fallbackRenderFn) {
	          fallbackRenderFn();
	        }
	      } else {
	        let start = 0;
	        let end = slotBuffer.length;
	        if (transition && slotBuffer[0] === "<!--[-->" && slotBuffer[end - 1] === "<!--]-->") {
	          start++;
	          end--;
	        }
	        if (start < end) {
	          for (let i = start; i < end; i++) {
	            push(slotBuffer[i]);
	          }
	        } else if (transition) {
	          push(`<!---->`);
	        }
	      }
	    }
	  } else if (fallbackRenderFn) {
	    fallbackRenderFn();
	  } else if (transition) {
	    push(`<!---->`);
	  }
	}
	const commentTestRE = /^<!--[\s\S]*-->$/;
	const commentRE = /<!--[^]*?-->/gm;
	function isComment(item) {
	  if (typeof item !== "string" || !commentTestRE.test(item)) return false;
	  if (item.length <= 8) return true;
	  return !item.replace(commentRE, "").trim();
	}

	function ssrRenderTeleport(parentPush, contentRenderFn, target, disabled, parentComponent) {
	  parentPush("<!--teleport start-->");
	  const context = parentComponent.appContext.provides[Vue.ssrContextKey];
	  const teleportBuffers = context.__teleportBuffers || (context.__teleportBuffers = {});
	  const targetBuffer = teleportBuffers[target] || (teleportBuffers[target] = []);
	  const bufferIndex = targetBuffer.length;
	  let teleportContent;
	  if (disabled) {
	    contentRenderFn(parentPush);
	    teleportContent = `<!--teleport start anchor--><!--teleport anchor-->`;
	  } else {
	    const { getBuffer, push } = createBuffer();
	    push(`<!--teleport start anchor-->`);
	    contentRenderFn(push);
	    push(`<!--teleport anchor-->`);
	    teleportContent = getBuffer();
	  }
	  targetBuffer.splice(bufferIndex, 0, teleportContent);
	  parentPush("<!--teleport end-->");
	}

	function ssrInterpolate(value) {
	  return shared.escapeHtml(shared.toDisplayString(value));
	}

	function ssrRenderList(source, renderItem) {
	  if (shared.isArray(source) || shared.isString(source)) {
	    for (let i = 0, l = source.length; i < l; i++) {
	      renderItem(source[i], i);
	    }
	  } else if (typeof source === "number") {
	    for (let i = 0; i < source; i++) {
	      renderItem(i + 1, i);
	    }
	  } else if (shared.isObject(source)) {
	    if (source[Symbol.iterator]) {
	      const arr = Array.from(source);
	      for (let i = 0, l = arr.length; i < l; i++) {
	        renderItem(arr[i], i);
	      }
	    } else {
	      const keys = Object.keys(source);
	      for (let i = 0, l = keys.length; i < l; i++) {
	        const key = keys[i];
	        renderItem(source[key], key, i);
	      }
	    }
	  }
	}

	async function ssrRenderSuspense(push, { default: renderContent }) {
	  if (renderContent) {
	    renderContent();
	  } else {
	    push(`<!---->`);
	  }
	}

	function ssrGetDirectiveProps(instance, dir, value, arg, modifiers = {}) {
	  if (typeof dir !== "function" && dir.getSSRProps) {
	    return dir.getSSRProps(
	      {
	        dir,
	        instance: Vue.ssrUtils.getComponentPublicInstance(instance.$),
	        value,
	        oldValue: void 0,
	        arg,
	        modifiers
	      },
	      null
	    ) || {};
	  }
	  return {};
	}

	const ssrLooseEqual = shared.looseEqual;
	function ssrLooseContain(arr, value) {
	  return shared.looseIndexOf(arr, value) > -1;
	}
	function ssrRenderDynamicModel(type, model, value) {
	  switch (type) {
	    case "radio":
	      return shared.looseEqual(model, value) ? " checked" : "";
	    case "checkbox":
	      return (shared.isArray(model) ? ssrLooseContain(model, value) : model) ? " checked" : "";
	    default:
	      return ssrRenderAttr("value", model);
	  }
	}
	function ssrGetDynamicModelProps(existingProps = {}, model) {
	  const { type, value } = existingProps;
	  switch (type) {
	    case "radio":
	      return shared.looseEqual(model, value) ? { checked: true } : null;
	    case "checkbox":
	      return (shared.isArray(model) ? ssrLooseContain(model, value) : model) ? { checked: true } : null;
	    default:
	      return { value: model };
	  }
	}

	var helpers = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  ssrGetDirectiveProps: ssrGetDirectiveProps,
	  ssrGetDynamicModelProps: ssrGetDynamicModelProps,
	  ssrIncludeBooleanAttr: shared.includeBooleanAttr,
	  ssrInterpolate: ssrInterpolate,
	  ssrLooseContain: ssrLooseContain,
	  ssrLooseEqual: ssrLooseEqual,
	  ssrRenderAttr: ssrRenderAttr,
	  ssrRenderAttrs: ssrRenderAttrs,
	  ssrRenderClass: ssrRenderClass,
	  ssrRenderComponent: ssrRenderComponent,
	  ssrRenderDynamicAttr: ssrRenderDynamicAttr,
	  ssrRenderDynamicModel: ssrRenderDynamicModel,
	  ssrRenderList: ssrRenderList,
	  ssrRenderSlot: ssrRenderSlot,
	  ssrRenderSlotInner: ssrRenderSlotInner,
	  ssrRenderStyle: ssrRenderStyle,
	  ssrRenderSuspense: ssrRenderSuspense,
	  ssrRenderTeleport: ssrRenderTeleport,
	  ssrRenderVNode: renderVNode
	});

	const compileCache = /* @__PURE__ */ Object.create(null);
	function ssrCompile(template, instance) {
	  const Component = instance.type;
	  const { isCustomElement, compilerOptions } = instance.appContext.config;
	  const { delimiters, compilerOptions: componentCompilerOptions } = Component;
	  const finalCompilerOptions = shared.extend(
	    shared.extend(
	      {
	        isCustomElement,
	        delimiters
	      },
	      compilerOptions
	    ),
	    componentCompilerOptions
	  );
	  finalCompilerOptions.isCustomElement = finalCompilerOptions.isCustomElement || shared.NO;
	  finalCompilerOptions.isNativeTag = finalCompilerOptions.isNativeTag || shared.NO;
	  const cacheKey = JSON.stringify(
	    {
	      template,
	      compilerOptions: finalCompilerOptions
	    },
	    (key, value) => {
	      return shared.isFunction(value) ? value.toString() : value;
	    }
	  );
	  const cached = compileCache[cacheKey];
	  if (cached) {
	    return cached;
	  }
	  finalCompilerOptions.onError = (err) => {
	    {
	      throw err;
	    }
	  };
	  const { code } = compilerSsr.compile(template, finalCompilerOptions);
	  const requireMap = {
	    vue: Vue__namespace,
	    "vue/server-renderer": helpers
	  };
	  const fakeRequire = (id) => requireMap[id];
	  return compileCache[cacheKey] = Function("require", code)(fakeRequire);
	}

	const {
	  createComponentInstance,
	  setCurrentRenderingInstance,
	  setupComponent,
	  renderComponentRoot,
	  normalizeVNode,
	  pushWarningContext,
	  popWarningContext
	} = Vue.ssrUtils;
	function createBuffer() {
	  let appendable = false;
	  const buffer = [];
	  return {
	    getBuffer() {
	      return buffer;
	    },
	    push(item) {
	      const isStringItem = shared.isString(item);
	      if (appendable && isStringItem) {
	        buffer[buffer.length - 1] += item;
	        return;
	      }
	      buffer.push(item);
	      appendable = isStringItem;
	      if (shared.isPromise(item) || shared.isArray(item) && item.hasAsync) {
	        buffer.hasAsync = true;
	      }
	    }
	  };
	}
	function renderComponentVNode(vnode, parentComponent = null, slotScopeId) {
	  const instance = vnode.component = createComponentInstance(
	    vnode,
	    parentComponent,
	    null
	  );
	  const res = setupComponent(
	    instance,
	    true
	    /* isSSR */
	  );
	  const hasAsyncSetup = shared.isPromise(res);
	  let prefetches = instance.sp;
	  if (hasAsyncSetup || prefetches) {
	    const p = Promise.resolve(res).then(() => {
	      if (hasAsyncSetup) prefetches = instance.sp;
	      if (prefetches) {
	        return Promise.all(
	          prefetches.map((prefetch) => prefetch.call(instance.proxy))
	        );
	      }
	    }).catch(shared.NOOP);
	    return p.then(() => renderComponentSubTree(instance, slotScopeId));
	  } else {
	    return renderComponentSubTree(instance, slotScopeId);
	  }
	}
	function renderComponentSubTree(instance, slotScopeId) {
	  const comp = instance.type;
	  const { getBuffer, push } = createBuffer();
	  if (shared.isFunction(comp)) {
	    let root = renderComponentRoot(instance);
	    if (!comp.props) {
	      for (const key in instance.attrs) {
	        if (key.startsWith(`data-v-`)) {
	          (root.props || (root.props = {}))[key] = ``;
	        }
	      }
	    }
	    renderVNode(push, instance.subTree = root, instance, slotScopeId);
	  } else {
	    if ((!instance.render || instance.render === shared.NOOP) && !instance.ssrRender && !comp.ssrRender && shared.isString(comp.template)) {
	      comp.ssrRender = ssrCompile(comp.template, instance);
	    }
	    const ssrRender = instance.ssrRender || comp.ssrRender;
	    if (ssrRender) {
	      let attrs = instance.inheritAttrs !== false ? instance.attrs : void 0;
	      let hasCloned = false;
	      let cur = instance;
	      while (true) {
	        const scopeId = cur.vnode.scopeId;
	        if (scopeId) {
	          if (!hasCloned) {
	            attrs = { ...attrs };
	            hasCloned = true;
	          }
	          attrs[scopeId] = "";
	        }
	        const parent = cur.parent;
	        if (parent && parent.subTree && parent.subTree === cur.vnode) {
	          cur = parent;
	        } else {
	          break;
	        }
	      }
	      if (slotScopeId) {
	        if (!hasCloned) attrs = { ...attrs };
	        const slotScopeIdList = slotScopeId.trim().split(" ");
	        for (let i = 0; i < slotScopeIdList.length; i++) {
	          attrs[slotScopeIdList[i]] = "";
	        }
	      }
	      const prev = setCurrentRenderingInstance(instance);
	      try {
	        ssrRender(
	          instance.proxy,
	          push,
	          instance,
	          attrs,
	          // compiler-optimized bindings
	          instance.props,
	          instance.setupState,
	          instance.data,
	          instance.ctx
	        );
	      } finally {
	        setCurrentRenderingInstance(prev);
	      }
	    } else if (instance.render && instance.render !== shared.NOOP) {
	      renderVNode(
	        push,
	        instance.subTree = renderComponentRoot(instance),
	        instance,
	        slotScopeId
	      );
	    } else {
	      const componentName = comp.name || comp.__file || `<Anonymous>`;
	      Vue.warn(`Component ${componentName} is missing template or render function.`);
	      push(`<!---->`);
	    }
	  }
	  return getBuffer();
	}
	function renderVNode(push, vnode, parentComponent, slotScopeId) {
	  const { type, shapeFlag, children, dirs, props } = vnode;
	  if (dirs) {
	    vnode.props = applySSRDirectives(vnode, props, dirs);
	  }
	  switch (type) {
	    case Vue.Text:
	      push(shared.escapeHtml(children));
	      break;
	    case Vue.Comment:
	      push(
	        children ? `<!--${shared.escapeHtmlComment(children)}-->` : `<!---->`
	      );
	      break;
	    case Vue.Static:
	      push(children);
	      break;
	    case Vue.Fragment:
	      if (vnode.slotScopeIds) {
	        slotScopeId = (slotScopeId ? slotScopeId + " " : "") + vnode.slotScopeIds.join(" ");
	      }
	      push(`<!--[-->`);
	      renderVNodeChildren(
	        push,
	        children,
	        parentComponent,
	        slotScopeId
	      );
	      push(`<!--]-->`);
	      break;
	    default:
	      if (shapeFlag & 1) {
	        renderElementVNode(push, vnode, parentComponent, slotScopeId);
	      } else if (shapeFlag & 6) {
	        push(renderComponentVNode(vnode, parentComponent, slotScopeId));
	      } else if (shapeFlag & 64) {
	        renderTeleportVNode(push, vnode, parentComponent, slotScopeId);
	      } else if (shapeFlag & 128) {
	        renderVNode(push, vnode.ssContent, parentComponent, slotScopeId);
	      } else {
	        Vue.warn(
	          "[@vue/server-renderer] Invalid VNode type:",
	          type,
	          `(${typeof type})`
	        );
	      }
	  }
	}
	function renderVNodeChildren(push, children, parentComponent, slotScopeId) {
	  for (let i = 0; i < children.length; i++) {
	    renderVNode(push, normalizeVNode(children[i]), parentComponent, slotScopeId);
	  }
	}
	function renderElementVNode(push, vnode, parentComponent, slotScopeId) {
	  const tag = vnode.type;
	  let { props, children, shapeFlag, scopeId } = vnode;
	  let openTag = `<${tag}`;
	  if (props) {
	    openTag += ssrRenderAttrs(props, tag);
	  }
	  if (scopeId) {
	    openTag += ` ${scopeId}`;
	  }
	  let curParent = parentComponent;
	  let curVnode = vnode;
	  while (curParent && curVnode === curParent.subTree) {
	    curVnode = curParent.vnode;
	    if (curVnode.scopeId) {
	      openTag += ` ${curVnode.scopeId}`;
	    }
	    curParent = curParent.parent;
	  }
	  if (slotScopeId) {
	    openTag += ` ${slotScopeId}`;
	  }
	  push(openTag + `>`);
	  if (!shared.isVoidTag(tag)) {
	    let hasChildrenOverride = false;
	    if (props) {
	      if (props.innerHTML) {
	        hasChildrenOverride = true;
	        push(props.innerHTML);
	      } else if (props.textContent) {
	        hasChildrenOverride = true;
	        push(shared.escapeHtml(props.textContent));
	      } else if (tag === "textarea" && props.value) {
	        hasChildrenOverride = true;
	        push(shared.escapeHtml(props.value));
	      }
	    }
	    if (!hasChildrenOverride) {
	      if (shapeFlag & 8) {
	        push(shared.escapeHtml(children));
	      } else if (shapeFlag & 16) {
	        renderVNodeChildren(
	          push,
	          children,
	          parentComponent,
	          slotScopeId
	        );
	      }
	    }
	    push(`</${tag}>`);
	  }
	}
	function applySSRDirectives(vnode, rawProps, dirs) {
	  const toMerge = [];
	  for (let i = 0; i < dirs.length; i++) {
	    const binding = dirs[i];
	    const {
	      dir: { getSSRProps }
	    } = binding;
	    if (getSSRProps) {
	      const props = getSSRProps(binding, vnode);
	      if (props) toMerge.push(props);
	    }
	  }
	  return Vue.mergeProps(rawProps || {}, ...toMerge);
	}
	function renderTeleportVNode(push, vnode, parentComponent, slotScopeId) {
	  const target = vnode.props && vnode.props.to;
	  const disabled = vnode.props && vnode.props.disabled;
	  if (!target) {
	    if (!disabled) {
	      Vue.warn(`[@vue/server-renderer] Teleport is missing target prop.`);
	    }
	    return [];
	  }
	  if (!shared.isString(target)) {
	    Vue.warn(
	      `[@vue/server-renderer] Teleport target must be a query selector string.`
	    );
	    return [];
	  }
	  ssrRenderTeleport(
	    push,
	    (push2) => {
	      renderVNodeChildren(
	        push2,
	        vnode.children,
	        parentComponent,
	        slotScopeId
	      );
	    },
	    target,
	    disabled || disabled === "",
	    parentComponent
	  );
	}

	const { isVNode: isVNode$1 } = Vue.ssrUtils;
	function nestedUnrollBuffer(buffer, parentRet, startIndex) {
	  if (!buffer.hasAsync) {
	    return parentRet + unrollBufferSync$1(buffer);
	  }
	  let ret = parentRet;
	  for (let i = startIndex; i < buffer.length; i += 1) {
	    const item = buffer[i];
	    if (shared.isString(item)) {
	      ret += item;
	      continue;
	    }
	    if (shared.isPromise(item)) {
	      return item.then((nestedItem) => {
	        buffer[i] = nestedItem;
	        return nestedUnrollBuffer(buffer, ret, i);
	      });
	    }
	    const result = nestedUnrollBuffer(item, ret, 0);
	    if (shared.isPromise(result)) {
	      return result.then((nestedItem) => {
	        buffer[i] = nestedItem;
	        return nestedUnrollBuffer(buffer, "", i);
	      });
	    }
	    ret = result;
	  }
	  return ret;
	}
	function unrollBuffer$1(buffer) {
	  return nestedUnrollBuffer(buffer, "", 0);
	}
	function unrollBufferSync$1(buffer) {
	  let ret = "";
	  for (let i = 0; i < buffer.length; i++) {
	    let item = buffer[i];
	    if (shared.isString(item)) {
	      ret += item;
	    } else {
	      ret += unrollBufferSync$1(item);
	    }
	  }
	  return ret;
	}
	async function renderToString(input, context = {}) {
	  if (isVNode$1(input)) {
	    return renderToString(Vue.createApp({ render: () => input }), context);
	  }
	  const vnode = Vue.createVNode(input._component, input._props);
	  vnode.appContext = input._context;
	  input.provide(Vue.ssrContextKey, context);
	  const buffer = await renderComponentVNode(vnode);
	  const result = await unrollBuffer$1(buffer);
	  await resolveTeleports(context);
	  if (context.__watcherHandles) {
	    for (const unwatch of context.__watcherHandles) {
	      unwatch();
	    }
	  }
	  return result;
	}
	async function resolveTeleports(context) {
	  if (context.__teleportBuffers) {
	    context.teleports = context.teleports || {};
	    for (const key in context.__teleportBuffers) {
	      context.teleports[key] = await unrollBuffer$1(
	        await Promise.all([context.__teleportBuffers[key]])
	      );
	    }
	  }
	}

	const { isVNode } = Vue.ssrUtils;
	async function unrollBuffer(buffer, stream) {
	  if (buffer.hasAsync) {
	    for (let i = 0; i < buffer.length; i++) {
	      let item = buffer[i];
	      if (shared.isPromise(item)) {
	        item = await item;
	      }
	      if (shared.isString(item)) {
	        stream.push(item);
	      } else {
	        await unrollBuffer(item, stream);
	      }
	    }
	  } else {
	    unrollBufferSync(buffer, stream);
	  }
	}
	function unrollBufferSync(buffer, stream) {
	  for (let i = 0; i < buffer.length; i++) {
	    let item = buffer[i];
	    if (shared.isString(item)) {
	      stream.push(item);
	    } else {
	      unrollBufferSync(item, stream);
	    }
	  }
	}
	function renderToSimpleStream(input, context, stream) {
	  if (isVNode(input)) {
	    return renderToSimpleStream(
	      Vue.createApp({ render: () => input }),
	      context,
	      stream
	    );
	  }
	  const vnode = Vue.createVNode(input._component, input._props);
	  vnode.appContext = input._context;
	  input.provide(Vue.ssrContextKey, context);
	  Promise.resolve(renderComponentVNode(vnode)).then((buffer) => unrollBuffer(buffer, stream)).then(() => resolveTeleports(context)).then(() => {
	    if (context.__watcherHandles) {
	      for (const unwatch of context.__watcherHandles) {
	        unwatch();
	      }
	    }
	  }).then(() => stream.push(null)).catch((error) => {
	    stream.destroy(error);
	  });
	  return stream;
	}
	function renderToStream(input, context = {}) {
	  console.warn(
	    `[@vue/server-renderer] renderToStream is deprecated - use renderToNodeStream instead.`
	  );
	  return renderToNodeStream(input, context);
	}
	function renderToNodeStream(input, context = {}) {
	  const stream = new (require$$3$1).Readable({ read() {
	  } }) ;
	  if (!stream) {
	    throw new Error(
	      `ESM build of renderToStream() does not support renderToNodeStream(). Use pipeToNodeWritable() with an existing Node.js Writable stream instance instead.`
	    );
	  }
	  return renderToSimpleStream(input, context, stream);
	}
	function pipeToNodeWritable(input, context = {}, writable) {
	  renderToSimpleStream(input, context, {
	    push(content) {
	      if (content != null) {
	        writable.write(content);
	      } else {
	        writable.end();
	      }
	    },
	    destroy(err) {
	      writable.destroy(err);
	    }
	  });
	}
	function renderToWebStream(input, context = {}) {
	  if (typeof ReadableStream !== "function") {
	    throw new Error(
	      `ReadableStream constructor is not available in the global scope. If the target environment does support web streams, consider using pipeToWebWritable() with an existing WritableStream instance instead.`
	    );
	  }
	  const encoder = new TextEncoder();
	  let cancelled = false;
	  return new ReadableStream({
	    start(controller) {
	      renderToSimpleStream(input, context, {
	        push(content) {
	          if (cancelled) return;
	          if (content != null) {
	            controller.enqueue(encoder.encode(content));
	          } else {
	            controller.close();
	          }
	        },
	        destroy(err) {
	          controller.error(err);
	        }
	      });
	    },
	    cancel() {
	      cancelled = true;
	    }
	  });
	}
	function pipeToWebWritable(input, context = {}, writable) {
	  const writer = writable.getWriter();
	  const encoder = new TextEncoder();
	  let hasReady = false;
	  try {
	    hasReady = shared.isPromise(writer.ready);
	  } catch (e) {
	  }
	  renderToSimpleStream(input, context, {
	    async push(content) {
	      if (hasReady) {
	        await writer.ready;
	      }
	      if (content != null) {
	        return writer.write(encoder.encode(content));
	      } else {
	        return writer.close();
	      }
	    },
	    destroy(err) {
	      console.log(err);
	      writer.close();
	    }
	  });
	}

	Vue.initDirectivesForSSR();

	serverRenderer_cjs_prod.ssrIncludeBooleanAttr = shared.includeBooleanAttr;
	serverRenderer_cjs_prod.pipeToNodeWritable = pipeToNodeWritable;
	serverRenderer_cjs_prod.pipeToWebWritable = pipeToWebWritable;
	serverRenderer_cjs_prod.renderToNodeStream = renderToNodeStream;
	serverRenderer_cjs_prod.renderToSimpleStream = renderToSimpleStream;
	serverRenderer_cjs_prod.renderToStream = renderToStream;
	serverRenderer_cjs_prod.renderToString = renderToString;
	serverRenderer_cjs_prod.renderToWebStream = renderToWebStream;
	serverRenderer_cjs_prod.ssrGetDirectiveProps = ssrGetDirectiveProps;
	serverRenderer_cjs_prod.ssrGetDynamicModelProps = ssrGetDynamicModelProps;
	serverRenderer_cjs_prod.ssrInterpolate = ssrInterpolate;
	serverRenderer_cjs_prod.ssrLooseContain = ssrLooseContain;
	serverRenderer_cjs_prod.ssrLooseEqual = ssrLooseEqual;
	serverRenderer_cjs_prod.ssrRenderAttr = ssrRenderAttr;
	serverRenderer_cjs_prod.ssrRenderAttrs = ssrRenderAttrs;
	serverRenderer_cjs_prod.ssrRenderClass = ssrRenderClass;
	serverRenderer_cjs_prod.ssrRenderComponent = ssrRenderComponent;
	serverRenderer_cjs_prod.ssrRenderDynamicAttr = ssrRenderDynamicAttr;
	serverRenderer_cjs_prod.ssrRenderDynamicModel = ssrRenderDynamicModel;
	serverRenderer_cjs_prod.ssrRenderList = ssrRenderList;
	serverRenderer_cjs_prod.ssrRenderSlot = ssrRenderSlot;
	serverRenderer_cjs_prod.ssrRenderSlotInner = ssrRenderSlotInner;
	serverRenderer_cjs_prod.ssrRenderStyle = ssrRenderStyle;
	serverRenderer_cjs_prod.ssrRenderSuspense = ssrRenderSuspense;
	serverRenderer_cjs_prod.ssrRenderTeleport = ssrRenderTeleport;
	serverRenderer_cjs_prod.ssrRenderVNode = renderVNode;
	return serverRenderer_cjs_prod;
}

var serverRenderer_cjs_prodExports = requireServerRenderer_cjs_prod();

const contexts$1 = /* @__PURE__ */ new WeakMap();
const ID_PREFIX$1 = "s";
function getContext$1(rendererContextResult) {
  if (contexts$1.has(rendererContextResult)) {
    return contexts$1.get(rendererContextResult);
  }
  const ctx = {
    currentIndex: 0,
    get id() {
      return ID_PREFIX$1 + this.currentIndex.toString();
    }
  };
  contexts$1.set(rendererContextResult, ctx);
  return ctx;
}
function incrementId$1(rendererContextResult) {
  const ctx = getContext$1(rendererContextResult);
  const id = ctx.id;
  ctx.currentIndex++;
  return id;
}

const StaticHtml$1 = vueExports.defineComponent({
  props: {
    value: String,
    name: String,
    hydrate: {
      type: Boolean,
      default: true
    }
  },
  setup({ name, value, hydrate }) {
    if (!value) return () => null;
    let tagName = hydrate ? "astro-slot" : "astro-static-slot";
    return () => vueExports.h(tagName, { name, innerHTML: value });
  }
});
var static_html_default$1 = StaticHtml$1;

async function check$1(Component) {
  return !!Component["ssrRender"] || !!Component["__ssrInlineRender"];
}
async function renderToStaticMarkup$1(Component, inputProps, slotted, metadata) {
  let prefix;
  if (this && this.result) {
    prefix = incrementId$1(this.result);
  }
  const attrs = { prefix };
  const slots = {};
  const props = { ...inputProps };
  delete props.slot;
  for (const [key, value] of Object.entries(slotted)) {
    slots[key] = () => vueExports.h(static_html_default$1, {
      value,
      name: key === "default" ? void 0 : key,
      // Adjust how this is hydrated only when the version of Astro supports `astroStaticSlot`
      hydrate: metadata?.astroStaticSlot ? !!metadata.hydrate : true
    });
  }
  const app = vueExports.createSSRApp({ render: () => vueExports.h(Component, props, slots) });
  app.config.idPrefix = prefix;
  await setup();
  const html = await serverRenderer_cjs_prodExports.renderToString(app);
  return { html, attrs };
}
const renderer$1 = {
  name: "@astrojs/vue",
  check: check$1,
  renderToStaticMarkup: renderToStaticMarkup$1,
  supportsAstroStaticSlot: true
};
var server_default$1 = renderer$1;

const contexts = /* @__PURE__ */ new WeakMap();
const ID_PREFIX = "r";
function getContext(rendererContextResult) {
  if (contexts.has(rendererContextResult)) {
    return contexts.get(rendererContextResult);
  }
  const ctx = {
    currentIndex: 0,
    get id() {
      return ID_PREFIX + this.currentIndex.toString();
    }
  };
  contexts.set(rendererContextResult, ctx);
  return ctx;
}
function incrementId(rendererContextResult) {
  const ctx = getContext(rendererContextResult);
  const id = ctx.id;
  ctx.currentIndex++;
  return id;
}

const StaticHtml = ({
  value,
  name,
  hydrate = true
}) => {
  if (!value) return null;
  const tagName = hydrate ? "astro-slot" : "astro-static-slot";
  return createElement(tagName, {
    name,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: value }
  });
};
StaticHtml.shouldComponentUpdate = () => false;
var static_html_default = StaticHtml;

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
const reactTypeof = Symbol.for("react.element");
const reactTransitionalTypeof = Symbol.for("react.transitional.element");
async function check(Component, props, children) {
  if (typeof Component === "object") {
    return Component["$$typeof"].toString().slice("Symbol(".length).startsWith("react");
  }
  if (typeof Component !== "function") return false;
  if (Component.name === "QwikComponent") return false;
  if (typeof Component === "function" && Component["$$typeof"] === Symbol.for("react.forward_ref"))
    return false;
  if (Component.prototype != null && typeof Component.prototype.render === "function") {
    return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
  }
  let isReactComponent = false;
  function Tester(...args) {
    try {
      const vnode = Component(...args);
      if (vnode && (vnode["$$typeof"] === reactTypeof || vnode["$$typeof"] === reactTransitionalTypeof)) {
        isReactComponent = true;
      }
    } catch {
    }
    return React.createElement("div");
  }
  await renderToStaticMarkup.call(this, Tester, props, children);
  return isReactComponent;
}
async function getNodeWritable() {
  let nodeStreamBuiltinModuleName = "node:stream";
  let { Writable } = await import(
    /* @vite-ignore */
    nodeStreamBuiltinModuleName
  );
  return Writable;
}
function needsHydration(metadata) {
  return metadata?.astroStaticSlot ? !!metadata.hydrate : true;
}
async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
  let prefix;
  if (this && this.result) {
    prefix = incrementId(this.result);
  }
  const attrs = { prefix };
  delete props["class"];
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = React.createElement(static_html_default, {
      hydrate: needsHydration(metadata),
      value,
      name
    });
  }
  const newProps = {
    ...props,
    ...slots
  };
  const newChildren = children ?? props.children;
  if (newChildren != null) {
    newProps.children = React.createElement(static_html_default, {
      hydrate: needsHydration(metadata),
      value: newChildren
    });
  }
  const formState = this ? await getFormState(this) : void 0;
  if (formState) {
    attrs["data-action-result"] = JSON.stringify(formState[0]);
    attrs["data-action-key"] = formState[1];
    attrs["data-action-name"] = formState[2];
  }
  const vnode = React.createElement(Component, newProps);
  const renderOptions = {
    identifierPrefix: prefix,
    formState
  };
  let html;
  if ("renderToReadableStream" in ReactDOM) {
    html = await renderToReadableStreamAsync(vnode, renderOptions);
  } else {
    html = await renderToPipeableStreamAsync(vnode, renderOptions);
  }
  return { html, attrs };
}
async function getFormState({
  result
}) {
  const { request, actionResult } = result;
  if (!actionResult) return void 0;
  if (!isFormRequest(request.headers.get("content-type"))) return void 0;
  const { searchParams } = new URL(request.url);
  const formData = await request.clone().formData();
  const actionKey = formData.get("$ACTION_KEY")?.toString();
  const actionName = searchParams.get("_action");
  if (!actionKey || !actionName) return void 0;
  return [actionResult, actionKey, actionName];
}
async function renderToPipeableStreamAsync(vnode, options) {
  const Writable = await getNodeWritable();
  let html = "";
  return new Promise((resolve, reject) => {
    let error = void 0;
    let stream = ReactDOM.renderToPipeableStream(vnode, {
      ...options,
      onError(err) {
        error = err;
        reject(error);
      },
      onAllReady() {
        stream.pipe(
          new Writable({
            write(chunk, _encoding, callback) {
              html += chunk.toString("utf-8");
              callback();
            },
            destroy() {
              resolve(html);
            }
          })
        );
      }
    });
  });
}
async function readResult(stream) {
  const reader = stream.getReader();
  let result = "";
  const decoder = new TextDecoder("utf-8");
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      if (value) {
        result += decoder.decode(value);
      } else {
        decoder.decode(new Uint8Array());
      }
      return result;
    }
    result += decoder.decode(value, { stream: true });
  }
}
async function renderToReadableStreamAsync(vnode, options) {
  return await readResult(await ReactDOM.renderToReadableStream(vnode, options));
}
const formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function isFormRequest(contentType) {
  const type = contentType?.split(";")[0].toLowerCase();
  return formContentTypes.some((t) => type === t);
}
const renderer = {
  name: "@astrojs/react",
  check,
  renderToStaticMarkup,
  supportsAstroStaticSlot: true
};
var server_default = renderer;

const renderers = [Object.assign({"name":"@astrojs/vue","clientEntrypoint":"@astrojs/vue/client.js","serverEntrypoint":"@astrojs/vue/server.js"}, { ssr: server_default$1 }),Object.assign({"name":"@astrojs/react","clientEntrypoint":"@astrojs/react/client.js","serverEntrypoint":"@astrojs/react/server.js"}, { ssr: server_default }),];

export { renderers as r, serverRenderer_cjs_prodExports as s, vueExports as v };
