import auto from "./auto.js"
import syncF from "../sync/any.js"
import asyncF from "../async/any.js"

export default auto(syncF, asyncF)