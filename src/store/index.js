import { createStore } from 'vuex'

import elevator from './modules/elevator'

export default createStore({
    modules: {
        elevator, 
    },
})
