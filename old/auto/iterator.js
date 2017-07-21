import auto from "./auto.js"
import syncF from "../sync/iterator.js"
import asyncF from "../async/iterator.js"

export default auto(syncF, asyncF)