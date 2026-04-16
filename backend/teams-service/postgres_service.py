"""
PostgreSQL database configuration and connection management.

This module handles PostgreSQL connection pooling using module-level variables
to reuse connections across Lambda invocations, improving performance and reducing
cold start time.
"""

import os
from psycopg import connect

# Module-level PostgreSQL connection for connection pooling across Lambda invocations
PG_CONN = None

def build_pg_config():
    """Build a PostgreSQL connection string from environment variables."""
    is_local = os.getenv("IS_LOCAL", "true").lower() == "true"

    host = os.getenv("POSTGRES_HOST", "localhost")
    port = os.getenv("POSTGRES_PORT", "5432")

    if is_local:
        user = os.getenv("POSTGRES_USER", "postgres")
        password = os.getenv("POSTGRES_PASS", "postgres123")
        dbname = os.getenv("POSTGRES_NAME", "postgres")
    else:
        required_vars = {
            "POSTGRES_USER": os.getenv("POSTGRES_USER"),
            "POSTGRES_PASS": os.getenv("POSTGRES_PASS"),
            "POSTGRES_NAME": os.getenv("POSTGRES_NAME"),
        }
        missing = [key for key, value in required_vars.items() if not value]
        if missing:
            raise RuntimeError(
                f"Missing required PostgreSQL environment variables for cloud mode: {', '.join(missing)}"
            )

        user = required_vars["POSTGRES_USER"]
        password = required_vars["POSTGRES_PASS"]
        dbname = required_vars["POSTGRES_NAME"]

    config = (
        f"host={host} "
        f"port={port} "
        f"user={user} "
        f"password={password} "
        f"dbname={dbname} "
        "connect_timeout=15"
    )

    if not is_local:
        config += " sslmode=require"

    return config

def get_connection():
    """
    Returns a reusable PostgreSQL connection.

    Connection pooling strategy:
    - First invocation: Creates a new connection and stores it in PG_CONN
    - Subsequent invocations: Reuses the existing connection if still open
    - On error: Resets PG_CONN to None to force reconnection on next invocation

    Returns:
        psycopg.Connection: An active PostgreSQL connection

    Raises:
        Exception: If connection fails
    """
    global PG_CONN
    try:
        if PG_CONN is None or PG_CONN.closed:
            PG_CONN = connect(build_pg_config(), autocommit=True)
        return PG_CONN
    except Exception as e:
        print("PostgreSQL connection error: %s", str(e))
        PG_CONN = None
        raise
