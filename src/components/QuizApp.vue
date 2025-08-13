<template>
  <div>
    <!-- Quiz Setup -->
    <div v-if="!isQuizStarted" class="max-w-2xl mx-auto">
      <div class="card text-center">
        <h2 class="text-2xl font-heading font-bold text-gray-900 mb-6">
          Choose Your Quiz Settings
        </h2>
        
        

        <!-- Category Selection -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Select Category
          </label>
          <select
            v-model="selectedCategory"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">All Categories (Mixed Quiz)</option>
            <option 
              v-for="category in props.categories" 
              :key="category._id" 
              :value="category._id"
            >
              {{ category.name }} ({{ category.questionCount || 0 }} questions)
            </option>
          </select>
        </div>

        <!-- Number of Questions -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Number of Questions
          </label>
          <select
            v-model="numberOfQuestions"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="5">5 Questions</option>
            <option value="10">10 Questions</option>
            <option value="15">15 Questions</option>
            <option value="20">20 Questions</option>
          </select>
        </div>

        <!-- Difficulty Filter -->
        <div class="mb-8">
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Difficulty Level
          </label>
          <select
            v-model="selectedDifficulty"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button
          @click="startQuiz"
          :disabled="loading"
          class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Loading...</span>
          <span v-else>Start Quiz</span>
        </button>
      </div>
    </div>

    <!-- Quiz Interface -->
    <div v-else-if="!isQuizComplete" class="max-w-3xl mx-auto">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {{ currentQuestionIndex + 1 }} of {{ quizQuestions.length }}</span>
          <span>{{ Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100) }}% Complete</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-primary h-2 rounded-full transition-all duration-300"
            :style="{ width: ((currentQuestionIndex + 1) / quizQuestions.length) * 100 + '%' }"
          ></div>
        </div>
      </div>

      <!-- Current Question -->
      <div class="card">
                  <div class="mb-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-heading font-semibold text-gray-900">
              {{ currentQuestion.title }}
              <span v-if="currentQuestion.isMultipleChoice" class="ml-2 text-sm text-blue-600 font-normal">
                (Select Multiple)
              </span>
            </h2>
            <div class="flex gap-2">
              <span
                v-if="currentQuestion.isMultipleChoice"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ currentQuestion.correctAnswers.length }} correct
              </span>
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  currentQuestion.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                ]"
              >
                {{ currentQuestion.difficulty }}
              </span>
            </div>
          </div>
          <p class="text-gray-700 text-lg">{{ currentQuestion.question }}</p>
          <p v-if="currentQuestion.isMultipleChoice" class="text-sm text-blue-600 mt-2">
            💡 This question has multiple correct answers. Select all that apply.
          </p>
        </div>

        <!-- Answer Options -->
        <div class="space-y-3 mb-6">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="toggleAnswer(index)"
            :disabled="isAnswered"
                          :class="[
              'quiz-option w-full text-left',
              selectedAnswers.includes(index) ? 'selected' : '',
              isAnswered && currentQuestion.correctAnswers.includes(index) ? 'correct' : '',
              isAnswered && selectedAnswers.includes(index) && !currentQuestion.correctAnswers.includes(index) ? 'incorrect' : ''
            ]"
          >
            <div class="flex items-center">
              <!-- Checkbox/Radio indicator -->
              <div class="mr-3 flex-shrink-0">
                <div v-if="currentQuestion.isMultipleChoice" 
                     :class="[
                       'w-4 h-4 border-2 rounded flex items-center justify-center',
                       selectedAnswers.includes(index) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                     ]">
                  <svg v-if="selectedAnswers.includes(index)" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div v-else
                     :class="[
                       'w-4 h-4 border-2 rounded-full flex items-center justify-center',
                       selectedAnswers.includes(index) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                     ]">
                  <div v-if="selectedAnswers.includes(index)" class="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div class="flex-1">
                <span class="font-medium">{{ String.fromCharCode(65 + index) }}.</span>
                {{ option }}
              </div>
              
              <!-- Result Icons -->
              <span v-if="isAnswered" class="ml-3">
                <span v-if="currentQuestion.correctAnswers.includes(index)" class="text-green-600">✓</span>
                <span v-else-if="selectedAnswers.includes(index)" class="text-red-600">✗</span>
              </span>
            </div>
          </button>
        </div>

        <!-- Explanation -->
        <div 
          v-if="isAnswered && currentQuestion.explanation" 
          class="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6"
        >
          <h4 class="font-medium text-blue-900 mb-2">Explanation:</h4>
          <p class="text-blue-800">{{ currentQuestion.explanation }}</p>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between">
          <button
            v-if="currentQuestionIndex > 0"
            @click="previousQuestion"
            class="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Previous
          </button>
          <div></div>
          <button
            v-if="!isAnswered && selectedAnswers.length > 0"
            @click="submitAnswer"
            class="btn-primary mr-4"
          >
            Submit Answer
          </button>
          <button
            v-if="isAnswered"
            @click="nextQuestion"
            class="btn-primary"
          >
            <span v-if="currentQuestionIndex < quizQuestions.length - 1">
              Next Question →
            </span>
            <span v-else>
              Finish Quiz
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Quiz Results -->
    <div v-else class="max-w-2xl mx-auto">
      <div class="card text-center">
        <div class="mb-6">
          <!-- Score Circle -->
          <div class="relative w-32 h-32 mx-auto mb-6">
            <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                class="text-gray-200"
                stroke="currentColor"
                stroke-width="3"
                fill="transparent"
                d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
              />
              <path
                :class="scorePercentage >= 70 ? 'text-green-500' : scorePercentage >= 50 ? 'text-yellow-500' : 'text-red-500'"
                stroke="currentColor"
                stroke-width="3"
                fill="transparent"
                stroke-linecap="round"
                :stroke-dasharray="`${scorePercentage}, 100`"
                d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-2xl font-bold text-gray-900">{{ Math.round(scorePercentage) }}%</span>
            </div>
          </div>

          <h2 class="text-3xl font-heading font-bold text-gray-900 mb-4">
            Quiz Complete!
          </h2>
          
          <div class="text-lg text-gray-600 mb-6">
            <p>You scored {{ correctAnswers }} out of {{ quizQuestions.length }} questions</p>
            <p :class="scorePercentage >= 70 ? 'text-green-600' : scorePercentage >= 50 ? 'text-yellow-600' : 'text-red-600'">
              {{ getScoreMessage() }}
            </p>
          </div>
        </div>

        <!-- Score Breakdown -->
        <div class="grid md:grid-cols-3 gap-4 mb-8">
          <div class="bg-green-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-green-600">{{ correctAnswers }}</div>
            <div class="text-sm text-green-700">Correct</div>
          </div>
          <div class="bg-red-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-red-600">{{ incorrectAnswers }}</div>
            <div class="text-sm text-red-700">Incorrect</div>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">{{ Math.round(averageTime) }}s</div>
            <div class="text-sm text-blue-700">Avg. Time</div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="resetQuiz" class="btn-primary">
            Take Another Quiz
          </button>
          <a href="/catalog" class="btn-secondary">
            Review Q&A Catalog
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Question, Category } from '../lib/sanity';

