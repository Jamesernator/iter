import auto from "./auto.js"
import syncF from "../sync/findIndex.js"
import asyncF from "../async/findIndex.js"

export default auto(syncF, asyncF)