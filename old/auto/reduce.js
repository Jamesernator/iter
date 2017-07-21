import auto from "./auto.js"
import syncF from "../sync/reduce.js"
import asyncF from "../async/reduce.js"

export default auto(syncF, asyncF)