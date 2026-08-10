import os

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import resend


resend.api_key = os.environ.get("RESEND_API_KEY")

app = FastAPI()


@app.get("/")
def root():
    return {"status": "Backend is running"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/contact")
async def contact(request: Request):
    try:
        data = await request.json()

        params = {
            "from": os.environ.get("SENDER_EMAIL"),
            "to": [os.environ.get("NOTIFICATION_EMAIL")],
            "subject": data.get("subject", "New Contact Submission"),
            "html": f"""
                <h2>New Contact Submission</h2>
                <p><strong>Name:</strong> {data.get('name')}</p>
                <p><strong>Email:</strong> {data.get('email')}</p>
                <p><strong>Subject:</strong> {data.get('subject')}</p>
                <p><strong>Message:</strong> {data.get('message')}</p>
            """
        }

        resend.Emails.send(params)

        return {
            "success": True,
            "message": "Message sent successfully"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))