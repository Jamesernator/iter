import auto from "./auto.js"
import syncF from "../sync/findLastIndex.js"
import asyncF from "../async/findLastIndex.js"

export default auto(syncF, asyncF)