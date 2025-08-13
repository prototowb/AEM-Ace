import { r as renderers } from './chunks/_@astro-renderers_wXmDkZlw.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BEeGGb_O.mjs';
import { manifest } from './manifest_BzNmFyeM.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/generate-final-exam.astro.mjs');
const _page3 = () => import('./pages/api/questions.astro.mjs');
const _page4 = () => import('./pages/api/submit-question.astro.mjs');
const _page5 = () => import('./pages/api/submit-vote.astro.mjs');
const _page6 = () => import('./pages/catalog.astro.mjs');
const _page7 = () => import('./pages/final-exam.astro.mjs');
const _page8 = () => import('./pages/quiz.astro.mjs');
const _page9 = () => import('./pages/submit.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/generate-final-exam.ts", _page2],
    ["src/pages/api/questions.ts", _page3],
    ["src/pages/api/submit-question.ts", _page4],
    ["src/pages/api/submit-vote.ts", _page5],
    ["src/pages/catalog.astro", _page6],
    ["src/pages/final-exam.astro", _page7],
    ["src/pages/quiz.astro", _page8],
    ["src/pages/submit.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "5fc22b75-de63-4fa2-aad7-5c565d9b5876",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
