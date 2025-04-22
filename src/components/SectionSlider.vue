<template>
  <section class="section-slider">
    <div class="container py-5">
      <swiper
        class="custom-swiper"
        :modules="[Autoplay, Pagination, Navigation]"
        :autoplay="{ delay: 6000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="true"
        :slides-per-view="1"
        :centered-slides="true"
        :space-between="30"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <div class="slide-inner row align-items-center">
            <div class="col-lg-12 d-flex flex-column justify-content-center">
              <h1>{{ slide.title }}</h1>
              <p><small>{{ slide.description }}</small></p>
              <a class="btn-get-started" :href="slide.link" target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default defineComponent({
  name: 'SectionSlider',
  components: { Swiper, SwiperSlide },
  setup() {
    const slides = [
      {
        title: '8 Tried and Tested Tips for Mock Exam Preparation',
        description: `This article offers practical advice on how to effectively prepare for mock exams. It emphasizes the importance of starting early to avoid last-minute cramming and to allow time for spaced revision. Key strategies include creating a structured timetable, using active revision techniques like flashcards and quizzes, and making use of previous exam papers. One of the highlights is the value of understanding examiners' reports, which reveal common pitfalls and expectations.

In addition, the article recommends practicing under exam conditions to improve time management and build confidence. Reviewing answers and identifying areas of weakness after each mock is also advised. The article acknowledges that while mock exams might seem stressful, they are ultimately a valuable learning tool. Regular review and self-assessment are seen as critical to turning mock feedback into real progress.`,
        link: 'https://www.firsttutors.com/uk/blog/2022/11/8-tried-and-tested-tips-for-mock-exam-preparation/',
      },
      {
        title: 'Implementing Collaborative Mock Exam Review',
        description: `This academic article explores how collaborative mock exam reviews can enhance student learning and performance. Rather than traditional lecture-style review sessions, it introduces interactive methods like group discussions, peer teaching, and problem-solving activities. Students reportedly engaged more deeply with content when working together, which led to improved critical thinking and retention.

The study found that students involved in collaborative reviews not only performed better on final exams but also reported lower levels of test anxiety. Importantly, the article discusses how instructors can design such sessions by incorporating structured activities, guided prompts, and feedback loops. It also suggests the use of formative assessment tools to track progress over time. By fostering a more active learning environment, the article argues that collaborative mock reviews can lead to long-term academic benefits.`,
        link: 'https://jcasp-ojs-txstate.tdl.org/jcasp/article/view/124?utm_source=chatgpt.com',
      },
      {
        title: 'The Importance of Mock Exams: Simulating Real Testing Conditions',
        description: `This article underscores the importance of mock exams in preparing students for actual test scenarios. It points out that mock exams replicate real exam settings, helping students get accustomed to pressure, manage their time better, and identify knowledge gaps. Additionally, mock exams provide a benchmark for academic performance and help refine exam strategies such as question selection and time allocation.

The article also highlights the psychological benefits, including increased self-confidence and reduced anxiety. Teachers and schools are encouraged to treat mock exams seriously, providing clear feedback and actionable advice. Students are urged to treat mocks not just as practice, but as an opportunity to simulate the exam mindset. When used consistently, mock exams can significantly improve final outcomes and build exam resilience.`,
        link: 'https://touchheights.com/exam-excellence/the-importance-of-mock-exams-simulating-real-testing-conditions/?utm_source=chatgpt.com',
      },
    ];

    return {
      slides,
      Autoplay,
      Pagination,
      Navigation,
    };
  },
});
</script>

<style scoped>
.section-slider {
  font-size: 1rem;
  position: relative;
  text-align: center;
  background-color: #000000;
  overflow: hidden;
}

.custom-swiper {
  width: 90%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  margin-bottom: 3%;
}

.slide-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 300px;
}

h1 {
  font-size: 2rem;
  color: #decbcb;
  margin-bottom: 10px;
}

p {
  color: #febfbf;
  margin-bottom: 0px;
  font-size: 1rem;
}

.btn-get-started {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #ab6708;  
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-get-started:hover {
  background-color: #923608;
}

@media (max-width: 767px) {
  .slide-inner {
    flex-direction: column;
    text-align: center;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
