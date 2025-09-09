import nodemailer from "nodemailer"

interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

const emailConfig: EmailConfig = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
}

const transporter = nodemailer.createTransporter(emailConfig)

interface BookingConfirmationData {
  booking: any
  payment: any
  customerEmail: string
}

export async function sendBookingConfirmationEmail(data: BookingConfirmationData) {
  const { booking, payment, customerEmail } = data

  const emailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Booking Confirmation - Hamduk Events</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #e11d48, #f43f5e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #eee; }
            .footer { text-align: center; margin-top: 30px; color: #666; }
            .button { background: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 Booking Confirmed!</h1>
                <p>Thank you for choosing Hamduk Events and Rentals</p>
            </div>
            <div class="content">
                <h2>Dear Valued Customer,</h2>
                <p>We're excited to confirm your booking! Your event is now secured and our team is ready to make it memorable.</p>
                
                <div class="booking-details">
                    <h3>Booking Details</h3>
                    <div class="detail-row">
                        <strong>Booking Number:</strong>
                        <span>${booking.booking_number}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Event Type:</strong>
                        <span>${booking.event_type || "Not specified"}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Event Date:</strong>
                        <span>${booking.event_date ? new Date(booking.event_date).toLocaleDateString() : "TBD"}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Guest Count:</strong>
                        <span>${booking.guest_count || "Not specified"}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Location:</strong>
                        <span>${booking.venue_location || "TBD"}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Total Amount:</strong>
                        <span>₦${payment.amount.toLocaleString()}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Payment Status:</strong>
                        <span style="color: green;">✅ Paid</span>
                    </div>
                </div>

                <h3>What's Next?</h3>
                <ul>
                    <li>Our event coordinator will contact you within 24 hours</li>
                    <li>We'll schedule a detailed planning session</li>
                    <li>Final arrangements will be confirmed 1 week before your event</li>
                </ul>

                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/booking/status?ref=${booking.booking_number}" class="button">
                    View Booking Status
                </a>

                <p>If you have any questions, please don't hesitate to contact us:</p>
                <p>📞 +234 818 596 8179<br>
                📧 hamdukuniqueconcept@gmail.com</p>
            </div>
            <div class="footer">
                <p>© 2024 Hamduk Events and Rentals. All rights reserved.</p>
                <p>No. 4 Dipeolu Street, Ikeja, Lagos, Nigeria</p>
            </div>
        </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: `"Hamduk Events" <${process.env.SMTP_USER}>`,
    to: customerEmail,
    subject: `Booking Confirmed - ${booking.booking_number}`,
    html: emailTemplate,
  }

  await transporter.sendMail(mailOptions)
}

export async function sendContactFormNotification(data: any) {
  const emailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #e11d48; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .detail { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
                <div class="detail">
                    <strong>Name:</strong> ${data.name}
                </div>
                <div class="detail">
                    <strong>Email:</strong> ${data.email}
                </div>
                <div class="detail">
                    <strong>Phone:</strong> ${data.phone || "Not provided"}
                </div>
                <div class="detail">
                    <strong>Subject:</strong> ${data.subject || "General Inquiry"}
                </div>
                <div class="detail">
                    <strong>Message:</strong><br>${data.message}
                </div>
                <div class="detail">
                    <strong>Submitted:</strong> ${new Date().toLocaleString()}
                </div>
            </div>
        </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
    to: "hamdukuniqueconcept@gmail.com",
    subject: `New Contact: ${data.subject || "General Inquiry"}`,
    html: emailTemplate,
  }

  await transporter.sendMail(mailOptions)
}

export async function sendTestimonialNotification(data: any) {
  const emailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Testimonial Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #e11d48; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .detail { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
            .rating { color: #fbbf24; font-size: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Testimonial Submission</h2>
            </div>
            <div class="content">
                <div class="detail">
                    <strong>Name:</strong> ${data.name}
                </div>
                <div class="detail">
                    <strong>Email:</strong> ${data.email}
                </div>
                <div class="detail">
                    <strong>Event Type:</strong> ${data.eventType || "Not specified"}
                </div>
                <div class="detail">
                    <strong>Event Date:</strong> ${data.eventDate || "Not specified"}
                </div>
                <div class="detail">
                    <strong>Rating:</strong> 
                    <span class="rating">${"★".repeat(data.rating)}${"☆".repeat(5 - data.rating)}</span>
                    (${data.rating}/5)
                </div>
                <div class="detail">
                    <strong>Testimonial:</strong><br>${data.testimonial}
                </div>
                <div class="detail">
                    <strong>Submitted:</strong> ${new Date().toLocaleString()}
                </div>
            </div>
        </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: `"Website Testimonials" <${process.env.SMTP_USER}>`,
    to: "hamdukuniqueconcept@gmail.com",
    subject: `New Testimonial from ${data.name} - ${data.rating} stars`,
    html: emailTemplate,
  }

  await transporter.sendMail(mailOptions)
}
