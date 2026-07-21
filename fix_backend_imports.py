from pathlib import Path
import re

root = Path('backend/app')
pattern = re.compile(r'^(from|import) app(\.|\b)(.*)')
ignore = {'__pycache__'}

for path in sorted(root.rglob('*.py')):
    if any(part in ignore for part in path.parts):
        continue
    text = path.read_text(encoding='utf-8')
    new_text = text
    rel = path.relative_to(root)
    parent = rel.parent
    levels = len(parent.parts)
    base = '.' * max(1, levels)

    def repl(match):
        kind = match.group(1)
        rest = match.group(3)
        if kind == 'import':
            if rest.startswith('app.'):
                rest = rest[4:]
                return f'from {base}{rest}'
            return match.group(0)
        if rest.startswith('app.'):
            rest = rest[4:]
        if rest.startswith('core.'):
            return f'from {base}core.{rest[5:]}'
        if rest.startswith('models.'):
            return f'from {base}models.{rest[7:]}'
        if rest.startswith('schemas.'):
            return f'from {base}schemas.{rest[8:]}'
        if rest.startswith('services.'):
            return f'from {base}services.{rest[9:]}'
        if rest.startswith('repositories.'):
            return f'from {base}repositories.{rest[13:]}'
        if rest.startswith('routers.'):
            return f'from {base}routers.{rest[8:]}'
        if rest.startswith('users.'):
            return f'from {base}users.{rest[6:]}'
        if rest.startswith('notifications.'):
            return f'from {base}notifications.{rest[14:]}'
        if rest.startswith('ai.'):
            return f'from {base}ai.{rest[3:]}'
        return match.group(0)

    new_text = re.sub(pattern, repl, text, flags=re.MULTILINE)

    # fix direct "import app.models" or "import app.core" patterns
    new_text = re.sub(r'^import app\.(models|core|routers|schemas|services|repositories|users|notifications|ai)$',
                      lambda m: f'from {base}{m.group(1)} import *',
                      new_text, flags=re.MULTILINE)

    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        print('updated', path)
