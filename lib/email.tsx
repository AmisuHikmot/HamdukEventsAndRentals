import nodemailer from "nodemailer"

// Create transport
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface BookingEmailData {
  customerName: string
  customerEmail: string
  eventDate: string
  eventType: string
  services: string[]
  rentals: string[]
  totalAmount: number
  bookingReference: string
}

export interface ContactEmailData {
  name: string
  email: string
  phone?: string
  message: string
}

export interface TestimonialEmailData {
  name: string
  email: string
  rating: number
  message: string
}

// Email templates
const bookingConfirmationTemplate = (data: BookingEmailData) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <title>Booking Confirmation - Hamduk Events & Rentals</title>
</head>
<body style="margin:0; padding:0; background-color:#0b0d12; font-family:'Segoe UI', Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#0b0d12;">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px; max-width:100%; background:#10131a; border:1px solid #1f2430; border-radius:16px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding:28px 24px 12px 24px; background:linear-gradient(135deg,#2563eb,#7c3aed);">
              <div style="font-size:22px; line-height:26px; color:#f3f4f6; font-weight:700;">
                🎉 Hamduk <span style="color:#facc15;">Events & Rentals</span>
              </div>
              <p style="margin:8px 0 0; font-size:14px; color:#e5e7eb;">Your booking is locked in!</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td align="center" style="padding:12px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="140">
                <tr>
                  <td style="height:6px; width:20px; background:#7c3aed; border-radius:3px;"></td>
                  <td style="width:6px;"></td>
                  <td style="height:6px; width:20px; background:#2563eb; border-radius:3px;"></td>
                  <td style="width:6px;"></td>
                  <td style="height:6px; width:20px; background:#facc15; border-radius:3px;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td align="left" style="padding:28px; color:#cbd5e1; font-size:15px; line-height:24px;">
              <h2 style="margin:0 0 12px 0; font-size:20px; font-weight:700; color:#f3f4f6;">Hi ${data.customerName}, 👋</h2>
              <p style="margin:0 0 16px;">Thanks for booking with <strong style="color:#facc15;">Hamduk Events & Rentals</strong>. Here are your booking details:</p>
              
              <div style="background:#0b0d12; border:1px solid #1f2430; border-radius:12px; padding:20px; margin-bottom:20px;">
                <p style="margin:0 0 8px;"><strong>📌 Reference:</strong> <span style="color:#facc15;">${data.bookingReference}</span></p>
                <p style="margin:0 0 8px;"><strong>📅 Event Date:</strong> ${data.eventDate}</p>
                <p style="margin:0 0 8px;"><strong>🎭 Event Type:</strong> ${data.eventType}</p>

                ${
                  data.services.length > 0
                    ? `
                <p style="margin:12px 0 6px;"><strong>🛠 Services:</strong></p>
                <ul style="margin:0; padding-left:20px;">
                  ${data.services.map((s) => `<li>${s}</li>`).join("")}
                </ul>`
                    : ""
                }

                ${
                  data.rentals.length > 0
                    ? `
                <p style="margin:12px 0 6px;"><strong>📦 Rentals:</strong></p>
                <ul style="margin:0; padding-left:20px;">
                  ${data.rentals.map((r) => `<li>${r}</li>`).join("")}
                </ul>`
                    : ""
                }

                <p style="margin-top:16px; font-size:18px; font-weight:700; color:#22c55e;">💰 Total: ₦${data.totalAmount.toLocaleString()}</p>
              </div>

              <p style="margin:0;">We’ll reach out <strong>48 hours before your event</strong> to finalize details. If you have questions, feel free to reply anytime. ✨</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px; font-size:12px; color:#6b7280;">
              <p style="margin:0;">📞 +234 XXX XXX XXXX • 📧 info@hamdukevents.com</p>
              <p style="margin:4px 0 0;">© Hamduk Events & Rentals</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

// Email sending functions
export async function sendBookingConfirmation(data: BookingEmailData) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: data.customerEmail,
      subject: `Booking Confirmation - ${data.bookingReference}`,
      html: bookingConfirmationTemplate(data),
    })

    // Also send notification to admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "admin@hamdukevents.com",
      subject: `New Booking - ${data.bookingReference}`,
      html: bookingConfirmationTemplate(data),
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending booking confirmation:", error)
    return { success: false, error }
  }
}

export async function sendContactNotification(data: ContactEmailData) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "admin@hamdukevents.com",
      subject: `New Contact Form Submission from ${data.name}`,
      html: contactNotificationTemplate(data),
    })

    // Send auto-reply to customer
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: data.email,
      subject: "Thank you for contacting Hamduk Events & Rentals",
      html: `
        <h2>Thank you for your message!</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p>Best regards,<br>Hamduk Events & Rentals Team</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending contact notification:", error)
    return { success: false, error }
  }
}

export async function sendTestimonialNotification(data: TestimonialEmailData) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "admin@hamdukevents.com",
      subject: `New Testimonial from ${data.name}`,
      html: testimonialNotificationTemplate(data),
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending testimonial notification:", error)
    return { success: false, error }
  }
}

// Export aliases for the missing exports
export const sendContactFormNotification = sendContactNotification
export const sendBookingConfirmationEmail = sendBookingConfirmation
