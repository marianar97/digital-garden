import os
from firebase_admin import initialize_app, credentials, firestore
from dotenv import load_dotenv

load_dotenv()

# Validate required environment variables
project_id = os.getenv('FIREBASE_PROJECT_ID')
private_key = os.getenv('FIREBASE_PRIVATE_KEY')
client_email = os.getenv('FIREBASE_CLIENT_EMAIL')

if not project_id or not private_key or not client_email:
    raise ValueError('Missing required Firebase environment variables')

# Format private key properly (handle escaped newlines)
if private_key:
    private_key = private_key.replace('\\n', '\n')

# Initialize Firebase
cred = credentials.Certificate({
    'type': 'service_account',
    'project_id': project_id,
    'private_key': private_key,
    'client_email': client_email,
    'token_uri': 'https://oauth2.googleapis.com/token',
})

initialize_app(cred)

# Get Firestore client
db = firestore.client()