// Lo que el alumno lee.
//
// El resto de los tests de integridad miran la FORMA de los datos: que el índice
// de la respuesta exista, que las tres dificultades tengan contenido, que los
// puntos sean positivos. Todo eso puede estar perfecto y la pregunta enseñar algo
// falso igual. Este archivo mira el CONTENIDO: los datos que se pueden comprobar
// contra la biología, y la coherencia del banco consigo mismo.
import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { loadGame } = require('../helpers/load-game');

const { MINIGAMES_ALL } = loadGame();
const DIFICULTADES = ['easy', 'normal', 'hard'];

/** Todo el texto del banco, con su procedencia, para poder decir dónde está el error. */
function textos() {
  const out = [];
  const meter = (donde, txt) => { if (typeof txt === 'string') out.push([donde, txt]); };
  for (const [org, porDif] of Object.entries(MINIGAMES_ALL)) {
    for (const dif of DIFICULTADES) {
      (porDif[dif] || []).forEach((it, i) => {
        const donde = `${org}.${dif}[${i}]`;
        meter(donde, it.q); meter(donde, it.s); meter(donde, it.a); meter(donde, it.cor);
        (it.opts || []).forEach((o, j) => meter(`${donde}.opts[${j}]`, o));
        (it.words || []).forEach((w, j) => meter(`${donde}.words[${j}]`, w));
        (it.items || []).forEach((sub, j) =>
          meter(`${donde}.items[${j}]`, typeof sub === 'string' ? sub : sub.t));
      });
    }
  }
  return out;
}

const TODO = textos();

/** Las apariciones de un patrón, con la ruta del dato donde aparece. */
function buscar(patron) {
  return TODO.filter(([, txt]) => patron.test(txt)).map(([donde, txt]) => `${donde}: ${txt.slice(0, 90)}`);
}

/**
 * La cápsula de ácido hialurónico no es del neumococo.
 *
 * La pregunta decía «la cápsula de Streptococcus pneumoniae tipo 3 (ácido hialurónico)» y la
 * respuesta correcta explicaba que el hialurónico mimetiza el tejido conectivo del hospedero.
 * La explicación es buena y el mecanismo es real — pero es de **Streptococcus pyogenes**. La
 * cápsula del neumococo tipo 3 es un polímero de glucosa y ácido glucurónico, y su evasión
 * funciona por otra vía: carga negativa que repele al fagocito.
 *
 * El mecanismo del mimetismo molecular vale la pena enseñarlo, así que lo que se corrige es el
 * organismo, no la respuesta.
 */
describe('la cápsula bacteriana', () => {
  it('el ácido hialurónico se le atribuye a la bacteria que lo tiene', () => {
    const mal = TODO.filter(([, t]) => /hialur[óo]nico/i.test(t) && /pneumoniae/i.test(t))
      .map(([donde]) => donde);
    expect(mal, 'la cápsula de hialurónico es de S. pyogenes, no de S. pneumoniae').toEqual([]);
  });

  it('y sigue estando el ejemplo, que es lo que se enseña', () => {
    expect(buscar(/hialur[óo]nico/i).length).toBeGreaterThan(0);
    expect(buscar(/pyogenes/i).length).toBeGreaterThan(0);
  });
});

/**
 * Un distractor que también responde la pregunta.
 *
 * «¿Qué secuencia señal (PTS) dirige proteínas al interior del peroxisoma?» tenía como correcta
 * la PTS1 y, entre las incorrectas, «PTS2: secuencia N-terminal reconocida por Pex7p». La PTS2
 * existe, la reconoce Pex7p y dirige proteínas al peroxisoma: es una respuesta correcta marcada
 * como error. El alumno que sabe más se equivoca, que es exactamente al revés de lo que un
 * cuestionario debería premiar.
 *
 * La pregunta se acota a la vía mayoritaria para que su respuesta sea una sola.
 */
describe('las señales del peroxisoma', () => {
  it('la pregunta de PTS admite una sola respuesta', () => {
    const item = MINIGAMES_ALL.peroxisome.hard.find((i) => i.type === 'quiz' && /peroxisoma/i.test(i.q) && /señal/i.test(i.q));
    expect(item, 'la pregunta de PTS desapareció').toBeTruthy();
    const otras = item.opts.filter((_, i) => i !== item.ans);
    const tambienCiertas = otras.filter((o) => /PTS2.*Pex7/i.test(o));
    expect(tambienCiertas,
      'la PTS2 también dirige proteínas al peroxisoma: no puede ser el distractor de esta pregunta')
      .toEqual([]);
  });
});

/**
 * El linfocito T no tiene sarcolema.
 *
 * «STIM1 detecta el vaciamiento del RE y activa los canales Orai1 en el sarcolema» está en el
 * set del linfocito T. El sarcolema es la membrana de la fibra muscular; el mecanismo (SOCE) es
 * correcto y ocurre en la membrana plasmática. Es una palabra arrastrada del set del miocito, y
 * el alumno que la aprenda así va a usarla mal en cualquier otra célula.
 */
describe('cada término en su célula', () => {
  it('«sarcolema» sólo aparece donde hay fibra muscular', () => {
    const fuera = TODO
      .filter(([donde, t]) => /sarcolema/i.test(t) && !/^(myocyte|sarcomere|myofibril|t_tubule|sr|terminal_cisterna|mito_m|glycogen_m|myoglobin|neuromuscular_jn|nucleus_m)/.test(donde))
      .map(([donde]) => donde);
    expect(fuera, 'el sarcolema es la membrana de la fibra muscular').toEqual([]);
  });
});

/**
 * Los nombres propios de la biología, escritos como se escriben.
 *
 * No son erratas de estilo: son los términos que el alumno va a buscar después. «Márgum» no
 * existe —es el **margo** de la punteadura areolada—, «miconuclear» no existe —el volumen que
 * controla cada núcleo de la fibra es el dominio **mionuclear**— y la proteína que recubre la
 * gota lipídica es la **perilipina**. Buscar cualquiera de los tres no encuentra nada.
 */
describe('los términos técnicos', () => {
  const MAL = [
    [/m[áa]rgum/i, 'margo (punteadura areolada)'],
    [/miconuclear/i, 'mionuclear'],
    [/perilinina/i, 'perilipina'],
    [/ribosmico/i, 'ribosómico'],
    [/transsduce/i, 'transduce'],
    [/enlargeciendo/i, 'agrandando'],
  ];

  for (const [patron, correcto] of MAL) {
    it(`no dice «${patron.source}» donde va «${correcto}»`, () => {
      expect(buscar(patron)).toEqual([]);
    });
  }
});

/**
 * Y el banco no se contradice a sí mismo.
 *
 * El axón decía en un item «hasta 1 metro» y en otro, de la misma organela, «más de un metro».
 * Las dos afirmaciones son sobre el mismo dato y el alumno las ve en la misma sesión.
 */
describe('el banco es coherente consigo mismo', () => {
  it('la longitud del axón se dice de una sola manera', () => {
    const items = DIFICULTADES.flatMap((d) => MINIGAMES_ALL.axon[d] || []);
    const dice = JSON.stringify(items);
    const tope = /hasta\s+1\s+metro|hasta\s+___\s+metro/i.test(dice) && /m[áa]s de un metro/i.test(dice);
    expect(tope, 'un item dice «hasta 1 metro» y otro «más de un metro»').toBe(false);
  });
});
