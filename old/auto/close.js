import auto from "./auto.js"
import syncF from "../sync/close.js"
import asyncF from "../async/close.js"

export default auto(syncF, asyncF)