<script setup>
import { onMounted, ref } from 'vue';
import useAPI from '@/composables/useAPI';
import { useRoute } from 'vue-router';
import BaseTitle from '@/components/BaseTitle.vue';
import DifficultyChip from '@/components/DifficultyChip.vue';
import MainScore from '@/components/MainScore.vue';
import router from '@/router';
import { useScore } from '@/composables/useScore';

const { changeScore } = useScore();

const api = useAPI();
const question = ref(null);
const route = useRoute();
const answers = ref([]);
const notification = ref('');

onMounted(async () => {
  question.value = await api.getQuestion(route.params.id);

  // points for correct answer based on difficulty
  const correctPoints =
    question.value.difficulty === 'easy'
      ? 10
      : question.value.difficulty === 'medium'
      ? 20
      : 30;

  // correct answer
  answers.value.push({
    id: answers.value.length,
    correct: true,
    answer: question.value.correct_answer,
    points: correctPoints,
  });

  // incorrect answers
  question.value.incorrect_answers.map((wrong_answer) => {
    answers.value.push({
      id: answers.value.length,
      correct: false,
      answer: wrong_answer,
      points: -5,
    });
  });

  answers.value = shuffle(answers.value);
});

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// handle answer choices and award points
const handleAnswer = (points) => {
  changeScore(points);

  notification.value = points > 0 ? 'CORRECT' : 'NAI!!!!!!!';

  setTimeout(() => {
    // keep /trivia-app/ if that’s your base; otherwise use '/'
    router.push('/trivia-app/');
  }, 1000);
};
</script>

<template>
  <div v-if="question" class="flex h-full w-full flex-col items-center gap-8 p-10">
    <BaseTitle>
      <MainScore />
      <span
        class="font-bold ml-3"
        :class="notification == 'CORRECT' ? 'text-green-500' : 'text-red-500'"
      >
        {{ notification }}
      </span>
    </BaseTitle>

    <div v-html="question.question" class="text-center text-2xl font-bold"></div>

    <div class="grid w-full flex-grow grid-cols-2 gap-8">
      <button
        v-for="answer in answers"
        :key="answer.id"
        type="button"
        class="bg-red-600 flex items-center justify-center text-4xl rounded-lg text-white py-10 px-2
               hover:bg-red-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
        @click.stop="handleAnswer(answer.points)"
      >
        <span v-html="answer.answer"></span>
      </button>
    </div>

    <DifficultyChip :difficulty="question.difficulty" />
  </div>

  <div v-else>
    Loading .. .
  </div>
</template>
