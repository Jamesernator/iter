import auto from "./auto.js"
import syncF from "../sync/buffer.js"
import asyncF from "../async/buffer.js"

export default auto(syncF, asyncF)