// Props from parent component
interface Props {
  questions: Question[];
  categories: Category[];
}

const props = withDefaults(defineProps<Props>(), {
  questions: () => [],
});

// Quiz state
const isQuizStarted = ref(false);
const isQuizComplete = ref(false);
const currentQuestionIndex = ref(0);
const selectedAnswers = ref<number[]>([]);
const userAnswers = ref<number[][]>([]);
const startTime = ref<number>(0);
const questionTimes = ref<number[]>([]);

// Quiz settings
const selectedCategory = ref('');
const selectedDifficulty = ref('');
const numberOfQuestions = ref(10);

// Data
const quizQuestions = ref<Question[]>([]);
const loading = ref(false);
// final exam functionality removed; handled on a separate page

// No sample data needed - using props

// Computed properties
const currentQuestion = computed(() => quizQuestions.value[currentQuestionIndex.value]);
const isAnswered = computed(() => selectedAnswers.value.length > 0 && hasSubmittedAnswer.value);
const hasSubmittedAnswer = ref(false);
const correctAnswers = computed(() => 
  userAnswers.value.filter((userAnswer, index) => {
    const question = quizQuestions.value[index];
    if (!question) return false;
    
    // Check if user selected exactly the correct answers
    const correctSet = new Set(question.correctAnswers);
    const userSet = new Set(userAnswer);
    
    return correctSet.size === userSet.size && [...correctSet].every(x => userSet.has(x));
  }).length
);
const incorrectAnswers = computed(() => quizQuestions.value.length - correctAnswers.value);
const scorePercentage = computed(() => (correctAnswers.value / quizQuestions.value.length) * 100);
const averageTime = computed(() => 
  questionTimes.value.length > 0 
    ? questionTimes.value.reduce((a, b) => a + b, 0) / questionTimes.value.length 
    : 0
);

