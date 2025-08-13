import '../chunks/page-ssr_C3OMqKvf.mjs';
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CX0OslVb.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CT3lLmra.mjs';
import { defineComponent, useSSRContext, ref, onMounted, computed, watch } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
import { s as sanityClient, q as queries } from '../chunks/sanity_5NUE8U2-.mjs';
export { renderers } from '../renderers.mjs';

const limit = 5;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "QACatalog",
  props: {
    categories: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const selectedCategory = ref(null);
    const searchQuery = ref("");
    const questions = ref([]);
    const offset = ref(0);
    const hasMore = ref(true);
    const isLoading = ref(false);
    const userVotes = ref({});
    const sessionId = ref("");
    function loadStoredVotes() {
      try {
        const raw = localStorage.getItem("aemace.votes");
        userVotes.value = raw ? JSON.parse(raw) : {};
      } catch {
        userVotes.value = {};
      }
    }
    function persistVotes() {
      try {
        localStorage.setItem("aemace.votes", JSON.stringify(userVotes.value));
      } catch {
      }
    }
    function getOrCreateSessionId() {
      try {
        const stored = localStorage.getItem("aemace.sessionId");
        if (stored) return stored;
        const sid = globalThis.crypto?.randomUUID?.() || `sess_${Math.random().toString(36).slice(2)}${Date.now()}`;
        localStorage.setItem("aemace.sessionId", sid);
        return sid;
      } catch {
        return `sess_${Date.now()}`;
      }
    }
    onMounted(() => {
      loadStoredVotes();
      sessionId.value = getOrCreateSessionId();
    });
    async function onVoteClick(question, targetValue) {
      const current = userVotes.value[question._id] || 0;
      const next = current === targetValue ? 0 : targetValue;
      applyVoteLocally(question, current, next);
      userVotes.value[question._id] = next;
      persistVotes();
      try {
        const res = await fetch("/api/submit-vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId: question._id, value: next, sessionId: sessionId.value })
        });
        if (!res.ok) throw new Error("Vote failed");
      } catch {
        applyVoteLocally(question, next, current);
        userVotes.value[question._id] = current;
        persistVotes();
      }
    }
    function applyVoteLocally(question, prev, next) {
      const up = question.upvotes ?? 0;
      const down = question.downvotes ?? 0;
      let newUp = up;
      let newDown = down;
      if (prev === 1) newUp -= 1;
      if (prev === -1) newDown -= 1;
      if (next === 1) newUp += 1;
      if (next === -1) newDown += 1;
      question.upvotes = Math.max(0, newUp);
      question.downvotes = Math.max(0, newDown);
      question.voteScore = (question.upvotes || 0) - (question.downvotes || 0);
    }
    const filteredQuestions = computed(() => {
      let filtered = questions.value;
      if (selectedCategory.value) {
        filtered = filtered.filter((q) => q.category._id === selectedCategory.value);
      }
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (q) => q.title.toLowerCase().includes(query) || q.question.toLowerCase().includes(query) || q.options.some((option) => option.toLowerCase().includes(query))
        );
      }
      return filtered;
    });
    async function fetchQuestions(reset = false) {
      if (isLoading.value) return;
      isLoading.value = true;
      try {
        const params = new URLSearchParams();
        params.set("offset", String(reset ? 0 : offset.value));
        params.set("limit", String(limit));
        if (selectedCategory.value) params.set("categoryId", selectedCategory.value);
        if (searchQuery.value.trim()) params.set("search", searchQuery.value.trim());
        const res = await fetch(`/api/questions?${params.toString()}`);
        const data = await res.json();
        if (reset) questions.value = [];
        questions.value = [...questions.value, ...data.items];
        offset.value = (reset ? 0 : offset.value) + data.items.length;
        hasMore.value = Boolean(data.hasMore);
      } finally {
        isLoading.value = false;
      }
    }
    function loadMore() {
      fetchQuestions(false);
    }
    watch([selectedCategory, searchQuery], () => {
      offset.value = 0;
      hasMore.value = true;
      fetchQuestions(true);
    });
    onMounted(() => {
      fetchQuestions(true);
    });
    const __returned__ = { props, selectedCategory, searchQuery, questions, offset, limit, hasMore, isLoading, userVotes, sessionId, loadStoredVotes, persistVotes, getOrCreateSessionId, onVoteClick, applyVoteLocally, filteredQuestions, fetchQuestions, loadMore };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-8"><div class="flex flex-wrap gap-4 justify-center"><!--[-->`);
  ssrRenderList($setup.props.categories, (category) => {
    _push(`<button class="${ssrRenderClass([
      "px-4 py-2 rounded-lg font-medium transition-colors duration-200",
      $setup.selectedCategory === category._id ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
    ])}">${ssrInterpolate(category.name)} <span class="ml-2 text-sm opacity-75">(${ssrInterpolate(category.questionCount)})</span></button>`);
  });
  _push(`<!--]--><button class="${ssrRenderClass([
    "px-4 py-2 rounded-lg font-medium transition-colors duration-200",
    $setup.selectedCategory === null ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
  ])}"> All Questions </button></div></div><div class="mb-8"><div class="max-w-md mx-auto"><div class="relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><input${ssrRenderAttr("value", $setup.searchQuery)} type="text" placeholder="Search questions..." class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"></div></div></div><div class="grid gap-6"><!--[-->`);
  ssrRenderList($setup.filteredQuestions, (question) => {
    _push(`<div class="card"><div class="flex justify-between items-start mb-4"><div><h3 class="text-lg font-heading font-semibold text-gray-900 mb-2">${ssrInterpolate(question.title)} `);
    if (question.isMultipleChoice) {
      _push(`<span class="ml-2 text-sm text-blue-600 font-normal"> (Multiple Answers) </span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</h3><div class="flex flex-wrap gap-2">`);
    if (question.category) {
      _push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style="${ssrRenderStyle({ backgroundColor: question.category.color + "20", color: question.category.color })}">${ssrInterpolate(question.category.name)}</span>`);
    } else {
      _push(`<!---->`);
    }
    if (question.isMultipleChoice) {
      _push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">${ssrInterpolate(question.correctAnswers.length)} correct answers </span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div><span class="${ssrRenderClass([
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      question.difficulty === "beginner" ? "bg-green-100 text-green-800" : question.difficulty === "intermediate" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
    ])}">${ssrInterpolate(question.difficulty)}</span></div><div class="mb-4 flex items-center gap-3"><button class="${ssrRenderClass([$setup.userVotes[question._id] === 1 ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50", "inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm transition-colors"])}" aria-label="Upvote"> \u25B2 </button><span class="${ssrRenderClass([(question.voteScore || 0) >= 0 ? "text-gray-900" : "text-gray-700", "min-w-[3rem] text-center font-medium"])}">${ssrInterpolate(question.voteScore ?? 0)}</span><button class="${ssrRenderClass([$setup.userVotes[question._id] === -1 ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50", "inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm transition-colors"])}" aria-label="Downvote"> \u25BC </button><span class="ml-2 text-xs text-gray-500">${ssrInterpolate(question.upvotes ?? 0)} up \u2022 ${ssrInterpolate(question.downvotes ?? 0)} down </span></div><div class="mb-4"><p class="text-gray-700 mb-4">${ssrInterpolate(question.question)}</p><div class="space-y-2"><!--[-->`);
    ssrRenderList(question.options, (option, index) => {
      _push(`<div class="${ssrRenderClass([
        "p-3 rounded-lg border-2",
        question.correctAnswers.includes(index) ? "border-green-500 bg-green-50 text-green-800" : "border-gray-200 bg-gray-50"
      ])}"><span class="font-medium">${ssrInterpolate(String.fromCharCode(65 + index))}.</span> ${ssrInterpolate(option)} `);
      if (question.correctAnswers.includes(index)) {
        _push(`<span class="ml-2 text-green-600">\u2713</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    });
    _push(`<!--]--></div></div>`);
    if (question.explanation) {
      _push(`<div class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"><h4 class="font-medium text-blue-900 mb-2">Explanation:</h4><p class="text-blue-800">${ssrInterpolate(question.explanation)}</p></div>`);
    } else {
      _push(`<!---->`);
    }
    if (question.tags && question.tags.length > 0) {
      _push(`<div class="mt-4 flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(question.tags, (tag) => {
        _push(`<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">${ssrInterpolate(tag)}</span>`);
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  });
  _push(`<!--]-->`);
  if (!$setup.isLoading && $setup.filteredQuestions.length === 0) {
    _push(`<div class="text-center py-12"><svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2">No Questions Found</h3><p class="text-gray-600">Try adjusting your search or filter criteria.</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.isLoading) {
    _push(`<div class="text-center py-6 text-gray-500">Loading...</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.hasMore && !$setup.isLoading) {
    _push(`<div class="text-center mt-4"><button class="px-4 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"> Load more </button></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/QACatalog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const QACatalog = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const $$Catalog = createComponent(async ($$result, $$props, $$slots) => {
  const categories = await sanityClient.fetch(queries.allCategories);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Q&A Catalog - AEM Ace" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="py-12"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h1 class="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
Q&A Catalog
</h1> <p class="text-xl text-gray-600 max-w-2xl mx-auto">
Browse and study individual Q&A pairs from the AEM Site Developer exam. 
          Each question includes detailed explanations to help you understand the concepts.
</p> </div> ${renderComponent($$result2, "QACatalog", QACatalog, { "client:load": true, "categories": categories, "client:component-hydration": "load", "client:component-path": "/Users/2049576/Private Projects/AEM Ace/src/components/QACatalog.vue", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/Users/2049576/Private Projects/AEM Ace/src/pages/catalog.astro", void 0);

const $$file = "/Users/2049576/Private Projects/AEM Ace/src/pages/catalog.astro";
const $$url = "/catalog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Catalog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
