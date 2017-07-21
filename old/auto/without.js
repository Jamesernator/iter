import auto from "./auto.js"
import syncF from "../sync/without.js"
import asyncF from "../async/without.js"

export default auto(syncF, asyncF)