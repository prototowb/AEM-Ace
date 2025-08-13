<template>
  <div>
    <!-- Exam Setup -->
    <div v-if="!isStarted" class="max-w-2xl mx-auto">
      <div class="card text-center">

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Number of Questions</label>
          <select v-model="size" class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary">
            <option value="10">10 Questions</option>
            <option value="20">20 Questions</option>
            <option value="30">30 Questions</option>
            <option value="50">50 Questions</option>
          </select>
        </div>

        <button @click="start" :disabled="loading" class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="loading">Preparing...</span>
          <span v-else>Start Final Exam</span>
        </button>
      </div>
    </div>

    <!-- Exam Interface -->
    <div v-else-if="!isComplete" class="max-w-3xl mx-auto">
      <div class="mb-8">
        <div class="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {{ index + 1 }} of {{ questions.length }}</span>
          <div class="flex items-center gap-4">
            <span>{{ Math.round(((index + 1) / questions.length) * 100) }}% Complete</span>
            <span :class="remainingSeconds <= 300 ? 'text-red-600 font-semibold' : 'text-gray-800'">⏱️ {{ formattedTimeLeft }}</span>
          </div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-primary h-2 rounded-full transition-all duration-300" :style="{ width: ((index + 1) / questions.length) * 100 + '%' }"></div>
        </div>
      </div>

      <div class="card">
        <div class="mb-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-heading font-semibold text-gray-900">
              {{ current.title }}
              <span v-if="current.isMultipleChoice" class="ml-2 text-sm text-blue-600 font-normal">(Select Multiple)</span>
            </h2>
            <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', current.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : current.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800']">{{ current.difficulty }}</span>
          </div>
          <p class="text-gray-700 text-lg">{{ current.question }}</p>
        </div>

        <div class="space-y-3 mb-6">
          <button
            v-for="(option, i) in current.options"
            :key="i"
            @click="toggle(i)"
            :disabled="answered"
            :class="['quiz-option w-full text-left', selected.includes(i) ? 'selected' : '', answered && current.correctAnswers.includes(i) ? 'correct' : '', answered && selected.includes(i) && !current.correctAnswers.includes(i) ? 'incorrect' : '']"
          >
            <div class="flex items-center">
              <div class="mr-3 flex-shrink-0">
                <div v-if="current.isMultipleChoice" :class="['w-4 h-4 border-2 rounded flex items-center justify-center', selected.includes(i) ? 'bg-blue-500 border-blue-500' : 'border-gray-300']">
                  <svg v-if="selected.includes(i)" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                </div>
                <div v-else :class="['w-4 h-4 border-2 rounded-full flex items-center justify-center', selected.includes(i) ? 'bg-blue-500 border-blue-500' : 'border-gray-300']">
                  <div v-if="selected.includes(i)" class="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div class="flex-1"><span class="font-medium">{{ String.fromCharCode(65 + i) }}.</span> {{ option }}</div>
              <span v-if="answered" class="ml-3">
                <span v-if="current.correctAnswers.includes(i)" class="text-green-600">✓</span>
                <span v-else-if="selected.includes(i)" class="text-red-600">✗</span>
              </span>
            </div>
          </button>
        </div>

        <div class="flex justify-between">
          <button v-if="index > 0" @click="prev" class="px-4 py-2 text-gray-600 hover:text-gray-900">← Previous</button>
          <div></div>
          <button v-if="!answered && selected.length > 0" @click="submit" class="btn-primary mr-4">Submit Answer</button>
          <button v-if="answered" @click="next" class="btn-primary">
            <span v-if="index < questions.length - 1">Next Question →</span>
            <span v-else>Finish Exam</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Complete -->
    <div v-else class="max-w-2xl mx-auto">
      <div class="card text-center">
        <h2 class="text-3xl font-heading font-bold text-gray-900 mb-2">Exam Complete</h2>
        <p class="text-gray-700 mb-6">Score: <span class="font-semibold">{{ correct }}/{{ questions.length }}</span></p>
        <div class="flex gap-4 justify-center">
          <button @click="restart" class="btn-secondary">Retake</button>
          <a href="/catalog" class="btn-primary">Review Catalog</a>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Question } from '../lib/sanity';

const isStarted = ref(false);
const isComplete = ref(false);
const loading = ref(false);
const size = ref(20);
const questions = ref<Question[]>([]);
const index = ref(0);
const selected = ref<number[]>([]);
const answered = ref(false);
const userAnswers = ref<number[][]>([]);
const remainingSeconds = ref<number>(0);
let countdownTimer: number | undefined;

const current = computed(() => questions.value[index.value]);
const correct = computed(() => userAnswers.value.filter((ans, i) => {
  const q = questions.value[i];
  if (!q) return false;
  const c = new Set(q.correctAnswers);
  const u = new Set(ans);
  return c.size === u.size && [...c].every(x => u.has(x));
}).length);

const formattedTimeLeft = computed(() => {
  const total = remainingSeconds.value;
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  const mm = String(mins).padStart(2, '0');
  const ss = String(secs).padStart(2, '0');
  return hrs > 0 ? `${hrs}:${mm}:${ss}` : `${mins}:${ss}`;
});

async function start() {
  loading.value = true;
  try {
    let res = await fetch('/api/generate-final-exam');
    if (res.status === 404) {
      await fetch('/api/generate-final-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ size: Number(size.value), minVotes: 0, minRatio: 0, balanced: true })
      });
      res = await fetch('/api/generate-final-exam');
    }
    if (!res.ok) {
      // Redirect to 404 page if no paper exists yet
      window.location.href = '/404';
      return;
    }
    const paper = await res.json();
    const items = Array.isArray(paper?.questions) ? paper.questions : [];
    if (items.length === 0) {
      window.location.href = '/404';
      return;
    }
    questions.value = items.slice(0, Number(size.value));
    index.value = 0;
    selected.value = [];
    userAnswers.value = [];
    answered.value = false;
    isStarted.value = true;
    // Time limit proportional to number of questions: 100 minutes for 50 questions → 2 minutes per question
    remainingSeconds.value = (questions.value.length || Number(size.value)) * 120;
    if (countdownTimer) window.clearInterval(countdownTimer);
    countdownTimer = window.setInterval(() => {
      if (remainingSeconds.value > 0) {
        remainingSeconds.value -= 1;
      } else {
        if (countdownTimer) window.clearInterval(countdownTimer);
        isComplete.value = true;
      }
    }, 1000) as unknown as number;
  } catch {
    window.location.href = '/404';
  } finally {
    loading.value = false;
  }
}

function toggle(i: number) {
  if (answered.value) return;
  if (current.value.isMultipleChoice) {
    const k = selected.value.indexOf(i);
    if (k > -1) selected.value.splice(k, 1); else selected.value.push(i);
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
    answered.value = userAnswers.value[index.value] !== undefined;
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
</script>

