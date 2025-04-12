<template>
  <div class="exam-container">
    <Header />

    <!-- Dynamic content -->
    <ExamPage />

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ExamPage from "@/components/ExamQuestions.vue"; // Import the new ExamPage component

export default {
  components: {
    Header,
    Footer,
    ExamPage, // Register ExamPage component
  },
};
</script>

<style scoped>
.exam-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #79d778;
  background-image: url('src/assets/img/uwu.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
