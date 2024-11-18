const Namekian = require('../src/Namekian');

describe('Clase Namekian', () => {
  let namekian;

  beforeEach(() => {
    namekian = new Namekian('Piccolo', 80, 85, 70, 100); // Añadimos el parámetro 'salud' en el constructor
  });

  test('Creación de Namekian con atributos correctos', () => {
    expect(namekian.getNombre()).toBe('Piccolo');
    expect(namekian.getVelocidad()).toBe(80);
    expect(namekian.getAtaque()).toBe(85);
    expect(namekian.getDefensa()).toBe(70);
    expect(namekian.getSalud()).toBe(100);
    expect(namekian.regenerado).toBe(false);
  });

  test('Regenerar salud cuando la salud está por debajo de 50', () => {
    namekian.recibirDanio(60); // Salud queda en 40
    namekian.regenerarSalud();

    expect(namekian.getSalud()).toBe(70); // 40 + 30
    expect(namekian.regenerado).toBe(true);
  });

  test('No puede regenerar salud más de una vez', () => {
    namekian.recibirDanio(60); // Salud queda en 40
    namekian.regenerarSalud();
    namekian.recibirDanio(10); // Salud queda en 60
    namekian.regenerarSalud(); // Intentar regenerar de nuevo

    expect(namekian.getSalud()).toBe(60); // No se regenera de nuevo
    expect(namekian.regenerado).toBe(true);
  });

  test('No puede regenerar salud si la salud está por encima de 50', () => {
    namekian.recibirDanio(49);
    namekian.regenerarSalud(); // Intentar regenerar sin necesidad

    expect(namekian.getSalud()).toBe(51); // No se regenera
    expect(namekian.regenerado).toBe(false);
  });

  test('No puede regenerar salud cuando la salud está exactamente en 50', () => {
    namekian.recibirDanio(50); // Salud queda en 50
    namekian.regenerarSalud();

    expect(namekian.getSalud()).toBe(50); // No se debe regenerar en este caso
    expect(namekian.regenerado).toBe(false);
  });

  test('Recibir daño reduce correctamente la salud', () => {
    namekian.recibirDanio(30); // Salud queda en 70
    expect(namekian.getSalud()).toBe(70);

    namekian.recibirDanio(20); // Salud queda en 50
    expect(namekian.getSalud()).toBe(50);
  });

  test('No puede regenerar salud si ya ha usado la regeneración aunque la salud caiga de nuevo bajo 50', () => {
    namekian.recibirDanio(60); // Salud queda en 40
    namekian.regenerarSalud(); // Regenera una vez
    expect(namekian.getSalud()).toBe(70);

    namekian.recibirDanio(30); // Salud baja a 40 nuevamente
    namekian.regenerarSalud(); // Intentar regenerar de nuevo

    expect(namekian.getSalud()).toBe(40); // No debería regenerarse de nuevo
    expect(namekian.regenerado).toBe(true);
  });

  test('Verificar que la regeneración sólo ocurre cuando la salud es menor a 50 y no usada previamente', () => {
    namekian.recibirDanio(55); // Salud queda en 45
    namekian.regenerarSalud(); // Se debería regenerar

    expect(namekian.getSalud()).toBe(75); // 45 + 30
    expect(namekian.regenerado).toBe(true);

    namekian.recibirDanio(25); // Salud baja a 50
    namekian.regenerarSalud(); // Intentar regenerar nuevamente

    expect(namekian.getSalud()).toBe(50); // No debería regenerarse
  });
});