<template>
  <v-app>
    <v-card
      class="mx-auto"
    >
      <v-navigation-drawer
        app
        v-model="drawer"
      >
        <v-list-item v-if="loggedIn">
          <v-list-item-content>
            <v-list-item-title>
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in navItems"
            :key="item.title"
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-if="loggedIn"
            @click="logout()"
          >
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Log Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>

    <v-app-bar
      app
      color="white"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <svg class="appicon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 432 432" style="enable-background:new 0 0 432 432;" xml:space="preserve">
            <path d="M301.6,37.9c-21.8-23.9-53-37.5-85.9-37.5c-61.1,0-116.3,46.9-116.3,119.3c0,40,26.6,86,79.6,138.2
                c11.1,10.9,23.3,22.1,36.7,33.5C293.2,225.2,332,168,332,119.7C332,86.3,320.3,58.3,301.6,37.9z M215.8,87.7
                c9.8,0,18.5,4.9,23.8,12.4c3.3,4.7,5.3,10.5,5.3,16.7c0,16-13.1,29.1-29.1,29.1c-6.2,0-11.9-2-16.7-5.3c-7.5-5.3-12.4-14-12.4-23.8
                C186.7,100.8,199.8,87.7,215.8,87.7z"/>
            <path d="M145.5,278.4c-39.8-39.9-93.8-56.7-145.7-50.7C5,335.3,88.8,422.3,195,432.4C203.8,378,187.4,320.3,145.5,278.4z"/>
            <path d="M431.8,227.7c-51.9-6-105.9,10.8-145.7,50.7c-41.9,41.9-58.3,99.6-49.5,154C342.7,422.3,426.5,335.3,431.8,227.7z"/>
        </svg>

      <v-toolbar-title class="black--text font-weight-black">Access 2 Agriculture Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    drawer: true
  }),
  computed: {
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters({
      loggedIn: 'isLoggedIn'
    }),
    navItems() {
      if ( this.loggedIn ) {
        return [
          {
            title: "Home",
            icon: 'mdi-home',
            to: '/'
          },
          {
            title: "Waypoints",
            icon: 'mdi-view-dashboard',
            to: '/dashboard'
          },
          {
            title: "Products",
            icon: 'mdi-format-list-bulleted',
            to: '/products'
          },
          {
            title: "Geo",
            icon: 'mdi-earth',
            to: '/geo'
          }
        ]
      }
      return [
        {
          title: "Home",
          icon: 'mdi-home',
          to: '/'
        },
        {
          title: "Login",
          icon: 'mdi-account',
          to: '/login'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['authAction', 'logout'])
  },
  mounted() {
    this.authAction()
  }
};
</script>


<style lang="scss">
.appicon {
    width: 30px;
    height:30px;
    margin-right: 16px;
}
</style>