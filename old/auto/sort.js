import auto from "./auto.js"
import syncF from "../sync/sort.js"
import asyncF from "../async/sort.js"

export default auto(syncF, asyncF)