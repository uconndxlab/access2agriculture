<template>
  <v-container class="mt-3">
    <v-row class="text-center">

      <v-col class="mb-4">
        <h1 class="display-1 font-weight-black mb-3">
          Access2Ag Admin
        </h1>

        <p class="subheading font-weight-regular">
          A project in collaboration with Connecticut Resource Conservation and Development (CT RC&amp;D), Digital Experience Group, and the Center for Open Research Resources and Equipment (COR²E).
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Partners
        </h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'AccessAgHomeContent',

    data: () => ({
        importantLinks: [
            {
                text: 'University of Connecticut',
                href: 'https://uconn.edu',
            },
            {
                text: 'Digital Experience Group',
                href: 'https://dxgroup.core.uconn.edu/',
            },
            {
                text: 'Center for Open Research Resources and Equipment',
                href: 'https://core.uconn.edu/news',
            },
            {
                text: 'Connecticut Resource Conservation and Development',
                href: 'https://ctrcd.org/',
            }
        ]
    }),
}
</script>
