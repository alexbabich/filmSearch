<template>
  <div class="home">
    <h2>MovieFinder is a search engine for movies</h2>

    <div class='mf-search-form'>
      <input v-model="searchFilm" placeholder="please type film title" />
      <router-link :to="{ name: 'filmlist', params: { title: searchFilm }}">search</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      searchFilm: ''
    }
  }
}
</script>

<style lang="scss">
  h2 {
    color: red;
  }
  .mf-search-form {
    input {
      padding: 15px 20px;
      width: 200px;
      font-size: 18px;
    }
    a {
      color: rgb(217, 255, 0);
      font-weight: bold;
      font-size: 16px;
      background: rgb(70, 7, 218);
      text-decoration: none;
      display: block;
      width: 200px;
      margin: 20px auto;
      padding: 20px 0;
      border-radius: 4px;
    }
  }
</style>
