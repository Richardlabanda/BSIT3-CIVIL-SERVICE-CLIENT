<template>
    <section class="section-team">
      <h2>Meet Our Team</h2>
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
            name: "John Doe",
            position: "CEO",
            photo: "path/to/photo1.jpg",
          },
          {
            name: "Jane Smith",
            position: "CTO",
            photo: "path/to/photo2.jpg",
          },
          {
            name: "Emily Johnson",
            position: "COO",
            photo: "path/to/photo3.jpg",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .section-team {
    padding: 20px;
    background-color: #f0f0f0;
    margin-bottom: 20px;
  }
  
  .team-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .team-member {
    text-align: center;
    margin: 10px;
  }
  
  .team-member img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  </style>
  