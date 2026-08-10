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

        # Email notification sent to me
        notification_params = {
            "from": f"Portfolio Contact <{os.environ.get('SENDER_EMAIL')}>",
            "to": [os.environ.get("NOTIFICATION_EMAIL")],
            "reply_to": data.get("email"),
            "subject": data.get("subject", "New Contact Submission"),
            "html": f"""
                <h2>New Contact Submission</h2>

                <p><strong>Name:</strong> {data.get('name')}</p>
                <p><strong>Email:</strong> {data.get('email')}</p>
                <p><strong>Subject:</strong> {data.get('subject')}</p>
                <p><strong>Message:</strong></p>
                <p>{data.get('message')}</p>
            """
        }

        resend.Emails.send(notification_params)

        # Confirmation email sent to the client
        confirmation_params = {
            "from": f"John Carlo R. Calubiran <{os.environ.get('SENDER_EMAIL')}>",
            "to": [data.get("email")],
            "reply_to": os.environ.get("NOTIFICATION_EMAIL"),
            "subject": f"Thank you for reaching out, {data.get('name')}",
            "html": f"""
                <p>Hi {data.get('name')},</p>

                <p>
                    Thank you for reaching out. I've received your message
                    and appreciate you taking the time to get in touch.
                </p>

                <p>
                    I'll review the details and get back to you as soon as
                    possible, typically within 24 hours.
                </p>

                <p>
                    Best regards,<br>
                    <strong>John Carlo R. Calubiran</strong><br>
                    HighLevel &amp; Automation Specialist
                </p>
            """
        }

        resend.Emails.send(confirmation_params)

        return {
            "success": True,
            "message": "Message sent successfully"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))