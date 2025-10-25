import { ref } from 'vue'

const score = ref(0)

export function useScore() {
    const changeScore = (value) => {
        score.value += value
    }
    return { score, changeScore }
}
 
