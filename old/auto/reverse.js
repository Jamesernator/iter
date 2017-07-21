import auto from "./auto.js"
import syncF from "../sync/reverse.js"
import asyncF from "../async/reverse.js"

export default auto(syncF, asyncF)