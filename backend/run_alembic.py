import os
import subprocess
import sys

os.environ['ENVIRONMENT'] = 'production'
os.environ['DATABASE_URL'] = 'postgresql+psycopg://mira:mira@localhost:5432/mira'
os.environ['SECRET_KEY'] = 'prod-secret'
os.environ['FRONTEND_URL'] = 'https://example.com'
os.environ['CORS_ORIGINS'] = 'https://example.com'

cmd = [r'C:\Users\mirap\Downloads\mira\.venv\Scripts\python.exe', '-m', 'alembic', 'upgrade', 'head']
result = subprocess.run(cmd, cwd=r'C:\Users\mirap\Downloads\mira\backend', capture_output=True, text=True)
print(result.stdout)
print(result.stderr)
print('EXIT', result.returncode)
