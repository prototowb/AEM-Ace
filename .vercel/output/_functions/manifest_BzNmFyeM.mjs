import 'kleur/colors';
import { o as decodeKey } from './chunks/astro/server_CfiTzbZJ.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Dx5TPkJP.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/2049576/Private%20Projects/AEM%20Ace/","cacheDir":"file:///Users/2049576/Private%20Projects/AEM%20Ace/node_modules/.astro/","outDir":"file:///Users/2049576/Private%20Projects/AEM%20Ace/dist/","srcDir":"file:///Users/2049576/Private%20Projects/AEM%20Ace/src/","publicDir":"file:///Users/2049576/Private%20Projects/AEM%20Ace/public/","buildClientDir":"file:///Users/2049576/Private%20Projects/AEM%20Ace/dist/client/","buildServerDir":"file:///Users/2049576/Private%20Projects/AEM%20Ace/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"catalog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/catalog","isIndex":false,"type":"page","pattern":"^\\/catalog\\/?$","segments":[[{"content":"catalog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/catalog.astro","pathname":"/catalog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"final-exam/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/final-exam","isIndex":false,"type":"page","pattern":"^\\/final-exam\\/?$","segments":[[{"content":"final-exam","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/final-exam.astro","pathname":"/final-exam","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"quiz/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/quiz","isIndex":false,"type":"page","pattern":"^\\/quiz\\/?$","segments":[[{"content":"quiz","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/quiz.astro","pathname":"/quiz","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"submit/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/submit","isIndex":false,"type":"page","pattern":"^\\/submit\\/?$","segments":[[{"content":"submit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/submit.astro","pathname":"/submit","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/catalog.DcaHRRsv.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/generate-final-exam","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/generate-final-exam\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"generate-final-exam","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/generate-final-exam.ts","pathname":"/api/generate-final-exam","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/questions","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/questions\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"questions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/questions.ts","pathname":"/api/questions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submit-question","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit-question\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit-question","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit-question.ts","pathname":"/api/submit-question","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submit-vote","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit-vote\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit-vote","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit-vote.ts","pathname":"/api/submit-vote","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/2049576/Private Projects/AEM Ace/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/2049576/Private Projects/AEM Ace/src/pages/catalog.astro",{"propagation":"none","containsHead":true}],["/Users/2049576/Private Projects/AEM Ace/src/pages/final-exam.astro",{"propagation":"none","containsHead":true}],["/Users/2049576/Private Projects/AEM Ace/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/2049576/Private Projects/AEM Ace/src/pages/quiz.astro",{"propagation":"none","containsHead":true}],["/Users/2049576/Private Projects/AEM Ace/src/pages/submit.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/generate-final-exam@_@ts":"pages/api/generate-final-exam.astro.mjs","\u0000@astro-page:src/pages/api/questions@_@ts":"pages/api/questions.astro.mjs","\u0000@astro-page:src/pages/api/submit-question@_@ts":"pages/api/submit-question.astro.mjs","\u0000@astro-page:src/pages/api/submit-vote@_@ts":"pages/api/submit-vote.astro.mjs","\u0000@astro-page:src/pages/catalog@_@astro":"pages/catalog.astro.mjs","\u0000@astro-page:src/pages/final-exam@_@astro":"pages/final-exam.astro.mjs","\u0000@astro-page:src/pages/quiz@_@astro":"pages/quiz.astro.mjs","\u0000@astro-page:src/pages/submit@_@astro":"pages/submit.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BzNmFyeM.mjs","/Users/2049576/Private Projects/AEM Ace/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CgVqIIse.mjs","/Users/2049576/Private Projects/AEM Ace/src/components/QACatalog.vue":"_astro/QACatalog.BUpBt_0h.js","/Users/2049576/Private Projects/AEM Ace/src/components/FinalExam.vue":"_astro/FinalExam.Cf6iIJZP.js","/Users/2049576/Private Projects/AEM Ace/src/components/QuizApp.vue":"_astro/QuizApp.BUQjAVAe.js","/Users/2049576/Private Projects/AEM Ace/src/components/QuestionSubmission.vue":"_astro/QuestionSubmission.DiNOOlMn.js","@astrojs/vue/client.js":"_astro/client.c5YXe3so.js","@astrojs/react/client.js":"_astro/client.CmJkBWW1.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/inter-cyrillic-ext-400-normal.Dc4VJyIJ.woff2","/_astro/inter-greek-400-normal.DxZsaF_h.woff2","/_astro/inter-greek-ext-400-normal.Bput3-QP.woff2","/_astro/inter-cyrillic-400-normal.BLGc9T1a.woff2","/_astro/inter-vietnamese-400-normal.DMkecbls.woff2","/_astro/inter-cyrillic-ext-500-normal.BShVwWPj.woff2","/_astro/inter-latin-400-normal.C38fXH4l.woff2","/_astro/inter-cyrillic-500-normal.D4Vwzodn.woff2","/_astro/inter-greek-ext-500-normal.B6guLgqG.woff2","/_astro/inter-greek-500-normal.CeQXL5ds.woff2","/_astro/inter-vietnamese-500-normal.DOriooB6.woff2","/_astro/inter-latin-ext-400-normal.C1nco2VV.woff2","/_astro/inter-cyrillic-ext-600-normal.CaqZN2hq.woff2","/_astro/inter-latin-ext-500-normal.CV4jyFjo.woff2","/_astro/inter-cyrillic-600-normal.BGBWG807.woff2","/_astro/inter-latin-500-normal.Cerq10X2.woff2","/_astro/inter-greek-600-normal.Dhlb-90d.woff2","/_astro/inter-greek-ext-600-normal.Cnui8OiR.woff2","/_astro/inter-latin-ext-600-normal.D2bJ5OIk.woff2","/_astro/inter-latin-600-normal.LgqL8muc.woff2","/_astro/inter-vietnamese-600-normal.Cc8MFFhd.woff2","/_astro/space-grotesk-vietnamese-400-normal.B7xT_GF5.woff2","/_astro/space-grotesk-latin-ext-400-normal.CfP_5XZW.woff2","/_astro/space-grotesk-latin-400-normal.C_H9aji2.woff2","/_astro/space-grotesk-vietnamese-500-normal.BmEvtly_.woff2","/_astro/space-grotesk-latin-500-normal.KYfcXlvK.woff2","/_astro/space-grotesk-vietnamese-600-normal.DUi7WF5p.woff2","/_astro/space-grotesk-latin-ext-600-normal.DxxdqCpr.woff2","/_astro/space-grotesk-latin-ext-500-normal.DUe3BAxM.woff2","/_astro/space-grotesk-latin-600-normal.0SbvWzVy.woff2","/_astro/space-grotesk-vietnamese-700-normal.DMty7AZE.woff2","/_astro/space-grotesk-latin-ext-700-normal.BQnZhY3m.woff2","/_astro/space-grotesk-latin-700-normal.B7Rq4K4l.woff2","/_astro/inter-greek-400-normal.C3I71FoW.woff","/_astro/inter-cyrillic-ext-400-normal.BE2fNs0E.woff","/_astro/inter-greek-ext-400-normal.XIH6-K3k.woff","/_astro/inter-cyrillic-400-normal.alAqRL36.woff","/_astro/inter-cyrillic-500-normal.BoeW9iIj.woff","/_astro/inter-latin-400-normal.CyCys3Eg.woff","/_astro/inter-cyrillic-ext-500-normal.NrhEyngK.woff","/_astro/inter-vietnamese-400-normal.Bbgyi5SW.woff","/_astro/inter-greek-ext-500-normal.1SJLBQ3N.woff","/_astro/inter-greek-500-normal.CSBZZ4CI.woff","/_astro/inter-vietnamese-500-normal.mJboJaSs.woff","/_astro/inter-latin-ext-400-normal.77YHD8bZ.woff","/_astro/inter-cyrillic-ext-600-normal.t7rHAwBu.woff","/_astro/inter-cyrillic-600-normal.vZ-N8GHY.woff","/_astro/inter-latin-ext-500-normal.BxGbmqWO.woff","/_astro/inter-latin-500-normal.BL9OpVg8.woff","/_astro/inter-greek-600-normal.BVGIV3oK.woff","/_astro/inter-latin-ext-600-normal.CIVaiw4L.woff","/_astro/inter-greek-ext-600-normal.CCFnzSpK.woff","/_astro/inter-latin-600-normal.CiBQ2DWP.woff","/_astro/space-grotesk-vietnamese-400-normal.BIWiOVfw.woff","/_astro/inter-vietnamese-600-normal.BuLX-rYi.woff","/_astro/space-grotesk-latin-ext-400-normal.DRPE3kg4.woff","/_astro/space-grotesk-latin-400-normal.BXeG7fug.woff","/_astro/space-grotesk-latin-500-normal.Day7EzAn.woff","/_astro/space-grotesk-vietnamese-500-normal.BTqKIpxg.woff","/_astro/space-grotesk-vietnamese-600-normal.D6zpsUhD.woff","/_astro/space-grotesk-latin-ext-600-normal.VcznFIpX.woff","/_astro/space-grotesk-latin-600-normal.S69mFOY_.woff","/_astro/space-grotesk-latin-ext-500-normal.3dgZTiw9.woff","/_astro/space-grotesk-vietnamese-700-normal.Duxec5Rn.woff","/_astro/space-grotesk-latin-ext-700-normal.HVCqSBdx.woff","/_astro/space-grotesk-latin-700-normal.eHWw8XUM.woff","/_astro/catalog.DcaHRRsv.css","/favicon.svg","/_astro/FinalExam.Cf6iIJZP.js","/_astro/QACatalog.BUpBt_0h.js","/_astro/QuestionSubmission.DiNOOlMn.js","/_astro/QuizApp.BUQjAVAe.js","/_astro/_plugin-vue_export-helper.DlAUqK2U.js","/_astro/client.CmJkBWW1.js","/_astro/client.c5YXe3so.js","/_astro/runtime-dom.esm-bundler.CzleRXFB.js","/catalog/index.html","/final-exam/index.html","/quiz/index.html","/submit/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"uKCNB/daUjaMYercZSmz/dqbgq9OSAWfuQeap6ouMZc="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
