// Calcular el valor total de una venta
function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

// Calcular el total vendido
function totalVendido(ventas) {
    let total = 0;

    for (const venta of ventas) {
        total += valorVenta(venta);
    }

    return total;
}

// Calcular las unidades vendidas
function unidadesVendidas(ventas) {
    let total = 0;

    for (const venta of ventas) {
        total += venta.cantidad;
    }

    return total;
}

// Encontrar la venta de mayor valor
function ventaMayor(ventas) {
    let mayor = null;

    for (const venta of ventas) {
        if (mayor === null || valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta;
        }
    }

    return mayor;
}

// Calcular el ticket promedio
function ticketPromedio(ventas) {
    let total = 0;
    let contador = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
            contador++;
        }
    }

    if (contador === 0) {
        return 0;
    }

    return total / contador;
}

function ventasPorCiudad(ventas, ciudad) {
    let total = 0;

    const ciudadBuscada = normalizarCiudad(ciudad);

    for (const venta of ventas) {
        const ciudadVenta = normalizarCiudad(venta.ciudad);

        if (ciudadVenta === ciudadBuscada) {
            total += valorVenta(venta);
        }
    }

    return total;
}

function totalVendidoM(ventas) {
    return ventas
        .map(venta => valorVenta(venta))
        .reduce((total, valor) => total + valor, 0);
}

function unidadesVendidasM(ventas) {
    return ventas
        .map(venta => venta.cantidad)
        .reduce((total, cantidad) => total + cantidad, 0);
}

function ventasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada = normalizarCiudad(ciudad);

    return ventas
        .filter(venta =>
            normalizarCiudad(venta.ciudad) === ciudadBuscada
        )
        .map(venta => valorVenta(venta))
        .reduce((total, valor) => total + valor, 0);
}

function totalPorCiudad(ventas) {

    const nombresCiudades = {
        medellin: "Medellín",
        bogota: "Bogotá",
        cali: "Cali",
        pereira: "Pereira"
    };

    return ventas.reduce((acumulador, venta) => {

        const clave = normalizarCiudad(venta.ciudad);
        const ciudad = nombresCiudades[clave] || venta.ciudad.trim();

        acumulador[ciudad] = (acumulador[ciudad] || 0) + valorVenta(venta);

        return acumulador;

    }, {});
}


function unidadesPorProducto(ventas) {

    return ventas.reduce((acumulador, venta) => {

        const producto = venta.producto;

        acumulador[producto] = (acumulador[producto] || 0) + venta.cantidad;

        return acumulador;

    }, {});
}

function topProductosPorValor(ventas, k) {

    const productos = ventas.reduce((acumulador, venta) => {

        const producto = venta.producto;

        acumulador[producto] = (acumulador[producto] || 0) + valorVenta(venta);

        return acumulador;

    }, {});

    return [...Object.entries(productos)]
        .map(([producto, total]) => ({
            producto,
            total
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, k);
}



// Normalizar los nombres de las ciudades
function normalizarCiudad(ciudad) {
    return ciudad
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}



// Exportar las funciones
module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
};

