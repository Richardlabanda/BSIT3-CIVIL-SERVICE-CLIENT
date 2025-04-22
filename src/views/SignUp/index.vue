<template>
  <div class="app">
    <Header />
    <div class="page-container">
      <h1>Sign Up</h1>
      <form class="auth-form" @submit.prevent="handleSubmit">
        <input type="text" placeholder="Full Name" v-model="name" required />
        <input type="email" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <input type="password" placeholder="Confirm Password" v-model="password_confirmation" required />
        <button type="submit" :disabled="loading">{{ loading ? 'Registering...' : 'Register' }}</button>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "SignUp",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        const response = await fetch("http://127.0.0.1:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
          }),
        });

        if (response.ok) {
          alert("Registration successful!");
          this.$router.push("/Sign-In");
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Failed to register user.");
        }
      } catch (error: any) {
        alert("An error occurred: " + error.message);
        console.error("Registration failed:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212; /* Black background */
  color: #e1e1e1; /* Soft light gray for text */
}

.page-container {
  flex-grow: 1;
  padding: 30px;
  background: #1e1e1e; /* Dark gray background for the form */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  max-width: 450px;
  margin: auto;
  border: 1px solid #333;
}

h1 {
  margin-bottom: 30px;
  text-align: center;
  color: #B9AEDC; /* Muted lavender for the header */
  font-size: 2rem;
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
  border-color: #A8D5BA; /* Lavender border on focus */
}

.auth-form button {
  padding: 12px;
  background-color: #4caf50; /* Calm green color */
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.auth-form button:disabled {
  background-color: #8bc34a; /* Lighter green when disabled */
  cursor: not-allowed;
}

.auth-form button:hover:not(:disabled) {
  background-color: #388e3c; /* Darker green on hover */
}
</style>
