"""Servidor estatico para los e2e.

`python -m http.server` no aguanta la concurrencia de esta suite: los cuatro
navegadores de Playwright abren decenas de conexiones a la vez y el servidor
empieza a devolver ECONNREFUSED. En el reporte eso aparece como
`net::ERR_CONNECTION_REFUSED` en la consola de la pagina, y como los tests
fallan ante cualquier error de consola, se lee como un bug del juego.
Lo comprobamos: fallaba igual con la version anterior del service worker.

La causa es la cola de escucha, que por defecto es de cinco conexiones
(`socketserver.TCPServer.request_queue_size = 5`). Con subirla alcanza.

    python tests/servidor.py [puerto]
"""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class Servidor(ThreadingHTTPServer):
    # Lo unico que cambia respecto del modulo estandar.
    request_queue_size = 128
    daemon_threads = True


def main():
    puerto = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    handler = partial(SimpleHTTPRequestHandler, directory='.')
    with Servidor(('127.0.0.1', puerto), handler) as httpd:
        print(f'sirviendo en http://127.0.0.1:{puerto} (cola de {Servidor.request_queue_size})',
              flush=True)
        httpd.serve_forever()


if __name__ == '__main__':
    main()
