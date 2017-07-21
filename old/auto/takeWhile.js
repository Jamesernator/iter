import auto from "./auto.js"
import syncF from "../sync/takeWhile.js"
import asyncF from "../async/takeWhile.js"

export default auto(syncF, asyncF)