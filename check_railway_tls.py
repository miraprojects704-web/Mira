import ssl
import socket

ctx = ssl.create_default_context()
for proto in ['TLSv1.2', 'TLSv1.3']:
    try:
        with socket.create_connection(('backboard.railway.com', 443), timeout=10) as sock:
            with ctx.wrap_socket(sock, server_hostname='backboard.railway.com') as ssock:
                print(proto, 'OK', ssock.version())
    except Exception as exc:
        print(proto, 'ERR', repr(exc))
