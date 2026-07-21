import urllib.request

try:
    with urllib.request.urlopen('http://127.0.0.1:8001/health', timeout=5) as response:
        print(response.read().decode())
except Exception as exc:
    print('ERR', exc)
