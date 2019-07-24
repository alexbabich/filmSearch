<template>
  <div class="about">
    <template v-if="count > 0">
        <slick
          ref="slick"
          :options="slickOptions">
          <template v-for="item in tmpItemsFilms">
            <router-link :to="{ name: 'filmpage', params: { id: item.imdbID }}" :key="item.imdbID">
              <img :src="item.Poster" :alt="item.Poster" />
              <div class="mf-description">
                <p><b>Title:</b> {{item.Title}}</p>
                <p><b>Year:</b> {{item.Year}}</p>
                <p><b>Director:</b> {{item.Director}}</p>
              </div>
            </router-link>
          </template>
        </slick>
    </template>
    <template v-else>
      uups, try again
      <p @click="goBack">click here to go back</p>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import Slick from 'vue-slick'

export default {
  components: { Slick },
  name: 'searchList',
  data () {
    return {
      tmpItemsFilms: [],
      filmTitle: this.$route.params.title,
      slickOptions: {
        slidesToShow: 3,
        infinite: true,
        arrows: true,
        dots: true
      },
      count: ''
    }
  },
  beforeUpdate () {
    if (this.$refs.slick) {
      this.$refs.slick.destroy()
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    next () {
      this.$refs.slick.next()
    },

    prev () {
      this.$refs.slick.prev()
    },

    updateData () {
      this.tmpItemsFilms.map((resp) => {
        axios
          .get(this.$store.state.mainURL + `&i=` + resp.imdbID)
          .then(response => {
            if (response.data) {
              resp['Director'] = response.data.Director

              console.log(resp)
            }
          })
          .catch(response => {
            console.log(response)
          })
      })
    },
    getFilms (filmName) {
      axios
        .get(this.$store.state.mainURL + `&s=` + filmName)
        .then(response => {
          if (response.data.Search) {
            this.tmpItemsFilms = response.data.Search
            this.count = response.data.Search.length
            this.updateData()
          }
        })
        .catch(response => {
          console.log(response)
        })
    }
  },
  created () {
    this.getFilms(this.filmTitle)
  }
}
</script>

<style lang="scss">
  .about {
    h1 {
      color: red;
    }
  }
  .slick-list {
    width: 100vw;
    overflow: hidden;
    .slick-slide {
      width: 100%;
      max-height: 500px;
      position: relative;
    }
  }
  .slick-slider {
    position: relative;
    img {
      width: 100%;
      height: auto;
    }
    .slick-arrow {
      position: absolute;
      top: 50%;
      z-index: 99;
      background: #fff;
      opacity: 0.75;
      height: 100px;
      width: 100px;
      border-radius: 50%;
      cursor: pointer;
      outline: none;
      border: none;

      &:hover {
        opacity: 1;
      }

      &.slick-prev {
        left: 0;
      }

      &.slick-next {
        right: 0;
      }
    }
  }
  .slick-dots {
    list-style: none;
    position: absolute;
    width: 100%;

    li {
      display: inline-block;

      &:not(:last-child) {
        margin-right: 5px;
      }

      button {
        background: rgb(18, 131, 223);
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: none;
        text-align: center;
        padding: 0;
        outline: none;
        cursor: pointer;
        color: #fff;
        font-size: 12px;
        line-height: 1;
      }

      &.slick-active {
        button {
          background: rgb(171, 212, 21);
          color: #333;
        }
      }
    }
  }

  .mf-description {
    position: absolute;
    bottom: 0;
    height: 80px;
    background: #000;
    width: 100%;
    padding: 10px 0;
    p {
      margin: 0 0 5px;
      color: #fff;
    }
  }
</style>
