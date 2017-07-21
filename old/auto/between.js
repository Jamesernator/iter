import auto from "./auto.js"
import syncF from "../sync/between.js"
import asyncF from "../async/between.js"

export default auto(syncF, asyncF)