// Methods
const startQuiz = async () => {
  loading.value = true;
  // Build pool of questions
  let pool: Question[] = [];
  if (props.questions && props.questions.length > 0) {
    pool = [...props.questions];
  } else {
    // Fetch from API when not provided
    try {
      const params = new URLSearchParams();
      params.set('limit', '50');
      if (selectedCategory.value) params.set('categoryId', selectedCategory.value);
      const res = await fetch(`/api/questions?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        pool = Array.isArray(data?.items) ? data.items : [];
      }
    } catch {
      // ignore and fall through with empty pool
    }
  }

  // Apply filters
  if (selectedCategory.value) {
    pool = pool.filter(q => q.category._id === selectedCategory.value);
  }
  if (selectedDifficulty.value) {
    pool = pool.filter(q => q.difficulty === selectedDifficulty.value);
  }

  // Shuffle and take requested number of questions
  const shuffled = pool.sort(() => Math.random() - 0.5);
  quizQuestions.value = shuffled.slice(0, Math.min(Number(numberOfQuestions.value), shuffled.length));
  
  if (quizQuestions.value.length === 0) {
    alert('No questions available for the selected criteria. Please try different settings.');
    loading.value = false;
    return;
  }
  
  // Reset quiz state
  currentQuestionIndex.value = 0;
  selectedAnswers.value = [];
  userAnswers.value = [];
  questionTimes.value = [];
  hasSubmittedAnswer.value = false;
  isQuizStarted.value = true;
  startTime.value = Date.now();
  
  loading.value = false;
};

// startFinalExam removed

const toggleAnswer = (answerIndex: number) => {
  if (isAnswered.value) return;
  
  if (currentQuestion.value.isMultipleChoice) {
    // Multiple choice: toggle selection
    const index = selectedAnswers.value.indexOf(answerIndex);
    if (index > -1) {
      selectedAnswers.value.splice(index, 1);
    } else {
      selectedAnswers.value.push(answerIndex);
    }
  } else {
    // Single choice: replace selection
    selectedAnswers.value = [answerIndex];
  }
};

const submitAnswer = () => {
  if (selectedAnswers.value.length === 0) return;
  
  hasSubmittedAnswer.value = true;
  userAnswers.value[currentQuestionIndex.value] = [...selectedAnswers.value];
  
  // Record time taken for this question
  const timeSpent = (Date.now() - startTime.value) / 1000;
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
    hasSubmittedAnswer.value = userAnswers.value[currentQuestionIndex.value] !== undefined;
  }
};

const getScoreMessage = () => {
  if (scorePercentage.value >= 80) return 'Excellent! You\'re ready for the exam!';
  if (scorePercentage.value >= 70) return 'Good job! A bit more study and you\'ll be ready.';
  if (scorePercentage.value >= 50) return 'Not bad, but you need more practice.';
  return 'Keep studying! You\'ll get there.';
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

// Categories are now available via props
</script>