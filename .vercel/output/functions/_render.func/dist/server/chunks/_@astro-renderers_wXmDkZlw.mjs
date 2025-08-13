import require$$0 from '@vue/compiler-dom';
import require$$1 from '@vue/runtime-dom';
import require$$2 from '@vue/shared';
import require$$2$1 from '@vue/compiler-ssr';
import require$$3 from 'node:stream';
import React, { createElement } from 'react';
import ReactDOM from 'react-dom/server';

const setup = () => {};

var vue = {exports: {}};

var vue_cjs_prod = {};

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

		var compilerDom = require$$0;
		var runtimeDom = require$$1;
		var shared = require$$2;

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

		var compilerDom = require$$0;
		var runtimeDom = require$$1;
		var shared = require$$2;

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
	var shared = require$$2;
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
	  const stream = new (require$$3).Readable({ read() {
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
