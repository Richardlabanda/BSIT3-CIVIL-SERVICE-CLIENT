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
          <p><strong>Email:</strong> samplecompany@gmail.com</p>
          <p><strong>Phone:</strong> 0942261186</p>
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
  display: flex; /* Enable flex for vertical centering */
  justify-content: center; /* Center horizontally */
  align-items: center;     /* Center vertically */
  padding: 20px;
  background: rgb(23, 20, 20);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
}

.content {
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

h1 {
  font-size: 2.8rem;
  color: #d8cbb3;
  margin-bottom: 20px;
  text-align: center;
}

p {
  font-size: 1.2rem;
  color: #B0B0B0;
  line-height: 1.8;
  margin-bottom: 16px;
}

.contact-info {
  margin-top: 30px;
  color: #7fbdbd;
  width: 100%;
}

.contact-info p {
  margin-bottom: 10px;
  color: #7fbdbd;
  text-decoration: underline;
  text-align: left;
}

.contact-info a {
  color: #1a1a18;
  text-decoration: underline;
  text-align: left;
}

footer {
  margin-top: auto;
  padding: 10px;
  background: #000000;
  text-align: center;
  color: #ffffff;
}

</style>
