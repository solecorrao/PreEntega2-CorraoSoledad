//Agenda de cumpleaños personal: Es posible agregar contactos incluyendo: Nombre, fecha de cumpleaños y cálculo de edad. Además de agregar, se puede buscar, eliminar contacto y salir del programa. 

const agenda = [];

function esNumero(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function esFormatoFechaValido(fecha) {
  const formatoFecha = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!formatoFecha.test(fecha)) {
    alert('El formato de fecha debe ser dd/mm/aaaa y contener solo números.');
    return false;
  }

  const [dia, mes, anio] = fecha.split('/');

  if (!esNumero(dia) || !esNumero(mes) || !esNumero(anio)) {
    alert('La fecha debe contener solo números.');
    return false;
  }

  const diaNum = parseInt(dia, 10);
  const mesNum = parseInt(mes, 10);
  const anioNum = parseInt(anio, 10);

  // Para verificar si es una fecha válida:
  const fechaValida = new Date(anioNum, mesNum - 1, diaNum);
  if (
    fechaValida.getFullYear() !== anioNum ||
    fechaValida.getMonth() + 1 !== mesNum ||
    fechaValida.getDate() !== diaNum
  ) {
    alert('La fecha ingresada no es válida. Verificá y volvé a intentarlo.');
    return false;
  }

  return true;
}

// Ahora vamos a calcular la edad del contacto agregado
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const fechaNacimientoSplit = fechaNacimiento.split('/');
  const anioNacimiento = parseInt(fechaNacimientoSplit[2], 10);
  const anios = hoy.getFullYear() - anioNacimiento;

  return anios;
}

// Vamos a incorporar toda la info del contacto a agregar, validando los campos:
function agregarContacto() {
  let nombre = prompt('Ingresá el nombre:');
  while (!nombre || esNumero(nombre)) {
    alert('El nombre no puede estar vacío y debe contener al menos una letra.');
    nombre = prompt('Ingresá el nombre:');
  }

  let fechaNacimiento = prompt('Ingresá la fecha de nacimiento (formato: dd/mm/aaaa):');
  while (!esFormatoFechaValido(fechaNacimiento)) {
    fechaNacimiento = prompt('Ingresá la fecha de nacimiento nuevamente (formato: dd/mm/aaaa):');
  }

  const contacto = {
    nombre,
    fechaNacimiento
  };

  agenda.push(contacto);

  const edad = calcularEdad(fechaNacimiento);

  alert(`Contacto agregado:\nNombre: ${nombre}\nFecha de nacimiento: ${fechaNacimiento}\nEdad: ${edad} años`);
}

// Función para buscar un contacto agendado
function buscarContacto() {
  const nombreABuscar = prompt('Ingresá el nombre del contacto que querés buscar:').toLowerCase();
  const encontrado = agenda.find(contacto => contacto.nombre.toLowerCase() === nombreABuscar);

  if (encontrado) {
    const edad = calcularEdad(encontrado.fechaNacimiento);
    alert(`Contacto encontrado:\nNombre: ${encontrado.nombre}\nFecha de nacimiento: ${encontrado.fechaNacimiento}\nEdad: ${edad} años`);
  } else {
    alert('Contacto no encontrado.');
  }
}

// Función para eliminar un contacto agendado
function eliminarContacto() {
  const nombreAEliminar = prompt('Ingresá el nombre del contacto a eliminar:').toLowerCase();
  const indice = agenda.findIndex(contacto => contacto.nombre.toLowerCase() === nombreAEliminar);

  if (indice !== -1) {
    const contactoEliminado = agenda.splice(indice, 1);
    alert(`Contacto eliminado:\nNombre: ${contactoEliminado[0].nombre}\nFecha de nacimiento: ${contactoEliminado[0].fechaNacimiento}`);
  } else {
    alert('Contacto no encontrado.');
  }
}

// Función para mostrar el menú de opciones de la agenda
function mostrarMenu() {
  const opcion = prompt(
    'Seleccioná una opción:\n' +
    '1. Agregar contacto\n' +
    '2. Buscar contacto\n' +
    '3. Eliminar contacto\n' +
    '4. Salir'
  );

  switch (opcion) {
    case '1':
      agregarContacto();
      break;
    case '2':
      buscarContacto();
      break;
    case '3':
      eliminarContacto();
      break;
    case '4':
      alert('Saliendo de tu agenda, Sole.\nHasta la próxima!');
      return;
    default:
      alert('Opción inválida. Intentá de nuevo.');
  }

  mostrarMenu();
}

mostrarMenu();
