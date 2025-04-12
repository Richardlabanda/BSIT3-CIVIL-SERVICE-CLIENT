<template>
    <section class="section-slider">
      <div class="container py-5">
        <swiper
          :autoplay="{ delay: 6000, disableOnInteraction: false }"
          :navigation="true"
          :pagination="{ clickable: true }"
          :slides-per-view="1"
          :centeredSlides="true"
          :space-between="30"
          :modules="modules"
          @autoplayTimeLeft="onAutoplayTimeLeft"
        >
          <swiper-slide v-for="(slide, index) in slides" :key="index">
            <div class="row gy-4 justify-content-between">
              <div class="col-lg-6 d-flex flex-column justify-content-center">
                <h1 class="text-dark">{{ slide.title }}</h1>
                <p class="text-dark"><small>{{ slide.description }}</small></p>
                <div class="d-flex">
                  <router-link class="btn-get-started" to="/">Read More</router-link>
                </div>
              </div>
            </div>
          </swiper-slide>
  
          <template #container-end>
            <div class="autoplay-progress">
              <svg viewBox="0 0 48 48" ref="progressCircle">
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref="progressContent">1</span>
            </div>
          </template>
        </swiper>
      </div>
      <svg class="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none">
        <defs>
          <path id="wave-path" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
        </defs>
        <g class="wave1">
          <use xlink:href="#wave-path" x="50" y="3"></use>
        </g>
        <g class="wave2">
          <use xlink:href="#wave-path" x="50" y="0"></use>
        </g>
        <g class="wave3">
          <use xlink:href="#wave-path" x="50" y="9"></use>
        </g>
      </svg>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Autoplay, Pagination, Navigation } from 'swiper/modules';
  
  export default defineComponent({
    name: "SectionSlider",
    components: { Swiper, SwiperSlide },
    setup() {
      const progressCircle = ref<SVGCircleElement | null>(null);
      const progressContent = ref<HTMLElement | null>(null);
      const slides = [
        {
          title: "Master Data Structures & Algorithms",
          description: "Elevate your coding skills and crack technical interviews with our comprehensive Data Structures and Algorithms learning platform.",
        },
        {
          title: "Visualize The Concepts",
          description: "Understand complex Data Structures and Algorithms through engaging, interactive visualizations.",
        },
        {
          title: "Learn & Assess",
          description: "Take your understanding to the next level with dynamic learning and assessment.",
        },
      ];
  
      const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
        // Check for null values before accessing properties
        if (progressCircle.value) {
          progressCircle.value.style.setProperty('--progress', (1 - progress).toString());
        }
        if (progressContent.value) {
          progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
        }
      };
  
      return {
        onAutoplayTimeLeft,
        progressCircle,
        progressContent,
        slides,
        modules: [Autoplay, Pagination, Navigation],
      };
    },
  });
  </script>
  
  <style scoped>
  .section-slider {
    position: relative;
  }
  
  /* Add spacing for titles and paragraphs in slides */
  h1 {
    margin: 10px 0; /* Space above and below the title */
  }
  
  p {
    margin: 10px 0; /* Space above and below the paragraph */
  }
  
  .autoplay-progress {
    position: absolute;
    right: 16px;
    bottom: 16px;
    z-index: 10;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
  }
  
  .autoplay-progress svg {
    --progress: 0;
    position: absolute;
    left: 0;
    top: 0px;
    z-index: 10;
    width: 100%;
    height: 100%;
    stroke-width: 4px;
    stroke: white;
    fill: none;
    stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
    stroke-dasharray: 125.6;
    transform: rotate(-90deg);
  }
  
  .hero-waves {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;
    fill: #007bff; /* Adjust the color as needed */
  }
  </style>
  