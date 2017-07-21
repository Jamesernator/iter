import auto from "./auto.js"
import syncF from "../sync/contains.js"
import asyncF from "../async/contains.js"

export default auto(syncF, asyncF)