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

        # Send notification to you
        resend.Emails.send(params)

        # Send confirmation to the client
        confirmation_params = {
            "from": os.environ.get("SENDER_EMAIL"),
            "to": [data.get("email")],
            "subject": "I've Received Your Inquiry",
            "html": f"""
                <h2>Thank you for reaching out, {data.get('name')}.</h2>

                <p>I've received your inquiry and appreciate you taking the time to get in touch.</p>

                <p>I'll review the details and get back to you as soon as possible, typically within 24 hours.</p>

                <p><strong>Your message:</strong></p>
                <p>{data.get('message')}</p>

                <br>

                <p>Best regards,<br>
                <strong>John Carlo R. Calubiran</strong><br>
                Automation Specialist</p>
            """
        }

        resend.Emails.send(confirmation_params)

        return {
            "success": True,
            "message": "Message sent successfully"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))