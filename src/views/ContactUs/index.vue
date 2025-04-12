<template>
  <div class="app">
    <Header />
    <div class="page-container">
      <div class="content">
        <h1>Contact Us</h1>
        <p>
          If you have any questions, suggestions, or concerns regarding our Civil Service Mock Exam platform,
          feel free to reach out. We’re always open to feedback to make this platform even better.
        </p>
        
        <div class="contact-info">
          <p><strong>Email:</strong> <a href="mailto:contact@csme-platform.com">contact@csme-platform.com</a></p>
          <p><strong>Phone:</strong> 0912-345-6789</p>
          <p><strong>School:</strong> Microsystems International Institute of Technology (MIIT)</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: "ContactUs",
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
  background: rgb(23, 20, 20);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%; /* Full width */
  margin: 0px auto; /* Center the container horizontally */
  max-width: 1200px; /* Set a max-width to keep it readable on large screens */
}

/* Ensure content is stacked vertically */
.content {
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  align-items: center;    /* Center content horizontally */
  gap: 16px;              /* Adds spacing between elements */
}

h1 {
  font-size: 2.8rem;
  color: #f5c518;
  margin-bottom: 20px;
  text-align: center;
}

p {
  font-size: 1.2rem;
  color: #ddd;
  line-height: 1.8;
  margin-bottom: 16px;
  text-align: center;
}

.contact-info {
  margin-top: 30px;
  color: #ddd;
  text-align: center; /* Align the contact info to the left */
  width: 100%; /* Ensures the contact section aligns well */
}

.contact-info p {
  margin-bottom: 10px;
}

.contact-info a {
  color: #1a1a18;
  text-decoration: underline;
}

footer {
  margin-top: auto;
  padding: 10px;
  background: #000000;
  text-align: center;
  color: #ffffff;
}
</style>
