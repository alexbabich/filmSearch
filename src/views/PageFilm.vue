<template>
  <div class="mf-film-page">
    <span class="mf-back-btn" @click="goBack">go back to list</span>
    <div class="mf-row">
        <div class="mf-col-4">
            <img :src="info.Poster" class="img-fluid kp-img-thumbnail" :alt="info.Poster"/>
        </div>
        <div class="mf-col-8">
            <p><b>{{info.Title}}</b></p>
            <hr>
            <p><b>Released:</b> {{info.Released}}</p>
            <p><b>Runtime:</b> {{info.Runtime}}</p>
            <p><b>Genre:</b> {{info.Genre}}</p>
            <p><b>Country:</b> {{info.Country}}</p>
            <p><b>Actors:</b> {{info.Actors}}</p>
            <p><b>IMDB rating:</b>{{ info.imdbRating }}</p>
            <hr>
            <p class="text-faded">{{info.Plot}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'filmpage',
  data () {
    return {
      info: [],
      filmId: this.$route.params.id
    }
  },
  methods: {
    getFilms (filmId) {
      axios
        .get(this.$store.state.mainURL + `&i=` + filmId + `&plot=full`)
        .then(response => (this.info = response.data))
        .catch(response => {
          console.log(response)
        })
    },
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  },
  beforeMount () {
    this.getFilms(this.filmId)
  }
}
</script>

<style lang="scss">
  .about {
    h1 {
      color: red;
    }
  }

  .mf-back-btn {
      position: absolute;
      top: -20px;
      width: 200px;
      margin: auto;
      left: 0;
      right: 0;
      cursor: pointer;
  }

  .mf-film-page {
      position: relative;
  }
  .mf-col-8,
  .mf-col-4 {
    display: inline-block;
    vertical-align: top;
  }

  .mf-col-4 {
      width: 40%;
  }

  .mf-col-8 {
      width: 60%;
      text-align: left;
  }
</style>
