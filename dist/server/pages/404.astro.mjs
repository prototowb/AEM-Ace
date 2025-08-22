import '../chunks/page-ssr_DMXGs7By.mjs';
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DYV2YbUj.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CIQTsngN.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page Not Found - AEM Ace" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="py-24"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h1 class="text-6xl font-heading font-bold text-primary mb-4">404</h1> <h2 class="text-3xl font-heading font-semibold mb-6">Page Not Found</h2> <p class="text-xl text-gray-600 mb-8">
The page you're looking for doesn't exist or may have been moved.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/" class="btn-primary">
Go Home
</a> <a href="/catalog" class="btn-secondary">
Browse Q&A
</a> </div> </div> </div> ` })}`;
}, "/Users/2049576/Private Projects/AEM Ace/src/pages/404.astro", void 0);

const $$file = "/Users/2049576/Private Projects/AEM Ace/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
