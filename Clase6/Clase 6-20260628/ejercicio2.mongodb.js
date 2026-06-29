//1-Ver las Base de Datos (show dbs - adminCommand('listDatabases'))
printjson(db.adminCommand('listDatabases'))
//2-Posicionarse en una Base de datos (use - getSiblingDB)
db = db.getSiblingDB('clase6')

//3-MostrarColecciones

print(db.getCollectionNames())

// Find retorna un array
cursor = db.articulos.find({precio : {$gte : 100 } })


// Primer forma de iterar
// - cursor.forEach(function(d) { printjson(d) });

// Segunda forma

while(cursor.hasNext()){
    print(cursor.next())
}
