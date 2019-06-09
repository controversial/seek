<template>
  <div class="page class-detail-page" v-if="!$apollo.loading">
    <h1>{{ classData.name }}</h1>

    <table>
      <thead>
        <th>Student</th>
        <th>Current location</th>
        <th>Attendance</th>
      </thead>
      <tr v-for="student in students" v-bind:key="student.username">
        <td class="student-info">
          <div class="picture" v-bind:style="{ backgroundImage: `url(https://source.unsplash.com/50x50/?face,${student.username})`}"></div>
          <div>
            <div class="name">{{ student.name }}</div>
            <div class="grade-level" v-if="student.gradeLevel">{{ ordinal(student.gradeLevel) }} grade</div>
          </div>
        </td>
        <td class="location">
          {{ (student.location || { name: '--' }).name }}
        </td>
        <td>
          <div class="attendance-badge" v-bind:class="getStatus(student).status">{{ getStatus(student).text }}</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
