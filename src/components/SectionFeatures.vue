<template>
    <section class="section-features">
      <h2>Features</h2>
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
            title: "Feature One",
            description: "Description of feature one.",
          },
          {
            title: "Feature Two",
            description: "Description of feature two.",
          },
          {
            title: "Feature Three",
            description: "Description of feature three.",
          },
          {
            title: "Feature Four",
            description: "Description of feature four.",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .section-features {
    padding: 20px;
    background-color: #f9f9f9;
    margin-bottom: 20px;
  }
  
  .features-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
    gap: 20px; /* Space between boxes */
  }
  
  .feature {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  </style>
  