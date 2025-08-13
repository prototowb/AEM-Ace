import '../chunks/page-ssr_C3OMqKvf.mjs';
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CX0OslVb.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CT3lLmra.mjs';
import { defineComponent, useSSRContext, reactive, ref, watch, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
import { s as sanityClient, q as queries } from '../chunks/sanity_5NUE8U2-.mjs';
export { renderers } from '../renderers.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "QuestionSubmission",
  props: {
    categories: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const form = reactive({
      title: "",
      question: "",
      options: ["", ""],
      correctAnswers: [],
      explanation: "",
      categoryId: "",
      difficulty: "",
      tags: [],
      submitterName: "",
      submitterEmail: "",
      website: ""
      // honeypot
    });
    const errors = reactive({});
    const submitting = ref(false);
    const successMessage = ref("");
    const submitError = ref("");
    const tagsInput = ref("");
    watch(tagsInput, (val) => {
      form.tags = val.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 10);
    });
    function addOption() {
      if (form.options.length < 6) form.options.push("");
    }
    function removeOption(index) {
      if (form.options.length <= 2) return;
      form.options.splice(index, 1);
      form.correctAnswers = form.correctAnswers.filter((i) => i !== index).map((i) => i > index ? i - 1 : i);
    }
    function toggleCorrect(index) {
      const i = form.correctAnswers.indexOf(index);
      if (i >= 0) form.correctAnswers.splice(i, 1);
      else form.correctAnswers.push(index);
    }
    function validate() {
      Object.keys(errors).forEach((k) => delete errors[k]);
      if (!form.title.trim()) errors.title = "Title is required.";
      if (!form.question.trim()) errors.question = "Question text is required.";
      const filledOptions = form.options.map((o) => o.trim()).filter(Boolean);
      if (form.options.length < 2 || form.options.length > 6) {
        errors.options = "Provide between 2 and 6 options.";
      }
      if (filledOptions.length !== form.options.length) {
        errors.options = "All options must be filled in.";
      }
      if (form.correctAnswers.length < 1) {
        errors.correctAnswers = "Select at least one correct answer.";
      }
      if (!form.categoryId) errors.categoryId = "Category is required.";
      if (!form.difficulty) errors.difficulty = "Difficulty is required.";
      return Object.keys(errors).length === 0;
    }
    async function onSubmit() {
      successMessage.value = "";
      submitError.value = "";
      if (!validate()) return;
      if (form.website) {
        successMessage.value = "Thanks for your submission!";
        return;
      }
      submitting.value = true;
      try {
        const res = await fetch("/api/submit-question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            question: form.question,
            options: form.options,
            correctAnswers: form.correctAnswers,
            explanation: form.explanation || void 0,
            categoryId: form.categoryId,
            difficulty: form.difficulty,
            tags: form.tags,
            submitterName: form.submitterName || void 0,
            submitterEmail: form.submitterEmail || void 0,
            website: form.website
          })
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Submission failed. Please try again later.");
        }
        successMessage.value = "Thanks! Your question was submitted for review.";
        form.title = "";
        form.question = "";
        form.options = ["", ""];
        form.correctAnswers = [];
        form.explanation = "";
        form.difficulty = "";
        form.tags = [];
        tagsInput.value = "";
      } catch (err) {
        submitError.value = err.message || "Something went wrong.";
      } finally {
        submitting.value = false;
      }
    }
    const __returned__ = { props, form, errors, submitting, successMessage, submitError, tagsInput, addOption, removeOption, toggleCorrect, validate, onSubmit };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto" }, _attrs))}><div class="card"><h2 class="text-2xl font-heading font-bold text-gray-900 mb-6">Submit a Question</h2><p class="text-gray-600 mb-6"> Submit your own quiz question. Submissions are reviewed before appearing in the catalog. </p><form novalidate><input${ssrRenderAttr("value", $setup.form.website)} type="text" class="hidden" autocomplete="off" tabindex="-1" aria-hidden="true"><div class="grid gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">Title</label><input${ssrRenderAttr("value", $setup.form.title)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" required>`);
  if ($setup.errors.title) {
    _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate($setup.errors.title)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-2">Question</label><textarea rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" required>${ssrInterpolate($setup.form.question)}</textarea>`);
  if ($setup.errors.question) {
    _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate($setup.errors.question)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div><div class="flex items-center justify-between mb-2"><label class="block text-sm font-medium text-gray-700">Answer Options</label><div class="flex gap-2"><button type="button" class="text-sm text-primary hover:underline"${ssrIncludeBooleanAttr($setup.form.options.length >= 6) ? " disabled" : ""}>Add option</button><span class="text-xs text-gray-500">${ssrInterpolate($setup.form.options.length)}/6</span></div></div><div class="space-y-3"><!--[-->`);
  ssrRenderList($setup.form.options, (opt, idx) => {
    _push(`<div class="flex items-start gap-3"><input type="checkbox"${ssrRenderAttr("id", "correct-" + idx)} class="mt-2"${ssrIncludeBooleanAttr($setup.form.correctAnswers.includes(idx)) ? " checked" : ""}><div class="flex-1"><div class="flex gap-2"><input${ssrRenderAttr("value", $setup.form.options[idx])}${ssrRenderAttr("placeholder", `Option ${String.fromCharCode(65 + idx)}`)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"><button type="button" class="px-2 py-2 text-sm text-gray-500 hover:text-red-600"${ssrIncludeBooleanAttr($setup.form.options.length <= 2) ? " disabled" : ""}>Remove</button></div><label${ssrRenderAttr("for", "correct-" + idx)} class="text-xs text-gray-600">Check if this option is correct</label></div></div>`);
  });
  _push(`<!--]--></div>`);
  if ($setup.errors.options) {
    _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate($setup.errors.options)}</p>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.errors.correctAnswers) {
    _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate($setup.errors.correctAnswers)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-2">Explanation (optional)</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary">${ssrInterpolate($setup.form.explanation)}</textarea></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Category</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" required><option value=""${ssrIncludeBooleanAttr(Array.isArray($setup.form.categoryId) ? ssrLooseContain($setup.form.categoryId, "") : ssrLooseEqual($setup.form.categoryId, "")) ? " selected" : ""}>Select a category</option><!--[-->`);
  ssrRenderList($setup.props.categories, (cat) => {
    _push(`<option${ssrRenderAttr("value", cat._id)}${ssrIncludeBooleanAttr(Array.isArray($setup.form.categoryId) ? ssrLooseContain($setup.form.categoryId, cat._id) : ssrLooseEqual($setup.form.categoryId, cat._id)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
  });
  _push(`<!--]--></select>`);
  if ($setup.errors.categoryId) {
    _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate($setup.errors.categoryId)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-2">Difficulty</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" required><option value=""${ssrIncludeBooleanAttr(Array.isArray($setup.form.difficulty) ? ssrLooseContain($setup.form.difficulty, "") : ssrLooseEqual($setup.form.difficulty, "")) ? " selected" : ""}>Select difficulty</option><option value="beginner"${ssrIncludeBooleanAttr(Array.isArray($setup.form.difficulty) ? ssrLooseContain($setup.form.difficulty, "beginner") : ssrLooseEqual($setup.form.difficulty, "beginner")) ? " selected" : ""}>Beginner</option><option value="intermediate"${ssrIncludeBooleanAttr(Array.isArray($setup.form.difficulty) ? ssrLooseContain($setup.form.difficulty, "intermediate") : ssrLooseEqual($setup.form.difficulty, "intermediate")) ? " selected" : ""}>Intermediate</option><option value="advanced"${ssrIncludeBooleanAttr(Array.isArray($setup.form.difficulty) ? ssrLooseContain($setup.form.difficulty, "advanced") : ssrLooseEqual($setup.form.difficulty, "advanced")) ? " selected" : ""}>Advanced</option></select>`);
  if ($setup.errors.difficulty) {
    _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate($setup.errors.difficulty)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated, optional)</label><input${ssrRenderAttr("value", $setup.tagsInput)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" placeholder="e.g. components, sling, dispatcher"></div><div class="grid md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Your Name (optional)</label><input${ssrRenderAttr("value", $setup.form.submitterName)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Your Email (optional)</label><input${ssrRenderAttr("value", $setup.form.submitterEmail)} type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"></div></div><div class="flex items-center gap-3"><button type="submit" class="btn-primary disabled:opacity-50"${ssrIncludeBooleanAttr($setup.submitting) ? " disabled" : ""}>`);
  if ($setup.submitting) {
    _push(`<span>Submitting...</span>`);
  } else {
    _push(`<span>Submit Question</span>`);
  }
  _push(`</button>`);
  if ($setup.successMessage) {
    _push(`<span class="text-green-600">${ssrInterpolate($setup.successMessage)}</span>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.submitError) {
    _push(`<span class="text-red-600">${ssrInterpolate($setup.submitError)}</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></form></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/QuestionSubmission.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const QuestionSubmission = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const $$Submit = createComponent(async ($$result, $$props, $$slots) => {
  const categories = await sanityClient.fetch(queries.allCategories);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Submit a Question - AEM Ace" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="py-12"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h1 class="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
Submit a Question
</h1> <p class="text-xl text-gray-600 max-w-2xl mx-auto">
Contribute to the community by submitting your own quiz questions. Our team will review and add approved questions to the catalog.
</p> </div> ${renderComponent($$result2, "QuestionSubmission", QuestionSubmission, { "client:load": true, "categories": categories, "client:component-hydration": "load", "client:component-path": "/Users/2049576/Private Projects/AEM Ace/src/components/QuestionSubmission.vue", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/Users/2049576/Private Projects/AEM Ace/src/pages/submit.astro", void 0);

const $$file = "/Users/2049576/Private Projects/AEM Ace/src/pages/submit.astro";
const $$url = "/submit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Submit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
