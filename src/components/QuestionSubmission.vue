<template>
  <div class="max-w-2xl mx-auto">
    <div class="card">
      <h2 class="text-2xl font-heading font-bold text-gray-900 mb-6">Submit a Question</h2>

      <p class="text-gray-600 mb-6">
        Submit your own quiz question. Submissions are reviewed before appearing in the catalog.
      </p>

      <form @submit.prevent="onSubmit" novalidate>
        <!-- Honeypot field -->
        <input v-model="form.website" type="text" class="hidden" autocomplete="off" tabindex="-1" aria-hidden="true" />

        <div class="grid gap-6">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input v-model.trim="form.title" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" required />
            <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
          </div>

          <!-- Question Text -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Question</label>
            <textarea v-model.trim="form.question" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" required></textarea>
            <p v-if="errors.question" class="mt-1 text-sm text-red-600">{{ errors.question }}</p>
          </div>

          <!-- Options -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-gray-700">Answer Options</label>
              <div class="flex gap-2">
                <button type="button" @click="addOption" class="text-sm text-primary hover:underline" :disabled="form.options.length >= 6">Add option</button>
                <span class="text-xs text-gray-500">{{ form.options.length }}/6</span>
              </div>
            </div>
            <div class="space-y-3">
              <div v-for="(opt, idx) in form.options" :key="idx" class="flex items-start gap-3">
                <input type="checkbox" :id="'correct-'+idx" class="mt-2" :checked="form.correctAnswers.includes(idx)" @change="toggleCorrect(idx)" />
                <div class="flex-1">
                  <div class="flex gap-2">
                    <input v-model.trim="form.options[idx]" :placeholder="`Option ${String.fromCharCode(65 + idx)}`" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" />
                    <button type="button" @click="removeOption(idx)" class="px-2 py-2 text-sm text-gray-500 hover:text-red-600" :disabled="form.options.length <= 2">Remove</button>
                  </div>
                  <label :for="'correct-'+idx" class="text-xs text-gray-600">Check if this option is correct</label>
                </div>
              </div>
            </div>
            <p v-if="errors.options" class="mt-1 text-sm text-red-600">{{ errors.options }}</p>
            <p v-if="errors.correctAnswers" class="mt-1 text-sm text-red-600">{{ errors.correctAnswers }}</p>
          </div>

          <!-- Explanation -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Explanation (optional)</label>
            <textarea v-model.trim="form.explanation" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"></textarea>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select v-model="form.categoryId" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" required>
              <option value="">Select a category</option>
              <option v-for="cat in props.categories" :key="cat._id" :value="cat._id">{{ cat.name }}</option>
            </select>
            <p v-if="errors.categoryId" class="mt-1 text-sm text-red-600">{{ errors.categoryId }}</p>
          </div>

          <!-- Difficulty -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select v-model="form.difficulty" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" required>
              <option value="">Select difficulty</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <p v-if="errors.difficulty" class="mt-1 text-sm text-red-600">{{ errors.difficulty }}</p>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated, optional)</label>
            <input v-model.trim="tagsInput" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" placeholder="e.g. components, sling, dispatcher" />
          </div>

          <!-- Submitter Info -->
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Your Name (optional)</label>
              <input v-model.trim="form.submitterName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Your Email (optional)</label>
              <input v-model.trim="form.submitterEmail" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <button type="submit" class="btn-primary disabled:opacity-50" :disabled="submitting">
              <span v-if="submitting">Submitting...</span>
              <span v-else>Submit Question</span>
            </button>
            <span v-if="successMessage" class="text-green-600">{{ successMessage }}</span>
            <span v-if="submitError" class="text-red-600">{{ submitError }}</span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { Category } from '../lib/sanity';

interface Props {
  categories: Category[];
}

const props = defineProps<Props>();

type Difficulty = 'beginner' | 'intermediate' | 'advanced' | '';

const form = reactive({
  title: '',
  question: '',
  options: ['',''],
  correctAnswers: [] as number[],
  explanation: '',
  categoryId: '',
  difficulty: '' as Difficulty,
  tags: [] as string[],
  submitterName: '',
  submitterEmail: '',
  website: '' // honeypot
});

const errors = reactive<Record<string, string>>({});
const submitting = ref(false);
const successMessage = ref('');
const submitError = ref('');
const tagsInput = ref('');

watch(tagsInput, (val) => {
  form.tags = val
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)
    .slice(0, 10);
});

function addOption() {
  if (form.options.length < 6) form.options.push('');
}

function removeOption(index: number) {
  if (form.options.length <= 2) return;
  form.options.splice(index, 1);
  // Recalculate correct answers after removal
  form.correctAnswers = form.correctAnswers
    .filter(i => i !== index)
    .map(i => (i > index ? i - 1 : i));
}

function toggleCorrect(index: number) {
  const i = form.correctAnswers.indexOf(index);
  if (i >= 0) form.correctAnswers.splice(i, 1);
  else form.correctAnswers.push(index);
}

function validate() {
  Object.keys(errors).forEach(k => delete errors[k]);
  if (!form.title.trim()) errors.title = 'Title is required.';
  if (!form.question.trim()) errors.question = 'Question text is required.';
  const filledOptions = form.options.map(o => o.trim()).filter(Boolean);
  if (form.options.length < 2 || form.options.length > 6) {
    errors.options = 'Provide between 2 and 6 options.';
  }
  if (filledOptions.length !== form.options.length) {
    errors.options = 'All options must be filled in.';
  }
  if (form.correctAnswers.length < 1) {
    errors.correctAnswers = 'Select at least one correct answer.';
  }
  if (!form.categoryId) errors.categoryId = 'Category is required.';
  if (!form.difficulty) errors.difficulty = 'Difficulty is required.';
  return Object.keys(errors).length === 0;
}

async function onSubmit() {
  successMessage.value = '';
  submitError.value = '';
  if (!validate()) return;
  if (form.website) {
    // Honeypot filled -> silently succeed
    successMessage.value = 'Thanks for your submission!';
    return;
  }
  submitting.value = true;
  try {
    const res = await fetch('/api/submit-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        question: form.question,
        options: form.options,
        correctAnswers: form.correctAnswers,
        explanation: form.explanation || undefined,
        categoryId: form.categoryId,
        difficulty: form.difficulty,
        tags: form.tags,
        submitterName: form.submitterName || undefined,
        submitterEmail: form.submitterEmail || undefined,
        website: form.website
      })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || 'Submission failed. Please try again later.');
    }
    successMessage.value = 'Thanks! Your question was submitted for review.';
    // Reset most fields
    form.title = '';
    form.question = '';
    form.options = ['',''];
    form.correctAnswers = [];
    form.explanation = '';
    form.difficulty = '' as Difficulty;
    form.tags = [];
    tagsInput.value = '';
  } catch (err: any) {
    submitError.value = err.message || 'Something went wrong.';
  } finally {
    submitting.value = false;
  }
}
</script>

