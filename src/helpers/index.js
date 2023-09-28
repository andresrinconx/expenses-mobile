export const formatearCantidad = (cantidad) => {
  return Number(cantidad).toLocaleString('en-US', 
  {
    style: 'currency',
    currency: 'USD',
  })
}

export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };
  return fechaNueva.toLocaleDateString('es-ES', opciones) // la fecha con los milisegundos y eso pero convertida con las opciones, etc
}

export const generarId = () => {
  // Math.random() Genera un número aleatorio entre 0 y 1.
  // .toString(36) Convierte el número aleatorio en una cadena base-36. Esto significa que la cadena resultante solo contiene caracteres alfanuméricos (0-9 y a-z).
  // .substring(2, 11) Extrae una subcadena de la cadena base-36 que comienza en el índice 2 y termina en el índice 11 (exclusivo). Esto significa que la cadena resultante contiene 9 caracteres.
  const random = Math.random().toString(36).substring(2, 11);
  const fecha = Date.now().toString(36);

  return random + fecha // concatema el resultado de random con el resultado de fecha y lo retorna
}