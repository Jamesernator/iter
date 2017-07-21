import auto from "./auto.js"
import syncF from "../sync/invoke.js"
import asyncF from "../async/invoke.js"

export default auto(syncF, asyncF)