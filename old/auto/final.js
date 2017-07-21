import auto from "./auto.js"
import syncF from "../sync/final.js"
import asyncF from "../async/final.js"

export default auto(syncF, asyncF)