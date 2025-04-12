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
        <p class="signed-in-message">You are signed in!</p>
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
    };
  },
  mounted() {
    // Check if user is already logged in by checking localStorage
    const token = localStorage.getItem("auth_token");
    if (token) {
      this.isLoggedIn = true;
    }
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
          this.isLoggedIn = true;
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

    logout() {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user"); 
      this.isLoggedIn = false;
      this.email = "";
      this.password = "";
      alert("You have been logged out.");
    },
  },
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-container {
  flex-grow: 1;
  padding: 20px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 400px;
  margin: auto;
}

h1 {
  margin-bottom: 20px;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.auth-form input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.auth-form button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.auth-form button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.auth-form button:hover:not(:disabled) {
  background-color: #0056b3;
}

.extra-text {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  color: #555;
}

.signed-in-message {
  margin-top: 20px;
  font-size: 18px;
  color: green;
  text-align: center;
}

.logout-button {
  margin-top: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>
