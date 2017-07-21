import auto from "./auto.js"
import syncF from "../sync/each.js"
import asyncF from "../async/each.js"

export default auto(syncF, asyncF)