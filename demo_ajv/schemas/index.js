const Ajv2020 = require("ajv/dist/2020"); 
// const yaml = require("js-yaml");  -> Si es un yml y no un json
// const fs = require("fs");    -> Si es un yamal y no un json
const ajv = new Ajv2020();

// Carga el YAML y lo convierte a objeto JS
//const schema_pelicula = yaml.load(fs.readFileSync("./pelicula.schema.yaml", "utf8"));   -> Si es un yml y no un json

const schema_pelicula = require("./pelicula.schema.json");

ajv.addSchema(schema_pelicula, "pelicula");

module.exports = ajv;
