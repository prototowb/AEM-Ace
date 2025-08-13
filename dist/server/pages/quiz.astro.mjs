/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CfiTzbZJ.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_C6GLU_8r.mjs';
import { v as vueExports, s as serverRenderer_cjs_prodExports } from '../chunks/_@astro-renderers_CT2YL425.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_CT2YL425.mjs';
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
import { s as sanityClient, q as queries } from '../chunks/sanity_DJvb4Jcn.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "QuizApp",
  props: {
    questions: { default: () => [] },
    categories: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const isQuizStarted = vueExports.ref(false);
    const isQuizComplete = vueExports.ref(false);
    const currentQuestionIndex = vueExports.ref(0);
    const selectedAnswers = vueExports.ref([]);
    const userAnswers = vueExports.ref([]);
    const startTime = vueExports.ref(0);
    const questionTimes = vueExports.ref([]);
    const selectedCategory = vueExports.ref("");
    const selectedDifficulty = vueExports.ref("");
    const numberOfQuestions = vueExports.ref(10);
    const quizQuestions = vueExports.ref([]);
    const loading = vueExports.ref(false);
    const currentQuestion = vueExports.computed(() => quizQuestions.value[currentQuestionIndex.value]);
    const isAnswered = vueExports.computed(() => selectedAnswers.value.length > 0 && hasSubmittedAnswer.value);
    const hasSubmittedAnswer = vueExports.ref(false);
    const correctAnswers = vueExports.computed(
      () => userAnswers.value.filter((userAnswer, index) => {
        const question = quizQuestions.value[index];
        if (!question) return false;
        const correctSet = new Set(question.correctAnswers);
        const userSet = new Set(userAnswer);
        return correctSet.size === userSet.size && [...correctSet].every((x) => userSet.has(x));
      }).length
    );
    const incorrectAnswers = vueExports.computed(() => quizQuestions.value.length - correctAnswers.value);
    const scorePercentage = vueExports.computed(() => correctAnswers.value / quizQuestions.value.length * 100);
    const averageTime = vueExports.computed(
      () => questionTimes.value.length > 0 ? questionTimes.value.reduce((a, b) => a + b, 0) / questionTimes.value.length : 0
    );
    const startQuiz = async () => {
      loading.value = true;
      let pool = [];
      if (props.questions && props.questions.length > 0) {
        pool = [...props.questions];
      } else {
        try {
          const params = new URLSearchParams();
          params.set("limit", "50");
          if (selectedCategory.value) params.set("categoryId", selectedCategory.value);
          const res = await fetch(`/api/questions?${params.toString()}`);
          if (res.ok) {
            const data = await res.json();
            pool = Array.isArray(data?.items) ? data.items : [];
          }
        } catch {
        }
      }
      if (selectedCategory.value) {
        pool = pool.filter((q) => q.category._id === selectedCategory.value);
      }
      if (selectedDifficulty.value) {
        pool = pool.filter((q) => q.difficulty === selectedDifficulty.value);
      }
      const shuffled = pool.sort(() => Math.random() - 0.5);
      quizQuestions.value = shuffled.slice(0, Math.min(Number(numberOfQuestions.value), shuffled.length));
      if (quizQuestions.value.length === 0) {
        alert("No questions available for the selected criteria. Please try different settings.");
        loading.value = false;
        return;
      }
      currentQuestionIndex.value = 0;
      selectedAnswers.value = [];
      userAnswers.value = [];
      questionTimes.value = [];
      hasSubmittedAnswer.value = false;
      isQuizStarted.value = true;
      startTime.value = Date.now();
      loading.value = false;
    };
    const toggleAnswer = (answerIndex) => {
      if (isAnswered.value) return;
      if (currentQuestion.value.isMultipleChoice) {
        const index = selectedAnswers.value.indexOf(answerIndex);
        if (index > -1) {
          selectedAnswers.value.splice(index, 1);
        } else {
          selectedAnswers.value.push(answerIndex);
        }
      } else {
        selectedAnswers.value = [answerIndex];
      }
    };
    const submitAnswer = () => {
      if (selectedAnswers.value.length === 0) return;
      hasSubmittedAnswer.value = true;
      userAnswers.value[currentQuestionIndex.value] = [...selectedAnswers.value];
      const timeSpent = (Date.now() - startTime.value) / 1e3;
      questionTimes.value[currentQuestionIndex.value] = timeSpent;
    };
    const nextQuestion = () => {
      if (currentQuestionIndex.value < quizQuestions.value.length - 1) {
        currentQuestionIndex.value++;
        selectedAnswers.value = [];
        hasSubmittedAnswer.value = false;
        startTime.value = Date.now();
      } else {
        isQuizComplete.value = true;
      }
    };
    const previousQuestion = () => {
      if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--;
        selectedAnswers.value = userAnswers.value[currentQuestionIndex.value] ?? [];
        hasSubmittedAnswer.value = userAnswers.value[currentQuestionIndex.value] !== void 0;
      }
    };
    const getScoreMessage = () => {
      if (scorePercentage.value >= 80) return "Excellent! You're ready for the exam!";
      if (scorePercentage.value >= 70) return "Good job! A bit more study and you'll be ready.";
      if (scorePercentage.value >= 50) return "Not bad, but you need more practice.";
      return "Keep studying! You'll get there.";
    };
    const resetQuiz = () => {
      isQuizStarted.value = false;
      isQuizComplete.value = false;
      currentQuestionIndex.value = 0;
      selectedAnswers.value = [];
      userAnswers.value = [];
      questionTimes.value = [];
      hasSubmittedAnswer.value = false;
      quizQuestions.value = [];
    };
    const __returned__ = { props, isQuizStarted, isQuizComplete, currentQuestionIndex, selectedAnswers, userAnswers, startTime, questionTimes, selectedCategory, selectedDifficulty, numberOfQuestions, quizQuestions, loading, currentQuestion, isAnswered, hasSubmittedAnswer, correctAnswers, incorrectAnswers, scorePercentage, averageTime, startQuiz, toggleAnswer, submitAnswer, nextQuestion, previousQuestion, getScoreMessage, resetQuiz };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(_attrs)}>`);
  if (!$setup.isQuizStarted) {
    _push(`<div class="max-w-2xl mx-auto"><div class="card text-center"><h2 class="text-2xl font-heading font-bold text-gray-900 mb-6"> Choose Your Quiz Settings </h2><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-3"> Select Category </label><select class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"><option value=""${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray($setup.selectedCategory) ? serverRenderer_cjs_prodExports.ssrLooseContain($setup.selectedCategory, "") : serverRenderer_cjs_prodExports.ssrLooseEqual($setup.selectedCategory, "")) ? " selected" : ""}>All Categories (Mixed Quiz)</option><!--[-->`);
    serverRenderer_cjs_prodExports.ssrRenderList($setup.props.categories, (category) => {
      _push(`<option${serverRenderer_cjs_prodExports.ssrRenderAttr("value", category._id)}${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray($setup.selectedCategory) ? serverRenderer_cjs_prodExports.ssrLooseContain($setup.selectedCategory, category._id) : serverRenderer_cjs_prodExports.ssrLooseEqual($setup.selectedCategory, category._id)) ? " selected" : ""}>${serverRenderer_cjs_prodExports.ssrInterpolate(category.name)} (${serverRenderer_cjs_prodExports.ssrInterpolate(category.questionCount || 0)} questions) </option>`);
    });
    _push(`<!--]--></select></div><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-3"> Number of Questions </label><select class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"><option value="5"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray($setup.numberOfQuestions) ? serverRenderer_cjs_prodExports.ssrLooseContain($setup.numberOfQuestions, "5") : serverRenderer_cjs_prodExports.ssrLooseEqual($setup.numberOfQuestions, "5")) ? " selected" : ""}>5 Questions</option><option value="10"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray($setup.numberOfQuestions) ? serverRenderer_cjs_prodExports.ssrLooseContain($setup.numberOfQuestions, "10") : serverRenderer_cjs_prodExports.ssrLooseEqual($setup.numberOfQuestions, "10")) ? " selected" : ""}>10 Questions</option><option value="15"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray($setup.numberOfQuestions) ? serverRenderer_cjs_prodExports.ssrLooseContain($setup.numberOfQuestions, "15") : serverRenderer_cjs_prodExports.ssrLooseEqual($setup.numberOfQuestions, "15")) ? " selected" : ""}>15 Questions</option><option value="20"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray($setup.numberOfQuestions) ? serverRenderer_cjs_prodExports.ssrLooseContain($setup.numberOfQuestions, "20") : serverRenderer_cjs_prodExports.ssrLooseEqual($setup.numberOfQuestions, "20")) ? " selected" : ""}>20 Questions</option></select></div><div class="mb-8"><label class="block text-sm font-medium text-gray-700 mb-3"> Difficulty Level </label><select class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"><option value=""${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray($setup.selectedDifficulty) ? serverRenderer_cjs_prodExports.ssrLooseContain($setup.selectedDifficulty, "") : serverRenderer_cjs_prodExports.ssrLooseEqual($setup.selectedDifficulty, "")) ? " selected" : ""}>All Levels</option><option value="beginner"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray($setup.selectedDifficulty) ? serverRenderer_cjs_prodExports.ssrLooseContain($setup.selectedDifficulty, "beginner") : serverRenderer_cjs_prodExports.ssrLooseEqual($setup.selectedDifficulty, "beginner")) ? " selected" : ""}>Beginner</option><option value="intermediate"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray($setup.selectedDifficulty) ? serverRenderer_cjs_prodExports.ssrLooseContain($setup.selectedDifficulty, "intermediate") : serverRenderer_cjs_prodExports.ssrLooseEqual($setup.selectedDifficulty, "intermediate")) ? " selected" : ""}>Intermediate</option><option value="advanced"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(Array.isArray($setup.selectedDifficulty) ? serverRenderer_cjs_prodExports.ssrLooseContain($setup.selectedDifficulty, "advanced") : serverRenderer_cjs_prodExports.ssrLooseEqual($setup.selectedDifficulty, "advanced")) ? " selected" : ""}>Advanced</option></select></div><button${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr($setup.loading) ? " disabled" : ""} class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">`);
    if ($setup.loading) {
      _push(`<span>Loading...</span>`);
    } else {
      _push(`<span>Start Quiz</span>`);
    }
    _push(`</button></div></div>`);
  } else if (!$setup.isQuizComplete) {
    _push(`<div class="max-w-3xl mx-auto"><div class="mb-8"><div class="flex justify-between text-sm text-gray-600 mb-2"><span>Question ${serverRenderer_cjs_prodExports.ssrInterpolate($setup.currentQuestionIndex + 1)} of ${serverRenderer_cjs_prodExports.ssrInterpolate($setup.quizQuestions.length)}</span><span>${serverRenderer_cjs_prodExports.ssrInterpolate(Math.round(($setup.currentQuestionIndex + 1) / $setup.quizQuestions.length * 100))}% Complete</span></div><div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-primary h-2 rounded-full transition-all duration-300" style="${serverRenderer_cjs_prodExports.ssrRenderStyle({ width: ($setup.currentQuestionIndex + 1) / $setup.quizQuestions.length * 100 + "%" })}"></div></div></div><div class="card"><div class="mb-6"><div class="flex justify-between items-start mb-4"><h2 class="text-xl font-heading font-semibold text-gray-900">${serverRenderer_cjs_prodExports.ssrInterpolate($setup.currentQuestion.title)} `);
    if ($setup.currentQuestion.isMultipleChoice) {
      _push(`<span class="ml-2 text-sm text-blue-600 font-normal"> (Select Multiple) </span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</h2><div class="flex gap-2">`);
    if ($setup.currentQuestion.isMultipleChoice) {
      _push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">${serverRenderer_cjs_prodExports.ssrInterpolate($setup.currentQuestion.correctAnswers.length)} correct </span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<span class="${serverRenderer_cjs_prodExports.ssrRenderClass([
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      $setup.currentQuestion.difficulty === "beginner" ? "bg-green-100 text-green-800" : $setup.currentQuestion.difficulty === "intermediate" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
    ])}">${serverRenderer_cjs_prodExports.ssrInterpolate($setup.currentQuestion.difficulty)}</span></div></div><p class="text-gray-700 text-lg">${serverRenderer_cjs_prodExports.ssrInterpolate($setup.currentQuestion.question)}</p>`);
    if ($setup.currentQuestion.isMultipleChoice) {
      _push(`<p class="text-sm text-blue-600 mt-2"> \u{1F4A1} This question has multiple correct answers. Select all that apply. </p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div class="space-y-3 mb-6"><!--[-->`);
    serverRenderer_cjs_prodExports.ssrRenderList($setup.currentQuestion.options, (option, index) => {
      _push(`<button${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr($setup.isAnswered) ? " disabled" : ""} class="${serverRenderer_cjs_prodExports.ssrRenderClass([
        "quiz-option w-full text-left",
        $setup.selectedAnswers.includes(index) ? "selected" : "",
        $setup.isAnswered && $setup.currentQuestion.correctAnswers.includes(index) ? "correct" : "",
        $setup.isAnswered && $setup.selectedAnswers.includes(index) && !$setup.currentQuestion.correctAnswers.includes(index) ? "incorrect" : ""
      ])}"><div class="flex items-center"><div class="mr-3 flex-shrink-0">`);
      if ($setup.currentQuestion.isMultipleChoice) {
        _push(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([
          "w-4 h-4 border-2 rounded flex items-center justify-center",
          $setup.selectedAnswers.includes(index) ? "bg-blue-500 border-blue-500" : "border-gray-300"
        ])}">`);
        if ($setup.selectedAnswers.includes(index)) {
          _push(`<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([
          "w-4 h-4 border-2 rounded-full flex items-center justify-center",
          $setup.selectedAnswers.includes(index) ? "bg-blue-500 border-blue-500" : "border-gray-300"
        ])}">`);
        if ($setup.selectedAnswers.includes(index)) {
          _push(`<div class="w-2 h-2 bg-white rounded-full"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div><div class="flex-1"><span class="font-medium">${serverRenderer_cjs_prodExports.ssrInterpolate(String.fromCharCode(65 + index))}.</span> ${serverRenderer_cjs_prodExports.ssrInterpolate(option)}</div>`);
      if ($setup.isAnswered) {
        _push(`<span class="ml-3">`);
        if ($setup.currentQuestion.correctAnswers.includes(index)) {
          _push(`<span class="text-green-600">\u2713</span>`);
        } else if ($setup.selectedAnswers.includes(index)) {
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
    _push(`<!--]--></div>`);
    if ($setup.isAnswered && $setup.currentQuestion.explanation) {
      _push(`<div class="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6"><h4 class="font-medium text-blue-900 mb-2">Explanation:</h4><p class="text-blue-800">${serverRenderer_cjs_prodExports.ssrInterpolate($setup.currentQuestion.explanation)}</p></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="flex justify-between">`);
    if ($setup.currentQuestionIndex > 0) {
      _push(`<button class="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"> \u2190 Previous </button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div></div>`);
    if (!$setup.isAnswered && $setup.selectedAnswers.length > 0) {
      _push(`<button class="btn-primary mr-4"> Submit Answer </button>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.isAnswered) {
      _push(`<button class="btn-primary">`);
      if ($setup.currentQuestionIndex < $setup.quizQuestions.length - 1) {
        _push(`<span> Next Question \u2192 </span>`);
      } else {
        _push(`<span> Finish Quiz </span>`);
      }
      _push(`</button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div></div>`);
  } else {
    _push(`<div class="max-w-2xl mx-auto"><div class="card text-center"><div class="mb-6"><div class="relative w-32 h-32 mx-auto mb-6"><svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36"><path class="text-gray-200" stroke="currentColor" stroke-width="3" fill="transparent" d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"></path><path class="${serverRenderer_cjs_prodExports.ssrRenderClass($setup.scorePercentage >= 70 ? "text-green-500" : $setup.scorePercentage >= 50 ? "text-yellow-500" : "text-red-500")}" stroke="currentColor" stroke-width="3" fill="transparent" stroke-linecap="round"${serverRenderer_cjs_prodExports.ssrRenderAttr("stroke-dasharray", `${$setup.scorePercentage}, 100`)} d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"></path></svg><div class="absolute inset-0 flex items-center justify-center"><span class="text-2xl font-bold text-gray-900">${serverRenderer_cjs_prodExports.ssrInterpolate(Math.round($setup.scorePercentage))}%</span></div></div><h2 class="text-3xl font-heading font-bold text-gray-900 mb-4"> Quiz Complete! </h2><div class="text-lg text-gray-600 mb-6"><p>You scored ${serverRenderer_cjs_prodExports.ssrInterpolate($setup.correctAnswers)} out of ${serverRenderer_cjs_prodExports.ssrInterpolate($setup.quizQuestions.length)} questions</p><p class="${serverRenderer_cjs_prodExports.ssrRenderClass($setup.scorePercentage >= 70 ? "text-green-600" : $setup.scorePercentage >= 50 ? "text-yellow-600" : "text-red-600")}">${serverRenderer_cjs_prodExports.ssrInterpolate($setup.getScoreMessage())}</p></div></div><div class="grid md:grid-cols-3 gap-4 mb-8"><div class="bg-green-50 p-4 rounded-lg"><div class="text-2xl font-bold text-green-600">${serverRenderer_cjs_prodExports.ssrInterpolate($setup.correctAnswers)}</div><div class="text-sm text-green-700">Correct</div></div><div class="bg-red-50 p-4 rounded-lg"><div class="text-2xl font-bold text-red-600">${serverRenderer_cjs_prodExports.ssrInterpolate($setup.incorrectAnswers)}</div><div class="text-sm text-red-700">Incorrect</div></div><div class="bg-blue-50 p-4 rounded-lg"><div class="text-2xl font-bold text-blue-600">${serverRenderer_cjs_prodExports.ssrInterpolate(Math.round($setup.averageTime))}s</div><div class="text-sm text-blue-700">Avg. Time</div></div></div><div class="flex flex-col sm:flex-row gap-4 justify-center"><button class="btn-primary"> Take Another Quiz </button><a href="/catalog" class="btn-secondary"> Review Q&amp;A Catalog </a></div></div></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/QuizApp.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const QuizApp = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const prerender = true;
const $$Quiz = createComponent(async ($$result, $$props, $$slots) => {
  const categories = await sanityClient.fetch(queries.allCategories);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Interactive Quiz - AEM Ace" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="py-12"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h1 class="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
Interactive Quiz
</h1> <p class="text-xl text-gray-600 max-w-2xl mx-auto">
Test your knowledge with our interactive multiple-choice quizzes. 
          Choose a category or take a comprehensive mixed quiz covering all AEM topics.
</p> </div> ${renderComponent($$result2, "QuizApp", QuizApp, { "client:load": true, "questions": [], "categories": categories, "client:component-hydration": "load", "client:component-path": "/Users/2049576/Private Projects/AEM Ace/src/components/QuizApp.vue", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/Users/2049576/Private Projects/AEM Ace/src/pages/quiz.astro", void 0);

const $$file = "/Users/2049576/Private Projects/AEM Ace/src/pages/quiz.astro";
const $$url = "/quiz";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Quiz,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
