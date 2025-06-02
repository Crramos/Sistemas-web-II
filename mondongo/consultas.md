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

Sacar el número de elementos con más de 50 elementos en el array videojuegos_compatibles

db.consolas.countDocuments({$expr: { $gt: [ { $size: "$videojuegos_compatibles" }, 50 ] }})

¿En cuántas empresas coinciden su permalink con su twitter_username?

db.companies.countDocuments({ $expr: { $eq: ["$permalink", "$twitter_username"]}})

¿Cuántas empresas tienen más empleados que el año en que se fundaron?

db.companies.countDocuments({$expr: {$gt: ["$number_of_employees", "$founded_year"] }})

¿Cuál es el nombre del alojamiento que admite más de 6 personas y tiene exactamente 50 reviews?

db.listingsAndReviews.findOne({$and: [{ accommodates: { $gt: 6 } },{ number_of_reviews: 50 }]}, {name: 1,_id: 0})

¿Cuántos documentos tienen property_type: "House" e incluyen "Changing table" en amenities?

db.listingsAndReviews.countDocuments({property_type: "House",amenities: "Changing table"})

¿Cuántas empresas tienen oficinas en Seattle?

db.companies.countDocuments({"offices.city": "Seattle"})

Query para obtener el nombre de las empresas que tengan exactamente 8 funding_rounds

db.companies.find({ funding_rounds: { $size: 8 } },{ name: 1, _id: 0 })

¿Cuántos viajes empiezan en estaciones al oeste de la longitud -74?

db.trips.countDocuments({"start_station.location.0": { $lt: -74 }})

¿Cuántas inspecciones se realizaron en la ciudad "NEW YORK"?

db.inspections.countDocuments({city: "NEW YORK"})

Query que devuelve nombre y dirección de alojamientos cuyo primer elemento en amenities es "Internet"

db.listingsAndReviews.find({ "amenities.0": "Internet" },{ name: 1, address: 1, _id: 0 })

¿Qué "room types" existen?

db.listingsAndReviews.distinct("room_type")

Nombres y años de fundación de las 5 compañías más antiguas

db.companies.find({ founded_year: { $ne: null } },{ name: 1, founded_year: 1, _id: 0 }).sort({ founded_year: 1 }).limit(5)

¿En qué año nació el ciclista más joven?

db.trips.find({ birth_year: { $ne: null } }).sort({ birth_year: -1 }).limit(1)


