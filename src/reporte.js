// Importar los datos de ventas
const { ventas } = require("./datos");

// Importar las funciones de analítica
const {
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    valorVenta,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require("./analitica");


// Dar formato a los valores en pesos colombianos
function formatoPesos(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    });
}


console.log("\n");
console.log("       CAFÉ ORIGEN - REPORTE v0.1");
console.log("");

console.log("\n1. RESUMEN GENERAL");
console.log("");

const total = totalVendido(ventas);
const unidades = unidadesVendidas(ventas);
const mayor = ventaMayor(ventas);
const promedio = ticketPromedio(ventas);

console.log(`Total vendido:       ${formatoPesos(total)}`);
console.log(`Unidades vendidas:   ${unidades}`);
console.log(`Venta más grande:    ${formatoPesos(valorVenta(mayor))}`);
console.log(`Producto:            ${mayor.producto}`);
console.log(`Ticket promedio:     ${formatoPesos(promedio)}`);


console.log("\n2. VENTAS POR CIUDAD");
console.log("");

const ciudades = totalPorCiudad(ventas);

const tablaCiudades = Object.entries(ciudades).map(([ciudad, total]) => ({
    Ciudad: ciudad,
    "Total vendido": formatoPesos(total)
}));

console.table(tablaCiudades);


console.log("\n3. UNIDADES POR PRODUCTO");
console.log("");

const productos = unidadesPorProducto(ventas);

const tablaProductos = Object.entries(productos).map(([producto, unidades]) => ({
    Producto: producto,
    "Unidades vendidas": unidades
}));

console.table(tablaProductos);


console.log("\n4. TOP 3 PRODUCTOS POR VALOR");
console.log("");

const mejoresProductos = topProductosPorValor(ventas, 3);

const tablaTop = mejoresProductos.map((producto, posicion) => ({
    Posición: posicion + 1,
    Producto: producto.producto,
    "Dinero generado": formatoPesos(producto.total)
}));

console.table(tablaTop);


// Mostrar el resumen de un día específico
function mostrarResumenDia(fecha) {

    const ventasDia = ventasDelDia(ventas, fecha);

    console.log(`\nRESUMEN DEL DÍA: ${fecha}`);
    console.log("");

    if (ventasDia.length === 0) {
        console.log("No se encontraron ventas para esta fecha.");
        console.log("Total vendido: $ 0");
        console.log("Unidades vendidas: 0");
        console.log("Ticket promedio: $ 0");
        return;
    }

    console.log(`Cantidad de ventas: ${ventasDia.length}`);
    console.log(`Total vendido: ${formatoPesos(totalVendido(ventasDia))}`);
    console.log(`Unidades vendidas: ${unidadesVendidas(ventasDia)}`);
    console.log(`Ticket promedio: ${formatoPesos(ticketPromedio(ventasDia))}`);
}

// Probar un día que tiene ventas
mostrarResumenDia("2026-09-01");

// Probar un día que no tiene ventas
mostrarResumenDia("2026-09-07");