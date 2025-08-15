import { o as getDefaultExportFromCjs, p as commonjsGlobal } from './astro/server_D41xs3ow.mjs';
import require$$0, { Readable } from 'stream';
import require$$1 from 'zlib';
import c$2 from 'url';
import require$$1$4, { Agent } from 'http';
import require$$2, { Agent as Agent$1 } from 'https';
import require$$4 from 'assert';
import require$$1$1 from 'tty';
import require$$1$3 from 'util';
import require$$1$2 from 'os';
import n$2 from 'querystring';
import require$$0$2 from 'events';
import require$$0$1 from 'buffer';
import 'net';
import require$$1$5 from 'tls';
import crypto from 'crypto';

function _mergeNamespaces(n, m) {
	for (var i = 0; i < m.length; i++) {
		const e = m[i];
		if (typeof e !== 'string' && !Array.isArray(e)) { for (const k in e) {
			if (k !== 'default' && !(k in n)) {
				const d = Object.getOwnPropertyDescriptor(e, k);
				if (d) {
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: () => e[k]
					});
				}
			}
		} }
	}
	return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }));
}

const e$1=!(typeof navigator>"u")&&"ReactNative"===navigator.product,t$1={timeout:e$1?6e4:12e4},r$1=function(r){const a={...t$1,..."string"==typeof r?{url:r}:r};if(a.timeout=o$2(a.timeout),a.query){const{url:t,searchParams:r}=function(t){const r=t.indexOf("?");if(-1===r)return {url:t,searchParams:new URLSearchParams};const o=t.slice(0,r),a=t.slice(r+1);if(!e$1)return {url:o,searchParams:new URLSearchParams(a)};if("function"!=typeof decodeURIComponent)throw new Error("Broken `URLSearchParams` implementation, and `decodeURIComponent` is not defined");const s=new URLSearchParams;for(const e of a.split("&")){const[t,r]=e.split("=");t&&s.append(n$1(t),n$1(r||""));}return {url:o,searchParams:s}}(a.url);for(const[e,n]of Object.entries(a.query)){if(void 0!==n)if(Array.isArray(n))for(const t of n)r.append(e,t);else r.append(e,n);const o=r.toString();o&&(a.url=`${t}?${o}`);}}return a.method=a.body&&!a.method?"POST":(a.method||"GET").toUpperCase(),a};function n$1(e){return decodeURIComponent(e.replace(/\+/g," "))}function o$2(e){if(false===e||0===e)return  false;if(e.connect||e.socket)return e;const r=Number(e);return isNaN(r)?o$2(t$1.timeout):{connect:r,socket:r}}const a$1=/^https?:\/\//i,s$1=function(e){if(!a$1.test(e.url))throw new Error(`"${e.url}" is not a valid URL`)};

const r=["request","response","progress","error","abort"],o$1=["processOptions","validateOptions","interceptRequest","finalizeOptions","onRequest","onResponse","onError","onReturn","onHeaders"];function n(s,i){const u=[],a=o$1.reduce((e,t)=>(e[t]=e[t]||[],e),{processOptions:[r$1],validateOptions:[s$1]});function c(e){const t=r.reduce((e,t)=>(e[t]=function(){const e=/* @__PURE__ */Object.create(null);let t=0;return {publish:function(t){for(const r in e)e[r](t);},subscribe:function(r){const o=t++;return e[o]=r,function(){delete e[o];}}}}(),e),{}),o=(e=>function(t,r,...o){const n="onError"===t;let s=r;for(let r=0;r<e[t].length&&(s=(0, e[t][r])(s,...o),!n||s);r++);return s})(a),n=o("processOptions",e);o("validateOptions",n);const s={options:n,channels:t,applyMiddleware:o};let u;const c=t.request.subscribe(e=>{u=i(e,(r,n)=>((e,r,n)=>{let s=e,i=r;if(!s)try{i=o("onResponse",r,n);}catch(e){i=null,s=e;}s=s&&o("onError",s,n),s?t.error.publish(s):i&&t.response.publish(i);})(r,n,e));});t.abort.subscribe(()=>{c(),u&&u.abort();});const l=o("onReturn",t,s);return l===t&&t.request.publish(s),l}return c.use=function(e){if(!e)throw new Error("Tried to add middleware that resolved to falsey value");if("function"==typeof e)throw new Error("Tried to add middleware that was a function. It probably expects you to pass options to it.");if(e.onReturn&&a.onReturn.length>0)throw new Error("Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event");return o$1.forEach(t=>{e[t]&&a[t].push(e[t]);}),u.push(e),c},c.clone=()=>n(u,i),s.forEach(c.use),c}

var mimicResponse;
var hasRequiredMimicResponse;

function requireMimicResponse () {
	if (hasRequiredMimicResponse) return mimicResponse;
	hasRequiredMimicResponse = 1;

	// We define these manually to ensure they're always copied
	// even if they would move up the prototype chain
	// https://nodejs.org/api/http.html#http_class_http_incomingmessage
	const knownProperties = [
		'aborted',
		'complete',
		'headers',
		'httpVersion',
		'httpVersionMinor',
		'httpVersionMajor',
		'method',
		'rawHeaders',
		'rawTrailers',
		'setTimeout',
		'socket',
		'statusCode',
		'statusMessage',
		'trailers',
		'url'
	];

	mimicResponse = (fromStream, toStream) => {
		if (toStream._readableState.autoDestroy) {
			throw new Error('The second stream must have the `autoDestroy` option set to `false`');
		}

		const fromProperties = new Set(Object.keys(fromStream).concat(knownProperties));

		const properties = {};

		for (const property of fromProperties) {
			// Don't overwrite existing properties.
			if (property in toStream) {
				continue;
			}

			properties[property] = {
				get() {
					const value = fromStream[property];
					const isFunction = typeof value === 'function';

					return isFunction ? value.bind(fromStream) : value;
				},
				set(value) {
					fromStream[property] = value;
				},
				enumerable: true,
				configurable: false
			};
		}

		Object.defineProperties(toStream, properties);

		fromStream.once('aborted', () => {
			toStream.destroy();

			toStream.emit('aborted');
		});

		fromStream.once('close', () => {
			if (fromStream.complete) {
				if (toStream.readable) {
					toStream.once('end', () => {
						toStream.emit('close');
					});
				} else {
					toStream.emit('close');
				}
			} else {
				toStream.emit('close');
			}
		});

		return toStream;
	};
	return mimicResponse;
}

var decompressResponse;
var hasRequiredDecompressResponse;

function requireDecompressResponse () {
	if (hasRequiredDecompressResponse) return decompressResponse;
	hasRequiredDecompressResponse = 1;
	const {Transform, PassThrough} = require$$0;
	const zlib = require$$1;
	const mimicResponse = requireMimicResponse();

	decompressResponse = response => {
		const contentEncoding = (response.headers['content-encoding'] || '').toLowerCase();
		delete response.headers['content-encoding'];

		if (!['gzip', 'deflate', 'br'].includes(contentEncoding)) {
			return response;
		}

		// TODO: Remove this when targeting Node.js 12.
		const isBrotli = contentEncoding === 'br';
		if (isBrotli && typeof zlib.createBrotliDecompress !== 'function') {
			response.destroy(new Error('Brotli is not supported on Node.js < 12'));
			return response;
		}

		let isEmpty = true;

		const checker = new Transform({
			transform(data, _encoding, callback) {
				isEmpty = false;

				callback(null, data);
			},

			flush(callback) {
				callback();
			}
		});

		const finalStream = new PassThrough({
			autoDestroy: false,
			destroy(error, callback) {
				response.destroy();

				callback(error);
			}
		});

		const decompressStream = isBrotli ? zlib.createBrotliDecompress() : zlib.createUnzip();

		decompressStream.once('error', error => {
			if (isEmpty && !response.readable) {
				finalStream.end();
				return;
			}

			finalStream.destroy(error);
		});

		mimicResponse(response, finalStream);
		response.pipe(checker).pipe(decompressStream).pipe(finalStream);

		return finalStream;
	};
	return decompressResponse;
}

var decompressResponseExports = requireDecompressResponse();
const e = /*@__PURE__*/getDefaultExportFromCjs(decompressResponseExports);

var followRedirects = {exports: {}};

var src = {exports: {}};

var browser = {exports: {}};

/**
 * Helpers.
 */

var ms;
var hasRequiredMs;

function requireMs () {
	if (hasRequiredMs) return ms;
	hasRequiredMs = 1;
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	ms = function (val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isFinite(val)) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
	    'val is not a non-empty string or a valid number. val=' +
	      JSON.stringify(val)
	  );
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'weeks':
	    case 'week':
	    case 'w':
	      return n * w;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (msAbs >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (msAbs >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (msAbs >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return plural(ms, msAbs, d, 'day');
	  }
	  if (msAbs >= h) {
	    return plural(ms, msAbs, h, 'hour');
	  }
	  if (msAbs >= m) {
	    return plural(ms, msAbs, m, 'minute');
	  }
	  if (msAbs >= s) {
	    return plural(ms, msAbs, s, 'second');
	  }
	  return ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, msAbs, n, name) {
	  var isPlural = msAbs >= n * 1.5;
	  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
	}
	return ms;
}

var common;
var hasRequiredCommon;

function requireCommon () {
	if (hasRequiredCommon) return common;
	hasRequiredCommon = 1;
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 */

	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = requireMs();
		createDebug.destroy = destroy;

		Object.keys(env).forEach(key => {
			createDebug[key] = env[key];
		});

		/**
		* The currently active debug mode names, and names to skip.
		*/

		createDebug.names = [];
		createDebug.skips = [];

		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.formatters = {};

		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;

			for (let i = 0; i < namespace.length; i++) {
				hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
				hash |= 0; // Convert to 32bit integer
			}

			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;

		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;

			function debug(...args) {
				// Disabled?
				if (!debug.enabled) {
					return;
				}

				const self = debug;

				// Set `diff` timestamp
				const curr = Number(new Date());
				const ms = curr - (prevTime || curr);
				self.diff = ms;
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;

				args[0] = createDebug.coerce(args[0]);

				if (typeof args[0] !== 'string') {
					// Anything else let's inspect with %O
					args.unshift('%O');
				}

				// Apply any `formatters` transformations
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					// If we encounter an escaped % then don't increase the array index
					if (match === '%%') {
						return '%';
					}
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === 'function') {
						const val = args[index];
						match = formatter.call(self, val);

						// Now we need to remove `args[index]` since it's inlined in the `format`
						args.splice(index, 1);
						index--;
					}
					return match;
				});

				// Apply env-specific formatting (colors, etc.)
				createDebug.formatArgs.call(self, args);

				const logFn = self.log || createDebug.log;
				logFn.apply(self, args);
			}

			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

			Object.defineProperty(debug, 'enabled', {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) {
						return enableOverride;
					}
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}

					return enabledCache;
				},
				set: v => {
					enableOverride = v;
				}
			});

			// Env-specific initialization logic for debug instances
			if (typeof createDebug.init === 'function') {
				createDebug.init(debug);
			}

			return debug;
		}

		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}

		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;

			createDebug.names = [];
			createDebug.skips = [];

			const split = (typeof namespaces === 'string' ? namespaces : '')
				.trim()
				.replace(/\s+/g, ',')
				.split(',')
				.filter(Boolean);

			for (const ns of split) {
				if (ns[0] === '-') {
					createDebug.skips.push(ns.slice(1));
				} else {
					createDebug.names.push(ns);
				}
			}
		}

		/**
		 * Checks if the given string matches a namespace template, honoring
		 * asterisks as wildcards.
		 *
		 * @param {String} search
		 * @param {String} template
		 * @return {Boolean}
		 */
		function matchesTemplate(search, template) {
			let searchIndex = 0;
			let templateIndex = 0;
			let starIndex = -1;
			let matchIndex = 0;

			while (searchIndex < search.length) {
				if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')) {
					// Match character or proceed with wildcard
					if (template[templateIndex] === '*') {
						starIndex = templateIndex;
						matchIndex = searchIndex;
						templateIndex++; // Skip the '*'
					} else {
						searchIndex++;
						templateIndex++;
					}
				} else if (starIndex !== -1) { // eslint-disable-line no-negated-condition
					// Backtrack to the last '*' and try to match more characters
					templateIndex = starIndex + 1;
					matchIndex++;
					searchIndex = matchIndex;
				} else {
					return false; // No match
				}
			}

			// Handle trailing '*' in template
			while (templateIndex < template.length && template[templateIndex] === '*') {
				templateIndex++;
			}

			return templateIndex === template.length;
		}

		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			const namespaces = [
				...createDebug.names,
				...createDebug.skips.map(namespace => '-' + namespace)
			].join(',');
			createDebug.enable('');
			return namespaces;
		}

		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			for (const skip of createDebug.skips) {
				if (matchesTemplate(name, skip)) {
					return false;
				}
			}

			for (const ns of createDebug.names) {
				if (matchesTemplate(name, ns)) {
					return true;
				}
			}

			return false;
		}

		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			if (val instanceof Error) {
				return val.stack || val.message;
			}
			return val;
		}

		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}

		createDebug.enable(createDebug.load());

		return createDebug;
	}

	common = setup;
	return common;
}

/* eslint-env browser */

var hasRequiredBrowser;

function requireBrowser () {
	if (hasRequiredBrowser) return browser.exports;
	hasRequiredBrowser = 1;
	(function (module, exports) {
		/**
		 * This is the web browser implementation of `debug()`.
		 */

		exports.formatArgs = formatArgs;
		exports.save = save;
		exports.load = load;
		exports.useColors = useColors;
		exports.storage = localstorage();
		exports.destroy = (() => {
			let warned = false;

			return () => {
				if (!warned) {
					warned = true;
					console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
				}
			};
		})();

		/**
		 * Colors.
		 */

		exports.colors = [
			'#0000CC',
			'#0000FF',
			'#0033CC',
			'#0033FF',
			'#0066CC',
			'#0066FF',
			'#0099CC',
			'#0099FF',
			'#00CC00',
			'#00CC33',
			'#00CC66',
			'#00CC99',
			'#00CCCC',
			'#00CCFF',
			'#3300CC',
			'#3300FF',
			'#3333CC',
			'#3333FF',
			'#3366CC',
			'#3366FF',
			'#3399CC',
			'#3399FF',
			'#33CC00',
			'#33CC33',
			'#33CC66',
			'#33CC99',
			'#33CCCC',
			'#33CCFF',
			'#6600CC',
			'#6600FF',
			'#6633CC',
			'#6633FF',
			'#66CC00',
			'#66CC33',
			'#9900CC',
			'#9900FF',
			'#9933CC',
			'#9933FF',
			'#99CC00',
			'#99CC33',
			'#CC0000',
			'#CC0033',
			'#CC0066',
			'#CC0099',
			'#CC00CC',
			'#CC00FF',
			'#CC3300',
			'#CC3333',
			'#CC3366',
			'#CC3399',
			'#CC33CC',
			'#CC33FF',
			'#CC6600',
			'#CC6633',
			'#CC9900',
			'#CC9933',
			'#CCCC00',
			'#CCCC33',
			'#FF0000',
			'#FF0033',
			'#FF0066',
			'#FF0099',
			'#FF00CC',
			'#FF00FF',
			'#FF3300',
			'#FF3333',
			'#FF3366',
			'#FF3399',
			'#FF33CC',
			'#FF33FF',
			'#FF6600',
			'#FF6633',
			'#FF9900',
			'#FF9933',
			'#FFCC00',
			'#FFCC33'
		];

		/**
		 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
		 * and the Firebug extension (any Firefox version) are known
		 * to support "%c" CSS customizations.
		 *
		 * TODO: add a `localStorage` variable to explicitly enable/disable colors
		 */

		// eslint-disable-next-line complexity
		function useColors() {
			// NB: In an Electron preload script, document will be defined but not fully
			// initialized. Since we know we're in Chrome, we'll just detect this case
			// explicitly
			if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
				return true;
			}

			// Internet Explorer and Edge do not support colors.
			if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
				return false;
			}

			let m;

			// Is webkit? http://stackoverflow.com/a/16459606/376773
			// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
			// eslint-disable-next-line no-return-assign
			return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
				// Is firebug? http://stackoverflow.com/a/398120/376773
				(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
				// Is firefox >= v31?
				// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
				(typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31) ||
				// Double check webkit in userAgent just in case we are in a worker
				(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
		}

		/**
		 * Colorize log arguments if enabled.
		 *
		 * @api public
		 */

		function formatArgs(args) {
			args[0] = (this.useColors ? '%c' : '') +
				this.namespace +
				(this.useColors ? ' %c' : ' ') +
				args[0] +
				(this.useColors ? '%c ' : ' ') +
				'+' + module.exports.humanize(this.diff);

			if (!this.useColors) {
				return;
			}

			const c = 'color: ' + this.color;
			args.splice(1, 0, c, 'color: inherit');

			// The final "%c" is somewhat tricky, because there could be other
			// arguments passed either before or after the %c, so we need to
			// figure out the correct index to insert the CSS into
			let index = 0;
			let lastC = 0;
			args[0].replace(/%[a-zA-Z%]/g, match => {
				if (match === '%%') {
					return;
				}
				index++;
				if (match === '%c') {
					// We only are interested in the *last* %c
					// (the user may have provided their own)
					lastC = index;
				}
			});

			args.splice(lastC, 0, c);
		}

		/**
		 * Invokes `console.debug()` when available.
		 * No-op when `console.debug` is not a "function".
		 * If `console.debug` is not available, falls back
		 * to `console.log`.
		 *
		 * @api public
		 */
		exports.log = console.debug || console.log || (() => {});

		/**
		 * Save `namespaces`.
		 *
		 * @param {String} namespaces
		 * @api private
		 */
		function save(namespaces) {
			try {
				if (namespaces) {
					exports.storage.setItem('debug', namespaces);
				} else {
					exports.storage.removeItem('debug');
				}
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		/**
		 * Load `namespaces`.
		 *
		 * @return {String} returns the previously persisted debug modes
		 * @api private
		 */
		function load() {
			let r;
			try {
				r = exports.storage.getItem('debug') || exports.storage.getItem('DEBUG') ;
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}

			// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
			if (!r && typeof process !== 'undefined' && 'env' in process) {
				r = process.env.DEBUG;
			}

			return r;
		}

		/**
		 * Localstorage attempts to return the localstorage.
		 *
		 * This is necessary because safari throws
		 * when a user disables cookies/localstorage
		 * and you attempt to access it.
		 *
		 * @return {LocalStorage}
		 * @api private
		 */

		function localstorage() {
			try {
				// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
				// The Browser also has localStorage in the global context.
				return localStorage;
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		module.exports = requireCommon()(exports);

		const {formatters} = module.exports;

		/**
		 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
		 */

		formatters.j = function (v) {
			try {
				return JSON.stringify(v);
			} catch (error) {
				return '[UnexpectedJSONParseError]: ' + error.message;
			}
		}; 
	} (browser, browser.exports));
	return browser.exports;
}

var node$1 = {exports: {}};

var hasFlag;
var hasRequiredHasFlag;

function requireHasFlag () {
	if (hasRequiredHasFlag) return hasFlag;
	hasRequiredHasFlag = 1;

	hasFlag = (flag, argv = process.argv) => {
		const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
		const position = argv.indexOf(prefix + flag);
		const terminatorPosition = argv.indexOf('--');
		return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
	};
	return hasFlag;
}

var supportsColor_1;
var hasRequiredSupportsColor;

function requireSupportsColor () {
	if (hasRequiredSupportsColor) return supportsColor_1;
	hasRequiredSupportsColor = 1;
	const os = require$$1$2;
	const tty = require$$1$1;
	const hasFlag = requireHasFlag();

	const {env} = process;

	let flagForceColor;
	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false') ||
		hasFlag('color=never')) {
		flagForceColor = 0;
	} else if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		flagForceColor = 1;
	}

	function envForceColor() {
		if ('FORCE_COLOR' in env) {
			if (env.FORCE_COLOR === 'true') {
				return 1;
			}

			if (env.FORCE_COLOR === 'false') {
				return 0;
			}

			return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
		}
	}

	function translateLevel(level) {
		if (level === 0) {
			return false;
		}

		return {
			level,
			hasBasic: true,
			has256: level >= 2,
			has16m: level >= 3
		};
	}

	function supportsColor(haveStream, {streamIsTTY, sniffFlags = true} = {}) {
		const noFlagForceColor = envForceColor();
		if (noFlagForceColor !== undefined) {
			flagForceColor = noFlagForceColor;
		}

		const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;

		if (forceColor === 0) {
			return 0;
		}

		if (sniffFlags) {
			if (hasFlag('color=16m') ||
				hasFlag('color=full') ||
				hasFlag('color=truecolor')) {
				return 3;
			}

			if (hasFlag('color=256')) {
				return 2;
			}
		}

		if (haveStream && !streamIsTTY && forceColor === undefined) {
			return 0;
		}

		const min = forceColor || 0;

		if (env.TERM === 'dumb') {
			return min;
		}

		if (process.platform === 'win32') {
			// Windows 10 build 10586 is the first Windows release that supports 256 colors.
			// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
			const osRelease = os.release().split('.');
			if (
				Number(osRelease[0]) >= 10 &&
				Number(osRelease[2]) >= 10586
			) {
				return Number(osRelease[2]) >= 14931 ? 3 : 2;
			}

			return 1;
		}

		if ('CI' in env) {
			if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE', 'DRONE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
				return 1;
			}

			return min;
		}

		if ('TEAMCITY_VERSION' in env) {
			return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
		}

		if (env.COLORTERM === 'truecolor') {
			return 3;
		}

		if ('TERM_PROGRAM' in env) {
			const version = Number.parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

			switch (env.TERM_PROGRAM) {
				case 'iTerm.app':
					return version >= 3 ? 3 : 2;
				case 'Apple_Terminal':
					return 2;
				// No default
			}
		}

		if (/-256(color)?$/i.test(env.TERM)) {
			return 2;
		}

		if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
			return 1;
		}

		if ('COLORTERM' in env) {
			return 1;
		}

		return min;
	}

	function getSupportLevel(stream, options = {}) {
		const level = supportsColor(stream, {
			streamIsTTY: stream && stream.isTTY,
			...options
		});

		return translateLevel(level);
	}

	supportsColor_1 = {
		supportsColor: getSupportLevel,
		stdout: getSupportLevel({isTTY: tty.isatty(1)}),
		stderr: getSupportLevel({isTTY: tty.isatty(2)})
	};
	return supportsColor_1;
}

/**
 * Module dependencies.
 */

var hasRequiredNode$1;

function requireNode$1 () {
	if (hasRequiredNode$1) return node$1.exports;
	hasRequiredNode$1 = 1;
	(function (module, exports) {
		const tty = require$$1$1;
		const util = require$$1$3;

		/**
		 * This is the Node.js implementation of `debug()`.
		 */

		exports.init = init;
		exports.log = log;
		exports.formatArgs = formatArgs;
		exports.save = save;
		exports.load = load;
		exports.useColors = useColors;
		exports.destroy = util.deprecate(
			() => {},
			'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
		);

		/**
		 * Colors.
		 */

		exports.colors = [6, 2, 3, 4, 5, 1];

		try {
			// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
			// eslint-disable-next-line import/no-extraneous-dependencies
			const supportsColor = requireSupportsColor();

			if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
				exports.colors = [
					20,
					21,
					26,
					27,
					32,
					33,
					38,
					39,
					40,
					41,
					42,
					43,
					44,
					45,
					56,
					57,
					62,
					63,
					68,
					69,
					74,
					75,
					76,
					77,
					78,
					79,
					80,
					81,
					92,
					93,
					98,
					99,
					112,
					113,
					128,
					129,
					134,
					135,
					148,
					149,
					160,
					161,
					162,
					163,
					164,
					165,
					166,
					167,
					168,
					169,
					170,
					171,
					172,
					173,
					178,
					179,
					184,
					185,
					196,
					197,
					198,
					199,
					200,
					201,
					202,
					203,
					204,
					205,
					206,
					207,
					208,
					209,
					214,
					215,
					220,
					221
				];
			}
		} catch (error) {
			// Swallow - we only care if `supports-color` is available; it doesn't have to be.
		}

		/**
		 * Build up the default `inspectOpts` object from the environment variables.
		 *
		 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
		 */

		exports.inspectOpts = Object.keys(process.env).filter(key => {
			return /^debug_/i.test(key);
		}).reduce((obj, key) => {
			// Camel-case
			const prop = key
				.substring(6)
				.toLowerCase()
				.replace(/_([a-z])/g, (_, k) => {
					return k.toUpperCase();
				});

			// Coerce string value into JS value
			let val = process.env[key];
			if (/^(yes|on|true|enabled)$/i.test(val)) {
				val = true;
			} else if (/^(no|off|false|disabled)$/i.test(val)) {
				val = false;
			} else if (val === 'null') {
				val = null;
			} else {
				val = Number(val);
			}

			obj[prop] = val;
			return obj;
		}, {});

		/**
		 * Is stdout a TTY? Colored output is enabled when `true`.
		 */

		function useColors() {
			return 'colors' in exports.inspectOpts ?
				Boolean(exports.inspectOpts.colors) :
				tty.isatty(process.stderr.fd);
		}

		/**
		 * Adds ANSI color escape codes if enabled.
		 *
		 * @api public
		 */

		function formatArgs(args) {
			const {namespace: name, useColors} = this;

			if (useColors) {
				const c = this.color;
				const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
				const prefix = `  ${colorCode};1m${name} \u001B[0m`;

				args[0] = prefix + args[0].split('\n').join('\n' + prefix);
				args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
			} else {
				args[0] = getDate() + name + ' ' + args[0];
			}
		}

		function getDate() {
			if (exports.inspectOpts.hideDate) {
				return '';
			}
			return new Date().toISOString() + ' ';
		}

		/**
		 * Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
		 */

		function log(...args) {
			return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + '\n');
		}

		/**
		 * Save `namespaces`.
		 *
		 * @param {String} namespaces
		 * @api private
		 */
		function save(namespaces) {
			if (namespaces) {
				process.env.DEBUG = namespaces;
			} else {
				// If you set a process.env field to null or undefined, it gets cast to the
				// string 'null' or 'undefined'. Just delete instead.
				delete process.env.DEBUG;
			}
		}

		/**
		 * Load `namespaces`.
		 *
		 * @return {String} returns the previously persisted debug modes
		 * @api private
		 */

		function load() {
			return process.env.DEBUG;
		}

		/**
		 * Init logic for `debug` instances.
		 *
		 * Create a new `inspectOpts` object in case `useColors` is set
		 * differently for a particular `debug` instance.
		 */

		function init(debug) {
			debug.inspectOpts = {};

			const keys = Object.keys(exports.inspectOpts);
			for (let i = 0; i < keys.length; i++) {
				debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
			}
		}

		module.exports = requireCommon()(exports);

		const {formatters} = module.exports;

		/**
		 * Map %o to `util.inspect()`, all on a single line.
		 */

		formatters.o = function (v) {
			this.inspectOpts.colors = this.useColors;
			return util.inspect(v, this.inspectOpts)
				.split('\n')
				.map(str => str.trim())
				.join(' ');
		};

		/**
		 * Map %O to `util.inspect()`, allowing multiple lines if needed.
		 */

		formatters.O = function (v) {
			this.inspectOpts.colors = this.useColors;
			return util.inspect(v, this.inspectOpts);
		}; 
	} (node$1, node$1.exports));
	return node$1.exports;
}

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

var hasRequiredSrc;

function requireSrc () {
	if (hasRequiredSrc) return src.exports;
	hasRequiredSrc = 1;
	if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
		src.exports = requireBrowser();
	} else {
		src.exports = requireNode$1();
	}
	return src.exports;
}

var debug_1;
var hasRequiredDebug;

function requireDebug () {
	if (hasRequiredDebug) return debug_1;
	hasRequiredDebug = 1;
	var debug;

	debug_1 = function () {
	  if (!debug) {
	    try {
	      /* eslint global-require: off */
	      debug = requireSrc()("follow-redirects");
	    }
	    catch (error) { /* */ }
	    if (typeof debug !== "function") {
	      debug = function () { /* */ };
	    }
	  }
	  debug.apply(null, arguments);
	};
	return debug_1;
}

var hasRequiredFollowRedirects;

function requireFollowRedirects () {
	if (hasRequiredFollowRedirects) return followRedirects.exports;
	hasRequiredFollowRedirects = 1;
	var url = c$2;
	var URL = url.URL;
	var http = require$$1$4;
	var https = require$$2;
	var Writable = require$$0.Writable;
	var assert = require$$4;
	var debug = requireDebug();

	// Preventive platform detection
	// istanbul ignore next
	(function detectUnsupportedEnvironment() {
	  var looksLikeNode = typeof process !== "undefined";
	  var looksLikeBrowser = typeof window !== "undefined" && typeof document !== "undefined";
	  var looksLikeV8 = isFunction(Error.captureStackTrace);
	  if (!looksLikeNode && (looksLikeBrowser || !looksLikeV8)) {
	    console.warn("The follow-redirects package should be excluded from browser builds.");
	  }
	}());

	// Whether to use the native URL object or the legacy url module
	var useNativeURL = false;
	try {
	  assert(new URL(""));
	}
	catch (error) {
	  useNativeURL = error.code === "ERR_INVALID_URL";
	}

	// URL fields to preserve in copy operations
	var preservedUrlFields = [
	  "auth",
	  "host",
	  "hostname",
	  "href",
	  "path",
	  "pathname",
	  "port",
	  "protocol",
	  "query",
	  "search",
	  "hash",
	];

	// Create handlers that pass events from native requests
	var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
	var eventHandlers = Object.create(null);
	events.forEach(function (event) {
	  eventHandlers[event] = function (arg1, arg2, arg3) {
	    this._redirectable.emit(event, arg1, arg2, arg3);
	  };
	});

	// Error types with codes
	var InvalidUrlError = createErrorType(
	  "ERR_INVALID_URL",
	  "Invalid URL",
	  TypeError
	);
	var RedirectionError = createErrorType(
	  "ERR_FR_REDIRECTION_FAILURE",
	  "Redirected request failed"
	);
	var TooManyRedirectsError = createErrorType(
	  "ERR_FR_TOO_MANY_REDIRECTS",
	  "Maximum number of redirects exceeded",
	  RedirectionError
	);
	var MaxBodyLengthExceededError = createErrorType(
	  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
	  "Request body larger than maxBodyLength limit"
	);
	var WriteAfterEndError = createErrorType(
	  "ERR_STREAM_WRITE_AFTER_END",
	  "write after end"
	);

	// istanbul ignore next
	var destroy = Writable.prototype.destroy || noop;

	// An HTTP(S) request that can be redirected
	function RedirectableRequest(options, responseCallback) {
	  // Initialize the request
	  Writable.call(this);
	  this._sanitizeOptions(options);
	  this._options = options;
	  this._ended = false;
	  this._ending = false;
	  this._redirectCount = 0;
	  this._redirects = [];
	  this._requestBodyLength = 0;
	  this._requestBodyBuffers = [];

	  // Attach a callback if passed
	  if (responseCallback) {
	    this.on("response", responseCallback);
	  }

	  // React to responses of native requests
	  var self = this;
	  this._onNativeResponse = function (response) {
	    try {
	      self._processResponse(response);
	    }
	    catch (cause) {
	      self.emit("error", cause instanceof RedirectionError ?
	        cause : new RedirectionError({ cause: cause }));
	    }
	  };

	  // Perform the first request
	  this._performRequest();
	}
	RedirectableRequest.prototype = Object.create(Writable.prototype);

	RedirectableRequest.prototype.abort = function () {
	  destroyRequest(this._currentRequest);
	  this._currentRequest.abort();
	  this.emit("abort");
	};

	RedirectableRequest.prototype.destroy = function (error) {
	  destroyRequest(this._currentRequest, error);
	  destroy.call(this, error);
	  return this;
	};

	// Writes buffered data to the current native request
	RedirectableRequest.prototype.write = function (data, encoding, callback) {
	  // Writing is not allowed if end has been called
	  if (this._ending) {
	    throw new WriteAfterEndError();
	  }

	  // Validate input and shift parameters if necessary
	  if (!isString(data) && !isBuffer(data)) {
	    throw new TypeError("data should be a string, Buffer or Uint8Array");
	  }
	  if (isFunction(encoding)) {
	    callback = encoding;
	    encoding = null;
	  }

	  // Ignore empty buffers, since writing them doesn't invoke the callback
	  // https://github.com/nodejs/node/issues/22066
	  if (data.length === 0) {
	    if (callback) {
	      callback();
	    }
	    return;
	  }
	  // Only write when we don't exceed the maximum body length
	  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
	    this._requestBodyLength += data.length;
	    this._requestBodyBuffers.push({ data: data, encoding: encoding });
	    this._currentRequest.write(data, encoding, callback);
	  }
	  // Error when we exceed the maximum body length
	  else {
	    this.emit("error", new MaxBodyLengthExceededError());
	    this.abort();
	  }
	};

	// Ends the current native request
	RedirectableRequest.prototype.end = function (data, encoding, callback) {
	  // Shift parameters if necessary
	  if (isFunction(data)) {
	    callback = data;
	    data = encoding = null;
	  }
	  else if (isFunction(encoding)) {
	    callback = encoding;
	    encoding = null;
	  }

	  // Write data if needed and end
	  if (!data) {
	    this._ended = this._ending = true;
	    this._currentRequest.end(null, null, callback);
	  }
	  else {
	    var self = this;
	    var currentRequest = this._currentRequest;
	    this.write(data, encoding, function () {
	      self._ended = true;
	      currentRequest.end(null, null, callback);
	    });
	    this._ending = true;
	  }
	};

	// Sets a header value on the current native request
	RedirectableRequest.prototype.setHeader = function (name, value) {
	  this._options.headers[name] = value;
	  this._currentRequest.setHeader(name, value);
	};

	// Clears a header value on the current native request
	RedirectableRequest.prototype.removeHeader = function (name) {
	  delete this._options.headers[name];
	  this._currentRequest.removeHeader(name);
	};

	// Global timeout for all underlying requests
	RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
	  var self = this;

	  // Destroys the socket on timeout
	  function destroyOnTimeout(socket) {
	    socket.setTimeout(msecs);
	    socket.removeListener("timeout", socket.destroy);
	    socket.addListener("timeout", socket.destroy);
	  }

	  // Sets up a timer to trigger a timeout event
	  function startTimer(socket) {
	    if (self._timeout) {
	      clearTimeout(self._timeout);
	    }
	    self._timeout = setTimeout(function () {
	      self.emit("timeout");
	      clearTimer();
	    }, msecs);
	    destroyOnTimeout(socket);
	  }

	  // Stops a timeout from triggering
	  function clearTimer() {
	    // Clear the timeout
	    if (self._timeout) {
	      clearTimeout(self._timeout);
	      self._timeout = null;
	    }

	    // Clean up all attached listeners
	    self.removeListener("abort", clearTimer);
	    self.removeListener("error", clearTimer);
	    self.removeListener("response", clearTimer);
	    self.removeListener("close", clearTimer);
	    if (callback) {
	      self.removeListener("timeout", callback);
	    }
	    if (!self.socket) {
	      self._currentRequest.removeListener("socket", startTimer);
	    }
	  }

	  // Attach callback if passed
	  if (callback) {
	    this.on("timeout", callback);
	  }

	  // Start the timer if or when the socket is opened
	  if (this.socket) {
	    startTimer(this.socket);
	  }
	  else {
	    this._currentRequest.once("socket", startTimer);
	  }

	  // Clean up on events
	  this.on("socket", destroyOnTimeout);
	  this.on("abort", clearTimer);
	  this.on("error", clearTimer);
	  this.on("response", clearTimer);
	  this.on("close", clearTimer);

	  return this;
	};

	// Proxy all other public ClientRequest methods
	[
	  "flushHeaders", "getHeader",
	  "setNoDelay", "setSocketKeepAlive",
	].forEach(function (method) {
	  RedirectableRequest.prototype[method] = function (a, b) {
	    return this._currentRequest[method](a, b);
	  };
	});

	// Proxy all public ClientRequest properties
	["aborted", "connection", "socket"].forEach(function (property) {
	  Object.defineProperty(RedirectableRequest.prototype, property, {
	    get: function () { return this._currentRequest[property]; },
	  });
	});

	RedirectableRequest.prototype._sanitizeOptions = function (options) {
	  // Ensure headers are always present
	  if (!options.headers) {
	    options.headers = {};
	  }

	  // Since http.request treats host as an alias of hostname,
	  // but the url module interprets host as hostname plus port,
	  // eliminate the host property to avoid confusion.
	  if (options.host) {
	    // Use hostname if set, because it has precedence
	    if (!options.hostname) {
	      options.hostname = options.host;
	    }
	    delete options.host;
	  }

	  // Complete the URL object when necessary
	  if (!options.pathname && options.path) {
	    var searchPos = options.path.indexOf("?");
	    if (searchPos < 0) {
	      options.pathname = options.path;
	    }
	    else {
	      options.pathname = options.path.substring(0, searchPos);
	      options.search = options.path.substring(searchPos);
	    }
	  }
	};


	// Executes the next native request (initial or redirect)
	RedirectableRequest.prototype._performRequest = function () {
	  // Load the native protocol
	  var protocol = this._options.protocol;
	  var nativeProtocol = this._options.nativeProtocols[protocol];
	  if (!nativeProtocol) {
	    throw new TypeError("Unsupported protocol " + protocol);
	  }

	  // If specified, use the agent corresponding to the protocol
	  // (HTTP and HTTPS use different types of agents)
	  if (this._options.agents) {
	    var scheme = protocol.slice(0, -1);
	    this._options.agent = this._options.agents[scheme];
	  }

	  // Create the native request and set up its event handlers
	  var request = this._currentRequest =
	        nativeProtocol.request(this._options, this._onNativeResponse);
	  request._redirectable = this;
	  for (var event of events) {
	    request.on(event, eventHandlers[event]);
	  }

	  // RFC7230§5.3.1: When making a request directly to an origin server, […]
	  // a client MUST send only the absolute path […] as the request-target.
	  this._currentUrl = /^\//.test(this._options.path) ?
	    url.format(this._options) :
	    // When making a request to a proxy, […]
	    // a client MUST send the target URI in absolute-form […].
	    this._options.path;

	  // End a redirected request
	  // (The first request must be ended explicitly with RedirectableRequest#end)
	  if (this._isRedirect) {
	    // Write the request entity and end
	    var i = 0;
	    var self = this;
	    var buffers = this._requestBodyBuffers;
	    (function writeNext(error) {
	      // Only write if this request has not been redirected yet
	      // istanbul ignore else
	      if (request === self._currentRequest) {
	        // Report any write errors
	        // istanbul ignore if
	        if (error) {
	          self.emit("error", error);
	        }
	        // Write the next buffer if there are still left
	        else if (i < buffers.length) {
	          var buffer = buffers[i++];
	          // istanbul ignore else
	          if (!request.finished) {
	            request.write(buffer.data, buffer.encoding, writeNext);
	          }
	        }
	        // End the request if `end` has been called on us
	        else if (self._ended) {
	          request.end();
	        }
	      }
	    }());
	  }
	};

	// Processes a response from the current native request
	RedirectableRequest.prototype._processResponse = function (response) {
	  // Store the redirected response
	  var statusCode = response.statusCode;
	  if (this._options.trackRedirects) {
	    this._redirects.push({
	      url: this._currentUrl,
	      headers: response.headers,
	      statusCode: statusCode,
	    });
	  }

	  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
	  // that further action needs to be taken by the user agent in order to
	  // fulfill the request. If a Location header field is provided,
	  // the user agent MAY automatically redirect its request to the URI
	  // referenced by the Location field value,
	  // even if the specific status code is not understood.

	  // If the response is not a redirect; return it as-is
	  var location = response.headers.location;
	  if (!location || this._options.followRedirects === false ||
	      statusCode < 300 || statusCode >= 400) {
	    response.responseUrl = this._currentUrl;
	    response.redirects = this._redirects;
	    this.emit("response", response);

	    // Clean up
	    this._requestBodyBuffers = [];
	    return;
	  }

	  // The response is a redirect, so abort the current request
	  destroyRequest(this._currentRequest);
	  // Discard the remainder of the response to avoid waiting for data
	  response.destroy();

	  // RFC7231§6.4: A client SHOULD detect and intervene
	  // in cyclical redirections (i.e., "infinite" redirection loops).
	  if (++this._redirectCount > this._options.maxRedirects) {
	    throw new TooManyRedirectsError();
	  }

	  // Store the request headers if applicable
	  var requestHeaders;
	  var beforeRedirect = this._options.beforeRedirect;
	  if (beforeRedirect) {
	    requestHeaders = Object.assign({
	      // The Host header was set by nativeProtocol.request
	      Host: response.req.getHeader("host"),
	    }, this._options.headers);
	  }

	  // RFC7231§6.4: Automatic redirection needs to done with
	  // care for methods not known to be safe, […]
	  // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
	  // the request method from POST to GET for the subsequent request.
	  var method = this._options.method;
	  if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
	      // RFC7231§6.4.4: The 303 (See Other) status code indicates that
	      // the server is redirecting the user agent to a different resource […]
	      // A user agent can perform a retrieval request targeting that URI
	      // (a GET or HEAD request if using HTTP) […]
	      (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
	    this._options.method = "GET";
	    // Drop a possible entity and headers related to it
	    this._requestBodyBuffers = [];
	    removeMatchingHeaders(/^content-/i, this._options.headers);
	  }

	  // Drop the Host header, as the redirect might lead to a different host
	  var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);

	  // If the redirect is relative, carry over the host of the last request
	  var currentUrlParts = parseUrl(this._currentUrl);
	  var currentHost = currentHostHeader || currentUrlParts.host;
	  var currentUrl = /^\w+:/.test(location) ? this._currentUrl :
	    url.format(Object.assign(currentUrlParts, { host: currentHost }));

	  // Create the redirected request
	  var redirectUrl = resolveUrl(location, currentUrl);
	  debug("redirecting to", redirectUrl.href);
	  this._isRedirect = true;
	  spreadUrlObject(redirectUrl, this._options);

	  // Drop confidential headers when redirecting to a less secure protocol
	  // or to a different domain that is not a superdomain
	  if (redirectUrl.protocol !== currentUrlParts.protocol &&
	     redirectUrl.protocol !== "https:" ||
	     redirectUrl.host !== currentHost &&
	     !isSubdomain(redirectUrl.host, currentHost)) {
	    removeMatchingHeaders(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers);
	  }

	  // Evaluate the beforeRedirect callback
	  if (isFunction(beforeRedirect)) {
	    var responseDetails = {
	      headers: response.headers,
	      statusCode: statusCode,
	    };
	    var requestDetails = {
	      url: currentUrl,
	      method: method,
	      headers: requestHeaders,
	    };
	    beforeRedirect(this._options, responseDetails, requestDetails);
	    this._sanitizeOptions(this._options);
	  }

	  // Perform the redirected request
	  this._performRequest();
	};

	// Wraps the key/value object of protocols with redirect functionality
	function wrap(protocols) {
	  // Default settings
	  var exports = {
	    maxRedirects: 21,
	    maxBodyLength: 10 * 1024 * 1024,
	  };

	  // Wrap each protocol
	  var nativeProtocols = {};
	  Object.keys(protocols).forEach(function (scheme) {
	    var protocol = scheme + ":";
	    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
	    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

	    // Executes a request, following redirects
	    function request(input, options, callback) {
	      // Parse parameters, ensuring that input is an object
	      if (isURL(input)) {
	        input = spreadUrlObject(input);
	      }
	      else if (isString(input)) {
	        input = spreadUrlObject(parseUrl(input));
	      }
	      else {
	        callback = options;
	        options = validateUrl(input);
	        input = { protocol: protocol };
	      }
	      if (isFunction(options)) {
	        callback = options;
	        options = null;
	      }

	      // Set defaults
	      options = Object.assign({
	        maxRedirects: exports.maxRedirects,
	        maxBodyLength: exports.maxBodyLength,
	      }, input, options);
	      options.nativeProtocols = nativeProtocols;
	      if (!isString(options.host) && !isString(options.hostname)) {
	        options.hostname = "::1";
	      }

	      assert.equal(options.protocol, protocol, "protocol mismatch");
	      debug("options", options);
	      return new RedirectableRequest(options, callback);
	    }

	    // Executes a GET request, following redirects
	    function get(input, options, callback) {
	      var wrappedRequest = wrappedProtocol.request(input, options, callback);
	      wrappedRequest.end();
	      return wrappedRequest;
	    }

	    // Expose the properties on the wrapped protocol
	    Object.defineProperties(wrappedProtocol, {
	      request: { value: request, configurable: true, enumerable: true, writable: true },
	      get: { value: get, configurable: true, enumerable: true, writable: true },
	    });
	  });
	  return exports;
	}

	function noop() { /* empty */ }

	function parseUrl(input) {
	  var parsed;
	  // istanbul ignore else
	  if (useNativeURL) {
	    parsed = new URL(input);
	  }
	  else {
	    // Ensure the URL is valid and absolute
	    parsed = validateUrl(url.parse(input));
	    if (!isString(parsed.protocol)) {
	      throw new InvalidUrlError({ input });
	    }
	  }
	  return parsed;
	}

	function resolveUrl(relative, base) {
	  // istanbul ignore next
	  return useNativeURL ? new URL(relative, base) : parseUrl(url.resolve(base, relative));
	}

	function validateUrl(input) {
	  if (/^\[/.test(input.hostname) && !/^\[[:0-9a-f]+\]$/i.test(input.hostname)) {
	    throw new InvalidUrlError({ input: input.href || input });
	  }
	  if (/^\[/.test(input.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(input.host)) {
	    throw new InvalidUrlError({ input: input.href || input });
	  }
	  return input;
	}

	function spreadUrlObject(urlObject, target) {
	  var spread = target || {};
	  for (var key of preservedUrlFields) {
	    spread[key] = urlObject[key];
	  }

	  // Fix IPv6 hostname
	  if (spread.hostname.startsWith("[")) {
	    spread.hostname = spread.hostname.slice(1, -1);
	  }
	  // Ensure port is a number
	  if (spread.port !== "") {
	    spread.port = Number(spread.port);
	  }
	  // Concatenate path
	  spread.path = spread.search ? spread.pathname + spread.search : spread.pathname;

	  return spread;
	}

	function removeMatchingHeaders(regex, headers) {
	  var lastValue;
	  for (var header in headers) {
	    if (regex.test(header)) {
	      lastValue = headers[header];
	      delete headers[header];
	    }
	  }
	  return (lastValue === null || typeof lastValue === "undefined") ?
	    undefined : String(lastValue).trim();
	}

	function createErrorType(code, message, baseClass) {
	  // Create constructor
	  function CustomError(properties) {
	    // istanbul ignore else
	    if (isFunction(Error.captureStackTrace)) {
	      Error.captureStackTrace(this, this.constructor);
	    }
	    Object.assign(this, properties || {});
	    this.code = code;
	    this.message = this.cause ? message + ": " + this.cause.message : message;
	  }

	  // Attach constructor and set default properties
	  CustomError.prototype = new (baseClass || Error)();
	  Object.defineProperties(CustomError.prototype, {
	    constructor: {
	      value: CustomError,
	      enumerable: false,
	    },
	    name: {
	      value: "Error [" + code + "]",
	      enumerable: false,
	    },
	  });
	  return CustomError;
	}

	function destroyRequest(request, error) {
	  for (var event of events) {
	    request.removeListener(event, eventHandlers[event]);
	  }
	  request.on("error", noop);
	  request.destroy(error);
	}

	function isSubdomain(subdomain, domain) {
	  assert(isString(subdomain) && isString(domain));
	  var dot = subdomain.length - domain.length - 1;
	  return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
	}

	function isString(value) {
	  return typeof value === "string" || value instanceof String;
	}

	function isFunction(value) {
	  return typeof value === "function";
	}

	function isBuffer(value) {
	  return typeof value === "object" && ("length" in value);
	}

	function isURL(value) {
	  return URL && value instanceof URL;
	}

	// Exports
	followRedirects.exports = wrap({ http: http, https: https });
	followRedirects.exports.wrap = wrap;
	return followRedirects.exports;
}

var followRedirectsExports = requireFollowRedirects();
const t = /*@__PURE__*/getDefaultExportFromCjs(followRedirectsExports);

var through2 = {exports: {}};

var readable = {exports: {}};

var stream;
var hasRequiredStream;

function requireStream () {
	if (hasRequiredStream) return stream;
	hasRequiredStream = 1;
	stream = require$$0;
	return stream;
}

var buffer_list;
var hasRequiredBuffer_list;

function requireBuffer_list () {
	if (hasRequiredBuffer_list) return buffer_list;
	hasRequiredBuffer_list = 1;

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
	function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
	function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
	function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(input); }
	var _require = require$$0$1,
	  Buffer = _require.Buffer;
	var _require2 = require$$1$3,
	  inspect = _require2.inspect;
	var custom = inspect && inspect.custom || 'inspect';
	function copyBuffer(src, target, offset) {
	  Buffer.prototype.copy.call(src, target, offset);
	}
	buffer_list = /*#__PURE__*/function () {
	  function BufferList() {
	    _classCallCheck(this, BufferList);
	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  }
	  _createClass(BufferList, [{
	    key: "push",
	    value: function push(v) {
	      var entry = {
	        data: v,
	        next: null
	      };
	      if (this.length > 0) this.tail.next = entry;else this.head = entry;
	      this.tail = entry;
	      ++this.length;
	    }
	  }, {
	    key: "unshift",
	    value: function unshift(v) {
	      var entry = {
	        data: v,
	        next: this.head
	      };
	      if (this.length === 0) this.tail = entry;
	      this.head = entry;
	      ++this.length;
	    }
	  }, {
	    key: "shift",
	    value: function shift() {
	      if (this.length === 0) return;
	      var ret = this.head.data;
	      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	      --this.length;
	      return ret;
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.head = this.tail = null;
	      this.length = 0;
	    }
	  }, {
	    key: "join",
	    value: function join(s) {
	      if (this.length === 0) return '';
	      var p = this.head;
	      var ret = '' + p.data;
	      while (p = p.next) ret += s + p.data;
	      return ret;
	    }
	  }, {
	    key: "concat",
	    value: function concat(n) {
	      if (this.length === 0) return Buffer.alloc(0);
	      var ret = Buffer.allocUnsafe(n >>> 0);
	      var p = this.head;
	      var i = 0;
	      while (p) {
	        copyBuffer(p.data, ret, i);
	        i += p.data.length;
	        p = p.next;
	      }
	      return ret;
	    }

	    // Consumes a specified amount of bytes or characters from the buffered data.
	  }, {
	    key: "consume",
	    value: function consume(n, hasStrings) {
	      var ret;
	      if (n < this.head.data.length) {
	        // `slice` is the same for buffers and strings.
	        ret = this.head.data.slice(0, n);
	        this.head.data = this.head.data.slice(n);
	      } else if (n === this.head.data.length) {
	        // First chunk is a perfect match.
	        ret = this.shift();
	      } else {
	        // Result spans more than one buffer.
	        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
	      }
	      return ret;
	    }
	  }, {
	    key: "first",
	    value: function first() {
	      return this.head.data;
	    }

	    // Consumes a specified amount of characters from the buffered data.
	  }, {
	    key: "_getString",
	    value: function _getString(n) {
	      var p = this.head;
	      var c = 1;
	      var ret = p.data;
	      n -= ret.length;
	      while (p = p.next) {
	        var str = p.data;
	        var nb = n > str.length ? str.length : n;
	        if (nb === str.length) ret += str;else ret += str.slice(0, n);
	        n -= nb;
	        if (n === 0) {
	          if (nb === str.length) {
	            ++c;
	            if (p.next) this.head = p.next;else this.head = this.tail = null;
	          } else {
	            this.head = p;
	            p.data = str.slice(nb);
	          }
	          break;
	        }
	        ++c;
	      }
	      this.length -= c;
	      return ret;
	    }

	    // Consumes a specified amount of bytes from the buffered data.
	  }, {
	    key: "_getBuffer",
	    value: function _getBuffer(n) {
	      var ret = Buffer.allocUnsafe(n);
	      var p = this.head;
	      var c = 1;
	      p.data.copy(ret);
	      n -= p.data.length;
	      while (p = p.next) {
	        var buf = p.data;
	        var nb = n > buf.length ? buf.length : n;
	        buf.copy(ret, ret.length - n, 0, nb);
	        n -= nb;
	        if (n === 0) {
	          if (nb === buf.length) {
	            ++c;
	            if (p.next) this.head = p.next;else this.head = this.tail = null;
	          } else {
	            this.head = p;
	            p.data = buf.slice(nb);
	          }
	          break;
	        }
	        ++c;
	      }
	      this.length -= c;
	      return ret;
	    }

	    // Make sure the linked list only shows the minimal necessary information.
	  }, {
	    key: custom,
	    value: function value(_, options) {
	      return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
	        // Only inspect one level.
	        depth: 0,
	        // It should not recurse.
	        customInspect: false
	      }));
	    }
	  }]);
	  return BufferList;
	}();
	return buffer_list;
}

var destroy_1;
var hasRequiredDestroy;

function requireDestroy () {
	if (hasRequiredDestroy) return destroy_1;
	hasRequiredDestroy = 1;

	// undocumented cb() API, needed for core, not for public API
	function destroy(err, cb) {
	  var _this = this;
	  var readableDestroyed = this._readableState && this._readableState.destroyed;
	  var writableDestroyed = this._writableState && this._writableState.destroyed;
	  if (readableDestroyed || writableDestroyed) {
	    if (cb) {
	      cb(err);
	    } else if (err) {
	      if (!this._writableState) {
	        process.nextTick(emitErrorNT, this, err);
	      } else if (!this._writableState.errorEmitted) {
	        this._writableState.errorEmitted = true;
	        process.nextTick(emitErrorNT, this, err);
	      }
	    }
	    return this;
	  }

	  // we set destroyed to true before firing error callbacks in order
	  // to make it re-entrance safe in case destroy() is called within callbacks

	  if (this._readableState) {
	    this._readableState.destroyed = true;
	  }

	  // if this is a duplex stream mark the writable part as destroyed as well
	  if (this._writableState) {
	    this._writableState.destroyed = true;
	  }
	  this._destroy(err || null, function (err) {
	    if (!cb && err) {
	      if (!_this._writableState) {
	        process.nextTick(emitErrorAndCloseNT, _this, err);
	      } else if (!_this._writableState.errorEmitted) {
	        _this._writableState.errorEmitted = true;
	        process.nextTick(emitErrorAndCloseNT, _this, err);
	      } else {
	        process.nextTick(emitCloseNT, _this);
	      }
	    } else if (cb) {
	      process.nextTick(emitCloseNT, _this);
	      cb(err);
	    } else {
	      process.nextTick(emitCloseNT, _this);
	    }
	  });
	  return this;
	}
	function emitErrorAndCloseNT(self, err) {
	  emitErrorNT(self, err);
	  emitCloseNT(self);
	}
	function emitCloseNT(self) {
	  if (self._writableState && !self._writableState.emitClose) return;
	  if (self._readableState && !self._readableState.emitClose) return;
	  self.emit('close');
	}
	function undestroy() {
	  if (this._readableState) {
	    this._readableState.destroyed = false;
	    this._readableState.reading = false;
	    this._readableState.ended = false;
	    this._readableState.endEmitted = false;
	  }
	  if (this._writableState) {
	    this._writableState.destroyed = false;
	    this._writableState.ended = false;
	    this._writableState.ending = false;
	    this._writableState.finalCalled = false;
	    this._writableState.prefinished = false;
	    this._writableState.finished = false;
	    this._writableState.errorEmitted = false;
	  }
	}
	function emitErrorNT(self, err) {
	  self.emit('error', err);
	}
	function errorOrDestroy(stream, err) {
	  // We have tests that rely on errors being emitted
	  // in the same tick, so changing this is semver major.
	  // For now when you opt-in to autoDestroy we allow
	  // the error to be emitted nextTick. In a future
	  // semver major update we should change the default to this.

	  var rState = stream._readableState;
	  var wState = stream._writableState;
	  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
	}
	destroy_1 = {
	  destroy: destroy,
	  undestroy: undestroy,
	  errorOrDestroy: errorOrDestroy
	};
	return destroy_1;
}

var errors = {};

var hasRequiredErrors;

function requireErrors () {
	if (hasRequiredErrors) return errors;
	hasRequiredErrors = 1;

	const codes = {};

	function createErrorType(code, message, Base) {
	  if (!Base) {
	    Base = Error;
	  }

	  function getMessage (arg1, arg2, arg3) {
	    if (typeof message === 'string') {
	      return message
	    } else {
	      return message(arg1, arg2, arg3)
	    }
	  }

	  class NodeError extends Base {
	    constructor (arg1, arg2, arg3) {
	      super(getMessage(arg1, arg2, arg3));
	    }
	  }

	  NodeError.prototype.name = Base.name;
	  NodeError.prototype.code = code;

	  codes[code] = NodeError;
	}

	// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
	function oneOf(expected, thing) {
	  if (Array.isArray(expected)) {
	    const len = expected.length;
	    expected = expected.map((i) => String(i));
	    if (len > 2) {
	      return `one of ${thing} ${expected.slice(0, len - 1).join(', ')}, or ` +
	             expected[len - 1];
	    } else if (len === 2) {
	      return `one of ${thing} ${expected[0]} or ${expected[1]}`;
	    } else {
	      return `of ${thing} ${expected[0]}`;
	    }
	  } else {
	    return `of ${thing} ${String(expected)}`;
	  }
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
	function startsWith(str, search, pos) {
		return str.substr(0 , search.length) === search;
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
	function endsWith(str, search, this_len) {
		if (this_len === undefined || this_len > str.length) {
			this_len = str.length;
		}
		return str.substring(this_len - search.length, this_len) === search;
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
	function includes(str, search, start) {
	  if (typeof start !== 'number') {
	    start = 0;
	  }

	  if (start + search.length > str.length) {
	    return false;
	  } else {
	    return str.indexOf(search, start) !== -1;
	  }
	}

	createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
	  return 'The value "' + value + '" is invalid for option "' + name + '"'
	}, TypeError);
	createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
	  // determiner: 'must be' or 'must not be'
	  let determiner;
	  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
	    determiner = 'must not be';
	    expected = expected.replace(/^not /, '');
	  } else {
	    determiner = 'must be';
	  }

	  let msg;
	  if (endsWith(name, ' argument')) {
	    // For cases like 'first argument'
	    msg = `The ${name} ${determiner} ${oneOf(expected, 'type')}`;
	  } else {
	    const type = includes(name, '.') ? 'property' : 'argument';
	    msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, 'type')}`;
	  }

	  msg += `. Received type ${typeof actual}`;
	  return msg;
	}, TypeError);
	createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
	createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
	  return 'The ' + name + ' method is not implemented'
	});
	createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
	createErrorType('ERR_STREAM_DESTROYED', function (name) {
	  return 'Cannot call ' + name + ' after a stream was destroyed';
	});
	createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
	createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
	createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
	createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
	createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
	  return 'Unknown encoding: ' + arg
	}, TypeError);
	createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');

	errors.codes = codes;
	return errors;
}

var state;
var hasRequiredState;

function requireState () {
	if (hasRequiredState) return state;
	hasRequiredState = 1;

	var ERR_INVALID_OPT_VALUE = requireErrors().codes.ERR_INVALID_OPT_VALUE;
	function highWaterMarkFrom(options, isDuplex, duplexKey) {
	  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
	}
	function getHighWaterMark(state, options, duplexKey, isDuplex) {
	  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
	  if (hwm != null) {
	    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
	      var name = isDuplex ? duplexKey : 'highWaterMark';
	      throw new ERR_INVALID_OPT_VALUE(name, hwm);
	    }
	    return Math.floor(hwm);
	  }

	  // Default value
	  return state.objectMode ? 16 : 16 * 1024;
	}
	state = {
	  getHighWaterMark: getHighWaterMark
	};
	return state;
}

var inherits = {exports: {}};

var inherits_browser = {exports: {}};

var hasRequiredInherits_browser;

function requireInherits_browser () {
	if (hasRequiredInherits_browser) return inherits_browser.exports;
	hasRequiredInherits_browser = 1;
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	          value: ctor,
	          enumerable: false,
	          writable: true,
	          configurable: true
	        }
	      });
	    }
	  };
	} else {
	  // old school shim for old browsers
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      var TempCtor = function () {};
	      TempCtor.prototype = superCtor.prototype;
	      ctor.prototype = new TempCtor();
	      ctor.prototype.constructor = ctor;
	    }
	  };
	}
	return inherits_browser.exports;
}

var hasRequiredInherits;

function requireInherits () {
	if (hasRequiredInherits) return inherits.exports;
	hasRequiredInherits = 1;
	try {
	  var util = require('util');
	  /* istanbul ignore next */
	  if (typeof util.inherits !== 'function') throw '';
	  inherits.exports = util.inherits;
	} catch (e) {
	  /* istanbul ignore next */
	  inherits.exports = requireInherits_browser();
	}
	return inherits.exports;
}

var node;
var hasRequiredNode;

function requireNode () {
	if (hasRequiredNode) return node;
	hasRequiredNode = 1;
	/**
	 * For Node.js, simply re-export the core `util.deprecate` function.
	 */

	node = require$$1$3.deprecate;
	return node;
}

var _stream_writable;
var hasRequired_stream_writable;

function require_stream_writable () {
	if (hasRequired_stream_writable) return _stream_writable;
	hasRequired_stream_writable = 1;

	_stream_writable = Writable;

	// It seems a linked list but it is not
	// there will be only 2 of these for each stream
	function CorkedRequest(state) {
	  var _this = this;
	  this.next = null;
	  this.entry = null;
	  this.finish = function () {
	    onCorkedFinish(_this, state);
	  };
	}
	/* </replacement> */

	/*<replacement>*/
	var Duplex;
	/*</replacement>*/

	Writable.WritableState = WritableState;

	/*<replacement>*/
	var internalUtil = {
	  deprecate: requireNode()
	};
	/*</replacement>*/

	/*<replacement>*/
	var Stream = requireStream();
	/*</replacement>*/

	var Buffer = require$$0$1.Buffer;
	var OurUint8Array = (typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}).Uint8Array || function () {};
	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	var destroyImpl = requireDestroy();
	var _require = requireState(),
	  getHighWaterMark = _require.getHighWaterMark;
	var _require$codes = requireErrors().codes,
	  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
	  ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
	  ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
	  ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
	  ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
	  ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
	  ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
	  ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
	var errorOrDestroy = destroyImpl.errorOrDestroy;
	requireInherits()(Writable, Stream);
	function nop() {}
	function WritableState(options, stream, isDuplex) {
	  Duplex = Duplex || require_stream_duplex();
	  options = options || {};

	  // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream,
	  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.
	  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;
	  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex);

	  // if _final has been called
	  this.finalCalled = false;

	  // drain event flag.
	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // has it been destroyed
	  this.destroyed = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;
	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null;

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;

	  // Should close be emitted on destroy. Defaults to true.
	  this.emitClose = options.emitClose !== false;

	  // Should .destroy() be called after 'finish' (and potentially 'end')
	  this.autoDestroy = !!options.autoDestroy;

	  // count buffered requests
	  this.bufferedRequestCount = 0;

	  // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two
	  this.corkedRequestsFree = new CorkedRequest(this);
	}
	WritableState.prototype.getBuffer = function getBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];
	  while (current) {
	    out.push(current);
	    current = current.next;
	  }
	  return out;
	};
	(function () {
	  try {
	    Object.defineProperty(WritableState.prototype, 'buffer', {
	      get: internalUtil.deprecate(function writableStateBufferGetter() {
	        return this.getBuffer();
	      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
	    });
	  } catch (_) {}
	})();

	// Test _writableState for inheritance to account for Duplex streams,
	// whose prototype chain only points to Readable.
	var realHasInstance;
	if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
	  realHasInstance = Function.prototype[Symbol.hasInstance];
	  Object.defineProperty(Writable, Symbol.hasInstance, {
	    value: function value(object) {
	      if (realHasInstance.call(this, object)) return true;
	      if (this !== Writable) return false;
	      return object && object._writableState instanceof WritableState;
	    }
	  });
	} else {
	  realHasInstance = function realHasInstance(object) {
	    return object instanceof this;
	  };
	}
	function Writable(options) {
	  Duplex = Duplex || require_stream_duplex();

	  // Writable ctor is applied to Duplexes, too.
	  // `realHasInstance` is necessary because using plain `instanceof`
	  // would return false, as no `_writableState` property is attached.

	  // Trying to use the custom `instanceof` for Writable here will also break the
	  // Node.js LazyTransform implementation, which has a non-trivial getter for
	  // `_writableState` that would lead to infinite recursion.

	  // Checking for a Stream.Duplex instance is faster here instead of inside
	  // the WritableState constructor, at least with V8 6.5
	  var isDuplex = this instanceof Duplex;
	  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
	  this._writableState = new WritableState(options, this, isDuplex);

	  // legacy.
	  this.writable = true;
	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;
	    if (typeof options.writev === 'function') this._writev = options.writev;
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	    if (typeof options.final === 'function') this._final = options.final;
	  }
	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
	};
	function writeAfterEnd(stream, cb) {
	  var er = new ERR_STREAM_WRITE_AFTER_END();
	  // TODO: defer error events consistently everywhere, not just the cb
	  errorOrDestroy(stream, er);
	  process.nextTick(cb, er);
	}

	// Checks that a user-supplied chunk is valid, especially for the particular
	// mode the stream is in. Currently this means that `null` is never accepted
	// and undefined/non-string values are only allowed in object mode.
	function validChunk(stream, state, chunk, cb) {
	  var er;
	  if (chunk === null) {
	    er = new ERR_STREAM_NULL_VALUES();
	  } else if (typeof chunk !== 'string' && !state.objectMode) {
	    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
	  }
	  if (er) {
	    errorOrDestroy(stream, er);
	    process.nextTick(cb, er);
	    return false;
	  }
	  return true;
	}
	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;
	  var isBuf = !state.objectMode && _isUint8Array(chunk);
	  if (isBuf && !Buffer.isBuffer(chunk)) {
	    chunk = _uint8ArrayToBuffer(chunk);
	  }
	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
	  if (typeof cb !== 'function') cb = nop;
	  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
	  }
	  return ret;
	};
	Writable.prototype.cork = function () {
	  this._writableState.corked++;
	};
	Writable.prototype.uncork = function () {
	  var state = this._writableState;
	  if (state.corked) {
	    state.corked--;
	    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};
	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};
	Object.defineProperty(Writable.prototype, 'writableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState && this._writableState.getBuffer();
	  }
	});
	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = Buffer.from(chunk, encoding);
	  }
	  return chunk;
	}
	Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.highWaterMark;
	  }
	});

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
	  if (!isBuf) {
	    var newChunk = decodeChunk(state, chunk, encoding);
	    if (chunk !== newChunk) {
	      isBuf = true;
	      encoding = 'buffer';
	      chunk = newChunk;
	    }
	  }
	  var len = state.objectMode ? 1 : chunk.length;
	  state.length += len;
	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;
	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = {
	      chunk: chunk,
	      encoding: encoding,
	      isBuf: isBuf,
	      callback: cb,
	      next: null
	    };
	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }
	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }
	  return ret;
	}
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}
	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;
	  if (sync) {
	    // defer the callback if we are being called synchronously
	    // to avoid piling up things on the stack
	    process.nextTick(cb, er);
	    // this can emit finish, and it will always happen
	    // after error
	    process.nextTick(finishMaybe, stream, state);
	    stream._writableState.errorEmitted = true;
	    errorOrDestroy(stream, er);
	  } else {
	    // the caller expect this to happen before if
	    // it is async
	    cb(er);
	    stream._writableState.errorEmitted = true;
	    errorOrDestroy(stream, er);
	    // this can emit finish, but finish must
	    // always follow error
	    finishMaybe(stream, state);
	  }
	}
	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}
	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
	  onwriteStateUpdate(state);
	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state) || stream.destroyed;
	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }
	    if (sync) {
	      process.nextTick(afterWrite, stream, state, finished, cb);
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}
	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}

	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;
	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;
	    var count = 0;
	    var allBuffers = true;
	    while (entry) {
	      buffer[count] = entry;
	      if (!entry.isBuf) allBuffers = false;
	      entry = entry.next;
	      count += 1;
	    }
	    buffer.allBuffers = allBuffers;
	    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

	    // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite
	    state.pendingcb++;
	    state.lastBufferedRequest = null;
	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }
	    state.bufferedRequestCount = 0;
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      state.bufferedRequestCount--;
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        break;
	      }
	    }
	    if (entry === null) state.lastBufferedRequest = null;
	  }
	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}
	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
	};
	Writable.prototype._writev = null;
	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending) endWritable(this, state, cb);
	  return this;
	};
	Object.defineProperty(Writable.prototype, 'writableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.length;
	  }
	});
	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}
	function callFinal(stream, state) {
	  stream._final(function (err) {
	    state.pendingcb--;
	    if (err) {
	      errorOrDestroy(stream, err);
	    }
	    state.prefinished = true;
	    stream.emit('prefinish');
	    finishMaybe(stream, state);
	  });
	}
	function prefinish(stream, state) {
	  if (!state.prefinished && !state.finalCalled) {
	    if (typeof stream._final === 'function' && !state.destroyed) {
	      state.pendingcb++;
	      state.finalCalled = true;
	      process.nextTick(callFinal, stream, state);
	    } else {
	      state.prefinished = true;
	      stream.emit('prefinish');
	    }
	  }
	}
	function finishMaybe(stream, state) {
	  var need = needFinish(state);
	  if (need) {
	    prefinish(stream, state);
	    if (state.pendingcb === 0) {
	      state.finished = true;
	      stream.emit('finish');
	      if (state.autoDestroy) {
	        // In case of duplex streams we need a way to detect
	        // if the readable side is ready for autoDestroy as well
	        var rState = stream._readableState;
	        if (!rState || rState.autoDestroy && rState.endEmitted) {
	          stream.destroy();
	        }
	      }
	    }
	  }
	  return need;
	}
	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	  stream.writable = false;
	}
	function onCorkedFinish(corkReq, state, err) {
	  var entry = corkReq.entry;
	  corkReq.entry = null;
	  while (entry) {
	    var cb = entry.callback;
	    state.pendingcb--;
	    cb(err);
	    entry = entry.next;
	  }

	  // reuse the free corkReq.
	  state.corkedRequestsFree.next = corkReq;
	}
	Object.defineProperty(Writable.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._writableState === undefined) {
	      return false;
	    }
	    return this._writableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._writableState) {
	      return;
	    }

	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._writableState.destroyed = value;
	  }
	});
	Writable.prototype.destroy = destroyImpl.destroy;
	Writable.prototype._undestroy = destroyImpl.undestroy;
	Writable.prototype._destroy = function (err, cb) {
	  cb(err);
	};
	return _stream_writable;
}

var _stream_duplex;
var hasRequired_stream_duplex;

function require_stream_duplex () {
	if (hasRequired_stream_duplex) return _stream_duplex;
	hasRequired_stream_duplex = 1;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	};
	/*</replacement>*/

	_stream_duplex = Duplex;
	var Readable = require_stream_readable();
	var Writable = require_stream_writable();
	requireInherits()(Duplex, Readable);
	{
	  // Allow the keys array to be GC'ed.
	  var keys = objectKeys(Writable.prototype);
	  for (var v = 0; v < keys.length; v++) {
	    var method = keys[v];
	    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	  }
	}
	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);
	  Readable.call(this, options);
	  Writable.call(this, options);
	  this.allowHalfOpen = true;
	  if (options) {
	    if (options.readable === false) this.readable = false;
	    if (options.writable === false) this.writable = false;
	    if (options.allowHalfOpen === false) {
	      this.allowHalfOpen = false;
	      this.once('end', onend);
	    }
	  }
	}
	Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.highWaterMark;
	  }
	});
	Object.defineProperty(Duplex.prototype, 'writableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState && this._writableState.getBuffer();
	  }
	});
	Object.defineProperty(Duplex.prototype, 'writableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.length;
	  }
	});

	// the no-half-open enforcer
	function onend() {
	  // If the writable side ended, then we're ok.
	  if (this._writableState.ended) return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(onEndNT, this);
	}
	function onEndNT(self) {
	  self.end();
	}
	Object.defineProperty(Duplex.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return false;
	    }
	    return this._readableState.destroyed && this._writableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return;
	    }

	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._readableState.destroyed = value;
	    this._writableState.destroyed = value;
	  }
	});
	return _stream_duplex;
}

var string_decoder = {};

var safeBuffer = {exports: {}};

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

var hasRequiredSafeBuffer;

function requireSafeBuffer () {
	if (hasRequiredSafeBuffer) return safeBuffer.exports;
	hasRequiredSafeBuffer = 1;
	(function (module, exports) {
		/* eslint-disable node/no-deprecated-api */
		var buffer = require$$0$1;
		var Buffer = buffer.Buffer;

		// alternative to using Object.keys for old browsers
		function copyProps (src, dst) {
		  for (var key in src) {
		    dst[key] = src[key];
		  }
		}
		if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
		  module.exports = buffer;
		} else {
		  // Copy properties from require('buffer')
		  copyProps(buffer, exports);
		  exports.Buffer = SafeBuffer;
		}

		function SafeBuffer (arg, encodingOrOffset, length) {
		  return Buffer(arg, encodingOrOffset, length)
		}

		SafeBuffer.prototype = Object.create(Buffer.prototype);

		// Copy static methods from Buffer
		copyProps(Buffer, SafeBuffer);

		SafeBuffer.from = function (arg, encodingOrOffset, length) {
		  if (typeof arg === 'number') {
		    throw new TypeError('Argument must not be a number')
		  }
		  return Buffer(arg, encodingOrOffset, length)
		};

		SafeBuffer.alloc = function (size, fill, encoding) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  var buf = Buffer(size);
		  if (fill !== undefined) {
		    if (typeof encoding === 'string') {
		      buf.fill(fill, encoding);
		    } else {
		      buf.fill(fill);
		    }
		  } else {
		    buf.fill(0);
		  }
		  return buf
		};

		SafeBuffer.allocUnsafe = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return Buffer(size)
		};

		SafeBuffer.allocUnsafeSlow = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return buffer.SlowBuffer(size)
		}; 
	} (safeBuffer, safeBuffer.exports));
	return safeBuffer.exports;
}

var hasRequiredString_decoder;

function requireString_decoder () {
	if (hasRequiredString_decoder) return string_decoder;
	hasRequiredString_decoder = 1;

	/*<replacement>*/

	var Buffer = requireSafeBuffer().Buffer;
	/*</replacement>*/

	var isEncoding = Buffer.isEncoding || function (encoding) {
	  encoding = '' + encoding;
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};

	function _normalizeEncoding(enc) {
	  if (!enc) return 'utf8';
	  var retried;
	  while (true) {
	    switch (enc) {
	      case 'utf8':
	      case 'utf-8':
	        return 'utf8';
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return 'utf16le';
	      case 'latin1':
	      case 'binary':
	        return 'latin1';
	      case 'base64':
	      case 'ascii':
	      case 'hex':
	        return enc;
	      default:
	        if (retried) return; // undefined
	        enc = ('' + enc).toLowerCase();
	        retried = true;
	    }
	  }
	}
	// Do not cache `Buffer.isEncoding` when checking encoding names as some
	// modules monkey-patch it to support additional encodings
	function normalizeEncoding(enc) {
	  var nenc = _normalizeEncoding(enc);
	  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
	  return nenc || enc;
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters.
	string_decoder.StringDecoder = StringDecoder;
	function StringDecoder(encoding) {
	  this.encoding = normalizeEncoding(encoding);
	  var nb;
	  switch (this.encoding) {
	    case 'utf16le':
	      this.text = utf16Text;
	      this.end = utf16End;
	      nb = 4;
	      break;
	    case 'utf8':
	      this.fillLast = utf8FillLast;
	      nb = 4;
	      break;
	    case 'base64':
	      this.text = base64Text;
	      this.end = base64End;
	      nb = 3;
	      break;
	    default:
	      this.write = simpleWrite;
	      this.end = simpleEnd;
	      return;
	  }
	  this.lastNeed = 0;
	  this.lastTotal = 0;
	  this.lastChar = Buffer.allocUnsafe(nb);
	}

	StringDecoder.prototype.write = function (buf) {
	  if (buf.length === 0) return '';
	  var r;
	  var i;
	  if (this.lastNeed) {
	    r = this.fillLast(buf);
	    if (r === undefined) return '';
	    i = this.lastNeed;
	    this.lastNeed = 0;
	  } else {
	    i = 0;
	  }
	  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
	  return r || '';
	};

	StringDecoder.prototype.end = utf8End;

	// Returns only complete characters in a Buffer
	StringDecoder.prototype.text = utf8Text;

	// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
	StringDecoder.prototype.fillLast = function (buf) {
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
	  this.lastNeed -= buf.length;
	};

	// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
	// continuation byte. If an invalid byte is detected, -2 is returned.
	function utf8CheckByte(byte) {
	  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
	  return byte >> 6 === 0x02 ? -1 : -2;
	}

	// Checks at most 3 bytes at the end of a Buffer in order to detect an
	// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
	// needed to complete the UTF-8 character (if applicable) are returned.
	function utf8CheckIncomplete(self, buf, i) {
	  var j = buf.length - 1;
	  if (j < i) return 0;
	  var nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 1;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 2;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) {
	      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
	    }
	    return nb;
	  }
	  return 0;
	}

	// Validates as many continuation bytes for a multi-byte UTF-8 character as
	// needed or are available. If we see a non-continuation byte where we expect
	// one, we "replace" the validated continuation bytes we've seen so far with
	// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
	// behavior. The continuation byte check is included three times in the case
	// where all of the continuation bytes for a character exist in the same buffer.
	// It is also done this way as a slight performance increase instead of using a
	// loop.
	function utf8CheckExtraBytes(self, buf, p) {
	  if ((buf[0] & 0xC0) !== 0x80) {
	    self.lastNeed = 0;
	    return '\ufffd';
	  }
	  if (self.lastNeed > 1 && buf.length > 1) {
	    if ((buf[1] & 0xC0) !== 0x80) {
	      self.lastNeed = 1;
	      return '\ufffd';
	    }
	    if (self.lastNeed > 2 && buf.length > 2) {
	      if ((buf[2] & 0xC0) !== 0x80) {
	        self.lastNeed = 2;
	        return '\ufffd';
	      }
	    }
	  }
	}

	// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
	function utf8FillLast(buf) {
	  var p = this.lastTotal - this.lastNeed;
	  var r = utf8CheckExtraBytes(this, buf);
	  if (r !== undefined) return r;
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, p, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, p, 0, buf.length);
	  this.lastNeed -= buf.length;
	}

	// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
	// partial character, the character's bytes are buffered until the required
	// number of bytes are available.
	function utf8Text(buf, i) {
	  var total = utf8CheckIncomplete(this, buf, i);
	  if (!this.lastNeed) return buf.toString('utf8', i);
	  this.lastTotal = total;
	  var end = buf.length - (total - this.lastNeed);
	  buf.copy(this.lastChar, 0, end);
	  return buf.toString('utf8', i, end);
	}

	// For UTF-8, a replacement character is added when ending on a partial
	// character.
	function utf8End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + '\ufffd';
	  return r;
	}

	// UTF-16LE typically needs two bytes per character, but even if we have an even
	// number of bytes available, we need to check if we end on a leading/high
	// surrogate. In that case, we need to wait for the next two bytes in order to
	// decode the last character properly.
	function utf16Text(buf, i) {
	  if ((buf.length - i) % 2 === 0) {
	    var r = buf.toString('utf16le', i);
	    if (r) {
	      var c = r.charCodeAt(r.length - 1);
	      if (c >= 0xD800 && c <= 0xDBFF) {
	        this.lastNeed = 2;
	        this.lastTotal = 4;
	        this.lastChar[0] = buf[buf.length - 2];
	        this.lastChar[1] = buf[buf.length - 1];
	        return r.slice(0, -1);
	      }
	    }
	    return r;
	  }
	  this.lastNeed = 1;
	  this.lastTotal = 2;
	  this.lastChar[0] = buf[buf.length - 1];
	  return buf.toString('utf16le', i, buf.length - 1);
	}

	// For UTF-16LE we do not explicitly append special replacement characters if we
	// end on a partial character, we simply let v8 handle that.
	function utf16End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) {
	    var end = this.lastTotal - this.lastNeed;
	    return r + this.lastChar.toString('utf16le', 0, end);
	  }
	  return r;
	}

	function base64Text(buf, i) {
	  var n = (buf.length - i) % 3;
	  if (n === 0) return buf.toString('base64', i);
	  this.lastNeed = 3 - n;
	  this.lastTotal = 3;
	  if (n === 1) {
	    this.lastChar[0] = buf[buf.length - 1];
	  } else {
	    this.lastChar[0] = buf[buf.length - 2];
	    this.lastChar[1] = buf[buf.length - 1];
	  }
	  return buf.toString('base64', i, buf.length - n);
	}

	function base64End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
	  return r;
	}

	// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
	function simpleWrite(buf) {
	  return buf.toString(this.encoding);
	}

	function simpleEnd(buf) {
	  return buf && buf.length ? this.write(buf) : '';
	}
	return string_decoder;
}

var endOfStream;
var hasRequiredEndOfStream;

function requireEndOfStream () {
	if (hasRequiredEndOfStream) return endOfStream;
	hasRequiredEndOfStream = 1;

	var ERR_STREAM_PREMATURE_CLOSE = requireErrors().codes.ERR_STREAM_PREMATURE_CLOSE;
	function once(callback) {
	  var called = false;
	  return function () {
	    if (called) return;
	    called = true;
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	    callback.apply(this, args);
	  };
	}
	function noop() {}
	function isRequest(stream) {
	  return stream.setHeader && typeof stream.abort === 'function';
	}
	function eos(stream, opts, callback) {
	  if (typeof opts === 'function') return eos(stream, null, opts);
	  if (!opts) opts = {};
	  callback = once(callback || noop);
	  var readable = opts.readable || opts.readable !== false && stream.readable;
	  var writable = opts.writable || opts.writable !== false && stream.writable;
	  var onlegacyfinish = function onlegacyfinish() {
	    if (!stream.writable) onfinish();
	  };
	  var writableEnded = stream._writableState && stream._writableState.finished;
	  var onfinish = function onfinish() {
	    writable = false;
	    writableEnded = true;
	    if (!readable) callback.call(stream);
	  };
	  var readableEnded = stream._readableState && stream._readableState.endEmitted;
	  var onend = function onend() {
	    readable = false;
	    readableEnded = true;
	    if (!writable) callback.call(stream);
	  };
	  var onerror = function onerror(err) {
	    callback.call(stream, err);
	  };
	  var onclose = function onclose() {
	    var err;
	    if (readable && !readableEnded) {
	      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
	      return callback.call(stream, err);
	    }
	    if (writable && !writableEnded) {
	      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
	      return callback.call(stream, err);
	    }
	  };
	  var onrequest = function onrequest() {
	    stream.req.on('finish', onfinish);
	  };
	  if (isRequest(stream)) {
	    stream.on('complete', onfinish);
	    stream.on('abort', onclose);
	    if (stream.req) onrequest();else stream.on('request', onrequest);
	  } else if (writable && !stream._writableState) {
	    // legacy streams
	    stream.on('end', onlegacyfinish);
	    stream.on('close', onlegacyfinish);
	  }
	  stream.on('end', onend);
	  stream.on('finish', onfinish);
	  if (opts.error !== false) stream.on('error', onerror);
	  stream.on('close', onclose);
	  return function () {
	    stream.removeListener('complete', onfinish);
	    stream.removeListener('abort', onclose);
	    stream.removeListener('request', onrequest);
	    if (stream.req) stream.req.removeListener('finish', onfinish);
	    stream.removeListener('end', onlegacyfinish);
	    stream.removeListener('close', onlegacyfinish);
	    stream.removeListener('finish', onfinish);
	    stream.removeListener('end', onend);
	    stream.removeListener('error', onerror);
	    stream.removeListener('close', onclose);
	  };
	}
	endOfStream = eos;
	return endOfStream;
}

var async_iterator;
var hasRequiredAsync_iterator;

function requireAsync_iterator () {
	if (hasRequiredAsync_iterator) return async_iterator;
	hasRequiredAsync_iterator = 1;

	var _Object$setPrototypeO;
	function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
	function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
	var finished = requireEndOfStream();
	var kLastResolve = Symbol('lastResolve');
	var kLastReject = Symbol('lastReject');
	var kError = Symbol('error');
	var kEnded = Symbol('ended');
	var kLastPromise = Symbol('lastPromise');
	var kHandlePromise = Symbol('handlePromise');
	var kStream = Symbol('stream');
	function createIterResult(value, done) {
	  return {
	    value: value,
	    done: done
	  };
	}
	function readAndResolve(iter) {
	  var resolve = iter[kLastResolve];
	  if (resolve !== null) {
	    var data = iter[kStream].read();
	    // we defer if data is null
	    // we can be expecting either 'end' or
	    // 'error'
	    if (data !== null) {
	      iter[kLastPromise] = null;
	      iter[kLastResolve] = null;
	      iter[kLastReject] = null;
	      resolve(createIterResult(data, false));
	    }
	  }
	}
	function onReadable(iter) {
	  // we wait for the next tick, because it might
	  // emit an error with process.nextTick
	  process.nextTick(readAndResolve, iter);
	}
	function wrapForNext(lastPromise, iter) {
	  return function (resolve, reject) {
	    lastPromise.then(function () {
	      if (iter[kEnded]) {
	        resolve(createIterResult(undefined, true));
	        return;
	      }
	      iter[kHandlePromise](resolve, reject);
	    }, reject);
	  };
	}
	var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
	var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
	  get stream() {
	    return this[kStream];
	  },
	  next: function next() {
	    var _this = this;
	    // if we have detected an error in the meanwhile
	    // reject straight away
	    var error = this[kError];
	    if (error !== null) {
	      return Promise.reject(error);
	    }
	    if (this[kEnded]) {
	      return Promise.resolve(createIterResult(undefined, true));
	    }
	    if (this[kStream].destroyed) {
	      // We need to defer via nextTick because if .destroy(err) is
	      // called, the error will be emitted via nextTick, and
	      // we cannot guarantee that there is no error lingering around
	      // waiting to be emitted.
	      return new Promise(function (resolve, reject) {
	        process.nextTick(function () {
	          if (_this[kError]) {
	            reject(_this[kError]);
	          } else {
	            resolve(createIterResult(undefined, true));
	          }
	        });
	      });
	    }

	    // if we have multiple next() calls
	    // we will wait for the previous Promise to finish
	    // this logic is optimized to support for await loops,
	    // where next() is only called once at a time
	    var lastPromise = this[kLastPromise];
	    var promise;
	    if (lastPromise) {
	      promise = new Promise(wrapForNext(lastPromise, this));
	    } else {
	      // fast path needed to support multiple this.push()
	      // without triggering the next() queue
	      var data = this[kStream].read();
	      if (data !== null) {
	        return Promise.resolve(createIterResult(data, false));
	      }
	      promise = new Promise(this[kHandlePromise]);
	    }
	    this[kLastPromise] = promise;
	    return promise;
	  }
	}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
	  return this;
	}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
	  var _this2 = this;
	  // destroy(err, cb) is a private API
	  // we can guarantee we have that here, because we control the
	  // Readable class this is attached to
	  return new Promise(function (resolve, reject) {
	    _this2[kStream].destroy(null, function (err) {
	      if (err) {
	        reject(err);
	        return;
	      }
	      resolve(createIterResult(undefined, true));
	    });
	  });
	}), _Object$setPrototypeO), AsyncIteratorPrototype);
	var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
	  var _Object$create;
	  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
	    value: stream,
	    writable: true
	  }), _defineProperty(_Object$create, kLastResolve, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kLastReject, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kError, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kEnded, {
	    value: stream._readableState.endEmitted,
	    writable: true
	  }), _defineProperty(_Object$create, kHandlePromise, {
	    value: function value(resolve, reject) {
	      var data = iterator[kStream].read();
	      if (data) {
	        iterator[kLastPromise] = null;
	        iterator[kLastResolve] = null;
	        iterator[kLastReject] = null;
	        resolve(createIterResult(data, false));
	      } else {
	        iterator[kLastResolve] = resolve;
	        iterator[kLastReject] = reject;
	      }
	    },
	    writable: true
	  }), _Object$create));
	  iterator[kLastPromise] = null;
	  finished(stream, function (err) {
	    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
	      var reject = iterator[kLastReject];
	      // reject if we are waiting for data in the Promise
	      // returned by next() and store the error
	      if (reject !== null) {
	        iterator[kLastPromise] = null;
	        iterator[kLastResolve] = null;
	        iterator[kLastReject] = null;
	        reject(err);
	      }
	      iterator[kError] = err;
	      return;
	    }
	    var resolve = iterator[kLastResolve];
	    if (resolve !== null) {
	      iterator[kLastPromise] = null;
	      iterator[kLastResolve] = null;
	      iterator[kLastReject] = null;
	      resolve(createIterResult(undefined, true));
	    }
	    iterator[kEnded] = true;
	  });
	  stream.on('readable', onReadable.bind(null, iterator));
	  return iterator;
	};
	async_iterator = createReadableStreamAsyncIterator;
	return async_iterator;
}

var from_1;
var hasRequiredFrom$1;

function requireFrom$1 () {
	if (hasRequiredFrom$1) return from_1;
	hasRequiredFrom$1 = 1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
	function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
	function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
	function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
	var ERR_INVALID_ARG_TYPE = requireErrors().codes.ERR_INVALID_ARG_TYPE;
	function from(Readable, iterable, opts) {
	  var iterator;
	  if (iterable && typeof iterable.next === 'function') {
	    iterator = iterable;
	  } else if (iterable && iterable[Symbol.asyncIterator]) iterator = iterable[Symbol.asyncIterator]();else if (iterable && iterable[Symbol.iterator]) iterator = iterable[Symbol.iterator]();else throw new ERR_INVALID_ARG_TYPE('iterable', ['Iterable'], iterable);
	  var readable = new Readable(_objectSpread({
	    objectMode: true
	  }, opts));
	  // Reading boolean to protect against _read
	  // being called before last iteration completion.
	  var reading = false;
	  readable._read = function () {
	    if (!reading) {
	      reading = true;
	      next();
	    }
	  };
	  function next() {
	    return _next2.apply(this, arguments);
	  }
	  function _next2() {
	    _next2 = _asyncToGenerator(function* () {
	      try {
	        var _yield$iterator$next = yield iterator.next(),
	          value = _yield$iterator$next.value,
	          done = _yield$iterator$next.done;
	        if (done) {
	          readable.push(null);
	        } else if (readable.push(yield value)) {
	          next();
	        } else {
	          reading = false;
	        }
	      } catch (err) {
	        readable.destroy(err);
	      }
	    });
	    return _next2.apply(this, arguments);
	  }
	  return readable;
	}
	from_1 = from;
	return from_1;
}

var _stream_readable;
var hasRequired_stream_readable;

function require_stream_readable () {
	if (hasRequired_stream_readable) return _stream_readable;
	hasRequired_stream_readable = 1;

	_stream_readable = Readable;

	/*<replacement>*/
	var Duplex;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	/*<replacement>*/
	require$$0$2.EventEmitter;
	var EElistenerCount = function EElistenerCount(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	/*<replacement>*/
	var Stream = requireStream();
	/*</replacement>*/

	var Buffer = require$$0$1.Buffer;
	var OurUint8Array = (typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}).Uint8Array || function () {};
	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}

	/*<replacement>*/
	var debugUtil = require$$1$3;
	var debug;
	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function debug() {};
	}
	/*</replacement>*/

	var BufferList = requireBuffer_list();
	var destroyImpl = requireDestroy();
	var _require = requireState(),
	  getHighWaterMark = _require.getHighWaterMark;
	var _require$codes = requireErrors().codes,
	  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
	  ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
	  ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
	  ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;

	// Lazy loaded to improve the startup performance.
	var StringDecoder;
	var createReadableStreamAsyncIterator;
	var from;
	requireInherits()(Readable, Stream);
	var errorOrDestroy = destroyImpl.errorOrDestroy;
	var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];
	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

	  // This is a hack to make sure that our error handler is attached before any
	  // userland ones.  NEVER DO THIS. This is here only because this code needs
	  // to continue to work with older versions of Node.js that do not include
	  // the prependListener() method. The goal is to eventually remove this hack.
	  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	}
	function ReadableState(options, stream, isDuplex) {
	  Duplex = Duplex || require_stream_duplex();
	  options = options || {};

	  // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream.
	  // These options can be provided separately as readableXXX and writableXXX.
	  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex;

	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;
	  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex);

	  // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()
	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the event 'readable'/'data' is emitted
	  // immediately, or on a later tick.  We set this to true at first, because
	  // any actions that shouldn't happen until "later" should generally also
	  // not happen before the first read call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;
	  this.paused = true;

	  // Should close be emitted on destroy. Defaults to true.
	  this.emitClose = options.emitClose !== false;

	  // Should .destroy() be called after 'end' (and potentially 'finish')
	  this.autoDestroy = !!options.autoDestroy;

	  // has it been destroyed
	  this.destroyed = false;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;
	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = requireString_decoder().StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	function Readable(options) {
	  Duplex = Duplex || require_stream_duplex();
	  if (!(this instanceof Readable)) return new Readable(options);

	  // Checking for a Stream.Duplex instance is faster here instead of inside
	  // the ReadableState constructor, at least with V8 6.5
	  var isDuplex = this instanceof Duplex;
	  this._readableState = new ReadableState(options, this, isDuplex);

	  // legacy
	  this.readable = true;
	  if (options) {
	    if (typeof options.read === 'function') this._read = options.read;
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	  }
	  Stream.call(this);
	}
	Object.defineProperty(Readable.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._readableState === undefined) {
	      return false;
	    }
	    return this._readableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._readableState) {
	      return;
	    }

	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._readableState.destroyed = value;
	  }
	});
	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;
	Readable.prototype._destroy = function (err, cb) {
	  cb(err);
	};

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;
	  var skipChunkCheck;
	  if (!state.objectMode) {
	    if (typeof chunk === 'string') {
	      encoding = encoding || state.defaultEncoding;
	      if (encoding !== state.encoding) {
	        chunk = Buffer.from(chunk, encoding);
	        encoding = '';
	      }
	      skipChunkCheck = true;
	    }
	  } else {
	    skipChunkCheck = true;
	  }
	  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  return readableAddChunk(this, chunk, null, true, false);
	};
	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
	  debug('readableAddChunk', chunk);
	  var state = stream._readableState;
	  if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else {
	    var er;
	    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
	    if (er) {
	      errorOrDestroy(stream, er);
	    } else if (state.objectMode || chunk && chunk.length > 0) {
	      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
	        chunk = _uint8ArrayToBuffer(chunk);
	      }
	      if (addToFront) {
	        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
	      } else if (state.ended) {
	        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
	      } else if (state.destroyed) {
	        return false;
	      } else {
	        state.reading = false;
	        if (state.decoder && !encoding) {
	          chunk = state.decoder.write(chunk);
	          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
	        } else {
	          addChunk(stream, state, chunk, false);
	        }
	      }
	    } else if (!addToFront) {
	      state.reading = false;
	      maybeReadMore(stream, state);
	    }
	  }

	  // We can push more data if we are below the highWaterMark.
	  // Also, if we have no data yet, we can stand some more bytes.
	  // This is to work around cases where hwm=0, such as the repl.
	  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
	}
	function addChunk(stream, state, chunk, addToFront) {
	  if (state.flowing && state.length === 0 && !state.sync) {
	    state.awaitDrain = 0;
	    stream.emit('data', chunk);
	  } else {
	    // update the buffer info.
	    state.length += state.objectMode ? 1 : chunk.length;
	    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
	    if (state.needReadable) emitReadable(stream);
	  }
	  maybeReadMore(stream, state);
	}
	function chunkInvalid(state, chunk) {
	  var er;
	  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
	  }
	  return er;
	}
	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	};

	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = requireString_decoder().StringDecoder;
	  var decoder = new StringDecoder(enc);
	  this._readableState.decoder = decoder;
	  // If setEncoding(null), decoder.encoding equals utf8
	  this._readableState.encoding = this._readableState.decoder.encoding;

	  // Iterate over current buffer to convert already stored Buffers:
	  var p = this._readableState.buffer.head;
	  var content = '';
	  while (p !== null) {
	    content += decoder.write(p.data);
	    p = p.next;
	  }
	  this._readableState.buffer.clear();
	  if (content !== '') this._readableState.buffer.push(content);
	  this._readableState.length = content.length;
	  return this;
	};

	// Don't raise the hwm > 1GB
	var MAX_HWM = 0x40000000;
	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }
	  return n;
	}

	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;
	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  }
	  // If we're asking for more than the current hwm, then raise the hwm.
	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n;
	  // Don't have enough
	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }
	  return state.length;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;
	  if (n !== 0) state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }
	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	    // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.
	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }
	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;
	  if (ret === null) {
	    state.needReadable = state.length <= state.highWaterMark;
	    n = 0;
	  } else {
	    state.length -= n;
	    state.awaitDrain = 0;
	  }
	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true;

	    // If we tried to read() past the EOF, then emit end on the next tick.
	    if (nOrig !== n && state.ended) endReadable(this);
	  }
	  if (ret !== null) this.emit('data', ret);
	  return ret;
	};
	function onEofChunk(stream, state) {
	  debug('onEofChunk');
	  if (state.ended) return;
	  if (state.decoder) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;
	  if (state.sync) {
	    // if we are sync, wait until next tick to emit the data.
	    // Otherwise we risk emitting data in the flow()
	    // the readable code triggers during a read() call
	    emitReadable(stream);
	  } else {
	    // emit 'readable' now to make sure it gets picked up.
	    state.needReadable = false;
	    if (!state.emittedReadable) {
	      state.emittedReadable = true;
	      emitReadable_(stream);
	    }
	  }
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  debug('emitReadable', state.needReadable, state.emittedReadable);
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    process.nextTick(emitReadable_, stream);
	  }
	}
	function emitReadable_(stream) {
	  var state = stream._readableState;
	  debug('emitReadable_', state.destroyed, state.length, state.ended);
	  if (!state.destroyed && (state.length || state.ended)) {
	    stream.emit('readable');
	    state.emittedReadable = false;
	  }

	  // The stream needs another readable event if
	  // 1. It is not flowing, as the flow mechanism will take
	  //    care of it.
	  // 2. It is not ended.
	  // 3. It is below the highWaterMark, so we can schedule
	  //    another readable later.
	  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
	  flow(stream);
	}

	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(maybeReadMore_, stream, state);
	  }
	}
	function maybeReadMore_(stream, state) {
	  // Attempt to read more data if we should.
	  //
	  // The conditions for reading more data are (one of):
	  // - Not enough data buffered (state.length < state.highWaterMark). The loop
	  //   is responsible for filling the buffer with enough data if such data
	  //   is available. If highWaterMark is 0 and we are not in the flowing mode
	  //   we should _not_ attempt to buffer any extra data. We'll get more data
	  //   when the stream consumer calls read() instead.
	  // - No data in the buffer, and the stream is in flowing mode. In this mode
	  //   the loop below is responsible for ensuring read() is called. Failing to
	  //   call read here would abort the flow and there's no other mechanism for
	  //   continuing the flow if the stream consumer has just subscribed to the
	  //   'data' event.
	  //
	  // In addition to the above conditions to keep reading data, the following
	  // conditions prevent the data from being read:
	  // - The stream has ended (state.ended).
	  // - There is already a pending 'read' operation (state.reading). This is a
	  //   case where the the stream has called the implementation defined _read()
	  //   method, but they are processing the call asynchronously and have _not_
	  //   called push() with new data. In this case we skip performing more
	  //   read()s. The execution ends in this method again after the _read() ends
	  //   up calling push() with more data.
	  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
	    var len = state.length;
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
	};
	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;
	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
	  var endFn = doEnd ? onend : unpipe;
	  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable, unpipeInfo) {
	    debug('onunpipe');
	    if (readable === src) {
	      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
	        unpipeInfo.hasUnpiped = true;
	        cleanup();
	      }
	    }
	  }
	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	  var cleanedUp = false;
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', unpipe);
	    src.removeListener('data', ondata);
	    cleanedUp = true;

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    debug('dest.write', ret);
	    if (ret === false) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', state.awaitDrain);
	        state.awaitDrain++;
	      }
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
	  }

	  // Make sure our error handler is attached before userland ones.
	  prependListener(dest, 'error', onerror);

	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);
	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }
	  return dest;
	};
	function pipeOnDrain(src) {
	  return function pipeOnDrainFunctionResult() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}
	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;
	  var unpipeInfo = {
	    hasUnpiped: false
	  };

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;
	    if (!dest) dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this, unpipeInfo);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    for (var i = 0; i < len; i++) dests[i].emit('unpipe', this, {
	      hasUnpiped: false
	    });
	    return this;
	  }

	  // try to find the right one.
	  var index = indexOf(state.pipes, dest);
	  if (index === -1) return this;
	  state.pipes.splice(index, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];
	  dest.emit('unpipe', this, unpipeInfo);
	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	  var state = this._readableState;
	  if (ev === 'data') {
	    // update readableListening so that resume() may be a no-op
	    // a few lines down. This is needed to support once('readable').
	    state.readableListening = this.listenerCount('readable') > 0;

	    // Try start flowing on next tick if stream isn't explicitly paused
	    if (state.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.flowing = false;
	      state.emittedReadable = false;
	      debug('on readable', state.length, state.reading);
	      if (state.length) {
	        emitReadable(this);
	      } else if (!state.reading) {
	        process.nextTick(nReadingNextTick, this);
	      }
	    }
	  }
	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	Readable.prototype.removeListener = function (ev, fn) {
	  var res = Stream.prototype.removeListener.call(this, ev, fn);
	  if (ev === 'readable') {
	    // We need to check if there is someone still listening to
	    // readable and reset the state. However this needs to happen
	    // after readable has been emitted but before I/O (nextTick) to
	    // support once('readable', fn) cycles. This means that calling
	    // resume within the same tick will have no
	    // effect.
	    process.nextTick(updateReadableListening, this);
	  }
	  return res;
	};
	Readable.prototype.removeAllListeners = function (ev) {
	  var res = Stream.prototype.removeAllListeners.apply(this, arguments);
	  if (ev === 'readable' || ev === undefined) {
	    // We need to check if there is someone still listening to
	    // readable and reset the state. However this needs to happen
	    // after readable has been emitted but before I/O (nextTick) to
	    // support once('readable', fn) cycles. This means that calling
	    // resume within the same tick will have no
	    // effect.
	    process.nextTick(updateReadableListening, this);
	  }
	  return res;
	};
	function updateReadableListening(self) {
	  var state = self._readableState;
	  state.readableListening = self.listenerCount('readable') > 0;
	  if (state.resumeScheduled && !state.paused) {
	    // flowing needs to be set to true now, otherwise
	    // the upcoming resume will not flow.
	    state.flowing = true;

	    // crude way to check if we should resume
	  } else if (self.listenerCount('data') > 0) {
	    self.resume();
	  }
	}
	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	}

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    // we flow only if there is no one listening
	    // for readable, but we still have to call
	    // resume()
	    state.flowing = !state.readableListening;
	    resume(this, state);
	  }
	  state.paused = false;
	  return this;
	};
	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(resume_, stream, state);
	  }
	}
	function resume_(stream, state) {
	  debug('resume', state.reading);
	  if (!state.reading) {
	    stream.read(0);
	  }
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}
	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (this._readableState.flowing !== false) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  this._readableState.paused = true;
	  return this;
	};
	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  while (state.flowing && stream.read() !== null);
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var _this = this;
	  var state = this._readableState;
	  var paused = false;
	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) _this.push(chunk);
	    }
	    _this.push(null);
	  });
	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;
	    var ret = _this.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function methodWrap(method) {
	        return function methodWrapReturnFunction() {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }

	  // proxy certain important events.
	  for (var n = 0; n < kProxyEvents.length; n++) {
	    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
	  }

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  this._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };
	  return this;
	};
	if (typeof Symbol === 'function') {
	  Readable.prototype[Symbol.asyncIterator] = function () {
	    if (createReadableStreamAsyncIterator === undefined) {
	      createReadableStreamAsyncIterator = requireAsync_iterator();
	    }
	    return createReadableStreamAsyncIterator(this);
	  };
	}
	Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.highWaterMark;
	  }
	});
	Object.defineProperty(Readable.prototype, 'readableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState && this._readableState.buffer;
	  }
	});
	Object.defineProperty(Readable.prototype, 'readableFlowing', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.flowing;
	  },
	  set: function set(state) {
	    if (this._readableState) {
	      this._readableState.flowing = state;
	    }
	  }
	});

	// exposed for testing purposes only.
	Readable._fromList = fromList;
	Object.defineProperty(Readable.prototype, 'readableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.length;
	  }
	});

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;
	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = state.buffer.consume(n, state.decoder);
	  }
	  return ret;
	}
	function endReadable(stream) {
	  var state = stream._readableState;
	  debug('endReadable', state.endEmitted);
	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(endReadableNT, state, stream);
	  }
	}
	function endReadableNT(state, stream) {
	  debug('endReadableNT', state.endEmitted, state.length);

	  // Check that we didn't get one last unshift.
	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');
	    if (state.autoDestroy) {
	      // In case of duplex streams we need a way to detect
	      // if the writable side is ready for autoDestroy as well
	      var wState = stream._writableState;
	      if (!wState || wState.autoDestroy && wState.finished) {
	        stream.destroy();
	      }
	    }
	  }
	}
	if (typeof Symbol === 'function') {
	  Readable.from = function (iterable, opts) {
	    if (from === undefined) {
	      from = requireFrom$1();
	    }
	    return from(Readable, iterable, opts);
	  };
	}
	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	return _stream_readable;
}

var _stream_transform;
var hasRequired_stream_transform;

function require_stream_transform () {
	if (hasRequired_stream_transform) return _stream_transform;
	hasRequired_stream_transform = 1;

	_stream_transform = Transform;
	var _require$codes = requireErrors().codes,
	  ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
	  ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
	  ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
	  ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
	var Duplex = require_stream_duplex();
	requireInherits()(Transform, Duplex);
	function afterTransform(er, data) {
	  var ts = this._transformState;
	  ts.transforming = false;
	  var cb = ts.writecb;
	  if (cb === null) {
	    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
	  }
	  ts.writechunk = null;
	  ts.writecb = null;
	  if (data != null)
	    // single equals check for both `null` and `undefined`
	    this.push(data);
	  cb(er);
	  var rs = this._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    this._read(rs.highWaterMark);
	  }
	}
	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);
	  Duplex.call(this, options);
	  this._transformState = {
	    afterTransform: afterTransform.bind(this),
	    needTransform: false,
	    transforming: false,
	    writecb: null,
	    writechunk: null,
	    writeencoding: null
	  };

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;
	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;
	    if (typeof options.flush === 'function') this._flush = options.flush;
	  }

	  // When the writable side finishes, then flush out anything remaining.
	  this.on('prefinish', prefinish);
	}
	function prefinish() {
	  var _this = this;
	  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
	    this._flush(function (er, data) {
	      done(_this, er, data);
	    });
	  } else {
	    done(this, null, null);
	  }
	}
	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function (chunk, encoding, cb) {
	  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
	};
	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function (n) {
	  var ts = this._transformState;
	  if (ts.writechunk !== null && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};
	Transform.prototype._destroy = function (err, cb) {
	  Duplex.prototype._destroy.call(this, err, function (err2) {
	    cb(err2);
	  });
	};
	function done(stream, er, data) {
	  if (er) return stream.emit('error', er);
	  if (data != null)
	    // single equals check for both `null` and `undefined`
	    stream.push(data);

	  // TODO(BridgeAR): Write a test for these two error cases
	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
	  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
	  return stream.push(null);
	}
	return _stream_transform;
}

var _stream_passthrough;
var hasRequired_stream_passthrough;

function require_stream_passthrough () {
	if (hasRequired_stream_passthrough) return _stream_passthrough;
	hasRequired_stream_passthrough = 1;

	_stream_passthrough = PassThrough;
	var Transform = require_stream_transform();
	requireInherits()(PassThrough, Transform);
	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);
	  Transform.call(this, options);
	}
	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};
	return _stream_passthrough;
}

var pipeline_1;
var hasRequiredPipeline;

function requirePipeline () {
	if (hasRequiredPipeline) return pipeline_1;
	hasRequiredPipeline = 1;

	var eos;
	function once(callback) {
	  var called = false;
	  return function () {
	    if (called) return;
	    called = true;
	    callback.apply(void 0, arguments);
	  };
	}
	var _require$codes = requireErrors().codes,
	  ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
	  ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
	function noop(err) {
	  // Rethrow the error if it exists to avoid swallowing it
	  if (err) throw err;
	}
	function isRequest(stream) {
	  return stream.setHeader && typeof stream.abort === 'function';
	}
	function destroyer(stream, reading, writing, callback) {
	  callback = once(callback);
	  var closed = false;
	  stream.on('close', function () {
	    closed = true;
	  });
	  if (eos === undefined) eos = requireEndOfStream();
	  eos(stream, {
	    readable: reading,
	    writable: writing
	  }, function (err) {
	    if (err) return callback(err);
	    closed = true;
	    callback();
	  });
	  var destroyed = false;
	  return function (err) {
	    if (closed) return;
	    if (destroyed) return;
	    destroyed = true;

	    // request.destroy just do .end - .abort is what we want
	    if (isRequest(stream)) return stream.abort();
	    if (typeof stream.destroy === 'function') return stream.destroy();
	    callback(err || new ERR_STREAM_DESTROYED('pipe'));
	  };
	}
	function call(fn) {
	  fn();
	}
	function pipe(from, to) {
	  return from.pipe(to);
	}
	function popCallback(streams) {
	  if (!streams.length) return noop;
	  if (typeof streams[streams.length - 1] !== 'function') return noop;
	  return streams.pop();
	}
	function pipeline() {
	  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
	    streams[_key] = arguments[_key];
	  }
	  var callback = popCallback(streams);
	  if (Array.isArray(streams[0])) streams = streams[0];
	  if (streams.length < 2) {
	    throw new ERR_MISSING_ARGS('streams');
	  }
	  var error;
	  var destroys = streams.map(function (stream, i) {
	    var reading = i < streams.length - 1;
	    var writing = i > 0;
	    return destroyer(stream, reading, writing, function (err) {
	      if (!error) error = err;
	      if (err) destroys.forEach(call);
	      if (reading) return;
	      destroys.forEach(call);
	      callback(error);
	    });
	  });
	  return streams.reduce(pipe);
	}
	pipeline_1 = pipeline;
	return pipeline_1;
}

var hasRequiredReadable;

function requireReadable () {
	if (hasRequiredReadable) return readable.exports;
	hasRequiredReadable = 1;
	(function (module, exports) {
		var Stream = require$$0;
		if (process.env.READABLE_STREAM === 'disable' && Stream) {
		  module.exports = Stream.Readable;
		  Object.assign(module.exports, Stream);
		  module.exports.Stream = Stream;
		} else {
		  exports = module.exports = require_stream_readable();
		  exports.Stream = Stream || exports;
		  exports.Readable = exports;
		  exports.Writable = require_stream_writable();
		  exports.Duplex = require_stream_duplex();
		  exports.Transform = require_stream_transform();
		  exports.PassThrough = require_stream_passthrough();
		  exports.finished = requireEndOfStream();
		  exports.pipeline = requirePipeline();
		} 
	} (readable, readable.exports));
	return readable.exports;
}

var hasRequiredThrough2;

function requireThrough2 () {
	if (hasRequiredThrough2) return through2.exports;
	hasRequiredThrough2 = 1;
	const { Transform } = requireReadable();

	function inherits (fn, sup) {
	  fn.super_ = sup;
	  fn.prototype = Object.create(sup.prototype, {
	    constructor: { value: fn, enumerable: false, writable: true, configurable: true }
	  });
	}

	// create a new export function, used by both the main export and
	// the .ctor export, contains common logic for dealing with arguments
	function through2$1 (construct) {
	  return (options, transform, flush) => {
	    if (typeof options === 'function') {
	      flush = transform;
	      transform = options;
	      options = {};
	    }

	    if (typeof transform !== 'function') {
	      // noop
	      transform = (chunk, enc, cb) => cb(null, chunk);
	    }

	    if (typeof flush !== 'function') {
	      flush = null;
	    }

	    return construct(options, transform, flush)
	  }
	}

	// main export, just make me a transform stream!
	const make = through2$1((options, transform, flush) => {
	  const t2 = new Transform(options);

	  t2._transform = transform;

	  if (flush) {
	    t2._flush = flush;
	  }

	  return t2
	});

	// make me a reusable prototype that I can `new`, or implicitly `new`
	// with a constructor call
	const ctor = through2$1((options, transform, flush) => {
	  function Through2 (override) {
	    if (!(this instanceof Through2)) {
	      return new Through2(override)
	    }

	    this.options = Object.assign({}, options, override);

	    Transform.call(this, this.options);

	    this._transform = transform;
	    if (flush) {
	      this._flush = flush;
	    }
	  }

	  inherits(Through2, Transform);

	  return Through2
	});

	const obj = through2$1(function (options, transform, flush) {
	  const t2 = new Transform(Object.assign({ objectMode: true, highWaterMark: 16 }, options));

	  t2._transform = transform;

	  if (flush) {
	    t2._flush = flush;
	  }

	  return t2
	});

	through2.exports = make;
	through2.exports.ctor = ctor;
	through2.exports.obj = obj;
	return through2.exports;
}

var through2Exports = requireThrough2();
const a = /*@__PURE__*/getDefaultExportFromCjs(through2Exports);

var tunnelAgent = {};

var hasRequiredTunnelAgent;

function requireTunnelAgent () {
	if (hasRequiredTunnelAgent) return tunnelAgent;
	hasRequiredTunnelAgent = 1;

	var tls = require$$1$5
	  , http = require$$1$4
	  , https = require$$2
	  , events = require$$0$2
	  , assert = require$$4
	  , util = require$$1$3
	  , Buffer = requireSafeBuffer().Buffer
	  ;

	tunnelAgent.httpOverHttp = httpOverHttp;
	tunnelAgent.httpsOverHttp = httpsOverHttp;
	tunnelAgent.httpOverHttps = httpOverHttps;
	tunnelAgent.httpsOverHttps = httpsOverHttps;


	function httpOverHttp(options) {
	  var agent = new TunnelingAgent(options);
	  agent.request = http.request;
	  return agent
	}

	function httpsOverHttp(options) {
	  var agent = new TunnelingAgent(options);
	  agent.request = http.request;
	  agent.createSocket = createSecureSocket;
	  agent.defaultPort = 443;
	  return agent
	}

	function httpOverHttps(options) {
	  var agent = new TunnelingAgent(options);
	  agent.request = https.request;
	  return agent
	}

	function httpsOverHttps(options) {
	  var agent = new TunnelingAgent(options);
	  agent.request = https.request;
	  agent.createSocket = createSecureSocket;
	  agent.defaultPort = 443;
	  return agent
	}


	function TunnelingAgent(options) {
	  var self = this;
	  self.options = options || {};
	  self.proxyOptions = self.options.proxy || {};
	  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
	  self.requests = [];
	  self.sockets = [];

	  self.on('free', function onFree(socket, host, port) {
	    for (var i = 0, len = self.requests.length; i < len; ++i) {
	      var pending = self.requests[i];
	      if (pending.host === host && pending.port === port) {
	        // Detect the request to connect same origin server,
	        // reuse the connection.
	        self.requests.splice(i, 1);
	        pending.request.onSocket(socket);
	        return
	      }
	    }
	    socket.destroy();
	    self.removeSocket(socket);
	  });
	}
	util.inherits(TunnelingAgent, events.EventEmitter);

	TunnelingAgent.prototype.addRequest = function addRequest(req, options) {
	  var self = this;

	   // Legacy API: addRequest(req, host, port, path)
	  if (typeof options === 'string') {
	    options = {
	      host: options,
	      port: arguments[2],
	      path: arguments[3]
	    };
	  }

	  if (self.sockets.length >= this.maxSockets) {
	    // We are over limit so we'll add it to the queue.
	    self.requests.push({host: options.host, port: options.port, request: req});
	    return
	  }

	  // If we are under maxSockets create a new one.
	  self.createConnection({host: options.host, port: options.port, request: req});
	};

	TunnelingAgent.prototype.createConnection = function createConnection(pending) {
	  var self = this;

	  self.createSocket(pending, function(socket) {
	    socket.on('free', onFree);
	    socket.on('close', onCloseOrRemove);
	    socket.on('agentRemove', onCloseOrRemove);
	    pending.request.onSocket(socket);

	    function onFree() {
	      self.emit('free', socket, pending.host, pending.port);
	    }

	    function onCloseOrRemove(err) {
	      self.removeSocket(socket);
	      socket.removeListener('free', onFree);
	      socket.removeListener('close', onCloseOrRemove);
	      socket.removeListener('agentRemove', onCloseOrRemove);
	    }
	  });
	};

	TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
	  var self = this;
	  var placeholder = {};
	  self.sockets.push(placeholder);

	  var connectOptions = mergeOptions({}, self.proxyOptions,
	    { method: 'CONNECT'
	    , path: options.host + ':' + options.port
	    , agent: false
	    }
	  );
	  if (connectOptions.proxyAuth) {
	    connectOptions.headers = connectOptions.headers || {};
	    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
	        Buffer.from(connectOptions.proxyAuth).toString('base64');
	  }

	  debug('making CONNECT request');
	  var connectReq = self.request(connectOptions);
	  connectReq.useChunkedEncodingByDefault = false; // for v0.6
	  connectReq.once('response', onResponse); // for v0.6
	  connectReq.once('upgrade', onUpgrade);   // for v0.6
	  connectReq.once('connect', onConnect);   // for v0.7 or later
	  connectReq.once('error', onError);
	  connectReq.end();

	  function onResponse(res) {
	    // Very hacky. This is necessary to avoid http-parser leaks.
	    res.upgrade = true;
	  }

	  function onUpgrade(res, socket, head) {
	    // Hacky.
	    process.nextTick(function() {
	      onConnect(res, socket, head);
	    });
	  }

	  function onConnect(res, socket, head) {
	    connectReq.removeAllListeners();
	    socket.removeAllListeners();

	    if (res.statusCode === 200) {
	      assert.equal(head.length, 0);
	      debug('tunneling connection has established');
	      self.sockets[self.sockets.indexOf(placeholder)] = socket;
	      cb(socket);
	    } else {
	      debug('tunneling socket could not be established, statusCode=%d', res.statusCode);
	      var error = new Error('tunneling socket could not be established, ' + 'statusCode=' + res.statusCode);
	      error.code = 'ECONNRESET';
	      options.request.emit('error', error);
	      self.removeSocket(placeholder);
	    }
	  }

	  function onError(cause) {
	    connectReq.removeAllListeners();

	    debug('tunneling socket could not be established, cause=%s\n', cause.message, cause.stack);
	    var error = new Error('tunneling socket could not be established, ' + 'cause=' + cause.message);
	    error.code = 'ECONNRESET';
	    options.request.emit('error', error);
	    self.removeSocket(placeholder);
	  }
	};

	TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
	  var pos = this.sockets.indexOf(socket);
	  if (pos === -1) return

	  this.sockets.splice(pos, 1);

	  var pending = this.requests.shift();
	  if (pending) {
	    // If we have pending requests and a socket gets closed a new one
	    // needs to be created to take over in the pool for the one that closed.
	    this.createConnection(pending);
	  }
	};

	function createSecureSocket(options, cb) {
	  var self = this;
	  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
	    // 0 is dummy port for v0.6
	    var secureSocket = tls.connect(0, mergeOptions({}, self.options,
	      { servername: options.host
	      , socket: socket
	      }
	    ));
	    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
	    cb(secureSocket);
	  });
	}


	function mergeOptions(target) {
	  for (var i = 1, len = arguments.length; i < len; ++i) {
	    var overrides = arguments[i];
	    if (typeof overrides === 'object') {
	      var keys = Object.keys(overrides);
	      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
	        var k = keys[j];
	        if (overrides[k] !== undefined) {
	          target[k] = overrides[k];
	        }
	      }
	    }
	  }
	  return target
	}


	var debug;
	if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
	  debug = function() {
	    var args = Array.prototype.slice.call(arguments);
	    if (typeof args[0] === 'string') {
	      args[0] = 'TUNNEL: ' + args[0];
	    } else {
	      args.unshift('TUNNEL:');
	    }
	    console.error.apply(console, args);
	  };
	} else {
	  debug = function() {};
	}
	tunnelAgent.debug = debug; // for test
	return tunnelAgent;
}

var tunnelAgentExports = requireTunnelAgent();
const index = /*@__PURE__*/getDefaultExportFromCjs(tunnelAgentExports);

const i = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: index
}, [tunnelAgentExports]);

function p$1(e){return Object.keys(e||{}).reduce((t,o)=>(t[o.toLowerCase()]=e[o],t),{})}let u$2=1;const d=65535;let h$1=null;const l$1=function(){u$2=u$2+1&d;};function f$1(e){let t=e.length||0,o=0,r=Date.now()+e.time,n=0;const s=function(){h$1||(h$1=setInterval(l$1,250),h$1.unref&&h$1.unref());const e=[0];let t=1,o=u$2-1&d;return {getSpeed:function(r){let n=u$2-o&d;for(n>20&&(n=20),o=u$2;n--;)20===t&&(t=0),e[t]=e[0===t?19:t-1],t++;r&&(e[t-1]+=r);const s=e[t-1],c=e.length<20?0:e[20===t?0:t];return e.length<4?s:4*(s-c)/e.length},clear:function(){h$1&&(clearInterval(h$1),h$1=null);}}}(),c=Date.now(),i={percentage:0,transferred:o,length:t,remaining:t,eta:0,runtime:0,speed:0,delta:0},p=function(a){i.delta=n,i.percentage=a?100:t?o/t*100:0,i.speed=s.getSpeed(n),i.eta=Math.round(i.remaining/i.speed),i.runtime=Math.floor((Date.now()-c)/1e3),r=Date.now()+e.time,n=0,f.emit("progress",i);},f=a({},function(e,s,c){const a=e.length;o+=a,n+=a,i.transferred=o,i.remaining=t>=o?t-o:0,Date.now()>=r&&p(false),c(null,e);},function(e){p(true),s.clear(),e();}),m=function(e){t=e,i.length=t,i.remaining=t-i.transferred,f.emit("length",t);};return f.on("pipe",function(e){if(!(t>0)){if(e.readable&&!("writable"in e)&&"headers"in e&&"object"==typeof(o=e.headers)&&null!==o&&!Array.isArray(o)){const t="string"==typeof e.headers["content-length"]?parseInt(e.headers["content-length"],10):0;return m(t)}if("length"in e&&"number"==typeof e.length)return m(e.length);e.on("response",function(e){if(e&&e.headers&&"gzip"!==e.headers["content-encoding"]&&e.headers["content-length"])return m(parseInt(e.headers["content-length"]))});}var o;}),f.progress=function(){return i.speed=s.getSpeed(0),i.eta=Math.round(i.remaining/i.speed),i},f}function m(e){return e.replace(/^\.*/,".").toLowerCase()}function g$1(e){const t=e.trim().toLowerCase(),o=t.split(":",2);return {hostname:m(o[0]),port:o[1],hasPort:t.indexOf(":")>-1}}const y$1=["protocol","slashes","auth","host","port","hostname","hash","search","query","pathname","path","href"],b$1=["accept","accept-charset","accept-encoding","accept-language","accept-ranges","cache-control","content-encoding","content-language","content-location","content-md5","content-range","content-type","connection","date","expect","max-forwards","pragma","referer","te","user-agent","via"],x$1=["proxy-authorization"],w$1=e=>null!==e&&"object"==typeof e&&"function"==typeof e.pipe,O$2="node";let T$2 = class T extends Error{request;code;constructor(e,t){super(e.message),this.request=t,this.code=e.code;}};const v$1=(e,t,o,r)=>({body:r,url:t,method:o,headers:e.headers,statusCode:e.statusCode,statusMessage:e.statusMessage}),R$1=(a,u)=>{const{options:d}=a,h=Object.assign({},c$2.parse(d.url));if("function"==typeof fetch&&d.fetch){const e=new AbortController,t=a.applyMiddleware("finalizeOptions",{...h,method:d.method,headers:{..."object"==typeof d.fetch&&d.fetch.headers?p$1(d.fetch.headers):{},...p$1(d.headers)},maxRedirects:d.maxRedirects}),o={credentials:d.withCredentials?"include":"omit",..."object"==typeof d.fetch?d.fetch:{},method:t.method,headers:t.headers,body:d.body,signal:e.signal},r=a.applyMiddleware("interceptRequest",void 0,{adapter:O$2,context:a});if(r){const e=setTimeout(u,0,null,r);return {abort:()=>clearTimeout(e)}}const n=fetch(d.url,o);return a.applyMiddleware("onRequest",{options:d,adapter:O$2,request:n,context:a}),n.then(async e=>{const t=d.rawBody?e.body:await e.text(),o={};e.headers.forEach((e,t)=>{o[t]=e;}),u(null,{body:t,url:e.url,method:d.method,headers:o,statusCode:e.status,statusMessage:e.statusText});}).catch(e=>{"AbortError"!=e.name&&u(e);}),{abort:()=>e.abort()}}const l=w$1(d.body)?"stream":typeof d.body;if("undefined"!==l&&"stream"!==l&&"string"!==l&&!Buffer.isBuffer(d.body))throw new Error(`Request body must be a string, buffer or stream, got ${l}`);const R={};d.bodySize?R["content-length"]=d.bodySize:d.body&&"stream"!==l&&(R["content-length"]=Buffer.byteLength(d.body));let j=false;const M=(e,t)=>!j&&u(e,t);a.channels.abort.subscribe(()=>{j=true;});let $=Object.assign({},h,{method:d.method,headers:Object.assign({},p$1(d.headers),R),maxRedirects:d.maxRedirects});const q=function(e){const t=typeof e.proxy>"u"?function(e){const t=process.env.NO_PROXY||process.env.no_proxy||"";return "*"===t||""!==t&&function(e,t){const o=e.port||("https:"===e.protocol?"443":"80"),r=m(e.hostname||"");return t.split(",").map(g$1).some(e=>{const t=r.indexOf(e.hostname),n=t>-1&&t===r.length-e.hostname.length;return e.hasPort?o===e.port&&n:n})}(e,t)?null:"http:"===e.protocol?process.env.HTTP_PROXY||process.env.http_proxy||null:"https:"===e.protocol&&(process.env.HTTPS_PROXY||process.env.https_proxy||process.env.HTTP_PROXY||process.env.http_proxy)||null}(c$2.parse(e.url)):e.proxy;return "string"==typeof t?c$2.parse(t):t||null}(d),C=q&&function(e){return typeof e.tunnel<"u"?!!e.tunnel:"https:"===c$2.parse(e.url).protocol}(d),S=a.applyMiddleware("interceptRequest",void 0,{adapter:O$2,context:a});if(S){const e=setImmediate(M,null,S);return {abort:()=>clearImmediate(e)}}if(0!==d.maxRedirects&&($.maxRedirects=d.maxRedirects||5),q&&C?$=function(e={},t){const o=Object.assign({},e),r=b$1.concat(o.proxyHeaderWhiteList||[]).map(e=>e.toLowerCase()),n=x$1.concat(o.proxyHeaderExclusiveList||[]).map(e=>e.toLowerCase()),s=(c=o.headers,a=r,Object.keys(c).filter(e=>-1!==a.indexOf(e.toLowerCase())).reduce((e,t)=>(e[t]=c[t],e),{}));var c,a;s.host=function(e){const t=e.port,o=e.protocol;let r=`${e.hostname}:`;return r+=t||("https:"===o?"443":"80"),r}(o),o.headers=Object.keys(o.headers||{}).reduce((e,t)=>(-1===n.indexOf(t.toLowerCase())&&(e[t]=o.headers[t]),e),{});const p=function(e,t){const o=function(e){return y$1.reduce((t,o)=>(t[o]=e[o],t),{})}(e),r=function(e,t){return `${"https:"===e.protocol?"https":"http"}Over${"https:"===t.protocol?"Https":"Http"}`}(o,t);return i[r]}(o,t),u=function(e,t,o){return {proxy:{host:t.hostname,port:+t.port,proxyAuth:t.auth,headers:o},headers:e.headers,ca:e.ca,cert:e.cert,key:e.key,passphrase:e.passphrase,pfx:e.pfx,ciphers:e.ciphers,rejectUnauthorized:e.rejectUnauthorized,secureOptions:e.secureOptions,secureProtocol:e.secureProtocol}}(o,t,s);return o.agent=p(u),o}($,q):q&&!C&&($=function(e,t,o){const r=e.headers||{},n=Object.assign({},e,{headers:r});return r.host=r.host||function(e){const t=e.port||("https:"===e.protocol?"443":"80");return `${e.hostname}:${t}`}(t),n.protocol=o.protocol||n.protocol,n.hostname=(o.host||"hostname"in o&&o.hostname||n.hostname||"").replace(/:\d+/,""),n.port=o.port?`${o.port}`:n.port,n.host=function(e){let t=e.host;return e.port&&("80"===e.port&&"http:"===e.protocol||"443"===e.port&&"https:"===e.protocol)&&(t=e.hostname),t}(Object.assign({},t,o)),n.href=`${n.protocol}//${n.host}${n.path}`,n.path=c$2.format(t),n}($,h,q)),!C&&q&&q.auth&&!$.headers["proxy-authorization"]){const[e,t]="string"==typeof q.auth?q.auth.split(":").map(e=>n$2.unescape(e)):[q.auth.username,q.auth.password],o=Buffer.from(`${e}:${t}`,"utf8").toString("base64");$.headers["proxy-authorization"]=`Basic ${o}`;}const z=function(e,n,s){const c="https:"===e.protocol,a=0===e.maxRedirects?{http:require$$1$4,https:require$$2}:{http:t.http,https:t.https};if(!n||s)return c?a.https:a.http;let i=443===n.port;return n.protocol&&(i=/^https:?/.test(n.protocol)),i?a.https:a.http}($,q,C);"function"==typeof d.debug&&q&&d.debug("Proxying using %s",$.agent?"tunnel agent":`${$.host}:${$.port}`);const E="HEAD"!==$.method;let L;E&&!$.headers["accept-encoding"]&&false!==d.compress&&($.headers["accept-encoding"]=typeof Bun<"u"?"gzip, deflate":"br, gzip, deflate");const P=a.applyMiddleware("finalizeOptions",$),k=z.request(P,t=>{const o=E?e(t):t;L=o;const r=a.applyMiddleware("onHeaders",o,{headers:t.headers,adapter:O$2,context:a}),n="responseUrl"in t?t.responseUrl:d.url;d.stream?M(null,v$1(o,n,$.method,r)):function(e,t){const o=[];e.on("data",function(e){o.push(e);}),e.once("end",function(){t&&t(null,Buffer.concat(o)),t=null;}),e.once("error",function(e){t&&t(e),t=null;});}(r,(e,t)=>{if(e)return M(e);const r=d.rawBody?t:t.toString(),s=v$1(o,n,$.method,r);return M(null,s)});});function B(e){L&&L.destroy(e),k.destroy(e);}k.once("socket",e=>{e.once("error",B),k.once("response",t=>{t.once("end",()=>{e.removeListener("error",B);});});}),k.once("error",e=>{L||M(new T$2(e,k));}),d.timeout&&function(e,t){if(e.timeoutTimer)return e;const o=isNaN(t)?t:{socket:t,connect:t},r=e.getHeader("host"),n=r?" to "+r:"";function s(){e.timeoutTimer&&(clearTimeout(e.timeoutTimer),e.timeoutTimer=null);}function c(t){if(s(),void 0!==o.socket){const r=()=>{const e=new Error("Socket timed out on request"+n);e.code="ESOCKETTIMEDOUT",t.destroy(e);};t.setTimeout(o.socket,r),e.once("response",e=>{e.once("end",()=>{t.removeListener("timeout",r);});});}} void 0!==o.connect&&(e.timeoutTimer=setTimeout(function(){const t=new Error("Connection timed out on request"+n);t.code="ETIMEDOUT",e.destroy(t);},o.connect)),e.on("socket",function(e){e.connecting?e.once("connect",()=>c(e)):c(e);}),e.on("error",s);}(k,d.timeout);const{bodyStream:H,progress:D}=function(e){if(!e.body)return {};const t=w$1(e.body),o=e.bodySize||(t?null:Buffer.byteLength(e.body));if(!o)return t?{bodyStream:e.body}:{};const r=f$1({time:32,length:o});return {bodyStream:(t?e.body:Readable.from(e.body)).pipe(r),progress:r}}(d);return a.applyMiddleware("onRequest",{options:d,adapter:O$2,request:k,context:a,progress:D}),H?H.pipe(k):k.end(d.body),{abort:()=>k.abort()}};

const o=(r=[],o=R$1)=>n(r,o);

function c$1(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}

var isRetryAllowed;
var hasRequiredIsRetryAllowed;

function requireIsRetryAllowed () {
	if (hasRequiredIsRetryAllowed) return isRetryAllowed;
	hasRequiredIsRetryAllowed = 1;

	const denyList = new Set([
		'ENOTFOUND',
		'ENETUNREACH',

		// SSL errors from https://github.com/nodejs/node/blob/fc8e3e2cdc521978351de257030db0076d79e0ab/src/crypto/crypto_common.cc#L301-L328
		'UNABLE_TO_GET_ISSUER_CERT',
		'UNABLE_TO_GET_CRL',
		'UNABLE_TO_DECRYPT_CERT_SIGNATURE',
		'UNABLE_TO_DECRYPT_CRL_SIGNATURE',
		'UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY',
		'CERT_SIGNATURE_FAILURE',
		'CRL_SIGNATURE_FAILURE',
		'CERT_NOT_YET_VALID',
		'CERT_HAS_EXPIRED',
		'CRL_NOT_YET_VALID',
		'CRL_HAS_EXPIRED',
		'ERROR_IN_CERT_NOT_BEFORE_FIELD',
		'ERROR_IN_CERT_NOT_AFTER_FIELD',
		'ERROR_IN_CRL_LAST_UPDATE_FIELD',
		'ERROR_IN_CRL_NEXT_UPDATE_FIELD',
		'OUT_OF_MEM',
		'DEPTH_ZERO_SELF_SIGNED_CERT',
		'SELF_SIGNED_CERT_IN_CHAIN',
		'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
		'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
		'CERT_CHAIN_TOO_LONG',
		'CERT_REVOKED',
		'INVALID_CA',
		'PATH_LENGTH_EXCEEDED',
		'INVALID_PURPOSE',
		'CERT_UNTRUSTED',
		'CERT_REJECTED',
		'HOSTNAME_MISMATCH'
	]);

	// TODO: Use `error?.code` when targeting Node.js 14
	isRetryAllowed = error => !denyList.has(error && error.code);
	return isRetryAllowed;
}

var isRetryAllowedExports = requireIsRetryAllowed();
const u$1 = /*@__PURE__*/getDefaultExportFromCjs(isRetryAllowedExports);

const p=/^https:/i;function l(s){const n=new Agent(s),r=new Agent$1(s),o={http:n,https:r};return {finalizeOptions:e=>{if(e.agent)return e;if(e.maxRedirects>0)return {...e,agents:o};const t=p.test(e.href||e.protocol);return {...e,agent:t?r:n}}}}var h,g,C$1,b,y,w={exports:{}},O$1={exports:{}};function F(){return b?C$1:(b=1,C$1=function(e){function t(e){let n,r,o,i=null;function c(...e){if(!c.enabled)return;const s=c,r=Number(/* @__PURE__ */new Date),o=r-(n||r);s.diff=o,s.prev=n,s.curr=r,n=r,e[0]=t.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let i=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,(n,r)=>{if("%%"===n)return "%";i++;const o=t.formatters[r];if("function"==typeof o){const t=e[i];n=o.call(s,t),e.splice(i,1),i--;}return n}),t.formatArgs.call(s,e),(s.log||t.log).apply(s,e);}return c.namespace=e,c.useColors=t.useColors(),c.color=t.selectColor(e),c.extend=s,c.destroy=t.destroy,Object.defineProperty(c,"enabled",{enumerable:true,configurable:false,get:()=>null!==i?i:(r!==t.namespaces&&(r=t.namespaces,o=t.enabled(e)),o),set:e=>{i=e;}}),"function"==typeof t.init&&t.init(c),c}function s(e,s){const n=t(this.namespace+(typeof s>"u"?":":s)+e);return n.log=this.log,n}function n(e,t){let s=0,n=0,r=-1,o=0;for(;s<e.length;)if(n<t.length&&(t[n]===e[s]||"*"===t[n]))"*"===t[n]?(r=n,o=s,n++):(s++,n++);else {if(-1===r)return  false;n=r+1,o++,s=o;}for(;n<t.length&&"*"===t[n];)n++;return n===t.length}return t.debug=t,t.default=t,t.coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){const e=[...t.names,...t.skips.map(e=>"-"+e)].join(",");return t.enable(""),e},t.enable=function(e){t.save(e),t.namespaces=e,t.names=[],t.skips=[];const s=("string"==typeof e?e:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(const e of s)"-"===e[0]?t.skips.push(e.slice(1)):t.names.push(e);},t.enabled=function(e){for(const s of t.skips)if(n(e,s))return  false;for(const s of t.names)if(n(e,s))return  true;return  false},t.humanize=function(){if(g)return h;g=1;var e=1e3,t=60*e,s=60*t,n=24*s,r=7*n;function o(e,t,s,n){var r=t>=1.5*s;return Math.round(e/s)+" "+n+(r?"s":"")}return h=function(i,c){c=c||{};var a,u,p=typeof i;if("string"===p&&i.length>0)return function(o){if(!((o=String(o)).length>100)){var i=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(o);if(i){var c=parseFloat(i[1]);switch((i[2]||"ms").toLowerCase()){case "years":case "year":case "yrs":case "yr":case "y":return 315576e5*c;case "weeks":case "week":case "w":return c*r;case "days":case "day":case "d":return c*n;case "hours":case "hour":case "hrs":case "hr":case "h":return c*s;case "minutes":case "minute":case "mins":case "min":case "m":return c*t;case "seconds":case "second":case "secs":case "sec":case "s":return c*e;case "milliseconds":case "millisecond":case "msecs":case "msec":case "ms":return c;default:return}}}}(i);if("number"===p&&isFinite(i))return c.long?(a=i,(u=Math.abs(a))>=n?o(a,u,n,"day"):u>=s?o(a,u,s,"hour"):u>=t?o(a,u,t,"minute"):u>=e?o(a,u,e,"second"):a+" ms"):function(r){var o=Math.abs(r);return o>=n?Math.round(r/n)+"d":o>=s?Math.round(r/s)+"h":o>=t?Math.round(r/t)+"m":o>=e?Math.round(r/e)+"s":r+"ms"}(i);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(i))}}(),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");},Object.keys(e).forEach(s=>{t[s]=e[s];}),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let s=0;for(let t=0;t<e.length;t++)s=(s<<5)-s+e.charCodeAt(t),s|=0;return t.colors[Math.abs(s)%t.colors.length]},t.enable(t.load()),t})}var v,j,x,E$1,k={exports:{}},R=/* @__PURE__ */c$1((E$1||(E$1=1,typeof process>"u"||"renderer"===process.type||true===process.browser||process.__nwjs?w.exports=(y||(y=1,function(e,t){t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const s="color: "+this.color;t.splice(1,0,s,"color: inherit");let n=0,r=0;t[0].replace(/%[a-zA-Z%]/g,e=>{"%%"!==e&&(n++,"%c"===e&&(r=n));}),t.splice(r,0,s);},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug");}catch{}},t.load=function(){let e;try{e=t.storage.getItem("debug")||t.storage.getItem("DEBUG");}catch{}return !e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e},t.useColors=function(){if(typeof window<"u"&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return  true;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return  false;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage=function(){try{return localStorage}catch{}}(),t.destroy=/* @__PURE__ */(()=>{let e=false;return ()=>{e||(e=true,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=F()(t);const{formatters:s}=e.exports;s.j=function(e){try{return JSON.stringify(e)}catch(e){return "[UnexpectedJSONParseError]: "+e.message}};}(O$1,O$1.exports)),O$1.exports):w.exports=(x||(x=1,function(e,t){const s=require$$1$1,o=require$$1$3;t.init=function(e){e.inspectOpts={};const s=Object.keys(t.inspectOpts);for(let n=0;n<s.length;n++)e.inspectOpts[s[n]]=t.inspectOpts[s[n]];},t.log=function(...e){return process.stderr.write(o.formatWithOptions(t.inspectOpts,...e)+"\n")},t.formatArgs=function(s){const{namespace:n,useColors:r}=this;if(r){const t=this.color,r="[3"+(t<8?t:"8;5;"+t),o=`  ${r};1m${n} [0m`;s[0]=o+s[0].split("\n").join("\n"+o),s.push(r+"m+"+e.exports.humanize(this.diff)+"[0m");}else s[0]=(t.inspectOpts.hideDate?"":/* @__PURE__ */(new Date).toISOString()+" ")+n+" "+s[0];},t.save=function(e){e?process.env.DEBUG=e:delete process.env.DEBUG;},t.load=function(){return process.env.DEBUG},t.useColors=function(){return "colors"in t.inspectOpts?!!t.inspectOpts.colors:s.isatty(process.stderr.fd)},t.destroy=o.deprecate(()=>{},"Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."),t.colors=[6,2,3,4,5,1];try{const e=function(){if(j)return v;j=1;const e=function(){const e=/(Chrome|Chromium)\/(?<chromeVersion>\d+)\./.exec(navigator.userAgent);if(e)return Number.parseInt(e.groups.chromeVersion,10)}()>=69&&{level:1,hasBasic:!0,has256:!1,has16m:!1};return v={stdout:e,stderr:e}}();e&&(e.stderr||e).level>=2&&(t.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221]);}catch{}t.inspectOpts=Object.keys(process.env).filter(e=>/^debug_/i.test(e)).reduce((e,t)=>{const s=t.substring(6).toLowerCase().replace(/_([a-z])/g,(e,t)=>t.toUpperCase());let n=process.env[t];return n=!!/^(yes|on|true|enabled)$/i.test(n)||!/^(no|off|false|disabled)$/i.test(n)&&("null"===n?null:Number(n)),e[s]=n,e},{}),e.exports=F()(t);const{formatters:i}=e.exports;i.o=function(e){return this.inspectOpts.colors=this.useColors,o.inspect(e,this.inspectOpts).split("\n").map(e=>e.trim()).join(" ")},i.O=function(e){return this.inspectOpts.colors=this.useColors,o.inspect(e,this.inspectOpts)};}(k,k.exports)),k.exports)),w.exports));const A=["cookie","authorization"],q=Object.prototype.hasOwnProperty;function S$1(e={}){const t=e.verbose,s=e.namespace||"get-it",n=R(s),r=e.log||n,o=r===n&&!R.enabled(s);let i=0;return {processOptions:e=>(e.debug=r,e.requestId=e.requestId||++i,e),onRequest:s=>{if(o||!s)return s;const n=s.options;if(r("[%s] HTTP %s %s",n.requestId,n.method,n.url),t&&n.body&&"string"==typeof n.body&&r("[%s] Request body: %s",n.requestId,n.body),t&&n.headers){const t=false===e.redactSensitiveHeaders?n.headers:((e,t)=>{const s={};for(const n in e)q.call(e,n)&&(s[n]=t.indexOf(n.toLowerCase())>-1?"<redacted>":e[n]);return s})(n.headers,A);r("[%s] Request headers: %s",n.requestId,JSON.stringify(t,null,2));}return s},onResponse:(e,s)=>{if(o||!e)return e;const n=s.options.requestId;return r("[%s] Response code: %s %s",n,e.statusCode,e.statusMessage),t&&e.body&&r("[%s] Response body: %s",n,function(e){return  -1!==(e.headers["content-type"]||"").toLowerCase().indexOf("application/json")?function(e){try{const t="string"==typeof e?JSON.parse(e):e;return JSON.stringify(t,null,2)}catch{return e}}(e.body):e.body}(e)),e},onError:(e,t)=>{const s=t.options.requestId;return e?(r("[%s] ERROR: %s",s,e.message),e):(r("[%s] Error encountered, but handled by an earlier middleware",s),e)}}}function I$1(e,t={}){return {processOptions:s=>{const n=s.headers||{};return s.headers=t.override?Object.assign({},n,e):Object.assign({},e,n),s}}}const T$1=typeof Buffer>"u"?()=>false:e=>Buffer.isBuffer(e);function M(e){return "[object Object]"===Object.prototype.toString.call(e)}function P(e){if(false===M(e))return  false;const t=e.constructor;if(void 0===t)return  true;const s=t.prototype;return !(false===M(s)||false===s.hasOwnProperty("isPrototypeOf"))}const z=["boolean","string","number"];function B(){return {processOptions:e=>{const t=e.body;return !t||"function"==typeof t.pipe||T$1(t)||-1===z.indexOf(typeof t)&&!Array.isArray(t)&&!P(t)?e:Object.assign({},e,{body:JSON.stringify(e.body),headers:Object.assign({},e.headers,{"Content-Type":"application/json"})})}}}function D(e){return {onResponse:s=>{const n=s.headers["content-type"]||"",r=e&&e.force||-1!==n.indexOf("application/json");return s.body&&n&&r?Object.assign({},s,{body:t(s.body)}):s},processOptions:e=>Object.assign({},e,{headers:Object.assign({Accept:"application/json"},e.headers)})};function t(e){try{return JSON.parse(e)}catch(e){throw e.message=`Failed to parsed response body as JSON: ${e.message}`,e}}}let J={};typeof globalThis<"u"?J=globalThis:typeof window<"u"?J=window:typeof global<"u"?J=global:typeof self<"u"&&(J=self);var U=J;function G(e={}){const t=e.implementation||U.Observable;if(!t)throw new Error("`Observable` is not available in global scope, and no implementation was passed");return {onReturn:(e,s)=>new t(t=>(e.error.subscribe(e=>t.error(e)),e.progress.subscribe(e=>t.next(Object.assign({type:"progress"},e))),e.response.subscribe(e=>{t.next(Object.assign({type:"response"},e)),t.complete();}),e.request.publish(s),()=>e.abort.publish()))}}function H(e){return t=>({stage:e,percent:t.percentage,total:t.length,loaded:t.transferred,lengthComputable:!(0===t.length&&0===t.percentage)})}function V(){let e=false;const t=H("download"),s=H("upload");return {onHeaders:(e,s)=>{const n=f$1({time:32});return n.on("progress",e=>s.context.channels.progress.publish(t(e))),e.pipe(n)},onRequest:t=>{t.progress&&t.progress.on("progress",n=>{e=true,t.context.channels.progress.publish(s(n));});},onResponse:(t,n)=>(!e&&typeof n.options.body<"u"&&n.channels.progress.publish(s({length:0,transferred:0,percentage:100})),t)}}var X=(e,t,s)=>!("GET"!==s.method&&"HEAD"!==s.method||e.response&&e.response.statusCode)&&u$1(e);function Y(e){return 100*Math.pow(2,e)+100*Math.random()}const ee=(e={})=>(e=>{const t=e.maxRetries||5,s=e.retryDelay||Y,n=e.shouldRetry;return {onError:(e,r)=>{const o=r.options,i=o.maxRetries||t,c=o.retryDelay||s,a=o.shouldRetry||n,u=o.attemptNumber||0;if(null!==(p=o.body)&&"object"==typeof p&&"function"==typeof p.pipe||!a(e,u,o)||u>=i)return e;var p;const l=Object.assign({},r,{options:Object.assign({},o,{attemptNumber:u+1})});return setTimeout(()=>r.channels.request.publish(l),c(u)),null}}})({shouldRetry:X,...e});ee.shouldRetry=X;

var cjs = {};

var Observable = {};

var Subscriber = {};

var isFunction = {};

var hasRequiredIsFunction;

function requireIsFunction () {
	if (hasRequiredIsFunction) return isFunction;
	hasRequiredIsFunction = 1;
	Object.defineProperty(isFunction, "__esModule", { value: true });
	isFunction.isFunction = void 0;
	function isFunction$1(value) {
	    return typeof value === 'function';
	}
	isFunction.isFunction = isFunction$1;
	
	return isFunction;
}

var Subscription = {};

var UnsubscriptionError = {};

var createErrorClass = {};

var hasRequiredCreateErrorClass;

function requireCreateErrorClass () {
	if (hasRequiredCreateErrorClass) return createErrorClass;
	hasRequiredCreateErrorClass = 1;
	Object.defineProperty(createErrorClass, "__esModule", { value: true });
	createErrorClass.createErrorClass = void 0;
	function createErrorClass$1(createImpl) {
	    var _super = function (instance) {
	        Error.call(instance);
	        instance.stack = new Error().stack;
	    };
	    var ctorFunc = createImpl(_super);
	    ctorFunc.prototype = Object.create(Error.prototype);
	    ctorFunc.prototype.constructor = ctorFunc;
	    return ctorFunc;
	}
	createErrorClass.createErrorClass = createErrorClass$1;
	
	return createErrorClass;
}

var hasRequiredUnsubscriptionError;

function requireUnsubscriptionError () {
	if (hasRequiredUnsubscriptionError) return UnsubscriptionError;
	hasRequiredUnsubscriptionError = 1;
	Object.defineProperty(UnsubscriptionError, "__esModule", { value: true });
	UnsubscriptionError.UnsubscriptionError = void 0;
	var createErrorClass_1 = /*@__PURE__*/ requireCreateErrorClass();
	UnsubscriptionError.UnsubscriptionError = createErrorClass_1.createErrorClass(function (_super) {
	    return function UnsubscriptionErrorImpl(errors) {
	        _super(this);
	        this.message = errors
	            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
	            : '';
	        this.name = 'UnsubscriptionError';
	        this.errors = errors;
	    };
	});
	
	return UnsubscriptionError;
}

var arrRemove = {};

var hasRequiredArrRemove;

function requireArrRemove () {
	if (hasRequiredArrRemove) return arrRemove;
	hasRequiredArrRemove = 1;
	Object.defineProperty(arrRemove, "__esModule", { value: true });
	arrRemove.arrRemove = void 0;
	function arrRemove$1(arr, item) {
	    if (arr) {
	        var index = arr.indexOf(item);
	        0 <= index && arr.splice(index, 1);
	    }
	}
	arrRemove.arrRemove = arrRemove$1;
	
	return arrRemove;
}

var hasRequiredSubscription;

function requireSubscription () {
	if (hasRequiredSubscription) return Subscription;
	hasRequiredSubscription = 1;
	var __values = (Subscription && Subscription.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	var __read = (Subscription && Subscription.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (Subscription && Subscription.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(Subscription, "__esModule", { value: true });
	Subscription.isSubscription = Subscription.EMPTY_SUBSCRIPTION = Subscription.Subscription = void 0;
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	var UnsubscriptionError_1 = /*@__PURE__*/ requireUnsubscriptionError();
	var arrRemove_1 = /*@__PURE__*/ requireArrRemove();
	var Subscription$1 = (function () {
	    function Subscription(initialTeardown) {
	        this.initialTeardown = initialTeardown;
	        this.closed = false;
	        this._parentage = null;
	        this._finalizers = null;
	    }
	    Subscription.prototype.unsubscribe = function () {
	        var e_1, _a, e_2, _b;
	        var errors;
	        if (!this.closed) {
	            this.closed = true;
	            var _parentage = this._parentage;
	            if (_parentage) {
	                this._parentage = null;
	                if (Array.isArray(_parentage)) {
	                    try {
	                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
	                            var parent_1 = _parentage_1_1.value;
	                            parent_1.remove(this);
	                        }
	                    }
	                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                    finally {
	                        try {
	                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
	                        }
	                        finally { if (e_1) throw e_1.error; }
	                    }
	                }
	                else {
	                    _parentage.remove(this);
	                }
	            }
	            var initialFinalizer = this.initialTeardown;
	            if (isFunction_1.isFunction(initialFinalizer)) {
	                try {
	                    initialFinalizer();
	                }
	                catch (e) {
	                    errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? e.errors : [e];
	                }
	            }
	            var _finalizers = this._finalizers;
	            if (_finalizers) {
	                this._finalizers = null;
	                try {
	                    for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
	                        var finalizer = _finalizers_1_1.value;
	                        try {
	                            execFinalizer(finalizer);
	                        }
	                        catch (err) {
	                            errors = errors !== null && errors !== void 0 ? errors : [];
	                            if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
	                            }
	                            else {
	                                errors.push(err);
	                            }
	                        }
	                    }
	                }
	                catch (e_2_1) { e_2 = { error: e_2_1 }; }
	                finally {
	                    try {
	                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
	                    }
	                    finally { if (e_2) throw e_2.error; }
	                }
	            }
	            if (errors) {
	                throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	            }
	        }
	    };
	    Subscription.prototype.add = function (teardown) {
	        var _a;
	        if (teardown && teardown !== this) {
	            if (this.closed) {
	                execFinalizer(teardown);
	            }
	            else {
	                if (teardown instanceof Subscription) {
	                    if (teardown.closed || teardown._hasParent(this)) {
	                        return;
	                    }
	                    teardown._addParent(this);
	                }
	                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
	            }
	        }
	    };
	    Subscription.prototype._hasParent = function (parent) {
	        var _parentage = this._parentage;
	        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
	    };
	    Subscription.prototype._addParent = function (parent) {
	        var _parentage = this._parentage;
	        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
	    };
	    Subscription.prototype._removeParent = function (parent) {
	        var _parentage = this._parentage;
	        if (_parentage === parent) {
	            this._parentage = null;
	        }
	        else if (Array.isArray(_parentage)) {
	            arrRemove_1.arrRemove(_parentage, parent);
	        }
	    };
	    Subscription.prototype.remove = function (teardown) {
	        var _finalizers = this._finalizers;
	        _finalizers && arrRemove_1.arrRemove(_finalizers, teardown);
	        if (teardown instanceof Subscription) {
	            teardown._removeParent(this);
	        }
	    };
	    Subscription.EMPTY = (function () {
	        var empty = new Subscription();
	        empty.closed = true;
	        return empty;
	    })();
	    return Subscription;
	}());
	Subscription.Subscription = Subscription$1;
	Subscription.EMPTY_SUBSCRIPTION = Subscription$1.EMPTY;
	function isSubscription(value) {
	    return (value instanceof Subscription$1 ||
	        (value && 'closed' in value && isFunction_1.isFunction(value.remove) && isFunction_1.isFunction(value.add) && isFunction_1.isFunction(value.unsubscribe)));
	}
	Subscription.isSubscription = isSubscription;
	function execFinalizer(finalizer) {
	    if (isFunction_1.isFunction(finalizer)) {
	        finalizer();
	    }
	    else {
	        finalizer.unsubscribe();
	    }
	}
	
	return Subscription;
}

var config = {};

var hasRequiredConfig;

function requireConfig () {
	if (hasRequiredConfig) return config;
	hasRequiredConfig = 1;
	Object.defineProperty(config, "__esModule", { value: true });
	config.config = void 0;
	config.config = {
	    onUnhandledError: null,
	    onStoppedNotification: null,
	    Promise: undefined,
	    useDeprecatedSynchronousErrorHandling: false,
	    useDeprecatedNextContext: false,
	};
	
	return config;
}

var reportUnhandledError = {};

var timeoutProvider = {};

var hasRequiredTimeoutProvider;

function requireTimeoutProvider () {
	if (hasRequiredTimeoutProvider) return timeoutProvider;
	hasRequiredTimeoutProvider = 1;
	(function (exports) {
		var __read = (timeoutProvider && timeoutProvider.__read) || function (o, n) {
		    var m = typeof Symbol === "function" && o[Symbol.iterator];
		    if (!m) return o;
		    var i = m.call(o), r, ar = [], e;
		    try {
		        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
		    }
		    catch (error) { e = { error: error }; }
		    finally {
		        try {
		            if (r && !r.done && (m = i["return"])) m.call(i);
		        }
		        finally { if (e) throw e.error; }
		    }
		    return ar;
		};
		var __spreadArray = (timeoutProvider && timeoutProvider.__spreadArray) || function (to, from) {
		    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
		        to[j] = from[i];
		    return to;
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.timeoutProvider = void 0;
		exports.timeoutProvider = {
		    setTimeout: function (handler, timeout) {
		        var args = [];
		        for (var _i = 2; _i < arguments.length; _i++) {
		            args[_i - 2] = arguments[_i];
		        }
		        var delegate = exports.timeoutProvider.delegate;
		        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
		            return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
		        }
		        return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
		    },
		    clearTimeout: function (handle) {
		        var delegate = exports.timeoutProvider.delegate;
		        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
		    },
		    delegate: undefined,
		};
		
	} (timeoutProvider));
	return timeoutProvider;
}

var hasRequiredReportUnhandledError;

function requireReportUnhandledError () {
	if (hasRequiredReportUnhandledError) return reportUnhandledError;
	hasRequiredReportUnhandledError = 1;
	Object.defineProperty(reportUnhandledError, "__esModule", { value: true });
	reportUnhandledError.reportUnhandledError = void 0;
	var config_1 = /*@__PURE__*/ requireConfig();
	var timeoutProvider_1 = /*@__PURE__*/ requireTimeoutProvider();
	function reportUnhandledError$1(err) {
	    timeoutProvider_1.timeoutProvider.setTimeout(function () {
	        var onUnhandledError = config_1.config.onUnhandledError;
	        if (onUnhandledError) {
	            onUnhandledError(err);
	        }
	        else {
	            throw err;
	        }
	    });
	}
	reportUnhandledError.reportUnhandledError = reportUnhandledError$1;
	
	return reportUnhandledError;
}

var noop = {};

var hasRequiredNoop;

function requireNoop () {
	if (hasRequiredNoop) return noop;
	hasRequiredNoop = 1;
	Object.defineProperty(noop, "__esModule", { value: true });
	noop.noop = void 0;
	function noop$1() { }
	noop.noop = noop$1;
	
	return noop;
}

var NotificationFactories = {};

var hasRequiredNotificationFactories;

function requireNotificationFactories () {
	if (hasRequiredNotificationFactories) return NotificationFactories;
	hasRequiredNotificationFactories = 1;
	Object.defineProperty(NotificationFactories, "__esModule", { value: true });
	NotificationFactories.createNotification = NotificationFactories.nextNotification = NotificationFactories.errorNotification = NotificationFactories.COMPLETE_NOTIFICATION = void 0;
	NotificationFactories.COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
	function errorNotification(error) {
	    return createNotification('E', undefined, error);
	}
	NotificationFactories.errorNotification = errorNotification;
	function nextNotification(value) {
	    return createNotification('N', value, undefined);
	}
	NotificationFactories.nextNotification = nextNotification;
	function createNotification(kind, value, error) {
	    return {
	        kind: kind,
	        value: value,
	        error: error,
	    };
	}
	NotificationFactories.createNotification = createNotification;
	
	return NotificationFactories;
}

var errorContext = {};

var hasRequiredErrorContext;

function requireErrorContext () {
	if (hasRequiredErrorContext) return errorContext;
	hasRequiredErrorContext = 1;
	Object.defineProperty(errorContext, "__esModule", { value: true });
	errorContext.captureError = errorContext.errorContext = void 0;
	var config_1 = /*@__PURE__*/ requireConfig();
	var context = null;
	function errorContext$1(cb) {
	    if (config_1.config.useDeprecatedSynchronousErrorHandling) {
	        var isRoot = !context;
	        if (isRoot) {
	            context = { errorThrown: false, error: null };
	        }
	        cb();
	        if (isRoot) {
	            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
	            context = null;
	            if (errorThrown) {
	                throw error;
	            }
	        }
	    }
	    else {
	        cb();
	    }
	}
	errorContext.errorContext = errorContext$1;
	function captureError(err) {
	    if (config_1.config.useDeprecatedSynchronousErrorHandling && context) {
	        context.errorThrown = true;
	        context.error = err;
	    }
	}
	errorContext.captureError = captureError;
	
	return errorContext;
}

var hasRequiredSubscriber;

function requireSubscriber () {
	if (hasRequiredSubscriber) return Subscriber;
	hasRequiredSubscriber = 1;
	(function (exports) {
		var __extends = (Subscriber && Subscriber.__extends) || (function () {
		    var extendStatics = function (d, b) {
		        extendStatics = Object.setPrototypeOf ||
		            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
		        return extendStatics(d, b);
		    };
		    return function (d, b) {
		        if (typeof b !== "function" && b !== null)
		            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.EMPTY_OBSERVER = exports.SafeSubscriber = exports.Subscriber = void 0;
		var isFunction_1 = /*@__PURE__*/ requireIsFunction();
		var Subscription_1 = /*@__PURE__*/ requireSubscription();
		var config_1 = /*@__PURE__*/ requireConfig();
		var reportUnhandledError_1 = /*@__PURE__*/ requireReportUnhandledError();
		var noop_1 = /*@__PURE__*/ requireNoop();
		var NotificationFactories_1 = /*@__PURE__*/ requireNotificationFactories();
		var timeoutProvider_1 = /*@__PURE__*/ requireTimeoutProvider();
		var errorContext_1 = /*@__PURE__*/ requireErrorContext();
		var Subscriber$1 = (function (_super) {
		    __extends(Subscriber, _super);
		    function Subscriber(destination) {
		        var _this = _super.call(this) || this;
		        _this.isStopped = false;
		        if (destination) {
		            _this.destination = destination;
		            if (Subscription_1.isSubscription(destination)) {
		                destination.add(_this);
		            }
		        }
		        else {
		            _this.destination = exports.EMPTY_OBSERVER;
		        }
		        return _this;
		    }
		    Subscriber.create = function (next, error, complete) {
		        return new SafeSubscriber(next, error, complete);
		    };
		    Subscriber.prototype.next = function (value) {
		        if (this.isStopped) {
		            handleStoppedNotification(NotificationFactories_1.nextNotification(value), this);
		        }
		        else {
		            this._next(value);
		        }
		    };
		    Subscriber.prototype.error = function (err) {
		        if (this.isStopped) {
		            handleStoppedNotification(NotificationFactories_1.errorNotification(err), this);
		        }
		        else {
		            this.isStopped = true;
		            this._error(err);
		        }
		    };
		    Subscriber.prototype.complete = function () {
		        if (this.isStopped) {
		            handleStoppedNotification(NotificationFactories_1.COMPLETE_NOTIFICATION, this);
		        }
		        else {
		            this.isStopped = true;
		            this._complete();
		        }
		    };
		    Subscriber.prototype.unsubscribe = function () {
		        if (!this.closed) {
		            this.isStopped = true;
		            _super.prototype.unsubscribe.call(this);
		            this.destination = null;
		        }
		    };
		    Subscriber.prototype._next = function (value) {
		        this.destination.next(value);
		    };
		    Subscriber.prototype._error = function (err) {
		        try {
		            this.destination.error(err);
		        }
		        finally {
		            this.unsubscribe();
		        }
		    };
		    Subscriber.prototype._complete = function () {
		        try {
		            this.destination.complete();
		        }
		        finally {
		            this.unsubscribe();
		        }
		    };
		    return Subscriber;
		}(Subscription_1.Subscription));
		exports.Subscriber = Subscriber$1;
		var _bind = Function.prototype.bind;
		function bind(fn, thisArg) {
		    return _bind.call(fn, thisArg);
		}
		var ConsumerObserver = (function () {
		    function ConsumerObserver(partialObserver) {
		        this.partialObserver = partialObserver;
		    }
		    ConsumerObserver.prototype.next = function (value) {
		        var partialObserver = this.partialObserver;
		        if (partialObserver.next) {
		            try {
		                partialObserver.next(value);
		            }
		            catch (error) {
		                handleUnhandledError(error);
		            }
		        }
		    };
		    ConsumerObserver.prototype.error = function (err) {
		        var partialObserver = this.partialObserver;
		        if (partialObserver.error) {
		            try {
		                partialObserver.error(err);
		            }
		            catch (error) {
		                handleUnhandledError(error);
		            }
		        }
		        else {
		            handleUnhandledError(err);
		        }
		    };
		    ConsumerObserver.prototype.complete = function () {
		        var partialObserver = this.partialObserver;
		        if (partialObserver.complete) {
		            try {
		                partialObserver.complete();
		            }
		            catch (error) {
		                handleUnhandledError(error);
		            }
		        }
		    };
		    return ConsumerObserver;
		}());
		var SafeSubscriber = (function (_super) {
		    __extends(SafeSubscriber, _super);
		    function SafeSubscriber(observerOrNext, error, complete) {
		        var _this = _super.call(this) || this;
		        var partialObserver;
		        if (isFunction_1.isFunction(observerOrNext) || !observerOrNext) {
		            partialObserver = {
		                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
		                error: error !== null && error !== void 0 ? error : undefined,
		                complete: complete !== null && complete !== void 0 ? complete : undefined,
		            };
		        }
		        else {
		            var context_1;
		            if (_this && config_1.config.useDeprecatedNextContext) {
		                context_1 = Object.create(observerOrNext);
		                context_1.unsubscribe = function () { return _this.unsubscribe(); };
		                partialObserver = {
		                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
		                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
		                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
		                };
		            }
		            else {
		                partialObserver = observerOrNext;
		            }
		        }
		        _this.destination = new ConsumerObserver(partialObserver);
		        return _this;
		    }
		    return SafeSubscriber;
		}(Subscriber$1));
		exports.SafeSubscriber = SafeSubscriber;
		function handleUnhandledError(error) {
		    if (config_1.config.useDeprecatedSynchronousErrorHandling) {
		        errorContext_1.captureError(error);
		    }
		    else {
		        reportUnhandledError_1.reportUnhandledError(error);
		    }
		}
		function defaultErrorHandler(err) {
		    throw err;
		}
		function handleStoppedNotification(notification, subscriber) {
		    var onStoppedNotification = config_1.config.onStoppedNotification;
		    onStoppedNotification && timeoutProvider_1.timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
		}
		exports.EMPTY_OBSERVER = {
		    closed: true,
		    next: noop_1.noop,
		    error: defaultErrorHandler,
		    complete: noop_1.noop,
		};
		
	} (Subscriber));
	return Subscriber;
}

var observable = {};

var hasRequiredObservable$1;

function requireObservable$1 () {
	if (hasRequiredObservable$1) return observable;
	hasRequiredObservable$1 = 1;
	Object.defineProperty(observable, "__esModule", { value: true });
	observable.observable = void 0;
	observable.observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();
	
	return observable;
}

var pipe = {};

var identity = {};

var hasRequiredIdentity;

function requireIdentity () {
	if (hasRequiredIdentity) return identity;
	hasRequiredIdentity = 1;
	Object.defineProperty(identity, "__esModule", { value: true });
	identity.identity = void 0;
	function identity$1(x) {
	    return x;
	}
	identity.identity = identity$1;
	
	return identity;
}

var hasRequiredPipe;

function requirePipe () {
	if (hasRequiredPipe) return pipe;
	hasRequiredPipe = 1;
	Object.defineProperty(pipe, "__esModule", { value: true });
	pipe.pipeFromArray = pipe.pipe = void 0;
	var identity_1 = /*@__PURE__*/ requireIdentity();
	function pipe$1() {
	    var fns = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        fns[_i] = arguments[_i];
	    }
	    return pipeFromArray(fns);
	}
	pipe.pipe = pipe$1;
	function pipeFromArray(fns) {
	    if (fns.length === 0) {
	        return identity_1.identity;
	    }
	    if (fns.length === 1) {
	        return fns[0];
	    }
	    return function piped(input) {
	        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
	    };
	}
	pipe.pipeFromArray = pipeFromArray;
	
	return pipe;
}

var hasRequiredObservable;

function requireObservable () {
	if (hasRequiredObservable) return Observable;
	hasRequiredObservable = 1;
	Object.defineProperty(Observable, "__esModule", { value: true });
	Observable.Observable = void 0;
	var Subscriber_1 = /*@__PURE__*/ requireSubscriber();
	var Subscription_1 = /*@__PURE__*/ requireSubscription();
	var observable_1 = /*@__PURE__*/ requireObservable$1();
	var pipe_1 = /*@__PURE__*/ requirePipe();
	var config_1 = /*@__PURE__*/ requireConfig();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	var errorContext_1 = /*@__PURE__*/ requireErrorContext();
	var Observable$1 = (function () {
	    function Observable(subscribe) {
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var _this = this;
	        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new Subscriber_1.SafeSubscriber(observerOrNext, error, complete);
	        errorContext_1.errorContext(function () {
	            var _a = _this, operator = _a.operator, source = _a.source;
	            subscriber.add(operator
	                ?
	                    operator.call(subscriber, source)
	                : source
	                    ?
	                        _this._subscribe(subscriber)
	                    :
	                        _this._trySubscribe(subscriber));
	        });
	        return subscriber;
	    };
	    Observable.prototype._trySubscribe = function (sink) {
	        try {
	            return this._subscribe(sink);
	        }
	        catch (err) {
	            sink.error(err);
	        }
	    };
	    Observable.prototype.forEach = function (next, promiseCtor) {
	        var _this = this;
	        promiseCtor = getPromiseCtor(promiseCtor);
	        return new promiseCtor(function (resolve, reject) {
	            var subscriber = new Subscriber_1.SafeSubscriber({
	                next: function (value) {
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscriber.unsubscribe();
	                    }
	                },
	                error: reject,
	                complete: resolve,
	            });
	            _this.subscribe(subscriber);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        var _a;
	        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
	    };
	    Observable.prototype[observable_1.observable] = function () {
	        return this;
	    };
	    Observable.prototype.pipe = function () {
	        var operations = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            operations[_i] = arguments[_i];
	        }
	        return pipe_1.pipeFromArray(operations)(this);
	    };
	    Observable.prototype.toPromise = function (promiseCtor) {
	        var _this = this;
	        promiseCtor = getPromiseCtor(promiseCtor);
	        return new promiseCtor(function (resolve, reject) {
	            var value;
	            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
	        });
	    };
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	Observable.Observable = Observable$1;
	function getPromiseCtor(promiseCtor) {
	    var _a;
	    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config_1.config.Promise) !== null && _a !== void 0 ? _a : Promise;
	}
	function isObserver(value) {
	    return value && isFunction_1.isFunction(value.next) && isFunction_1.isFunction(value.error) && isFunction_1.isFunction(value.complete);
	}
	function isSubscriber(value) {
	    return (value && value instanceof Subscriber_1.Subscriber) || (isObserver(value) && Subscription_1.isSubscription(value));
	}
	
	return Observable;
}

var ConnectableObservable = {};

var refCount = {};

var lift = {};

var hasRequiredLift;

function requireLift () {
	if (hasRequiredLift) return lift;
	hasRequiredLift = 1;
	Object.defineProperty(lift, "__esModule", { value: true });
	lift.operate = lift.hasLift = void 0;
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function hasLift(source) {
	    return isFunction_1.isFunction(source === null || source === void 0 ? void 0 : source.lift);
	}
	lift.hasLift = hasLift;
	function operate(init) {
	    return function (source) {
	        if (hasLift(source)) {
	            return source.lift(function (liftedSource) {
	                try {
	                    return init(liftedSource, this);
	                }
	                catch (err) {
	                    this.error(err);
	                }
	            });
	        }
	        throw new TypeError('Unable to lift unknown Observable type');
	    };
	}
	lift.operate = operate;
	
	return lift;
}

var OperatorSubscriber = {};

var hasRequiredOperatorSubscriber;

function requireOperatorSubscriber () {
	if (hasRequiredOperatorSubscriber) return OperatorSubscriber;
	hasRequiredOperatorSubscriber = 1;
	var __extends = (OperatorSubscriber && OperatorSubscriber.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(OperatorSubscriber, "__esModule", { value: true });
	OperatorSubscriber.OperatorSubscriber = OperatorSubscriber.createOperatorSubscriber = void 0;
	var Subscriber_1 = /*@__PURE__*/ requireSubscriber();
	function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
	    return new OperatorSubscriber$1(destination, onNext, onComplete, onError, onFinalize);
	}
	OperatorSubscriber.createOperatorSubscriber = createOperatorSubscriber;
	var OperatorSubscriber$1 = (function (_super) {
	    __extends(OperatorSubscriber, _super);
	    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
	        var _this = _super.call(this, destination) || this;
	        _this.onFinalize = onFinalize;
	        _this.shouldUnsubscribe = shouldUnsubscribe;
	        _this._next = onNext
	            ? function (value) {
	                try {
	                    onNext(value);
	                }
	                catch (err) {
	                    destination.error(err);
	                }
	            }
	            : _super.prototype._next;
	        _this._error = onError
	            ? function (err) {
	                try {
	                    onError(err);
	                }
	                catch (err) {
	                    destination.error(err);
	                }
	                finally {
	                    this.unsubscribe();
	                }
	            }
	            : _super.prototype._error;
	        _this._complete = onComplete
	            ? function () {
	                try {
	                    onComplete();
	                }
	                catch (err) {
	                    destination.error(err);
	                }
	                finally {
	                    this.unsubscribe();
	                }
	            }
	            : _super.prototype._complete;
	        return _this;
	    }
	    OperatorSubscriber.prototype.unsubscribe = function () {
	        var _a;
	        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
	            var closed_1 = this.closed;
	            _super.prototype.unsubscribe.call(this);
	            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
	        }
	    };
	    return OperatorSubscriber;
	}(Subscriber_1.Subscriber));
	OperatorSubscriber.OperatorSubscriber = OperatorSubscriber$1;
	
	return OperatorSubscriber;
}

var hasRequiredRefCount;

function requireRefCount () {
	if (hasRequiredRefCount) return refCount;
	hasRequiredRefCount = 1;
	Object.defineProperty(refCount, "__esModule", { value: true });
	refCount.refCount = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function refCount$1() {
	    return lift_1.operate(function (source, subscriber) {
	        var connection = null;
	        source._refCount++;
	        var refCounter = OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, undefined, undefined, function () {
	            if (!source || source._refCount <= 0 || 0 < --source._refCount) {
	                connection = null;
	                return;
	            }
	            var sharedConnection = source._connection;
	            var conn = connection;
	            connection = null;
	            if (sharedConnection && (!conn || sharedConnection === conn)) {
	                sharedConnection.unsubscribe();
	            }
	            subscriber.unsubscribe();
	        });
	        source.subscribe(refCounter);
	        if (!refCounter.closed) {
	            connection = source.connect();
	        }
	    });
	}
	refCount.refCount = refCount$1;
	
	return refCount;
}

var hasRequiredConnectableObservable;

function requireConnectableObservable () {
	if (hasRequiredConnectableObservable) return ConnectableObservable;
	hasRequiredConnectableObservable = 1;
	var __extends = (ConnectableObservable && ConnectableObservable.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(ConnectableObservable, "__esModule", { value: true });
	ConnectableObservable.ConnectableObservable = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var Subscription_1 = /*@__PURE__*/ requireSubscription();
	var refCount_1 = /*@__PURE__*/ requireRefCount();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var lift_1 = /*@__PURE__*/ requireLift();
	var ConnectableObservable$1 = (function (_super) {
	    __extends(ConnectableObservable, _super);
	    function ConnectableObservable(source, subjectFactory) {
	        var _this = _super.call(this) || this;
	        _this.source = source;
	        _this.subjectFactory = subjectFactory;
	        _this._subject = null;
	        _this._refCount = 0;
	        _this._connection = null;
	        if (lift_1.hasLift(source)) {
	            _this.lift = source.lift;
	        }
	        return _this;
	    }
	    ConnectableObservable.prototype._subscribe = function (subscriber) {
	        return this.getSubject().subscribe(subscriber);
	    };
	    ConnectableObservable.prototype.getSubject = function () {
	        var subject = this._subject;
	        if (!subject || subject.isStopped) {
	            this._subject = this.subjectFactory();
	        }
	        return this._subject;
	    };
	    ConnectableObservable.prototype._teardown = function () {
	        this._refCount = 0;
	        var _connection = this._connection;
	        this._subject = this._connection = null;
	        _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
	    };
	    ConnectableObservable.prototype.connect = function () {
	        var _this = this;
	        var connection = this._connection;
	        if (!connection) {
	            connection = this._connection = new Subscription_1.Subscription();
	            var subject_1 = this.getSubject();
	            connection.add(this.source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subject_1, undefined, function () {
	                _this._teardown();
	                subject_1.complete();
	            }, function (err) {
	                _this._teardown();
	                subject_1.error(err);
	            }, function () { return _this._teardown(); })));
	            if (connection.closed) {
	                this._connection = null;
	                connection = Subscription_1.Subscription.EMPTY;
	            }
	        }
	        return connection;
	    };
	    ConnectableObservable.prototype.refCount = function () {
	        return refCount_1.refCount()(this);
	    };
	    return ConnectableObservable;
	}(Observable_1.Observable));
	ConnectableObservable.ConnectableObservable = ConnectableObservable$1;
	
	return ConnectableObservable;
}

var animationFrames = {};

var performanceTimestampProvider = {};

var hasRequiredPerformanceTimestampProvider;

function requirePerformanceTimestampProvider () {
	if (hasRequiredPerformanceTimestampProvider) return performanceTimestampProvider;
	hasRequiredPerformanceTimestampProvider = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.performanceTimestampProvider = void 0;
		exports.performanceTimestampProvider = {
		    now: function () {
		        return (exports.performanceTimestampProvider.delegate || performance).now();
		    },
		    delegate: undefined,
		};
		
	} (performanceTimestampProvider));
	return performanceTimestampProvider;
}

var animationFrameProvider = {};

var hasRequiredAnimationFrameProvider;

function requireAnimationFrameProvider () {
	if (hasRequiredAnimationFrameProvider) return animationFrameProvider;
	hasRequiredAnimationFrameProvider = 1;
	(function (exports) {
		var __read = (animationFrameProvider && animationFrameProvider.__read) || function (o, n) {
		    var m = typeof Symbol === "function" && o[Symbol.iterator];
		    if (!m) return o;
		    var i = m.call(o), r, ar = [], e;
		    try {
		        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
		    }
		    catch (error) { e = { error: error }; }
		    finally {
		        try {
		            if (r && !r.done && (m = i["return"])) m.call(i);
		        }
		        finally { if (e) throw e.error; }
		    }
		    return ar;
		};
		var __spreadArray = (animationFrameProvider && animationFrameProvider.__spreadArray) || function (to, from) {
		    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
		        to[j] = from[i];
		    return to;
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.animationFrameProvider = void 0;
		var Subscription_1 = /*@__PURE__*/ requireSubscription();
		exports.animationFrameProvider = {
		    schedule: function (callback) {
		        var request = requestAnimationFrame;
		        var cancel = cancelAnimationFrame;
		        var delegate = exports.animationFrameProvider.delegate;
		        if (delegate) {
		            request = delegate.requestAnimationFrame;
		            cancel = delegate.cancelAnimationFrame;
		        }
		        var handle = request(function (timestamp) {
		            cancel = undefined;
		            callback(timestamp);
		        });
		        return new Subscription_1.Subscription(function () { return cancel === null || cancel === void 0 ? void 0 : cancel(handle); });
		    },
		    requestAnimationFrame: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        var delegate = exports.animationFrameProvider.delegate;
		        return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
		    },
		    cancelAnimationFrame: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        var delegate = exports.animationFrameProvider.delegate;
		        return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
		    },
		    delegate: undefined,
		};
		
	} (animationFrameProvider));
	return animationFrameProvider;
}

var hasRequiredAnimationFrames;

function requireAnimationFrames () {
	if (hasRequiredAnimationFrames) return animationFrames;
	hasRequiredAnimationFrames = 1;
	Object.defineProperty(animationFrames, "__esModule", { value: true });
	animationFrames.animationFrames = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var performanceTimestampProvider_1 = /*@__PURE__*/ requirePerformanceTimestampProvider();
	var animationFrameProvider_1 = /*@__PURE__*/ requireAnimationFrameProvider();
	function animationFrames$1(timestampProvider) {
	    return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
	}
	animationFrames.animationFrames = animationFrames$1;
	function animationFramesFactory(timestampProvider) {
	    return new Observable_1.Observable(function (subscriber) {
	        var provider = timestampProvider || performanceTimestampProvider_1.performanceTimestampProvider;
	        var start = provider.now();
	        var id = 0;
	        var run = function () {
	            if (!subscriber.closed) {
	                id = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function (timestamp) {
	                    id = 0;
	                    var now = provider.now();
	                    subscriber.next({
	                        timestamp: timestampProvider ? now : timestamp,
	                        elapsed: now - start,
	                    });
	                    run();
	                });
	            }
	        };
	        run();
	        return function () {
	            if (id) {
	                animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
	            }
	        };
	    });
	}
	var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();
	
	return animationFrames;
}

var Subject = {};

var ObjectUnsubscribedError = {};

var hasRequiredObjectUnsubscribedError;

function requireObjectUnsubscribedError () {
	if (hasRequiredObjectUnsubscribedError) return ObjectUnsubscribedError;
	hasRequiredObjectUnsubscribedError = 1;
	Object.defineProperty(ObjectUnsubscribedError, "__esModule", { value: true });
	ObjectUnsubscribedError.ObjectUnsubscribedError = void 0;
	var createErrorClass_1 = /*@__PURE__*/ requireCreateErrorClass();
	ObjectUnsubscribedError.ObjectUnsubscribedError = createErrorClass_1.createErrorClass(function (_super) {
	    return function ObjectUnsubscribedErrorImpl() {
	        _super(this);
	        this.name = 'ObjectUnsubscribedError';
	        this.message = 'object unsubscribed';
	    };
	});
	
	return ObjectUnsubscribedError;
}

var hasRequiredSubject;

function requireSubject () {
	if (hasRequiredSubject) return Subject;
	hasRequiredSubject = 1;
	var __extends = (Subject && Subject.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __values = (Subject && Subject.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(Subject, "__esModule", { value: true });
	Subject.AnonymousSubject = Subject.Subject = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var Subscription_1 = /*@__PURE__*/ requireSubscription();
	var ObjectUnsubscribedError_1 = /*@__PURE__*/ requireObjectUnsubscribedError();
	var arrRemove_1 = /*@__PURE__*/ requireArrRemove();
	var errorContext_1 = /*@__PURE__*/ requireErrorContext();
	var Subject$1 = (function (_super) {
	    __extends(Subject, _super);
	    function Subject() {
	        var _this = _super.call(this) || this;
	        _this.closed = false;
	        _this.currentObservers = null;
	        _this.observers = [];
	        _this.isStopped = false;
	        _this.hasError = false;
	        _this.thrownError = null;
	        return _this;
	    }
	    Subject.prototype.lift = function (operator) {
	        var subject = new AnonymousSubject(this, this);
	        subject.operator = operator;
	        return subject;
	    };
	    Subject.prototype._throwIfClosed = function () {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	    };
	    Subject.prototype.next = function (value) {
	        var _this = this;
	        errorContext_1.errorContext(function () {
	            var e_1, _a;
	            _this._throwIfClosed();
	            if (!_this.isStopped) {
	                if (!_this.currentObservers) {
	                    _this.currentObservers = Array.from(_this.observers);
	                }
	                try {
	                    for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
	                        var observer = _c.value;
	                        observer.next(value);
	                    }
	                }
	                catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                finally {
	                    try {
	                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                    }
	                    finally { if (e_1) throw e_1.error; }
	                }
	            }
	        });
	    };
	    Subject.prototype.error = function (err) {
	        var _this = this;
	        errorContext_1.errorContext(function () {
	            _this._throwIfClosed();
	            if (!_this.isStopped) {
	                _this.hasError = _this.isStopped = true;
	                _this.thrownError = err;
	                var observers = _this.observers;
	                while (observers.length) {
	                    observers.shift().error(err);
	                }
	            }
	        });
	    };
	    Subject.prototype.complete = function () {
	        var _this = this;
	        errorContext_1.errorContext(function () {
	            _this._throwIfClosed();
	            if (!_this.isStopped) {
	                _this.isStopped = true;
	                var observers = _this.observers;
	                while (observers.length) {
	                    observers.shift().complete();
	                }
	            }
	        });
	    };
	    Subject.prototype.unsubscribe = function () {
	        this.isStopped = this.closed = true;
	        this.observers = this.currentObservers = null;
	    };
	    Object.defineProperty(Subject.prototype, "observed", {
	        get: function () {
	            var _a;
	            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Subject.prototype._trySubscribe = function (subscriber) {
	        this._throwIfClosed();
	        return _super.prototype._trySubscribe.call(this, subscriber);
	    };
	    Subject.prototype._subscribe = function (subscriber) {
	        this._throwIfClosed();
	        this._checkFinalizedStatuses(subscriber);
	        return this._innerSubscribe(subscriber);
	    };
	    Subject.prototype._innerSubscribe = function (subscriber) {
	        var _this = this;
	        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
	        if (hasError || isStopped) {
	            return Subscription_1.EMPTY_SUBSCRIPTION;
	        }
	        this.currentObservers = null;
	        observers.push(subscriber);
	        return new Subscription_1.Subscription(function () {
	            _this.currentObservers = null;
	            arrRemove_1.arrRemove(observers, subscriber);
	        });
	    };
	    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
	        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
	        if (hasError) {
	            subscriber.error(thrownError);
	        }
	        else if (isStopped) {
	            subscriber.complete();
	        }
	    };
	    Subject.prototype.asObservable = function () {
	        var observable = new Observable_1.Observable();
	        observable.source = this;
	        return observable;
	    };
	    Subject.create = function (destination, source) {
	        return new AnonymousSubject(destination, source);
	    };
	    return Subject;
	}(Observable_1.Observable));
	Subject.Subject = Subject$1;
	var AnonymousSubject = (function (_super) {
	    __extends(AnonymousSubject, _super);
	    function AnonymousSubject(destination, source) {
	        var _this = _super.call(this) || this;
	        _this.destination = destination;
	        _this.source = source;
	        return _this;
	    }
	    AnonymousSubject.prototype.next = function (value) {
	        var _a, _b;
	        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
	    };
	    AnonymousSubject.prototype.error = function (err) {
	        var _a, _b;
	        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
	    };
	    AnonymousSubject.prototype.complete = function () {
	        var _a, _b;
	        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
	    };
	    AnonymousSubject.prototype._subscribe = function (subscriber) {
	        var _a, _b;
	        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : Subscription_1.EMPTY_SUBSCRIPTION;
	    };
	    return AnonymousSubject;
	}(Subject$1));
	Subject.AnonymousSubject = AnonymousSubject;
	
	return Subject;
}

var BehaviorSubject = {};

var hasRequiredBehaviorSubject;

function requireBehaviorSubject () {
	if (hasRequiredBehaviorSubject) return BehaviorSubject;
	hasRequiredBehaviorSubject = 1;
	var __extends = (BehaviorSubject && BehaviorSubject.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(BehaviorSubject, "__esModule", { value: true });
	BehaviorSubject.BehaviorSubject = void 0;
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var BehaviorSubject$1 = (function (_super) {
	    __extends(BehaviorSubject, _super);
	    function BehaviorSubject(_value) {
	        var _this = _super.call(this) || this;
	        _this._value = _value;
	        return _this;
	    }
	    Object.defineProperty(BehaviorSubject.prototype, "value", {
	        get: function () {
	            return this.getValue();
	        },
	        enumerable: false,
	        configurable: true
	    });
	    BehaviorSubject.prototype._subscribe = function (subscriber) {
	        var subscription = _super.prototype._subscribe.call(this, subscriber);
	        !subscription.closed && subscriber.next(this._value);
	        return subscription;
	    };
	    BehaviorSubject.prototype.getValue = function () {
	        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
	        if (hasError) {
	            throw thrownError;
	        }
	        this._throwIfClosed();
	        return _value;
	    };
	    BehaviorSubject.prototype.next = function (value) {
	        _super.prototype.next.call(this, (this._value = value));
	    };
	    return BehaviorSubject;
	}(Subject_1.Subject));
	BehaviorSubject.BehaviorSubject = BehaviorSubject$1;
	
	return BehaviorSubject;
}

var ReplaySubject = {};

var dateTimestampProvider = {};

var hasRequiredDateTimestampProvider;

function requireDateTimestampProvider () {
	if (hasRequiredDateTimestampProvider) return dateTimestampProvider;
	hasRequiredDateTimestampProvider = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.dateTimestampProvider = void 0;
		exports.dateTimestampProvider = {
		    now: function () {
		        return (exports.dateTimestampProvider.delegate || Date).now();
		    },
		    delegate: undefined,
		};
		
	} (dateTimestampProvider));
	return dateTimestampProvider;
}

var hasRequiredReplaySubject;

function requireReplaySubject () {
	if (hasRequiredReplaySubject) return ReplaySubject;
	hasRequiredReplaySubject = 1;
	var __extends = (ReplaySubject && ReplaySubject.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(ReplaySubject, "__esModule", { value: true });
	ReplaySubject.ReplaySubject = void 0;
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var dateTimestampProvider_1 = /*@__PURE__*/ requireDateTimestampProvider();
	var ReplaySubject$1 = (function (_super) {
	    __extends(ReplaySubject, _super);
	    function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
	        if (_bufferSize === void 0) { _bufferSize = Infinity; }
	        if (_windowTime === void 0) { _windowTime = Infinity; }
	        if (_timestampProvider === void 0) { _timestampProvider = dateTimestampProvider_1.dateTimestampProvider; }
	        var _this = _super.call(this) || this;
	        _this._bufferSize = _bufferSize;
	        _this._windowTime = _windowTime;
	        _this._timestampProvider = _timestampProvider;
	        _this._buffer = [];
	        _this._infiniteTimeWindow = true;
	        _this._infiniteTimeWindow = _windowTime === Infinity;
	        _this._bufferSize = Math.max(1, _bufferSize);
	        _this._windowTime = Math.max(1, _windowTime);
	        return _this;
	    }
	    ReplaySubject.prototype.next = function (value) {
	        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
	        if (!isStopped) {
	            _buffer.push(value);
	            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
	        }
	        this._trimBuffer();
	        _super.prototype.next.call(this, value);
	    };
	    ReplaySubject.prototype._subscribe = function (subscriber) {
	        this._throwIfClosed();
	        this._trimBuffer();
	        var subscription = this._innerSubscribe(subscriber);
	        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
	        var copy = _buffer.slice();
	        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
	            subscriber.next(copy[i]);
	        }
	        this._checkFinalizedStatuses(subscriber);
	        return subscription;
	    };
	    ReplaySubject.prototype._trimBuffer = function () {
	        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
	        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
	        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
	        if (!_infiniteTimeWindow) {
	            var now = _timestampProvider.now();
	            var last = 0;
	            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
	                last = i;
	            }
	            last && _buffer.splice(0, last + 1);
	        }
	    };
	    return ReplaySubject;
	}(Subject_1.Subject));
	ReplaySubject.ReplaySubject = ReplaySubject$1;
	
	return ReplaySubject;
}

var AsyncSubject = {};

var hasRequiredAsyncSubject;

function requireAsyncSubject () {
	if (hasRequiredAsyncSubject) return AsyncSubject;
	hasRequiredAsyncSubject = 1;
	var __extends = (AsyncSubject && AsyncSubject.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AsyncSubject, "__esModule", { value: true });
	AsyncSubject.AsyncSubject = void 0;
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var AsyncSubject$1 = (function (_super) {
	    __extends(AsyncSubject, _super);
	    function AsyncSubject() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this._value = null;
	        _this._hasValue = false;
	        _this._isComplete = false;
	        return _this;
	    }
	    AsyncSubject.prototype._checkFinalizedStatuses = function (subscriber) {
	        var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
	        if (hasError) {
	            subscriber.error(thrownError);
	        }
	        else if (isStopped || _isComplete) {
	            _hasValue && subscriber.next(_value);
	            subscriber.complete();
	        }
	    };
	    AsyncSubject.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._value = value;
	            this._hasValue = true;
	        }
	    };
	    AsyncSubject.prototype.complete = function () {
	        var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
	        if (!_isComplete) {
	            this._isComplete = true;
	            _hasValue && _super.prototype.next.call(this, _value);
	            _super.prototype.complete.call(this);
	        }
	    };
	    return AsyncSubject;
	}(Subject_1.Subject));
	AsyncSubject.AsyncSubject = AsyncSubject$1;
	
	return AsyncSubject;
}

var asap = {};

var AsapAction = {};

var AsyncAction = {};

var Action = {};

var hasRequiredAction;

function requireAction () {
	if (hasRequiredAction) return Action;
	hasRequiredAction = 1;
	var __extends = (Action && Action.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(Action, "__esModule", { value: true });
	Action.Action = void 0;
	var Subscription_1 = /*@__PURE__*/ requireSubscription();
	var Action$1 = (function (_super) {
	    __extends(Action, _super);
	    function Action(scheduler, work) {
	        return _super.call(this) || this;
	    }
	    Action.prototype.schedule = function (state, delay) {
	        return this;
	    };
	    return Action;
	}(Subscription_1.Subscription));
	Action.Action = Action$1;
	
	return Action;
}

var intervalProvider = {};

var hasRequiredIntervalProvider;

function requireIntervalProvider () {
	if (hasRequiredIntervalProvider) return intervalProvider;
	hasRequiredIntervalProvider = 1;
	(function (exports) {
		var __read = (intervalProvider && intervalProvider.__read) || function (o, n) {
		    var m = typeof Symbol === "function" && o[Symbol.iterator];
		    if (!m) return o;
		    var i = m.call(o), r, ar = [], e;
		    try {
		        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
		    }
		    catch (error) { e = { error: error }; }
		    finally {
		        try {
		            if (r && !r.done && (m = i["return"])) m.call(i);
		        }
		        finally { if (e) throw e.error; }
		    }
		    return ar;
		};
		var __spreadArray = (intervalProvider && intervalProvider.__spreadArray) || function (to, from) {
		    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
		        to[j] = from[i];
		    return to;
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.intervalProvider = void 0;
		exports.intervalProvider = {
		    setInterval: function (handler, timeout) {
		        var args = [];
		        for (var _i = 2; _i < arguments.length; _i++) {
		            args[_i - 2] = arguments[_i];
		        }
		        var delegate = exports.intervalProvider.delegate;
		        if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
		            return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
		        }
		        return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
		    },
		    clearInterval: function (handle) {
		        var delegate = exports.intervalProvider.delegate;
		        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
		    },
		    delegate: undefined,
		};
		
	} (intervalProvider));
	return intervalProvider;
}

var hasRequiredAsyncAction;

function requireAsyncAction () {
	if (hasRequiredAsyncAction) return AsyncAction;
	hasRequiredAsyncAction = 1;
	var __extends = (AsyncAction && AsyncAction.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AsyncAction, "__esModule", { value: true });
	AsyncAction.AsyncAction = void 0;
	var Action_1 = /*@__PURE__*/ requireAction();
	var intervalProvider_1 = /*@__PURE__*/ requireIntervalProvider();
	var arrRemove_1 = /*@__PURE__*/ requireArrRemove();
	var AsyncAction$1 = (function (_super) {
	    __extends(AsyncAction, _super);
	    function AsyncAction(scheduler, work) {
	        var _this = _super.call(this, scheduler, work) || this;
	        _this.scheduler = scheduler;
	        _this.work = work;
	        _this.pending = false;
	        return _this;
	    }
	    AsyncAction.prototype.schedule = function (state, delay) {
	        var _a;
	        if (delay === void 0) { delay = 0; }
	        if (this.closed) {
	            return this;
	        }
	        this.state = state;
	        var id = this.id;
	        var scheduler = this.scheduler;
	        if (id != null) {
	            this.id = this.recycleAsyncId(scheduler, id, delay);
	        }
	        this.pending = true;
	        this.delay = delay;
	        this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
	        return this;
	    };
	    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
	        if (delay === void 0) { delay = 0; }
	        return intervalProvider_1.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
	    };
	    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (delay != null && this.delay === delay && this.pending === false) {
	            return id;
	        }
	        if (id != null) {
	            intervalProvider_1.intervalProvider.clearInterval(id);
	        }
	        return undefined;
	    };
	    AsyncAction.prototype.execute = function (state, delay) {
	        if (this.closed) {
	            return new Error('executing a cancelled action');
	        }
	        this.pending = false;
	        var error = this._execute(state, delay);
	        if (error) {
	            return error;
	        }
	        else if (this.pending === false && this.id != null) {
	            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
	        }
	    };
	    AsyncAction.prototype._execute = function (state, _delay) {
	        var errored = false;
	        var errorValue;
	        try {
	            this.work(state);
	        }
	        catch (e) {
	            errored = true;
	            errorValue = e ? e : new Error('Scheduled action threw falsy error');
	        }
	        if (errored) {
	            this.unsubscribe();
	            return errorValue;
	        }
	    };
	    AsyncAction.prototype.unsubscribe = function () {
	        if (!this.closed) {
	            var _a = this, id = _a.id, scheduler = _a.scheduler;
	            var actions = scheduler.actions;
	            this.work = this.state = this.scheduler = null;
	            this.pending = false;
	            arrRemove_1.arrRemove(actions, this);
	            if (id != null) {
	                this.id = this.recycleAsyncId(scheduler, id, null);
	            }
	            this.delay = null;
	            _super.prototype.unsubscribe.call(this);
	        }
	    };
	    return AsyncAction;
	}(Action_1.Action));
	AsyncAction.AsyncAction = AsyncAction$1;
	
	return AsyncAction;
}

var immediateProvider = {};

var Immediate = {};

var hasRequiredImmediate;

function requireImmediate () {
	if (hasRequiredImmediate) return Immediate;
	hasRequiredImmediate = 1;
	Object.defineProperty(Immediate, "__esModule", { value: true });
	Immediate.TestTools = Immediate.Immediate = void 0;
	var nextHandle = 1;
	var resolved;
	var activeHandles = {};
	function findAndClearHandle(handle) {
	    if (handle in activeHandles) {
	        delete activeHandles[handle];
	        return true;
	    }
	    return false;
	}
	Immediate.Immediate = {
	    setImmediate: function (cb) {
	        var handle = nextHandle++;
	        activeHandles[handle] = true;
	        if (!resolved) {
	            resolved = Promise.resolve();
	        }
	        resolved.then(function () { return findAndClearHandle(handle) && cb(); });
	        return handle;
	    },
	    clearImmediate: function (handle) {
	        findAndClearHandle(handle);
	    },
	};
	Immediate.TestTools = {
	    pending: function () {
	        return Object.keys(activeHandles).length;
	    }
	};
	
	return Immediate;
}

var hasRequiredImmediateProvider;

function requireImmediateProvider () {
	if (hasRequiredImmediateProvider) return immediateProvider;
	hasRequiredImmediateProvider = 1;
	(function (exports) {
		var __read = (immediateProvider && immediateProvider.__read) || function (o, n) {
		    var m = typeof Symbol === "function" && o[Symbol.iterator];
		    if (!m) return o;
		    var i = m.call(o), r, ar = [], e;
		    try {
		        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
		    }
		    catch (error) { e = { error: error }; }
		    finally {
		        try {
		            if (r && !r.done && (m = i["return"])) m.call(i);
		        }
		        finally { if (e) throw e.error; }
		    }
		    return ar;
		};
		var __spreadArray = (immediateProvider && immediateProvider.__spreadArray) || function (to, from) {
		    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
		        to[j] = from[i];
		    return to;
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.immediateProvider = void 0;
		var Immediate_1 = /*@__PURE__*/ requireImmediate();
		var setImmediate = Immediate_1.Immediate.setImmediate, clearImmediate = Immediate_1.Immediate.clearImmediate;
		exports.immediateProvider = {
		    setImmediate: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        var delegate = exports.immediateProvider.delegate;
		        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
		    },
		    clearImmediate: function (handle) {
		        var delegate = exports.immediateProvider.delegate;
		        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
		    },
		    delegate: undefined,
		};
		
	} (immediateProvider));
	return immediateProvider;
}

var hasRequiredAsapAction;

function requireAsapAction () {
	if (hasRequiredAsapAction) return AsapAction;
	hasRequiredAsapAction = 1;
	var __extends = (AsapAction && AsapAction.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AsapAction, "__esModule", { value: true });
	AsapAction.AsapAction = void 0;
	var AsyncAction_1 = /*@__PURE__*/ requireAsyncAction();
	var immediateProvider_1 = /*@__PURE__*/ requireImmediateProvider();
	var AsapAction$1 = (function (_super) {
	    __extends(AsapAction, _super);
	    function AsapAction(scheduler, work) {
	        var _this = _super.call(this, scheduler, work) || this;
	        _this.scheduler = scheduler;
	        _this.work = work;
	        return _this;
	    }
	    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (delay !== null && delay > 0) {
	            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	        }
	        scheduler.actions.push(this);
	        return scheduler._scheduled || (scheduler._scheduled = immediateProvider_1.immediateProvider.setImmediate(scheduler.flush.bind(scheduler, undefined)));
	    };
	    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	        var _a;
	        if (delay === void 0) { delay = 0; }
	        if (delay != null ? delay > 0 : this.delay > 0) {
	            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
	        }
	        var actions = scheduler.actions;
	        if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
	            immediateProvider_1.immediateProvider.clearImmediate(id);
	            if (scheduler._scheduled === id) {
	                scheduler._scheduled = undefined;
	            }
	        }
	        return undefined;
	    };
	    return AsapAction;
	}(AsyncAction_1.AsyncAction));
	AsapAction.AsapAction = AsapAction$1;
	
	return AsapAction;
}

var AsapScheduler = {};

var AsyncScheduler = {};

var Scheduler = {};

var hasRequiredScheduler;

function requireScheduler () {
	if (hasRequiredScheduler) return Scheduler;
	hasRequiredScheduler = 1;
	Object.defineProperty(Scheduler, "__esModule", { value: true });
	Scheduler.Scheduler = void 0;
	var dateTimestampProvider_1 = /*@__PURE__*/ requireDateTimestampProvider();
	var Scheduler$1 = (function () {
	    function Scheduler(schedulerActionCtor, now) {
	        if (now === void 0) { now = Scheduler.now; }
	        this.schedulerActionCtor = schedulerActionCtor;
	        this.now = now;
	    }
	    Scheduler.prototype.schedule = function (work, delay, state) {
	        if (delay === void 0) { delay = 0; }
	        return new this.schedulerActionCtor(this, work).schedule(state, delay);
	    };
	    Scheduler.now = dateTimestampProvider_1.dateTimestampProvider.now;
	    return Scheduler;
	}());
	Scheduler.Scheduler = Scheduler$1;
	
	return Scheduler;
}

var hasRequiredAsyncScheduler;

function requireAsyncScheduler () {
	if (hasRequiredAsyncScheduler) return AsyncScheduler;
	hasRequiredAsyncScheduler = 1;
	var __extends = (AsyncScheduler && AsyncScheduler.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AsyncScheduler, "__esModule", { value: true });
	AsyncScheduler.AsyncScheduler = void 0;
	var Scheduler_1 = /*@__PURE__*/ requireScheduler();
	var AsyncScheduler$1 = (function (_super) {
	    __extends(AsyncScheduler, _super);
	    function AsyncScheduler(SchedulerAction, now) {
	        if (now === void 0) { now = Scheduler_1.Scheduler.now; }
	        var _this = _super.call(this, SchedulerAction, now) || this;
	        _this.actions = [];
	        _this._active = false;
	        return _this;
	    }
	    AsyncScheduler.prototype.flush = function (action) {
	        var actions = this.actions;
	        if (this._active) {
	            actions.push(action);
	            return;
	        }
	        var error;
	        this._active = true;
	        do {
	            if ((error = action.execute(action.state, action.delay))) {
	                break;
	            }
	        } while ((action = actions.shift()));
	        this._active = false;
	        if (error) {
	            while ((action = actions.shift())) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    return AsyncScheduler;
	}(Scheduler_1.Scheduler));
	AsyncScheduler.AsyncScheduler = AsyncScheduler$1;
	
	return AsyncScheduler;
}

var hasRequiredAsapScheduler;

function requireAsapScheduler () {
	if (hasRequiredAsapScheduler) return AsapScheduler;
	hasRequiredAsapScheduler = 1;
	var __extends = (AsapScheduler && AsapScheduler.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AsapScheduler, "__esModule", { value: true });
	AsapScheduler.AsapScheduler = void 0;
	var AsyncScheduler_1 = /*@__PURE__*/ requireAsyncScheduler();
	var AsapScheduler$1 = (function (_super) {
	    __extends(AsapScheduler, _super);
	    function AsapScheduler() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    AsapScheduler.prototype.flush = function (action) {
	        this._active = true;
	        var flushId = this._scheduled;
	        this._scheduled = undefined;
	        var actions = this.actions;
	        var error;
	        action = action || actions.shift();
	        do {
	            if ((error = action.execute(action.state, action.delay))) {
	                break;
	            }
	        } while ((action = actions[0]) && action.id === flushId && actions.shift());
	        this._active = false;
	        if (error) {
	            while ((action = actions[0]) && action.id === flushId && actions.shift()) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    return AsapScheduler;
	}(AsyncScheduler_1.AsyncScheduler));
	AsapScheduler.AsapScheduler = AsapScheduler$1;
	
	return AsapScheduler;
}

var hasRequiredAsap;

function requireAsap () {
	if (hasRequiredAsap) return asap;
	hasRequiredAsap = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.asap = exports.asapScheduler = void 0;
		var AsapAction_1 = /*@__PURE__*/ requireAsapAction();
		var AsapScheduler_1 = /*@__PURE__*/ requireAsapScheduler();
		exports.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
		exports.asap = exports.asapScheduler;
		
	} (asap));
	return asap;
}

var async = {};

var hasRequiredAsync;

function requireAsync () {
	if (hasRequiredAsync) return async;
	hasRequiredAsync = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.async = exports.asyncScheduler = void 0;
		var AsyncAction_1 = /*@__PURE__*/ requireAsyncAction();
		var AsyncScheduler_1 = /*@__PURE__*/ requireAsyncScheduler();
		exports.asyncScheduler = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
		exports.async = exports.asyncScheduler;
		
	} (async));
	return async;
}

var queue = {};

var QueueAction = {};

var hasRequiredQueueAction;

function requireQueueAction () {
	if (hasRequiredQueueAction) return QueueAction;
	hasRequiredQueueAction = 1;
	var __extends = (QueueAction && QueueAction.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(QueueAction, "__esModule", { value: true });
	QueueAction.QueueAction = void 0;
	var AsyncAction_1 = /*@__PURE__*/ requireAsyncAction();
	var QueueAction$1 = (function (_super) {
	    __extends(QueueAction, _super);
	    function QueueAction(scheduler, work) {
	        var _this = _super.call(this, scheduler, work) || this;
	        _this.scheduler = scheduler;
	        _this.work = work;
	        return _this;
	    }
	    QueueAction.prototype.schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (delay > 0) {
	            return _super.prototype.schedule.call(this, state, delay);
	        }
	        this.delay = delay;
	        this.state = state;
	        this.scheduler.flush(this);
	        return this;
	    };
	    QueueAction.prototype.execute = function (state, delay) {
	        return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
	    };
	    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
	            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	        }
	        scheduler.flush(this);
	        return 0;
	    };
	    return QueueAction;
	}(AsyncAction_1.AsyncAction));
	QueueAction.QueueAction = QueueAction$1;
	
	return QueueAction;
}

var QueueScheduler = {};

var hasRequiredQueueScheduler;

function requireQueueScheduler () {
	if (hasRequiredQueueScheduler) return QueueScheduler;
	hasRequiredQueueScheduler = 1;
	var __extends = (QueueScheduler && QueueScheduler.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(QueueScheduler, "__esModule", { value: true });
	QueueScheduler.QueueScheduler = void 0;
	var AsyncScheduler_1 = /*@__PURE__*/ requireAsyncScheduler();
	var QueueScheduler$1 = (function (_super) {
	    __extends(QueueScheduler, _super);
	    function QueueScheduler() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return QueueScheduler;
	}(AsyncScheduler_1.AsyncScheduler));
	QueueScheduler.QueueScheduler = QueueScheduler$1;
	
	return QueueScheduler;
}

var hasRequiredQueue;

function requireQueue () {
	if (hasRequiredQueue) return queue;
	hasRequiredQueue = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.queue = exports.queueScheduler = void 0;
		var QueueAction_1 = /*@__PURE__*/ requireQueueAction();
		var QueueScheduler_1 = /*@__PURE__*/ requireQueueScheduler();
		exports.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
		exports.queue = exports.queueScheduler;
		
	} (queue));
	return queue;
}

var animationFrame = {};

var AnimationFrameAction = {};

var hasRequiredAnimationFrameAction;

function requireAnimationFrameAction () {
	if (hasRequiredAnimationFrameAction) return AnimationFrameAction;
	hasRequiredAnimationFrameAction = 1;
	var __extends = (AnimationFrameAction && AnimationFrameAction.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AnimationFrameAction, "__esModule", { value: true });
	AnimationFrameAction.AnimationFrameAction = void 0;
	var AsyncAction_1 = /*@__PURE__*/ requireAsyncAction();
	var animationFrameProvider_1 = /*@__PURE__*/ requireAnimationFrameProvider();
	var AnimationFrameAction$1 = (function (_super) {
	    __extends(AnimationFrameAction, _super);
	    function AnimationFrameAction(scheduler, work) {
	        var _this = _super.call(this, scheduler, work) || this;
	        _this.scheduler = scheduler;
	        _this.work = work;
	        return _this;
	    }
	    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (delay !== null && delay > 0) {
	            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	        }
	        scheduler.actions.push(this);
	        return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function () { return scheduler.flush(undefined); }));
	    };
	    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	        var _a;
	        if (delay === void 0) { delay = 0; }
	        if (delay != null ? delay > 0 : this.delay > 0) {
	            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
	        }
	        var actions = scheduler.actions;
	        if (id != null && id === scheduler._scheduled && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
	            animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
	            scheduler._scheduled = undefined;
	        }
	        return undefined;
	    };
	    return AnimationFrameAction;
	}(AsyncAction_1.AsyncAction));
	AnimationFrameAction.AnimationFrameAction = AnimationFrameAction$1;
	
	return AnimationFrameAction;
}

var AnimationFrameScheduler = {};

var hasRequiredAnimationFrameScheduler;

function requireAnimationFrameScheduler () {
	if (hasRequiredAnimationFrameScheduler) return AnimationFrameScheduler;
	hasRequiredAnimationFrameScheduler = 1;
	var __extends = (AnimationFrameScheduler && AnimationFrameScheduler.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AnimationFrameScheduler, "__esModule", { value: true });
	AnimationFrameScheduler.AnimationFrameScheduler = void 0;
	var AsyncScheduler_1 = /*@__PURE__*/ requireAsyncScheduler();
	var AnimationFrameScheduler$1 = (function (_super) {
	    __extends(AnimationFrameScheduler, _super);
	    function AnimationFrameScheduler() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    AnimationFrameScheduler.prototype.flush = function (action) {
	        this._active = true;
	        var flushId;
	        if (action) {
	            flushId = action.id;
	        }
	        else {
	            flushId = this._scheduled;
	            this._scheduled = undefined;
	        }
	        var actions = this.actions;
	        var error;
	        action = action || actions.shift();
	        do {
	            if ((error = action.execute(action.state, action.delay))) {
	                break;
	            }
	        } while ((action = actions[0]) && action.id === flushId && actions.shift());
	        this._active = false;
	        if (error) {
	            while ((action = actions[0]) && action.id === flushId && actions.shift()) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    return AnimationFrameScheduler;
	}(AsyncScheduler_1.AsyncScheduler));
	AnimationFrameScheduler.AnimationFrameScheduler = AnimationFrameScheduler$1;
	
	return AnimationFrameScheduler;
}

var hasRequiredAnimationFrame;

function requireAnimationFrame () {
	if (hasRequiredAnimationFrame) return animationFrame;
	hasRequiredAnimationFrame = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.animationFrame = exports.animationFrameScheduler = void 0;
		var AnimationFrameAction_1 = /*@__PURE__*/ requireAnimationFrameAction();
		var AnimationFrameScheduler_1 = /*@__PURE__*/ requireAnimationFrameScheduler();
		exports.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
		exports.animationFrame = exports.animationFrameScheduler;
		
	} (animationFrame));
	return animationFrame;
}

var VirtualTimeScheduler = {};

var hasRequiredVirtualTimeScheduler;

function requireVirtualTimeScheduler () {
	if (hasRequiredVirtualTimeScheduler) return VirtualTimeScheduler;
	hasRequiredVirtualTimeScheduler = 1;
	var __extends = (VirtualTimeScheduler && VirtualTimeScheduler.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(VirtualTimeScheduler, "__esModule", { value: true });
	VirtualTimeScheduler.VirtualAction = VirtualTimeScheduler.VirtualTimeScheduler = void 0;
	var AsyncAction_1 = /*@__PURE__*/ requireAsyncAction();
	var Subscription_1 = /*@__PURE__*/ requireSubscription();
	var AsyncScheduler_1 = /*@__PURE__*/ requireAsyncScheduler();
	var VirtualTimeScheduler$1 = (function (_super) {
	    __extends(VirtualTimeScheduler, _super);
	    function VirtualTimeScheduler(schedulerActionCtor, maxFrames) {
	        if (schedulerActionCtor === void 0) { schedulerActionCtor = VirtualAction; }
	        if (maxFrames === void 0) { maxFrames = Infinity; }
	        var _this = _super.call(this, schedulerActionCtor, function () { return _this.frame; }) || this;
	        _this.maxFrames = maxFrames;
	        _this.frame = 0;
	        _this.index = -1;
	        return _this;
	    }
	    VirtualTimeScheduler.prototype.flush = function () {
	        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
	        var error;
	        var action;
	        while ((action = actions[0]) && action.delay <= maxFrames) {
	            actions.shift();
	            this.frame = action.delay;
	            if ((error = action.execute(action.state, action.delay))) {
	                break;
	            }
	        }
	        if (error) {
	            while ((action = actions.shift())) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    VirtualTimeScheduler.frameTimeFactor = 10;
	    return VirtualTimeScheduler;
	}(AsyncScheduler_1.AsyncScheduler));
	VirtualTimeScheduler.VirtualTimeScheduler = VirtualTimeScheduler$1;
	var VirtualAction = (function (_super) {
	    __extends(VirtualAction, _super);
	    function VirtualAction(scheduler, work, index) {
	        if (index === void 0) { index = (scheduler.index += 1); }
	        var _this = _super.call(this, scheduler, work) || this;
	        _this.scheduler = scheduler;
	        _this.work = work;
	        _this.index = index;
	        _this.active = true;
	        _this.index = scheduler.index = index;
	        return _this;
	    }
	    VirtualAction.prototype.schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (Number.isFinite(delay)) {
	            if (!this.id) {
	                return _super.prototype.schedule.call(this, state, delay);
	            }
	            this.active = false;
	            var action = new VirtualAction(this.scheduler, this.work);
	            this.add(action);
	            return action.schedule(state, delay);
	        }
	        else {
	            return Subscription_1.Subscription.EMPTY;
	        }
	    };
	    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        this.delay = scheduler.frame + delay;
	        var actions = scheduler.actions;
	        actions.push(this);
	        actions.sort(VirtualAction.sortActions);
	        return 1;
	    };
	    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	        return undefined;
	    };
	    VirtualAction.prototype._execute = function (state, delay) {
	        if (this.active === true) {
	            return _super.prototype._execute.call(this, state, delay);
	        }
	    };
	    VirtualAction.sortActions = function (a, b) {
	        if (a.delay === b.delay) {
	            if (a.index === b.index) {
	                return 0;
	            }
	            else if (a.index > b.index) {
	                return 1;
	            }
	            else {
	                return -1;
	            }
	        }
	        else if (a.delay > b.delay) {
	            return 1;
	        }
	        else {
	            return -1;
	        }
	    };
	    return VirtualAction;
	}(AsyncAction_1.AsyncAction));
	VirtualTimeScheduler.VirtualAction = VirtualAction;
	
	return VirtualTimeScheduler;
}

var Notification = {};

var empty = {};

var hasRequiredEmpty;

function requireEmpty () {
	if (hasRequiredEmpty) return empty;
	hasRequiredEmpty = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.empty = exports.EMPTY = void 0;
		var Observable_1 = /*@__PURE__*/ requireObservable();
		exports.EMPTY = new Observable_1.Observable(function (subscriber) { return subscriber.complete(); });
		function empty(scheduler) {
		    return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
		}
		exports.empty = empty;
		function emptyScheduled(scheduler) {
		    return new Observable_1.Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
		}
		
	} (empty));
	return empty;
}

var of = {};

var args = {};

var isScheduler = {};

var hasRequiredIsScheduler;

function requireIsScheduler () {
	if (hasRequiredIsScheduler) return isScheduler;
	hasRequiredIsScheduler = 1;
	Object.defineProperty(isScheduler, "__esModule", { value: true });
	isScheduler.isScheduler = void 0;
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function isScheduler$1(value) {
	    return value && isFunction_1.isFunction(value.schedule);
	}
	isScheduler.isScheduler = isScheduler$1;
	
	return isScheduler;
}

var hasRequiredArgs;

function requireArgs () {
	if (hasRequiredArgs) return args;
	hasRequiredArgs = 1;
	Object.defineProperty(args, "__esModule", { value: true });
	args.popNumber = args.popScheduler = args.popResultSelector = void 0;
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	var isScheduler_1 = /*@__PURE__*/ requireIsScheduler();
	function last(arr) {
	    return arr[arr.length - 1];
	}
	function popResultSelector(args) {
	    return isFunction_1.isFunction(last(args)) ? args.pop() : undefined;
	}
	args.popResultSelector = popResultSelector;
	function popScheduler(args) {
	    return isScheduler_1.isScheduler(last(args)) ? args.pop() : undefined;
	}
	args.popScheduler = popScheduler;
	function popNumber(args, defaultValue) {
	    return typeof last(args) === 'number' ? args.pop() : defaultValue;
	}
	args.popNumber = popNumber;
	
	return args;
}

var from = {};

var scheduled = {};

var scheduleObservable = {};

var innerFrom = {};

var isArrayLike = {};

var hasRequiredIsArrayLike;

function requireIsArrayLike () {
	if (hasRequiredIsArrayLike) return isArrayLike;
	hasRequiredIsArrayLike = 1;
	Object.defineProperty(isArrayLike, "__esModule", { value: true });
	isArrayLike.isArrayLike = void 0;
	isArrayLike.isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
	
	return isArrayLike;
}

var isPromise = {};

var hasRequiredIsPromise;

function requireIsPromise () {
	if (hasRequiredIsPromise) return isPromise;
	hasRequiredIsPromise = 1;
	Object.defineProperty(isPromise, "__esModule", { value: true });
	isPromise.isPromise = void 0;
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function isPromise$1(value) {
	    return isFunction_1.isFunction(value === null || value === void 0 ? void 0 : value.then);
	}
	isPromise.isPromise = isPromise$1;
	
	return isPromise;
}

var isInteropObservable = {};

var hasRequiredIsInteropObservable;

function requireIsInteropObservable () {
	if (hasRequiredIsInteropObservable) return isInteropObservable;
	hasRequiredIsInteropObservable = 1;
	Object.defineProperty(isInteropObservable, "__esModule", { value: true });
	isInteropObservable.isInteropObservable = void 0;
	var observable_1 = /*@__PURE__*/ requireObservable$1();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function isInteropObservable$1(input) {
	    return isFunction_1.isFunction(input[observable_1.observable]);
	}
	isInteropObservable.isInteropObservable = isInteropObservable$1;
	
	return isInteropObservable;
}

var isAsyncIterable = {};

var hasRequiredIsAsyncIterable;

function requireIsAsyncIterable () {
	if (hasRequiredIsAsyncIterable) return isAsyncIterable;
	hasRequiredIsAsyncIterable = 1;
	Object.defineProperty(isAsyncIterable, "__esModule", { value: true });
	isAsyncIterable.isAsyncIterable = void 0;
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function isAsyncIterable$1(obj) {
	    return Symbol.asyncIterator && isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
	}
	isAsyncIterable.isAsyncIterable = isAsyncIterable$1;
	
	return isAsyncIterable;
}

var throwUnobservableError = {};

var hasRequiredThrowUnobservableError;

function requireThrowUnobservableError () {
	if (hasRequiredThrowUnobservableError) return throwUnobservableError;
	hasRequiredThrowUnobservableError = 1;
	Object.defineProperty(throwUnobservableError, "__esModule", { value: true });
	throwUnobservableError.createInvalidObservableTypeError = void 0;
	function createInvalidObservableTypeError(input) {
	    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
	}
	throwUnobservableError.createInvalidObservableTypeError = createInvalidObservableTypeError;
	
	return throwUnobservableError;
}

var isIterable = {};

var iterator = {};

var hasRequiredIterator;

function requireIterator () {
	if (hasRequiredIterator) return iterator;
	hasRequiredIterator = 1;
	Object.defineProperty(iterator, "__esModule", { value: true });
	iterator.iterator = iterator.getSymbolIterator = void 0;
	function getSymbolIterator() {
	    if (typeof Symbol !== 'function' || !Symbol.iterator) {
	        return '@@iterator';
	    }
	    return Symbol.iterator;
	}
	iterator.getSymbolIterator = getSymbolIterator;
	iterator.iterator = getSymbolIterator();
	
	return iterator;
}

var hasRequiredIsIterable;

function requireIsIterable () {
	if (hasRequiredIsIterable) return isIterable;
	hasRequiredIsIterable = 1;
	Object.defineProperty(isIterable, "__esModule", { value: true });
	isIterable.isIterable = void 0;
	var iterator_1 = /*@__PURE__*/ requireIterator();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function isIterable$1(input) {
	    return isFunction_1.isFunction(input === null || input === void 0 ? void 0 : input[iterator_1.iterator]);
	}
	isIterable.isIterable = isIterable$1;
	
	return isIterable;
}

var isReadableStreamLike = {};

var hasRequiredIsReadableStreamLike;

function requireIsReadableStreamLike () {
	if (hasRequiredIsReadableStreamLike) return isReadableStreamLike;
	hasRequiredIsReadableStreamLike = 1;
	var __generator = (isReadableStreamLike && isReadableStreamLike.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var __await = (isReadableStreamLike && isReadableStreamLike.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); };
	var __asyncGenerator = (isReadableStreamLike && isReadableStreamLike.__asyncGenerator) || function (thisArg, _arguments, generator) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var g = generator.apply(thisArg, _arguments || []), i, q = [];
	    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
	    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
	    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
	    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
	    function fulfill(value) { resume("next", value); }
	    function reject(value) { resume("throw", value); }
	    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
	};
	Object.defineProperty(isReadableStreamLike, "__esModule", { value: true });
	isReadableStreamLike.isReadableStreamLike = isReadableStreamLike.readableStreamLikeToAsyncGenerator = void 0;
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function readableStreamLikeToAsyncGenerator(readableStream) {
	    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
	        var reader, _a, value, done;
	        return __generator(this, function (_b) {
	            switch (_b.label) {
	                case 0:
	                    reader = readableStream.getReader();
	                    _b.label = 1;
	                case 1:
	                    _b.trys.push([1, , 9, 10]);
	                    _b.label = 2;
	                case 2:
	                    return [4, __await(reader.read())];
	                case 3:
	                    _a = _b.sent(), value = _a.value, done = _a.done;
	                    if (!done) return [3, 5];
	                    return [4, __await(void 0)];
	                case 4: return [2, _b.sent()];
	                case 5: return [4, __await(value)];
	                case 6: return [4, _b.sent()];
	                case 7:
	                    _b.sent();
	                    return [3, 2];
	                case 8: return [3, 10];
	                case 9:
	                    reader.releaseLock();
	                    return [7];
	                case 10: return [2];
	            }
	        });
	    });
	}
	isReadableStreamLike.readableStreamLikeToAsyncGenerator = readableStreamLikeToAsyncGenerator;
	function isReadableStreamLike$1(obj) {
	    return isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
	}
	isReadableStreamLike.isReadableStreamLike = isReadableStreamLike$1;
	
	return isReadableStreamLike;
}

var hasRequiredInnerFrom;

function requireInnerFrom () {
	if (hasRequiredInnerFrom) return innerFrom;
	hasRequiredInnerFrom = 1;
	var __awaiter = (innerFrom && innerFrom.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (innerFrom && innerFrom.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var __asyncValues = (innerFrom && innerFrom.__asyncValues) || function (o) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var m = o[Symbol.asyncIterator], i;
	    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
	    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
	    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
	};
	var __values = (innerFrom && innerFrom.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(innerFrom, "__esModule", { value: true });
	innerFrom.fromReadableStreamLike = innerFrom.fromAsyncIterable = innerFrom.fromIterable = innerFrom.fromPromise = innerFrom.fromArrayLike = innerFrom.fromInteropObservable = innerFrom.innerFrom = void 0;
	var isArrayLike_1 = /*@__PURE__*/ requireIsArrayLike();
	var isPromise_1 = /*@__PURE__*/ requireIsPromise();
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var isInteropObservable_1 = /*@__PURE__*/ requireIsInteropObservable();
	var isAsyncIterable_1 = /*@__PURE__*/ requireIsAsyncIterable();
	var throwUnobservableError_1 = /*@__PURE__*/ requireThrowUnobservableError();
	var isIterable_1 = /*@__PURE__*/ requireIsIterable();
	var isReadableStreamLike_1 = /*@__PURE__*/ requireIsReadableStreamLike();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	var reportUnhandledError_1 = /*@__PURE__*/ requireReportUnhandledError();
	var observable_1 = /*@__PURE__*/ requireObservable$1();
	function innerFrom$1(input) {
	    if (input instanceof Observable_1.Observable) {
	        return input;
	    }
	    if (input != null) {
	        if (isInteropObservable_1.isInteropObservable(input)) {
	            return fromInteropObservable(input);
	        }
	        if (isArrayLike_1.isArrayLike(input)) {
	            return fromArrayLike(input);
	        }
	        if (isPromise_1.isPromise(input)) {
	            return fromPromise(input);
	        }
	        if (isAsyncIterable_1.isAsyncIterable(input)) {
	            return fromAsyncIterable(input);
	        }
	        if (isIterable_1.isIterable(input)) {
	            return fromIterable(input);
	        }
	        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
	            return fromReadableStreamLike(input);
	        }
	    }
	    throw throwUnobservableError_1.createInvalidObservableTypeError(input);
	}
	innerFrom.innerFrom = innerFrom$1;
	function fromInteropObservable(obj) {
	    return new Observable_1.Observable(function (subscriber) {
	        var obs = obj[observable_1.observable]();
	        if (isFunction_1.isFunction(obs.subscribe)) {
	            return obs.subscribe(subscriber);
	        }
	        throw new TypeError('Provided object does not correctly implement Symbol.observable');
	    });
	}
	innerFrom.fromInteropObservable = fromInteropObservable;
	function fromArrayLike(array) {
	    return new Observable_1.Observable(function (subscriber) {
	        for (var i = 0; i < array.length && !subscriber.closed; i++) {
	            subscriber.next(array[i]);
	        }
	        subscriber.complete();
	    });
	}
	innerFrom.fromArrayLike = fromArrayLike;
	function fromPromise(promise) {
	    return new Observable_1.Observable(function (subscriber) {
	        promise
	            .then(function (value) {
	            if (!subscriber.closed) {
	                subscriber.next(value);
	                subscriber.complete();
	            }
	        }, function (err) { return subscriber.error(err); })
	            .then(null, reportUnhandledError_1.reportUnhandledError);
	    });
	}
	innerFrom.fromPromise = fromPromise;
	function fromIterable(iterable) {
	    return new Observable_1.Observable(function (subscriber) {
	        var e_1, _a;
	        try {
	            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
	                var value = iterable_1_1.value;
	                subscriber.next(value);
	                if (subscriber.closed) {
	                    return;
	                }
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	        subscriber.complete();
	    });
	}
	innerFrom.fromIterable = fromIterable;
	function fromAsyncIterable(asyncIterable) {
	    return new Observable_1.Observable(function (subscriber) {
	        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
	    });
	}
	innerFrom.fromAsyncIterable = fromAsyncIterable;
	function fromReadableStreamLike(readableStream) {
	    return fromAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(readableStream));
	}
	innerFrom.fromReadableStreamLike = fromReadableStreamLike;
	function process(asyncIterable, subscriber) {
	    var asyncIterable_1, asyncIterable_1_1;
	    var e_2, _a;
	    return __awaiter(this, void 0, void 0, function () {
	        var value, e_2_1;
	        return __generator(this, function (_b) {
	            switch (_b.label) {
	                case 0:
	                    _b.trys.push([0, 5, 6, 11]);
	                    asyncIterable_1 = __asyncValues(asyncIterable);
	                    _b.label = 1;
	                case 1: return [4, asyncIterable_1.next()];
	                case 2:
	                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
	                    value = asyncIterable_1_1.value;
	                    subscriber.next(value);
	                    if (subscriber.closed) {
	                        return [2];
	                    }
	                    _b.label = 3;
	                case 3: return [3, 1];
	                case 4: return [3, 11];
	                case 5:
	                    e_2_1 = _b.sent();
	                    e_2 = { error: e_2_1 };
	                    return [3, 11];
	                case 6:
	                    _b.trys.push([6, , 9, 10]);
	                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
	                    return [4, _a.call(asyncIterable_1)];
	                case 7:
	                    _b.sent();
	                    _b.label = 8;
	                case 8: return [3, 10];
	                case 9:
	                    if (e_2) throw e_2.error;
	                    return [7];
	                case 10: return [7];
	                case 11:
	                    subscriber.complete();
	                    return [2];
	            }
	        });
	    });
	}
	
	return innerFrom;
}

var observeOn = {};

var executeSchedule = {};

var hasRequiredExecuteSchedule;

function requireExecuteSchedule () {
	if (hasRequiredExecuteSchedule) return executeSchedule;
	hasRequiredExecuteSchedule = 1;
	Object.defineProperty(executeSchedule, "__esModule", { value: true });
	executeSchedule.executeSchedule = void 0;
	function executeSchedule$1(parentSubscription, scheduler, work, delay, repeat) {
	    if (delay === void 0) { delay = 0; }
	    if (repeat === void 0) { repeat = false; }
	    var scheduleSubscription = scheduler.schedule(function () {
	        work();
	        if (repeat) {
	            parentSubscription.add(this.schedule(null, delay));
	        }
	        else {
	            this.unsubscribe();
	        }
	    }, delay);
	    parentSubscription.add(scheduleSubscription);
	    if (!repeat) {
	        return scheduleSubscription;
	    }
	}
	executeSchedule.executeSchedule = executeSchedule$1;
	
	return executeSchedule;
}

var hasRequiredObserveOn;

function requireObserveOn () {
	if (hasRequiredObserveOn) return observeOn;
	hasRequiredObserveOn = 1;
	Object.defineProperty(observeOn, "__esModule", { value: true });
	observeOn.observeOn = void 0;
	var executeSchedule_1 = /*@__PURE__*/ requireExecuteSchedule();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function observeOn$1(scheduler, delay) {
	    if (delay === void 0) { delay = 0; }
	    return lift_1.operate(function (source, subscriber) {
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return executeSchedule_1.executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule_1.executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule_1.executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
	    });
	}
	observeOn.observeOn = observeOn$1;
	
	return observeOn;
}

var subscribeOn = {};

var hasRequiredSubscribeOn;

function requireSubscribeOn () {
	if (hasRequiredSubscribeOn) return subscribeOn;
	hasRequiredSubscribeOn = 1;
	Object.defineProperty(subscribeOn, "__esModule", { value: true });
	subscribeOn.subscribeOn = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	function subscribeOn$1(scheduler, delay) {
	    if (delay === void 0) { delay = 0; }
	    return lift_1.operate(function (source, subscriber) {
	        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
	    });
	}
	subscribeOn.subscribeOn = subscribeOn$1;
	
	return subscribeOn;
}

var hasRequiredScheduleObservable;

function requireScheduleObservable () {
	if (hasRequiredScheduleObservable) return scheduleObservable;
	hasRequiredScheduleObservable = 1;
	Object.defineProperty(scheduleObservable, "__esModule", { value: true });
	scheduleObservable.scheduleObservable = void 0;
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var observeOn_1 = /*@__PURE__*/ requireObserveOn();
	var subscribeOn_1 = /*@__PURE__*/ requireSubscribeOn();
	function scheduleObservable$1(input, scheduler) {
	    return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
	}
	scheduleObservable.scheduleObservable = scheduleObservable$1;
	
	return scheduleObservable;
}

var schedulePromise = {};

var hasRequiredSchedulePromise;

function requireSchedulePromise () {
	if (hasRequiredSchedulePromise) return schedulePromise;
	hasRequiredSchedulePromise = 1;
	Object.defineProperty(schedulePromise, "__esModule", { value: true });
	schedulePromise.schedulePromise = void 0;
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var observeOn_1 = /*@__PURE__*/ requireObserveOn();
	var subscribeOn_1 = /*@__PURE__*/ requireSubscribeOn();
	function schedulePromise$1(input, scheduler) {
	    return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
	}
	schedulePromise.schedulePromise = schedulePromise$1;
	
	return schedulePromise;
}

var scheduleArray = {};

var hasRequiredScheduleArray;

function requireScheduleArray () {
	if (hasRequiredScheduleArray) return scheduleArray;
	hasRequiredScheduleArray = 1;
	Object.defineProperty(scheduleArray, "__esModule", { value: true });
	scheduleArray.scheduleArray = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	function scheduleArray$1(input, scheduler) {
	    return new Observable_1.Observable(function (subscriber) {
	        var i = 0;
	        return scheduler.schedule(function () {
	            if (i === input.length) {
	                subscriber.complete();
	            }
	            else {
	                subscriber.next(input[i++]);
	                if (!subscriber.closed) {
	                    this.schedule();
	                }
	            }
	        });
	    });
	}
	scheduleArray.scheduleArray = scheduleArray$1;
	
	return scheduleArray;
}

var scheduleIterable = {};

var hasRequiredScheduleIterable;

function requireScheduleIterable () {
	if (hasRequiredScheduleIterable) return scheduleIterable;
	hasRequiredScheduleIterable = 1;
	Object.defineProperty(scheduleIterable, "__esModule", { value: true });
	scheduleIterable.scheduleIterable = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var iterator_1 = /*@__PURE__*/ requireIterator();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	var executeSchedule_1 = /*@__PURE__*/ requireExecuteSchedule();
	function scheduleIterable$1(input, scheduler) {
	    return new Observable_1.Observable(function (subscriber) {
	        var iterator;
	        executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
	            iterator = input[iterator_1.iterator]();
	            executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
	                var _a;
	                var value;
	                var done;
	                try {
	                    (_a = iterator.next(), value = _a.value, done = _a.done);
	                }
	                catch (err) {
	                    subscriber.error(err);
	                    return;
	                }
	                if (done) {
	                    subscriber.complete();
	                }
	                else {
	                    subscriber.next(value);
	                }
	            }, 0, true);
	        });
	        return function () { return isFunction_1.isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return(); };
	    });
	}
	scheduleIterable.scheduleIterable = scheduleIterable$1;
	
	return scheduleIterable;
}

var scheduleAsyncIterable = {};

var hasRequiredScheduleAsyncIterable;

function requireScheduleAsyncIterable () {
	if (hasRequiredScheduleAsyncIterable) return scheduleAsyncIterable;
	hasRequiredScheduleAsyncIterable = 1;
	Object.defineProperty(scheduleAsyncIterable, "__esModule", { value: true });
	scheduleAsyncIterable.scheduleAsyncIterable = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var executeSchedule_1 = /*@__PURE__*/ requireExecuteSchedule();
	function scheduleAsyncIterable$1(input, scheduler) {
	    if (!input) {
	        throw new Error('Iterable cannot be null');
	    }
	    return new Observable_1.Observable(function (subscriber) {
	        executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
	            var iterator = input[Symbol.asyncIterator]();
	            executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
	                iterator.next().then(function (result) {
	                    if (result.done) {
	                        subscriber.complete();
	                    }
	                    else {
	                        subscriber.next(result.value);
	                    }
	                });
	            }, 0, true);
	        });
	    });
	}
	scheduleAsyncIterable.scheduleAsyncIterable = scheduleAsyncIterable$1;
	
	return scheduleAsyncIterable;
}

var scheduleReadableStreamLike = {};

var hasRequiredScheduleReadableStreamLike;

function requireScheduleReadableStreamLike () {
	if (hasRequiredScheduleReadableStreamLike) return scheduleReadableStreamLike;
	hasRequiredScheduleReadableStreamLike = 1;
	Object.defineProperty(scheduleReadableStreamLike, "__esModule", { value: true });
	scheduleReadableStreamLike.scheduleReadableStreamLike = void 0;
	var scheduleAsyncIterable_1 = /*@__PURE__*/ requireScheduleAsyncIterable();
	var isReadableStreamLike_1 = /*@__PURE__*/ requireIsReadableStreamLike();
	function scheduleReadableStreamLike$1(input, scheduler) {
	    return scheduleAsyncIterable_1.scheduleAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(input), scheduler);
	}
	scheduleReadableStreamLike.scheduleReadableStreamLike = scheduleReadableStreamLike$1;
	
	return scheduleReadableStreamLike;
}

var hasRequiredScheduled;

function requireScheduled () {
	if (hasRequiredScheduled) return scheduled;
	hasRequiredScheduled = 1;
	Object.defineProperty(scheduled, "__esModule", { value: true });
	scheduled.scheduled = void 0;
	var scheduleObservable_1 = /*@__PURE__*/ requireScheduleObservable();
	var schedulePromise_1 = /*@__PURE__*/ requireSchedulePromise();
	var scheduleArray_1 = /*@__PURE__*/ requireScheduleArray();
	var scheduleIterable_1 = /*@__PURE__*/ requireScheduleIterable();
	var scheduleAsyncIterable_1 = /*@__PURE__*/ requireScheduleAsyncIterable();
	var isInteropObservable_1 = /*@__PURE__*/ requireIsInteropObservable();
	var isPromise_1 = /*@__PURE__*/ requireIsPromise();
	var isArrayLike_1 = /*@__PURE__*/ requireIsArrayLike();
	var isIterable_1 = /*@__PURE__*/ requireIsIterable();
	var isAsyncIterable_1 = /*@__PURE__*/ requireIsAsyncIterable();
	var throwUnobservableError_1 = /*@__PURE__*/ requireThrowUnobservableError();
	var isReadableStreamLike_1 = /*@__PURE__*/ requireIsReadableStreamLike();
	var scheduleReadableStreamLike_1 = /*@__PURE__*/ requireScheduleReadableStreamLike();
	function scheduled$1(input, scheduler) {
	    if (input != null) {
	        if (isInteropObservable_1.isInteropObservable(input)) {
	            return scheduleObservable_1.scheduleObservable(input, scheduler);
	        }
	        if (isArrayLike_1.isArrayLike(input)) {
	            return scheduleArray_1.scheduleArray(input, scheduler);
	        }
	        if (isPromise_1.isPromise(input)) {
	            return schedulePromise_1.schedulePromise(input, scheduler);
	        }
	        if (isAsyncIterable_1.isAsyncIterable(input)) {
	            return scheduleAsyncIterable_1.scheduleAsyncIterable(input, scheduler);
	        }
	        if (isIterable_1.isIterable(input)) {
	            return scheduleIterable_1.scheduleIterable(input, scheduler);
	        }
	        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
	            return scheduleReadableStreamLike_1.scheduleReadableStreamLike(input, scheduler);
	        }
	    }
	    throw throwUnobservableError_1.createInvalidObservableTypeError(input);
	}
	scheduled.scheduled = scheduled$1;
	
	return scheduled;
}

var hasRequiredFrom;

function requireFrom () {
	if (hasRequiredFrom) return from;
	hasRequiredFrom = 1;
	Object.defineProperty(from, "__esModule", { value: true });
	from.from = void 0;
	var scheduled_1 = /*@__PURE__*/ requireScheduled();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function from$1(input, scheduler) {
	    return scheduler ? scheduled_1.scheduled(input, scheduler) : innerFrom_1.innerFrom(input);
	}
	from.from = from$1;
	
	return from;
}

var hasRequiredOf;

function requireOf () {
	if (hasRequiredOf) return of;
	hasRequiredOf = 1;
	Object.defineProperty(of, "__esModule", { value: true });
	of.of = void 0;
	var args_1 = /*@__PURE__*/ requireArgs();
	var from_1 = /*@__PURE__*/ requireFrom();
	function of$1() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var scheduler = args_1.popScheduler(args);
	    return from_1.from(args, scheduler);
	}
	of.of = of$1;
	
	return of;
}

var throwError = {};

var hasRequiredThrowError;

function requireThrowError () {
	if (hasRequiredThrowError) return throwError;
	hasRequiredThrowError = 1;
	Object.defineProperty(throwError, "__esModule", { value: true });
	throwError.throwError = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function throwError$1(errorOrErrorFactory, scheduler) {
	    var errorFactory = isFunction_1.isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function () { return errorOrErrorFactory; };
	    var init = function (subscriber) { return subscriber.error(errorFactory()); };
	    return new Observable_1.Observable(scheduler ? function (subscriber) { return scheduler.schedule(init, 0, subscriber); } : init);
	}
	throwError.throwError = throwError$1;
	
	return throwError;
}

var hasRequiredNotification;

function requireNotification () {
	if (hasRequiredNotification) return Notification;
	hasRequiredNotification = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.observeNotification = exports.Notification = exports.NotificationKind = void 0;
		var empty_1 = /*@__PURE__*/ requireEmpty();
		var of_1 = /*@__PURE__*/ requireOf();
		var throwError_1 = /*@__PURE__*/ requireThrowError();
		var isFunction_1 = /*@__PURE__*/ requireIsFunction();
		(function (NotificationKind) {
		    NotificationKind["NEXT"] = "N";
		    NotificationKind["ERROR"] = "E";
		    NotificationKind["COMPLETE"] = "C";
		})(exports.NotificationKind || (exports.NotificationKind = {}));
		var Notification = (function () {
		    function Notification(kind, value, error) {
		        this.kind = kind;
		        this.value = value;
		        this.error = error;
		        this.hasValue = kind === 'N';
		    }
		    Notification.prototype.observe = function (observer) {
		        return observeNotification(this, observer);
		    };
		    Notification.prototype.do = function (nextHandler, errorHandler, completeHandler) {
		        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
		        return kind === 'N' ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === 'E' ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
		    };
		    Notification.prototype.accept = function (nextOrObserver, error, complete) {
		        var _a;
		        return isFunction_1.isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next)
		            ? this.observe(nextOrObserver)
		            : this.do(nextOrObserver, error, complete);
		    };
		    Notification.prototype.toObservable = function () {
		        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
		        var result = kind === 'N'
		            ?
		                of_1.of(value)
		            :
		                kind === 'E'
		                    ?
		                        throwError_1.throwError(function () { return error; })
		                    :
		                        kind === 'C'
		                            ?
		                                empty_1.EMPTY
		                            :
		                                0;
		        if (!result) {
		            throw new TypeError("Unexpected notification kind " + kind);
		        }
		        return result;
		    };
		    Notification.createNext = function (value) {
		        return new Notification('N', value);
		    };
		    Notification.createError = function (err) {
		        return new Notification('E', undefined, err);
		    };
		    Notification.createComplete = function () {
		        return Notification.completeNotification;
		    };
		    Notification.completeNotification = new Notification('C');
		    return Notification;
		}());
		exports.Notification = Notification;
		function observeNotification(notification, observer) {
		    var _a, _b, _c;
		    var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
		    if (typeof kind !== 'string') {
		        throw new TypeError('Invalid notification, missing "kind"');
		    }
		    kind === 'N' ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === 'E' ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
		}
		exports.observeNotification = observeNotification;
		
	} (Notification));
	return Notification;
}

var isObservable = {};

var hasRequiredIsObservable;

function requireIsObservable () {
	if (hasRequiredIsObservable) return isObservable;
	hasRequiredIsObservable = 1;
	Object.defineProperty(isObservable, "__esModule", { value: true });
	isObservable.isObservable = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function isObservable$1(obj) {
	    return !!obj && (obj instanceof Observable_1.Observable || (isFunction_1.isFunction(obj.lift) && isFunction_1.isFunction(obj.subscribe)));
	}
	isObservable.isObservable = isObservable$1;
	
	return isObservable;
}

var lastValueFrom = {};

var EmptyError = {};

var hasRequiredEmptyError;

function requireEmptyError () {
	if (hasRequiredEmptyError) return EmptyError;
	hasRequiredEmptyError = 1;
	Object.defineProperty(EmptyError, "__esModule", { value: true });
	EmptyError.EmptyError = void 0;
	var createErrorClass_1 = /*@__PURE__*/ requireCreateErrorClass();
	EmptyError.EmptyError = createErrorClass_1.createErrorClass(function (_super) {
	    return function EmptyErrorImpl() {
	        _super(this);
	        this.name = 'EmptyError';
	        this.message = 'no elements in sequence';
	    };
	});
	
	return EmptyError;
}

var hasRequiredLastValueFrom;

function requireLastValueFrom () {
	if (hasRequiredLastValueFrom) return lastValueFrom;
	hasRequiredLastValueFrom = 1;
	Object.defineProperty(lastValueFrom, "__esModule", { value: true });
	lastValueFrom.lastValueFrom = void 0;
	var EmptyError_1 = /*@__PURE__*/ requireEmptyError();
	function lastValueFrom$1(source, config) {
	    var hasConfig = typeof config === 'object';
	    return new Promise(function (resolve, reject) {
	        var _hasValue = false;
	        var _value;
	        source.subscribe({
	            next: function (value) {
	                _value = value;
	                _hasValue = true;
	            },
	            error: reject,
	            complete: function () {
	                if (_hasValue) {
	                    resolve(_value);
	                }
	                else if (hasConfig) {
	                    resolve(config.defaultValue);
	                }
	                else {
	                    reject(new EmptyError_1.EmptyError());
	                }
	            },
	        });
	    });
	}
	lastValueFrom.lastValueFrom = lastValueFrom$1;
	
	return lastValueFrom;
}

var firstValueFrom = {};

var hasRequiredFirstValueFrom;

function requireFirstValueFrom () {
	if (hasRequiredFirstValueFrom) return firstValueFrom;
	hasRequiredFirstValueFrom = 1;
	Object.defineProperty(firstValueFrom, "__esModule", { value: true });
	firstValueFrom.firstValueFrom = void 0;
	var EmptyError_1 = /*@__PURE__*/ requireEmptyError();
	var Subscriber_1 = /*@__PURE__*/ requireSubscriber();
	function firstValueFrom$1(source, config) {
	    var hasConfig = typeof config === 'object';
	    return new Promise(function (resolve, reject) {
	        var subscriber = new Subscriber_1.SafeSubscriber({
	            next: function (value) {
	                resolve(value);
	                subscriber.unsubscribe();
	            },
	            error: reject,
	            complete: function () {
	                if (hasConfig) {
	                    resolve(config.defaultValue);
	                }
	                else {
	                    reject(new EmptyError_1.EmptyError());
	                }
	            },
	        });
	        source.subscribe(subscriber);
	    });
	}
	firstValueFrom.firstValueFrom = firstValueFrom$1;
	
	return firstValueFrom;
}

var ArgumentOutOfRangeError = {};

var hasRequiredArgumentOutOfRangeError;

function requireArgumentOutOfRangeError () {
	if (hasRequiredArgumentOutOfRangeError) return ArgumentOutOfRangeError;
	hasRequiredArgumentOutOfRangeError = 1;
	Object.defineProperty(ArgumentOutOfRangeError, "__esModule", { value: true });
	ArgumentOutOfRangeError.ArgumentOutOfRangeError = void 0;
	var createErrorClass_1 = /*@__PURE__*/ requireCreateErrorClass();
	ArgumentOutOfRangeError.ArgumentOutOfRangeError = createErrorClass_1.createErrorClass(function (_super) {
	    return function ArgumentOutOfRangeErrorImpl() {
	        _super(this);
	        this.name = 'ArgumentOutOfRangeError';
	        this.message = 'argument out of range';
	    };
	});
	
	return ArgumentOutOfRangeError;
}

var NotFoundError = {};

var hasRequiredNotFoundError;

function requireNotFoundError () {
	if (hasRequiredNotFoundError) return NotFoundError;
	hasRequiredNotFoundError = 1;
	Object.defineProperty(NotFoundError, "__esModule", { value: true });
	NotFoundError.NotFoundError = void 0;
	var createErrorClass_1 = /*@__PURE__*/ requireCreateErrorClass();
	NotFoundError.NotFoundError = createErrorClass_1.createErrorClass(function (_super) {
	    return function NotFoundErrorImpl(message) {
	        _super(this);
	        this.name = 'NotFoundError';
	        this.message = message;
	    };
	});
	
	return NotFoundError;
}

var SequenceError = {};

var hasRequiredSequenceError;

function requireSequenceError () {
	if (hasRequiredSequenceError) return SequenceError;
	hasRequiredSequenceError = 1;
	Object.defineProperty(SequenceError, "__esModule", { value: true });
	SequenceError.SequenceError = void 0;
	var createErrorClass_1 = /*@__PURE__*/ requireCreateErrorClass();
	SequenceError.SequenceError = createErrorClass_1.createErrorClass(function (_super) {
	    return function SequenceErrorImpl(message) {
	        _super(this);
	        this.name = 'SequenceError';
	        this.message = message;
	    };
	});
	
	return SequenceError;
}

var timeout = {};

var isDate = {};

var hasRequiredIsDate;

function requireIsDate () {
	if (hasRequiredIsDate) return isDate;
	hasRequiredIsDate = 1;
	Object.defineProperty(isDate, "__esModule", { value: true });
	isDate.isValidDate = void 0;
	function isValidDate(value) {
	    return value instanceof Date && !isNaN(value);
	}
	isDate.isValidDate = isValidDate;
	
	return isDate;
}

var hasRequiredTimeout;

function requireTimeout () {
	if (hasRequiredTimeout) return timeout;
	hasRequiredTimeout = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.timeout = exports.TimeoutError = void 0;
		var async_1 = /*@__PURE__*/ requireAsync();
		var isDate_1 = /*@__PURE__*/ requireIsDate();
		var lift_1 = /*@__PURE__*/ requireLift();
		var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
		var createErrorClass_1 = /*@__PURE__*/ requireCreateErrorClass();
		var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
		var executeSchedule_1 = /*@__PURE__*/ requireExecuteSchedule();
		exports.TimeoutError = createErrorClass_1.createErrorClass(function (_super) {
		    return function TimeoutErrorImpl(info) {
		        if (info === void 0) { info = null; }
		        _super(this);
		        this.message = 'Timeout has occurred';
		        this.name = 'TimeoutError';
		        this.info = info;
		    };
		});
		function timeout(config, schedulerArg) {
		    var _a = (isDate_1.isValidDate(config) ? { first: config } : typeof config === 'number' ? { each: config } : config), first = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : async_1.asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
		    if (first == null && each == null) {
		        throw new TypeError('No timeout provided.');
		    }
		    return lift_1.operate(function (source, subscriber) {
		        var originalSourceSubscription;
		        var timerSubscription;
		        var lastValue = null;
		        var seen = 0;
		        var startTimer = function (delay) {
		            timerSubscription = executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
		                try {
		                    originalSourceSubscription.unsubscribe();
		                    innerFrom_1.innerFrom(_with({
		                        meta: meta,
		                        lastValue: lastValue,
		                        seen: seen,
		                    })).subscribe(subscriber);
		                }
		                catch (err) {
		                    subscriber.error(err);
		                }
		            }, delay);
		        };
		        originalSourceSubscription = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
		            timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
		            seen++;
		            subscriber.next((lastValue = value));
		            each > 0 && startTimer(each);
		        }, undefined, undefined, function () {
		            if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
		                timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
		            }
		            lastValue = null;
		        }));
		        !seen && startTimer(first != null ? (typeof first === 'number' ? first : +first - scheduler.now()) : each);
		    });
		}
		exports.timeout = timeout;
		function timeoutErrorFactory(info) {
		    throw new exports.TimeoutError(info);
		}
		
	} (timeout));
	return timeout;
}

var bindCallback = {};

var bindCallbackInternals = {};

var mapOneOrManyArgs = {};

var map = {};

var hasRequiredMap;

function requireMap () {
	if (hasRequiredMap) return map;
	hasRequiredMap = 1;
	Object.defineProperty(map, "__esModule", { value: true });
	map.map = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function map$1(project, thisArg) {
	    return lift_1.operate(function (source, subscriber) {
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            subscriber.next(project.call(thisArg, value, index++));
	        }));
	    });
	}
	map.map = map$1;
	
	return map;
}

var hasRequiredMapOneOrManyArgs;

function requireMapOneOrManyArgs () {
	if (hasRequiredMapOneOrManyArgs) return mapOneOrManyArgs;
	hasRequiredMapOneOrManyArgs = 1;
	var __read = (mapOneOrManyArgs && mapOneOrManyArgs.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (mapOneOrManyArgs && mapOneOrManyArgs.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(mapOneOrManyArgs, "__esModule", { value: true });
	mapOneOrManyArgs.mapOneOrManyArgs = void 0;
	var map_1 = /*@__PURE__*/ requireMap();
	var isArray = Array.isArray;
	function callOrApply(fn, args) {
	    return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
	}
	function mapOneOrManyArgs$1(fn) {
	    return map_1.map(function (args) { return callOrApply(fn, args); });
	}
	mapOneOrManyArgs.mapOneOrManyArgs = mapOneOrManyArgs$1;
	
	return mapOneOrManyArgs;
}

var hasRequiredBindCallbackInternals;

function requireBindCallbackInternals () {
	if (hasRequiredBindCallbackInternals) return bindCallbackInternals;
	hasRequiredBindCallbackInternals = 1;
	var __read = (bindCallbackInternals && bindCallbackInternals.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (bindCallbackInternals && bindCallbackInternals.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(bindCallbackInternals, "__esModule", { value: true });
	bindCallbackInternals.bindCallbackInternals = void 0;
	var isScheduler_1 = /*@__PURE__*/ requireIsScheduler();
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var subscribeOn_1 = /*@__PURE__*/ requireSubscribeOn();
	var mapOneOrManyArgs_1 = /*@__PURE__*/ requireMapOneOrManyArgs();
	var observeOn_1 = /*@__PURE__*/ requireObserveOn();
	var AsyncSubject_1 = /*@__PURE__*/ requireAsyncSubject();
	function bindCallbackInternals$1(isNodeStyle, callbackFunc, resultSelector, scheduler) {
	    if (resultSelector) {
	        if (isScheduler_1.isScheduler(resultSelector)) {
	            scheduler = resultSelector;
	        }
	        else {
	            return function () {
	                var args = [];
	                for (var _i = 0; _i < arguments.length; _i++) {
	                    args[_i] = arguments[_i];
	                }
	                return bindCallbackInternals$1(isNodeStyle, callbackFunc, scheduler)
	                    .apply(this, args)
	                    .pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
	            };
	        }
	    }
	    if (scheduler) {
	        return function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            return bindCallbackInternals$1(isNodeStyle, callbackFunc)
	                .apply(this, args)
	                .pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
	        };
	    }
	    return function () {
	        var _this = this;
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var subject = new AsyncSubject_1.AsyncSubject();
	        var uninitialized = true;
	        return new Observable_1.Observable(function (subscriber) {
	            var subs = subject.subscribe(subscriber);
	            if (uninitialized) {
	                uninitialized = false;
	                var isAsync_1 = false;
	                var isComplete_1 = false;
	                callbackFunc.apply(_this, __spreadArray(__spreadArray([], __read(args)), [
	                    function () {
	                        var results = [];
	                        for (var _i = 0; _i < arguments.length; _i++) {
	                            results[_i] = arguments[_i];
	                        }
	                        if (isNodeStyle) {
	                            var err = results.shift();
	                            if (err != null) {
	                                subject.error(err);
	                                return;
	                            }
	                        }
	                        subject.next(1 < results.length ? results : results[0]);
	                        isComplete_1 = true;
	                        if (isAsync_1) {
	                            subject.complete();
	                        }
	                    },
	                ]));
	                if (isComplete_1) {
	                    subject.complete();
	                }
	                isAsync_1 = true;
	            }
	            return subs;
	        });
	    };
	}
	bindCallbackInternals.bindCallbackInternals = bindCallbackInternals$1;
	
	return bindCallbackInternals;
}

var hasRequiredBindCallback;

function requireBindCallback () {
	if (hasRequiredBindCallback) return bindCallback;
	hasRequiredBindCallback = 1;
	Object.defineProperty(bindCallback, "__esModule", { value: true });
	bindCallback.bindCallback = void 0;
	var bindCallbackInternals_1 = /*@__PURE__*/ requireBindCallbackInternals();
	function bindCallback$1(callbackFunc, resultSelector, scheduler) {
	    return bindCallbackInternals_1.bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
	}
	bindCallback.bindCallback = bindCallback$1;
	
	return bindCallback;
}

var bindNodeCallback = {};

var hasRequiredBindNodeCallback;

function requireBindNodeCallback () {
	if (hasRequiredBindNodeCallback) return bindNodeCallback;
	hasRequiredBindNodeCallback = 1;
	Object.defineProperty(bindNodeCallback, "__esModule", { value: true });
	bindNodeCallback.bindNodeCallback = void 0;
	var bindCallbackInternals_1 = /*@__PURE__*/ requireBindCallbackInternals();
	function bindNodeCallback$1(callbackFunc, resultSelector, scheduler) {
	    return bindCallbackInternals_1.bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
	}
	bindNodeCallback.bindNodeCallback = bindNodeCallback$1;
	
	return bindNodeCallback;
}

var combineLatest$1 = {};

var argsArgArrayOrObject = {};

var hasRequiredArgsArgArrayOrObject;

function requireArgsArgArrayOrObject () {
	if (hasRequiredArgsArgArrayOrObject) return argsArgArrayOrObject;
	hasRequiredArgsArgArrayOrObject = 1;
	Object.defineProperty(argsArgArrayOrObject, "__esModule", { value: true });
	argsArgArrayOrObject.argsArgArrayOrObject = void 0;
	var isArray = Array.isArray;
	var getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
	function argsArgArrayOrObject$1(args) {
	    if (args.length === 1) {
	        var first_1 = args[0];
	        if (isArray(first_1)) {
	            return { args: first_1, keys: null };
	        }
	        if (isPOJO(first_1)) {
	            var keys = getKeys(first_1);
	            return {
	                args: keys.map(function (key) { return first_1[key]; }),
	                keys: keys,
	            };
	        }
	    }
	    return { args: args, keys: null };
	}
	argsArgArrayOrObject.argsArgArrayOrObject = argsArgArrayOrObject$1;
	function isPOJO(obj) {
	    return obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto;
	}
	
	return argsArgArrayOrObject;
}

var createObject = {};

var hasRequiredCreateObject;

function requireCreateObject () {
	if (hasRequiredCreateObject) return createObject;
	hasRequiredCreateObject = 1;
	Object.defineProperty(createObject, "__esModule", { value: true });
	createObject.createObject = void 0;
	function createObject$1(keys, values) {
	    return keys.reduce(function (result, key, i) { return ((result[key] = values[i]), result); }, {});
	}
	createObject.createObject = createObject$1;
	
	return createObject;
}

var hasRequiredCombineLatest$1;

function requireCombineLatest$1 () {
	if (hasRequiredCombineLatest$1) return combineLatest$1;
	hasRequiredCombineLatest$1 = 1;
	Object.defineProperty(combineLatest$1, "__esModule", { value: true });
	combineLatest$1.combineLatestInit = combineLatest$1.combineLatest = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var argsArgArrayOrObject_1 = /*@__PURE__*/ requireArgsArgArrayOrObject();
	var from_1 = /*@__PURE__*/ requireFrom();
	var identity_1 = /*@__PURE__*/ requireIdentity();
	var mapOneOrManyArgs_1 = /*@__PURE__*/ requireMapOneOrManyArgs();
	var args_1 = /*@__PURE__*/ requireArgs();
	var createObject_1 = /*@__PURE__*/ requireCreateObject();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var executeSchedule_1 = /*@__PURE__*/ requireExecuteSchedule();
	function combineLatest() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var scheduler = args_1.popScheduler(args);
	    var resultSelector = args_1.popResultSelector(args);
	    var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
	    if (observables.length === 0) {
	        return from_1.from([], scheduler);
	    }
	    var result = new Observable_1.Observable(combineLatestInit(observables, scheduler, keys
	        ?
	            function (values) { return createObject_1.createObject(keys, values); }
	        :
	            identity_1.identity));
	    return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
	}
	combineLatest$1.combineLatest = combineLatest;
	function combineLatestInit(observables, scheduler, valueTransform) {
	    if (valueTransform === void 0) { valueTransform = identity_1.identity; }
	    return function (subscriber) {
	        maybeSchedule(scheduler, function () {
	            var length = observables.length;
	            var values = new Array(length);
	            var active = length;
	            var remainingFirstValues = length;
	            var _loop_1 = function (i) {
	                maybeSchedule(scheduler, function () {
	                    var source = from_1.from(observables[i], scheduler);
	                    var hasFirstValue = false;
	                    source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                        values[i] = value;
	                        if (!hasFirstValue) {
	                            hasFirstValue = true;
	                            remainingFirstValues--;
	                        }
	                        if (!remainingFirstValues) {
	                            subscriber.next(valueTransform(values.slice()));
	                        }
	                    }, function () {
	                        if (!--active) {
	                            subscriber.complete();
	                        }
	                    }));
	                }, subscriber);
	            };
	            for (var i = 0; i < length; i++) {
	                _loop_1(i);
	            }
	        }, subscriber);
	    };
	}
	combineLatest$1.combineLatestInit = combineLatestInit;
	function maybeSchedule(scheduler, execute, subscription) {
	    if (scheduler) {
	        executeSchedule_1.executeSchedule(subscription, scheduler, execute);
	    }
	    else {
	        execute();
	    }
	}
	
	return combineLatest$1;
}

var concat$1 = {};

var concatAll = {};

var mergeAll = {};

var mergeMap = {};

var mergeInternals = {};

var hasRequiredMergeInternals;

function requireMergeInternals () {
	if (hasRequiredMergeInternals) return mergeInternals;
	hasRequiredMergeInternals = 1;
	Object.defineProperty(mergeInternals, "__esModule", { value: true });
	mergeInternals.mergeInternals = void 0;
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var executeSchedule_1 = /*@__PURE__*/ requireExecuteSchedule();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function mergeInternals$1(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
	    var buffer = [];
	    var active = 0;
	    var index = 0;
	    var isComplete = false;
	    var checkComplete = function () {
	        if (isComplete && !buffer.length && !active) {
	            subscriber.complete();
	        }
	    };
	    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
	    var doInnerSub = function (value) {
	        expand && subscriber.next(value);
	        active++;
	        var innerComplete = false;
	        innerFrom_1.innerFrom(project(value, index++)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (innerValue) {
	            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
	            if (expand) {
	                outerNext(innerValue);
	            }
	            else {
	                subscriber.next(innerValue);
	            }
	        }, function () {
	            innerComplete = true;
	        }, undefined, function () {
	            if (innerComplete) {
	                try {
	                    active--;
	                    var _loop_1 = function () {
	                        var bufferedValue = buffer.shift();
	                        if (innerSubScheduler) {
	                            executeSchedule_1.executeSchedule(subscriber, innerSubScheduler, function () { return doInnerSub(bufferedValue); });
	                        }
	                        else {
	                            doInnerSub(bufferedValue);
	                        }
	                    };
	                    while (buffer.length && active < concurrent) {
	                        _loop_1();
	                    }
	                    checkComplete();
	                }
	                catch (err) {
	                    subscriber.error(err);
	                }
	            }
	        }));
	    };
	    source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, outerNext, function () {
	        isComplete = true;
	        checkComplete();
	    }));
	    return function () {
	        additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
	    };
	}
	mergeInternals.mergeInternals = mergeInternals$1;
	
	return mergeInternals;
}

var hasRequiredMergeMap;

function requireMergeMap () {
	if (hasRequiredMergeMap) return mergeMap;
	hasRequiredMergeMap = 1;
	Object.defineProperty(mergeMap, "__esModule", { value: true });
	mergeMap.mergeMap = void 0;
	var map_1 = /*@__PURE__*/ requireMap();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var lift_1 = /*@__PURE__*/ requireLift();
	var mergeInternals_1 = /*@__PURE__*/ requireMergeInternals();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function mergeMap$1(project, resultSelector, concurrent) {
	    if (concurrent === void 0) { concurrent = Infinity; }
	    if (isFunction_1.isFunction(resultSelector)) {
	        return mergeMap$1(function (a, i) { return map_1.map(function (b, ii) { return resultSelector(a, b, i, ii); })(innerFrom_1.innerFrom(project(a, i))); }, concurrent);
	    }
	    else if (typeof resultSelector === 'number') {
	        concurrent = resultSelector;
	    }
	    return lift_1.operate(function (source, subscriber) { return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent); });
	}
	mergeMap.mergeMap = mergeMap$1;
	
	return mergeMap;
}

var hasRequiredMergeAll;

function requireMergeAll () {
	if (hasRequiredMergeAll) return mergeAll;
	hasRequiredMergeAll = 1;
	Object.defineProperty(mergeAll, "__esModule", { value: true });
	mergeAll.mergeAll = void 0;
	var mergeMap_1 = /*@__PURE__*/ requireMergeMap();
	var identity_1 = /*@__PURE__*/ requireIdentity();
	function mergeAll$1(concurrent) {
	    if (concurrent === void 0) { concurrent = Infinity; }
	    return mergeMap_1.mergeMap(identity_1.identity, concurrent);
	}
	mergeAll.mergeAll = mergeAll$1;
	
	return mergeAll;
}

var hasRequiredConcatAll;

function requireConcatAll () {
	if (hasRequiredConcatAll) return concatAll;
	hasRequiredConcatAll = 1;
	Object.defineProperty(concatAll, "__esModule", { value: true });
	concatAll.concatAll = void 0;
	var mergeAll_1 = /*@__PURE__*/ requireMergeAll();
	function concatAll$1() {
	    return mergeAll_1.mergeAll(1);
	}
	concatAll.concatAll = concatAll$1;
	
	return concatAll;
}

var hasRequiredConcat$1;

function requireConcat$1 () {
	if (hasRequiredConcat$1) return concat$1;
	hasRequiredConcat$1 = 1;
	Object.defineProperty(concat$1, "__esModule", { value: true });
	concat$1.concat = void 0;
	var concatAll_1 = /*@__PURE__*/ requireConcatAll();
	var args_1 = /*@__PURE__*/ requireArgs();
	var from_1 = /*@__PURE__*/ requireFrom();
	function concat() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    return concatAll_1.concatAll()(from_1.from(args, args_1.popScheduler(args)));
	}
	concat$1.concat = concat;
	
	return concat$1;
}

var connectable = {};

var defer = {};

var hasRequiredDefer;

function requireDefer () {
	if (hasRequiredDefer) return defer;
	hasRequiredDefer = 1;
	Object.defineProperty(defer, "__esModule", { value: true });
	defer.defer = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function defer$1(observableFactory) {
	    return new Observable_1.Observable(function (subscriber) {
	        innerFrom_1.innerFrom(observableFactory()).subscribe(subscriber);
	    });
	}
	defer.defer = defer$1;
	
	return defer;
}

var hasRequiredConnectable;

function requireConnectable () {
	if (hasRequiredConnectable) return connectable;
	hasRequiredConnectable = 1;
	Object.defineProperty(connectable, "__esModule", { value: true });
	connectable.connectable = void 0;
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var defer_1 = /*@__PURE__*/ requireDefer();
	var DEFAULT_CONFIG = {
	    connector: function () { return new Subject_1.Subject(); },
	    resetOnDisconnect: true,
	};
	function connectable$1(source, config) {
	    if (config === void 0) { config = DEFAULT_CONFIG; }
	    var connection = null;
	    var connector = config.connector, _a = config.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
	    var subject = connector();
	    var result = new Observable_1.Observable(function (subscriber) {
	        return subject.subscribe(subscriber);
	    });
	    result.connect = function () {
	        if (!connection || connection.closed) {
	            connection = defer_1.defer(function () { return source; }).subscribe(subject);
	            if (resetOnDisconnect) {
	                connection.add(function () { return (subject = connector()); });
	            }
	        }
	        return connection;
	    };
	    return result;
	}
	connectable.connectable = connectable$1;
	
	return connectable;
}

var forkJoin = {};

var hasRequiredForkJoin;

function requireForkJoin () {
	if (hasRequiredForkJoin) return forkJoin;
	hasRequiredForkJoin = 1;
	Object.defineProperty(forkJoin, "__esModule", { value: true });
	forkJoin.forkJoin = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var argsArgArrayOrObject_1 = /*@__PURE__*/ requireArgsArgArrayOrObject();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var args_1 = /*@__PURE__*/ requireArgs();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var mapOneOrManyArgs_1 = /*@__PURE__*/ requireMapOneOrManyArgs();
	var createObject_1 = /*@__PURE__*/ requireCreateObject();
	function forkJoin$1() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var resultSelector = args_1.popResultSelector(args);
	    var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), sources = _a.args, keys = _a.keys;
	    var result = new Observable_1.Observable(function (subscriber) {
	        var length = sources.length;
	        if (!length) {
	            subscriber.complete();
	            return;
	        }
	        var values = new Array(length);
	        var remainingCompletions = length;
	        var remainingEmissions = length;
	        var _loop_1 = function (sourceIndex) {
	            var hasValue = false;
	            innerFrom_1.innerFrom(sources[sourceIndex]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                if (!hasValue) {
	                    hasValue = true;
	                    remainingEmissions--;
	                }
	                values[sourceIndex] = value;
	            }, function () { return remainingCompletions--; }, undefined, function () {
	                if (!remainingCompletions || !hasValue) {
	                    if (!remainingEmissions) {
	                        subscriber.next(keys ? createObject_1.createObject(keys, values) : values);
	                    }
	                    subscriber.complete();
	                }
	            }));
	        };
	        for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
	            _loop_1(sourceIndex);
	        }
	    });
	    return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
	}
	forkJoin.forkJoin = forkJoin$1;
	
	return forkJoin;
}

var fromEvent = {};

var hasRequiredFromEvent;

function requireFromEvent () {
	if (hasRequiredFromEvent) return fromEvent;
	hasRequiredFromEvent = 1;
	var __read = (fromEvent && fromEvent.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	Object.defineProperty(fromEvent, "__esModule", { value: true });
	fromEvent.fromEvent = void 0;
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var mergeMap_1 = /*@__PURE__*/ requireMergeMap();
	var isArrayLike_1 = /*@__PURE__*/ requireIsArrayLike();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	var mapOneOrManyArgs_1 = /*@__PURE__*/ requireMapOneOrManyArgs();
	var nodeEventEmitterMethods = ['addListener', 'removeListener'];
	var eventTargetMethods = ['addEventListener', 'removeEventListener'];
	var jqueryMethods = ['on', 'off'];
	function fromEvent$1(target, eventName, options, resultSelector) {
	    if (isFunction_1.isFunction(options)) {
	        resultSelector = options;
	        options = undefined;
	    }
	    if (resultSelector) {
	        return fromEvent$1(target, eventName, options).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
	    }
	    var _a = __read(isEventTarget(target)
	        ? eventTargetMethods.map(function (methodName) { return function (handler) { return target[methodName](eventName, handler, options); }; })
	        :
	            isNodeStyleEventEmitter(target)
	                ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
	                : isJQueryStyleEventEmitter(target)
	                    ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
	                    : [], 2), add = _a[0], remove = _a[1];
	    if (!add) {
	        if (isArrayLike_1.isArrayLike(target)) {
	            return mergeMap_1.mergeMap(function (subTarget) { return fromEvent$1(subTarget, eventName, options); })(innerFrom_1.innerFrom(target));
	        }
	    }
	    if (!add) {
	        throw new TypeError('Invalid event target');
	    }
	    return new Observable_1.Observable(function (subscriber) {
	        var handler = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            return subscriber.next(1 < args.length ? args : args[0]);
	        };
	        add(handler);
	        return function () { return remove(handler); };
	    });
	}
	fromEvent.fromEvent = fromEvent$1;
	function toCommonHandlerRegistry(target, eventName) {
	    return function (methodName) { return function (handler) { return target[methodName](eventName, handler); }; };
	}
	function isNodeStyleEventEmitter(target) {
	    return isFunction_1.isFunction(target.addListener) && isFunction_1.isFunction(target.removeListener);
	}
	function isJQueryStyleEventEmitter(target) {
	    return isFunction_1.isFunction(target.on) && isFunction_1.isFunction(target.off);
	}
	function isEventTarget(target) {
	    return isFunction_1.isFunction(target.addEventListener) && isFunction_1.isFunction(target.removeEventListener);
	}
	
	return fromEvent;
}

var fromEventPattern = {};

var hasRequiredFromEventPattern;

function requireFromEventPattern () {
	if (hasRequiredFromEventPattern) return fromEventPattern;
	hasRequiredFromEventPattern = 1;
	Object.defineProperty(fromEventPattern, "__esModule", { value: true });
	fromEventPattern.fromEventPattern = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	var mapOneOrManyArgs_1 = /*@__PURE__*/ requireMapOneOrManyArgs();
	function fromEventPattern$1(addHandler, removeHandler, resultSelector) {
	    if (resultSelector) {
	        return fromEventPattern$1(addHandler, removeHandler).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
	    }
	    return new Observable_1.Observable(function (subscriber) {
	        var handler = function () {
	            var e = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                e[_i] = arguments[_i];
	            }
	            return subscriber.next(e.length === 1 ? e[0] : e);
	        };
	        var retValue = addHandler(handler);
	        return isFunction_1.isFunction(removeHandler) ? function () { return removeHandler(handler, retValue); } : undefined;
	    });
	}
	fromEventPattern.fromEventPattern = fromEventPattern$1;
	
	return fromEventPattern;
}

var generate = {};

var hasRequiredGenerate;

function requireGenerate () {
	if (hasRequiredGenerate) return generate;
	hasRequiredGenerate = 1;
	var __generator = (generate && generate.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(generate, "__esModule", { value: true });
	generate.generate = void 0;
	var identity_1 = /*@__PURE__*/ requireIdentity();
	var isScheduler_1 = /*@__PURE__*/ requireIsScheduler();
	var defer_1 = /*@__PURE__*/ requireDefer();
	var scheduleIterable_1 = /*@__PURE__*/ requireScheduleIterable();
	function generate$1(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
	    var _a, _b;
	    var resultSelector;
	    var initialState;
	    if (arguments.length === 1) {
	        (_a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? identity_1.identity : _b, scheduler = _a.scheduler);
	    }
	    else {
	        initialState = initialStateOrOptions;
	        if (!resultSelectorOrScheduler || isScheduler_1.isScheduler(resultSelectorOrScheduler)) {
	            resultSelector = identity_1.identity;
	            scheduler = resultSelectorOrScheduler;
	        }
	        else {
	            resultSelector = resultSelectorOrScheduler;
	        }
	    }
	    function gen() {
	        var state;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    state = initialState;
	                    _a.label = 1;
	                case 1:
	                    if (!(!condition || condition(state))) return [3, 4];
	                    return [4, resultSelector(state)];
	                case 2:
	                    _a.sent();
	                    _a.label = 3;
	                case 3:
	                    state = iterate(state);
	                    return [3, 1];
	                case 4: return [2];
	            }
	        });
	    }
	    return defer_1.defer((scheduler
	        ?
	            function () { return scheduleIterable_1.scheduleIterable(gen(), scheduler); }
	        :
	            gen));
	}
	generate.generate = generate$1;
	
	return generate;
}

var iif = {};

var hasRequiredIif;

function requireIif () {
	if (hasRequiredIif) return iif;
	hasRequiredIif = 1;
	Object.defineProperty(iif, "__esModule", { value: true });
	iif.iif = void 0;
	var defer_1 = /*@__PURE__*/ requireDefer();
	function iif$1(condition, trueResult, falseResult) {
	    return defer_1.defer(function () { return (condition() ? trueResult : falseResult); });
	}
	iif.iif = iif$1;
	
	return iif;
}

var interval = {};

var timer = {};

var hasRequiredTimer;

function requireTimer () {
	if (hasRequiredTimer) return timer;
	hasRequiredTimer = 1;
	Object.defineProperty(timer, "__esModule", { value: true });
	timer.timer = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var async_1 = /*@__PURE__*/ requireAsync();
	var isScheduler_1 = /*@__PURE__*/ requireIsScheduler();
	var isDate_1 = /*@__PURE__*/ requireIsDate();
	function timer$1(dueTime, intervalOrScheduler, scheduler) {
	    if (dueTime === void 0) { dueTime = 0; }
	    if (scheduler === void 0) { scheduler = async_1.async; }
	    var intervalDuration = -1;
	    if (intervalOrScheduler != null) {
	        if (isScheduler_1.isScheduler(intervalOrScheduler)) {
	            scheduler = intervalOrScheduler;
	        }
	        else {
	            intervalDuration = intervalOrScheduler;
	        }
	    }
	    return new Observable_1.Observable(function (subscriber) {
	        var due = isDate_1.isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
	        if (due < 0) {
	            due = 0;
	        }
	        var n = 0;
	        return scheduler.schedule(function () {
	            if (!subscriber.closed) {
	                subscriber.next(n++);
	                if (0 <= intervalDuration) {
	                    this.schedule(undefined, intervalDuration);
	                }
	                else {
	                    subscriber.complete();
	                }
	            }
	        }, due);
	    });
	}
	timer.timer = timer$1;
	
	return timer;
}

var hasRequiredInterval;

function requireInterval () {
	if (hasRequiredInterval) return interval;
	hasRequiredInterval = 1;
	Object.defineProperty(interval, "__esModule", { value: true });
	interval.interval = void 0;
	var async_1 = /*@__PURE__*/ requireAsync();
	var timer_1 = /*@__PURE__*/ requireTimer();
	function interval$1(period, scheduler) {
	    if (period === void 0) { period = 0; }
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    if (period < 0) {
	        period = 0;
	    }
	    return timer_1.timer(period, period, scheduler);
	}
	interval.interval = interval$1;
	
	return interval;
}

var merge$1 = {};

var hasRequiredMerge$1;

function requireMerge$1 () {
	if (hasRequiredMerge$1) return merge$1;
	hasRequiredMerge$1 = 1;
	Object.defineProperty(merge$1, "__esModule", { value: true });
	merge$1.merge = void 0;
	var mergeAll_1 = /*@__PURE__*/ requireMergeAll();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var empty_1 = /*@__PURE__*/ requireEmpty();
	var args_1 = /*@__PURE__*/ requireArgs();
	var from_1 = /*@__PURE__*/ requireFrom();
	function merge() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var scheduler = args_1.popScheduler(args);
	    var concurrent = args_1.popNumber(args, Infinity);
	    var sources = args;
	    return !sources.length
	        ?
	            empty_1.EMPTY
	        : sources.length === 1
	            ?
	                innerFrom_1.innerFrom(sources[0])
	            :
	                mergeAll_1.mergeAll(concurrent)(from_1.from(sources, scheduler));
	}
	merge$1.merge = merge;
	
	return merge$1;
}

var never = {};

var hasRequiredNever;

function requireNever () {
	if (hasRequiredNever) return never;
	hasRequiredNever = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.never = exports.NEVER = void 0;
		var Observable_1 = /*@__PURE__*/ requireObservable();
		var noop_1 = /*@__PURE__*/ requireNoop();
		exports.NEVER = new Observable_1.Observable(noop_1.noop);
		function never() {
		    return exports.NEVER;
		}
		exports.never = never;
		
	} (never));
	return never;
}

var onErrorResumeNext = {};

var argsOrArgArray = {};

var hasRequiredArgsOrArgArray;

function requireArgsOrArgArray () {
	if (hasRequiredArgsOrArgArray) return argsOrArgArray;
	hasRequiredArgsOrArgArray = 1;
	Object.defineProperty(argsOrArgArray, "__esModule", { value: true });
	argsOrArgArray.argsOrArgArray = void 0;
	var isArray = Array.isArray;
	function argsOrArgArray$1(args) {
	    return args.length === 1 && isArray(args[0]) ? args[0] : args;
	}
	argsOrArgArray.argsOrArgArray = argsOrArgArray$1;
	
	return argsOrArgArray;
}

var hasRequiredOnErrorResumeNext;

function requireOnErrorResumeNext () {
	if (hasRequiredOnErrorResumeNext) return onErrorResumeNext;
	hasRequiredOnErrorResumeNext = 1;
	Object.defineProperty(onErrorResumeNext, "__esModule", { value: true });
	onErrorResumeNext.onErrorResumeNext = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var argsOrArgArray_1 = /*@__PURE__*/ requireArgsOrArgArray();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var noop_1 = /*@__PURE__*/ requireNoop();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function onErrorResumeNext$1() {
	    var sources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        sources[_i] = arguments[_i];
	    }
	    var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
	    return new Observable_1.Observable(function (subscriber) {
	        var sourceIndex = 0;
	        var subscribeNext = function () {
	            if (sourceIndex < nextSources.length) {
	                var nextSource = void 0;
	                try {
	                    nextSource = innerFrom_1.innerFrom(nextSources[sourceIndex++]);
	                }
	                catch (err) {
	                    subscribeNext();
	                    return;
	                }
	                var innerSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, noop_1.noop, noop_1.noop);
	                nextSource.subscribe(innerSubscriber);
	                innerSubscriber.add(subscribeNext);
	            }
	            else {
	                subscriber.complete();
	            }
	        };
	        subscribeNext();
	    });
	}
	onErrorResumeNext.onErrorResumeNext = onErrorResumeNext$1;
	
	return onErrorResumeNext;
}

var pairs = {};

var hasRequiredPairs;

function requirePairs () {
	if (hasRequiredPairs) return pairs;
	hasRequiredPairs = 1;
	Object.defineProperty(pairs, "__esModule", { value: true });
	pairs.pairs = void 0;
	var from_1 = /*@__PURE__*/ requireFrom();
	function pairs$1(obj, scheduler) {
	    return from_1.from(Object.entries(obj), scheduler);
	}
	pairs.pairs = pairs$1;
	
	return pairs;
}

var partition$1 = {};

var not = {};

var hasRequiredNot;

function requireNot () {
	if (hasRequiredNot) return not;
	hasRequiredNot = 1;
	Object.defineProperty(not, "__esModule", { value: true });
	not.not = void 0;
	function not$1(pred, thisArg) {
	    return function (value, index) { return !pred.call(thisArg, value, index); };
	}
	not.not = not$1;
	
	return not;
}

var filter = {};

var hasRequiredFilter;

function requireFilter () {
	if (hasRequiredFilter) return filter;
	hasRequiredFilter = 1;
	Object.defineProperty(filter, "__esModule", { value: true });
	filter.filter = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function filter$1(predicate, thisArg) {
	    return lift_1.operate(function (source, subscriber) {
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
	    });
	}
	filter.filter = filter$1;
	
	return filter;
}

var hasRequiredPartition$1;

function requirePartition$1 () {
	if (hasRequiredPartition$1) return partition$1;
	hasRequiredPartition$1 = 1;
	Object.defineProperty(partition$1, "__esModule", { value: true });
	partition$1.partition = void 0;
	var not_1 = /*@__PURE__*/ requireNot();
	var filter_1 = /*@__PURE__*/ requireFilter();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function partition(source, predicate, thisArg) {
	    return [filter_1.filter(predicate, thisArg)(innerFrom_1.innerFrom(source)), filter_1.filter(not_1.not(predicate, thisArg))(innerFrom_1.innerFrom(source))];
	}
	partition$1.partition = partition;
	
	return partition$1;
}

var race$1 = {};

var hasRequiredRace$1;

function requireRace$1 () {
	if (hasRequiredRace$1) return race$1;
	hasRequiredRace$1 = 1;
	Object.defineProperty(race$1, "__esModule", { value: true });
	race$1.raceInit = race$1.race = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var argsOrArgArray_1 = /*@__PURE__*/ requireArgsOrArgArray();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function race() {
	    var sources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        sources[_i] = arguments[_i];
	    }
	    sources = argsOrArgArray_1.argsOrArgArray(sources);
	    return sources.length === 1 ? innerFrom_1.innerFrom(sources[0]) : new Observable_1.Observable(raceInit(sources));
	}
	race$1.race = race;
	function raceInit(sources) {
	    return function (subscriber) {
	        var subscriptions = [];
	        var _loop_1 = function (i) {
	            subscriptions.push(innerFrom_1.innerFrom(sources[i]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                if (subscriptions) {
	                    for (var s = 0; s < subscriptions.length; s++) {
	                        s !== i && subscriptions[s].unsubscribe();
	                    }
	                    subscriptions = null;
	                }
	                subscriber.next(value);
	            })));
	        };
	        for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
	            _loop_1(i);
	        }
	    };
	}
	race$1.raceInit = raceInit;
	
	return race$1;
}

var range = {};

var hasRequiredRange;

function requireRange () {
	if (hasRequiredRange) return range;
	hasRequiredRange = 1;
	Object.defineProperty(range, "__esModule", { value: true });
	range.range = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var empty_1 = /*@__PURE__*/ requireEmpty();
	function range$1(start, count, scheduler) {
	    if (count == null) {
	        count = start;
	        start = 0;
	    }
	    if (count <= 0) {
	        return empty_1.EMPTY;
	    }
	    var end = count + start;
	    return new Observable_1.Observable(scheduler
	        ?
	            function (subscriber) {
	                var n = start;
	                return scheduler.schedule(function () {
	                    if (n < end) {
	                        subscriber.next(n++);
	                        this.schedule();
	                    }
	                    else {
	                        subscriber.complete();
	                    }
	                });
	            }
	        :
	            function (subscriber) {
	                var n = start;
	                while (n < end && !subscriber.closed) {
	                    subscriber.next(n++);
	                }
	                subscriber.complete();
	            });
	}
	range.range = range$1;
	
	return range;
}

var using = {};

var hasRequiredUsing;

function requireUsing () {
	if (hasRequiredUsing) return using;
	hasRequiredUsing = 1;
	Object.defineProperty(using, "__esModule", { value: true });
	using.using = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var empty_1 = /*@__PURE__*/ requireEmpty();
	function using$1(resourceFactory, observableFactory) {
	    return new Observable_1.Observable(function (subscriber) {
	        var resource = resourceFactory();
	        var result = observableFactory(resource);
	        var source = result ? innerFrom_1.innerFrom(result) : empty_1.EMPTY;
	        source.subscribe(subscriber);
	        return function () {
	            if (resource) {
	                resource.unsubscribe();
	            }
	        };
	    });
	}
	using.using = using$1;
	
	return using;
}

var zip$1 = {};

var hasRequiredZip$1;

function requireZip$1 () {
	if (hasRequiredZip$1) return zip$1;
	hasRequiredZip$1 = 1;
	var __read = (zip$1 && zip$1.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (zip$1 && zip$1.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(zip$1, "__esModule", { value: true });
	zip$1.zip = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var argsOrArgArray_1 = /*@__PURE__*/ requireArgsOrArgArray();
	var empty_1 = /*@__PURE__*/ requireEmpty();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var args_1 = /*@__PURE__*/ requireArgs();
	function zip() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var resultSelector = args_1.popResultSelector(args);
	    var sources = argsOrArgArray_1.argsOrArgArray(args);
	    return sources.length
	        ? new Observable_1.Observable(function (subscriber) {
	            var buffers = sources.map(function () { return []; });
	            var completed = sources.map(function () { return false; });
	            subscriber.add(function () {
	                buffers = completed = null;
	            });
	            var _loop_1 = function (sourceIndex) {
	                innerFrom_1.innerFrom(sources[sourceIndex]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                    buffers[sourceIndex].push(value);
	                    if (buffers.every(function (buffer) { return buffer.length; })) {
	                        var result = buffers.map(function (buffer) { return buffer.shift(); });
	                        subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray([], __read(result))) : result);
	                        if (buffers.some(function (buffer, i) { return !buffer.length && completed[i]; })) {
	                            subscriber.complete();
	                        }
	                    }
	                }, function () {
	                    completed[sourceIndex] = true;
	                    !buffers[sourceIndex].length && subscriber.complete();
	                }));
	            };
	            for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
	                _loop_1(sourceIndex);
	            }
	            return function () {
	                buffers = completed = null;
	            };
	        })
	        : empty_1.EMPTY;
	}
	zip$1.zip = zip;
	
	return zip$1;
}

var types = {};

var hasRequiredTypes;

function requireTypes () {
	if (hasRequiredTypes) return types;
	hasRequiredTypes = 1;
	Object.defineProperty(types, "__esModule", { value: true });
	
	return types;
}

var audit = {};

var hasRequiredAudit;

function requireAudit () {
	if (hasRequiredAudit) return audit;
	hasRequiredAudit = 1;
	Object.defineProperty(audit, "__esModule", { value: true });
	audit.audit = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function audit$1(durationSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var hasValue = false;
	        var lastValue = null;
	        var durationSubscriber = null;
	        var isComplete = false;
	        var endDuration = function () {
	            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
	            durationSubscriber = null;
	            if (hasValue) {
	                hasValue = false;
	                var value = lastValue;
	                lastValue = null;
	                subscriber.next(value);
	            }
	            isComplete && subscriber.complete();
	        };
	        var cleanupDuration = function () {
	            durationSubscriber = null;
	            isComplete && subscriber.complete();
	        };
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            hasValue = true;
	            lastValue = value;
	            if (!durationSubscriber) {
	                innerFrom_1.innerFrom(durationSelector(value)).subscribe((durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, endDuration, cleanupDuration)));
	            }
	        }, function () {
	            isComplete = true;
	            (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
	        }));
	    });
	}
	audit.audit = audit$1;
	
	return audit;
}

var auditTime = {};

var hasRequiredAuditTime;

function requireAuditTime () {
	if (hasRequiredAuditTime) return auditTime;
	hasRequiredAuditTime = 1;
	Object.defineProperty(auditTime, "__esModule", { value: true });
	auditTime.auditTime = void 0;
	var async_1 = /*@__PURE__*/ requireAsync();
	var audit_1 = /*@__PURE__*/ requireAudit();
	var timer_1 = /*@__PURE__*/ requireTimer();
	function auditTime$1(duration, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    return audit_1.audit(function () { return timer_1.timer(duration, scheduler); });
	}
	auditTime.auditTime = auditTime$1;
	
	return auditTime;
}

var buffer = {};

var hasRequiredBuffer;

function requireBuffer () {
	if (hasRequiredBuffer) return buffer;
	hasRequiredBuffer = 1;
	Object.defineProperty(buffer, "__esModule", { value: true });
	buffer.buffer = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var noop_1 = /*@__PURE__*/ requireNoop();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function buffer$1(closingNotifier) {
	    return lift_1.operate(function (source, subscriber) {
	        var currentBuffer = [];
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return currentBuffer.push(value); }, function () {
	            subscriber.next(currentBuffer);
	            subscriber.complete();
	        }));
	        innerFrom_1.innerFrom(closingNotifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	            var b = currentBuffer;
	            currentBuffer = [];
	            subscriber.next(b);
	        }, noop_1.noop));
	        return function () {
	            currentBuffer = null;
	        };
	    });
	}
	buffer.buffer = buffer$1;
	
	return buffer;
}

var bufferCount = {};

var hasRequiredBufferCount;

function requireBufferCount () {
	if (hasRequiredBufferCount) return bufferCount;
	hasRequiredBufferCount = 1;
	var __values = (bufferCount && bufferCount.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(bufferCount, "__esModule", { value: true });
	bufferCount.bufferCount = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var arrRemove_1 = /*@__PURE__*/ requireArrRemove();
	function bufferCount$1(bufferSize, startBufferEvery) {
	    if (startBufferEvery === void 0) { startBufferEvery = null; }
	    startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
	    return lift_1.operate(function (source, subscriber) {
	        var buffers = [];
	        var count = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var e_1, _a, e_2, _b;
	            var toEmit = null;
	            if (count++ % startBufferEvery === 0) {
	                buffers.push([]);
	            }
	            try {
	                for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
	                    var buffer = buffers_1_1.value;
	                    buffer.push(value);
	                    if (bufferSize <= buffer.length) {
	                        toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
	                        toEmit.push(buffer);
	                    }
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	            if (toEmit) {
	                try {
	                    for (var toEmit_1 = __values(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
	                        var buffer = toEmit_1_1.value;
	                        arrRemove_1.arrRemove(buffers, buffer);
	                        subscriber.next(buffer);
	                    }
	                }
	                catch (e_2_1) { e_2 = { error: e_2_1 }; }
	                finally {
	                    try {
	                        if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
	                    }
	                    finally { if (e_2) throw e_2.error; }
	                }
	            }
	        }, function () {
	            var e_3, _a;
	            try {
	                for (var buffers_2 = __values(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
	                    var buffer = buffers_2_1.value;
	                    subscriber.next(buffer);
	                }
	            }
	            catch (e_3_1) { e_3 = { error: e_3_1 }; }
	            finally {
	                try {
	                    if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
	                }
	                finally { if (e_3) throw e_3.error; }
	            }
	            subscriber.complete();
	        }, undefined, function () {
	            buffers = null;
	        }));
	    });
	}
	bufferCount.bufferCount = bufferCount$1;
	
	return bufferCount;
}

var bufferTime = {};

var hasRequiredBufferTime;

function requireBufferTime () {
	if (hasRequiredBufferTime) return bufferTime;
	hasRequiredBufferTime = 1;
	var __values = (bufferTime && bufferTime.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(bufferTime, "__esModule", { value: true });
	bufferTime.bufferTime = void 0;
	var Subscription_1 = /*@__PURE__*/ requireSubscription();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var arrRemove_1 = /*@__PURE__*/ requireArrRemove();
	var async_1 = /*@__PURE__*/ requireAsync();
	var args_1 = /*@__PURE__*/ requireArgs();
	var executeSchedule_1 = /*@__PURE__*/ requireExecuteSchedule();
	function bufferTime$1(bufferTimeSpan) {
	    var _a, _b;
	    var otherArgs = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        otherArgs[_i - 1] = arguments[_i];
	    }
	    var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
	    var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
	    var maxBufferSize = otherArgs[1] || Infinity;
	    return lift_1.operate(function (source, subscriber) {
	        var bufferRecords = [];
	        var restartOnEmit = false;
	        var emit = function (record) {
	            var buffer = record.buffer, subs = record.subs;
	            subs.unsubscribe();
	            arrRemove_1.arrRemove(bufferRecords, record);
	            subscriber.next(buffer);
	            restartOnEmit && startBuffer();
	        };
	        var startBuffer = function () {
	            if (bufferRecords) {
	                var subs = new Subscription_1.Subscription();
	                subscriber.add(subs);
	                var buffer = [];
	                var record_1 = {
	                    buffer: buffer,
	                    subs: subs,
	                };
	                bufferRecords.push(record_1);
	                executeSchedule_1.executeSchedule(subs, scheduler, function () { return emit(record_1); }, bufferTimeSpan);
	            }
	        };
	        if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
	            executeSchedule_1.executeSchedule(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
	        }
	        else {
	            restartOnEmit = true;
	        }
	        startBuffer();
	        var bufferTimeSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var e_1, _a;
	            var recordsCopy = bufferRecords.slice();
	            try {
	                for (var recordsCopy_1 = __values(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
	                    var record = recordsCopy_1_1.value;
	                    var buffer = record.buffer;
	                    buffer.push(value);
	                    maxBufferSize <= buffer.length && emit(record);
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a = recordsCopy_1.return)) _a.call(recordsCopy_1);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	        }, function () {
	            while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
	                subscriber.next(bufferRecords.shift().buffer);
	            }
	            bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
	            subscriber.complete();
	            subscriber.unsubscribe();
	        }, undefined, function () { return (bufferRecords = null); });
	        source.subscribe(bufferTimeSubscriber);
	    });
	}
	bufferTime.bufferTime = bufferTime$1;
	
	return bufferTime;
}

var bufferToggle = {};

var hasRequiredBufferToggle;

function requireBufferToggle () {
	if (hasRequiredBufferToggle) return bufferToggle;
	hasRequiredBufferToggle = 1;
	var __values = (bufferToggle && bufferToggle.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(bufferToggle, "__esModule", { value: true });
	bufferToggle.bufferToggle = void 0;
	var Subscription_1 = /*@__PURE__*/ requireSubscription();
	var lift_1 = /*@__PURE__*/ requireLift();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var noop_1 = /*@__PURE__*/ requireNoop();
	var arrRemove_1 = /*@__PURE__*/ requireArrRemove();
	function bufferToggle$1(openings, closingSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var buffers = [];
	        innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (openValue) {
	            var buffer = [];
	            buffers.push(buffer);
	            var closingSubscription = new Subscription_1.Subscription();
	            var emitBuffer = function () {
	                arrRemove_1.arrRemove(buffers, buffer);
	                subscriber.next(buffer);
	                closingSubscription.unsubscribe();
	            };
	            closingSubscription.add(innerFrom_1.innerFrom(closingSelector(openValue)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, emitBuffer, noop_1.noop)));
	        }, noop_1.noop));
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var e_1, _a;
	            try {
	                for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
	                    var buffer = buffers_1_1.value;
	                    buffer.push(value);
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	        }, function () {
	            while (buffers.length > 0) {
	                subscriber.next(buffers.shift());
	            }
	            subscriber.complete();
	        }));
	    });
	}
	bufferToggle.bufferToggle = bufferToggle$1;
	
	return bufferToggle;
}

var bufferWhen = {};

var hasRequiredBufferWhen;

function requireBufferWhen () {
	if (hasRequiredBufferWhen) return bufferWhen;
	hasRequiredBufferWhen = 1;
	Object.defineProperty(bufferWhen, "__esModule", { value: true });
	bufferWhen.bufferWhen = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var noop_1 = /*@__PURE__*/ requireNoop();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function bufferWhen$1(closingSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var buffer = null;
	        var closingSubscriber = null;
	        var openBuffer = function () {
	            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
	            var b = buffer;
	            buffer = [];
	            b && subscriber.next(b);
	            innerFrom_1.innerFrom(closingSelector()).subscribe((closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openBuffer, noop_1.noop)));
	        };
	        openBuffer();
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return buffer === null || buffer === void 0 ? void 0 : buffer.push(value); }, function () {
	            buffer && subscriber.next(buffer);
	            subscriber.complete();
	        }, undefined, function () { return (buffer = closingSubscriber = null); }));
	    });
	}
	bufferWhen.bufferWhen = bufferWhen$1;
	
	return bufferWhen;
}

var catchError = {};

var hasRequiredCatchError;

function requireCatchError () {
	if (hasRequiredCatchError) return catchError;
	hasRequiredCatchError = 1;
	Object.defineProperty(catchError, "__esModule", { value: true });
	catchError.catchError = void 0;
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var lift_1 = /*@__PURE__*/ requireLift();
	function catchError$1(selector) {
	    return lift_1.operate(function (source, subscriber) {
	        var innerSub = null;
	        var syncUnsub = false;
	        var handledResult;
	        innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, undefined, function (err) {
	            handledResult = innerFrom_1.innerFrom(selector(err, catchError$1(selector)(source)));
	            if (innerSub) {
	                innerSub.unsubscribe();
	                innerSub = null;
	                handledResult.subscribe(subscriber);
	            }
	            else {
	                syncUnsub = true;
	            }
	        }));
	        if (syncUnsub) {
	            innerSub.unsubscribe();
	            innerSub = null;
	            handledResult.subscribe(subscriber);
	        }
	    });
	}
	catchError.catchError = catchError$1;
	
	return catchError;
}

var combineAll = {};

var combineLatestAll = {};

var joinAllInternals = {};

var toArray = {};

var reduce = {};

var scanInternals = {};

var hasRequiredScanInternals;

function requireScanInternals () {
	if (hasRequiredScanInternals) return scanInternals;
	hasRequiredScanInternals = 1;
	Object.defineProperty(scanInternals, "__esModule", { value: true });
	scanInternals.scanInternals = void 0;
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function scanInternals$1(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
	    return function (source, subscriber) {
	        var hasState = hasSeed;
	        var state = seed;
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var i = index++;
	            state = hasState
	                ?
	                    accumulator(state, value, i)
	                :
	                    ((hasState = true), value);
	            emitOnNext && subscriber.next(state);
	        }, emitBeforeComplete &&
	            (function () {
	                hasState && subscriber.next(state);
	                subscriber.complete();
	            })));
	    };
	}
	scanInternals.scanInternals = scanInternals$1;
	
	return scanInternals;
}

var hasRequiredReduce;

function requireReduce () {
	if (hasRequiredReduce) return reduce;
	hasRequiredReduce = 1;
	Object.defineProperty(reduce, "__esModule", { value: true });
	reduce.reduce = void 0;
	var scanInternals_1 = /*@__PURE__*/ requireScanInternals();
	var lift_1 = /*@__PURE__*/ requireLift();
	function reduce$1(accumulator, seed) {
	    return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, false, true));
	}
	reduce.reduce = reduce$1;
	
	return reduce;
}

var hasRequiredToArray;

function requireToArray () {
	if (hasRequiredToArray) return toArray;
	hasRequiredToArray = 1;
	Object.defineProperty(toArray, "__esModule", { value: true });
	toArray.toArray = void 0;
	var reduce_1 = /*@__PURE__*/ requireReduce();
	var lift_1 = /*@__PURE__*/ requireLift();
	var arrReducer = function (arr, value) { return (arr.push(value), arr); };
	function toArray$1() {
	    return lift_1.operate(function (source, subscriber) {
	        reduce_1.reduce(arrReducer, [])(source).subscribe(subscriber);
	    });
	}
	toArray.toArray = toArray$1;
	
	return toArray;
}

var hasRequiredJoinAllInternals;

function requireJoinAllInternals () {
	if (hasRequiredJoinAllInternals) return joinAllInternals;
	hasRequiredJoinAllInternals = 1;
	Object.defineProperty(joinAllInternals, "__esModule", { value: true });
	joinAllInternals.joinAllInternals = void 0;
	var identity_1 = /*@__PURE__*/ requireIdentity();
	var mapOneOrManyArgs_1 = /*@__PURE__*/ requireMapOneOrManyArgs();
	var pipe_1 = /*@__PURE__*/ requirePipe();
	var mergeMap_1 = /*@__PURE__*/ requireMergeMap();
	var toArray_1 = /*@__PURE__*/ requireToArray();
	function joinAllInternals$1(joinFn, project) {
	    return pipe_1.pipe(toArray_1.toArray(), mergeMap_1.mergeMap(function (sources) { return joinFn(sources); }), project ? mapOneOrManyArgs_1.mapOneOrManyArgs(project) : identity_1.identity);
	}
	joinAllInternals.joinAllInternals = joinAllInternals$1;
	
	return joinAllInternals;
}

var hasRequiredCombineLatestAll;

function requireCombineLatestAll () {
	if (hasRequiredCombineLatestAll) return combineLatestAll;
	hasRequiredCombineLatestAll = 1;
	Object.defineProperty(combineLatestAll, "__esModule", { value: true });
	combineLatestAll.combineLatestAll = void 0;
	var combineLatest_1 = /*@__PURE__*/ requireCombineLatest$1();
	var joinAllInternals_1 = /*@__PURE__*/ requireJoinAllInternals();
	function combineLatestAll$1(project) {
	    return joinAllInternals_1.joinAllInternals(combineLatest_1.combineLatest, project);
	}
	combineLatestAll.combineLatestAll = combineLatestAll$1;
	
	return combineLatestAll;
}

var hasRequiredCombineAll;

function requireCombineAll () {
	if (hasRequiredCombineAll) return combineAll;
	hasRequiredCombineAll = 1;
	Object.defineProperty(combineAll, "__esModule", { value: true });
	combineAll.combineAll = void 0;
	var combineLatestAll_1 = /*@__PURE__*/ requireCombineLatestAll();
	combineAll.combineAll = combineLatestAll_1.combineLatestAll;
	
	return combineAll;
}

var combineLatestWith = {};

var combineLatest = {};

var hasRequiredCombineLatest;

function requireCombineLatest () {
	if (hasRequiredCombineLatest) return combineLatest;
	hasRequiredCombineLatest = 1;
	var __read = (combineLatest && combineLatest.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (combineLatest && combineLatest.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(combineLatest, "__esModule", { value: true });
	combineLatest.combineLatest = void 0;
	var combineLatest_1 = /*@__PURE__*/ requireCombineLatest$1();
	var lift_1 = /*@__PURE__*/ requireLift();
	var argsOrArgArray_1 = /*@__PURE__*/ requireArgsOrArgArray();
	var mapOneOrManyArgs_1 = /*@__PURE__*/ requireMapOneOrManyArgs();
	var pipe_1 = /*@__PURE__*/ requirePipe();
	var args_1 = /*@__PURE__*/ requireArgs();
	function combineLatest$1() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var resultSelector = args_1.popResultSelector(args);
	    return resultSelector
	        ? pipe_1.pipe(combineLatest$1.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector))
	        : lift_1.operate(function (source, subscriber) {
	            combineLatest_1.combineLatestInit(__spreadArray([source], __read(argsOrArgArray_1.argsOrArgArray(args))))(subscriber);
	        });
	}
	combineLatest.combineLatest = combineLatest$1;
	
	return combineLatest;
}

var hasRequiredCombineLatestWith;

function requireCombineLatestWith () {
	if (hasRequiredCombineLatestWith) return combineLatestWith;
	hasRequiredCombineLatestWith = 1;
	var __read = (combineLatestWith && combineLatestWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (combineLatestWith && combineLatestWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(combineLatestWith, "__esModule", { value: true });
	combineLatestWith.combineLatestWith = void 0;
	var combineLatest_1 = /*@__PURE__*/ requireCombineLatest();
	function combineLatestWith$1() {
	    var otherSources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        otherSources[_i] = arguments[_i];
	    }
	    return combineLatest_1.combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
	}
	combineLatestWith.combineLatestWith = combineLatestWith$1;
	
	return combineLatestWith;
}

var concatMap = {};

var hasRequiredConcatMap;

function requireConcatMap () {
	if (hasRequiredConcatMap) return concatMap;
	hasRequiredConcatMap = 1;
	Object.defineProperty(concatMap, "__esModule", { value: true });
	concatMap.concatMap = void 0;
	var mergeMap_1 = /*@__PURE__*/ requireMergeMap();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function concatMap$1(project, resultSelector) {
	    return isFunction_1.isFunction(resultSelector) ? mergeMap_1.mergeMap(project, resultSelector, 1) : mergeMap_1.mergeMap(project, 1);
	}
	concatMap.concatMap = concatMap$1;
	
	return concatMap;
}

var concatMapTo = {};

var hasRequiredConcatMapTo;

function requireConcatMapTo () {
	if (hasRequiredConcatMapTo) return concatMapTo;
	hasRequiredConcatMapTo = 1;
	Object.defineProperty(concatMapTo, "__esModule", { value: true });
	concatMapTo.concatMapTo = void 0;
	var concatMap_1 = /*@__PURE__*/ requireConcatMap();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function concatMapTo$1(innerObservable, resultSelector) {
	    return isFunction_1.isFunction(resultSelector) ? concatMap_1.concatMap(function () { return innerObservable; }, resultSelector) : concatMap_1.concatMap(function () { return innerObservable; });
	}
	concatMapTo.concatMapTo = concatMapTo$1;
	
	return concatMapTo;
}

var concatWith = {};

var concat = {};

var hasRequiredConcat;

function requireConcat () {
	if (hasRequiredConcat) return concat;
	hasRequiredConcat = 1;
	var __read = (concat && concat.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (concat && concat.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(concat, "__esModule", { value: true });
	concat.concat = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var concatAll_1 = /*@__PURE__*/ requireConcatAll();
	var args_1 = /*@__PURE__*/ requireArgs();
	var from_1 = /*@__PURE__*/ requireFrom();
	function concat$1() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var scheduler = args_1.popScheduler(args);
	    return lift_1.operate(function (source, subscriber) {
	        concatAll_1.concatAll()(from_1.from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
	    });
	}
	concat.concat = concat$1;
	
	return concat;
}

var hasRequiredConcatWith;

function requireConcatWith () {
	if (hasRequiredConcatWith) return concatWith;
	hasRequiredConcatWith = 1;
	var __read = (concatWith && concatWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (concatWith && concatWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(concatWith, "__esModule", { value: true });
	concatWith.concatWith = void 0;
	var concat_1 = /*@__PURE__*/ requireConcat();
	function concatWith$1() {
	    var otherSources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        otherSources[_i] = arguments[_i];
	    }
	    return concat_1.concat.apply(void 0, __spreadArray([], __read(otherSources)));
	}
	concatWith.concatWith = concatWith$1;
	
	return concatWith;
}

var connect = {};

var fromSubscribable = {};

var hasRequiredFromSubscribable;

function requireFromSubscribable () {
	if (hasRequiredFromSubscribable) return fromSubscribable;
	hasRequiredFromSubscribable = 1;
	Object.defineProperty(fromSubscribable, "__esModule", { value: true });
	fromSubscribable.fromSubscribable = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	function fromSubscribable$1(subscribable) {
	    return new Observable_1.Observable(function (subscriber) { return subscribable.subscribe(subscriber); });
	}
	fromSubscribable.fromSubscribable = fromSubscribable$1;
	
	return fromSubscribable;
}

var hasRequiredConnect;

function requireConnect () {
	if (hasRequiredConnect) return connect;
	hasRequiredConnect = 1;
	Object.defineProperty(connect, "__esModule", { value: true });
	connect.connect = void 0;
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var lift_1 = /*@__PURE__*/ requireLift();
	var fromSubscribable_1 = /*@__PURE__*/ requireFromSubscribable();
	var DEFAULT_CONFIG = {
	    connector: function () { return new Subject_1.Subject(); },
	};
	function connect$1(selector, config) {
	    if (config === void 0) { config = DEFAULT_CONFIG; }
	    var connector = config.connector;
	    return lift_1.operate(function (source, subscriber) {
	        var subject = connector();
	        innerFrom_1.innerFrom(selector(fromSubscribable_1.fromSubscribable(subject))).subscribe(subscriber);
	        subscriber.add(source.subscribe(subject));
	    });
	}
	connect.connect = connect$1;
	
	return connect;
}

var count = {};

var hasRequiredCount;

function requireCount () {
	if (hasRequiredCount) return count;
	hasRequiredCount = 1;
	Object.defineProperty(count, "__esModule", { value: true });
	count.count = void 0;
	var reduce_1 = /*@__PURE__*/ requireReduce();
	function count$1(predicate) {
	    return reduce_1.reduce(function (total, value, i) { return (!predicate || predicate(value, i) ? total + 1 : total); }, 0);
	}
	count.count = count$1;
	
	return count;
}

var debounce = {};

var hasRequiredDebounce;

function requireDebounce () {
	if (hasRequiredDebounce) return debounce;
	hasRequiredDebounce = 1;
	Object.defineProperty(debounce, "__esModule", { value: true });
	debounce.debounce = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var noop_1 = /*@__PURE__*/ requireNoop();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function debounce$1(durationSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var hasValue = false;
	        var lastValue = null;
	        var durationSubscriber = null;
	        var emit = function () {
	            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
	            durationSubscriber = null;
	            if (hasValue) {
	                hasValue = false;
	                var value = lastValue;
	                lastValue = null;
	                subscriber.next(value);
	            }
	        };
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
	            hasValue = true;
	            lastValue = value;
	            durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, emit, noop_1.noop);
	            innerFrom_1.innerFrom(durationSelector(value)).subscribe(durationSubscriber);
	        }, function () {
	            emit();
	            subscriber.complete();
	        }, undefined, function () {
	            lastValue = durationSubscriber = null;
	        }));
	    });
	}
	debounce.debounce = debounce$1;
	
	return debounce;
}

var debounceTime = {};

var hasRequiredDebounceTime;

function requireDebounceTime () {
	if (hasRequiredDebounceTime) return debounceTime;
	hasRequiredDebounceTime = 1;
	Object.defineProperty(debounceTime, "__esModule", { value: true });
	debounceTime.debounceTime = void 0;
	var async_1 = /*@__PURE__*/ requireAsync();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function debounceTime$1(dueTime, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    return lift_1.operate(function (source, subscriber) {
	        var activeTask = null;
	        var lastValue = null;
	        var lastTime = null;
	        var emit = function () {
	            if (activeTask) {
	                activeTask.unsubscribe();
	                activeTask = null;
	                var value = lastValue;
	                lastValue = null;
	                subscriber.next(value);
	            }
	        };
	        function emitWhenIdle() {
	            var targetTime = lastTime + dueTime;
	            var now = scheduler.now();
	            if (now < targetTime) {
	                activeTask = this.schedule(undefined, targetTime - now);
	                subscriber.add(activeTask);
	                return;
	            }
	            emit();
	        }
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            lastValue = value;
	            lastTime = scheduler.now();
	            if (!activeTask) {
	                activeTask = scheduler.schedule(emitWhenIdle, dueTime);
	                subscriber.add(activeTask);
	            }
	        }, function () {
	            emit();
	            subscriber.complete();
	        }, undefined, function () {
	            lastValue = activeTask = null;
	        }));
	    });
	}
	debounceTime.debounceTime = debounceTime$1;
	
	return debounceTime;
}

var defaultIfEmpty = {};

var hasRequiredDefaultIfEmpty;

function requireDefaultIfEmpty () {
	if (hasRequiredDefaultIfEmpty) return defaultIfEmpty;
	hasRequiredDefaultIfEmpty = 1;
	Object.defineProperty(defaultIfEmpty, "__esModule", { value: true });
	defaultIfEmpty.defaultIfEmpty = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function defaultIfEmpty$1(defaultValue) {
	    return lift_1.operate(function (source, subscriber) {
	        var hasValue = false;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            hasValue = true;
	            subscriber.next(value);
	        }, function () {
	            if (!hasValue) {
	                subscriber.next(defaultValue);
	            }
	            subscriber.complete();
	        }));
	    });
	}
	defaultIfEmpty.defaultIfEmpty = defaultIfEmpty$1;
	
	return defaultIfEmpty;
}

var delay = {};

var delayWhen = {};

var take = {};

var hasRequiredTake;

function requireTake () {
	if (hasRequiredTake) return take;
	hasRequiredTake = 1;
	Object.defineProperty(take, "__esModule", { value: true });
	take.take = void 0;
	var empty_1 = /*@__PURE__*/ requireEmpty();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function take$1(count) {
	    return count <= 0
	        ?
	            function () { return empty_1.EMPTY; }
	        : lift_1.operate(function (source, subscriber) {
	            var seen = 0;
	            source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                if (++seen <= count) {
	                    subscriber.next(value);
	                    if (count <= seen) {
	                        subscriber.complete();
	                    }
	                }
	            }));
	        });
	}
	take.take = take$1;
	
	return take;
}

var ignoreElements = {};

var hasRequiredIgnoreElements;

function requireIgnoreElements () {
	if (hasRequiredIgnoreElements) return ignoreElements;
	hasRequiredIgnoreElements = 1;
	Object.defineProperty(ignoreElements, "__esModule", { value: true });
	ignoreElements.ignoreElements = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var noop_1 = /*@__PURE__*/ requireNoop();
	function ignoreElements$1() {
	    return lift_1.operate(function (source, subscriber) {
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, noop_1.noop));
	    });
	}
	ignoreElements.ignoreElements = ignoreElements$1;
	
	return ignoreElements;
}

var mapTo = {};

var hasRequiredMapTo;

function requireMapTo () {
	if (hasRequiredMapTo) return mapTo;
	hasRequiredMapTo = 1;
	Object.defineProperty(mapTo, "__esModule", { value: true });
	mapTo.mapTo = void 0;
	var map_1 = /*@__PURE__*/ requireMap();
	function mapTo$1(value) {
	    return map_1.map(function () { return value; });
	}
	mapTo.mapTo = mapTo$1;
	
	return mapTo;
}

var hasRequiredDelayWhen;

function requireDelayWhen () {
	if (hasRequiredDelayWhen) return delayWhen;
	hasRequiredDelayWhen = 1;
	Object.defineProperty(delayWhen, "__esModule", { value: true });
	delayWhen.delayWhen = void 0;
	var concat_1 = /*@__PURE__*/ requireConcat$1();
	var take_1 = /*@__PURE__*/ requireTake();
	var ignoreElements_1 = /*@__PURE__*/ requireIgnoreElements();
	var mapTo_1 = /*@__PURE__*/ requireMapTo();
	var mergeMap_1 = /*@__PURE__*/ requireMergeMap();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function delayWhen$1(delayDurationSelector, subscriptionDelay) {
	    if (subscriptionDelay) {
	        return function (source) {
	            return concat_1.concat(subscriptionDelay.pipe(take_1.take(1), ignoreElements_1.ignoreElements()), source.pipe(delayWhen$1(delayDurationSelector)));
	        };
	    }
	    return mergeMap_1.mergeMap(function (value, index) { return innerFrom_1.innerFrom(delayDurationSelector(value, index)).pipe(take_1.take(1), mapTo_1.mapTo(value)); });
	}
	delayWhen.delayWhen = delayWhen$1;
	
	return delayWhen;
}

var hasRequiredDelay;

function requireDelay () {
	if (hasRequiredDelay) return delay;
	hasRequiredDelay = 1;
	Object.defineProperty(delay, "__esModule", { value: true });
	delay.delay = void 0;
	var async_1 = /*@__PURE__*/ requireAsync();
	var delayWhen_1 = /*@__PURE__*/ requireDelayWhen();
	var timer_1 = /*@__PURE__*/ requireTimer();
	function delay$1(due, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    var duration = timer_1.timer(due, scheduler);
	    return delayWhen_1.delayWhen(function () { return duration; });
	}
	delay.delay = delay$1;
	
	return delay;
}

var dematerialize = {};

var hasRequiredDematerialize;

function requireDematerialize () {
	if (hasRequiredDematerialize) return dematerialize;
	hasRequiredDematerialize = 1;
	Object.defineProperty(dematerialize, "__esModule", { value: true });
	dematerialize.dematerialize = void 0;
	var Notification_1 = /*@__PURE__*/ requireNotification();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function dematerialize$1() {
	    return lift_1.operate(function (source, subscriber) {
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (notification) { return Notification_1.observeNotification(notification, subscriber); }));
	    });
	}
	dematerialize.dematerialize = dematerialize$1;
	
	return dematerialize;
}

var distinct = {};

var hasRequiredDistinct;

function requireDistinct () {
	if (hasRequiredDistinct) return distinct;
	hasRequiredDistinct = 1;
	Object.defineProperty(distinct, "__esModule", { value: true });
	distinct.distinct = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var noop_1 = /*@__PURE__*/ requireNoop();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function distinct$1(keySelector, flushes) {
	    return lift_1.operate(function (source, subscriber) {
	        var distinctKeys = new Set();
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var key = keySelector ? keySelector(value) : value;
	            if (!distinctKeys.has(key)) {
	                distinctKeys.add(key);
	                subscriber.next(value);
	            }
	        }));
	        flushes && innerFrom_1.innerFrom(flushes).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () { return distinctKeys.clear(); }, noop_1.noop));
	    });
	}
	distinct.distinct = distinct$1;
	
	return distinct;
}

var distinctUntilChanged = {};

var hasRequiredDistinctUntilChanged;

function requireDistinctUntilChanged () {
	if (hasRequiredDistinctUntilChanged) return distinctUntilChanged;
	hasRequiredDistinctUntilChanged = 1;
	Object.defineProperty(distinctUntilChanged, "__esModule", { value: true });
	distinctUntilChanged.distinctUntilChanged = void 0;
	var identity_1 = /*@__PURE__*/ requireIdentity();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function distinctUntilChanged$1(comparator, keySelector) {
	    if (keySelector === void 0) { keySelector = identity_1.identity; }
	    comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
	    return lift_1.operate(function (source, subscriber) {
	        var previousKey;
	        var first = true;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var currentKey = keySelector(value);
	            if (first || !comparator(previousKey, currentKey)) {
	                first = false;
	                previousKey = currentKey;
	                subscriber.next(value);
	            }
	        }));
	    });
	}
	distinctUntilChanged.distinctUntilChanged = distinctUntilChanged$1;
	function defaultCompare(a, b) {
	    return a === b;
	}
	
	return distinctUntilChanged;
}

var distinctUntilKeyChanged = {};

var hasRequiredDistinctUntilKeyChanged;

function requireDistinctUntilKeyChanged () {
	if (hasRequiredDistinctUntilKeyChanged) return distinctUntilKeyChanged;
	hasRequiredDistinctUntilKeyChanged = 1;
	Object.defineProperty(distinctUntilKeyChanged, "__esModule", { value: true });
	distinctUntilKeyChanged.distinctUntilKeyChanged = void 0;
	var distinctUntilChanged_1 = /*@__PURE__*/ requireDistinctUntilChanged();
	function distinctUntilKeyChanged$1(key, compare) {
	    return distinctUntilChanged_1.distinctUntilChanged(function (x, y) { return (compare ? compare(x[key], y[key]) : x[key] === y[key]); });
	}
	distinctUntilKeyChanged.distinctUntilKeyChanged = distinctUntilKeyChanged$1;
	
	return distinctUntilKeyChanged;
}

var elementAt = {};

var throwIfEmpty = {};

var hasRequiredThrowIfEmpty;

function requireThrowIfEmpty () {
	if (hasRequiredThrowIfEmpty) return throwIfEmpty;
	hasRequiredThrowIfEmpty = 1;
	Object.defineProperty(throwIfEmpty, "__esModule", { value: true });
	throwIfEmpty.throwIfEmpty = void 0;
	var EmptyError_1 = /*@__PURE__*/ requireEmptyError();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function throwIfEmpty$1(errorFactory) {
	    if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
	    return lift_1.operate(function (source, subscriber) {
	        var hasValue = false;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            hasValue = true;
	            subscriber.next(value);
	        }, function () { return (hasValue ? subscriber.complete() : subscriber.error(errorFactory())); }));
	    });
	}
	throwIfEmpty.throwIfEmpty = throwIfEmpty$1;
	function defaultErrorFactory() {
	    return new EmptyError_1.EmptyError();
	}
	
	return throwIfEmpty;
}

var hasRequiredElementAt;

function requireElementAt () {
	if (hasRequiredElementAt) return elementAt;
	hasRequiredElementAt = 1;
	Object.defineProperty(elementAt, "__esModule", { value: true });
	elementAt.elementAt = void 0;
	var ArgumentOutOfRangeError_1 = /*@__PURE__*/ requireArgumentOutOfRangeError();
	var filter_1 = /*@__PURE__*/ requireFilter();
	var throwIfEmpty_1 = /*@__PURE__*/ requireThrowIfEmpty();
	var defaultIfEmpty_1 = /*@__PURE__*/ requireDefaultIfEmpty();
	var take_1 = /*@__PURE__*/ requireTake();
	function elementAt$1(index, defaultValue) {
	    if (index < 0) {
	        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
	    }
	    var hasDefaultValue = arguments.length >= 2;
	    return function (source) {
	        return source.pipe(filter_1.filter(function (v, i) { return i === index; }), take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function () { return new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError(); }));
	    };
	}
	elementAt.elementAt = elementAt$1;
	
	return elementAt;
}

var endWith = {};

var hasRequiredEndWith;

function requireEndWith () {
	if (hasRequiredEndWith) return endWith;
	hasRequiredEndWith = 1;
	var __read = (endWith && endWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (endWith && endWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(endWith, "__esModule", { value: true });
	endWith.endWith = void 0;
	var concat_1 = /*@__PURE__*/ requireConcat$1();
	var of_1 = /*@__PURE__*/ requireOf();
	function endWith$1() {
	    var values = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        values[_i] = arguments[_i];
	    }
	    return function (source) { return concat_1.concat(source, of_1.of.apply(void 0, __spreadArray([], __read(values)))); };
	}
	endWith.endWith = endWith$1;
	
	return endWith;
}

var every = {};

var hasRequiredEvery;

function requireEvery () {
	if (hasRequiredEvery) return every;
	hasRequiredEvery = 1;
	Object.defineProperty(every, "__esModule", { value: true });
	every.every = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function every$1(predicate, thisArg) {
	    return lift_1.operate(function (source, subscriber) {
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            if (!predicate.call(thisArg, value, index++, source)) {
	                subscriber.next(false);
	                subscriber.complete();
	            }
	        }, function () {
	            subscriber.next(true);
	            subscriber.complete();
	        }));
	    });
	}
	every.every = every$1;
	
	return every;
}

var exhaust = {};

var exhaustAll = {};

var exhaustMap = {};

var hasRequiredExhaustMap;

function requireExhaustMap () {
	if (hasRequiredExhaustMap) return exhaustMap;
	hasRequiredExhaustMap = 1;
	Object.defineProperty(exhaustMap, "__esModule", { value: true });
	exhaustMap.exhaustMap = void 0;
	var map_1 = /*@__PURE__*/ requireMap();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function exhaustMap$1(project, resultSelector) {
	    if (resultSelector) {
	        return function (source) {
	            return source.pipe(exhaustMap$1(function (a, i) { return innerFrom_1.innerFrom(project(a, i)).pipe(map_1.map(function (b, ii) { return resultSelector(a, b, i, ii); })); }));
	        };
	    }
	    return lift_1.operate(function (source, subscriber) {
	        var index = 0;
	        var innerSub = null;
	        var isComplete = false;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (outerValue) {
	            if (!innerSub) {
	                innerSub = OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, function () {
	                    innerSub = null;
	                    isComplete && subscriber.complete();
	                });
	                innerFrom_1.innerFrom(project(outerValue, index++)).subscribe(innerSub);
	            }
	        }, function () {
	            isComplete = true;
	            !innerSub && subscriber.complete();
	        }));
	    });
	}
	exhaustMap.exhaustMap = exhaustMap$1;
	
	return exhaustMap;
}

var hasRequiredExhaustAll;

function requireExhaustAll () {
	if (hasRequiredExhaustAll) return exhaustAll;
	hasRequiredExhaustAll = 1;
	Object.defineProperty(exhaustAll, "__esModule", { value: true });
	exhaustAll.exhaustAll = void 0;
	var exhaustMap_1 = /*@__PURE__*/ requireExhaustMap();
	var identity_1 = /*@__PURE__*/ requireIdentity();
	function exhaustAll$1() {
	    return exhaustMap_1.exhaustMap(identity_1.identity);
	}
	exhaustAll.exhaustAll = exhaustAll$1;
	
	return exhaustAll;
}

var hasRequiredExhaust;

function requireExhaust () {
	if (hasRequiredExhaust) return exhaust;
	hasRequiredExhaust = 1;
	Object.defineProperty(exhaust, "__esModule", { value: true });
	exhaust.exhaust = void 0;
	var exhaustAll_1 = /*@__PURE__*/ requireExhaustAll();
	exhaust.exhaust = exhaustAll_1.exhaustAll;
	
	return exhaust;
}

var expand = {};

var hasRequiredExpand;

function requireExpand () {
	if (hasRequiredExpand) return expand;
	hasRequiredExpand = 1;
	Object.defineProperty(expand, "__esModule", { value: true });
	expand.expand = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var mergeInternals_1 = /*@__PURE__*/ requireMergeInternals();
	function expand$1(project, concurrent, scheduler) {
	    if (concurrent === void 0) { concurrent = Infinity; }
	    concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
	    return lift_1.operate(function (source, subscriber) {
	        return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent, undefined, true, scheduler);
	    });
	}
	expand.expand = expand$1;
	
	return expand;
}

var finalize = {};

var hasRequiredFinalize;

function requireFinalize () {
	if (hasRequiredFinalize) return finalize;
	hasRequiredFinalize = 1;
	Object.defineProperty(finalize, "__esModule", { value: true });
	finalize.finalize = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	function finalize$1(callback) {
	    return lift_1.operate(function (source, subscriber) {
	        try {
	            source.subscribe(subscriber);
	        }
	        finally {
	            subscriber.add(callback);
	        }
	    });
	}
	finalize.finalize = finalize$1;
	
	return finalize;
}

var find = {};

var hasRequiredFind;

function requireFind () {
	if (hasRequiredFind) return find;
	hasRequiredFind = 1;
	Object.defineProperty(find, "__esModule", { value: true });
	find.createFind = find.find = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function find$1(predicate, thisArg) {
	    return lift_1.operate(createFind(predicate, thisArg, 'value'));
	}
	find.find = find$1;
	function createFind(predicate, thisArg, emit) {
	    var findIndex = emit === 'index';
	    return function (source, subscriber) {
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var i = index++;
	            if (predicate.call(thisArg, value, i, source)) {
	                subscriber.next(findIndex ? i : value);
	                subscriber.complete();
	            }
	        }, function () {
	            subscriber.next(findIndex ? -1 : undefined);
	            subscriber.complete();
	        }));
	    };
	}
	find.createFind = createFind;
	
	return find;
}

var findIndex = {};

var hasRequiredFindIndex;

function requireFindIndex () {
	if (hasRequiredFindIndex) return findIndex;
	hasRequiredFindIndex = 1;
	Object.defineProperty(findIndex, "__esModule", { value: true });
	findIndex.findIndex = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var find_1 = /*@__PURE__*/ requireFind();
	function findIndex$1(predicate, thisArg) {
	    return lift_1.operate(find_1.createFind(predicate, thisArg, 'index'));
	}
	findIndex.findIndex = findIndex$1;
	
	return findIndex;
}

var first = {};

var hasRequiredFirst;

function requireFirst () {
	if (hasRequiredFirst) return first;
	hasRequiredFirst = 1;
	Object.defineProperty(first, "__esModule", { value: true });
	first.first = void 0;
	var EmptyError_1 = /*@__PURE__*/ requireEmptyError();
	var filter_1 = /*@__PURE__*/ requireFilter();
	var take_1 = /*@__PURE__*/ requireTake();
	var defaultIfEmpty_1 = /*@__PURE__*/ requireDefaultIfEmpty();
	var throwIfEmpty_1 = /*@__PURE__*/ requireThrowIfEmpty();
	var identity_1 = /*@__PURE__*/ requireIdentity();
	function first$1(predicate, defaultValue) {
	    var hasDefaultValue = arguments.length >= 2;
	    return function (source) {
	        return source.pipe(predicate ? filter_1.filter(function (v, i) { return predicate(v, i, source); }) : identity_1.identity, take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function () { return new EmptyError_1.EmptyError(); }));
	    };
	}
	first.first = first$1;
	
	return first;
}

var groupBy = {};

var hasRequiredGroupBy;

function requireGroupBy () {
	if (hasRequiredGroupBy) return groupBy;
	hasRequiredGroupBy = 1;
	Object.defineProperty(groupBy, "__esModule", { value: true });
	groupBy.groupBy = void 0;
	var Observable_1 = /*@__PURE__*/ requireObservable();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function groupBy$1(keySelector, elementOrOptions, duration, connector) {
	    return lift_1.operate(function (source, subscriber) {
	        var element;
	        if (!elementOrOptions || typeof elementOrOptions === 'function') {
	            element = elementOrOptions;
	        }
	        else {
	            (duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector);
	        }
	        var groups = new Map();
	        var notify = function (cb) {
	            groups.forEach(cb);
	            cb(subscriber);
	        };
	        var handleError = function (err) { return notify(function (consumer) { return consumer.error(err); }); };
	        var activeGroups = 0;
	        var teardownAttempted = false;
	        var groupBySourceSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
	            try {
	                var key_1 = keySelector(value);
	                var group_1 = groups.get(key_1);
	                if (!group_1) {
	                    groups.set(key_1, (group_1 = connector ? connector() : new Subject_1.Subject()));
	                    var grouped = createGroupedObservable(key_1, group_1);
	                    subscriber.next(grouped);
	                    if (duration) {
	                        var durationSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(group_1, function () {
	                            group_1.complete();
	                            durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
	                        }, undefined, undefined, function () { return groups.delete(key_1); });
	                        groupBySourceSubscriber.add(innerFrom_1.innerFrom(duration(grouped)).subscribe(durationSubscriber_1));
	                    }
	                }
	                group_1.next(element ? element(value) : value);
	            }
	            catch (err) {
	                handleError(err);
	            }
	        }, function () { return notify(function (consumer) { return consumer.complete(); }); }, handleError, function () { return groups.clear(); }, function () {
	            teardownAttempted = true;
	            return activeGroups === 0;
	        });
	        source.subscribe(groupBySourceSubscriber);
	        function createGroupedObservable(key, groupSubject) {
	            var result = new Observable_1.Observable(function (groupSubscriber) {
	                activeGroups++;
	                var innerSub = groupSubject.subscribe(groupSubscriber);
	                return function () {
	                    innerSub.unsubscribe();
	                    --activeGroups === 0 && teardownAttempted && groupBySourceSubscriber.unsubscribe();
	                };
	            });
	            result.key = key;
	            return result;
	        }
	    });
	}
	groupBy.groupBy = groupBy$1;
	
	return groupBy;
}

var isEmpty = {};

var hasRequiredIsEmpty;

function requireIsEmpty () {
	if (hasRequiredIsEmpty) return isEmpty;
	hasRequiredIsEmpty = 1;
	Object.defineProperty(isEmpty, "__esModule", { value: true });
	isEmpty.isEmpty = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function isEmpty$1() {
	    return lift_1.operate(function (source, subscriber) {
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	            subscriber.next(false);
	            subscriber.complete();
	        }, function () {
	            subscriber.next(true);
	            subscriber.complete();
	        }));
	    });
	}
	isEmpty.isEmpty = isEmpty$1;
	
	return isEmpty;
}

var last = {};

var takeLast = {};

var hasRequiredTakeLast;

function requireTakeLast () {
	if (hasRequiredTakeLast) return takeLast;
	hasRequiredTakeLast = 1;
	var __values = (takeLast && takeLast.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(takeLast, "__esModule", { value: true });
	takeLast.takeLast = void 0;
	var empty_1 = /*@__PURE__*/ requireEmpty();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function takeLast$1(count) {
	    return count <= 0
	        ? function () { return empty_1.EMPTY; }
	        : lift_1.operate(function (source, subscriber) {
	            var buffer = [];
	            source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                buffer.push(value);
	                count < buffer.length && buffer.shift();
	            }, function () {
	                var e_1, _a;
	                try {
	                    for (var buffer_1 = __values(buffer), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
	                        var value = buffer_1_1.value;
	                        subscriber.next(value);
	                    }
	                }
	                catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                finally {
	                    try {
	                        if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
	                    }
	                    finally { if (e_1) throw e_1.error; }
	                }
	                subscriber.complete();
	            }, undefined, function () {
	                buffer = null;
	            }));
	        });
	}
	takeLast.takeLast = takeLast$1;
	
	return takeLast;
}

var hasRequiredLast;

function requireLast () {
	if (hasRequiredLast) return last;
	hasRequiredLast = 1;
	Object.defineProperty(last, "__esModule", { value: true });
	last.last = void 0;
	var EmptyError_1 = /*@__PURE__*/ requireEmptyError();
	var filter_1 = /*@__PURE__*/ requireFilter();
	var takeLast_1 = /*@__PURE__*/ requireTakeLast();
	var throwIfEmpty_1 = /*@__PURE__*/ requireThrowIfEmpty();
	var defaultIfEmpty_1 = /*@__PURE__*/ requireDefaultIfEmpty();
	var identity_1 = /*@__PURE__*/ requireIdentity();
	function last$1(predicate, defaultValue) {
	    var hasDefaultValue = arguments.length >= 2;
	    return function (source) {
	        return source.pipe(predicate ? filter_1.filter(function (v, i) { return predicate(v, i, source); }) : identity_1.identity, takeLast_1.takeLast(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function () { return new EmptyError_1.EmptyError(); }));
	    };
	}
	last.last = last$1;
	
	return last;
}

var materialize = {};

var hasRequiredMaterialize;

function requireMaterialize () {
	if (hasRequiredMaterialize) return materialize;
	hasRequiredMaterialize = 1;
	Object.defineProperty(materialize, "__esModule", { value: true });
	materialize.materialize = void 0;
	var Notification_1 = /*@__PURE__*/ requireNotification();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function materialize$1() {
	    return lift_1.operate(function (source, subscriber) {
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            subscriber.next(Notification_1.Notification.createNext(value));
	        }, function () {
	            subscriber.next(Notification_1.Notification.createComplete());
	            subscriber.complete();
	        }, function (err) {
	            subscriber.next(Notification_1.Notification.createError(err));
	            subscriber.complete();
	        }));
	    });
	}
	materialize.materialize = materialize$1;
	
	return materialize;
}

var max = {};

var hasRequiredMax;

function requireMax () {
	if (hasRequiredMax) return max;
	hasRequiredMax = 1;
	Object.defineProperty(max, "__esModule", { value: true });
	max.max = void 0;
	var reduce_1 = /*@__PURE__*/ requireReduce();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function max$1(comparer) {
	    return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function (x, y) { return (comparer(x, y) > 0 ? x : y); } : function (x, y) { return (x > y ? x : y); });
	}
	max.max = max$1;
	
	return max;
}

var flatMap = {};

var hasRequiredFlatMap;

function requireFlatMap () {
	if (hasRequiredFlatMap) return flatMap;
	hasRequiredFlatMap = 1;
	Object.defineProperty(flatMap, "__esModule", { value: true });
	flatMap.flatMap = void 0;
	var mergeMap_1 = /*@__PURE__*/ requireMergeMap();
	flatMap.flatMap = mergeMap_1.mergeMap;
	
	return flatMap;
}

var mergeMapTo = {};

var hasRequiredMergeMapTo;

function requireMergeMapTo () {
	if (hasRequiredMergeMapTo) return mergeMapTo;
	hasRequiredMergeMapTo = 1;
	Object.defineProperty(mergeMapTo, "__esModule", { value: true });
	mergeMapTo.mergeMapTo = void 0;
	var mergeMap_1 = /*@__PURE__*/ requireMergeMap();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function mergeMapTo$1(innerObservable, resultSelector, concurrent) {
	    if (concurrent === void 0) { concurrent = Infinity; }
	    if (isFunction_1.isFunction(resultSelector)) {
	        return mergeMap_1.mergeMap(function () { return innerObservable; }, resultSelector, concurrent);
	    }
	    if (typeof resultSelector === 'number') {
	        concurrent = resultSelector;
	    }
	    return mergeMap_1.mergeMap(function () { return innerObservable; }, concurrent);
	}
	mergeMapTo.mergeMapTo = mergeMapTo$1;
	
	return mergeMapTo;
}

var mergeScan = {};

var hasRequiredMergeScan;

function requireMergeScan () {
	if (hasRequiredMergeScan) return mergeScan;
	hasRequiredMergeScan = 1;
	Object.defineProperty(mergeScan, "__esModule", { value: true });
	mergeScan.mergeScan = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var mergeInternals_1 = /*@__PURE__*/ requireMergeInternals();
	function mergeScan$1(accumulator, seed, concurrent) {
	    if (concurrent === void 0) { concurrent = Infinity; }
	    return lift_1.operate(function (source, subscriber) {
	        var state = seed;
	        return mergeInternals_1.mergeInternals(source, subscriber, function (value, index) { return accumulator(state, value, index); }, concurrent, function (value) {
	            state = value;
	        }, false, undefined, function () { return (state = null); });
	    });
	}
	mergeScan.mergeScan = mergeScan$1;
	
	return mergeScan;
}

var mergeWith = {};

var merge = {};

var hasRequiredMerge;

function requireMerge () {
	if (hasRequiredMerge) return merge;
	hasRequiredMerge = 1;
	var __read = (merge && merge.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (merge && merge.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(merge, "__esModule", { value: true });
	merge.merge = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var mergeAll_1 = /*@__PURE__*/ requireMergeAll();
	var args_1 = /*@__PURE__*/ requireArgs();
	var from_1 = /*@__PURE__*/ requireFrom();
	function merge$1() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var scheduler = args_1.popScheduler(args);
	    var concurrent = args_1.popNumber(args, Infinity);
	    return lift_1.operate(function (source, subscriber) {
	        mergeAll_1.mergeAll(concurrent)(from_1.from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
	    });
	}
	merge.merge = merge$1;
	
	return merge;
}

var hasRequiredMergeWith;

function requireMergeWith () {
	if (hasRequiredMergeWith) return mergeWith;
	hasRequiredMergeWith = 1;
	var __read = (mergeWith && mergeWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (mergeWith && mergeWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(mergeWith, "__esModule", { value: true });
	mergeWith.mergeWith = void 0;
	var merge_1 = /*@__PURE__*/ requireMerge();
	function mergeWith$1() {
	    var otherSources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        otherSources[_i] = arguments[_i];
	    }
	    return merge_1.merge.apply(void 0, __spreadArray([], __read(otherSources)));
	}
	mergeWith.mergeWith = mergeWith$1;
	
	return mergeWith;
}

var min = {};

var hasRequiredMin;

function requireMin () {
	if (hasRequiredMin) return min;
	hasRequiredMin = 1;
	Object.defineProperty(min, "__esModule", { value: true });
	min.min = void 0;
	var reduce_1 = /*@__PURE__*/ requireReduce();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function min$1(comparer) {
	    return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function (x, y) { return (comparer(x, y) < 0 ? x : y); } : function (x, y) { return (x < y ? x : y); });
	}
	min.min = min$1;
	
	return min;
}

var multicast = {};

var hasRequiredMulticast;

function requireMulticast () {
	if (hasRequiredMulticast) return multicast;
	hasRequiredMulticast = 1;
	Object.defineProperty(multicast, "__esModule", { value: true });
	multicast.multicast = void 0;
	var ConnectableObservable_1 = /*@__PURE__*/ requireConnectableObservable();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	var connect_1 = /*@__PURE__*/ requireConnect();
	function multicast$1(subjectOrSubjectFactory, selector) {
	    var subjectFactory = isFunction_1.isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function () { return subjectOrSubjectFactory; };
	    if (isFunction_1.isFunction(selector)) {
	        return connect_1.connect(selector, {
	            connector: subjectFactory,
	        });
	    }
	    return function (source) { return new ConnectableObservable_1.ConnectableObservable(source, subjectFactory); };
	}
	multicast.multicast = multicast$1;
	
	return multicast;
}

var onErrorResumeNextWith = {};

var hasRequiredOnErrorResumeNextWith;

function requireOnErrorResumeNextWith () {
	if (hasRequiredOnErrorResumeNextWith) return onErrorResumeNextWith;
	hasRequiredOnErrorResumeNextWith = 1;
	var __read = (onErrorResumeNextWith && onErrorResumeNextWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (onErrorResumeNextWith && onErrorResumeNextWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(onErrorResumeNextWith, "__esModule", { value: true });
	onErrorResumeNextWith.onErrorResumeNext = onErrorResumeNextWith.onErrorResumeNextWith = void 0;
	var argsOrArgArray_1 = /*@__PURE__*/ requireArgsOrArgArray();
	var onErrorResumeNext_1 = /*@__PURE__*/ requireOnErrorResumeNext();
	function onErrorResumeNextWith$1() {
	    var sources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        sources[_i] = arguments[_i];
	    }
	    var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
	    return function (source) { return onErrorResumeNext_1.onErrorResumeNext.apply(void 0, __spreadArray([source], __read(nextSources))); };
	}
	onErrorResumeNextWith.onErrorResumeNextWith = onErrorResumeNextWith$1;
	onErrorResumeNextWith.onErrorResumeNext = onErrorResumeNextWith$1;
	
	return onErrorResumeNextWith;
}

var pairwise = {};

var hasRequiredPairwise;

function requirePairwise () {
	if (hasRequiredPairwise) return pairwise;
	hasRequiredPairwise = 1;
	Object.defineProperty(pairwise, "__esModule", { value: true });
	pairwise.pairwise = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function pairwise$1() {
	    return lift_1.operate(function (source, subscriber) {
	        var prev;
	        var hasPrev = false;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var p = prev;
	            prev = value;
	            hasPrev && subscriber.next([p, value]);
	            hasPrev = true;
	        }));
	    });
	}
	pairwise.pairwise = pairwise$1;
	
	return pairwise;
}

var pluck = {};

var hasRequiredPluck;

function requirePluck () {
	if (hasRequiredPluck) return pluck;
	hasRequiredPluck = 1;
	Object.defineProperty(pluck, "__esModule", { value: true });
	pluck.pluck = void 0;
	var map_1 = /*@__PURE__*/ requireMap();
	function pluck$1() {
	    var properties = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        properties[_i] = arguments[_i];
	    }
	    var length = properties.length;
	    if (length === 0) {
	        throw new Error('list of properties cannot be empty.');
	    }
	    return map_1.map(function (x) {
	        var currentProp = x;
	        for (var i = 0; i < length; i++) {
	            var p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
	            if (typeof p !== 'undefined') {
	                currentProp = p;
	            }
	            else {
	                return undefined;
	            }
	        }
	        return currentProp;
	    });
	}
	pluck.pluck = pluck$1;
	
	return pluck;
}

var publish = {};

var hasRequiredPublish;

function requirePublish () {
	if (hasRequiredPublish) return publish;
	hasRequiredPublish = 1;
	Object.defineProperty(publish, "__esModule", { value: true });
	publish.publish = void 0;
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var multicast_1 = /*@__PURE__*/ requireMulticast();
	var connect_1 = /*@__PURE__*/ requireConnect();
	function publish$1(selector) {
	    return selector ? function (source) { return connect_1.connect(selector)(source); } : function (source) { return multicast_1.multicast(new Subject_1.Subject())(source); };
	}
	publish.publish = publish$1;
	
	return publish;
}

var publishBehavior = {};

var hasRequiredPublishBehavior;

function requirePublishBehavior () {
	if (hasRequiredPublishBehavior) return publishBehavior;
	hasRequiredPublishBehavior = 1;
	Object.defineProperty(publishBehavior, "__esModule", { value: true });
	publishBehavior.publishBehavior = void 0;
	var BehaviorSubject_1 = /*@__PURE__*/ requireBehaviorSubject();
	var ConnectableObservable_1 = /*@__PURE__*/ requireConnectableObservable();
	function publishBehavior$1(initialValue) {
	    return function (source) {
	        var subject = new BehaviorSubject_1.BehaviorSubject(initialValue);
	        return new ConnectableObservable_1.ConnectableObservable(source, function () { return subject; });
	    };
	}
	publishBehavior.publishBehavior = publishBehavior$1;
	
	return publishBehavior;
}

var publishLast = {};

var hasRequiredPublishLast;

function requirePublishLast () {
	if (hasRequiredPublishLast) return publishLast;
	hasRequiredPublishLast = 1;
	Object.defineProperty(publishLast, "__esModule", { value: true });
	publishLast.publishLast = void 0;
	var AsyncSubject_1 = /*@__PURE__*/ requireAsyncSubject();
	var ConnectableObservable_1 = /*@__PURE__*/ requireConnectableObservable();
	function publishLast$1() {
	    return function (source) {
	        var subject = new AsyncSubject_1.AsyncSubject();
	        return new ConnectableObservable_1.ConnectableObservable(source, function () { return subject; });
	    };
	}
	publishLast.publishLast = publishLast$1;
	
	return publishLast;
}

var publishReplay = {};

var hasRequiredPublishReplay;

function requirePublishReplay () {
	if (hasRequiredPublishReplay) return publishReplay;
	hasRequiredPublishReplay = 1;
	Object.defineProperty(publishReplay, "__esModule", { value: true });
	publishReplay.publishReplay = void 0;
	var ReplaySubject_1 = /*@__PURE__*/ requireReplaySubject();
	var multicast_1 = /*@__PURE__*/ requireMulticast();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function publishReplay$1(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
	    if (selectorOrScheduler && !isFunction_1.isFunction(selectorOrScheduler)) {
	        timestampProvider = selectorOrScheduler;
	    }
	    var selector = isFunction_1.isFunction(selectorOrScheduler) ? selectorOrScheduler : undefined;
	    return function (source) { return multicast_1.multicast(new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source); };
	}
	publishReplay.publishReplay = publishReplay$1;
	
	return publishReplay;
}

var raceWith = {};

var hasRequiredRaceWith;

function requireRaceWith () {
	if (hasRequiredRaceWith) return raceWith;
	hasRequiredRaceWith = 1;
	var __read = (raceWith && raceWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (raceWith && raceWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(raceWith, "__esModule", { value: true });
	raceWith.raceWith = void 0;
	var race_1 = /*@__PURE__*/ requireRace$1();
	var lift_1 = /*@__PURE__*/ requireLift();
	var identity_1 = /*@__PURE__*/ requireIdentity();
	function raceWith$1() {
	    var otherSources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        otherSources[_i] = arguments[_i];
	    }
	    return !otherSources.length
	        ? identity_1.identity
	        : lift_1.operate(function (source, subscriber) {
	            race_1.raceInit(__spreadArray([source], __read(otherSources)))(subscriber);
	        });
	}
	raceWith.raceWith = raceWith$1;
	
	return raceWith;
}

var repeat = {};

var hasRequiredRepeat;

function requireRepeat () {
	if (hasRequiredRepeat) return repeat;
	hasRequiredRepeat = 1;
	Object.defineProperty(repeat, "__esModule", { value: true });
	repeat.repeat = void 0;
	var empty_1 = /*@__PURE__*/ requireEmpty();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var timer_1 = /*@__PURE__*/ requireTimer();
	function repeat$1(countOrConfig) {
	    var _a;
	    var count = Infinity;
	    var delay;
	    if (countOrConfig != null) {
	        if (typeof countOrConfig === 'object') {
	            (_a = countOrConfig.count, count = _a === void 0 ? Infinity : _a, delay = countOrConfig.delay);
	        }
	        else {
	            count = countOrConfig;
	        }
	    }
	    return count <= 0
	        ? function () { return empty_1.EMPTY; }
	        : lift_1.operate(function (source, subscriber) {
	            var soFar = 0;
	            var sourceSub;
	            var resubscribe = function () {
	                sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
	                sourceSub = null;
	                if (delay != null) {
	                    var notifier = typeof delay === 'number' ? timer_1.timer(delay) : innerFrom_1.innerFrom(delay(soFar));
	                    var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	                        notifierSubscriber_1.unsubscribe();
	                        subscribeToSource();
	                    });
	                    notifier.subscribe(notifierSubscriber_1);
	                }
	                else {
	                    subscribeToSource();
	                }
	            };
	            var subscribeToSource = function () {
	                var syncUnsub = false;
	                sourceSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, function () {
	                    if (++soFar < count) {
	                        if (sourceSub) {
	                            resubscribe();
	                        }
	                        else {
	                            syncUnsub = true;
	                        }
	                    }
	                    else {
	                        subscriber.complete();
	                    }
	                }));
	                if (syncUnsub) {
	                    resubscribe();
	                }
	            };
	            subscribeToSource();
	        });
	}
	repeat.repeat = repeat$1;
	
	return repeat;
}

var repeatWhen = {};

var hasRequiredRepeatWhen;

function requireRepeatWhen () {
	if (hasRequiredRepeatWhen) return repeatWhen;
	hasRequiredRepeatWhen = 1;
	Object.defineProperty(repeatWhen, "__esModule", { value: true });
	repeatWhen.repeatWhen = void 0;
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function repeatWhen$1(notifier) {
	    return lift_1.operate(function (source, subscriber) {
	        var innerSub;
	        var syncResub = false;
	        var completions$;
	        var isNotifierComplete = false;
	        var isMainComplete = false;
	        var checkComplete = function () { return isMainComplete && isNotifierComplete && (subscriber.complete(), true); };
	        var getCompletionSubject = function () {
	            if (!completions$) {
	                completions$ = new Subject_1.Subject();
	                innerFrom_1.innerFrom(notifier(completions$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	                    if (innerSub) {
	                        subscribeForRepeatWhen();
	                    }
	                    else {
	                        syncResub = true;
	                    }
	                }, function () {
	                    isNotifierComplete = true;
	                    checkComplete();
	                }));
	            }
	            return completions$;
	        };
	        var subscribeForRepeatWhen = function () {
	            isMainComplete = false;
	            innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, function () {
	                isMainComplete = true;
	                !checkComplete() && getCompletionSubject().next();
	            }));
	            if (syncResub) {
	                innerSub.unsubscribe();
	                innerSub = null;
	                syncResub = false;
	                subscribeForRepeatWhen();
	            }
	        };
	        subscribeForRepeatWhen();
	    });
	}
	repeatWhen.repeatWhen = repeatWhen$1;
	
	return repeatWhen;
}

var retry = {};

var hasRequiredRetry;

function requireRetry () {
	if (hasRequiredRetry) return retry;
	hasRequiredRetry = 1;
	Object.defineProperty(retry, "__esModule", { value: true });
	retry.retry = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var identity_1 = /*@__PURE__*/ requireIdentity();
	var timer_1 = /*@__PURE__*/ requireTimer();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function retry$1(configOrCount) {
	    if (configOrCount === void 0) { configOrCount = Infinity; }
	    var config;
	    if (configOrCount && typeof configOrCount === 'object') {
	        config = configOrCount;
	    }
	    else {
	        config = {
	            count: configOrCount,
	        };
	    }
	    var _a = config.count, count = _a === void 0 ? Infinity : _a, delay = config.delay, _b = config.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
	    return count <= 0
	        ? identity_1.identity
	        : lift_1.operate(function (source, subscriber) {
	            var soFar = 0;
	            var innerSub;
	            var subscribeForRetry = function () {
	                var syncUnsub = false;
	                innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                    if (resetOnSuccess) {
	                        soFar = 0;
	                    }
	                    subscriber.next(value);
	                }, undefined, function (err) {
	                    if (soFar++ < count) {
	                        var resub_1 = function () {
	                            if (innerSub) {
	                                innerSub.unsubscribe();
	                                innerSub = null;
	                                subscribeForRetry();
	                            }
	                            else {
	                                syncUnsub = true;
	                            }
	                        };
	                        if (delay != null) {
	                            var notifier = typeof delay === 'number' ? timer_1.timer(delay) : innerFrom_1.innerFrom(delay(err, soFar));
	                            var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	                                notifierSubscriber_1.unsubscribe();
	                                resub_1();
	                            }, function () {
	                                subscriber.complete();
	                            });
	                            notifier.subscribe(notifierSubscriber_1);
	                        }
	                        else {
	                            resub_1();
	                        }
	                    }
	                    else {
	                        subscriber.error(err);
	                    }
	                }));
	                if (syncUnsub) {
	                    innerSub.unsubscribe();
	                    innerSub = null;
	                    subscribeForRetry();
	                }
	            };
	            subscribeForRetry();
	        });
	}
	retry.retry = retry$1;
	
	return retry;
}

var retryWhen = {};

var hasRequiredRetryWhen;

function requireRetryWhen () {
	if (hasRequiredRetryWhen) return retryWhen;
	hasRequiredRetryWhen = 1;
	Object.defineProperty(retryWhen, "__esModule", { value: true });
	retryWhen.retryWhen = void 0;
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function retryWhen$1(notifier) {
	    return lift_1.operate(function (source, subscriber) {
	        var innerSub;
	        var syncResub = false;
	        var errors$;
	        var subscribeForRetryWhen = function () {
	            innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, undefined, function (err) {
	                if (!errors$) {
	                    errors$ = new Subject_1.Subject();
	                    innerFrom_1.innerFrom(notifier(errors$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	                        return innerSub ? subscribeForRetryWhen() : (syncResub = true);
	                    }));
	                }
	                if (errors$) {
	                    errors$.next(err);
	                }
	            }));
	            if (syncResub) {
	                innerSub.unsubscribe();
	                innerSub = null;
	                syncResub = false;
	                subscribeForRetryWhen();
	            }
	        };
	        subscribeForRetryWhen();
	    });
	}
	retryWhen.retryWhen = retryWhen$1;
	
	return retryWhen;
}

var sample = {};

var hasRequiredSample;

function requireSample () {
	if (hasRequiredSample) return sample;
	hasRequiredSample = 1;
	Object.defineProperty(sample, "__esModule", { value: true });
	sample.sample = void 0;
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var lift_1 = /*@__PURE__*/ requireLift();
	var noop_1 = /*@__PURE__*/ requireNoop();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function sample$1(notifier) {
	    return lift_1.operate(function (source, subscriber) {
	        var hasValue = false;
	        var lastValue = null;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            hasValue = true;
	            lastValue = value;
	        }));
	        innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	            if (hasValue) {
	                hasValue = false;
	                var value = lastValue;
	                lastValue = null;
	                subscriber.next(value);
	            }
	        }, noop_1.noop));
	    });
	}
	sample.sample = sample$1;
	
	return sample;
}

var sampleTime = {};

var hasRequiredSampleTime;

function requireSampleTime () {
	if (hasRequiredSampleTime) return sampleTime;
	hasRequiredSampleTime = 1;
	Object.defineProperty(sampleTime, "__esModule", { value: true });
	sampleTime.sampleTime = void 0;
	var async_1 = /*@__PURE__*/ requireAsync();
	var sample_1 = /*@__PURE__*/ requireSample();
	var interval_1 = /*@__PURE__*/ requireInterval();
	function sampleTime$1(period, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    return sample_1.sample(interval_1.interval(period, scheduler));
	}
	sampleTime.sampleTime = sampleTime$1;
	
	return sampleTime;
}

var scan = {};

var hasRequiredScan;

function requireScan () {
	if (hasRequiredScan) return scan;
	hasRequiredScan = 1;
	Object.defineProperty(scan, "__esModule", { value: true });
	scan.scan = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var scanInternals_1 = /*@__PURE__*/ requireScanInternals();
	function scan$1(accumulator, seed) {
	    return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, true));
	}
	scan.scan = scan$1;
	
	return scan;
}

var sequenceEqual = {};

var hasRequiredSequenceEqual;

function requireSequenceEqual () {
	if (hasRequiredSequenceEqual) return sequenceEqual;
	hasRequiredSequenceEqual = 1;
	Object.defineProperty(sequenceEqual, "__esModule", { value: true });
	sequenceEqual.sequenceEqual = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function sequenceEqual$1(compareTo, comparator) {
	    if (comparator === void 0) { comparator = function (a, b) { return a === b; }; }
	    return lift_1.operate(function (source, subscriber) {
	        var aState = createState();
	        var bState = createState();
	        var emit = function (isEqual) {
	            subscriber.next(isEqual);
	            subscriber.complete();
	        };
	        var createSubscriber = function (selfState, otherState) {
	            var sequenceEqualSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (a) {
	                var buffer = otherState.buffer, complete = otherState.complete;
	                if (buffer.length === 0) {
	                    complete ? emit(false) : selfState.buffer.push(a);
	                }
	                else {
	                    !comparator(a, buffer.shift()) && emit(false);
	                }
	            }, function () {
	                selfState.complete = true;
	                var complete = otherState.complete, buffer = otherState.buffer;
	                complete && emit(buffer.length === 0);
	                sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
	            });
	            return sequenceEqualSubscriber;
	        };
	        source.subscribe(createSubscriber(aState, bState));
	        innerFrom_1.innerFrom(compareTo).subscribe(createSubscriber(bState, aState));
	    });
	}
	sequenceEqual.sequenceEqual = sequenceEqual$1;
	function createState() {
	    return {
	        buffer: [],
	        complete: false,
	    };
	}
	
	return sequenceEqual;
}

var share = {};

var hasRequiredShare;

function requireShare () {
	if (hasRequiredShare) return share;
	hasRequiredShare = 1;
	var __read = (share && share.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (share && share.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(share, "__esModule", { value: true });
	share.share = void 0;
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var Subscriber_1 = /*@__PURE__*/ requireSubscriber();
	var lift_1 = /*@__PURE__*/ requireLift();
	function share$1(options) {
	    if (options === void 0) { options = {}; }
	    var _a = options.connector, connector = _a === void 0 ? function () { return new Subject_1.Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
	    return function (wrapperSource) {
	        var connection;
	        var resetConnection;
	        var subject;
	        var refCount = 0;
	        var hasCompleted = false;
	        var hasErrored = false;
	        var cancelReset = function () {
	            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
	            resetConnection = undefined;
	        };
	        var reset = function () {
	            cancelReset();
	            connection = subject = undefined;
	            hasCompleted = hasErrored = false;
	        };
	        var resetAndUnsubscribe = function () {
	            var conn = connection;
	            reset();
	            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
	        };
	        return lift_1.operate(function (source, subscriber) {
	            refCount++;
	            if (!hasErrored && !hasCompleted) {
	                cancelReset();
	            }
	            var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
	            subscriber.add(function () {
	                refCount--;
	                if (refCount === 0 && !hasErrored && !hasCompleted) {
	                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
	                }
	            });
	            dest.subscribe(subscriber);
	            if (!connection &&
	                refCount > 0) {
	                connection = new Subscriber_1.SafeSubscriber({
	                    next: function (value) { return dest.next(value); },
	                    error: function (err) {
	                        hasErrored = true;
	                        cancelReset();
	                        resetConnection = handleReset(reset, resetOnError, err);
	                        dest.error(err);
	                    },
	                    complete: function () {
	                        hasCompleted = true;
	                        cancelReset();
	                        resetConnection = handleReset(reset, resetOnComplete);
	                        dest.complete();
	                    },
	                });
	                innerFrom_1.innerFrom(source).subscribe(connection);
	            }
	        })(wrapperSource);
	    };
	}
	share.share = share$1;
	function handleReset(reset, on) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    if (on === true) {
	        reset();
	        return;
	    }
	    if (on === false) {
	        return;
	    }
	    var onSubscriber = new Subscriber_1.SafeSubscriber({
	        next: function () {
	            onSubscriber.unsubscribe();
	            reset();
	        },
	    });
	    return innerFrom_1.innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
	}
	
	return share;
}

var shareReplay = {};

var hasRequiredShareReplay;

function requireShareReplay () {
	if (hasRequiredShareReplay) return shareReplay;
	hasRequiredShareReplay = 1;
	Object.defineProperty(shareReplay, "__esModule", { value: true });
	shareReplay.shareReplay = void 0;
	var ReplaySubject_1 = /*@__PURE__*/ requireReplaySubject();
	var share_1 = /*@__PURE__*/ requireShare();
	function shareReplay$1(configOrBufferSize, windowTime, scheduler) {
	    var _a, _b, _c;
	    var bufferSize;
	    var refCount = false;
	    if (configOrBufferSize && typeof configOrBufferSize === 'object') {
	        (_a = configOrBufferSize.bufferSize, bufferSize = _a === void 0 ? Infinity : _a, _b = configOrBufferSize.windowTime, windowTime = _b === void 0 ? Infinity : _b, _c = configOrBufferSize.refCount, refCount = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler);
	    }
	    else {
	        bufferSize = (configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity);
	    }
	    return share_1.share({
	        connector: function () { return new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler); },
	        resetOnError: true,
	        resetOnComplete: false,
	        resetOnRefCountZero: refCount,
	    });
	}
	shareReplay.shareReplay = shareReplay$1;
	
	return shareReplay;
}

var single = {};

var hasRequiredSingle;

function requireSingle () {
	if (hasRequiredSingle) return single;
	hasRequiredSingle = 1;
	Object.defineProperty(single, "__esModule", { value: true });
	single.single = void 0;
	var EmptyError_1 = /*@__PURE__*/ requireEmptyError();
	var SequenceError_1 = /*@__PURE__*/ requireSequenceError();
	var NotFoundError_1 = /*@__PURE__*/ requireNotFoundError();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function single$1(predicate) {
	    return lift_1.operate(function (source, subscriber) {
	        var hasValue = false;
	        var singleValue;
	        var seenValue = false;
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            seenValue = true;
	            if (!predicate || predicate(value, index++, source)) {
	                hasValue && subscriber.error(new SequenceError_1.SequenceError('Too many matching values'));
	                hasValue = true;
	                singleValue = value;
	            }
	        }, function () {
	            if (hasValue) {
	                subscriber.next(singleValue);
	                subscriber.complete();
	            }
	            else {
	                subscriber.error(seenValue ? new NotFoundError_1.NotFoundError('No matching values') : new EmptyError_1.EmptyError());
	            }
	        }));
	    });
	}
	single.single = single$1;
	
	return single;
}

var skip = {};

var hasRequiredSkip;

function requireSkip () {
	if (hasRequiredSkip) return skip;
	hasRequiredSkip = 1;
	Object.defineProperty(skip, "__esModule", { value: true });
	skip.skip = void 0;
	var filter_1 = /*@__PURE__*/ requireFilter();
	function skip$1(count) {
	    return filter_1.filter(function (_, index) { return count <= index; });
	}
	skip.skip = skip$1;
	
	return skip;
}

var skipLast = {};

var hasRequiredSkipLast;

function requireSkipLast () {
	if (hasRequiredSkipLast) return skipLast;
	hasRequiredSkipLast = 1;
	Object.defineProperty(skipLast, "__esModule", { value: true });
	skipLast.skipLast = void 0;
	var identity_1 = /*@__PURE__*/ requireIdentity();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function skipLast$1(skipCount) {
	    return skipCount <= 0
	        ?
	            identity_1.identity
	        : lift_1.operate(function (source, subscriber) {
	            var ring = new Array(skipCount);
	            var seen = 0;
	            source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                var valueIndex = seen++;
	                if (valueIndex < skipCount) {
	                    ring[valueIndex] = value;
	                }
	                else {
	                    var index = valueIndex % skipCount;
	                    var oldValue = ring[index];
	                    ring[index] = value;
	                    subscriber.next(oldValue);
	                }
	            }));
	            return function () {
	                ring = null;
	            };
	        });
	}
	skipLast.skipLast = skipLast$1;
	
	return skipLast;
}

var skipUntil = {};

var hasRequiredSkipUntil;

function requireSkipUntil () {
	if (hasRequiredSkipUntil) return skipUntil;
	hasRequiredSkipUntil = 1;
	Object.defineProperty(skipUntil, "__esModule", { value: true });
	skipUntil.skipUntil = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var noop_1 = /*@__PURE__*/ requireNoop();
	function skipUntil$1(notifier) {
	    return lift_1.operate(function (source, subscriber) {
	        var taking = false;
	        var skipSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	            skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
	            taking = true;
	        }, noop_1.noop);
	        innerFrom_1.innerFrom(notifier).subscribe(skipSubscriber);
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return taking && subscriber.next(value); }));
	    });
	}
	skipUntil.skipUntil = skipUntil$1;
	
	return skipUntil;
}

var skipWhile = {};

var hasRequiredSkipWhile;

function requireSkipWhile () {
	if (hasRequiredSkipWhile) return skipWhile;
	hasRequiredSkipWhile = 1;
	Object.defineProperty(skipWhile, "__esModule", { value: true });
	skipWhile.skipWhile = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function skipWhile$1(predicate) {
	    return lift_1.operate(function (source, subscriber) {
	        var taking = false;
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return (taking || (taking = !predicate(value, index++))) && subscriber.next(value); }));
	    });
	}
	skipWhile.skipWhile = skipWhile$1;
	
	return skipWhile;
}

var startWith = {};

var hasRequiredStartWith;

function requireStartWith () {
	if (hasRequiredStartWith) return startWith;
	hasRequiredStartWith = 1;
	Object.defineProperty(startWith, "__esModule", { value: true });
	startWith.startWith = void 0;
	var concat_1 = /*@__PURE__*/ requireConcat$1();
	var args_1 = /*@__PURE__*/ requireArgs();
	var lift_1 = /*@__PURE__*/ requireLift();
	function startWith$1() {
	    var values = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        values[_i] = arguments[_i];
	    }
	    var scheduler = args_1.popScheduler(values);
	    return lift_1.operate(function (source, subscriber) {
	        (scheduler ? concat_1.concat(values, source, scheduler) : concat_1.concat(values, source)).subscribe(subscriber);
	    });
	}
	startWith.startWith = startWith$1;
	
	return startWith;
}

var switchAll = {};

var switchMap = {};

var hasRequiredSwitchMap;

function requireSwitchMap () {
	if (hasRequiredSwitchMap) return switchMap;
	hasRequiredSwitchMap = 1;
	Object.defineProperty(switchMap, "__esModule", { value: true });
	switchMap.switchMap = void 0;
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function switchMap$1(project, resultSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var innerSubscriber = null;
	        var index = 0;
	        var isComplete = false;
	        var checkComplete = function () { return isComplete && !innerSubscriber && subscriber.complete(); };
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
	            var innerIndex = 0;
	            var outerIndex = index++;
	            innerFrom_1.innerFrom(project(value, outerIndex)).subscribe((innerSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (innerValue) { return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue); }, function () {
	                innerSubscriber = null;
	                checkComplete();
	            })));
	        }, function () {
	            isComplete = true;
	            checkComplete();
	        }));
	    });
	}
	switchMap.switchMap = switchMap$1;
	
	return switchMap;
}

var hasRequiredSwitchAll;

function requireSwitchAll () {
	if (hasRequiredSwitchAll) return switchAll;
	hasRequiredSwitchAll = 1;
	Object.defineProperty(switchAll, "__esModule", { value: true });
	switchAll.switchAll = void 0;
	var switchMap_1 = /*@__PURE__*/ requireSwitchMap();
	var identity_1 = /*@__PURE__*/ requireIdentity();
	function switchAll$1() {
	    return switchMap_1.switchMap(identity_1.identity);
	}
	switchAll.switchAll = switchAll$1;
	
	return switchAll;
}

var switchMapTo = {};

var hasRequiredSwitchMapTo;

function requireSwitchMapTo () {
	if (hasRequiredSwitchMapTo) return switchMapTo;
	hasRequiredSwitchMapTo = 1;
	Object.defineProperty(switchMapTo, "__esModule", { value: true });
	switchMapTo.switchMapTo = void 0;
	var switchMap_1 = /*@__PURE__*/ requireSwitchMap();
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	function switchMapTo$1(innerObservable, resultSelector) {
	    return isFunction_1.isFunction(resultSelector) ? switchMap_1.switchMap(function () { return innerObservable; }, resultSelector) : switchMap_1.switchMap(function () { return innerObservable; });
	}
	switchMapTo.switchMapTo = switchMapTo$1;
	
	return switchMapTo;
}

var switchScan = {};

var hasRequiredSwitchScan;

function requireSwitchScan () {
	if (hasRequiredSwitchScan) return switchScan;
	hasRequiredSwitchScan = 1;
	Object.defineProperty(switchScan, "__esModule", { value: true });
	switchScan.switchScan = void 0;
	var switchMap_1 = /*@__PURE__*/ requireSwitchMap();
	var lift_1 = /*@__PURE__*/ requireLift();
	function switchScan$1(accumulator, seed) {
	    return lift_1.operate(function (source, subscriber) {
	        var state = seed;
	        switchMap_1.switchMap(function (value, index) { return accumulator(state, value, index); }, function (_, innerValue) { return ((state = innerValue), innerValue); })(source).subscribe(subscriber);
	        return function () {
	            state = null;
	        };
	    });
	}
	switchScan.switchScan = switchScan$1;
	
	return switchScan;
}

var takeUntil = {};

var hasRequiredTakeUntil;

function requireTakeUntil () {
	if (hasRequiredTakeUntil) return takeUntil;
	hasRequiredTakeUntil = 1;
	Object.defineProperty(takeUntil, "__esModule", { value: true });
	takeUntil.takeUntil = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var noop_1 = /*@__PURE__*/ requireNoop();
	function takeUntil$1(notifier) {
	    return lift_1.operate(function (source, subscriber) {
	        innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () { return subscriber.complete(); }, noop_1.noop));
	        !subscriber.closed && source.subscribe(subscriber);
	    });
	}
	takeUntil.takeUntil = takeUntil$1;
	
	return takeUntil;
}

var takeWhile = {};

var hasRequiredTakeWhile;

function requireTakeWhile () {
	if (hasRequiredTakeWhile) return takeWhile;
	hasRequiredTakeWhile = 1;
	Object.defineProperty(takeWhile, "__esModule", { value: true });
	takeWhile.takeWhile = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function takeWhile$1(predicate, inclusive) {
	    if (inclusive === void 0) { inclusive = false; }
	    return lift_1.operate(function (source, subscriber) {
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var result = predicate(value, index++);
	            (result || inclusive) && subscriber.next(value);
	            !result && subscriber.complete();
	        }));
	    });
	}
	takeWhile.takeWhile = takeWhile$1;
	
	return takeWhile;
}

var tap = {};

var hasRequiredTap;

function requireTap () {
	if (hasRequiredTap) return tap;
	hasRequiredTap = 1;
	Object.defineProperty(tap, "__esModule", { value: true });
	tap.tap = void 0;
	var isFunction_1 = /*@__PURE__*/ requireIsFunction();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var identity_1 = /*@__PURE__*/ requireIdentity();
	function tap$1(observerOrNext, error, complete) {
	    var tapObserver = isFunction_1.isFunction(observerOrNext) || error || complete
	        ?
	            { next: observerOrNext, error: error, complete: complete }
	        : observerOrNext;
	    return tapObserver
	        ? lift_1.operate(function (source, subscriber) {
	            var _a;
	            (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
	            var isUnsub = true;
	            source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                var _a;
	                (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
	                subscriber.next(value);
	            }, function () {
	                var _a;
	                isUnsub = false;
	                (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
	                subscriber.complete();
	            }, function (err) {
	                var _a;
	                isUnsub = false;
	                (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
	                subscriber.error(err);
	            }, function () {
	                var _a, _b;
	                if (isUnsub) {
	                    (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
	                }
	                (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
	            }));
	        })
	        :
	            identity_1.identity;
	}
	tap.tap = tap$1;
	
	return tap;
}

var throttle = {};

var hasRequiredThrottle;

function requireThrottle () {
	if (hasRequiredThrottle) return throttle;
	hasRequiredThrottle = 1;
	Object.defineProperty(throttle, "__esModule", { value: true });
	throttle.throttle = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function throttle$1(durationSelector, config) {
	    return lift_1.operate(function (source, subscriber) {
	        var _a = config !== null && config !== void 0 ? config : {}, _b = _a.leading, leading = _b === void 0 ? true : _b, _c = _a.trailing, trailing = _c === void 0 ? false : _c;
	        var hasValue = false;
	        var sendValue = null;
	        var throttled = null;
	        var isComplete = false;
	        var endThrottling = function () {
	            throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
	            throttled = null;
	            if (trailing) {
	                send();
	                isComplete && subscriber.complete();
	            }
	        };
	        var cleanupThrottling = function () {
	            throttled = null;
	            isComplete && subscriber.complete();
	        };
	        var startThrottle = function (value) {
	            return (throttled = innerFrom_1.innerFrom(durationSelector(value)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling)));
	        };
	        var send = function () {
	            if (hasValue) {
	                hasValue = false;
	                var value = sendValue;
	                sendValue = null;
	                subscriber.next(value);
	                !isComplete && startThrottle(value);
	            }
	        };
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            hasValue = true;
	            sendValue = value;
	            !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
	        }, function () {
	            isComplete = true;
	            !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
	        }));
	    });
	}
	throttle.throttle = throttle$1;
	
	return throttle;
}

var throttleTime = {};

var hasRequiredThrottleTime;

function requireThrottleTime () {
	if (hasRequiredThrottleTime) return throttleTime;
	hasRequiredThrottleTime = 1;
	Object.defineProperty(throttleTime, "__esModule", { value: true });
	throttleTime.throttleTime = void 0;
	var async_1 = /*@__PURE__*/ requireAsync();
	var throttle_1 = /*@__PURE__*/ requireThrottle();
	var timer_1 = /*@__PURE__*/ requireTimer();
	function throttleTime$1(duration, scheduler, config) {
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    var duration$ = timer_1.timer(duration, scheduler);
	    return throttle_1.throttle(function () { return duration$; }, config);
	}
	throttleTime.throttleTime = throttleTime$1;
	
	return throttleTime;
}

var timeInterval = {};

var hasRequiredTimeInterval;

function requireTimeInterval () {
	if (hasRequiredTimeInterval) return timeInterval;
	hasRequiredTimeInterval = 1;
	Object.defineProperty(timeInterval, "__esModule", { value: true });
	timeInterval.TimeInterval = timeInterval.timeInterval = void 0;
	var async_1 = /*@__PURE__*/ requireAsync();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function timeInterval$1(scheduler) {
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    return lift_1.operate(function (source, subscriber) {
	        var last = scheduler.now();
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var now = scheduler.now();
	            var interval = now - last;
	            last = now;
	            subscriber.next(new TimeInterval(value, interval));
	        }));
	    });
	}
	timeInterval.timeInterval = timeInterval$1;
	var TimeInterval = (function () {
	    function TimeInterval(value, interval) {
	        this.value = value;
	        this.interval = interval;
	    }
	    return TimeInterval;
	}());
	timeInterval.TimeInterval = TimeInterval;
	
	return timeInterval;
}

var timeoutWith = {};

var hasRequiredTimeoutWith;

function requireTimeoutWith () {
	if (hasRequiredTimeoutWith) return timeoutWith;
	hasRequiredTimeoutWith = 1;
	Object.defineProperty(timeoutWith, "__esModule", { value: true });
	timeoutWith.timeoutWith = void 0;
	var async_1 = /*@__PURE__*/ requireAsync();
	var isDate_1 = /*@__PURE__*/ requireIsDate();
	var timeout_1 = /*@__PURE__*/ requireTimeout();
	function timeoutWith$1(due, withObservable, scheduler) {
	    var first;
	    var each;
	    var _with;
	    scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async_1.async;
	    if (isDate_1.isValidDate(due)) {
	        first = due;
	    }
	    else if (typeof due === 'number') {
	        each = due;
	    }
	    if (withObservable) {
	        _with = function () { return withObservable; };
	    }
	    else {
	        throw new TypeError('No observable provided to switch to');
	    }
	    if (first == null && each == null) {
	        throw new TypeError('No timeout provided.');
	    }
	    return timeout_1.timeout({
	        first: first,
	        each: each,
	        scheduler: scheduler,
	        with: _with,
	    });
	}
	timeoutWith.timeoutWith = timeoutWith$1;
	
	return timeoutWith;
}

var timestamp = {};

var hasRequiredTimestamp;

function requireTimestamp () {
	if (hasRequiredTimestamp) return timestamp;
	hasRequiredTimestamp = 1;
	Object.defineProperty(timestamp, "__esModule", { value: true });
	timestamp.timestamp = void 0;
	var dateTimestampProvider_1 = /*@__PURE__*/ requireDateTimestampProvider();
	var map_1 = /*@__PURE__*/ requireMap();
	function timestamp$1(timestampProvider) {
	    if (timestampProvider === void 0) { timestampProvider = dateTimestampProvider_1.dateTimestampProvider; }
	    return map_1.map(function (value) { return ({ value: value, timestamp: timestampProvider.now() }); });
	}
	timestamp.timestamp = timestamp$1;
	
	return timestamp;
}

var window$1 = {};

var hasRequiredWindow;

function requireWindow () {
	if (hasRequiredWindow) return window$1;
	hasRequiredWindow = 1;
	Object.defineProperty(window$1, "__esModule", { value: true });
	window$1.window = void 0;
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var noop_1 = /*@__PURE__*/ requireNoop();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function window(windowBoundaries) {
	    return lift_1.operate(function (source, subscriber) {
	        var windowSubject = new Subject_1.Subject();
	        subscriber.next(windowSubject.asObservable());
	        var errorHandler = function (err) {
	            windowSubject.error(err);
	            subscriber.error(err);
	        };
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value); }, function () {
	            windowSubject.complete();
	            subscriber.complete();
	        }, errorHandler));
	        innerFrom_1.innerFrom(windowBoundaries).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	            windowSubject.complete();
	            subscriber.next((windowSubject = new Subject_1.Subject()));
	        }, noop_1.noop, errorHandler));
	        return function () {
	            windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
	            windowSubject = null;
	        };
	    });
	}
	window$1.window = window;
	
	return window$1;
}

var windowCount = {};

var hasRequiredWindowCount;

function requireWindowCount () {
	if (hasRequiredWindowCount) return windowCount;
	hasRequiredWindowCount = 1;
	var __values = (windowCount && windowCount.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(windowCount, "__esModule", { value: true });
	windowCount.windowCount = void 0;
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	function windowCount$1(windowSize, startWindowEvery) {
	    if (startWindowEvery === void 0) { startWindowEvery = 0; }
	    var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
	    return lift_1.operate(function (source, subscriber) {
	        var windows = [new Subject_1.Subject()];
	        var count = 0;
	        subscriber.next(windows[0].asObservable());
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var e_1, _a;
	            try {
	                for (var windows_1 = __values(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
	                    var window_1 = windows_1_1.value;
	                    window_1.next(value);
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	            var c = count - windowSize + 1;
	            if (c >= 0 && c % startEvery === 0) {
	                windows.shift().complete();
	            }
	            if (++count % startEvery === 0) {
	                var window_2 = new Subject_1.Subject();
	                windows.push(window_2);
	                subscriber.next(window_2.asObservable());
	            }
	        }, function () {
	            while (windows.length > 0) {
	                windows.shift().complete();
	            }
	            subscriber.complete();
	        }, function (err) {
	            while (windows.length > 0) {
	                windows.shift().error(err);
	            }
	            subscriber.error(err);
	        }, function () {
	            windows = null;
	        }));
	    });
	}
	windowCount.windowCount = windowCount$1;
	
	return windowCount;
}

var windowTime = {};

var hasRequiredWindowTime;

function requireWindowTime () {
	if (hasRequiredWindowTime) return windowTime;
	hasRequiredWindowTime = 1;
	Object.defineProperty(windowTime, "__esModule", { value: true });
	windowTime.windowTime = void 0;
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var async_1 = /*@__PURE__*/ requireAsync();
	var Subscription_1 = /*@__PURE__*/ requireSubscription();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var arrRemove_1 = /*@__PURE__*/ requireArrRemove();
	var args_1 = /*@__PURE__*/ requireArgs();
	var executeSchedule_1 = /*@__PURE__*/ requireExecuteSchedule();
	function windowTime$1(windowTimeSpan) {
	    var _a, _b;
	    var otherArgs = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        otherArgs[_i - 1] = arguments[_i];
	    }
	    var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
	    var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
	    var maxWindowSize = otherArgs[1] || Infinity;
	    return lift_1.operate(function (source, subscriber) {
	        var windowRecords = [];
	        var restartOnClose = false;
	        var closeWindow = function (record) {
	            var window = record.window, subs = record.subs;
	            window.complete();
	            subs.unsubscribe();
	            arrRemove_1.arrRemove(windowRecords, record);
	            restartOnClose && startWindow();
	        };
	        var startWindow = function () {
	            if (windowRecords) {
	                var subs = new Subscription_1.Subscription();
	                subscriber.add(subs);
	                var window_1 = new Subject_1.Subject();
	                var record_1 = {
	                    window: window_1,
	                    subs: subs,
	                    seen: 0,
	                };
	                windowRecords.push(record_1);
	                subscriber.next(window_1.asObservable());
	                executeSchedule_1.executeSchedule(subs, scheduler, function () { return closeWindow(record_1); }, windowTimeSpan);
	            }
	        };
	        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
	            executeSchedule_1.executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
	        }
	        else {
	            restartOnClose = true;
	        }
	        startWindow();
	        var loop = function (cb) { return windowRecords.slice().forEach(cb); };
	        var terminate = function (cb) {
	            loop(function (_a) {
	                var window = _a.window;
	                return cb(window);
	            });
	            cb(subscriber);
	            subscriber.unsubscribe();
	        };
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            loop(function (record) {
	                record.window.next(value);
	                maxWindowSize <= ++record.seen && closeWindow(record);
	            });
	        }, function () { return terminate(function (consumer) { return consumer.complete(); }); }, function (err) { return terminate(function (consumer) { return consumer.error(err); }); }));
	        return function () {
	            windowRecords = null;
	        };
	    });
	}
	windowTime.windowTime = windowTime$1;
	
	return windowTime;
}

var windowToggle = {};

var hasRequiredWindowToggle;

function requireWindowToggle () {
	if (hasRequiredWindowToggle) return windowToggle;
	hasRequiredWindowToggle = 1;
	var __values = (windowToggle && windowToggle.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(windowToggle, "__esModule", { value: true });
	windowToggle.windowToggle = void 0;
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var Subscription_1 = /*@__PURE__*/ requireSubscription();
	var lift_1 = /*@__PURE__*/ requireLift();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var noop_1 = /*@__PURE__*/ requireNoop();
	var arrRemove_1 = /*@__PURE__*/ requireArrRemove();
	function windowToggle$1(openings, closingSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var windows = [];
	        var handleError = function (err) {
	            while (0 < windows.length) {
	                windows.shift().error(err);
	            }
	            subscriber.error(err);
	        };
	        innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (openValue) {
	            var window = new Subject_1.Subject();
	            windows.push(window);
	            var closingSubscription = new Subscription_1.Subscription();
	            var closeWindow = function () {
	                arrRemove_1.arrRemove(windows, window);
	                window.complete();
	                closingSubscription.unsubscribe();
	            };
	            var closingNotifier;
	            try {
	                closingNotifier = innerFrom_1.innerFrom(closingSelector(openValue));
	            }
	            catch (err) {
	                handleError(err);
	                return;
	            }
	            subscriber.next(window.asObservable());
	            closingSubscription.add(closingNotifier.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, closeWindow, noop_1.noop, handleError)));
	        }, noop_1.noop));
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var e_1, _a;
	            var windowsCopy = windows.slice();
	            try {
	                for (var windowsCopy_1 = __values(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
	                    var window_1 = windowsCopy_1_1.value;
	                    window_1.next(value);
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	        }, function () {
	            while (0 < windows.length) {
	                windows.shift().complete();
	            }
	            subscriber.complete();
	        }, handleError, function () {
	            while (0 < windows.length) {
	                windows.shift().unsubscribe();
	            }
	        }));
	    });
	}
	windowToggle.windowToggle = windowToggle$1;
	
	return windowToggle;
}

var windowWhen = {};

var hasRequiredWindowWhen;

function requireWindowWhen () {
	if (hasRequiredWindowWhen) return windowWhen;
	hasRequiredWindowWhen = 1;
	Object.defineProperty(windowWhen, "__esModule", { value: true });
	windowWhen.windowWhen = void 0;
	var Subject_1 = /*@__PURE__*/ requireSubject();
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	function windowWhen$1(closingSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var window;
	        var closingSubscriber;
	        var handleError = function (err) {
	            window.error(err);
	            subscriber.error(err);
	        };
	        var openWindow = function () {
	            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
	            window === null || window === void 0 ? void 0 : window.complete();
	            window = new Subject_1.Subject();
	            subscriber.next(window.asObservable());
	            var closingNotifier;
	            try {
	                closingNotifier = innerFrom_1.innerFrom(closingSelector());
	            }
	            catch (err) {
	                handleError(err);
	                return;
	            }
	            closingNotifier.subscribe((closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openWindow, openWindow, handleError)));
	        };
	        openWindow();
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return window.next(value); }, function () {
	            window.complete();
	            subscriber.complete();
	        }, handleError, function () {
	            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
	            window = null;
	        }));
	    });
	}
	windowWhen.windowWhen = windowWhen$1;
	
	return windowWhen;
}

var withLatestFrom = {};

var hasRequiredWithLatestFrom;

function requireWithLatestFrom () {
	if (hasRequiredWithLatestFrom) return withLatestFrom;
	hasRequiredWithLatestFrom = 1;
	var __read = (withLatestFrom && withLatestFrom.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (withLatestFrom && withLatestFrom.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(withLatestFrom, "__esModule", { value: true });
	withLatestFrom.withLatestFrom = void 0;
	var lift_1 = /*@__PURE__*/ requireLift();
	var OperatorSubscriber_1 = /*@__PURE__*/ requireOperatorSubscriber();
	var innerFrom_1 = /*@__PURE__*/ requireInnerFrom();
	var identity_1 = /*@__PURE__*/ requireIdentity();
	var noop_1 = /*@__PURE__*/ requireNoop();
	var args_1 = /*@__PURE__*/ requireArgs();
	function withLatestFrom$1() {
	    var inputs = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        inputs[_i] = arguments[_i];
	    }
	    var project = args_1.popResultSelector(inputs);
	    return lift_1.operate(function (source, subscriber) {
	        var len = inputs.length;
	        var otherValues = new Array(len);
	        var hasValue = inputs.map(function () { return false; });
	        var ready = false;
	        var _loop_1 = function (i) {
	            innerFrom_1.innerFrom(inputs[i]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                otherValues[i] = value;
	                if (!ready && !hasValue[i]) {
	                    hasValue[i] = true;
	                    (ready = hasValue.every(identity_1.identity)) && (hasValue = null);
	                }
	            }, noop_1.noop));
	        };
	        for (var i = 0; i < len; i++) {
	            _loop_1(i);
	        }
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            if (ready) {
	                var values = __spreadArray([value], __read(otherValues));
	                subscriber.next(project ? project.apply(void 0, __spreadArray([], __read(values))) : values);
	            }
	        }));
	    });
	}
	withLatestFrom.withLatestFrom = withLatestFrom$1;
	
	return withLatestFrom;
}

var zipAll = {};

var hasRequiredZipAll;

function requireZipAll () {
	if (hasRequiredZipAll) return zipAll;
	hasRequiredZipAll = 1;
	Object.defineProperty(zipAll, "__esModule", { value: true });
	zipAll.zipAll = void 0;
	var zip_1 = /*@__PURE__*/ requireZip$1();
	var joinAllInternals_1 = /*@__PURE__*/ requireJoinAllInternals();
	function zipAll$1(project) {
	    return joinAllInternals_1.joinAllInternals(zip_1.zip, project);
	}
	zipAll.zipAll = zipAll$1;
	
	return zipAll;
}

var zipWith = {};

var zip = {};

var hasRequiredZip;

function requireZip () {
	if (hasRequiredZip) return zip;
	hasRequiredZip = 1;
	var __read = (zip && zip.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (zip && zip.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(zip, "__esModule", { value: true });
	zip.zip = void 0;
	var zip_1 = /*@__PURE__*/ requireZip$1();
	var lift_1 = /*@__PURE__*/ requireLift();
	function zip$1() {
	    var sources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        sources[_i] = arguments[_i];
	    }
	    return lift_1.operate(function (source, subscriber) {
	        zip_1.zip.apply(void 0, __spreadArray([source], __read(sources))).subscribe(subscriber);
	    });
	}
	zip.zip = zip$1;
	
	return zip;
}

var hasRequiredZipWith;

function requireZipWith () {
	if (hasRequiredZipWith) return zipWith;
	hasRequiredZipWith = 1;
	var __read = (zipWith && zipWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (zipWith && zipWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(zipWith, "__esModule", { value: true });
	zipWith.zipWith = void 0;
	var zip_1 = /*@__PURE__*/ requireZip();
	function zipWith$1() {
	    var otherInputs = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        otherInputs[_i] = arguments[_i];
	    }
	    return zip_1.zip.apply(void 0, __spreadArray([], __read(otherInputs)));
	}
	zipWith.zipWith = zipWith$1;
	
	return zipWith;
}

var hasRequiredCjs;

function requireCjs () {
	if (hasRequiredCjs) return cjs;
	hasRequiredCjs = 1;
	(function (exports) {
		var __createBinding = (cjs && cjs.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (cjs && cjs.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.interval = exports.iif = exports.generate = exports.fromEventPattern = exports.fromEvent = exports.from = exports.forkJoin = exports.empty = exports.defer = exports.connectable = exports.concat = exports.combineLatest = exports.bindNodeCallback = exports.bindCallback = exports.UnsubscriptionError = exports.TimeoutError = exports.SequenceError = exports.ObjectUnsubscribedError = exports.NotFoundError = exports.EmptyError = exports.ArgumentOutOfRangeError = exports.firstValueFrom = exports.lastValueFrom = exports.isObservable = exports.identity = exports.noop = exports.pipe = exports.NotificationKind = exports.Notification = exports.Subscriber = exports.Subscription = exports.Scheduler = exports.VirtualAction = exports.VirtualTimeScheduler = exports.animationFrameScheduler = exports.animationFrame = exports.queueScheduler = exports.queue = exports.asyncScheduler = exports.async = exports.asapScheduler = exports.asap = exports.AsyncSubject = exports.ReplaySubject = exports.BehaviorSubject = exports.Subject = exports.animationFrames = exports.observable = exports.ConnectableObservable = exports.Observable = void 0;
		exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.combineLatestWith = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = exports.config = exports.NEVER = exports.EMPTY = exports.scheduled = exports.zip = exports.using = exports.timer = exports.throwError = exports.range = exports.race = exports.partition = exports.pairs = exports.onErrorResumeNext = exports.of = exports.never = exports.merge = void 0;
		exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.pairwise = exports.onErrorResumeNextWith = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = exports.mergeAll = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = void 0;
		exports.zipWith = exports.zipAll = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = exports.switchMapTo = void 0;
		var Observable_1 = /*@__PURE__*/ requireObservable();
		Object.defineProperty(exports, "Observable", { enumerable: true, get: function () { return Observable_1.Observable; } });
		var ConnectableObservable_1 = /*@__PURE__*/ requireConnectableObservable();
		Object.defineProperty(exports, "ConnectableObservable", { enumerable: true, get: function () { return ConnectableObservable_1.ConnectableObservable; } });
		var observable_1 = /*@__PURE__*/ requireObservable$1();
		Object.defineProperty(exports, "observable", { enumerable: true, get: function () { return observable_1.observable; } });
		var animationFrames_1 = /*@__PURE__*/ requireAnimationFrames();
		Object.defineProperty(exports, "animationFrames", { enumerable: true, get: function () { return animationFrames_1.animationFrames; } });
		var Subject_1 = /*@__PURE__*/ requireSubject();
		Object.defineProperty(exports, "Subject", { enumerable: true, get: function () { return Subject_1.Subject; } });
		var BehaviorSubject_1 = /*@__PURE__*/ requireBehaviorSubject();
		Object.defineProperty(exports, "BehaviorSubject", { enumerable: true, get: function () { return BehaviorSubject_1.BehaviorSubject; } });
		var ReplaySubject_1 = /*@__PURE__*/ requireReplaySubject();
		Object.defineProperty(exports, "ReplaySubject", { enumerable: true, get: function () { return ReplaySubject_1.ReplaySubject; } });
		var AsyncSubject_1 = /*@__PURE__*/ requireAsyncSubject();
		Object.defineProperty(exports, "AsyncSubject", { enumerable: true, get: function () { return AsyncSubject_1.AsyncSubject; } });
		var asap_1 = /*@__PURE__*/ requireAsap();
		Object.defineProperty(exports, "asap", { enumerable: true, get: function () { return asap_1.asap; } });
		Object.defineProperty(exports, "asapScheduler", { enumerable: true, get: function () { return asap_1.asapScheduler; } });
		var async_1 = /*@__PURE__*/ requireAsync();
		Object.defineProperty(exports, "async", { enumerable: true, get: function () { return async_1.async; } });
		Object.defineProperty(exports, "asyncScheduler", { enumerable: true, get: function () { return async_1.asyncScheduler; } });
		var queue_1 = /*@__PURE__*/ requireQueue();
		Object.defineProperty(exports, "queue", { enumerable: true, get: function () { return queue_1.queue; } });
		Object.defineProperty(exports, "queueScheduler", { enumerable: true, get: function () { return queue_1.queueScheduler; } });
		var animationFrame_1 = /*@__PURE__*/ requireAnimationFrame();
		Object.defineProperty(exports, "animationFrame", { enumerable: true, get: function () { return animationFrame_1.animationFrame; } });
		Object.defineProperty(exports, "animationFrameScheduler", { enumerable: true, get: function () { return animationFrame_1.animationFrameScheduler; } });
		var VirtualTimeScheduler_1 = /*@__PURE__*/ requireVirtualTimeScheduler();
		Object.defineProperty(exports, "VirtualTimeScheduler", { enumerable: true, get: function () { return VirtualTimeScheduler_1.VirtualTimeScheduler; } });
		Object.defineProperty(exports, "VirtualAction", { enumerable: true, get: function () { return VirtualTimeScheduler_1.VirtualAction; } });
		var Scheduler_1 = /*@__PURE__*/ requireScheduler();
		Object.defineProperty(exports, "Scheduler", { enumerable: true, get: function () { return Scheduler_1.Scheduler; } });
		var Subscription_1 = /*@__PURE__*/ requireSubscription();
		Object.defineProperty(exports, "Subscription", { enumerable: true, get: function () { return Subscription_1.Subscription; } });
		var Subscriber_1 = /*@__PURE__*/ requireSubscriber();
		Object.defineProperty(exports, "Subscriber", { enumerable: true, get: function () { return Subscriber_1.Subscriber; } });
		var Notification_1 = /*@__PURE__*/ requireNotification();
		Object.defineProperty(exports, "Notification", { enumerable: true, get: function () { return Notification_1.Notification; } });
		Object.defineProperty(exports, "NotificationKind", { enumerable: true, get: function () { return Notification_1.NotificationKind; } });
		var pipe_1 = /*@__PURE__*/ requirePipe();
		Object.defineProperty(exports, "pipe", { enumerable: true, get: function () { return pipe_1.pipe; } });
		var noop_1 = /*@__PURE__*/ requireNoop();
		Object.defineProperty(exports, "noop", { enumerable: true, get: function () { return noop_1.noop; } });
		var identity_1 = /*@__PURE__*/ requireIdentity();
		Object.defineProperty(exports, "identity", { enumerable: true, get: function () { return identity_1.identity; } });
		var isObservable_1 = /*@__PURE__*/ requireIsObservable();
		Object.defineProperty(exports, "isObservable", { enumerable: true, get: function () { return isObservable_1.isObservable; } });
		var lastValueFrom_1 = /*@__PURE__*/ requireLastValueFrom();
		Object.defineProperty(exports, "lastValueFrom", { enumerable: true, get: function () { return lastValueFrom_1.lastValueFrom; } });
		var firstValueFrom_1 = /*@__PURE__*/ requireFirstValueFrom();
		Object.defineProperty(exports, "firstValueFrom", { enumerable: true, get: function () { return firstValueFrom_1.firstValueFrom; } });
		var ArgumentOutOfRangeError_1 = /*@__PURE__*/ requireArgumentOutOfRangeError();
		Object.defineProperty(exports, "ArgumentOutOfRangeError", { enumerable: true, get: function () { return ArgumentOutOfRangeError_1.ArgumentOutOfRangeError; } });
		var EmptyError_1 = /*@__PURE__*/ requireEmptyError();
		Object.defineProperty(exports, "EmptyError", { enumerable: true, get: function () { return EmptyError_1.EmptyError; } });
		var NotFoundError_1 = /*@__PURE__*/ requireNotFoundError();
		Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return NotFoundError_1.NotFoundError; } });
		var ObjectUnsubscribedError_1 = /*@__PURE__*/ requireObjectUnsubscribedError();
		Object.defineProperty(exports, "ObjectUnsubscribedError", { enumerable: true, get: function () { return ObjectUnsubscribedError_1.ObjectUnsubscribedError; } });
		var SequenceError_1 = /*@__PURE__*/ requireSequenceError();
		Object.defineProperty(exports, "SequenceError", { enumerable: true, get: function () { return SequenceError_1.SequenceError; } });
		var timeout_1 = /*@__PURE__*/ requireTimeout();
		Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function () { return timeout_1.TimeoutError; } });
		var UnsubscriptionError_1 = /*@__PURE__*/ requireUnsubscriptionError();
		Object.defineProperty(exports, "UnsubscriptionError", { enumerable: true, get: function () { return UnsubscriptionError_1.UnsubscriptionError; } });
		var bindCallback_1 = /*@__PURE__*/ requireBindCallback();
		Object.defineProperty(exports, "bindCallback", { enumerable: true, get: function () { return bindCallback_1.bindCallback; } });
		var bindNodeCallback_1 = /*@__PURE__*/ requireBindNodeCallback();
		Object.defineProperty(exports, "bindNodeCallback", { enumerable: true, get: function () { return bindNodeCallback_1.bindNodeCallback; } });
		var combineLatest_1 = /*@__PURE__*/ requireCombineLatest$1();
		Object.defineProperty(exports, "combineLatest", { enumerable: true, get: function () { return combineLatest_1.combineLatest; } });
		var concat_1 = /*@__PURE__*/ requireConcat$1();
		Object.defineProperty(exports, "concat", { enumerable: true, get: function () { return concat_1.concat; } });
		var connectable_1 = /*@__PURE__*/ requireConnectable();
		Object.defineProperty(exports, "connectable", { enumerable: true, get: function () { return connectable_1.connectable; } });
		var defer_1 = /*@__PURE__*/ requireDefer();
		Object.defineProperty(exports, "defer", { enumerable: true, get: function () { return defer_1.defer; } });
		var empty_1 = /*@__PURE__*/ requireEmpty();
		Object.defineProperty(exports, "empty", { enumerable: true, get: function () { return empty_1.empty; } });
		var forkJoin_1 = /*@__PURE__*/ requireForkJoin();
		Object.defineProperty(exports, "forkJoin", { enumerable: true, get: function () { return forkJoin_1.forkJoin; } });
		var from_1 = /*@__PURE__*/ requireFrom();
		Object.defineProperty(exports, "from", { enumerable: true, get: function () { return from_1.from; } });
		var fromEvent_1 = /*@__PURE__*/ requireFromEvent();
		Object.defineProperty(exports, "fromEvent", { enumerable: true, get: function () { return fromEvent_1.fromEvent; } });
		var fromEventPattern_1 = /*@__PURE__*/ requireFromEventPattern();
		Object.defineProperty(exports, "fromEventPattern", { enumerable: true, get: function () { return fromEventPattern_1.fromEventPattern; } });
		var generate_1 = /*@__PURE__*/ requireGenerate();
		Object.defineProperty(exports, "generate", { enumerable: true, get: function () { return generate_1.generate; } });
		var iif_1 = /*@__PURE__*/ requireIif();
		Object.defineProperty(exports, "iif", { enumerable: true, get: function () { return iif_1.iif; } });
		var interval_1 = /*@__PURE__*/ requireInterval();
		Object.defineProperty(exports, "interval", { enumerable: true, get: function () { return interval_1.interval; } });
		var merge_1 = /*@__PURE__*/ requireMerge$1();
		Object.defineProperty(exports, "merge", { enumerable: true, get: function () { return merge_1.merge; } });
		var never_1 = /*@__PURE__*/ requireNever();
		Object.defineProperty(exports, "never", { enumerable: true, get: function () { return never_1.never; } });
		var of_1 = /*@__PURE__*/ requireOf();
		Object.defineProperty(exports, "of", { enumerable: true, get: function () { return of_1.of; } });
		var onErrorResumeNext_1 = /*@__PURE__*/ requireOnErrorResumeNext();
		Object.defineProperty(exports, "onErrorResumeNext", { enumerable: true, get: function () { return onErrorResumeNext_1.onErrorResumeNext; } });
		var pairs_1 = /*@__PURE__*/ requirePairs();
		Object.defineProperty(exports, "pairs", { enumerable: true, get: function () { return pairs_1.pairs; } });
		var partition_1 = /*@__PURE__*/ requirePartition$1();
		Object.defineProperty(exports, "partition", { enumerable: true, get: function () { return partition_1.partition; } });
		var race_1 = /*@__PURE__*/ requireRace$1();
		Object.defineProperty(exports, "race", { enumerable: true, get: function () { return race_1.race; } });
		var range_1 = /*@__PURE__*/ requireRange();
		Object.defineProperty(exports, "range", { enumerable: true, get: function () { return range_1.range; } });
		var throwError_1 = /*@__PURE__*/ requireThrowError();
		Object.defineProperty(exports, "throwError", { enumerable: true, get: function () { return throwError_1.throwError; } });
		var timer_1 = /*@__PURE__*/ requireTimer();
		Object.defineProperty(exports, "timer", { enumerable: true, get: function () { return timer_1.timer; } });
		var using_1 = /*@__PURE__*/ requireUsing();
		Object.defineProperty(exports, "using", { enumerable: true, get: function () { return using_1.using; } });
		var zip_1 = /*@__PURE__*/ requireZip$1();
		Object.defineProperty(exports, "zip", { enumerable: true, get: function () { return zip_1.zip; } });
		var scheduled_1 = /*@__PURE__*/ requireScheduled();
		Object.defineProperty(exports, "scheduled", { enumerable: true, get: function () { return scheduled_1.scheduled; } });
		var empty_2 = /*@__PURE__*/ requireEmpty();
		Object.defineProperty(exports, "EMPTY", { enumerable: true, get: function () { return empty_2.EMPTY; } });
		var never_2 = /*@__PURE__*/ requireNever();
		Object.defineProperty(exports, "NEVER", { enumerable: true, get: function () { return never_2.NEVER; } });
		__exportStar(/*@__PURE__*/ requireTypes(), exports);
		var config_1 = /*@__PURE__*/ requireConfig();
		Object.defineProperty(exports, "config", { enumerable: true, get: function () { return config_1.config; } });
		var audit_1 = /*@__PURE__*/ requireAudit();
		Object.defineProperty(exports, "audit", { enumerable: true, get: function () { return audit_1.audit; } });
		var auditTime_1 = /*@__PURE__*/ requireAuditTime();
		Object.defineProperty(exports, "auditTime", { enumerable: true, get: function () { return auditTime_1.auditTime; } });
		var buffer_1 = /*@__PURE__*/ requireBuffer();
		Object.defineProperty(exports, "buffer", { enumerable: true, get: function () { return buffer_1.buffer; } });
		var bufferCount_1 = /*@__PURE__*/ requireBufferCount();
		Object.defineProperty(exports, "bufferCount", { enumerable: true, get: function () { return bufferCount_1.bufferCount; } });
		var bufferTime_1 = /*@__PURE__*/ requireBufferTime();
		Object.defineProperty(exports, "bufferTime", { enumerable: true, get: function () { return bufferTime_1.bufferTime; } });
		var bufferToggle_1 = /*@__PURE__*/ requireBufferToggle();
		Object.defineProperty(exports, "bufferToggle", { enumerable: true, get: function () { return bufferToggle_1.bufferToggle; } });
		var bufferWhen_1 = /*@__PURE__*/ requireBufferWhen();
		Object.defineProperty(exports, "bufferWhen", { enumerable: true, get: function () { return bufferWhen_1.bufferWhen; } });
		var catchError_1 = /*@__PURE__*/ requireCatchError();
		Object.defineProperty(exports, "catchError", { enumerable: true, get: function () { return catchError_1.catchError; } });
		var combineAll_1 = /*@__PURE__*/ requireCombineAll();
		Object.defineProperty(exports, "combineAll", { enumerable: true, get: function () { return combineAll_1.combineAll; } });
		var combineLatestAll_1 = /*@__PURE__*/ requireCombineLatestAll();
		Object.defineProperty(exports, "combineLatestAll", { enumerable: true, get: function () { return combineLatestAll_1.combineLatestAll; } });
		var combineLatestWith_1 = /*@__PURE__*/ requireCombineLatestWith();
		Object.defineProperty(exports, "combineLatestWith", { enumerable: true, get: function () { return combineLatestWith_1.combineLatestWith; } });
		var concatAll_1 = /*@__PURE__*/ requireConcatAll();
		Object.defineProperty(exports, "concatAll", { enumerable: true, get: function () { return concatAll_1.concatAll; } });
		var concatMap_1 = /*@__PURE__*/ requireConcatMap();
		Object.defineProperty(exports, "concatMap", { enumerable: true, get: function () { return concatMap_1.concatMap; } });
		var concatMapTo_1 = /*@__PURE__*/ requireConcatMapTo();
		Object.defineProperty(exports, "concatMapTo", { enumerable: true, get: function () { return concatMapTo_1.concatMapTo; } });
		var concatWith_1 = /*@__PURE__*/ requireConcatWith();
		Object.defineProperty(exports, "concatWith", { enumerable: true, get: function () { return concatWith_1.concatWith; } });
		var connect_1 = /*@__PURE__*/ requireConnect();
		Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return connect_1.connect; } });
		var count_1 = /*@__PURE__*/ requireCount();
		Object.defineProperty(exports, "count", { enumerable: true, get: function () { return count_1.count; } });
		var debounce_1 = /*@__PURE__*/ requireDebounce();
		Object.defineProperty(exports, "debounce", { enumerable: true, get: function () { return debounce_1.debounce; } });
		var debounceTime_1 = /*@__PURE__*/ requireDebounceTime();
		Object.defineProperty(exports, "debounceTime", { enumerable: true, get: function () { return debounceTime_1.debounceTime; } });
		var defaultIfEmpty_1 = /*@__PURE__*/ requireDefaultIfEmpty();
		Object.defineProperty(exports, "defaultIfEmpty", { enumerable: true, get: function () { return defaultIfEmpty_1.defaultIfEmpty; } });
		var delay_1 = /*@__PURE__*/ requireDelay();
		Object.defineProperty(exports, "delay", { enumerable: true, get: function () { return delay_1.delay; } });
		var delayWhen_1 = /*@__PURE__*/ requireDelayWhen();
		Object.defineProperty(exports, "delayWhen", { enumerable: true, get: function () { return delayWhen_1.delayWhen; } });
		var dematerialize_1 = /*@__PURE__*/ requireDematerialize();
		Object.defineProperty(exports, "dematerialize", { enumerable: true, get: function () { return dematerialize_1.dematerialize; } });
		var distinct_1 = /*@__PURE__*/ requireDistinct();
		Object.defineProperty(exports, "distinct", { enumerable: true, get: function () { return distinct_1.distinct; } });
		var distinctUntilChanged_1 = /*@__PURE__*/ requireDistinctUntilChanged();
		Object.defineProperty(exports, "distinctUntilChanged", { enumerable: true, get: function () { return distinctUntilChanged_1.distinctUntilChanged; } });
		var distinctUntilKeyChanged_1 = /*@__PURE__*/ requireDistinctUntilKeyChanged();
		Object.defineProperty(exports, "distinctUntilKeyChanged", { enumerable: true, get: function () { return distinctUntilKeyChanged_1.distinctUntilKeyChanged; } });
		var elementAt_1 = /*@__PURE__*/ requireElementAt();
		Object.defineProperty(exports, "elementAt", { enumerable: true, get: function () { return elementAt_1.elementAt; } });
		var endWith_1 = /*@__PURE__*/ requireEndWith();
		Object.defineProperty(exports, "endWith", { enumerable: true, get: function () { return endWith_1.endWith; } });
		var every_1 = /*@__PURE__*/ requireEvery();
		Object.defineProperty(exports, "every", { enumerable: true, get: function () { return every_1.every; } });
		var exhaust_1 = /*@__PURE__*/ requireExhaust();
		Object.defineProperty(exports, "exhaust", { enumerable: true, get: function () { return exhaust_1.exhaust; } });
		var exhaustAll_1 = /*@__PURE__*/ requireExhaustAll();
		Object.defineProperty(exports, "exhaustAll", { enumerable: true, get: function () { return exhaustAll_1.exhaustAll; } });
		var exhaustMap_1 = /*@__PURE__*/ requireExhaustMap();
		Object.defineProperty(exports, "exhaustMap", { enumerable: true, get: function () { return exhaustMap_1.exhaustMap; } });
		var expand_1 = /*@__PURE__*/ requireExpand();
		Object.defineProperty(exports, "expand", { enumerable: true, get: function () { return expand_1.expand; } });
		var filter_1 = /*@__PURE__*/ requireFilter();
		Object.defineProperty(exports, "filter", { enumerable: true, get: function () { return filter_1.filter; } });
		var finalize_1 = /*@__PURE__*/ requireFinalize();
		Object.defineProperty(exports, "finalize", { enumerable: true, get: function () { return finalize_1.finalize; } });
		var find_1 = /*@__PURE__*/ requireFind();
		Object.defineProperty(exports, "find", { enumerable: true, get: function () { return find_1.find; } });
		var findIndex_1 = /*@__PURE__*/ requireFindIndex();
		Object.defineProperty(exports, "findIndex", { enumerable: true, get: function () { return findIndex_1.findIndex; } });
		var first_1 = /*@__PURE__*/ requireFirst();
		Object.defineProperty(exports, "first", { enumerable: true, get: function () { return first_1.first; } });
		var groupBy_1 = /*@__PURE__*/ requireGroupBy();
		Object.defineProperty(exports, "groupBy", { enumerable: true, get: function () { return groupBy_1.groupBy; } });
		var ignoreElements_1 = /*@__PURE__*/ requireIgnoreElements();
		Object.defineProperty(exports, "ignoreElements", { enumerable: true, get: function () { return ignoreElements_1.ignoreElements; } });
		var isEmpty_1 = /*@__PURE__*/ requireIsEmpty();
		Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function () { return isEmpty_1.isEmpty; } });
		var last_1 = /*@__PURE__*/ requireLast();
		Object.defineProperty(exports, "last", { enumerable: true, get: function () { return last_1.last; } });
		var map_1 = /*@__PURE__*/ requireMap();
		Object.defineProperty(exports, "map", { enumerable: true, get: function () { return map_1.map; } });
		var mapTo_1 = /*@__PURE__*/ requireMapTo();
		Object.defineProperty(exports, "mapTo", { enumerable: true, get: function () { return mapTo_1.mapTo; } });
		var materialize_1 = /*@__PURE__*/ requireMaterialize();
		Object.defineProperty(exports, "materialize", { enumerable: true, get: function () { return materialize_1.materialize; } });
		var max_1 = /*@__PURE__*/ requireMax();
		Object.defineProperty(exports, "max", { enumerable: true, get: function () { return max_1.max; } });
		var mergeAll_1 = /*@__PURE__*/ requireMergeAll();
		Object.defineProperty(exports, "mergeAll", { enumerable: true, get: function () { return mergeAll_1.mergeAll; } });
		var flatMap_1 = /*@__PURE__*/ requireFlatMap();
		Object.defineProperty(exports, "flatMap", { enumerable: true, get: function () { return flatMap_1.flatMap; } });
		var mergeMap_1 = /*@__PURE__*/ requireMergeMap();
		Object.defineProperty(exports, "mergeMap", { enumerable: true, get: function () { return mergeMap_1.mergeMap; } });
		var mergeMapTo_1 = /*@__PURE__*/ requireMergeMapTo();
		Object.defineProperty(exports, "mergeMapTo", { enumerable: true, get: function () { return mergeMapTo_1.mergeMapTo; } });
		var mergeScan_1 = /*@__PURE__*/ requireMergeScan();
		Object.defineProperty(exports, "mergeScan", { enumerable: true, get: function () { return mergeScan_1.mergeScan; } });
		var mergeWith_1 = /*@__PURE__*/ requireMergeWith();
		Object.defineProperty(exports, "mergeWith", { enumerable: true, get: function () { return mergeWith_1.mergeWith; } });
		var min_1 = /*@__PURE__*/ requireMin();
		Object.defineProperty(exports, "min", { enumerable: true, get: function () { return min_1.min; } });
		var multicast_1 = /*@__PURE__*/ requireMulticast();
		Object.defineProperty(exports, "multicast", { enumerable: true, get: function () { return multicast_1.multicast; } });
		var observeOn_1 = /*@__PURE__*/ requireObserveOn();
		Object.defineProperty(exports, "observeOn", { enumerable: true, get: function () { return observeOn_1.observeOn; } });
		var onErrorResumeNextWith_1 = /*@__PURE__*/ requireOnErrorResumeNextWith();
		Object.defineProperty(exports, "onErrorResumeNextWith", { enumerable: true, get: function () { return onErrorResumeNextWith_1.onErrorResumeNextWith; } });
		var pairwise_1 = /*@__PURE__*/ requirePairwise();
		Object.defineProperty(exports, "pairwise", { enumerable: true, get: function () { return pairwise_1.pairwise; } });
		var pluck_1 = /*@__PURE__*/ requirePluck();
		Object.defineProperty(exports, "pluck", { enumerable: true, get: function () { return pluck_1.pluck; } });
		var publish_1 = /*@__PURE__*/ requirePublish();
		Object.defineProperty(exports, "publish", { enumerable: true, get: function () { return publish_1.publish; } });
		var publishBehavior_1 = /*@__PURE__*/ requirePublishBehavior();
		Object.defineProperty(exports, "publishBehavior", { enumerable: true, get: function () { return publishBehavior_1.publishBehavior; } });
		var publishLast_1 = /*@__PURE__*/ requirePublishLast();
		Object.defineProperty(exports, "publishLast", { enumerable: true, get: function () { return publishLast_1.publishLast; } });
		var publishReplay_1 = /*@__PURE__*/ requirePublishReplay();
		Object.defineProperty(exports, "publishReplay", { enumerable: true, get: function () { return publishReplay_1.publishReplay; } });
		var raceWith_1 = /*@__PURE__*/ requireRaceWith();
		Object.defineProperty(exports, "raceWith", { enumerable: true, get: function () { return raceWith_1.raceWith; } });
		var reduce_1 = /*@__PURE__*/ requireReduce();
		Object.defineProperty(exports, "reduce", { enumerable: true, get: function () { return reduce_1.reduce; } });
		var repeat_1 = /*@__PURE__*/ requireRepeat();
		Object.defineProperty(exports, "repeat", { enumerable: true, get: function () { return repeat_1.repeat; } });
		var repeatWhen_1 = /*@__PURE__*/ requireRepeatWhen();
		Object.defineProperty(exports, "repeatWhen", { enumerable: true, get: function () { return repeatWhen_1.repeatWhen; } });
		var retry_1 = /*@__PURE__*/ requireRetry();
		Object.defineProperty(exports, "retry", { enumerable: true, get: function () { return retry_1.retry; } });
		var retryWhen_1 = /*@__PURE__*/ requireRetryWhen();
		Object.defineProperty(exports, "retryWhen", { enumerable: true, get: function () { return retryWhen_1.retryWhen; } });
		var refCount_1 = /*@__PURE__*/ requireRefCount();
		Object.defineProperty(exports, "refCount", { enumerable: true, get: function () { return refCount_1.refCount; } });
		var sample_1 = /*@__PURE__*/ requireSample();
		Object.defineProperty(exports, "sample", { enumerable: true, get: function () { return sample_1.sample; } });
		var sampleTime_1 = /*@__PURE__*/ requireSampleTime();
		Object.defineProperty(exports, "sampleTime", { enumerable: true, get: function () { return sampleTime_1.sampleTime; } });
		var scan_1 = /*@__PURE__*/ requireScan();
		Object.defineProperty(exports, "scan", { enumerable: true, get: function () { return scan_1.scan; } });
		var sequenceEqual_1 = /*@__PURE__*/ requireSequenceEqual();
		Object.defineProperty(exports, "sequenceEqual", { enumerable: true, get: function () { return sequenceEqual_1.sequenceEqual; } });
		var share_1 = /*@__PURE__*/ requireShare();
		Object.defineProperty(exports, "share", { enumerable: true, get: function () { return share_1.share; } });
		var shareReplay_1 = /*@__PURE__*/ requireShareReplay();
		Object.defineProperty(exports, "shareReplay", { enumerable: true, get: function () { return shareReplay_1.shareReplay; } });
		var single_1 = /*@__PURE__*/ requireSingle();
		Object.defineProperty(exports, "single", { enumerable: true, get: function () { return single_1.single; } });
		var skip_1 = /*@__PURE__*/ requireSkip();
		Object.defineProperty(exports, "skip", { enumerable: true, get: function () { return skip_1.skip; } });
		var skipLast_1 = /*@__PURE__*/ requireSkipLast();
		Object.defineProperty(exports, "skipLast", { enumerable: true, get: function () { return skipLast_1.skipLast; } });
		var skipUntil_1 = /*@__PURE__*/ requireSkipUntil();
		Object.defineProperty(exports, "skipUntil", { enumerable: true, get: function () { return skipUntil_1.skipUntil; } });
		var skipWhile_1 = /*@__PURE__*/ requireSkipWhile();
		Object.defineProperty(exports, "skipWhile", { enumerable: true, get: function () { return skipWhile_1.skipWhile; } });
		var startWith_1 = /*@__PURE__*/ requireStartWith();
		Object.defineProperty(exports, "startWith", { enumerable: true, get: function () { return startWith_1.startWith; } });
		var subscribeOn_1 = /*@__PURE__*/ requireSubscribeOn();
		Object.defineProperty(exports, "subscribeOn", { enumerable: true, get: function () { return subscribeOn_1.subscribeOn; } });
		var switchAll_1 = /*@__PURE__*/ requireSwitchAll();
		Object.defineProperty(exports, "switchAll", { enumerable: true, get: function () { return switchAll_1.switchAll; } });
		var switchMap_1 = /*@__PURE__*/ requireSwitchMap();
		Object.defineProperty(exports, "switchMap", { enumerable: true, get: function () { return switchMap_1.switchMap; } });
		var switchMapTo_1 = /*@__PURE__*/ requireSwitchMapTo();
		Object.defineProperty(exports, "switchMapTo", { enumerable: true, get: function () { return switchMapTo_1.switchMapTo; } });
		var switchScan_1 = /*@__PURE__*/ requireSwitchScan();
		Object.defineProperty(exports, "switchScan", { enumerable: true, get: function () { return switchScan_1.switchScan; } });
		var take_1 = /*@__PURE__*/ requireTake();
		Object.defineProperty(exports, "take", { enumerable: true, get: function () { return take_1.take; } });
		var takeLast_1 = /*@__PURE__*/ requireTakeLast();
		Object.defineProperty(exports, "takeLast", { enumerable: true, get: function () { return takeLast_1.takeLast; } });
		var takeUntil_1 = /*@__PURE__*/ requireTakeUntil();
		Object.defineProperty(exports, "takeUntil", { enumerable: true, get: function () { return takeUntil_1.takeUntil; } });
		var takeWhile_1 = /*@__PURE__*/ requireTakeWhile();
		Object.defineProperty(exports, "takeWhile", { enumerable: true, get: function () { return takeWhile_1.takeWhile; } });
		var tap_1 = /*@__PURE__*/ requireTap();
		Object.defineProperty(exports, "tap", { enumerable: true, get: function () { return tap_1.tap; } });
		var throttle_1 = /*@__PURE__*/ requireThrottle();
		Object.defineProperty(exports, "throttle", { enumerable: true, get: function () { return throttle_1.throttle; } });
		var throttleTime_1 = /*@__PURE__*/ requireThrottleTime();
		Object.defineProperty(exports, "throttleTime", { enumerable: true, get: function () { return throttleTime_1.throttleTime; } });
		var throwIfEmpty_1 = /*@__PURE__*/ requireThrowIfEmpty();
		Object.defineProperty(exports, "throwIfEmpty", { enumerable: true, get: function () { return throwIfEmpty_1.throwIfEmpty; } });
		var timeInterval_1 = /*@__PURE__*/ requireTimeInterval();
		Object.defineProperty(exports, "timeInterval", { enumerable: true, get: function () { return timeInterval_1.timeInterval; } });
		var timeout_2 = /*@__PURE__*/ requireTimeout();
		Object.defineProperty(exports, "timeout", { enumerable: true, get: function () { return timeout_2.timeout; } });
		var timeoutWith_1 = /*@__PURE__*/ requireTimeoutWith();
		Object.defineProperty(exports, "timeoutWith", { enumerable: true, get: function () { return timeoutWith_1.timeoutWith; } });
		var timestamp_1 = /*@__PURE__*/ requireTimestamp();
		Object.defineProperty(exports, "timestamp", { enumerable: true, get: function () { return timestamp_1.timestamp; } });
		var toArray_1 = /*@__PURE__*/ requireToArray();
		Object.defineProperty(exports, "toArray", { enumerable: true, get: function () { return toArray_1.toArray; } });
		var window_1 = /*@__PURE__*/ requireWindow();
		Object.defineProperty(exports, "window", { enumerable: true, get: function () { return window_1.window; } });
		var windowCount_1 = /*@__PURE__*/ requireWindowCount();
		Object.defineProperty(exports, "windowCount", { enumerable: true, get: function () { return windowCount_1.windowCount; } });
		var windowTime_1 = /*@__PURE__*/ requireWindowTime();
		Object.defineProperty(exports, "windowTime", { enumerable: true, get: function () { return windowTime_1.windowTime; } });
		var windowToggle_1 = /*@__PURE__*/ requireWindowToggle();
		Object.defineProperty(exports, "windowToggle", { enumerable: true, get: function () { return windowToggle_1.windowToggle; } });
		var windowWhen_1 = /*@__PURE__*/ requireWindowWhen();
		Object.defineProperty(exports, "windowWhen", { enumerable: true, get: function () { return windowWhen_1.windowWhen; } });
		var withLatestFrom_1 = /*@__PURE__*/ requireWithLatestFrom();
		Object.defineProperty(exports, "withLatestFrom", { enumerable: true, get: function () { return withLatestFrom_1.withLatestFrom; } });
		var zipAll_1 = /*@__PURE__*/ requireZipAll();
		Object.defineProperty(exports, "zipAll", { enumerable: true, get: function () { return zipAll_1.zipAll; } });
		var zipWith_1 = /*@__PURE__*/ requireZipWith();
		Object.defineProperty(exports, "zipWith", { enumerable: true, get: function () { return zipWith_1.zipWith; } });
		
	} (cjs));
	return cjs;
}

var cjsExports = /*@__PURE__*/ requireCjs();

function isRecord$1(value) {
  return typeof value == "object" && value !== null && !Array.isArray(value);
}

function isRecord(value) {
  return typeof value == "object" && value !== null && !Array.isArray(value);
}
var s = { 0: 8203, 1: 8204, 2: 8205, 3: 8290, 4: 8291, 5: 8288, 6: 65279, 7: 8289, 8: 119155, 9: 119156, a: 119157, b: 119158, c: 119159, d: 119160, e: 119161, f: 119162 }, c = { 0: 8203, 1: 8204, 2: 8205, 3: 65279 }, u = new Array(4).fill(String.fromCodePoint(c[0])).join("");
function E(t) {
  let e = JSON.stringify(t);
  return `${u}${Array.from(e).map((r) => {
    let n = r.charCodeAt(0);
    if (n > 255) throw new Error(`Only ASCII edit info can be encoded. Error attempting to encode ${e} on character ${r} (${n})`);
    return Array.from(n.toString(4).padStart(4, "0")).map((o) => String.fromCodePoint(c[o])).join("");
  }).join("")}`;
}
function I(t) {
  return !Number.isNaN(Number(t)) || /[a-z]/i.test(t) && !/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(t) ? false : !!Date.parse(t);
}
function T(t) {
  try {
    new URL(t, t.startsWith("/") ? "https://acme.com" : void 0);
  } catch {
    return false;
  }
  return true;
}
function C(t, e, r = "auto") {
  return r === true || r === "auto" && (I(t) || T(t)) ? t : `${t}${E(e)}`;
}
Object.fromEntries(Object.entries(c).map((t) => t.reverse()));
Object.fromEntries(Object.entries(s).map((t) => t.reverse()));
var S = `${Object.values(s).map((t) => `\\u{${t.toString(16)}}`).join("")}`, f = new RegExp(`[${S}]{4,}`, "gu");
function _(t) {
  var e;
  return { cleaned: t.replace(f, ""), encoded: ((e = t.match(f)) == null ? void 0 : e[0]) || "" };
}
function O(t) {
  return t && JSON.parse(_(JSON.stringify(t)).cleaned);
}
function stegaClean(result) {
  return O(result);
}

var operators = {};

var partition = {};

var hasRequiredPartition;

function requirePartition () {
	if (hasRequiredPartition) return partition;
	hasRequiredPartition = 1;
	Object.defineProperty(partition, "__esModule", { value: true });
	partition.partition = void 0;
	var not_1 = /*@__PURE__*/ requireNot();
	var filter_1 = /*@__PURE__*/ requireFilter();
	function partition$1(predicate, thisArg) {
	    return function (source) {
	        return [filter_1.filter(predicate, thisArg)(source), filter_1.filter(not_1.not(predicate, thisArg))(source)];
	    };
	}
	partition.partition = partition$1;
	
	return partition;
}

var race = {};

var hasRequiredRace;

function requireRace () {
	if (hasRequiredRace) return race;
	hasRequiredRace = 1;
	var __read = (race && race.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (race && race.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(race, "__esModule", { value: true });
	race.race = void 0;
	var argsOrArgArray_1 = /*@__PURE__*/ requireArgsOrArgArray();
	var raceWith_1 = /*@__PURE__*/ requireRaceWith();
	function race$1() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    return raceWith_1.raceWith.apply(void 0, __spreadArray([], __read(argsOrArgArray_1.argsOrArgArray(args))));
	}
	race.race = race$1;
	
	return race;
}

var hasRequiredOperators;

function requireOperators () {
	if (hasRequiredOperators) return operators;
	hasRequiredOperators = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.mergeAll = exports.merge = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.concat = exports.combineLatestWith = exports.combineLatest = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = void 0;
		exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = exports.switchMapTo = exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.race = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.partition = exports.pairwise = exports.onErrorResumeNext = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = void 0;
		exports.zipWith = exports.zipAll = exports.zip = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = void 0;
		var audit_1 = /*@__PURE__*/ requireAudit();
		Object.defineProperty(exports, "audit", { enumerable: true, get: function () { return audit_1.audit; } });
		var auditTime_1 = /*@__PURE__*/ requireAuditTime();
		Object.defineProperty(exports, "auditTime", { enumerable: true, get: function () { return auditTime_1.auditTime; } });
		var buffer_1 = /*@__PURE__*/ requireBuffer();
		Object.defineProperty(exports, "buffer", { enumerable: true, get: function () { return buffer_1.buffer; } });
		var bufferCount_1 = /*@__PURE__*/ requireBufferCount();
		Object.defineProperty(exports, "bufferCount", { enumerable: true, get: function () { return bufferCount_1.bufferCount; } });
		var bufferTime_1 = /*@__PURE__*/ requireBufferTime();
		Object.defineProperty(exports, "bufferTime", { enumerable: true, get: function () { return bufferTime_1.bufferTime; } });
		var bufferToggle_1 = /*@__PURE__*/ requireBufferToggle();
		Object.defineProperty(exports, "bufferToggle", { enumerable: true, get: function () { return bufferToggle_1.bufferToggle; } });
		var bufferWhen_1 = /*@__PURE__*/ requireBufferWhen();
		Object.defineProperty(exports, "bufferWhen", { enumerable: true, get: function () { return bufferWhen_1.bufferWhen; } });
		var catchError_1 = /*@__PURE__*/ requireCatchError();
		Object.defineProperty(exports, "catchError", { enumerable: true, get: function () { return catchError_1.catchError; } });
		var combineAll_1 = /*@__PURE__*/ requireCombineAll();
		Object.defineProperty(exports, "combineAll", { enumerable: true, get: function () { return combineAll_1.combineAll; } });
		var combineLatestAll_1 = /*@__PURE__*/ requireCombineLatestAll();
		Object.defineProperty(exports, "combineLatestAll", { enumerable: true, get: function () { return combineLatestAll_1.combineLatestAll; } });
		var combineLatest_1 = /*@__PURE__*/ requireCombineLatest();
		Object.defineProperty(exports, "combineLatest", { enumerable: true, get: function () { return combineLatest_1.combineLatest; } });
		var combineLatestWith_1 = /*@__PURE__*/ requireCombineLatestWith();
		Object.defineProperty(exports, "combineLatestWith", { enumerable: true, get: function () { return combineLatestWith_1.combineLatestWith; } });
		var concat_1 = /*@__PURE__*/ requireConcat();
		Object.defineProperty(exports, "concat", { enumerable: true, get: function () { return concat_1.concat; } });
		var concatAll_1 = /*@__PURE__*/ requireConcatAll();
		Object.defineProperty(exports, "concatAll", { enumerable: true, get: function () { return concatAll_1.concatAll; } });
		var concatMap_1 = /*@__PURE__*/ requireConcatMap();
		Object.defineProperty(exports, "concatMap", { enumerable: true, get: function () { return concatMap_1.concatMap; } });
		var concatMapTo_1 = /*@__PURE__*/ requireConcatMapTo();
		Object.defineProperty(exports, "concatMapTo", { enumerable: true, get: function () { return concatMapTo_1.concatMapTo; } });
		var concatWith_1 = /*@__PURE__*/ requireConcatWith();
		Object.defineProperty(exports, "concatWith", { enumerable: true, get: function () { return concatWith_1.concatWith; } });
		var connect_1 = /*@__PURE__*/ requireConnect();
		Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return connect_1.connect; } });
		var count_1 = /*@__PURE__*/ requireCount();
		Object.defineProperty(exports, "count", { enumerable: true, get: function () { return count_1.count; } });
		var debounce_1 = /*@__PURE__*/ requireDebounce();
		Object.defineProperty(exports, "debounce", { enumerable: true, get: function () { return debounce_1.debounce; } });
		var debounceTime_1 = /*@__PURE__*/ requireDebounceTime();
		Object.defineProperty(exports, "debounceTime", { enumerable: true, get: function () { return debounceTime_1.debounceTime; } });
		var defaultIfEmpty_1 = /*@__PURE__*/ requireDefaultIfEmpty();
		Object.defineProperty(exports, "defaultIfEmpty", { enumerable: true, get: function () { return defaultIfEmpty_1.defaultIfEmpty; } });
		var delay_1 = /*@__PURE__*/ requireDelay();
		Object.defineProperty(exports, "delay", { enumerable: true, get: function () { return delay_1.delay; } });
		var delayWhen_1 = /*@__PURE__*/ requireDelayWhen();
		Object.defineProperty(exports, "delayWhen", { enumerable: true, get: function () { return delayWhen_1.delayWhen; } });
		var dematerialize_1 = /*@__PURE__*/ requireDematerialize();
		Object.defineProperty(exports, "dematerialize", { enumerable: true, get: function () { return dematerialize_1.dematerialize; } });
		var distinct_1 = /*@__PURE__*/ requireDistinct();
		Object.defineProperty(exports, "distinct", { enumerable: true, get: function () { return distinct_1.distinct; } });
		var distinctUntilChanged_1 = /*@__PURE__*/ requireDistinctUntilChanged();
		Object.defineProperty(exports, "distinctUntilChanged", { enumerable: true, get: function () { return distinctUntilChanged_1.distinctUntilChanged; } });
		var distinctUntilKeyChanged_1 = /*@__PURE__*/ requireDistinctUntilKeyChanged();
		Object.defineProperty(exports, "distinctUntilKeyChanged", { enumerable: true, get: function () { return distinctUntilKeyChanged_1.distinctUntilKeyChanged; } });
		var elementAt_1 = /*@__PURE__*/ requireElementAt();
		Object.defineProperty(exports, "elementAt", { enumerable: true, get: function () { return elementAt_1.elementAt; } });
		var endWith_1 = /*@__PURE__*/ requireEndWith();
		Object.defineProperty(exports, "endWith", { enumerable: true, get: function () { return endWith_1.endWith; } });
		var every_1 = /*@__PURE__*/ requireEvery();
		Object.defineProperty(exports, "every", { enumerable: true, get: function () { return every_1.every; } });
		var exhaust_1 = /*@__PURE__*/ requireExhaust();
		Object.defineProperty(exports, "exhaust", { enumerable: true, get: function () { return exhaust_1.exhaust; } });
		var exhaustAll_1 = /*@__PURE__*/ requireExhaustAll();
		Object.defineProperty(exports, "exhaustAll", { enumerable: true, get: function () { return exhaustAll_1.exhaustAll; } });
		var exhaustMap_1 = /*@__PURE__*/ requireExhaustMap();
		Object.defineProperty(exports, "exhaustMap", { enumerable: true, get: function () { return exhaustMap_1.exhaustMap; } });
		var expand_1 = /*@__PURE__*/ requireExpand();
		Object.defineProperty(exports, "expand", { enumerable: true, get: function () { return expand_1.expand; } });
		var filter_1 = /*@__PURE__*/ requireFilter();
		Object.defineProperty(exports, "filter", { enumerable: true, get: function () { return filter_1.filter; } });
		var finalize_1 = /*@__PURE__*/ requireFinalize();
		Object.defineProperty(exports, "finalize", { enumerable: true, get: function () { return finalize_1.finalize; } });
		var find_1 = /*@__PURE__*/ requireFind();
		Object.defineProperty(exports, "find", { enumerable: true, get: function () { return find_1.find; } });
		var findIndex_1 = /*@__PURE__*/ requireFindIndex();
		Object.defineProperty(exports, "findIndex", { enumerable: true, get: function () { return findIndex_1.findIndex; } });
		var first_1 = /*@__PURE__*/ requireFirst();
		Object.defineProperty(exports, "first", { enumerable: true, get: function () { return first_1.first; } });
		var groupBy_1 = /*@__PURE__*/ requireGroupBy();
		Object.defineProperty(exports, "groupBy", { enumerable: true, get: function () { return groupBy_1.groupBy; } });
		var ignoreElements_1 = /*@__PURE__*/ requireIgnoreElements();
		Object.defineProperty(exports, "ignoreElements", { enumerable: true, get: function () { return ignoreElements_1.ignoreElements; } });
		var isEmpty_1 = /*@__PURE__*/ requireIsEmpty();
		Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function () { return isEmpty_1.isEmpty; } });
		var last_1 = /*@__PURE__*/ requireLast();
		Object.defineProperty(exports, "last", { enumerable: true, get: function () { return last_1.last; } });
		var map_1 = /*@__PURE__*/ requireMap();
		Object.defineProperty(exports, "map", { enumerable: true, get: function () { return map_1.map; } });
		var mapTo_1 = /*@__PURE__*/ requireMapTo();
		Object.defineProperty(exports, "mapTo", { enumerable: true, get: function () { return mapTo_1.mapTo; } });
		var materialize_1 = /*@__PURE__*/ requireMaterialize();
		Object.defineProperty(exports, "materialize", { enumerable: true, get: function () { return materialize_1.materialize; } });
		var max_1 = /*@__PURE__*/ requireMax();
		Object.defineProperty(exports, "max", { enumerable: true, get: function () { return max_1.max; } });
		var merge_1 = /*@__PURE__*/ requireMerge();
		Object.defineProperty(exports, "merge", { enumerable: true, get: function () { return merge_1.merge; } });
		var mergeAll_1 = /*@__PURE__*/ requireMergeAll();
		Object.defineProperty(exports, "mergeAll", { enumerable: true, get: function () { return mergeAll_1.mergeAll; } });
		var flatMap_1 = /*@__PURE__*/ requireFlatMap();
		Object.defineProperty(exports, "flatMap", { enumerable: true, get: function () { return flatMap_1.flatMap; } });
		var mergeMap_1 = /*@__PURE__*/ requireMergeMap();
		Object.defineProperty(exports, "mergeMap", { enumerable: true, get: function () { return mergeMap_1.mergeMap; } });
		var mergeMapTo_1 = /*@__PURE__*/ requireMergeMapTo();
		Object.defineProperty(exports, "mergeMapTo", { enumerable: true, get: function () { return mergeMapTo_1.mergeMapTo; } });
		var mergeScan_1 = /*@__PURE__*/ requireMergeScan();
		Object.defineProperty(exports, "mergeScan", { enumerable: true, get: function () { return mergeScan_1.mergeScan; } });
		var mergeWith_1 = /*@__PURE__*/ requireMergeWith();
		Object.defineProperty(exports, "mergeWith", { enumerable: true, get: function () { return mergeWith_1.mergeWith; } });
		var min_1 = /*@__PURE__*/ requireMin();
		Object.defineProperty(exports, "min", { enumerable: true, get: function () { return min_1.min; } });
		var multicast_1 = /*@__PURE__*/ requireMulticast();
		Object.defineProperty(exports, "multicast", { enumerable: true, get: function () { return multicast_1.multicast; } });
		var observeOn_1 = /*@__PURE__*/ requireObserveOn();
		Object.defineProperty(exports, "observeOn", { enumerable: true, get: function () { return observeOn_1.observeOn; } });
		var onErrorResumeNextWith_1 = /*@__PURE__*/ requireOnErrorResumeNextWith();
		Object.defineProperty(exports, "onErrorResumeNext", { enumerable: true, get: function () { return onErrorResumeNextWith_1.onErrorResumeNext; } });
		var pairwise_1 = /*@__PURE__*/ requirePairwise();
		Object.defineProperty(exports, "pairwise", { enumerable: true, get: function () { return pairwise_1.pairwise; } });
		var partition_1 = /*@__PURE__*/ requirePartition();
		Object.defineProperty(exports, "partition", { enumerable: true, get: function () { return partition_1.partition; } });
		var pluck_1 = /*@__PURE__*/ requirePluck();
		Object.defineProperty(exports, "pluck", { enumerable: true, get: function () { return pluck_1.pluck; } });
		var publish_1 = /*@__PURE__*/ requirePublish();
		Object.defineProperty(exports, "publish", { enumerable: true, get: function () { return publish_1.publish; } });
		var publishBehavior_1 = /*@__PURE__*/ requirePublishBehavior();
		Object.defineProperty(exports, "publishBehavior", { enumerable: true, get: function () { return publishBehavior_1.publishBehavior; } });
		var publishLast_1 = /*@__PURE__*/ requirePublishLast();
		Object.defineProperty(exports, "publishLast", { enumerable: true, get: function () { return publishLast_1.publishLast; } });
		var publishReplay_1 = /*@__PURE__*/ requirePublishReplay();
		Object.defineProperty(exports, "publishReplay", { enumerable: true, get: function () { return publishReplay_1.publishReplay; } });
		var race_1 = /*@__PURE__*/ requireRace();
		Object.defineProperty(exports, "race", { enumerable: true, get: function () { return race_1.race; } });
		var raceWith_1 = /*@__PURE__*/ requireRaceWith();
		Object.defineProperty(exports, "raceWith", { enumerable: true, get: function () { return raceWith_1.raceWith; } });
		var reduce_1 = /*@__PURE__*/ requireReduce();
		Object.defineProperty(exports, "reduce", { enumerable: true, get: function () { return reduce_1.reduce; } });
		var repeat_1 = /*@__PURE__*/ requireRepeat();
		Object.defineProperty(exports, "repeat", { enumerable: true, get: function () { return repeat_1.repeat; } });
		var repeatWhen_1 = /*@__PURE__*/ requireRepeatWhen();
		Object.defineProperty(exports, "repeatWhen", { enumerable: true, get: function () { return repeatWhen_1.repeatWhen; } });
		var retry_1 = /*@__PURE__*/ requireRetry();
		Object.defineProperty(exports, "retry", { enumerable: true, get: function () { return retry_1.retry; } });
		var retryWhen_1 = /*@__PURE__*/ requireRetryWhen();
		Object.defineProperty(exports, "retryWhen", { enumerable: true, get: function () { return retryWhen_1.retryWhen; } });
		var refCount_1 = /*@__PURE__*/ requireRefCount();
		Object.defineProperty(exports, "refCount", { enumerable: true, get: function () { return refCount_1.refCount; } });
		var sample_1 = /*@__PURE__*/ requireSample();
		Object.defineProperty(exports, "sample", { enumerable: true, get: function () { return sample_1.sample; } });
		var sampleTime_1 = /*@__PURE__*/ requireSampleTime();
		Object.defineProperty(exports, "sampleTime", { enumerable: true, get: function () { return sampleTime_1.sampleTime; } });
		var scan_1 = /*@__PURE__*/ requireScan();
		Object.defineProperty(exports, "scan", { enumerable: true, get: function () { return scan_1.scan; } });
		var sequenceEqual_1 = /*@__PURE__*/ requireSequenceEqual();
		Object.defineProperty(exports, "sequenceEqual", { enumerable: true, get: function () { return sequenceEqual_1.sequenceEqual; } });
		var share_1 = /*@__PURE__*/ requireShare();
		Object.defineProperty(exports, "share", { enumerable: true, get: function () { return share_1.share; } });
		var shareReplay_1 = /*@__PURE__*/ requireShareReplay();
		Object.defineProperty(exports, "shareReplay", { enumerable: true, get: function () { return shareReplay_1.shareReplay; } });
		var single_1 = /*@__PURE__*/ requireSingle();
		Object.defineProperty(exports, "single", { enumerable: true, get: function () { return single_1.single; } });
		var skip_1 = /*@__PURE__*/ requireSkip();
		Object.defineProperty(exports, "skip", { enumerable: true, get: function () { return skip_1.skip; } });
		var skipLast_1 = /*@__PURE__*/ requireSkipLast();
		Object.defineProperty(exports, "skipLast", { enumerable: true, get: function () { return skipLast_1.skipLast; } });
		var skipUntil_1 = /*@__PURE__*/ requireSkipUntil();
		Object.defineProperty(exports, "skipUntil", { enumerable: true, get: function () { return skipUntil_1.skipUntil; } });
		var skipWhile_1 = /*@__PURE__*/ requireSkipWhile();
		Object.defineProperty(exports, "skipWhile", { enumerable: true, get: function () { return skipWhile_1.skipWhile; } });
		var startWith_1 = /*@__PURE__*/ requireStartWith();
		Object.defineProperty(exports, "startWith", { enumerable: true, get: function () { return startWith_1.startWith; } });
		var subscribeOn_1 = /*@__PURE__*/ requireSubscribeOn();
		Object.defineProperty(exports, "subscribeOn", { enumerable: true, get: function () { return subscribeOn_1.subscribeOn; } });
		var switchAll_1 = /*@__PURE__*/ requireSwitchAll();
		Object.defineProperty(exports, "switchAll", { enumerable: true, get: function () { return switchAll_1.switchAll; } });
		var switchMap_1 = /*@__PURE__*/ requireSwitchMap();
		Object.defineProperty(exports, "switchMap", { enumerable: true, get: function () { return switchMap_1.switchMap; } });
		var switchMapTo_1 = /*@__PURE__*/ requireSwitchMapTo();
		Object.defineProperty(exports, "switchMapTo", { enumerable: true, get: function () { return switchMapTo_1.switchMapTo; } });
		var switchScan_1 = /*@__PURE__*/ requireSwitchScan();
		Object.defineProperty(exports, "switchScan", { enumerable: true, get: function () { return switchScan_1.switchScan; } });
		var take_1 = /*@__PURE__*/ requireTake();
		Object.defineProperty(exports, "take", { enumerable: true, get: function () { return take_1.take; } });
		var takeLast_1 = /*@__PURE__*/ requireTakeLast();
		Object.defineProperty(exports, "takeLast", { enumerable: true, get: function () { return takeLast_1.takeLast; } });
		var takeUntil_1 = /*@__PURE__*/ requireTakeUntil();
		Object.defineProperty(exports, "takeUntil", { enumerable: true, get: function () { return takeUntil_1.takeUntil; } });
		var takeWhile_1 = /*@__PURE__*/ requireTakeWhile();
		Object.defineProperty(exports, "takeWhile", { enumerable: true, get: function () { return takeWhile_1.takeWhile; } });
		var tap_1 = /*@__PURE__*/ requireTap();
		Object.defineProperty(exports, "tap", { enumerable: true, get: function () { return tap_1.tap; } });
		var throttle_1 = /*@__PURE__*/ requireThrottle();
		Object.defineProperty(exports, "throttle", { enumerable: true, get: function () { return throttle_1.throttle; } });
		var throttleTime_1 = /*@__PURE__*/ requireThrottleTime();
		Object.defineProperty(exports, "throttleTime", { enumerable: true, get: function () { return throttleTime_1.throttleTime; } });
		var throwIfEmpty_1 = /*@__PURE__*/ requireThrowIfEmpty();
		Object.defineProperty(exports, "throwIfEmpty", { enumerable: true, get: function () { return throwIfEmpty_1.throwIfEmpty; } });
		var timeInterval_1 = /*@__PURE__*/ requireTimeInterval();
		Object.defineProperty(exports, "timeInterval", { enumerable: true, get: function () { return timeInterval_1.timeInterval; } });
		var timeout_1 = /*@__PURE__*/ requireTimeout();
		Object.defineProperty(exports, "timeout", { enumerable: true, get: function () { return timeout_1.timeout; } });
		var timeoutWith_1 = /*@__PURE__*/ requireTimeoutWith();
		Object.defineProperty(exports, "timeoutWith", { enumerable: true, get: function () { return timeoutWith_1.timeoutWith; } });
		var timestamp_1 = /*@__PURE__*/ requireTimestamp();
		Object.defineProperty(exports, "timestamp", { enumerable: true, get: function () { return timestamp_1.timestamp; } });
		var toArray_1 = /*@__PURE__*/ requireToArray();
		Object.defineProperty(exports, "toArray", { enumerable: true, get: function () { return toArray_1.toArray; } });
		var window_1 = /*@__PURE__*/ requireWindow();
		Object.defineProperty(exports, "window", { enumerable: true, get: function () { return window_1.window; } });
		var windowCount_1 = /*@__PURE__*/ requireWindowCount();
		Object.defineProperty(exports, "windowCount", { enumerable: true, get: function () { return windowCount_1.windowCount; } });
		var windowTime_1 = /*@__PURE__*/ requireWindowTime();
		Object.defineProperty(exports, "windowTime", { enumerable: true, get: function () { return windowTime_1.windowTime; } });
		var windowToggle_1 = /*@__PURE__*/ requireWindowToggle();
		Object.defineProperty(exports, "windowToggle", { enumerable: true, get: function () { return windowToggle_1.windowToggle; } });
		var windowWhen_1 = /*@__PURE__*/ requireWindowWhen();
		Object.defineProperty(exports, "windowWhen", { enumerable: true, get: function () { return windowWhen_1.windowWhen; } });
		var withLatestFrom_1 = /*@__PURE__*/ requireWithLatestFrom();
		Object.defineProperty(exports, "withLatestFrom", { enumerable: true, get: function () { return withLatestFrom_1.withLatestFrom; } });
		var zip_1 = /*@__PURE__*/ requireZip();
		Object.defineProperty(exports, "zip", { enumerable: true, get: function () { return zip_1.zip; } });
		var zipAll_1 = /*@__PURE__*/ requireZipAll();
		Object.defineProperty(exports, "zipAll", { enumerable: true, get: function () { return zipAll_1.zipAll; } });
		var zipWith_1 = /*@__PURE__*/ requireZipWith();
		Object.defineProperty(exports, "zipWith", { enumerable: true, get: function () { return zipWith_1.zipWith; } });
		
	} (operators));
	return operators;
}

var operatorsExports = /*@__PURE__*/ requireOperators();

const DRAFTS_FOLDER = "drafts", VERSION_FOLDER = "versions", PATH_SEPARATOR = ".", DRAFTS_PREFIX = `${DRAFTS_FOLDER}${PATH_SEPARATOR}`, VERSION_PREFIX = `${VERSION_FOLDER}${PATH_SEPARATOR}`;
function isDraftId(id) {
  return id.startsWith(DRAFTS_PREFIX);
}
function isVersionId(id) {
  return id.startsWith(VERSION_PREFIX);
}
function getDraftId(id) {
  if (isVersionId(id)) {
    const publishedId = getPublishedId(id);
    return DRAFTS_PREFIX + publishedId;
  }
  return isDraftId(id) ? id : DRAFTS_PREFIX + id;
}
function getVersionId(id, version) {
  if (version === "drafts" || version === "published")
    throw new Error('Version can not be "published" or "drafts"');
  return `${VERSION_PREFIX}${version}${PATH_SEPARATOR}${getPublishedId(id)}`;
}
function getVersionFromId(id) {
  if (!isVersionId(id)) return;
  const [_versionPrefix, versionId, ..._publishedId] = id.split(PATH_SEPARATOR);
  return versionId;
}
function getPublishedId(id) {
  return isVersionId(id) ? id.split(PATH_SEPARATOR).slice(2).join(PATH_SEPARATOR) : isDraftId(id) ? id.slice(DRAFTS_PREFIX.length) : id;
}

const BASE_URL = "https://www.sanity.io/help/";
function generateHelpUrl(slug) {
  return BASE_URL + slug;
}
const VALID_ASSET_TYPES = ["image", "file"], VALID_INSERT_LOCATIONS = ["before", "after", "replace"], dataset = (name) => {
  if (!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(name))
    throw new Error(
      "Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters"
    );
}, projectId = (id) => {
  if (!/^[-a-z0-9]+$/i.test(id))
    throw new Error("`projectId` can only contain only a-z, 0-9 and dashes");
}, validateAssetType = (type) => {
  if (VALID_ASSET_TYPES.indexOf(type) === -1)
    throw new Error(`Invalid asset type: ${type}. Must be one of ${VALID_ASSET_TYPES.join(", ")}`);
}, validateObject = (op, val) => {
  if (val === null || typeof val != "object" || Array.isArray(val))
    throw new Error(`${op}() takes an object of properties`);
}, validateDocumentId = (op, id) => {
  if (typeof id != "string" || !/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(id) || id.includes(".."))
    throw new Error(`${op}(): "${id}" is not a valid document ID`);
}, requireDocumentId = (op, doc) => {
  if (!doc._id)
    throw new Error(`${op}() requires that the document contains an ID ("_id" property)`);
  validateDocumentId(op, doc._id);
}, validateDocumentType = (op, type) => {
  if (typeof type != "string")
    throw new Error(`\`${op}()\`: \`${type}\` is not a valid document type`);
}, requireDocumentType = (op, doc) => {
  if (!doc._type)
    throw new Error(`\`${op}()\` requires that the document contains a type (\`_type\` property)`);
  validateDocumentType(op, doc._type);
}, validateVersionIdMatch = (builtVersionId, document) => {
  if (document._id && document._id !== builtVersionId)
    throw new Error(
      `The provided document ID (\`${document._id}\`) does not match the generated version ID (\`${builtVersionId}\`)`
    );
}, validateInsert = (at, selector, items) => {
  const signature = "insert(at, selector, items)";
  if (VALID_INSERT_LOCATIONS.indexOf(at) === -1) {
    const valid = VALID_INSERT_LOCATIONS.map((loc) => `"${loc}"`).join(", ");
    throw new Error(`${signature} takes an "at"-argument which is one of: ${valid}`);
  }
  if (typeof selector != "string")
    throw new Error(`${signature} takes a "selector"-argument which must be a string`);
  if (!Array.isArray(items))
    throw new Error(`${signature} takes an "items"-argument which must be an array`);
}, hasDataset = (config) => {
  if (!config.dataset)
    throw new Error("`dataset` must be provided to perform queries");
  return config.dataset || "";
}, requestTag = (tag) => {
  if (typeof tag != "string" || !/^[a-z0-9._-]{1,75}$/i.test(tag))
    throw new Error(
      "Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long."
    );
  return tag;
}, resourceConfig = (config) => {
  if (!config["~experimental_resource"])
    throw new Error("`resource` must be provided to perform resource queries");
  const { type, id } = config["~experimental_resource"];
  switch (type) {
    case "dataset": {
      if (id.split(".").length !== 2)
        throw new Error('Dataset resource ID must be in the format "project.dataset"');
      return;
    }
    case "dashboard":
    case "media-library":
    case "canvas":
      return;
    default:
      throw new Error(`Unsupported resource type: ${type.toString()}`);
  }
}, resourceGuard = (service, config) => {
  if (config["~experimental_resource"])
    throw new Error(`\`${service}\` does not support resource-based operations`);
};
function once(fn) {
  let didCall = false, returnValue;
  return (...args) => (didCall || (returnValue = fn(...args), didCall = true), returnValue);
}
const createWarningPrinter = (message) => (
  // eslint-disable-next-line no-console
  once((...args) => console.warn(message.join(" "), ...args))
), printCdnAndWithCredentialsWarning = createWarningPrinter([
  "Because you set `withCredentials` to true, we will override your `useCdn`",
  "setting to be false since (cookie-based) credentials are never set on the CDN"
]), printCdnWarning = createWarningPrinter([
  "Since you haven't set a value for `useCdn`, we will deliver content using our",
  "global, edge-cached API-CDN. If you wish to have content delivered faster, set",
  "`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."
]), printCdnPreviewDraftsWarning = createWarningPrinter([
  "The Sanity client is configured with the `perspective` set to `drafts` or `previewDrafts`, which doesn't support the API-CDN.",
  "The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."
]), printPreviewDraftsDeprecationWarning = createWarningPrinter([
  "The `previewDrafts` perspective has been renamed to  `drafts` and will be removed in a future API version"
]), printBrowserTokenWarning = createWarningPrinter([
  "You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.",
  `See ${generateHelpUrl(
    "js-client-browser-token"
  )} for more information and how to hide this warning.`
]), printCredentialedTokenWarning = createWarningPrinter([
  "You have configured Sanity client to use a token, but also provided `withCredentials: true`.",
  "This is no longer supported - only token will be used - remove `withCredentials: true`."
]), printNoApiVersionSpecifiedWarning = createWarningPrinter([
  "Using the Sanity client without specifying an API version is deprecated.",
  `See ${generateHelpUrl("js-client-api-version")}`
]), printCreateVersionWithBaseIdWarning = createWarningPrinter([
  "You have called `createVersion()` with a defined `document`. The recommended approach is to provide a `baseId` and `releaseId` instead."
]), defaultCdnHost = "apicdn.sanity.io", defaultConfig = {
  apiHost: "https://api.sanity.io",
  apiVersion: "1",
  useProjectHostname: true,
  stega: { enabled: false }
}, LOCALHOSTS = ["localhost", "127.0.0.1", "0.0.0.0"], isLocal = (host) => LOCALHOSTS.indexOf(host) !== -1;
function validateApiVersion(apiVersion) {
  if (apiVersion === "1" || apiVersion === "X")
    return;
  const apiDate = new Date(apiVersion);
  if (!(/^\d{4}-\d{2}-\d{2}$/.test(apiVersion) && apiDate instanceof Date && apiDate.getTime() > 0))
    throw new Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`");
}
function validateApiPerspective(perspective) {
  if (Array.isArray(perspective) && perspective.length > 1 && perspective.includes("raw"))
    throw new TypeError(
      'Invalid API perspective value: "raw". The raw-perspective can not be combined with other perspectives'
    );
}
const initConfig = (config, prevConfig) => {
  const specifiedConfig = {
    ...prevConfig,
    ...config,
    stega: {
      ...typeof prevConfig.stega == "boolean" ? { enabled: prevConfig.stega } : prevConfig.stega || defaultConfig.stega,
      ...typeof config.stega == "boolean" ? { enabled: config.stega } : config.stega || {}
    }
  };
  specifiedConfig.apiVersion || printNoApiVersionSpecifiedWarning();
  const newConfig = {
    ...defaultConfig,
    ...specifiedConfig
  }, projectBased = newConfig.useProjectHostname && !newConfig["~experimental_resource"];
  if (typeof Promise > "u") {
    const helpUrl = generateHelpUrl("js-client-promise-polyfill");
    throw new Error(`No native Promise-implementation found, polyfill needed - see ${helpUrl}`);
  }
  if (projectBased && !newConfig.projectId)
    throw new Error("Configuration must contain `projectId`");
  if (newConfig["~experimental_resource"] && resourceConfig(newConfig), typeof newConfig.perspective < "u" && validateApiPerspective(newConfig.perspective), "encodeSourceMap" in newConfig)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMap' is not supported in '@sanity/client'. Did you mean 'stega.enabled'?"
    );
  if ("encodeSourceMapAtPath" in newConfig)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMapAtPath' is not supported in '@sanity/client'. Did you mean 'stega.filter'?"
    );
  if (typeof newConfig.stega.enabled != "boolean")
    throw new Error(`stega.enabled must be a boolean, received ${newConfig.stega.enabled}`);
  if (newConfig.stega.enabled && newConfig.stega.studioUrl === void 0)
    throw new Error("stega.studioUrl must be defined when stega.enabled is true");
  if (newConfig.stega.enabled && typeof newConfig.stega.studioUrl != "string" && typeof newConfig.stega.studioUrl != "function")
    throw new Error(
      `stega.studioUrl must be a string or a function, received ${newConfig.stega.studioUrl}`
    );
  const isBrowser = typeof window < "u" && window.location && window.location.hostname, isLocalhost = isBrowser && isLocal(window.location.hostname), hasToken = !!newConfig.token;
  newConfig.withCredentials && hasToken && (printCredentialedTokenWarning(), newConfig.withCredentials = false), isBrowser && isLocalhost && hasToken && newConfig.ignoreBrowserTokenWarning !== true ? printBrowserTokenWarning() : typeof newConfig.useCdn > "u" && printCdnWarning(), projectBased && projectId(newConfig.projectId), newConfig.dataset && dataset(newConfig.dataset), "requestTagPrefix" in newConfig && (newConfig.requestTagPrefix = newConfig.requestTagPrefix ? requestTag(newConfig.requestTagPrefix).replace(/\.+$/, "") : void 0), newConfig.apiVersion = `${newConfig.apiVersion}`.replace(/^v/, ""), newConfig.isDefaultApi = newConfig.apiHost === defaultConfig.apiHost, newConfig.useCdn === true && newConfig.withCredentials && printCdnAndWithCredentialsWarning(), newConfig.useCdn = newConfig.useCdn !== false && !newConfig.withCredentials, validateApiVersion(newConfig.apiVersion);
  const hostParts = newConfig.apiHost.split("://", 2), protocol = hostParts[0], host = hostParts[1], cdnHost = newConfig.isDefaultApi ? defaultCdnHost : host;
  return projectBased ? (newConfig.url = `${protocol}://${newConfig.projectId}.${host}/v${newConfig.apiVersion}`, newConfig.cdnUrl = `${protocol}://${newConfig.projectId}.${cdnHost}/v${newConfig.apiVersion}`) : (newConfig.url = `${newConfig.apiHost}/v${newConfig.apiVersion}`, newConfig.cdnUrl = newConfig.url), newConfig;
};

const POOL_SIZE_MULTIPLIER = 128;
let pool, poolOffset;
let fillPool = bytes => {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
    crypto.randomFillSync(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    crypto.randomFillSync(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;
};
let random = bytes => {
  fillPool((bytes |= 0));
  return pool.subarray(poolOffset - bytes, poolOffset)
};
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (31 - Math.clz32((alphabet.length - 1) | 1))) - 1;
  let step = Math.ceil((1.6 * mask * defaultSize) / alphabet.length);
  return (size = defaultSize) => {
    let id = '';
    while (true) {
      let bytes = getRandom(step);
      let i = step;
      while (i--) {
        id += alphabet[bytes[i] & mask] || '';
        if (id.length === size) return id
      }
    }
  }
};
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random);

const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
function codeFrame(query, location2, message) {
  const lines = query.split(NEWLINE), loc = {
    start: columnToLine(location2.start, lines),
    end: location2.end ? columnToLine(location2.end, lines) : void 0
  }, { start, end, markerLines } = getMarkerLines(loc, lines), numberMaxWidth = `${end}`.length;
  return query.split(NEWLINE, end).slice(start, end).map((line, index) => {
    const number = start + 1 + index, gutter = ` ${` ${number}`.slice(-numberMaxWidth)} |`, hasMarker = markerLines[number], lastMarkerLine = !markerLines[number + 1];
    if (!hasMarker)
      return ` ${gutter}${line.length > 0 ? ` ${line}` : ""}`;
    let markerLine = "";
    if (Array.isArray(hasMarker)) {
      const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " "), numberOfMarkers = hasMarker[1] || 1;
      markerLine = [
        `
 `,
        gutter.replace(/\d/g, " "),
        " ",
        markerSpacing,
        "^".repeat(numberOfMarkers)
      ].join(""), lastMarkerLine && message && (markerLine += " " + message);
    }
    return [">", gutter, line.length > 0 ? ` ${line}` : "", markerLine].join("");
  }).join(`
`);
}
function getMarkerLines(loc, source) {
  const startLoc = { ...loc.start }, endLoc = { ...startLoc, ...loc.end }, linesAbove = 2, linesBelow = 3, startLine = startLoc.line ?? -1, startColumn = startLoc.column ?? 0, endLine = endLoc.line, endColumn = endLoc.column;
  let start = Math.max(startLine - (linesAbove + 1), 0), end = Math.min(source.length, endLine + linesBelow);
  startLine === -1 && (start = 0), endLine === -1 && (end = source.length);
  const lineDiff = endLine - startLine, markerLines = {};
  if (lineDiff)
    for (let i = 0; i <= lineDiff; i++) {
      const lineNumber = i + startLine;
      if (!startColumn)
        markerLines[lineNumber] = true;
      else if (i === 0) {
        const sourceLength = source[lineNumber - 1].length;
        markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1];
      } else if (i === lineDiff)
        markerLines[lineNumber] = [0, endColumn];
      else {
        const sourceLength = source[lineNumber - i].length;
        markerLines[lineNumber] = [0, sourceLength];
      }
    }
  else
    startColumn === endColumn ? startColumn ? markerLines[startLine] = [startColumn, 0] : markerLines[startLine] = true : markerLines[startLine] = [startColumn, endColumn - startColumn];
  return { start, end, markerLines };
}
function columnToLine(column, lines) {
  let offset = 0;
  for (let i = 0; i < lines.length; i++) {
    const lineLength = lines[i].length + 1;
    if (offset + lineLength > column)
      return {
        line: i + 1,
        // 1-based line
        column: column - offset
        // 0-based column
      };
    offset += lineLength;
  }
  return {
    line: lines.length,
    column: lines[lines.length - 1]?.length ?? 0
  };
}
const MAX_ITEMS_IN_ERROR_MESSAGE = 5;
class ClientError extends Error {
  response;
  statusCode = 400;
  responseBody;
  details;
  constructor(res, context) {
    const props = extractErrorProps(res, context);
    super(props.message), Object.assign(this, props);
  }
}
class ServerError extends Error {
  response;
  statusCode = 500;
  responseBody;
  details;
  constructor(res) {
    const props = extractErrorProps(res);
    super(props.message), Object.assign(this, props);
  }
}
function extractErrorProps(res, context) {
  const body = res.body, props = {
    response: res,
    statusCode: res.statusCode,
    responseBody: stringifyBody(body, res),
    message: "",
    details: void 0
  };
  if (!isRecord$1(body))
    return props.message = httpErrorMessage(res, body), props;
  const error = body.error;
  if (typeof error == "string" && typeof body.message == "string")
    return props.message = `${error} - ${body.message}`, props;
  if (typeof error != "object" || error === null)
    return typeof error == "string" ? props.message = error : typeof body.message == "string" ? props.message = body.message : props.message = httpErrorMessage(res, body), props;
  if (isMutationError(error) || isActionError(error)) {
    const allItems = error.items || [], items = allItems.slice(0, MAX_ITEMS_IN_ERROR_MESSAGE).map((item) => item.error?.description).filter(Boolean);
    let itemsStr = items.length ? `:
- ${items.join(`
- `)}` : "";
    return allItems.length > MAX_ITEMS_IN_ERROR_MESSAGE && (itemsStr += `
...and ${allItems.length - MAX_ITEMS_IN_ERROR_MESSAGE} more`), props.message = `${error.description}${itemsStr}`, props.details = body.error, props;
  }
  if (isQueryParseError(error)) {
    const tag = context?.options?.query?.tag;
    return props.message = formatQueryParseError(error, tag), props.details = body.error, props;
  }
  return "description" in error && typeof error.description == "string" ? (props.message = error.description, props.details = error, props) : (props.message = httpErrorMessage(res, body), props);
}
function isMutationError(error) {
  return "type" in error && error.type === "mutationError" && "description" in error && typeof error.description == "string";
}
function isActionError(error) {
  return "type" in error && error.type === "actionError" && "description" in error && typeof error.description == "string";
}
function isQueryParseError(error) {
  return isRecord$1(error) && error.type === "queryParseError" && typeof error.query == "string" && typeof error.start == "number" && typeof error.end == "number";
}
function formatQueryParseError(error, tag) {
  const { query, start, end, description } = error;
  if (!query || typeof start > "u")
    return `GROQ query parse error: ${description}`;
  const withTag = tag ? `

Tag: ${tag}` : "";
  return `GROQ query parse error:
${codeFrame(query, { start, end }, description)}${withTag}`;
}
function httpErrorMessage(res, body) {
  const details = typeof body == "string" ? ` (${sliceWithEllipsis(body, 100)})` : "", statusMessage = res.statusMessage ? ` ${res.statusMessage}` : "";
  return `${res.method}-request to ${res.url} resulted in HTTP ${res.statusCode}${statusMessage}${details}`;
}
function stringifyBody(body, res) {
  return (res.headers["content-type"] || "").toLowerCase().indexOf("application/json") !== -1 ? JSON.stringify(body, null, 2) : body;
}
function sliceWithEllipsis(str, max) {
  return str.length > max ? `${str.slice(0, max)}\u2026` : str;
}
class CorsOriginError extends Error {
  projectId;
  addOriginUrl;
  constructor({ projectId }) {
    super("CorsOriginError"), this.name = "CorsOriginError", this.projectId = projectId;
    const url = new URL(`https://sanity.io/manage/project/${projectId}/api`);
    if (typeof location < "u") {
      const { origin } = location;
      url.searchParams.set("cors", "add"), url.searchParams.set("origin", origin), this.addOriginUrl = url, this.message = `The current origin is not allowed to connect to the Live Content API. Add it here: ${url}`;
    } else
      this.message = `The current origin is not allowed to connect to the Live Content API. Change your configuration here: ${url}`;
  }
}
const httpError = {
  onResponse: (res, context) => {
    if (res.statusCode >= 500)
      throw new ServerError(res);
    if (res.statusCode >= 400)
      throw new ClientError(res, context);
    return res;
  }
};
function printWarnings(config = {}) {
  const seen = {}, shouldIgnoreWarning = (message) => config.ignoreWarnings === void 0 ? false : (Array.isArray(config.ignoreWarnings) ? config.ignoreWarnings : [config.ignoreWarnings]).some((pattern) => typeof pattern == "string" ? message.includes(pattern) : pattern instanceof RegExp ? pattern.test(message) : false);
  return {
    onResponse: (res) => {
      const warn = res.headers["x-sanity-warning"], warnings = Array.isArray(warn) ? warn : [warn];
      for (const msg of warnings)
        !msg || seen[msg] || shouldIgnoreWarning(msg) || (seen[msg] = true, console.warn(msg));
      return res;
    }
  };
}
function defineHttpRequest(envMiddleware, config = {}) {
  return o([
    ee({ shouldRetry }),
    ...envMiddleware,
    printWarnings(config),
    B(),
    D(),
    V(),
    httpError,
    G({ implementation: cjsExports.Observable })
  ]);
}
function shouldRetry(err, attempt, options) {
  if (options.maxRetries === 0) return false;
  const isSafe = options.method === "GET" || options.method === "HEAD", isQuery2 = (options.uri || options.url).startsWith("/data/query"), isRetriableResponse = err.response && (err.response.statusCode === 429 || err.response.statusCode === 502 || err.response.statusCode === 503);
  return (isSafe || isQuery2) && isRetriableResponse ? true : ee.shouldRetry(err, attempt, options);
}
class ConnectionFailedError extends Error {
  name = "ConnectionFailedError";
}
class DisconnectError extends Error {
  name = "DisconnectError";
  reason;
  constructor(message, reason, options = {}) {
    super(message, options), this.reason = reason;
  }
}
class ChannelError extends Error {
  name = "ChannelError";
  data;
  constructor(message, data) {
    super(message), this.data = data;
  }
}
class MessageError extends Error {
  name = "MessageError";
  data;
  constructor(message, data, options = {}) {
    super(message, options), this.data = data;
  }
}
class MessageParseError extends Error {
  name = "MessageParseError";
}
const REQUIRED_EVENTS = ["channelError", "disconnect"];
function connectEventSource(initEventSource, events) {
  return cjsExports.defer(() => {
    const es = initEventSource();
    return cjsExports.isObservable(es) ? es : cjsExports.of(es);
  }).pipe(cjsExports.mergeMap((es) => connectWithESInstance(es, events)));
}
function connectWithESInstance(es, events) {
  return new cjsExports.Observable((observer) => {
    const emitOpen = events.includes("open"), emitReconnect = events.includes("reconnect");
    function onError(evt) {
      if ("data" in evt) {
        const [parseError, event] = parseEvent(evt);
        observer.error(
          parseError ? new MessageParseError("Unable to parse EventSource error message", { cause: event }) : new MessageError((event?.data).message, event)
        );
        return;
      }
      es.readyState === es.CLOSED ? observer.error(new ConnectionFailedError("EventSource connection failed")) : emitReconnect && observer.next({ type: "reconnect" });
    }
    function onOpen() {
      observer.next({ type: "open" });
    }
    function onMessage(message) {
      const [parseError, event] = parseEvent(message);
      if (parseError) {
        observer.error(
          new MessageParseError("Unable to parse EventSource message", { cause: parseError })
        );
        return;
      }
      if (message.type === "channelError") {
        const tag = new URL(es.url).searchParams.get("tag");
        observer.error(new ChannelError(extractErrorMessage(event?.data, tag), event.data));
        return;
      }
      if (message.type === "disconnect") {
        observer.error(
          new DisconnectError(
            `Server disconnected client: ${event.data?.reason || "unknown error"}`
          )
        );
        return;
      }
      observer.next({
        type: message.type,
        id: message.lastEventId,
        ...event.data ? { data: event.data } : {}
      });
    }
    es.addEventListener("error", onError), emitOpen && es.addEventListener("open", onOpen);
    const cleanedEvents = [.../* @__PURE__ */ new Set([...REQUIRED_EVENTS, ...events])].filter((type) => type !== "error" && type !== "open" && type !== "reconnect");
    return cleanedEvents.forEach((type) => es.addEventListener(type, onMessage)), () => {
      es.removeEventListener("error", onError), emitOpen && es.removeEventListener("open", onOpen), cleanedEvents.forEach((type) => es.removeEventListener(type, onMessage)), es.close();
    };
  });
}
function parseEvent(message) {
  try {
    const data = typeof message.data == "string" && JSON.parse(message.data);
    return [
      null,
      {
        type: message.type,
        id: message.lastEventId,
        ...isEmptyObject(data) ? {} : { data }
      }
    ];
  } catch (err) {
    return [err, null];
  }
}
function extractErrorMessage(err, tag) {
  const error = err.error;
  return error ? isQueryParseError(error) ? formatQueryParseError(error, tag) : error.description ? error.description : typeof error == "string" ? error : JSON.stringify(error, null, 2) : err.message || "Unknown listener error";
}
function isEmptyObject(data) {
  for (const _ in data)
    return false;
  return true;
}
function getSelection(sel) {
  if (typeof sel == "string")
    return { id: sel };
  if (Array.isArray(sel))
    return { query: "*[_id in $ids]", params: { ids: sel } };
  if (typeof sel == "object" && sel !== null && "query" in sel && typeof sel.query == "string")
    return "params" in sel && typeof sel.params == "object" && sel.params !== null ? { query: sel.query, params: sel.params } : { query: sel.query };
  const selectionOpts = [
    "* Document ID (<docId>)",
    "* Array of document IDs",
    "* Object containing `query`"
  ].join(`
`);
  throw new Error(`Unknown selection - must be one of:

${selectionOpts}`);
}
class BasePatch {
  selection;
  operations;
  constructor(selection, operations = {}) {
    this.selection = selection, this.operations = operations;
  }
  /**
   * Sets the given attributes to the document. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  set(attrs) {
    return this._assign("set", attrs);
  }
  /**
   * Sets the given attributes to the document if they are not currently set. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  setIfMissing(attrs) {
    return this._assign("setIfMissing", attrs);
  }
  /**
   * Performs a "diff-match-patch" operation on the string attributes provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to perform operation on. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "dmp"\}
   */
  diffMatchPatch(attrs) {
    return validateObject("diffMatchPatch", attrs), this._assign("diffMatchPatch", attrs);
  }
  /**
   * Unsets the attribute paths provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attribute paths to unset.
   */
  unset(attrs) {
    if (!Array.isArray(attrs))
      throw new Error("unset(attrs) takes an array of attributes to unset, non-array given");
    return this.operations = Object.assign({}, this.operations, { unset: attrs }), this;
  }
  /**
   * Increment a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to increment, values representing the number to increment by.
   */
  inc(attrs) {
    return this._assign("inc", attrs);
  }
  /**
   * Decrement a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to decrement, values representing the number to decrement by.
   */
  dec(attrs) {
    return this._assign("dec", attrs);
  }
  /**
   * Provides methods for modifying arrays, by inserting, appending and replacing elements via a JSONPath expression.
   *
   * @param at - Location to insert at, relative to the given selector, or 'replace' the matched path
   * @param selector - JSONPath expression, eg `comments[-1]` or `blocks[_key=="abc123"]`
   * @param items - Array of items to insert/replace
   */
  insert(at, selector, items) {
    return validateInsert(at, selector, items), this._assign("insert", { [at]: selector, items });
  }
  /**
   * Append the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to append to, eg `comments` or `person.hobbies`
   * @param items - Array of items to append to the array
   */
  append(selector, items) {
    return this.insert("after", `${selector}[-1]`, items);
  }
  /**
   * Prepend the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to prepend to, eg `comments` or `person.hobbies`
   * @param items - Array of items to prepend to the array
   */
  prepend(selector, items) {
    return this.insert("before", `${selector}[0]`, items);
  }
  /**
   * Change the contents of an array by removing existing elements and/or adding new elements.
   *
   * @param selector - Attribute or JSONPath expression for array
   * @param start - Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end of the array (with origin -1) and will be set to 0 if absolute value is greater than the length of the array.x
   * @param deleteCount - An integer indicating the number of old array elements to remove.
   * @param items - The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   */
  splice(selector, start, deleteCount, items) {
    const delAll = typeof deleteCount > "u" || deleteCount === -1, startIndex = start < 0 ? start - 1 : start, delCount = delAll ? -1 : Math.max(0, start + deleteCount), delRange = startIndex < 0 && delCount >= 0 ? "" : delCount, rangeSelector = `${selector}[${startIndex}:${delRange}]`;
    return this.insert("replace", rangeSelector, items || []);
  }
  /**
   * Adds a revision clause, preventing the document from being patched if the `_rev` property does not match the given value
   *
   * @param rev - Revision to lock the patch to
   */
  ifRevisionId(rev) {
    return this.operations.ifRevisionID = rev, this;
  }
  /**
   * Return a plain JSON representation of the patch
   */
  serialize() {
    return { ...getSelection(this.selection), ...this.operations };
  }
  /**
   * Return a plain JSON representation of the patch
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the patch of all operations
   */
  reset() {
    return this.operations = {}, this;
  }
  _assign(op, props, merge2 = true) {
    return validateObject(op, props), this.operations = Object.assign({}, this.operations, {
      [op]: Object.assign({}, merge2 && this.operations[op] || {}, props)
    }), this;
  }
  _set(op, props) {
    return this._assign(op, props, false);
  }
}
class ObservablePatch extends BasePatch {
  #client;
  constructor(selection, operations, client) {
    super(selection, operations), this.#client = client;
  }
  /**
   * Clones the patch
   */
  clone() {
    return new ObservablePatch(this.selection, { ...this.operations }, this.#client);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const returnFirst = typeof this.selection == "string", opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return this.#client.mutate({ patch: this.serialize() }, opts);
  }
}
class Patch extends BasePatch {
  #client;
  constructor(selection, operations, client) {
    super(selection, operations), this.#client = client;
  }
  /**
   * Clones the patch
   */
  clone() {
    return new Patch(this.selection, { ...this.operations }, this.#client);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const returnFirst = typeof this.selection == "string", opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return this.#client.mutate({ patch: this.serialize() }, opts);
  }
}
const defaultMutateOptions = { returnDocuments: false };
class BaseTransaction {
  operations;
  trxId;
  constructor(operations = [], transactionId) {
    this.operations = operations, this.trxId = transactionId;
  }
  /**
   * Creates a new Sanity document. If `_id` is provided and already exists, the mutation will fail. If no `_id` is given, one will automatically be generated by the database.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create. Requires a `_type` property.
   */
  create(doc) {
    return validateObject("create", doc), this._add({ create: doc });
  }
  /**
   * Creates a new Sanity document. If a document with the same `_id` already exists, the create operation will be ignored.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create if it does not already exist. Requires `_id` and `_type` properties.
   */
  createIfNotExists(doc) {
    const op = "createIfNotExists";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
   * Creates a new Sanity document, or replaces an existing one if the same `_id` is already used.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create or replace. Requires `_id` and `_type` properties.
   */
  createOrReplace(doc) {
    const op = "createOrReplace";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
   * Deletes the document with the given document ID
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param documentId - Document ID to delete
   */
  delete(documentId) {
    return validateDocumentId("delete", documentId), this._add({ delete: { id: documentId } });
  }
  transactionId(id) {
    return id ? (this.trxId = id, this) : this.trxId;
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  serialize() {
    return [...this.operations];
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the transaction of all operations
   */
  reset() {
    return this.operations = [], this;
  }
  _add(mut) {
    return this.operations.push(mut), this;
  }
}
class Transaction extends BaseTransaction {
  #client;
  constructor(operations, client, transactionId) {
    super(operations, transactionId), this.#client = client;
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new Transaction([...this.operations], this.#client, this.trxId);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return this.#client.mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps == "function", isPatch = typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof Patch, isMutationSelection = typeof patchOrDocumentId == "object" && ("query" in patchOrDocumentId || "id" in patchOrDocumentId);
    if (isPatch)
      return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      const patch = patchOps(new Patch(patchOrDocumentId, {}, this.#client));
      if (!(patch instanceof Patch))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    if (isMutationSelection) {
      const patch = new Patch(patchOrDocumentId, patchOps || {}, this.#client);
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
}
class ObservableTransaction extends BaseTransaction {
  #client;
  constructor(operations, client, transactionId) {
    super(operations, transactionId), this.#client = client;
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new ObservableTransaction([...this.operations], this.#client, this.trxId);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return this.#client.mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps == "function";
    if (typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof ObservablePatch)
      return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      const patch = patchOps(new ObservablePatch(patchOrDocumentId, {}, this.#client));
      if (!(patch instanceof ObservablePatch))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
}
const projectHeader = "X-Sanity-Project-ID";
function requestOptions(config, overrides = {}) {
  const headers2 = {};
  config.headers && Object.assign(headers2, config.headers);
  const token = overrides.token || config.token;
  token && (headers2.Authorization = `Bearer ${token}`), !overrides.useGlobalApi && !config.useProjectHostname && config.projectId && (headers2[projectHeader] = config.projectId);
  const withCredentials = !!(typeof overrides.withCredentials > "u" ? config.withCredentials : overrides.withCredentials), timeout = typeof overrides.timeout > "u" ? config.timeout : overrides.timeout;
  return Object.assign({}, overrides, {
    headers: Object.assign({}, headers2, overrides.headers || {}),
    timeout: typeof timeout > "u" ? 5 * 60 * 1e3 : timeout,
    proxy: overrides.proxy || config.proxy,
    json: true,
    withCredentials,
    fetch: typeof overrides.fetch == "object" && typeof config.fetch == "object" ? { ...config.fetch, ...overrides.fetch } : overrides.fetch || config.fetch
  });
}
const encodeQueryString = ({
  query,
  params = {},
  options = {}
}) => {
  const searchParams = new URLSearchParams(), { tag, includeMutations, returnQuery, ...opts } = options;
  tag && searchParams.append("tag", tag), searchParams.append("query", query);
  for (const [key, value] of Object.entries(params))
    value !== void 0 && searchParams.append(`$${key}`, JSON.stringify(value));
  for (const [key, value] of Object.entries(opts))
    value && searchParams.append(key, `${value}`);
  return returnQuery === false && searchParams.append("returnQuery", "false"), includeMutations === false && searchParams.append("includeMutations", "false"), `?${searchParams}`;
}, excludeFalsey = (param, defValue) => param === false ? void 0 : typeof param > "u" ? defValue : param, getMutationQuery = (options = {}) => ({
  dryRun: options.dryRun,
  returnIds: true,
  returnDocuments: excludeFalsey(options.returnDocuments, true),
  visibility: options.visibility || "sync",
  autoGenerateArrayKeys: options.autoGenerateArrayKeys,
  skipCrossDatasetReferenceValidation: options.skipCrossDatasetReferenceValidation
}), isResponse = (event) => event.type === "response", getBody = (event) => event.body, indexBy = (docs, attr) => docs.reduce((indexed, doc) => (indexed[attr(doc)] = doc, indexed), /* @__PURE__ */ Object.create(null)), getQuerySizeLimit = 11264;
function _fetch(client, httpRequest, _stega, query, _params = {}, options = {}) {
  const stega = "stega" in options ? {
    ..._stega || {},
    ...typeof options.stega == "boolean" ? { enabled: options.stega } : options.stega || {}
  } : _stega, params = stega.enabled ? stegaClean(_params) : _params, mapResponse = options.filterResponse === false ? (res) => res : (res) => res.result, { cache, next, ...opts } = {
    // Opt out of setting a `signal` on an internal `fetch` if one isn't provided.
    // This is necessary in React Server Components to avoid opting out of Request Memoization.
    useAbortSignal: typeof options.signal < "u",
    // Set `resultSourceMap' when stega is enabled, as it's required for encoding.
    resultSourceMap: stega.enabled ? "withKeyArraySelector" : options.resultSourceMap,
    ...options,
    // Default to not returning the query, unless `filterResponse` is `false`,
    // or `returnQuery` is explicitly set. `true` is the default in Content Lake, so skip if truthy
    returnQuery: options.filterResponse === false && options.returnQuery !== false
  }, reqOpts = typeof cache < "u" || typeof next < "u" ? { ...opts, fetch: { cache, next } } : opts, $request = _dataRequest(client, httpRequest, "query", { query, params }, reqOpts);
  return stega.enabled ? $request.pipe(
    operatorsExports.combineLatestWith(
      cjsExports.from(
        import('./stegaEncodeSourceMap_A6WZfwpc.mjs').then(function(n) {
          return n.stegaEncodeSourceMap$1;
        }).then(
          ({ stegaEncodeSourceMap }) => stegaEncodeSourceMap
        )
      )
    ),
    operatorsExports.map(
      ([res, stegaEncodeSourceMap]) => {
        const result = stegaEncodeSourceMap(res.result, res.resultSourceMap, stega);
        return mapResponse({ ...res, result });
      }
    )
  ) : $request.pipe(operatorsExports.map(mapResponse));
}
function _getDocument(client, httpRequest, id, opts = {}) {
  const docId = (() => {
    if (!opts.releaseId)
      return id;
    const versionId = getVersionFromId(id);
    if (!versionId) {
      if (isDraftId(id))
        throw new Error(
          `The document ID (\`${id}\`) is a draft, but \`options.releaseId\` is set as \`${opts.releaseId}\``
        );
      return getVersionId(id, opts.releaseId);
    }
    if (versionId !== opts.releaseId)
      throw new Error(
        `The document ID (\`${id}\`) is already a version of \`${versionId}\` release, but this does not match the provided \`options.releaseId\` (\`${opts.releaseId}\`)`
      );
    return id;
  })(), options = {
    uri: _getDataUrl(client, "doc", docId),
    json: true,
    tag: opts.tag,
    signal: opts.signal
  };
  return _requestObservable(client, httpRequest, options).pipe(
    operatorsExports.filter(isResponse),
    operatorsExports.map((event) => event.body.documents && event.body.documents[0])
  );
}
function _getDocuments(client, httpRequest, ids, opts = {}) {
  const options = {
    uri: _getDataUrl(client, "doc", ids.join(",")),
    json: true,
    tag: opts.tag,
    signal: opts.signal
  };
  return _requestObservable(client, httpRequest, options).pipe(
    operatorsExports.filter(isResponse),
    operatorsExports.map((event) => {
      const indexed = indexBy(event.body.documents || [], (doc) => doc._id);
      return ids.map((id) => indexed[id] || null);
    })
  );
}
function _getReleaseDocuments(client, httpRequest, releaseId, opts = {}) {
  return _dataRequest(
    client,
    httpRequest,
    "query",
    {
      query: "*[sanity::partOfRelease($releaseId)]",
      params: {
        releaseId
      }
    },
    opts
  );
}
function _createIfNotExists(client, httpRequest, doc, options) {
  return requireDocumentId("createIfNotExists", doc), _create(client, httpRequest, doc, "createIfNotExists", options);
}
function _createOrReplace(client, httpRequest, doc, options) {
  return requireDocumentId("createOrReplace", doc), _create(client, httpRequest, doc, "createOrReplace", options);
}
function _createVersion(client, httpRequest, doc, publishedId, options) {
  return requireDocumentId("createVersion", doc), requireDocumentType("createVersion", doc), printCreateVersionWithBaseIdWarning(), _action(client, httpRequest, {
    actionType: "sanity.action.document.version.create",
    publishedId,
    document: doc
  }, options);
}
function _createVersionFromBase(client, httpRequest, publishedId, baseId, releaseId, ifBaseRevisionId, options) {
  if (!baseId)
    throw new Error("`createVersion()` requires `baseId` when no `document` is provided");
  if (!publishedId)
    throw new Error("`createVersion()` requires `publishedId` when `baseId` is provided");
  validateDocumentId("createVersion", baseId), validateDocumentId("createVersion", publishedId);
  const createVersionAction = {
    actionType: "sanity.action.document.version.create",
    publishedId,
    baseId,
    versionId: releaseId ? getVersionId(publishedId, releaseId) : getDraftId(publishedId),
    ifBaseRevisionId
  };
  return _action(client, httpRequest, createVersionAction, options);
}
function _delete(client, httpRequest, selection, options) {
  return _dataRequest(
    client,
    httpRequest,
    "mutate",
    { mutations: [{ delete: getSelection(selection) }] },
    options
  );
}
function _discardVersion(client, httpRequest, versionId, purge = false, options) {
  return _action(client, httpRequest, {
    actionType: "sanity.action.document.version.discard",
    versionId,
    purge
  }, options);
}
function _replaceVersion(client, httpRequest, doc, options) {
  return requireDocumentId("replaceVersion", doc), requireDocumentType("replaceVersion", doc), _action(client, httpRequest, {
    actionType: "sanity.action.document.version.replace",
    document: doc
  }, options);
}
function _unpublishVersion(client, httpRequest, versionId, publishedId, options) {
  return _action(client, httpRequest, {
    actionType: "sanity.action.document.version.unpublish",
    versionId,
    publishedId
  }, options);
}
function _mutate(client, httpRequest, mutations, options) {
  let mut;
  mutations instanceof Patch || mutations instanceof ObservablePatch ? mut = { patch: mutations.serialize() } : mutations instanceof Transaction || mutations instanceof ObservableTransaction ? mut = mutations.serialize() : mut = mutations;
  const muts = Array.isArray(mut) ? mut : [mut], transactionId = options && options.transactionId || void 0;
  return _dataRequest(client, httpRequest, "mutate", { mutations: muts, transactionId }, options);
}
function _action(client, httpRequest, actions, options) {
  const acts = Array.isArray(actions) ? actions : [actions], transactionId = options && options.transactionId || void 0, skipCrossDatasetReferenceValidation = options && options.skipCrossDatasetReferenceValidation || void 0, dryRun = options && options.dryRun || void 0;
  return _dataRequest(
    client,
    httpRequest,
    "actions",
    { actions: acts, transactionId, skipCrossDatasetReferenceValidation, dryRun },
    options
  );
}
function _dataRequest(client, httpRequest, endpoint, body, options = {}) {
  const isMutation = endpoint === "mutate", isAction = endpoint === "actions", isQuery2 = endpoint === "query", strQuery = isMutation || isAction ? "" : encodeQueryString(body), useGet = !isMutation && !isAction && strQuery.length < getQuerySizeLimit, stringQuery = useGet ? strQuery : "", returnFirst = options.returnFirst, { timeout, token, tag, headers: headers2, returnQuery, lastLiveEventId, cacheMode } = options, uri = _getDataUrl(client, endpoint, stringQuery), reqOptions = {
    method: useGet ? "GET" : "POST",
    uri,
    json: true,
    body: useGet ? void 0 : body,
    query: isMutation && getMutationQuery(options),
    timeout,
    headers: headers2,
    token,
    tag,
    returnQuery,
    perspective: options.perspective,
    resultSourceMap: options.resultSourceMap,
    lastLiveEventId: Array.isArray(lastLiveEventId) ? lastLiveEventId[0] : lastLiveEventId,
    cacheMode,
    canUseCdn: isQuery2,
    signal: options.signal,
    fetch: options.fetch,
    useAbortSignal: options.useAbortSignal,
    useCdn: options.useCdn
  };
  return _requestObservable(client, httpRequest, reqOptions).pipe(
    operatorsExports.filter(isResponse),
    operatorsExports.map(getBody),
    operatorsExports.map((res) => {
      if (!isMutation)
        return res;
      const results = res.results || [];
      if (options.returnDocuments)
        return returnFirst ? results[0] && results[0].document : results.map((mut) => mut.document);
      const key = returnFirst ? "documentId" : "documentIds", ids = returnFirst ? results[0] && results[0].id : results.map((mut) => mut.id);
      return {
        transactionId: res.transactionId,
        results,
        [key]: ids
      };
    })
  );
}
function _create(client, httpRequest, doc, op, options = {}) {
  const mutation = { [op]: doc }, opts = Object.assign({ returnFirst: true, returnDocuments: true }, options);
  return _dataRequest(client, httpRequest, "mutate", { mutations: [mutation] }, opts);
}
const hasDataConfig = (client) => client.config().dataset !== void 0 && client.config().projectId !== void 0 || client.config()["~experimental_resource"] !== void 0, isQuery = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "query")), isMutate = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "mutate")), isDoc = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "doc", "")), isListener = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "listen")), isHistory = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "history", "")), isData = (client, uri) => uri.startsWith("/data/") || isQuery(client, uri) || isMutate(client, uri) || isDoc(client, uri) || isListener(client, uri) || isHistory(client, uri);
function _requestObservable(client, httpRequest, options) {
  const uri = options.url || options.uri, config = client.config(), canUseCdn = typeof options.canUseCdn > "u" ? ["GET", "HEAD"].indexOf(options.method || "GET") >= 0 && isData(client, uri) : options.canUseCdn;
  let useCdn = (options.useCdn ?? config.useCdn) && canUseCdn;
  const tag = options.tag && config.requestTagPrefix ? [config.requestTagPrefix, options.tag].join(".") : options.tag || config.requestTagPrefix;
  if (tag && options.tag !== null && (options.query = { tag: requestTag(tag), ...options.query }), ["GET", "HEAD", "POST"].indexOf(options.method || "GET") >= 0 && isQuery(client, uri)) {
    const resultSourceMap = options.resultSourceMap ?? config.resultSourceMap;
    resultSourceMap !== void 0 && resultSourceMap !== false && (options.query = { resultSourceMap, ...options.query });
    const perspectiveOption = options.perspective || config.perspective;
    typeof perspectiveOption < "u" && (perspectiveOption === "previewDrafts" && printPreviewDraftsDeprecationWarning(), validateApiPerspective(perspectiveOption), options.query = {
      perspective: Array.isArray(perspectiveOption) ? perspectiveOption.join(",") : perspectiveOption,
      ...options.query
    }, (Array.isArray(perspectiveOption) && perspectiveOption.length > 0 || // previewDrafts was renamed to drafts, but keep for backwards compat
    perspectiveOption === "previewDrafts" || perspectiveOption === "drafts") && useCdn && (useCdn = false, printCdnPreviewDraftsWarning())), options.lastLiveEventId && (options.query = { ...options.query, lastLiveEventId: options.lastLiveEventId }), options.returnQuery === false && (options.query = { returnQuery: "false", ...options.query }), useCdn && options.cacheMode == "noStale" && (options.query = { cacheMode: "noStale", ...options.query });
  }
  const reqOptions = requestOptions(
    config,
    Object.assign({}, options, {
      url: _getUrl(client, uri, useCdn)
    })
  ), request = new cjsExports.Observable(
    (subscriber) => httpRequest(reqOptions, config.requester).subscribe(subscriber)
  );
  return options.signal ? request.pipe(_withAbortSignal(options.signal)) : request;
}
function _request(client, httpRequest, options) {
  return _requestObservable(client, httpRequest, options).pipe(
    operatorsExports.filter((event) => event.type === "response"),
    operatorsExports.map((event) => event.body)
  );
}
function _getDataUrl(client, operation, path) {
  const config = client.config();
  if (config["~experimental_resource"]) {
    resourceConfig(config);
    const resourceBase = resourceDataBase(config), uri2 = path !== void 0 ? `${operation}/${path}` : operation;
    return `${resourceBase}/${uri2}`.replace(/\/($|\?)/, "$1");
  }
  const catalog = hasDataset(config), baseUri = `/${operation}/${catalog}`;
  return `/data${path !== void 0 ? `${baseUri}/${path}` : baseUri}`.replace(/\/($|\?)/, "$1");
}
function _getUrl(client, uri, canUseCdn = false) {
  const { url, cdnUrl } = client.config();
  return `${canUseCdn ? cdnUrl : url}/${uri.replace(/^\//, "")}`;
}
function _withAbortSignal(signal) {
  return (input) => new cjsExports.Observable((observer) => {
    const abort = () => observer.error(_createAbortError(signal));
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const subscription = input.subscribe(observer);
    return signal.addEventListener("abort", abort), () => {
      signal.removeEventListener("abort", abort), subscription.unsubscribe();
    };
  });
}
const isDomExceptionSupported = !!globalThis.DOMException;
function _createAbortError(signal) {
  if (isDomExceptionSupported)
    return new DOMException(signal?.reason ?? "The operation was aborted.", "AbortError");
  const error = new Error(signal?.reason ?? "The operation was aborted.");
  return error.name = "AbortError", error;
}
const resourceDataBase = (config) => {
  if (!config["~experimental_resource"])
    throw new Error("`resource` must be provided to perform resource queries");
  const { type, id } = config["~experimental_resource"];
  switch (type) {
    case "dataset": {
      const segments = id.split(".");
      if (segments.length !== 2)
        throw new Error('Dataset ID must be in the format "project.dataset"');
      return `/projects/${segments[0]}/datasets/${segments[1]}`;
    }
    case "canvas":
      return `/canvases/${id}`;
    case "media-library":
      return `/media-libraries/${id}`;
    case "dashboard":
      return `/dashboards/${id}`;
    default:
      throw new Error(`Unsupported resource type: ${type.toString()}`);
  }
};
function _generate(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/generate/${dataset2}`,
    body: request
  });
}
function _patch(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/patch/${dataset2}`,
    body: request
  });
}
function _prompt(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/prompt/${dataset2}`,
    body: request
  });
}
function _transform(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/transform/${dataset2}`,
    body: request
  });
}
function _translate(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/translate/${dataset2}`,
    body: request
  });
}
class ObservableAgentsActionClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Run an instruction to generate content in a target document.
   * @param request - instruction request
   */
  generate(request) {
    return _generate(this.#client, this.#httpRequest, request);
  }
  /**
   * Transform a target document based on a source.
   * @param request - translation request
   */
  transform(request) {
    return _transform(this.#client, this.#httpRequest, request);
  }
  /**
   * Translate a target document based on a source.
   * @param request - translation request
   */
  translate(request) {
    return _translate(this.#client, this.#httpRequest, request);
  }
}
class AgentActionsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Run an instruction to generate content in a target document.
   * @param request - instruction request
   */
  generate(request) {
    return cjsExports.lastValueFrom(_generate(this.#client, this.#httpRequest, request));
  }
  /**
   * Transform a target document based on a source.
   * @param request - translation request
   */
  transform(request) {
    return cjsExports.lastValueFrom(_transform(this.#client, this.#httpRequest, request));
  }
  /**
   * Translate a target document based on a source.
   * @param request - translation request
   */
  translate(request) {
    return cjsExports.lastValueFrom(_translate(this.#client, this.#httpRequest, request));
  }
  /**
   * Run a raw instruction and return the result either as text or json
   * @param request - prompt request
   */
  prompt(request) {
    return cjsExports.lastValueFrom(_prompt(this.#client, this.#httpRequest, request));
  }
  /**
   * Patch a document using a schema aware API.
   * Does not use an LLM, but uses the schema to ensure paths and values matches the schema.
   * @param request - instruction request
   */
  patch(request) {
    return cjsExports.lastValueFrom(_patch(this.#client, this.#httpRequest, request));
  }
}
class ObservableAssetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  upload(assetType, body, options) {
    return _upload(this.#client, this.#httpRequest, assetType, body, options);
  }
}
class AssetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  upload(assetType, body, options) {
    const observable2 = _upload(this.#client, this.#httpRequest, assetType, body, options);
    return cjsExports.lastValueFrom(
      observable2.pipe(
        operatorsExports.filter((event) => event.type === "response"),
        operatorsExports.map(
          (event) => event.body.document
        )
      )
    );
  }
}
function _upload(client, httpRequest, assetType, body, opts = {}) {
  validateAssetType(assetType);
  let meta = opts.extract || void 0;
  meta && !meta.length && (meta = ["none"]);
  const config = client.config(), options = optionsFromFile(opts, body), { tag, label, title, description, creditLine, filename, source } = options, query = {
    label,
    title,
    description,
    filename,
    meta,
    creditLine
  };
  return source && (query.sourceId = source.id, query.sourceName = source.name, query.sourceUrl = source.url), _requestObservable(client, httpRequest, {
    tag,
    method: "POST",
    timeout: options.timeout || 0,
    uri: buildAssetUploadUrl(config, assetType),
    headers: options.contentType ? { "Content-Type": options.contentType } : {},
    query,
    body
  });
}
function buildAssetUploadUrl(config, assetType) {
  const assetTypeEndpoint = assetType === "image" ? "images" : "files";
  if (config["~experimental_resource"]) {
    const { type, id } = config["~experimental_resource"];
    switch (type) {
      case "dataset":
        throw new Error(
          "Assets are not supported for dataset resources, yet. Configure the client with `{projectId: <projectId>, dataset: <datasetId>}` instead."
        );
      case "canvas":
        return `/canvases/${id}/assets/${assetTypeEndpoint}`;
      case "media-library":
        return `/media-libraries/${id}/upload`;
      case "dashboard":
        return `/dashboards/${id}/assets/${assetTypeEndpoint}`;
      default:
        throw new Error(`Unsupported resource type: ${type.toString()}`);
    }
  }
  const dataset2 = hasDataset(config);
  return `assets/${assetTypeEndpoint}/${dataset2}`;
}
function optionsFromFile(opts, file) {
  return typeof File > "u" || !(file instanceof File) ? opts : Object.assign(
    {
      filename: opts.preserveFilename === false ? void 0 : file.name,
      contentType: file.type
    },
    opts
  );
}
var defaults = (obj, defaults2) => Object.keys(defaults2).concat(Object.keys(obj)).reduce((target, prop) => (target[prop] = typeof obj[prop] > "u" ? defaults2[prop] : obj[prop], target), {});
const pick = (obj, props) => props.reduce((selection, prop) => (typeof obj[prop] > "u" || (selection[prop] = obj[prop]), selection), {}), eventSourcePolyfill = cjsExports.defer(() => import('./node_BsI8qVK0.mjs').then(n => n.n)).pipe(
  operatorsExports.map(({ default: EventSource2 }) => EventSource2),
  cjsExports.shareReplay(1)
);
function reconnectOnConnectionFailure() {
  return function(source) {
    return source.pipe(
      cjsExports.catchError((err, caught) => err instanceof ConnectionFailedError ? cjsExports.concat(cjsExports.of({ type: "reconnect" }), cjsExports.timer(1e3).pipe(cjsExports.mergeMap(() => caught))) : cjsExports.throwError(() => err))
    );
  };
}
const MAX_URL_LENGTH = 14800, possibleOptions = [
  "includePreviousRevision",
  "includeResult",
  "includeMutations",
  "includeAllVersions",
  "visibility",
  "effectFormat",
  "tag"
], defaultOptions = {
  includeResult: true
};
function _listen(query, params, opts = {}) {
  const { url, token, withCredentials, requestTagPrefix, headers: configHeaders } = this.config(), tag = opts.tag && requestTagPrefix ? [requestTagPrefix, opts.tag].join(".") : opts.tag, options = { ...defaults(opts, defaultOptions), tag }, listenOpts = pick(options, possibleOptions), qs = encodeQueryString({ query, params, options: { tag, ...listenOpts } }), uri = `${url}${_getDataUrl(this, "listen", qs)}`;
  if (uri.length > MAX_URL_LENGTH)
    return cjsExports.throwError(() => new Error("Query too large for listener"));
  const listenFor = options.events ? options.events : ["mutation"], esOptions = {};
  return withCredentials && (esOptions.withCredentials = true), (token || configHeaders) && (esOptions.headers = {}, token && (esOptions.headers.Authorization = `Bearer ${token}`), configHeaders && Object.assign(esOptions.headers, configHeaders)), connectEventSource(() => (
    // use polyfill if there is no global EventSource or if we need to set headers
    (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : cjsExports.of(EventSource)).pipe(operatorsExports.map((EventSource2) => new EventSource2(uri, esOptions)))
  ), listenFor).pipe(
    reconnectOnConnectionFailure(),
    operatorsExports.filter((event) => listenFor.includes(event.type)),
    operatorsExports.map(
      (event) => ({
        type: event.type,
        ..."data" in event ? event.data : {}
      })
    )
  );
}
function shareReplayLatest(configOrPredicate, config) {
  return _shareReplayLatest(
    typeof configOrPredicate == "function" ? { predicate: configOrPredicate, ...config } : configOrPredicate
  );
}
function _shareReplayLatest(config) {
  return (source) => {
    let latest, emitted = false;
    const { predicate, ...shareConfig } = config, wrapped = source.pipe(
      cjsExports.tap((value) => {
        config.predicate(value) && (emitted = true, latest = value);
      }),
      cjsExports.finalize(() => {
        emitted = false, latest = void 0;
      }),
      cjsExports.share(shareConfig)
    ), emitLatest = new cjsExports.Observable((subscriber) => {
      emitted && subscriber.next(
        // this cast is safe because of the emitted check which asserts that we got T from the source
        latest
      ), subscriber.complete();
    });
    return cjsExports.merge(wrapped, emitLatest);
  };
}
const requiredApiVersion = "2021-03-25";
class LiveClient {
  #client;
  constructor(client) {
    this.#client = client;
  }
  /**
   * Requires `apiVersion` to be `2021-03-25` or later.
   */
  events({
    includeDrafts = false,
    tag: _tag
  } = {}) {
    resourceGuard("live", this.#client.config());
    const {
      projectId,
      apiVersion: _apiVersion,
      token,
      withCredentials,
      requestTagPrefix,
      headers: configHeaders
    } = this.#client.config(), apiVersion = _apiVersion.replace(/^v/, "");
    if (apiVersion !== "X" && apiVersion < requiredApiVersion)
      throw new Error(
        `The live events API requires API version ${requiredApiVersion} or later. The current API version is ${apiVersion}. Please update your API version to use this feature.`
      );
    if (includeDrafts && !token && !withCredentials)
      throw new Error(
        "The live events API requires a token or withCredentials when 'includeDrafts: true'. Please update your client configuration. The token should have the lowest possible access role."
      );
    const path = _getDataUrl(this.#client, "live/events"), url = new URL(this.#client.getUrl(path, false)), tag = _tag && requestTagPrefix ? [requestTagPrefix, _tag].join(".") : _tag;
    tag && url.searchParams.set("tag", tag), includeDrafts && url.searchParams.set("includeDrafts", "true");
    const esOptions = {};
    includeDrafts && withCredentials && (esOptions.withCredentials = true), (includeDrafts && token || configHeaders) && (esOptions.headers = {}, includeDrafts && token && (esOptions.headers.Authorization = `Bearer ${token}`), configHeaders && Object.assign(esOptions.headers, configHeaders));
    const key = `${url.href}::${JSON.stringify(esOptions)}`, existing = eventsCache.get(key);
    if (existing)
      return existing;
    const events = connectEventSource(() => (
      // use polyfill if there is no global EventSource or if we need to set headers
      (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : cjsExports.of(EventSource)).pipe(operatorsExports.map((EventSource2) => new EventSource2(url.href, esOptions)))
    ), [
      "message",
      "restart",
      "welcome",
      "reconnect",
      "goaway"
    ]).pipe(
      reconnectOnConnectionFailure(),
      operatorsExports.map((event) => {
        if (event.type === "message") {
          const { data, ...rest } = event;
          return { ...rest, tags: data.tags };
        }
        return event;
      })
    ), checkCors = fetchObservable(url, {
      method: "OPTIONS",
      mode: "cors",
      credentials: esOptions.withCredentials ? "include" : "omit",
      headers: esOptions.headers
    }).pipe(
      cjsExports.mergeMap(() => cjsExports.EMPTY),
      cjsExports.catchError(() => {
        throw new CorsOriginError({ projectId });
      })
    ), observable2 = cjsExports.concat(checkCors, events).pipe(
      operatorsExports.finalize(() => eventsCache.delete(key)),
      shareReplayLatest({
        predicate: (event) => event.type === "welcome"
      })
    );
    return eventsCache.set(key, observable2), observable2;
  }
}
function fetchObservable(url, init) {
  return new cjsExports.Observable((observer) => {
    const controller = new AbortController(), signal = controller.signal;
    return fetch(url, { ...init, signal: controller.signal }).then(
      (response) => {
        observer.next(response), observer.complete();
      },
      (err) => {
        signal.aborted || observer.error(err);
      }
    ), () => controller.abort();
  });
}
const eventsCache = /* @__PURE__ */ new Map();
class ObservableDatasetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name2, options) {
    return _modify(this.#client, this.#httpRequest, "PUT", name2, options);
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name2, options) {
    return _modify(this.#client, this.#httpRequest, "PATCH", name2, options);
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name2) {
    return _modify(this.#client, this.#httpRequest, "DELETE", name2);
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return _request(this.#client, this.#httpRequest, {
      uri: "/datasets",
      tag: null
    });
  }
}
class DatasetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name2, options) {
    return resourceGuard("dataset", this.#client.config()), cjsExports.lastValueFrom(
      _modify(this.#client, this.#httpRequest, "PUT", name2, options)
    );
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name2, options) {
    return resourceGuard("dataset", this.#client.config()), cjsExports.lastValueFrom(
      _modify(this.#client, this.#httpRequest, "PATCH", name2, options)
    );
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name2) {
    return resourceGuard("dataset", this.#client.config()), cjsExports.lastValueFrom(_modify(this.#client, this.#httpRequest, "DELETE", name2));
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return resourceGuard("dataset", this.#client.config()), cjsExports.lastValueFrom(
      _request(this.#client, this.#httpRequest, { uri: "/datasets", tag: null })
    );
  }
}
function _modify(client, httpRequest, method, name2, options) {
  return resourceGuard("dataset", client.config()), dataset(name2), _request(client, httpRequest, {
    method,
    uri: `/datasets/${name2}`,
    body: options,
    tag: null
  });
}
class ObservableProjectsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  list(options) {
    resourceGuard("projects", this.#client.config());
    const uri = options?.includeMembers === false ? "/projects?includeMembers=false" : "/projects";
    return _request(this.#client, this.#httpRequest, { uri });
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId) {
    return resourceGuard("projects", this.#client.config()), _request(this.#client, this.#httpRequest, { uri: `/projects/${projectId}` });
  }
}
class ProjectsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  list(options) {
    resourceGuard("projects", this.#client.config());
    const uri = options?.includeMembers === false ? "/projects?includeMembers=false" : "/projects";
    return cjsExports.lastValueFrom(_request(this.#client, this.#httpRequest, { uri }));
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId) {
    return resourceGuard("projects", this.#client.config()), cjsExports.lastValueFrom(
      _request(this.#client, this.#httpRequest, { uri: `/projects/${projectId}` })
    );
  }
}
const generateReleaseId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  8
), getDocumentVersionId = (publishedId, releaseId) => releaseId ? getVersionId(publishedId, releaseId) : getDraftId(publishedId);
function deriveDocumentVersionId(op, {
  releaseId,
  publishedId,
  document
}) {
  if (publishedId && document._id) {
    const versionId = getDocumentVersionId(publishedId, releaseId);
    return validateVersionIdMatch(versionId, document), versionId;
  }
  if (document._id) {
    const isDraft = isDraftId(document._id), isVersion = isVersionId(document._id);
    if (!isDraft && !isVersion)
      throw new Error(
        `\`${op}()\` requires a document with an \`_id\` that is a version or draft ID`
      );
    if (releaseId) {
      if (isDraft)
        throw new Error(
          `\`${op}()\` was called with a document ID (\`${document._id}\`) that is a draft ID, but a release ID (\`${releaseId}\`) was also provided.`
        );
      const builtVersionId = getVersionFromId(document._id);
      if (builtVersionId !== releaseId)
        throw new Error(
          `\`${op}()\` was called with a document ID (\`${document._id}\`) that is a version ID, but the release ID (\`${releaseId}\`) does not match the document's version ID (\`${builtVersionId}\`).`
        );
    }
    return document._id;
  }
  if (publishedId)
    return getDocumentVersionId(publishedId, releaseId);
  throw new Error(`\`${op}()\` requires either a publishedId or a document with an \`_id\``);
}
const getArgs = (releaseOrOptions, maybeOptions) => {
  if (typeof releaseOrOptions == "object" && releaseOrOptions !== null && ("releaseId" in releaseOrOptions || "metadata" in releaseOrOptions)) {
    const { releaseId = generateReleaseId(), metadata = {} } = releaseOrOptions;
    return [releaseId, metadata, maybeOptions];
  }
  return [generateReleaseId(), {}, releaseOrOptions];
}, createRelease = (releaseOrOptions, maybeOptions) => {
  const [releaseId, metadata, options] = getArgs(releaseOrOptions, maybeOptions), finalMetadata = {
    ...metadata,
    releaseType: metadata.releaseType || "undecided"
  };
  return { action: {
    actionType: "sanity.action.release.create",
    releaseId,
    metadata: finalMetadata
  }, options };
};
class ObservableReleasesClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * @public
   *
   * Retrieve a release by id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to retrieve.
   * @param options - Additional query options including abort signal and query tag.
   * @returns An observable that resolves to the release document {@link ReleaseDocument}.
   *
   * @example Retrieving a release by id
   * ```ts
   * client.observable.releases.get({releaseId: 'my-release'}).pipe(
   *   tap((release) => console.log(release)),
   *   // {
   *   //   _id: '_.releases.my-release',
   *   //   name: 'my-release'
   *   //   _type: 'system.release',
   *   //   metadata: {releaseType: 'asap'},
   *   //   _createdAt: '2021-01-01T00:00:00.000Z',
   *   //   ...
   *   // }
   * ).subscribe()
   * ```
   */
  get({ releaseId }, options) {
    return _getDocument(
      this.#client,
      this.#httpRequest,
      `_.releases.${releaseId}`,
      options
    );
  }
  create(releaseOrOptions, maybeOptions) {
    const { action, options } = createRelease(releaseOrOptions, maybeOptions), { releaseId, metadata } = action;
    return _action(this.#client, this.#httpRequest, action, options).pipe(
      cjsExports.map((actionResult) => ({
        ...actionResult,
        releaseId,
        metadata
      }))
    );
  }
  /**
   * @public
   *
   * Edits an existing release, updating the metadata.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to edit.
   *   - `patch` - The patch operation to apply on the release metadata {@link PatchMutationOperation}.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  edit({ releaseId, patch }, options) {
    const editAction = {
      actionType: "sanity.action.release.edit",
      releaseId,
      patch
    };
    return _action(this.#client, this.#httpRequest, editAction, options);
  }
  /**
   * @public
   *
   * Publishes all documents in a release at once. For larger releases the effect of the publish
   * will be visible immediately when querying but the removal of the `versions.<releasesId>.*`
   * documents and creation of the corresponding published documents with the new content may
   * take some time.
   *
   * During this period both the source and target documents are locked and cannot be
   * modified through any other means.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to publish.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  publish({ releaseId }, options) {
    const publishAction = {
      actionType: "sanity.action.release.publish",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, publishAction, options);
  }
  /**
   * @public
   *
   * An archive action removes an active release. The documents that comprise the release
   * are deleted and therefore no longer queryable.
   *
   * While the documents remain in retention the last version can still be accessed using document history endpoint.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to archive.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  archive({ releaseId }, options) {
    const archiveAction = {
      actionType: "sanity.action.release.archive",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, archiveAction, options);
  }
  /**
   * @public
   *
   * An unarchive action restores an archived release and all documents
   * with the content they had just prior to archiving.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unarchive.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  unarchive({ releaseId }, options) {
    const unarchiveAction = {
      actionType: "sanity.action.release.unarchive",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, unarchiveAction, options);
  }
  /**
   * @public
   *
   * A schedule action queues a release for publishing at the given future time.
   * The release is locked such that no documents in the release can be modified and
   * no documents that it references can be deleted as this would make the publish fail.
   * At the given time, the same logic as for the publish action is triggered.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to schedule.
   *   - `publishAt` - The serialised date and time to publish the release. If the `publishAt` is in the past, the release will be published immediately.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  schedule({ releaseId, publishAt }, options) {
    const scheduleAction = {
      actionType: "sanity.action.release.schedule",
      releaseId,
      publishAt
    };
    return _action(this.#client, this.#httpRequest, scheduleAction, options);
  }
  /**
   * @public
   *
   * An unschedule action stops a release from being published.
   * The documents in the release are considered unlocked and can be edited again.
   * This may fail if another release is scheduled to be published after this one and
   * has a reference to a document created by this one.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unschedule.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  unschedule({ releaseId }, options) {
    const unscheduleAction = {
      actionType: "sanity.action.release.unschedule",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, unscheduleAction, options);
  }
  /**
   * @public
   *
   * A delete action removes a published or archived release.
   * The backing system document will be removed from the dataset.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to delete.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  delete({ releaseId }, options) {
    const deleteAction = {
      actionType: "sanity.action.release.delete",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, deleteAction, options);
  }
  /**
   * @public
   *
   * Fetch the documents in a release by release id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to fetch documents for.
   * @param options - Additional mutation options {@link BaseMutationOptions}.
   * @returns An observable that resolves to the documents in the release.
   */
  fetchDocuments({ releaseId }, options) {
    return _getReleaseDocuments(this.#client, this.#httpRequest, releaseId, options);
  }
}
class ReleasesClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * @public
   *
   * Retrieve a release by id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to retrieve.
   * @param options - Additional query options including abort signal and query tag.
   * @returns A promise that resolves to the release document {@link ReleaseDocument}.
   *
   * @example Retrieving a release by id
   * ```ts
   * const release = await client.releases.get({releaseId: 'my-release'})
   * console.log(release)
   * // {
   * //   _id: '_.releases.my-release',
   * //   name: 'my-release'
   * //   _type: 'system.release',
   * //   metadata: {releaseType: 'asap'},
   * //   _createdAt: '2021-01-01T00:00:00.000Z',
   * //   ...
   * // }
   * ```
   */
  get({ releaseId }, options) {
    return cjsExports.lastValueFrom(
      _getDocument(
        this.#client,
        this.#httpRequest,
        `_.releases.${releaseId}`,
        options
      )
    );
  }
  async create(releaseOrOptions, maybeOptions) {
    const { action, options } = createRelease(releaseOrOptions, maybeOptions), { releaseId, metadata } = action;
    return { ...await cjsExports.lastValueFrom(
      _action(this.#client, this.#httpRequest, action, options)
    ), releaseId, metadata };
  }
  /**
   * @public
   *
   * Edits an existing release, updating the metadata.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to edit.
   *   - `patch` - The patch operation to apply on the release metadata {@link PatchMutationOperation}.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  edit({ releaseId, patch }, options) {
    const editAction = {
      actionType: "sanity.action.release.edit",
      releaseId,
      patch
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, editAction, options));
  }
  /**
   * @public
   *
   * Publishes all documents in a release at once. For larger releases the effect of the publish
   * will be visible immediately when querying but the removal of the `versions.<releasesId>.*`
   * documents and creation of the corresponding published documents with the new content may
   * take some time.
   *
   * During this period both the source and target documents are locked and cannot be
   * modified through any other means.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to publish.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  publish({ releaseId }, options) {
    const publishAction = {
      actionType: "sanity.action.release.publish",
      releaseId
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, publishAction, options));
  }
  /**
   * @public
   *
   * An archive action removes an active release. The documents that comprise the release
   * are deleted and therefore no longer queryable.
   *
   * While the documents remain in retention the last version can still be accessed using document history endpoint.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to archive.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  archive({ releaseId }, options) {
    const archiveAction = {
      actionType: "sanity.action.release.archive",
      releaseId
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, archiveAction, options));
  }
  /**
   * @public
   *
   * An unarchive action restores an archived release and all documents
   * with the content they had just prior to archiving.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unarchive.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  unarchive({ releaseId }, options) {
    const unarchiveAction = {
      actionType: "sanity.action.release.unarchive",
      releaseId
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, unarchiveAction, options));
  }
  /**
   * @public
   *
   * A schedule action queues a release for publishing at the given future time.
   * The release is locked such that no documents in the release can be modified and
   * no documents that it references can be deleted as this would make the publish fail.
   * At the given time, the same logic as for the publish action is triggered.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to schedule.
   *   - `publishAt` - The serialised date and time to publish the release. If the `publishAt` is in the past, the release will be published immediately.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  schedule({ releaseId, publishAt }, options) {
    const scheduleAction = {
      actionType: "sanity.action.release.schedule",
      releaseId,
      publishAt
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, scheduleAction, options));
  }
  /**
   * @public
   *
   * An unschedule action stops a release from being published.
   * The documents in the release are considered unlocked and can be edited again.
   * This may fail if another release is scheduled to be published after this one and
   * has a reference to a document created by this one.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unschedule.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  unschedule({ releaseId }, options) {
    const unscheduleAction = {
      actionType: "sanity.action.release.unschedule",
      releaseId
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, unscheduleAction, options));
  }
  /**
   * @public
   *
   * A delete action removes a published or archived release.
   * The backing system document will be removed from the dataset.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to delete.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  delete({ releaseId }, options) {
    const deleteAction = {
      actionType: "sanity.action.release.delete",
      releaseId
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, deleteAction, options));
  }
  /**
   * @public
   *
   * Fetch the documents in a release by release id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to fetch documents for.
   * @param options - Additional mutation options {@link BaseMutationOptions}.
   * @returns A promise that resolves to the documents in the release.
   */
  fetchDocuments({ releaseId }, options) {
    return cjsExports.lastValueFrom(_getReleaseDocuments(this.#client, this.#httpRequest, releaseId, options));
  }
}
class ObservableUsersClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return _request(
      this.#client,
      this.#httpRequest,
      { uri: `/users/${id}` }
    );
  }
}
class UsersClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return cjsExports.lastValueFrom(
      _request(this.#client, this.#httpRequest, {
        uri: `/users/${id}`
      })
    );
  }
}
class ObservableSanityClient {
  assets;
  datasets;
  live;
  projects;
  users;
  agent;
  releases;
  /**
   * Private properties
   */
  #clientConfig;
  #httpRequest;
  /**
   * Instance properties
   */
  listen = _listen;
  constructor(httpRequest, config = defaultConfig) {
    this.config(config), this.#httpRequest = httpRequest, this.assets = new ObservableAssetsClient(this, this.#httpRequest), this.datasets = new ObservableDatasetsClient(this, this.#httpRequest), this.live = new LiveClient(this), this.projects = new ObservableProjectsClient(this, this.#httpRequest), this.users = new ObservableUsersClient(this, this.#httpRequest), this.agent = {
      action: new ObservableAgentsActionClient(this, this.#httpRequest)
    }, this.releases = new ObservableReleasesClient(this, this.#httpRequest);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new ObservableSanityClient(this.#httpRequest, this.config());
  }
  config(newConfig) {
    if (newConfig === void 0)
      return { ...this.#clientConfig };
    if (this.#clientConfig && this.#clientConfig.allowReconfigure === false)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return this.#clientConfig = initConfig(newConfig, this.#clientConfig || {}), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    const thisConfig = this.config();
    return new ObservableSanityClient(this.#httpRequest, {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega || {},
        ...typeof newConfig?.stega == "boolean" ? { enabled: newConfig.stega } : newConfig?.stega || {}
      }
    });
  }
  fetch(query, params, options) {
    return _fetch(
      this,
      this.#httpRequest,
      this.#clientConfig.stega,
      query,
      params,
      options
    );
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return _getDocument(this, this.#httpRequest, id, options);
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return _getDocuments(this, this.#httpRequest, ids, options);
  }
  create(document, options) {
    return _create(this, this.#httpRequest, document, "create", options);
  }
  createIfNotExists(document, options) {
    return _createIfNotExists(this, this.#httpRequest, document, options);
  }
  createOrReplace(document, options) {
    return _createOrReplace(this, this.#httpRequest, document, options);
  }
  createVersion({
    document,
    publishedId,
    releaseId,
    baseId,
    ifBaseRevisionId
  }, options) {
    if (!document)
      return _createVersionFromBase(
        this,
        this.#httpRequest,
        publishedId,
        baseId,
        releaseId,
        ifBaseRevisionId,
        options
      );
    const documentVersionId = deriveDocumentVersionId("createVersion", {
      document,
      publishedId,
      releaseId
    }), documentVersion = { ...document, _id: documentVersionId }, versionPublishedId = publishedId || getPublishedId(document._id);
    return _createVersion(
      this,
      this.#httpRequest,
      documentVersion,
      versionPublishedId,
      options
    );
  }
  delete(selection, options) {
    return _delete(this, this.#httpRequest, selection, options);
  }
  /**
   * @public
   *
   * Deletes the draft or release version of a document.
   *
   * @remarks
   * * Discarding a version with no `releaseId` will discard the draft version of the published document.
   * * If the draft or release version does not exist, any error will throw.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to discard the document from.
   *   - `publishedId` - The published ID of the document to discard.
   * @param purge - if `true` the document history is also discarded.
   * @param options - Additional action options.
   * @returns an observable that resolves to the `transactionId`.
   *
   * @example Discarding a release version of a document
   * ```ts
   * client.observable.discardVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be discarded.
   * ```
   *
   * @example Discarding a draft version of a document
   * ```ts
   * client.observable.discardVersion({publishedId: 'myDocument'})
   * // The document with the ID `drafts.myDocument` will be discarded.
   * ```
   */
  discardVersion({ releaseId, publishedId }, purge, options) {
    const documentVersionId = getDocumentVersionId(publishedId, releaseId);
    return _discardVersion(this, this.#httpRequest, documentVersionId, purge, options);
  }
  replaceVersion({
    document,
    publishedId,
    releaseId
  }, options) {
    const documentVersionId = deriveDocumentVersionId("replaceVersion", {
      document,
      publishedId,
      releaseId
    }), documentVersion = { ...document, _id: documentVersionId };
    return _replaceVersion(this, this.#httpRequest, documentVersion, options);
  }
  /**
   * @public
   *
   * Used to indicate when a document within a release should be unpublished when
   * the release is run.
   *
   * @remarks
   * * If the published document does not exist, an error will be thrown.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to unpublish the document from.
   *   - `publishedId` - The published ID of the document to unpublish.
   * @param options - Additional action options.
   * @returns an observable that resolves to the `transactionId`.
   *
   * @example Unpublishing a release version of a published document
   * ```ts
   * client.observable.unpublishVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be unpublished. when `myRelease` is run.
   * ```
   */
  unpublishVersion({ releaseId, publishedId }, options) {
    const versionId = getVersionId(publishedId, releaseId);
    return _unpublishVersion(this, this.#httpRequest, versionId, publishedId, options);
  }
  mutate(operations, options) {
    return _mutate(this, this.#httpRequest, operations, options);
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(selection, operations) {
    return new ObservablePatch(selection, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new ObservableTransaction(operations, this);
  }
  /**
   * Perform action operations against the configured dataset
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(operations, options) {
    return _action(this, this.#httpRequest, operations, options);
  }
  /**
   * Perform an HTTP request against the Sanity API
   *
   * @param options - Request options
   */
  request(options) {
    return _request(this, this.#httpRequest, options);
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
}
class SanityClient {
  assets;
  datasets;
  live;
  projects;
  users;
  agent;
  releases;
  /**
   * Observable version of the Sanity client, with the same configuration as the promise-based one
   */
  observable;
  /**
   * Private properties
   */
  #clientConfig;
  #httpRequest;
  /**
   * Instance properties
   */
  listen = _listen;
  constructor(httpRequest, config = defaultConfig) {
    this.config(config), this.#httpRequest = httpRequest, this.assets = new AssetsClient(this, this.#httpRequest), this.datasets = new DatasetsClient(this, this.#httpRequest), this.live = new LiveClient(this), this.projects = new ProjectsClient(this, this.#httpRequest), this.users = new UsersClient(this, this.#httpRequest), this.agent = {
      action: new AgentActionsClient(this, this.#httpRequest)
    }, this.releases = new ReleasesClient(this, this.#httpRequest), this.observable = new ObservableSanityClient(httpRequest, config);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new SanityClient(this.#httpRequest, this.config());
  }
  config(newConfig) {
    if (newConfig === void 0)
      return { ...this.#clientConfig };
    if (this.#clientConfig && this.#clientConfig.allowReconfigure === false)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return this.observable && this.observable.config(newConfig), this.#clientConfig = initConfig(newConfig, this.#clientConfig || {}), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    const thisConfig = this.config();
    return new SanityClient(this.#httpRequest, {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega || {},
        ...typeof newConfig?.stega == "boolean" ? { enabled: newConfig.stega } : newConfig?.stega || {}
      }
    });
  }
  fetch(query, params, options) {
    return cjsExports.lastValueFrom(
      _fetch(
        this,
        this.#httpRequest,
        this.#clientConfig.stega,
        query,
        params,
        options
      )
    );
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return cjsExports.lastValueFrom(_getDocument(this, this.#httpRequest, id, options));
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return cjsExports.lastValueFrom(_getDocuments(this, this.#httpRequest, ids, options));
  }
  create(document, options) {
    return cjsExports.lastValueFrom(
      _create(this, this.#httpRequest, document, "create", options)
    );
  }
  createIfNotExists(document, options) {
    return cjsExports.lastValueFrom(
      _createIfNotExists(this, this.#httpRequest, document, options)
    );
  }
  createOrReplace(document, options) {
    return cjsExports.lastValueFrom(
      _createOrReplace(this, this.#httpRequest, document, options)
    );
  }
  createVersion({
    document,
    publishedId,
    releaseId,
    baseId,
    ifBaseRevisionId
  }, options) {
    if (!document)
      return cjsExports.firstValueFrom(
        _createVersionFromBase(
          this,
          this.#httpRequest,
          publishedId,
          baseId,
          releaseId,
          ifBaseRevisionId,
          options
        )
      );
    const documentVersionId = deriveDocumentVersionId("createVersion", {
      document,
      publishedId,
      releaseId
    }), documentVersion = { ...document, _id: documentVersionId }, versionPublishedId = publishedId || getPublishedId(document._id);
    return cjsExports.firstValueFrom(
      _createVersion(
        this,
        this.#httpRequest,
        documentVersion,
        versionPublishedId,
        options
      )
    );
  }
  delete(selection, options) {
    return cjsExports.lastValueFrom(_delete(this, this.#httpRequest, selection, options));
  }
  /**
   * @public
   *
   * Deletes the draft or release version of a document.
   *
   * @remarks
   * * Discarding a version with no `releaseId` will discard the draft version of the published document.
   * * If the draft or release version does not exist, any error will throw.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to discard the document from.
   *   - `publishedId` - The published ID of the document to discard.
   * @param purge - if `true` the document history is also discarded.
   * @param options - Additional action options.
   * @returns a promise that resolves to the `transactionId`.
   *
   * @example Discarding a release version of a document
   * ```ts
   * client.discardVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be discarded.
   * ```
   *
   * @example Discarding a draft version of a document
   * ```ts
   * client.discardVersion({publishedId: 'myDocument'})
   * // The document with the ID `drafts.myDocument` will be discarded.
   * ```
   */
  discardVersion({ releaseId, publishedId }, purge, options) {
    const documentVersionId = getDocumentVersionId(publishedId, releaseId);
    return cjsExports.lastValueFrom(
      _discardVersion(this, this.#httpRequest, documentVersionId, purge, options)
    );
  }
  replaceVersion({
    document,
    publishedId,
    releaseId
  }, options) {
    const documentVersionId = deriveDocumentVersionId("replaceVersion", {
      document,
      publishedId,
      releaseId
    }), documentVersion = { ...document, _id: documentVersionId };
    return cjsExports.firstValueFrom(
      _replaceVersion(this, this.#httpRequest, documentVersion, options)
    );
  }
  /**
   * @public
   *
   * Used to indicate when a document within a release should be unpublished when
   * the release is run.
   *
   * @remarks
   * * If the published document does not exist, an error will be thrown.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to unpublish the document from.
   *   - `publishedId` - The published ID of the document to unpublish.
   * @param options - Additional action options.
   * @returns a promise that resolves to the `transactionId`.
   *
   * @example Unpublishing a release version of a published document
   * ```ts
   * await client.unpublishVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be unpublished. when `myRelease` is run.
   * ```
   */
  unpublishVersion({ releaseId, publishedId }, options) {
    const versionId = getVersionId(publishedId, releaseId);
    return cjsExports.lastValueFrom(
      _unpublishVersion(this, this.#httpRequest, versionId, publishedId, options)
    );
  }
  mutate(operations, options) {
    return cjsExports.lastValueFrom(_mutate(this, this.#httpRequest, operations, options));
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(documentId, operations) {
    return new Patch(documentId, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new Transaction(operations, this);
  }
  /**
   * Perform action operations against the configured dataset
   * Returns a promise that resolves to the transaction result
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(operations, options) {
    return cjsExports.lastValueFrom(_action(this, this.#httpRequest, operations, options));
  }
  /**
   * Perform a request against the Sanity API
   * NOTE: Only use this for Sanity API endpoints, not for your own APIs!
   *
   * @param options - Request options
   * @returns Promise resolving to the response body
   */
  request(options) {
    return cjsExports.lastValueFrom(_request(this, this.#httpRequest, options));
  }
  /**
   * Perform an HTTP request a `/data` sub-endpoint
   * NOTE: Considered internal, thus marked as deprecated. Use `request` instead.
   *
   * @deprecated - Use `request()` or your own HTTP library instead
   * @param endpoint - Endpoint to hit (mutate, query etc)
   * @param body - Request body
   * @param options - Request options
   * @internal
   */
  dataRequest(endpoint, body, options) {
    return cjsExports.lastValueFrom(_dataRequest(this, this.#httpRequest, endpoint, body, options));
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
}
function defineCreateClientExports(envMiddleware, ClassConstructor) {
  return { requester: defineHttpRequest(envMiddleware), createClient: (config) => {
    const clientRequester = defineHttpRequest(envMiddleware, {
      ignoreWarnings: config.ignoreWarnings
    });
    return new ClassConstructor(
      (options, requester2) => (requester2 || clientRequester)({
        maxRedirects: 0,
        maxRetries: config.maxRetries,
        retryDelay: config.retryDelay,
        ...options
      }),
      config
    );
  } };
}
var name = "@sanity/client", version = "7.8.2";
const middleware = [
  S$1({ verbose: true, namespace: "sanity:client" }),
  I$1({ "User-Agent": `${name} ${version}` }),
  // Enable keep-alive, and in addition limit the number of sockets that can be opened.
  // This avoids opening too many connections to the server if someone tries to execute
  // a bunch of requests in parallel. It's recommended to have a concurrency limit
  // at a "higher limit" (i.e. you shouldn't actually execute hundreds of requests in parallel),
  // and this is mainly to minimize the impact for the network and server.
  //
  // We're currently matching the same defaults as browsers:
  // https://stackoverflow.com/questions/26003756/is-there-a-limit-practical-or-otherwise-to-the-number-of-web-sockets-a-page-op
  l({
    keepAlive: true,
    maxSockets: 30,
    maxTotalSockets: 256
  })
], exp = defineCreateClientExports(middleware, SanityClient), createClient = exp.createClient;

export { C, createClient as c, isRecord as i };
