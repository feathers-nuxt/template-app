<template>
  <div class="contain">
    <div class="five" v-if="error.statusCode === 500" >
      <div class="report">
        <h1 >{{ `${error.code} ${error.name}`}} </h1>
        <h2> {{error.message}} </h2>
        <Button type='dashed' @click="goHome"> Go Home </Button>
      </div>
      <div class="doodle" >
        <pre > 
                    ,--.    ,--.
                  ((O ))--((O ))
                ,'_`--'____`--'_`.
                _:  ____________  :_
              | | ||::::::::::|| | |
              | | ||::::::::::|| | |
              | | ||::::::::::|| | |
              |_| |/__________\| |_|
                |________________|
              __..-'            `-..__
          .-| : .----------------. : |-.
        ,\ || | |\______________/| | || /.
        /`.\:| | ||  __  __  __  || | |;/,'\
      :`-._\;.| || '--''--''--' || |,:/_.-':
      |    :  | || .----------. || |  :    |
      |    |  | ||-----{{error.code}}------|| |  |    |
      |    |  | ||   _   _   _  || |  |    |
      :,--.;  | ||  (_) (_) (_) || |  :,--.;
      (`-'|)  | ||______________|| |  (|`-')
        `--'   | |/______________\| |   `--'
              |____________________|
                `.________________,'
                (_______)(_______)
                (_______)(_______)
                (_______)(_______)
                (_______)(_______)
                |        ||        |
                '--------''--------'
        </pre>
      </div>
    </div>


    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>

export default {
  name: 'nuxt-error',
  props: ['error'],
  head () {
    return {
      title: this.message,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
      ]
    }
  },
  computed: {
    statusCode () {
      return (this.error && this.error.statusCode) || 500
    },
    message () {
      return this.error.message
    }
  },
  methods: {
    goHome() {
      this.$store.commit('crash/clearError')
      window.location.reload()
      console.log('Going home')
    }
  }
}
</script>


<style>
.five {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.report {
  /* margin-right: auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.report button {
  margin-top: 2rem;
}
.container {
  padding: 1rem;
  background: #F7F8FB;
  color: #47494E;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
  font-weight: 100 !important;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased; 
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.__nuxt-error-page .error {
  max-width: 450px;
}
.__nuxt-error-page .title {
  font-size: 1.5rem;
  margin-top: 15px;
  color: #47494E;
  margin-bottom: 8px; 
}
.__nuxt-error-page .description {
  color: #7F828B;
  line-height: 21px;
  margin-bottom: 10px;
}
.__nuxt-error-page a {
  color: #7F828B !important;
  text-decoration: none;
}
.__nuxt-error-page .logo {
  position: fixed;
  left: 12px;
  bottom: 12px;
}
</style>