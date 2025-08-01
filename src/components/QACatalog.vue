<template>
  <div>
    <!-- Category Filter -->
    <div class="mb-8">
      <div class="flex flex-wrap gap-4 justify-center">
        <button
          v-for="category in props.categories"
          :key="category._id"
          @click="selectedCategory = category._id"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
            selectedCategory === category._id
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          ]"
        >
          {{ category.name }}
          <span class="ml-2 text-sm opacity-75">({{ category.questionCount }})</span>
        </button>
        <button
          @click="selectedCategory = null"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
            selectedCategory === null
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          ]"
        >
          All Questions
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="mb-8">
      <div class="max-w-md mx-auto">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search questions..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
    </div>

    <!-- Questions Grid -->
    <div class="grid gap-6">
      <div
        v-for="question in filteredQuestions"
        :key="question._id"
        class="card"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-lg font-heading font-semibold text-gray-900 mb-2">
              {{ question.title }}
            </h3>
            <span
              v-if="question.category"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :style="{ backgroundColor: question.category.color + '20', color: question.category.color }"
            >
              {{ question.category.name }}
            </span>
          </div>
          <span
            :class="[
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              question.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              question.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            ]"
          >
            {{ question.difficulty }}
          </span>
        </div>

        <div class="mb-4">
          <p class="text-gray-700 mb-4">{{ question.question }}</p>
          
          <div class="space-y-2">
            <div
              v-for="(option, index) in question.options"
              :key="index"
              :class="[
                'p-3 rounded-lg border-2',
                index === question.correctAnswer
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : 'border-gray-200 bg-gray-50'
              ]"
            >
              <span class="font-medium">{{ String.fromCharCode(65 + index) }}.</span>
              {{ option }}
              <span v-if="index === question.correctAnswer" class="ml-2 text-green-600">✓</span>
            </div>
          </div>
        </div>

        <div v-if="question.explanation" class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 class="font-medium text-blue-900 mb-2">Explanation:</h4>
          <p class="text-blue-800">{{ question.explanation }}</p>
        </div>

        <div v-if="question.tags && question.tags.length > 0" class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="tag in question.tags"
            :key="tag"
            class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredQuestions.length === 0" class="text-center py-12">
        <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No Questions Found</h3>
        <p class="text-gray-600">Try adjusting your search or filter criteria.</p>
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

const props = defineProps<Props>();

const selectedCategory = ref<string | null>(null);
const searchQuery = ref('');

const filteredQuestions = computed(() => {
  let filtered = props.questions;
  
  if (selectedCategory.value) {
    filtered = filtered.filter(q => q.category._id === selectedCategory.value);
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(q => 
      q.title.toLowerCase().includes(query) ||
      q.question.toLowerCase().includes(query) ||
      q.options.some(option => option.toLowerCase().includes(query))
    );
  }
  
  return filtered;
});

// No need for loadQuestions anymore since data comes from props
</script>