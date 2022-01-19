<template>
    <v-container fill-height class="page-about">
        <v-row align="center" justify="center">
            <v-col>
                <app-icon />
                <h1>About</h1>
                <p class="mb-6">{{ string('HOMEPAGE_INTRO') }}</p>
                <h2 class="mb-4">Our Partners / Sponsors:</h2>
                <v-row>
                    <v-col
                        v-for="partner in partners"
                        :key="`partner-${partner.id}`"
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <partner-card 
                            :title="partner.name"
                            :description="partner.description"
                            :link="partner.link"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AppIcon from '@/components/AppIcon.vue'
import PartnerCard from '@/components/PartnerCard.vue'
import { mapGetters } from 'vuex'

export default {
    components: { AppIcon, PartnerCard },
    title: 'About',
    computed: {
        ...mapGetters({
            string: "string"
        })
    },
    data () {
        return {
            partners: [ {
                name: 'Connecticut Resource Conservation & Development',
                id: 'ct-rcd',
                description: 'Connecticut Resource Conservation and Development (CT RC&D) is a 501(c)(3) statewide charitable organization. We foster grassroots projects for sustainable growth and food security for Connecticut residents. CT RC&D programs and projects make a significant impact to Connecticut communities, farmers, government, and conservation partners.',
                link: 'https://ctrcd.org/'
            }, {
                name: 'UConn DX Group',
                id: 'uconn-dx-group',
                description: 'With its multidisciplinary team composed of Digital Media & Design faculty members and assistance from staff, graduate students, and paid interns, the DX Group offers collective decades of experience in web design, UI / UX design, application development, and technological innovation.',
                link: 'https://dxgroup.core.uconn.edu/'
            }, {
                name: 'Big Y',
                id: 'big-y',
                description: 'An all in one supermarket featuring a butcher, fresh seafood, bakery, deli, and local produce with locations in CT and MA.',
                link: 'https://www.bigy.com/'
            }, {
                name: 'Center for Open Research Resources and Equipment (COR²E)',
                id: 'cor2e',
                description: `COR²E promotes and supports the growth of research at UConn by serving the University's world-class research faculty (as well as the rest of the UConn community) through research facilities, portals, sponsored collaborative events, and web technology.`,
                link: 'https://core.uconn.edu/'
            }, {
                name: 'U.S. Department of Agriculture',
                id: 'usda',
                description: 'We provide leadership on food, agriculture, natural resources, rural development, nutrition, and related issues based on public policy, the best available science, and effective management.',
                link: 'https://www.usda.gov/'
            }]
        }
    }
}
</script>