MINIRETO 1 DIA 1 SEMANA 1 TRAYECTO 2

Bitácora de Desarrollo - Módulo de Analítica de Café

1. Registro de Arquitectura y Configuración Inicial
- Decisión: Decidí modularizar el proyecto separando los datos estructurados en un archivo dedicado (src/datos.js) y la lógica de inspección en otro (src/explorar.js).
- Justificación: Lo hice para cumplir con buenas prácticas de mantenibilidad y orden, utilizando CommonJS (module.exports y require).
- Control de Versiones: Tuve un problema inicial donde Git rastreaba toda la carpeta de mi sistema, así que lo solucioné limpiando y re-inicializando el repositorio de forma local y exclusiva dentro de la carpeta del proyecto.



Pseudocódigo del Script de Exploración 


INICIOImportar la fuente de datos
Importar objeto "ventas" desde "./datos"

1. Conteo total de elementos
Mostrar "Cantidad total de registros:" + longitud del arreglo(ventas.length)

2. Acceso a extremos del arreglo (Manejo de índices)
Mostrar "Primer registro:" -> elemento en la posición 0(ventas[0])
Mostrar "Último registro:" -> elemento en la posición(longitud - 1)

3. Extracción de propiedades anidadas
Mostrar "Producto de la posición 4:" -> acceder al índice 3 yextraer la propiedad .producto

4. Renderizado visual de datos
Imprimir toda la estructura de "ventas" en formato tabular(console.table)




 Diccionario de Datsrc/datos.js)

A continuación documenté la estructura de cada propiedad de los objetos de ventas

-id(number): Identificador único y secuencial de cada registro de venta.
-fech (string): Fecha en la que se efectuó la transacción (formato YYYY-MM-DD).
-client (string): Código o identificador único asignado al cliente.
-product (string): Nombre comercial, tipo y presentación del café vendido.
-ciuda (string): Ubicación geográfica o sucursal donde se realizó la venta.
-cantida (number): Número de unidades del producto adquiridas en la transacción.
-preci (number): Valor monetario o costo registrado de la venta.



Casos Borde Detectados y Calidad de Datos

Durante la revisión inicial de la tabla, identifiqué tres problemas críticos de calidad en los datos que debo manejar en el código:

Caso Borde 3: Inconsistencias ortográficas en Ciudades
- Problema detectado: Encontré variaciones en el campo ciudad debido a faltas de tildes o diferencias de formato (por ejemplo, "Bogota" vs "Bogotá", o espacios vacíos adicionales). Esto rompería cualquier agrupación o filtro exacto.
- Decisión tomada: Estandarizar y limpiar los textos de las ciudades antes de procesarlos (por ejemplo, eliminando espacios y normalizando mayúsculas/minúsculas) para asegurar que los reportes geográficos no se dividan por errores tipográficos.

Caso Borde 4: Anomalías en las Cantidades vendidas
- Problema detectado: Revisando las cantidades, vi la posibilidad de registros con valores negativos, ceros o datos corruptos que no tienen lógica comercial en una venta real de café.
- Decisión tomada: Establecer una validación estricta de reglas de negocio que filtre o alerte sobre cualquier registro donde la cantidad sea menor o igual a 0 antes de calcular totales.
Caso Borde 5: Formatos dispares en Identificadores de Clientes
- Problema detectado: El campo cliente presenta inconsistencias en su nomenclatura (mezcla de minúsculas y mayúsculas o variaciones como "c1" frente a "C01"), lo que duplicaría artificialmente las métricas si analizara compras por cliente individual.
- Decisión tomada: Aplicar una transformación de normalización (convertir todo a mayúsculas y asegurar un estándar de prefijos) para unificar la identidad de cada cliente de forma confiabl

