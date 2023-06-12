import { createStore } from 'vuex'
import getters from './getters'


const modulesFiles = import.meta.globEager('./modules/*.ts')
const modules:any = [];
for(let key in modulesFiles){
    if (Object.prototype.hasOwnProperty.call(modulesFiles, key)) {
        let valKey = key.replace(/modules\//, '')
        modules[valKey.replace(/^\.\/(.*)\.\w+$/, '$1')] = modulesFiles[key].default
    }
}
// @ts-ignore
export default createStore({getters, modules})
