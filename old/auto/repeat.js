import auto from "./auto.js"
import syncF from "../sync/repeat.js"
import asyncF from "../async/repeat.js"

export default auto(syncF, asyncF)