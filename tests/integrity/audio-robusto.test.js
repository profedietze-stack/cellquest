// La musica es de adorno y no puede tirar el juego.
//
// Tone.js rechaza ("Start time must be strictly greater than previous start time") un disparo
// que cae en el mismo instante que el anterior, algo que pasa cuando el transporte se atrasa
// con la maquina cargada. Sale de un callback de audio, llega a window.onerror y el banner
// rojo de errores le tapa la pantalla al alumno. Cada secuencia de la musica tiene que
// atrapar el error de su propia nota.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = require('path');
const { RAIZ } = require('./sello.js');

const audio = readFileSync(path.join(RAIZ, 'js', 'components', 'audio.js'), 'utf8');

describe('audio: la musica no tira errores al banner', () => {
  it('hay secuencias de musica que revisar', () => {
    expect((audio.match(/new Tone\.Sequence\(/g) || []).length).toBeGreaterThanOrEqual(4);
  });

  it('todas las secuencias envuelven su callback en _nota (try/catch)', () => {
    const todas = (audio.match(/new Tone\.Sequence\(/g) || []).length;
    const envueltas = (audio.match(/new Tone\.Sequence\(_nota\(/g) || []).length;
    expect(envueltas, `${todas - envueltas} secuencia(s) sin proteger`).toBe(todas);
  });

  it('_nota atrapa lo que tire la nota', () => {
    const m = audio.match(/const _nota=fn=>\(time,v\)=>\{try\{fn\(time,v\);\}catch\(e\)\{\}\};/);
    expect(m, 'no se encontro la definicion de _nota').not.toBeNull();
    const _nota = new Function(`${m[0]} return _nota;`)();
    const tira = () => { throw new Error('Start time must be strictly greater than previous start time'); };
    expect(() => _nota(tira)(1, 2)).not.toThrow();
  });
});
