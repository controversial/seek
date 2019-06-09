<template>
  <div class="page class-detail-page" v-if="!$apollo.loading">
    <h1>{{ classData.name }}</h1>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
