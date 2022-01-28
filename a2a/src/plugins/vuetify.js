import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

/**
 * $a2a-tan: #fbf7f0;
$a2a-lightgrey: #f1eee7;
$a2a-green: #5a8759;
$a2a-darkgreen: #384a37;
$a2a-brown: #634833;
$a2a-orange: #ee741c;
 */

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#ee741c'
            }
        }
    }
})
