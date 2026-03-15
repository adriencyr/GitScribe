import json
import os
from pathlib import Path
from openai import OpenAI

CONFIG_PATH = Path.home() / ".gitscribe" / "config.json"

_client = None


def load_api_key() -> str:
    """
    Load API key with priority:
    1. Environment variable
    2. GitScribe config file
    """

    env_key = os.getenv("OPENAI_API_KEY")
    if env_key:
        return env_key

    if not CONFIG_PATH.exists():
        raise RuntimeError(
            "GitScribe is not configured.\n"
            "Run `gs setup`."
        )

    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    api_key = config.get("OPENAI_API_KEY")

    if not api_key:
        raise RuntimeError(
            "OpenAI API key not found in config.\n"
            "Run `gs setup` again."
        )

    return api_key


def get_client() -> OpenAI:
    """
    Lazily create and return the OpenAI client.
    """
    global _client

    if _client is None:
        _client = OpenAI(
            base_url="https://models.github.ai/inference",
            api_key=load_api_key()
        )

    return _client
