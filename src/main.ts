/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import all icons, solid图标库的包名为fas、regular图标库的包名为far、brands图标库的包名为fab */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { createApp } from 'vue'
import App from './App.vue'

import './styles/index.css'

// add the fontawesome icon library to the library
library.add(fas)

createApp(App).mount('#app')