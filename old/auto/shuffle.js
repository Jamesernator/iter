import auto from "./auto.js"
import syncF from "../sync/shuffle.js"
import asyncF from "../async/shuffle.js"

export default auto(syncF, asyncF)