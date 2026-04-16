#!/usr/bin/env python3
"""
One-time OAuth2 authorization script for Google Meet API.

Run this interactively to generate token.json:
  python authorize.py

Steps:
  1. Make sure your Google email is added as a test user in
     Google Cloud Console → APIs & Services → OAuth consent screen.
  2. Run this script.
  3. It will print a URL — open it in your browser.
  4. Sign in and authorize.
  5. Copy the authorization code back into the terminal.
  6. token.json will be saved and the meetings-service will use it
     automatically from then on.
"""

import os
import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ['https://www.googleapis.com/auth/meetings.space.created']

SERVICE_DIR = os.path.dirname(os.path.abspath(__file__))
CRED_FILES = [f for f in os.listdir(SERVICE_DIR) if f.startswith('client_secret') and f.endswith('.json')]
CREDENTIALS_FILE = os.path.join(SERVICE_DIR, CRED_FILES[0]) if CRED_FILES else os.path.join(SERVICE_DIR, 'credentials.json')
TOKEN_FILE = os.path.join(SERVICE_DIR, 'token.json')


def main():
    creds = None
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print("Refreshing expired token...")
            creds.refresh(Request())
        else:
            print(f"Using credentials: {CREDENTIALS_FILE}")
            print()
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            try:
                creds = flow.run_local_server(port=0)
            except Exception:
                print("Browser-based auth not available, using console flow...")
                print()
                creds = flow.run_console()

        with open(TOKEN_FILE, 'w') as token:
            token.write(creds.to_json())
        print()
        print(f"Token saved to {TOKEN_FILE}")

    print()
    print("Authorization successful!")
    print(f"Token valid: {creds.valid}")

    # Quick test: create a Meet space
    from google.apps import meet_v2
    client = meet_v2.SpacesServiceClient(credentials=creds)
    response = client.create_space(request=meet_v2.CreateSpaceRequest())
    print(f"Test space created: {response.meeting_uri}")


if __name__ == '__main__':
    main()
