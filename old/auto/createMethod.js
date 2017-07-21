import auto from "./auto.js"
import syncF from "../sync/createMethod.js"
import asyncF from "../async/createMethod.js"

export default auto(syncF, asyncF)