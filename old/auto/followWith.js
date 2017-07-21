import auto from "./auto.js"
import syncF from "../sync/followWith.js"
import asyncF from "../async/followWith.js"

export default auto(syncF, asyncF)