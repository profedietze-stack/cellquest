// Los seis procesos de "Célula en Acción", contados de una sola manera.
import { describe, it, expect, beforeEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { loadGame, CORE_SCRIPTS } = require('../helpers/load-game');

// Orden real de index.html: progress.js lee lo que procesos.js publica.
const w = loadGame([...CORE_SCRIPTS, 'js/screens/progress.js', 'js/screens/procesos.js']);

/**
 * Fotosíntesis existía en los dos modos y no estaba en ninguna de las dos listas que la nombran.
 *
 * "Célula en Acción" tiene dos pestañas —Cine y Jugador— y seis procesos en cada una. Pero los
 * metadatos del Modo Jugador (`JUEGO_META_MAP`) sólo tenían cinco: al abrir el juego de
 * fotosíntesis, la pantalla de "Cómo jugar" caía al valor por defecto y titulaba la partida
 * **"fotosintesis"**, en minúscula y sin tilde, con el emoji genérico. Es la primera pantalla
 * del juego y lo que el alumno lee antes de empezar.
 *
 * Y el mismo olvido, más caro, en el logro: `checkAch` comprobaba una lista escrita a mano de
 * cinco ids, así que "Biólogo Completo — Completa todos los procesos en Cine y Jugador" se
 * desbloqueaba **sin haber tocado la fotosíntesis**. Un logro que miente sobre lo que pide es
 * peor que no tenerlo: le dice al alumno que ya terminó.
 *
 * Las dos listas eran copias de `PROCESOS_META`, que sí tenía los seis. Ahora hay una sola.
 */
describe('los procesos de Célula en Acción', () => {
  it('hay una sola lista de procesos, publicada para quien la necesite', () => {
    expect(Array.isArray(w.PROCESOS_IDS), 'PROCESOS_IDS no está publicada').toBe(true);
    expect(w.PROCESOS_IDS).toContain('fotosintesis');
    expect(w.PROCESOS_IDS).toHaveLength(6);
  });

  it('cada proceso tiene título de verdad en el Modo Jugador, no su id crudo', () => {
    const sinTitulo = w.PROCESOS_IDS.filter((id) => {
      const meta = w.metaDeJuego(id);
      return !meta || !meta.title || meta.title === id;
    });
    expect(sinTitulo, 'la pantalla "Cómo jugar" mostraría el id en bruto').toEqual([]);
  });
});

describe('el logro "Biólogo Completo"', () => {
  const conVistos = (vistos) => {
    w.localStorage.setItem('cq3_proc_seen', JSON.stringify(vistos));
    w.GS.achievements.forEach((a) => { a.unlocked = false; });
    w.showToast = () => {};   // el logro dispara un toast que necesita DOM
    w.checkAch();
    return w.GS.achievements.find((a) => a.id === 'all_procesos').unlocked;
  };

  beforeEach(() => { w.localStorage.clear(); });

  it('no se desbloquea con cinco de los seis procesos', () => {
    const cinco = {};
    for (const id of w.PROCESOS_IDS.filter((i) => i !== 'fotosintesis')) {
      cinco[id] = Date.now(); cinco['j_' + id] = Date.now();
    }
    expect(conVistos(cinco), 'falta fotosíntesis y ya decía "completo"').toBe(false);
  });

  it('y sí con los seis en los dos modos', () => {
    const todos = {};
    for (const id of w.PROCESOS_IDS) { todos[id] = Date.now(); todos['j_' + id] = Date.now(); }
    expect(conVistos(todos)).toBe(true);
  });

  it('tampoco con los seis vistos en Cine pero ninguno jugado', () => {
    const soloCine = {};
    for (const id of w.PROCESOS_IDS) soloCine[id] = Date.now();
    expect(conVistos(soloCine)).toBe(false);
  });
});
