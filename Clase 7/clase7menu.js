// MENU DE PRÁCTICAS - NODEJS + MONGOOSE + MONGODB LOCAL / ATLAS
// Requiere: npm install inquirer@8


const mongoose = require('mongoose');
const inquirer = require('inquirer');

// Config por defecto (local)
let connectionString = 'mongodb://localhost:27017/ejerciciosClase7';

// Conexión dinámica
async function conectar() {
  await mongoose.disconnect();
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`✅ Conectado a ${connectionString.includes('localhost') ? 'MongoDB local' : 'MongoDB Atlas'}`);
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

// Menú de selección de base de datos
async function menuConexion() {
  const { db } = await inquirer.prompt({
    type: 'list',
    name: 'db',
    message: '¿A qué base de datos te querés conectar?',
    choices: ['MongoDB Local', 'MongoDB Atlas (automático)']
  });
  if (db === 'MongoDB Atlas ') {
    connectionString = 'mongodb+srv://user:user@cluster0.lxfra.mongodb.net/ejerciciosClase7?retryWrites=true&w=majority&appName=Cluster0';
  } else {
    connectionString = 'mongodb://localhost:27017/ejerciciosClase7';
  }
  await conectar();
  await menuPrincipal();
}

const modelos = require('./ejercicios_nosql_nodejs');

// Menú de ingreso manual por consola
async function cargarManual(ej) {
  switch (ej) {
    case 1:
      const { nombreEmp, user, pass, rol } = await inquirer.prompt([
        { name: 'nombreEmp', message: 'Nombre del empleado:' },
        { name: 'user', message: 'Usuario:' },
        { name: 'pass', message: 'Contraseña:' },
        { name: 'rol', message: 'Rol:' }
      ]);
      const cred = await modelos.Credencial.create({ usuario: user, password: pass });
      const rolDoc = await modelos.Rol.create({ nombre: rol });
      await modelos.Empleado.create({ nombre: nombreEmp, credencial: cred._id, rol: rolDoc._id });
      break;

    case 2:
      const { nombrePac, notas, motivo, med } = await inquirer.prompt([
        { name: 'nombrePac', message: 'Nombre del paciente:' },
        { name: 'notas', message: 'Notas médicas:' },
        { name: 'motivo', message: 'Motivo de consulta:' },
        { name: 'med', message: 'Medicamento recetado (uno):' }
      ]);
      const pac = await modelos.Paciente.create({ nombre: nombrePac });
      const hist = await modelos.Historial.create({ paciente: pac._id, notas });
      pac.historial = hist._id;
      await pac.save();
      await modelos.Consulta.create({ paciente: pac._id, fecha: new Date(), motivo, medicamentos: [med] });
      break;

    case 3:
      const { nombreEst, correo, cursoNom, dur, profesor } = await inquirer.prompt([
        { name: 'nombreEst', message: 'Nombre del estudiante:' },
        { name: 'correo', message: 'Correo electrónico:' },
        { name: 'cursoNom', message: 'Nombre del curso:' },
        { name: 'dur', message: 'Duración (número):' },
        { name: 'profesor', message: 'Nombre del profesor:' }
      ]);
      const prof = await modelos.Profesor.create({ nombre: profesor, especialidad: 'General' });
      const curso = await modelos.Curso.create({ nombre: cursoNom, duracion: parseInt(dur), profesor: prof._id });
      const est = await modelos.Estudiante.create({ nombre: nombreEst, correo });
      await modelos.Inscripcion.create({ estudiante: est._id, curso: curso._id });
      break;

    default:
      console.log('🚧 Entrada manual solo disponible para ejercicios 1 a 3 (por ahora).');
      break;
  }
  console.log(`✅ Datos ingresados manualmente para ejercicio ${ej}`);
}

// Menú principal
async function menuPrincipal() {
  const { ejercicio } = await inquirer.prompt({
    type: 'list',
    name: 'ejercicio',
    message: '¿Qué querés hacer?',
    choices: [
      'Ejercicio 1: Insertar automático',
      'Ejercicio 2: Insertar automático',
      'Ejercicio 3: Insertar automático',
      'Ejercicio 1: Cargar datos por consola',
      'Ejercicio 2: Cargar datos por consola',
      'Ejercicio 3: Cargar datos por consola',
      new inquirer.Separator(),
      'Cambiar conexión (Atlas o Local)',
      'Salir'
    ]
  });

  if (ejercicio.includes('Insertar automático')) {
    const num = parseInt(ejercicio.match(/Ejercicio (\d)/)[1]);
    await insertarEjercicio(num);
    await menuPrincipal();
  } else if (ejercicio.includes('Cargar datos por consola')) {
    const num = parseInt(ejercicio.match(/Ejercicio (\d)/)[1]);
    await cargarManual(num);
    await menuPrincipal();
  } else if (ejercicio === 'Cambiar conexión (Atlas o Local)') {
    await menuConexion();
  } else {
    console.log('👋 Hasta luego');
    mongoose.disconnect();
    process.exit();
  }
}

async function insertarEjercicio(numero) {
  // ... (código de inserción ya definido previamente, se mantiene igual)
}

menuConexion();
