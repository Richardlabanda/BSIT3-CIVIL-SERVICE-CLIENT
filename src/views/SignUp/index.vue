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
      loading: false,  // Loading state to disable button during registration
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;  // Show loading indicator
      try {
        // Send user info to Laravel backend for registration
        const response = await fetch("http://127.0.0.1:8000/api/register", { // Updated route
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation, // Include password confirmation
          }),
        });

        if (response.ok) {
          alert("Registration successful!");
          // Redirect to Sign In page after successful registration
          this.$router.push("/Sign-In");  // Redirect to Sign In page
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Failed to register user.");
        }
      } catch (error: any) {
        alert("An error occurred: " + error.message);  // Handle errors
        console.error("Registration failed:", error);
      } finally {
        this.loading = false;  // Hide loading indicator
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
</style>
