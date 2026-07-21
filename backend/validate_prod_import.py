import os
import sys

os.environ['ENVIRONMENT'] = 'production'
os.environ['DATABASE_URL'] = 'sqlite:///./mira-prod.db'
os.environ['SECRET_KEY'] = 'prod-secret'
os.environ['FRONTEND_URL'] = 'https://example.com'
os.environ['CORS_ORIGINS'] = 'https://example.com'

sys.path.insert(0, '.')
from app.main import create_app

create_app()
print('APP_OK')
