db = db.getSiblingDB('datos')
cursor = db.articulos.find()


/*

cursor.forEach(producto => {
    console.log(producto.descripcion)
});

*/


/*

while(cursor.hasNext()){
    const producto = cursor.next()

    console.log(producto.descripcion)

    break;
}

*/

const documentoArray = cursor.toArray()

const primerElemento = documentoArray[1]

// console.log(primerElemento)

for (let i = 0; i < documentoArray.length; i++) {
    console.log(documentoArray[i].descripcion)
}