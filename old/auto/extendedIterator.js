import auto from "./auto.js"
import syncF from "../sync/extendedIterator.js"
import asyncF from "../async/extendedIterator.js"

export default auto(syncF, asyncF)
