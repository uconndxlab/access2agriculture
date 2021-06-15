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
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Access 2 Agriculture Dashboard</v-toolbar-title>
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
