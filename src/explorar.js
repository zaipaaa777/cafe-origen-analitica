//importar objetos "ventas" de datos.js

const {ventas} = require('./datos');

//mostrar lo pedido

console.log("Cantidad total de registros: ", ventas.length)
console.log("Primer registro:", ventas[0]);
console.log("Ultimo registro", ventas[ventas.length - 1]);
console.log("Producto comprado de venta #4:", ventas[3].producto);

//tabla

console.table(ventas);
