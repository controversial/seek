<template>
  <div class="sidebar">
    <router-link to="/">
      <icon-bar-chart></icon-bar-chart>
      Dashboard
    </router-link>

    <router-link to="/students">
      <icon-users></icon-users>
      Students
    </router-link>

    <router-link to="/classes">
      <icon-calendar></icon-calendar>
      Classes
    </router-link>

    <router-link to="/notifications">
      <icon-bell></icon-bell>
      Notifications
    </router-link>

    <router-link to="/messages">
      <icon-message-square></icon-message-square>
      Messages
    </router-link>

    <router-link to="/settings">
      <icon-settings></icon-settings>
      Settings
    </router-link>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
