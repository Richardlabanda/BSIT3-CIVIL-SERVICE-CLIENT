<template>
  <div class="app">
    <Header />
    <div class="page-container">
      <h1>About Us</h1>
      <p>We are a group of passionate students from the Microsystems International Institute of Technology (MIIT) working on our thesis project. Our project focuses on creating a Civil Service Mock Exam platform to help candidates prepare effectively for their exams.</p>

      <p>Through this platform, we aim to offer a user-friendly and accessible way for individuals to practice and gain confidence before taking the actual civil service exams. Our team combines expertise in technology and education to provide a tool that enhances exam preparation.</p>

      <div class="mission-section">
        <h2>Our Mission</h2>
        <p>Our mission is to create a comprehensive and engaging platform that offers civil service exam simulations to improve the preparation process. By simulating real exam scenarios, we aim to help candidates better prepare and achieve success in their exams.</p>
      </div>

      <div class="vision-section">
        <h2>Our Vision</h2>
        <p>We envision our platform becoming an essential resource for anyone preparing for civil service exams. By integrating modern technology and educational best practices, we strive to provide a valuable tool that helps users perform at their best.</p>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "AboutUs",
  components: {
    Header,
    Footer,
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
  background: rgb(0, 0, 0);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%; /* Full width */
  margin: 0px auto; /* Center the container horizontally */
  max-width: 1200px; /* Set a max-width to keep it readable on large screens */
}

h1 {
  margin-bottom: 0px;
  text-align: center;
  font-size: 3rem; /* Larger font for the header */
  color: #d8cbb3;
}

h2 {
  font-size: 2rem;
  color: #7fbdbd;
  margin: 30px 0 15px;
  text-align: center;
}

p {
  font-size: 1.2rem;
  color: #B0B0B0;
  text-align: center;
  line-height: 1.8;
  margin-bottom: 16px;
}

.mission-section,
.vision-section {
  margin-top: 70px;
}

footer {
  margin-top: auto;
  padding: 10px;
  background: #121212;
  text-align: center;
  color: #faf7f7;
}
</style>
