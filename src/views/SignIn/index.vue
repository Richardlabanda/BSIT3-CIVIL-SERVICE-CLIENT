<template>
  <div class="app">
    <Header />
    <div class="page-container">
      <h1>Sign In</h1>
      
      <form class="auth-form" @submit.prevent="handleSubmit" v-if="!isLoggedIn">
        <input 
          type="email" 
          placeholder="Email" 
          v-model="email" 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          v-model="password" 
          required 
        />
        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging In...' : 'Login' }}
        </button>
      </form>

      <div v-if="isLoggedIn" class="logged-in-container">
        <p class="signed-in-message">Welcome, {{ user?.name || 'User' }}!</p>

        <div class="user-results-box">
          <h3>Your Test Results</h3>
          <p><strong>Total Tests Taken:</strong> {{ userTestResults.length }}</p>
          <p><strong>Tests Passed:</strong> {{ passedCount }}</p>

          <table v-if="userTestResults.length">
            <thead>
              <tr>
                <th>Category</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in userTestResults" :key="result.id">
                <td>{{ result.category }}</td>
                <td>{{ result.score }}</td>
                <td>{{ calculatePercentage(result) }}%</td>
                <td>{{ new Date(result.taken_at).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button @click="logout" class="logout-button">Logout</button>
      </div>

      <p class="extra-text" v-if="!isLoggedIn">
        Don't have an account? 
        <router-link to="/sign-up">Sign Up</router-link>
      </p>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "SignIn",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      isLoggedIn: false,
      user: null as any,
      userTestResults: [] as any[],
      questions: [] as any[],
    };
  },
  computed: {
    passedCount(): number {
      return this.userTestResults.filter((result) => {
        const percent = parseFloat(this.calculatePercentage(result));
        return percent >= 80;
      }).length;
    },
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("auth_token", data.token || "dummy_token");
          localStorage.setItem("user", JSON.stringify(data.user));
          this.user = data.user;
          this.isLoggedIn = true;

          await this.fetchQuestions();
          await this.fetchUserResults(this.user.id);

          alert("Login successful!");
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Failed to log in.");
        }
      } catch (error) {
        alert("An error occurred: " + error.message);
      } finally {
        this.loading = false;
      }
    },

    async fetchUserResults(userId: number) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user_scores/${userId}`);
        const data = await response.json();
        this.userTestResults = data;
      } catch (error) {
        console.error("Failed to fetch user results:", error);
      }
    },

    async fetchQuestions() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/questions");
        const data = await response.json();
        this.questions = data;
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    },

    calculatePercentage(result: any) {
      const categoryQuestions = this.questions.filter(
        (q: any) => q.category === result.category
      );
      const total = categoryQuestions.length;
      return total ? ((result.score / total) * 100).toFixed(2) : '0.00';
    },

    logout() {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      this.isLoggedIn = false;
      this.email = "";
      this.password = "";
      this.user = null;
      this.userTestResults = [];
      alert("You have been logged out.");
    },
  },
  mounted() {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      this.isLoggedIn = true;
      this.user = JSON.parse(userData);
      this.fetchQuestions();
      this.fetchUserResults(this.user.id);
    }
  },
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212; /* Black background */
  color: #f1f1f1; /* Soft light text */
}

.page-container {
  flex-grow: 1;
  padding: 30px;
  background: #1b1b1b; /* Darker gray background for form */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  max-width: 600px;
  margin: auto;
}

h1 {
  margin-bottom: 20px;
  text-align: center;
  color: #dfdaf1; /* Muted lavender */
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.auth-form input {
  padding: 12px;
  border: 1px solid #444; /* Subtle dark border */
  background-color: #2a2a2a; /* Dark background for inputs */
  color: #e1e1e1; /* Light gray text */
  border-radius: 8px;
  font-size: 16px;
}

.auth-form input:focus {
  outline: none;
  border-color: #e8e7ea; /* Lavender border on focus */
}

.auth-form button {
  padding: 12px;
  background-color: #4c9141; /* Darker green */
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.auth-form button:disabled {
  background-color: #3f7a33; /* Even darker green when disabled */
  cursor: not-allowed;
}

.auth-form button:hover:not(:disabled) {
  background-color: #3a7a2d; /* Darker green on hover */
}

.extra-text {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  color: #fbfbfb;
}

.signed-in-message {
  margin-top: 20px;
  font-size: 18px;
  color: #f1f1f1;
  text-align: center;
}

.logout-button {
  margin-top: 20px;
  background-color: #2c6b3f; /* Darker green for logout */
  color: white;
  border: none;
  padding: 10px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  width: 100%;
}

.logout-button:hover {
  background-color: #255e33; /* Darker green on hover */
}

.user-results-box {
  margin-top: 20px;
  padding: 15px;
  background-color: #1e1e1e;
  border-radius: 8px;
  color: #f1f1f1;
}

.user-results-box h3 {
  margin-bottom: 10px;
  color: #f54600; /* Soft orange */
}

.user-results-box table {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
}

.user-results-box th,
.user-results-box td {
  padding: 8px;
  border: 1px solid #444;
  text-align: left;
}
</style>
