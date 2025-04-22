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

  /* Calm green tone as base */
  background-color: #a7cbbd; /* Soft pastel green */

  /* Optional calm overlay image */
  background-image: linear-gradient(
      rgba(20, 30, 20, 0.6),
      rgba(52, 100, 52, 0.6)
    ),
    url('src/assets/img/uwu.jpg'); /* Add soft dark overlay to calm image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
