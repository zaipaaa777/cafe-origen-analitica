 Café Origen Analítica

 Descripción

Café Origen Analítica es un proyecto desarrollado en JavaScript y Node.js para analizar las ventas de una cafetería.

El objetivo es organizar la información de las ventas y calcular indicadores básicos de negocio que permitan conocer el comportamiento de los productos y las ciudades donde se realizan las ventas.

El proyecto utiliza arreglos de objetos, funciones, ciclos, métodos de arreglos y agrupaciones para procesar la información.

 Estructura del proyecto


cafe-origen-analitica/
│
├── src/
│   ├── datos.js
│   ├── explorar.js
│   ├── analitica.js
│   ├── verificar.js
│   └── reporte.js
│
├── bitacora.md
└── README.md


 Tecnologías utilizadas

- JavaScript.
- Node.js.
- Visual Studio Code.
- Git y GitHub.

 Cómo ejecutar el proyecto

Para ejecutar el proyecto es necesario tener Node.js instalado.

Primero se debe abrir una terminal en la carpeta principal del proyecto.

Para visualizar el reporte completo de ventas se ejecuta:

bash
node src/reporte.js


Para comprobar que los indicadores calculados con ciclos y métodos de arreglos producen los mismos resultados se ejecuta:

bash
node src/verificar.js


Para explorar los registros originales se ejecuta:

bash
node src/explorar.js


Indicadores que calcula

El proyecto permite responder las siguientes preguntas:

1. ¿Cuánto dinero se vendió en total?
2. ¿Cuántas unidades se vendieron?
3. ¿Cuál fue la venta de mayor valor?
4. ¿Cuánto dinero gasta en promedio un cliente por compra?
5. ¿Cuánto dinero se vendió en cada ciudad?
6. ¿Cuántas unidades se vendieron de cada producto?
7. ¿Cuáles son los tres productos que más dinero generaron?
8. ¿Cuánto se vendió en una fecha específica?
9. ¿Qué sucede cuando se consulta un día sin ventas?

 Funcionalidades

El proyecto contiene funciones para calcular indicadores, agrupar información por ciudad y producto, ordenar resultados y generar un reporte legible por consola.

También incluye un archivo de verificación para comparar los resultados obtenidos mediante ciclos manuales y métodos de arreglos.

 Manejo de errores

Se implementaron validaciones para evitar problemas al trabajar con arreglos vacíos y se normalizaron los nombres de las ciudades para evitar agrupaciones duplicadas.

Los valores monetarios se presentan utilizando el formato de pesos colombianos.

 Versión

Café Origen Analítica v0.1

Primera versión del motor de análisis de ventas.