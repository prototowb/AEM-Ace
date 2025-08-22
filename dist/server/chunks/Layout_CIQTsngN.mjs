import { e as createComponent, f as createAstro, r as renderTemplate, n as renderScript, o as renderSlot, l as renderHead, h as addAttribute } from './astro/server_DYV2YbUj.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                           */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Master the Adobe AEM Site Developer Professional Exam with interactive quizzes and comprehensive Q&A catalog." } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description"', '><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>', "</title>", '</head> <body> <header class="bg-white shadow-sm border-b border-gray-200"> <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center h-16"> <div class="flex items-center"> <a href="/" class="text-2xl font-heading font-bold text-primary">\nAEM Ace\n</a> </div> <div class="hidden md:block"> <div class="ml-10 flex items-baseline space-x-4"> <a href="/" class="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">\nHome\n</a> <a href="/catalog" class="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">\nQ&A Catalog\n</a> <a href="/submit" class="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">\nSubmit Question\n</a> <a href="/quiz" class="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">\nTake Quiz\n</a> <a href="/final-exam" class="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">\nFinal Exam\n</a> </div> </div> <!-- Mobile menu button --> <div class="md:hidden"> <button id="mobile-menu-btn" type="button" class="bg-gray-50 p-2 rounded-md text-gray-900 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary" aria-controls="mobile-menu" aria-expanded="false"> <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> <!-- Mobile menu panel --> <div id="mobile-menu" class="md:hidden hidden border-t border-gray-200 py-3"> <div class="flex flex-col space-y-1"> <a href="/" class="block px-3 py-2 text-gray-900 hover:text-primary">Home</a> <a href="/catalog" class="block px-3 py-2 text-gray-900 hover:text-primary">Q&A Catalog</a> <a href="/submit" class="block px-3 py-2 text-gray-900 hover:text-primary">Submit Question</a> <a href="/quiz" class="block px-3 py-2 text-white bg-primary rounded-md mx-3 text-center">Take Quiz</a> <a href="/final-exam" class="block px-3 py-2 text-gray-900 hover:text-primary">Final Exam</a> </div> </div> </nav> </header> <main class="min-h-screen bg-background"> ', ` </main> <footer class="bg-primary text-white"> <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"> <div class="text-center"> <h3 class="text-lg font-heading font-semibold mb-4">AEM Ace</h3> <p class="text-gray-300 mb-4">
Master the Adobe AEM Site Developer Professional Exam
</p> <p class="text-gray-400 text-sm">
Built with Astro, Vue, and Tailwind CSS
</p> </div> </div> </footer> <script>
      const btn = document.getElementById('mobile-menu-btn');
      const menu = document.getElementById('mobile-menu');
      if (btn && menu) {
        btn.addEventListener('click', () => {
          const isHidden = menu.classList.contains('hidden');
          menu.classList.toggle('hidden');
          btn.setAttribute('aria-expanded', String(isHidden));
        }, { passive: true });
      }
    <\/script> <!-- Vercel Web Analytics --> `, ' <script defer src="/_vercel/insights/script.js"><\/script> </body> </html>'])), addAttribute(description, "content"), title, renderHead(), renderSlot($$result, $$slots["default"]), renderScript($$result, "/Users/2049576/Private Projects/AEM Ace/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/2049576/Private Projects/AEM Ace/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
