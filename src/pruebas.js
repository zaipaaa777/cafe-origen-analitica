const { ventas } = require("./datos");

const {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad
} = require("./analitica");

// Arreglo de una sola venta
const unaVenta = [ventas[0]];

// Arreglo vacío
const sinVentas = [];

// Probar valorVenta con un registro
console.log("Valor de una venta:", valorVenta(ventas[0]));

// Probar totalVendido
console.log("\nTOTAL VENDIDO");
console.log("Completo:", totalVendido(ventas));
console.log("Una venta:", totalVendido(unaVenta));
console.log("Vacío:", totalVendido(sinVentas));

// Probar unidadesVendidas
console.log("\nUNIDADES VENDIDAS");
console.log("Completo:", unidadesVendidas(ventas));
console.log("Una venta:", unidadesVendidas(unaVenta));
console.log("Vacío:", unidadesVendidas(sinVentas));

// Probar ventaMayor
console.log("\nVENTA MAYOR");
console.log("Completo:", ventaMayor(ventas));
console.log("Una venta:", ventaMayor(unaVenta));
console.log("Vacío:", ventaMayor(sinVentas));

// Probar ticketPromedio
console.log("\nTICKET PROMEDIO");
console.log("Completo:", ticketPromedio(ventas));
console.log("Una venta:", ticketPromedio(unaVenta));
console.log("Vacío:", ticketPromedio(sinVentas));

// Probar ventasPorCiudad
console.log("\nVENTAS POR CIUDAD");
console.log("Completo:", ventasPorCiudad(ventas, "Medellín"));
console.log("Una venta:", ventasPorCiudad(unaVenta, "Medellín"));
console.log("Vacío:", ventasPorCiudad(sinVentas, "Medellín"));