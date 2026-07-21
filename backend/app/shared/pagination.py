"""Simple pagination helpers for API responses."""

from typing import Any, Sequence


def paginate(items: Sequence[Any], *, page: int = 1, page_size: int = 20) -> dict[str, Any]:
    total = len(items)
    start = (page - 1) * page_size
    end = start + page_size
    return {
        "items": list(items[start:end]),
        "page": page,
        "page_size": page_size,
        "total": total,
    }
