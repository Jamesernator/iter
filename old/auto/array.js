import auto from "./auto.js"
import syncF from "../sync/array.js"
import asyncF from "../async/array.js"

export default auto(syncF, asyncF)