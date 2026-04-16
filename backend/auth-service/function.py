"""
Auth Service: Handles user authentication via login.

Endpoints:
  POST /  — Authenticate user with email and password
"""

import json
import logging
import re
from postgres_service import get_connection
from passlib.context import CryptContext

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Password hashing context
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    """Verify a plain password against a hashed password."""
    return pwd_context.verify(plain_password, hashed_password)


def sanitize_seed_sql(sql_content):
    """Remove dump metadata statements that reference roles unavailable in Aurora."""
    sanitized_lines = []
    for line in sql_content.splitlines():
        stripped = line.strip()
        if re.match(r"^ALTER (SCHEMA|TABLE|SEQUENCE) .* OWNER TO ", stripped):
            continue
        sanitized_lines.append(line)
    return "\n".join(sanitized_lines)


def handler(event=None, context=None):
    """
    Lambda handler for authentication.

    Expects POST with JSON body: {"email": "...", "password": "..."}

    Returns:
        dict: Lambda response with statusCode, headers, and body
    """
    logger.debug("Received event: %s", event)

    headers = {"Content-Type": "application/json"}

    try:
        # Check for seeding command
        if isinstance(event, dict) and event.get("action") == "seed":
            logger.info("Starting database seeding...")
            import os
            sql_path = os.path.join(os.path.dirname(__file__), "seed.sql")
            if not os.path.exists(sql_path):
                return {"statusCode": 404, "body": json.dumps({"error": "seed.sql not found"})}

            conn = get_connection()
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT EXISTS (
                        SELECT 1
                        FROM information_schema.tables
                        WHERE table_schema = 'public' AND table_name = 'User'
                    )
                    """
                )
                user_table_exists = cur.fetchone()[0]

                if user_table_exists:
                    cur.execute('SELECT COUNT(*) FROM public."User"')
                    user_count = cur.fetchone()[0]
                    if user_count > 0:
                        logger.info("Database already seeded with %s users.", user_count)
                        return {
                            "statusCode": 200,
                            "body": json.dumps(
                                {
                                    "message": "Database already seeded",
                                    "userCount": user_count,
                                }
                            ),
                        }

            with open(sql_path, "r") as f:
                sql_content = sanitize_seed_sql(f.read())

            with conn.cursor() as cur:
                cur.execute(sql_content)

            logger.info("Database seeding completed successfully.")
            return {"statusCode": 200, "body": json.dumps({"message": "Database seeded successfully"})}

        body = json.loads(event.get("body", "{}")) if event and event.get("body") else {}
        email = body.get("email", "")
        password = body.get("password", "")

        if not email or not password:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"error": "Email and password are required"})
            }

        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute(
                'SELECT id, email, name, role, "passwordHash" FROM "User" WHERE email = %s',
                (email,)
            )
            user = cur.fetchone()

        if not user:
            return {
                "statusCode": 401,
                "headers": headers,
                "body": json.dumps({"detail": "Invalid credentials"})
            }

        user_id, user_email, user_name, user_role, password_hash = user

        if not verify_password(password, password_hash):
            return {
                "statusCode": 401,
                "headers": headers,
                "body": json.dumps({"detail": "Invalid credentials"})
            }

        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({
                "id": user_id,
                "email": user_email,
                "name": user_name,
                "role": user_role
            })
        }

    except Exception as e:
        logger.error("Auth error: %s", str(e))
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": "Authentication failed", "message": str(e)})
        }


# Local testing
if __name__ == "__main__":
    test_event = {
        "httpMethod": "POST",
        "body": json.dumps({"email": "hr@luminous.com", "password": "Tarun2004"})
    }
    print(handler(test_event))
