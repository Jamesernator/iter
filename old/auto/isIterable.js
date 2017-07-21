import auto from "./auto.js"
import syncF from "../sync/isIterable.js"
import asyncF from "../async/isIterable.js"

export default auto(syncF, asyncF)