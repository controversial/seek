<template>
  <header>
    <div class="school-info">
      <div class="picture" v-bind:style="{ backgroundImage: `url(${school.logo})` }"></div>
      <h2>{{ school.name }}</h2>

      <div class="stats">
        <div class="item">
          <icon-users></icon-users>
          <div>
            <div class="stat">{{ school.numStudents }}</div>
            <div class="label">students</div>
          </div>
        </div>

        <div class="item">
          <icon-clipboard></icon-clipboard>
          <div>
            <div class="stat">{{ currentBlock }}</div>
            <div class="label">block</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
