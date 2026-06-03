# Mongo y JS

> Buscar `cuando utilizar for in`

Se puede escribir en un archivo .js y luego cargarlo desde la terminal con `load`

```bash
load("ejercicio1.js")
```


## Funciones JS

```js
//Me posiciono sobre una base de datos 
db = db.getSiblingDB('colegio')
```
```js
//Ver las colleciones de la base de datos obtenida
db.getCollectionNames()
```

---

### Para recorrer
Obtengo una `referencia` de donde estan los datos
```js
cursor = db.articulos.find()
```
1. Recorro con `forEach`
```js
cursor.forEach(element => {
    console.log(element.descripcion)
});
```

2. Recorro con `hasNext() y next() acepta break`

```js
while(cursor.hasNext()){
    const producto = cursor.next()
    console.log(producto.descripcion)
    break;
}
```
3. Usar `toArray()`

```js
const documentoArray = cursor.toArray()

const primerElemento = documentoArray[1]

// console.log(primerElemento)

for (let i = 0; i < documentoArray.length; i++) {
    console.log(documentoArray[i].descripcion)
}
```