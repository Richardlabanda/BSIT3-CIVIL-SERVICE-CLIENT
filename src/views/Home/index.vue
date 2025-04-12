<template>
  <div>
    <SectionHeader/>
    <main class="main">
      <SectionSlider/>
      <SectionFeatures/>
      <SectionTeam/>
    </main>
    <SectionFooter/>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import SectionHeader from "@/components/Header.vue";
  import SectionSlider from "@/components/SectionSlider.vue";
  import SectionFeatures from "@/components/SectionFeatures.vue";
  import SectionTeam from "@/components/SectionTeam.vue";
  import SectionFooter from "@/components/Footer.vue";
  

  export default defineComponent({
    name: "AsessmentPage",
    components: { SectionFooter, SectionHeader, SectionSlider, SectionFeatures, SectionTeam }
  });

</script>