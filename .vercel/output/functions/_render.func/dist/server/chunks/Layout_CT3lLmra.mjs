import { e as createComponent, f as createAstro, h as addAttribute, l as renderHead, n as renderSlot, o as renderScript, r as renderTemplate } from './astro/server_CX0OslVb.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Master the Adobe AEM Site Developer Professional Exam with interactive quizzes and comprehensive Q&A catalog." } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderHead()}</head> <body> <header class="bg-white shadow-sm border-b border-gray-200"> <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center h-16"> <div class="flex items-center"> <a href="/" class="text-2xl font-heading font-bold text-primary">
AEM Ace
</a> </div> <div class="hidden md:block"> <div class="ml-10 flex items-baseline space-x-4"> <a href="/" class="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
Home
</a> <a href="/catalog" class="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
Q&A Catalog
</a> <a href="/submit" class="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
Submit Question
</a> <a href="/quiz" class="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
Take Quiz
</a> <a href="/final-exam" class="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
Final Exam
</a> </div> </div> <!-- Mobile menu button --> <div class="md:hidden"> <button type="button" class="bg-gray-50 p-2 rounded-md text-gray-900 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"> <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> </nav> </header> <main class="min-h-screen bg-background"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-primary text-white"> <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"> <div class="text-center"> <h3 class="text-lg font-heading font-semibold mb-4">AEM Ace</h3> <p class="text-gray-300 mb-4">
Master the Adobe AEM Site Developer Professional Exam
</p> <p class="text-gray-400 text-sm">
Built with Astro, Vue, and Tailwind CSS
</p> </div> </div> </footer> ${renderScript($$result, "/Users/2049576/Private Projects/AEM Ace/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/2049576/Private Projects/AEM Ace/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
