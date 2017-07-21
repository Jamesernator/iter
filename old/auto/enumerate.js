import auto from "./auto.js"
import syncF from "../sync/enumerate.js"
import asyncF from "../async/enumerate.js"

export default auto(syncF, asyncF)