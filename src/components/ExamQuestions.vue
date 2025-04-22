<template>
  <div>
    <!-- Start screen -->
    <div v-if="!examStarted && !examFinished" class="start-exam-content">
      <h1>Philippine Civil Service Mock Exam</h1>
      <p>Select a category and click below to start the exam.</p>

      <CategorySelector :categories="categoryNames" @category-selected="loadQuestions" />

      <button class="start-btn" @click="startExam" :disabled="!selectedCategory">
        Start Exam
      </button>

      <p v-if="!isLoggedIn" class="auth-warning">
        You must be signed in to start the exam.
      </p>
    </div>

    <!-- During Exam -->
    <div v-if="examStarted && !examFinished" class="exam-questions-container">
      <Timer :time="timeLimit" @timer-ended="finishExam" />

      <div v-for="(question, index) in questions" :key="question.id" class="question">
        <p><strong>{{ question.text }}</strong></p>
        <div class="options">
          <label v-for="(option, optionIndex) in [question.option_a, question.option_b, question.option_c, question.option_d]" :key="optionIndex">
            <input 
              type="radio" 
              :name="'question-' + question.id" 
              :value="option" 
              v-model="userAnswers[index]" 
              :disabled="examFinished" 
              required 
            />
            {{ option }}
          </label>
        </div>
      </div>

      <!-- Submit Exam Button -->
      <button class="submit-btn" @click="submitExam" :disabled="examFinished">Submit Exam</button>
    </div>

    <!-- Results -->
    <div v-if="examFinished" class="results-container">
      <h2>Exam Finished</h2>
      <p>Your score: {{ score }} / {{ questions.length }}</p>
      
      <div v-for="(question, index) in questions" :key="question.id" class="question-result">
        <p><strong>{{ question.text }}</strong></p>
        <p>Your Answer: {{ userAnswers[index] || 'Not answered' }}</p>
        
        <!-- Display Correct Answer only -->
        <p>Correct Answer: {{ getCorrectAnswer(question) }}</p>
        
        <p v-if="isAnswerCorrect(question, userAnswers[index])" style="color: green;">Correct!</p>
        <p v-else style="color: red;">Incorrect.</p>
      </div>

      <div v-if="userScores.length" class="user-score-history">
        <h3>Your Past Scores</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Score</th>
              <th>Taken At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="score in userScores" :key="score.id">
              <td>{{ score.category }}</td>
              <td>{{ score.score }}</td>
              <td>{{ new Date(score.taken_at).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button class="start-btn" @click="restartExam">Choose Another Category</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CategorySelector from "@/components/CategorySelector.vue";
import Timer from "@/components/Timer.vue";

export default defineComponent({
  components: {
    CategorySelector,
    Timer,
  },
  data() {
    return {
      categoryNames: [
        "select category",
        "Verbal Ability",
        "Analytical Ability",
        "Mathematical Ability",
        "General Knowledge",
        "Ethics and Values",
        "Filipino Language and Culture",
        "Current Events",
        "Technology and Innovation",
        "Public Service",
        "Basic Computer Literacy",
      ],
      selectedCategory: "",
      questions: [],
      userAnswers: [],
      examStarted: false,
      examFinished: false,
      timeLimit: 300,
      score: 0,
      userScores: [],
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("user");
    },
  },
  methods: {
    async loadQuestions(category) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/questions?category=${category}`);
        const data = await response.json();
        this.questions = data;
        this.userAnswers = Array(data.length).fill(''); 
        this.selectedCategory = category;
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    },

    startExam() {
      const user = localStorage.getItem("user");
      if (!user) {
        alert("Please sign in or register before starting the exam.");
        this.$router.push("/sign-in");
        return;
      }
      this.examStarted = true;
      this.examFinished = false;
    },

    
async submitExam() {
  this.examFinished = true;

  this.score = this.userAnswers.reduce((score, answer, index) => {
    const correctAnswer = this.getCorrectAnswer(this.questions[index]);
    if (this.isAnswerCorrect(this.questions[index], answer)) {
      score++;
    }
    return score;
  }, 0);

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("You must be logged in to record your score.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/user_scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        category: this.selectedCategory,
        score: this.score,
      }),
    });

    if (!response.ok) throw new Error("Failed to save score.");

    const result = await response.json();
    console.log(result.message);

    this.fetchUserScores();
  } catch (error) {
    console.error("Error saving score:", error);
  }
},


    getCorrectAnswer(question) {
      return question[`option_${question.correct_answer}`]; 
    },

    isAnswerCorrect(question, userAnswer) {
      const correctAnswer = question.correct_answer;
      const selectedAnswerLetter = this.getSelectedAnswer(question, userAnswer);
      return selectedAnswerLetter === correctAnswer;
    },

    getSelectedAnswer(question, userAnswer) {
      const options = [question.option_a, question.option_b, question.option_c, question.option_d];
      const index = options.indexOf(userAnswer);
      return ['a', 'b', 'c', 'd'][index];
    },

    async fetchUserScores() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      try {
        const res = await fetch(`http://127.0.0.1:8000/api/user_scores/${user.id}`);
        const data = await res.json();
        this.userScores = data;
      } catch (err) {
        console.error("Failed to fetch user scores:", err);
      }
    },

    // Finish the exam and save the score
    finishExam() {
      this.examFinished = true;
      this.submitExam();
    },

    // Restart the exam
    restartExam() {
      this.examStarted = false;
      this.examFinished = false;
      this.selectedCategory = "";
      this.questions = [];
      this.userAnswers = [];
      this.score = 0;
    },
  },
});
</script>

<style scoped>
.start-exam-content {
  text-align: center;
  max-width: 500px;
  padding: 20px;
  background-color: #96a1e1;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(175, 218, 132, 0.1);
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.start-btn,
.submit-btn {
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #8bc34a;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-top: 40px;
}

.start-btn:hover,
.submit-btn:hover {
  background-color: #4b7618;
}

.auth-warning {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.exam-questions-container {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: #69b931;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(231, 111, 111, 0.1);
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

.results-container {
  padding: 20px;
  background-color: #f48080;
  border-radius: 8px;
  margin-top: 20px;
}

.user-score-history {
  margin-top: 40px;
}

.user-score-history table {
  width: 100%;
  border-collapse: collapse;
}

.user-score-history th,
.user-score-history td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #d7bfbf;
}
</style>
