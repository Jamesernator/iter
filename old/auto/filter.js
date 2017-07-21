import auto from "./auto.js"
import syncF from "../sync/filter.js"
import asyncF from "../async/filter.js"

export default auto(syncF, asyncF)