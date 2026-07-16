from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from socketserver import ThreadingMixIn


class QuietOcaHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/favicon.ico":
            self.send_response(HTTPStatus.NO_CONTENT)
            self.end_headers()
            return
        try:
            super().do_GET()
        except BrokenPipeError:
            pass

    def handle_one_request(self):
        try:
            super().handle_one_request()
        except BrokenPipeError:
            pass


class QuietThreadingHTTPServer(ThreadingHTTPServer):
    daemon_threads = True


if __name__ == "__main__":
    server_address = ("0.0.0.0", 4173)
    with QuietThreadingHTTPServer(server_address, QuietOcaHandler) as httpd:
        print("Serving Oca 111 on http://0.0.0.0:4173/", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("Servidor detenido.", flush=True)
