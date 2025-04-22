<template>
    <section class="section-features">
      <h2 style="color: white;">Features</h2>
      <div class="features-container">
        <div class="feature" v-for="(feature, index) in features" :key="index">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        features: [
          {
            title: "Performance Analytics Dashboard",
            description: "Displays user stats like average score, pass/fail rate, and category-wise performance through interactive visuals.",
          },
          {
            title: "Timed Practice Mode",
            description: "Simulates the real exam environment with a visible countdown timer and automatic submission when time runs out.",
          },
          {
            title: "Instant Feedback & Explanations",
            description: "Provides correct answers and brief explanations immediately after answering or upon test completion.",
          },
          {
            title: "Question Bank with Review & Bookmarking",
            description: "Lets users revisit, filter, and bookmark questions for focused practice and easier review.",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .section-features {
    padding: 20px;
    background-color: #201f1f;
    margin-bottom: 20px;
  }
  
  .features-container {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
    gap: 20px; /* Space between boxes */
  }
  
  .feature {
    padding: 20px;
    background-color: #de6262;
    box-shadow: 0 4px 10px rgba(132, 174, 121, 0.1);
    border-radius: 5px;
  }
  </style>
  