import '../chunks/page-ssr_BXMG_FyV.mjs';
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CX0OslVb.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CT3lLmra.mjs';
import { defineComponent, useSSRContext, ref, computed } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { renderers } from '../renderers.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FinalExam",
  setup(__props, { expose: __expose }) {
    __expose();
    const isStarted = ref(false);
    const isComplete = ref(false);
    const loading = ref(false);
    const size = ref(20);
    const questions = ref([]);
    const index = ref(0);
    const selected = ref([]);
    const answered = ref(false);
    const userAnswers = ref([]);
    const remainingSeconds = ref(0);
    let countdownTimer;
    const current = computed(() => questions.value[index.value]);
    const correct = computed(() => userAnswers.value.filter((ans, i) => {
      const q = questions.value[i];
      if (!q) return false;
      const c = new Set(q.correctAnswers);
      const u = new Set(ans);
      return c.size === u.size && [...c].every((x) => u.has(x));
    }).length);
    const formattedTimeLeft = computed(() => {
      const total = remainingSeconds.value;
      const hrs = Math.floor(total / 3600);
      const mins = Math.floor(total % 3600 / 60);
      const secs = total % 60;
      const mm = String(mins).padStart(2, "0");
      const ss = String(secs).padStart(2, "0");
      return hrs > 0 ? `${hrs}:${mm}:${ss}` : `${mins}:${ss}`;
    });
    async function start() {
      loading.value = true;
      try {
        let res = await fetch("/api/generate-final-exam");
        if (res.status === 404) {
          await fetch("/api/generate-final-exam", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ size: Number(size.value), minVotes: 0, minRatio: 0, balanced: true })
          });
          res = await fetch("/api/generate-final-exam");
        }
        if (!res.ok) {
          window.location.href = "/404";
          return;
        }
        const paper = await res.json();
        const items = Array.isArray(paper?.questions) ? paper.questions : [];
        if (items.length === 0) {
          window.location.href = "/404";
          return;
        }
        questions.value = items.slice(0, Number(size.value));
        index.value = 0;
        selected.value = [];
        userAnswers.value = [];
        answered.value = false;
        isStarted.value = true;
        remainingSeconds.value = (questions.value.length || Number(size.value)) * 120;
        if (countdownTimer) window.clearInterval(countdownTimer);
        countdownTimer = window.setInterval(() => {
          if (remainingSeconds.value > 0) {
            remainingSeconds.value -= 1;
          } else {
            if (countdownTimer) window.clearInterval(countdownTimer);
            isComplete.value = true;
          }
        }, 1e3);
      } catch {
        window.location.href = "/404";
      } finally {
        loading.value = false;
      }
    }
    function toggle(i) {
      if (answered.value) return;
      if (current.value.isMultipleChoice) {
        const k = selected.value.indexOf(i);
        if (k > -1) selected.value.splice(k, 1);
        else selected.value.push(i);
      } else {
        selected.value = [i];
      }
    }
    function submit() {
      if (selected.value.length === 0) return;
      answered.value = true;
      userAnswers.value[index.value] = [...selected.value];
    }
    function next() {
      if (index.value < questions.value.length - 1) {
        index.value++;
        selected.value = [];
        answered.value = false;
      } else {
        isComplete.value = true;
      }
    }
    function prev() {
      if (index.value > 0) {
        index.value--;
        selected.value = userAnswers.value[index.value] ?? [];
        answered.value = userAnswers.value[index.value] !== void 0;
      }
    }
    function restart() {
      isStarted.value = false;
      isComplete.value = false;
      index.value = 0;
      selected.value = [];
      userAnswers.value = [];
      questions.value = [];
      remainingSeconds.value = 0;
      if (countdownTimer) window.clearInterval(countdownTimer);
    }
    const __returned__ = { isStarted, isComplete, loading, size, questions, index, selected, answered, userAnswers, remainingSeconds, get countdownTimer() {
      return countdownTimer;
    }, set countdownTimer(v) {
      countdownTimer = v;
    }, current, correct, formattedTimeLeft, start, toggle, submit, next, prev, restart };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  if (!$setup.isStarted) {
    _push(`<div class="max-w-2xl mx-auto"><div class="card text-center"><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-3">Number of Questions</label><select class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"><option value="10"${ssrIncludeBooleanAttr(Array.isArray($setup.size) ? ssrLooseContain($setup.size, "10") : ssrLooseEqual($setup.size, "10")) ? " selected" : ""}>10 Questions</option><option value="20"${ssrIncludeBooleanAttr(Array.isArray($setup.size) ? ssrLooseContain($setup.size, "20") : ssrLooseEqual($setup.size, "20")) ? " selected" : ""}>20 Questions</option><option value="30"${ssrIncludeBooleanAttr(Array.isArray($setup.size) ? ssrLooseContain($setup.size, "30") : ssrLooseEqual($setup.size, "30")) ? " selected" : ""}>30 Questions</option><option value="50"${ssrIncludeBooleanAttr(Array.isArray($setup.size) ? ssrLooseContain($setup.size, "50") : ssrLooseEqual($setup.size, "50")) ? " selected" : ""}>50 Questions</option></select></div><button${ssrIncludeBooleanAttr($setup.loading) ? " disabled" : ""} class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">`);
    if ($setup.loading) {
      _push(`<span>Preparing...</span>`);
    } else {
      _push(`<span>Start Final Exam</span>`);
    }
    _push(`</button></div></div>`);
  } else if (!$setup.isComplete) {
    _push(`<div class="max-w-3xl mx-auto"><div class="mb-8"><div class="flex justify-between text-sm text-gray-600 mb-2"><span>Question ${ssrInterpolate($setup.index + 1)} of ${ssrInterpolate($setup.questions.length)}</span><div class="flex items-center gap-4"><span>${ssrInterpolate(Math.round(($setup.index + 1) / $setup.questions.length * 100))}% Complete</span><span class="${ssrRenderClass($setup.remainingSeconds <= 300 ? "text-red-600 font-semibold" : "text-gray-800")}">\u23F1\uFE0F ${ssrInterpolate($setup.formattedTimeLeft)}</span></div></div><div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-primary h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: ($setup.index + 1) / $setup.questions.length * 100 + "%" })}"></div></div></div><div class="card"><div class="mb-6"><div class="flex justify-between items-start mb-4"><h2 class="text-xl font-heading font-semibold text-gray-900">${ssrInterpolate($setup.current.title)} `);
    if ($setup.current.isMultipleChoice) {
      _push(`<span class="ml-2 text-sm text-blue-600 font-normal">(Select Multiple)</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</h2><span class="${ssrRenderClass(["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", $setup.current.difficulty === "beginner" ? "bg-green-100 text-green-800" : $setup.current.difficulty === "intermediate" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"])}">${ssrInterpolate($setup.current.difficulty)}</span></div><p class="text-gray-700 text-lg">${ssrInterpolate($setup.current.question)}</p></div><div class="space-y-3 mb-6"><!--[-->`);
    ssrRenderList($setup.current.options, (option, i) => {
      _push(`<button${ssrIncludeBooleanAttr($setup.answered) ? " disabled" : ""} class="${ssrRenderClass(["quiz-option w-full text-left", $setup.selected.includes(i) ? "selected" : "", $setup.answered && $setup.current.correctAnswers.includes(i) ? "correct" : "", $setup.answered && $setup.selected.includes(i) && !$setup.current.correctAnswers.includes(i) ? "incorrect" : ""])}"><div class="flex items-center"><div class="mr-3 flex-shrink-0">`);
      if ($setup.current.isMultipleChoice) {
        _push(`<div class="${ssrRenderClass(["w-4 h-4 border-2 rounded flex items-center justify-center", $setup.selected.includes(i) ? "bg-blue-500 border-blue-500" : "border-gray-300"])}">`);
        if ($setup.selected.includes(i)) {
          _push(`<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="${ssrRenderClass(["w-4 h-4 border-2 rounded-full flex items-center justify-center", $setup.selected.includes(i) ? "bg-blue-500 border-blue-500" : "border-gray-300"])}">`);
        if ($setup.selected.includes(i)) {
          _push(`<div class="w-2 h-2 bg-white rounded-full"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div><div class="flex-1"><span class="font-medium">${ssrInterpolate(String.fromCharCode(65 + i))}.</span> ${ssrInterpolate(option)}</div>`);
      if ($setup.answered) {
        _push(`<span class="ml-3">`);
        if ($setup.current.correctAnswers.includes(i)) {
          _push(`<span class="text-green-600">\u2713</span>`);
        } else if ($setup.selected.includes(i)) {
          _push(`<span class="text-red-600">\u2717</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></button>`);
    });
    _push(`<!--]--></div><div class="flex justify-between">`);
    if ($setup.index > 0) {
      _push(`<button class="px-4 py-2 text-gray-600 hover:text-gray-900">\u2190 Previous</button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div></div>`);
    if (!$setup.answered && $setup.selected.length > 0) {
      _push(`<button class="btn-primary mr-4">Submit Answer</button>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.answered) {
      _push(`<button class="btn-primary">`);
      if ($setup.index < $setup.questions.length - 1) {
        _push(`<span>Next Question \u2192</span>`);
      } else {
        _push(`<span>Finish Exam</span>`);
      }
      _push(`</button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div></div>`);
  } else {
    _push(`<div class="max-w-2xl mx-auto"><div class="card text-center"><h2 class="text-3xl font-heading font-bold text-gray-900 mb-2">Exam Complete</h2><p class="text-gray-700 mb-6">Score: <span class="font-semibold">${ssrInterpolate($setup.correct)}/${ssrInterpolate($setup.questions.length)}</span></p><div class="flex gap-4 justify-center"><button class="btn-secondary">Retake</button><a href="/catalog" class="btn-primary">Review Catalog</a></div></div></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/FinalExam.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FinalExamComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const $$FinalExam = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Final Exam - AEM Ace" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="py-12"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h1 class="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
Final Exam
</h1> <p class="text-xl text-gray-600 max-w-2xl mx-auto">
A curated exam generated from the highest‑rated questions.
</p> </div> ${renderComponent($$result2, "FinalExamComponent", FinalExamComponent, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/2049576/Private Projects/AEM Ace/src/components/FinalExam.vue", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/Users/2049576/Private Projects/AEM Ace/src/pages/final-exam.astro", void 0);

const $$file = "/Users/2049576/Private Projects/AEM Ace/src/pages/final-exam.astro";
const $$url = "/final-exam";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$FinalExam,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
