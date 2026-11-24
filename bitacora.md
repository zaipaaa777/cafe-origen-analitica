MINIRETO 1 DIA 1 SEMANA 1 TRAYECTO 2

Bitácora de Desarrollo - Módulo de Analítica de Café

1. Registro de Arquitectura y Configuración Inicial
- Decisión: Decidí modularizar el proyecto separando los datos estructurados en un archivo dedicado (src/datos.js) y la lógica de inspección en otro (src/explorar.js).
- Justificación: Lo hice para cumplir con buenas prácticas de mantenibilidad y orden, utilizando CommonJS (module.exports y require).
- Control de Versiones: Tuve un problema inicial donde Git rastreaba toda la carpeta de mi sistema, así que lo solucioné limpiando y re-inicializando el repositorio de forma local y exclusiva dentro de la carpeta del proyecto.



Pseudocódigo de Exploración 


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




 Diccionario de Datsrc/datos.js

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
- Decisión tomada: Aplicar una transformación de normalización (convertir todo a mayúsculas y asegurar un estándar de prefijos) para unificar la identidad de cada cliente de forma confiable.

MINIRETO 2 DIA 1 SEMANA 1 TRAYECTO 2

 Reto: Indicadores básicos de negocio

 1. Plan de trabajo en pseudocódigo

Antes de comenzar a programar, organicé los pasos que voy a seguir para calcular cada indicador utilizando ciclos manuales.

1.1. Función valorVenta(venta)

- Recibir un registro de venta.
- Multiplicar la cantidad por el precio.
- Retornar el resultado de la multiplicación.

1.2. Función totalVendido(ventas)

- Recorrer todos los registros del arreglo utilizando un ciclo.
- Iniciar un acumulador en cero.
- Calcular el valor de cada venta.
- Sumar cada resultado al acumulador.
- Retornar el total vendido.

1.3. Función unidadesVendidas(ventas)

- Recorrer todos los registros del arreglo.
- Iniciar un acumulador en cero.
- Sumar la cantidad de unidades de cada venta.
- Retornar el total de unidades vendidas.

1.4. Función ventaMayor(ventas)

- Recorrer todos los registros del arreglo.
- Iniciar una variable para guardar la venta mayor en null.
- Calcular el valor de cada venta.
- Comparar cada resultado con el valor de la venta mayor encontrada.
- Si es mayor, actualizar el registro guardado.
- Retornar el registro completo de la venta mayor.

1.5. Función ticketPromedio(ventas)

- Recorrer todos los registros del arreglo.
- Iniciar un acumulador en cero.
- Iniciar un contador en cero.
- Verificar que la cantidad de cada venta sea mayor que cero.
- Sumar el valor de las ventas válidas al acumulador.
- Aumentar el contador por cada venta válida.
- Dividir el acumulador entre el contador.
- Si no existen ventas válidas, retornar cero.

1.6. Función ventasPorCiudad(ventas, ciudad)

- Recorrer todos los registros del arreglo.
- Iniciar un acumulador en cero.
- Normalizar el nombre de la ciudad utilizando trim() y toLowerCase().
- Comparar la ciudad de cada venta con la ciudad recibida.
- Si coinciden, sumar el valor de la venta al acumulador.
- Retornar el total vendido en esa ciudad.

 2. Decisiones para los casos borde

Para evitar errores cuando el arreglo esté vacío, decidí lo siguiente:

| Función          | Resultado con arreglo vacío             |
| valorVenta       | No aplica, necesita un objeto de venta. |
| totalVendido     | 0                                       |
| unidadesVendidas | 0                                       |
| ventaMayor       | null                                    |
| ticketPromedio   | 0                                       |
| ventasPorCiudad  | 0                                       |

En el caso de ventaMayor, utilizo null porque no existe ningún registro que pueda considerarse como la venta más grande.

MINIRETO 3 DIA 1 SEMANA 1 TRAYECTO 2

 1. Plan de trabajo

En este segundo ejercicio voy a modificar algunos indicadores que anteriormente desarrollé con ciclos manuales. Para hacerlo utilizaré los métodos map(), filter() y reduce(), comprobando que los resultados sean iguales a los del ejercicio anterior.

También voy a implementar agrupaciones por ciudad y producto, además de un ranking de los productos que más dinero generaron.

 2. Preguntas sobre las colecciones

2.1. totalVendidoM(ventas)

- ¿Qué recorro? Todos los registros de ventas.
- ¿Qué filtro? No necesito filtrar registros.
- ¿Qué transformo? Cada venta en su valor total utilizando map().
- ¿Qué acumulo? El dinero generado por todas las ventas utilizando reduce().
- ¿Cómo agrupo? No necesito agrupar, solamente sumar los valores.

2.2. unidadesVendidasM(ventas)

- ¿Qué recorro? Todos los registros de ventas.
- ¿Qué filtro? No filtro ningún registro.
- ¿Qué transformo? Cada venta en su cantidad de unidades.
- ¿Qué acumulo? La cantidad total de unidades mediante reduce().
- ¿Cómo agrupo? No realizo agrupaciones.

2.3. ventasPorCiudadM(ventas, ciudad)

- ¿Qué recorro? Todos los registros de ventas.
- ¿Qué filtro? Las ventas que pertenecen a la ciudad solicitada.
- ¿Qué transformo? Cada venta en su valor total.
- ¿Qué acumulo? El dinero generado por las ventas de esa ciudad.
- ¿Cómo agrupo? No realizo agrupaciones, solamente selecciono una ciudad.

2.4. totalPorCiudad(ventas)

- ¿Qué recorro? Todos los registros de ventas.
- ¿Qué filtro? No elimino registros.
- ¿Qué transformo? Normalizo los nombres de las ciudades.
- ¿Qué acumulo? El dinero generado por cada ciudad.
- ¿Cómo agrupo? Utilizo un objeto como diccionario para guardar el total de cada ciudad.

2.5. unidadesPorProducto(ventas)

- ¿Qué recorro? Todos los registros de ventas.
- ¿Qué filtro? No filtro productos.
- ¿Qué transformo? Los registros en información agrupada por producto.
- ¿Qué acumulo? Las unidades vendidas de cada producto.
- ¿Cómo agrupo? Utilizo el nombre del producto como clave de un objeto.

2.6. topProductosPorValor(ventas, k)

- ¿Qué recorro? Todos los registros de ventas.
- ¿Qué filtro? No elimino registros antes de agrupar.
- ¿Qué transformo? Las ventas en totales generados por producto.
- ¿Qué acumulo? El dinero generado por cada producto.
- ¿Cómo agrupo? Utilizo un objeto como diccionario, después ordeno los resultados de mayor a menor y selecciono los primeros productos solicitados mediante `slice()`.

 3. Verificación

Voy a crear un archivo llamado verificar.js para comparar los resultados de las funciones originales con las nuevas versiones.

Si los resultados coinciden, el programa mostrará OK. Si son diferentes, mostrará DIFERENTE.

También comprobaré que el arreglo original de ventas conserve su orden después de ejecutar las funciones.