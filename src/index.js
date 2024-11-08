// src/index.js

const Saiyan = require('./Saiyan');
const Namekian = require('./Namekian');
const Earthling = require('./Earthling');
const Torneo = require('./Torneo');

// Crear luchadores de prueba con diferentes razas
const luchadores = [
    new Saiyan('Goku', 30, 50, 40),
    new Saiyan('Vegeta', 28, 48, 45),
    new Saiyan('Gohan', 26, 45, 38),
    new Saiyan('Trunks', 24, 42, 40),
    new Namekian('Piccolo', 25, 35, 50),
    new Namekian('Dende', 22, 30, 45),
    new Earthling('Krillin', 22, 60, 100),
    new Earthling('Yamcha', 23, 38, 33)
];

// Crear y iniciar el torneo
const torneo = new Torneo(luchadores);
const campeon = torneo.iniciar();
