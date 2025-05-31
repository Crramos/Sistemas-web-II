# Consultas
##Cambiar a la base de datos <nombre_db>
use <nombre_db>
##Muestra las colecciones de la DB activa
show collections
##Devuelve el número de elementos
db.<collection_name>.find().count()
##Se puede añadir una query para filtrar la búsqueda
db.<collection_name>.find(query) ---> EJ: db.zips.find({"state":"AL"}).count()

$eq: = (default)
$ne: !=
$gt: >
$lt: <
$gte: >=
$lte: <=
$and (default)
$not
$nor
$or

Con el find() se puede usar:
- count()
– limit()
– pretty()
– skip(x) ---> saltar x elementos
– sort() ---> ordenar (1=ascendente, -1= descendente)


Documentos cuya duración del viaje sea menor de 70 segundos y el tipo de usuario no sea subscriptor
db.trips.find({"tripduration": { "$lte" : 70 }, "usertype": { "$ne": "Subscriber" } }).pretty()

Documentos donde los aviones CR2 o A81 aterrizaron o despegaron del aeropuerto KZN
db.routes.find({ "$and": [ { "$or" :[ { "dst_airport": "KZN" }, { "src_airport": "KZN" }] }, { "$or" :[ { "airplane": "CR2" }, { "airplane": "A81" } ] }]}).pretty()

{"$expr": { <expression>}} ----> para variables condicionadas

Número de documentos de sample_training.trips donde el viaje empieza y termia en la misma estación:
db.trips.find({ "$expr": { "$eq": [ "$end station id", "$start station id"] }}).count()

Find all documents where the trip lasted longer than 1200 seconds, and started and ended at the same station
db.trips.find({ "$expr":{ "$and": [{ "$gt": [ "$tripduration", 1200 ]},{ "$eq": [ "$end station id", "$start station id" ]}]}}).count()

$all" -----> Para buscar arrays que contengan al menos esos elementos
db.listingsAndReviews.find({ "amenities": {"$all": [ "Internet", "Wifi", "Kitchen", "Heating", "Family/kid friendly", "Washer", "Dryer", "Essentials"]}})

"$size": number ------> Para especificar un tamaño exacto del array
db.listingsAndReviews.find({"amenities":{"$size":55}}).count()

"$elemMatch" -------> Usado con arrays, los proyecta sólo si tienen un elemento que cumpla el criterio
db.grades.find({"class_id": 431},{"scores": {"$elemMatch": {"score": {"$gt": 85}}}})

"$regex"
db.companies.find({"relationships.0.person.first_name": "Mark","relationships.0.title": {"$regex": "CEO" }}, { "name": 1 })
