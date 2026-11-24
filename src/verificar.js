// Importar los datos
const { ventas } = require("./datos");

// Importar las funciones de analítica
const {
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
} = require("./analitica");

// Función para comparar resultados
function verificar(nombre, ciclo, metodo) {

    if (JSON.stringify(ciclo) === JSON.stringify(metodo)) {
        console.log(nombre + ": OK");
    } else {
        console.log(nombre + ": DIFERENTE");
        console.log("Resultado con ciclo:", ciclo);
        console.log("Resultado con método:", metodo);
    }
}

// Guardar el orden original de las ventas
const ordenOriginal = ventas.map(venta => venta.id);

// Crear arreglos de prueba
const unaVenta = [ventas[0]];
const sinVentas = [];

// Verificar total vendido
console.log("\n--- TOTAL VENDIDO ---");

verificar(
    "Total completo",
    totalVendido(ventas),
    totalVendidoM(ventas)
);

verificar(
    "Total de una venta",
    totalVendido(unaVenta),
    totalVendidoM(unaVenta)
);

verificar(
    "Total vacío",
    totalVendido(sinVentas),
    totalVendidoM(sinVentas)
);

// Verificar unidades vendidas
console.log("\n--- UNIDADES VENDIDAS ---");

verificar(
    "Unidades completas",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);

verificar(
    "Unidades de una venta",
    unidadesVendidas(unaVenta),
    unidadesVendidasM(unaVenta)
);

verificar(
    "Unidades vacío",
    unidadesVendidas(sinVentas),
    unidadesVendidasM(sinVentas)
);

// Verificar ventas por ciudad
console.log("\n--- VENTAS POR CIUDAD ---");

const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"];

for (const ciudad of ciudades) {

    verificar(
        "Ventas en " + ciudad,
        ventasPorCiudad(ventas, ciudad),
        ventasPorCiudadM(ventas, ciudad)
    );
}

// Verificar los casos de una venta y arreglo vacío
verificar(
    "Ciudad con una venta",
    ventasPorCiudad(unaVenta, "Medellín"),
    ventasPorCiudadM(unaVenta, "Medellín")
);

verificar(
    "Ciudad con arreglo vacío",
    ventasPorCiudad(sinVentas, "Medellín"),
    ventasPorCiudadM(sinVentas, "Medellín")
);

// Mostrar agrupaciones por ciudad
console.log("\n--- TOTAL POR CIUDAD ---");

console.table(totalPorCiudad(ventas));

// Mostrar unidades por producto
console.log("\n--- UNIDADES POR PRODUCTO ---");

console.table(unidadesPorProducto(ventas));

// Mostrar los tres productos que más dinero generaron
console.log("\n--- TOP 3 PRODUCTOS POR VALOR ---");

console.table(topProductosPorValor(ventas, 3));

// Comprobar que las ventas conservan su orden original
const ordenFinal = ventas.map(venta => venta.id);

verificar(
    "Orden original de las ventas",
    ordenOriginal,
    ordenFinal
);