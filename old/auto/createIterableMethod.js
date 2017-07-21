import auto from "./auto.js"
import syncF from "../sync/createIterableMethod.js"
import asyncF from "../async/createIterableMethod.js"

export default auto(syncF, asyncF)