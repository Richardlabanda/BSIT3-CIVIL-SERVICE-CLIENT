<template>
    <section class="section-team">
      <h2 style="color: white;">Meet Our Team</h2>

      <div class="team-container">
        <div class="team-member" v-for="(member, index) in teamMembers" :key="index">
          <img :src="member.photo" :alt="member.name" />
          <h3>{{ member.name }}</h3>
          <p>{{ member.position }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        teamMembers: [
          {
            name: "Rose Ann Padin",
            position: "Programmer",
            photo: "src/assets/img/rose.jpg",
          },
          {
            name: "Richard Labanda Jr.",
            position: "Designer",
            photo: "src/assets/img/richard.jpg",
          },
          {
            name: "John Denver Candia",
            position: "Assistant Designer",
            photo: "src/assets/img/denver.jpg",
          },
          {
            name: "Christine Borata",
            position: "Researcher",
            photo: "src/assets/img/borata.jpg",
          },
          {
            name: "Jhon Leemarc Taña",
            position: "Assistant Researcher",
            photo: "src/assets/img/leemarc.jpg",
          },
          {
            name: "Alchris Compuesto",
            position: "Documentator",
            photo: "src/assets/img/al.jpg",
          },
          {
            name: "John Paul Abayata",
            position: "Assistant Documentator",
            photo: "src/assets/img/abayata.jpg",
          },
          {
            name: "Jogie Aliviano Jr.", 
            position: "Report/PPT Maker",
            photo: "src/assets/img/jogie.jpg",
          },
          
          
          
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .section-team {
  padding: 0px;
  background-color: #1b1a1a;
  margin-bottom: 0px;
  text-align: center;
  overflow-x: auto; /* Allow scrolling if content overflows */
}

.team-container {
  display: flex;
  flex-wrap: nowrap; /* Keep items on a single line */
  justify-content: flex-start;
  gap: 0px;
  color: #ffffff;
  padding: 0px;
  overflow-x: auto; /* Horizontal scroll if needed */
}

.team-member {
  min-width: 100px;
  text-align: center;
  color: #fbe8e8;
  font-size: 0.8rem;
  flex-shrink: 0; /* Prevent shrinking */
}

.team-member img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 5px;
}

 
  </style>
  