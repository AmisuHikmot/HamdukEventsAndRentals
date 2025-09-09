import nodemailer from "nodemailer"

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Email templates
export const emailTemplates = {
  bookingConfirmation: (data: any) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Confirmation - Hamduk Events & Rentals</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #e11d48; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .booking-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .highlight { color: #e11d48; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmation</h1>
          <p>Hamduk Events & Rentals</p>
        </div>
        <div class="content">
          <h2>Dear ${data.customerName},</h2>
          <p>Thank you for choosing Hamduk Events & Rentals! We have received your booking request and our team will contact you within 24 hours.</p>
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <p><strong>Booking Number:</strong> <span class="highlight">${data.bookingNumber}</span></p>
            <p><strong>Event Type:</strong> ${data.eventType}</p>
            <p><strong>Event Date:</strong> ${data.eventDate}</p>
            <p><strong>Event Time:</strong> ${data.eventTime}</p>
            <p><strong>Guest Count:</strong> ${data.guestCount}</p>
            <p><strong>Location:</strong> ${data.location || "To be determined"}</p>
            <p><strong>Services:</strong> ${data.services.join(", ")}</p>
            <p><strong>Estimated Cost:</strong> <span class="highlight">₦${data.estimatedCost?.toLocaleString()}</span></p>
          </div>

          <p>Our event planning team will review your requirements and contact you to discuss:</p>
          <ul>
            <li>Detailed event planning and timeline</li>
            <li>Final pricing and payment options</li>
            <li>Equipment and service availability</li>
            <li>Any special requirements or customizations</li>
          </ul>

          <p>If you have any immediate questions, please don't hesitate to contact us at:</p>
          <p>📞 Phone: +234 XXX XXX XXXX<br>
          📧 Email: info@hamdukevents.com</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Hamduk Events & Rentals. All rights reserved.</p>
          <p>Making your events memorable, one celebration at a time.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  contactNotification: (data: any) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #e11d48; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .contact-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="contact-details">
            <h3>Contact Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,

  testimonialNotification: (data: any) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Testimonial Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #e11d48; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .testimonial-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .rating { color: #fbbf24; font-size: 18px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Testimonial Submission</h1>
        </div>
        <div class="content">
          <div class="testimonial-details">
            <h3>Testimonial Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Event Type:</strong> ${data.event_type}</p>
            <p><strong>Event Date:</strong> ${data.event_date}</p>
            <p><strong>Rating:</strong> <span class="rating">${"★".repeat(data.rating)}${"☆".repeat(5 - data.rating)}</span> (${data.rating}/5)</p>
            <p><strong>Testimonial:</strong></p>
            <p>${data.testimonial}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
}

// Send booking confirmation email
export async function sendBookingConfirmation(bookingData: any) {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: bookingData.customerEmail,
      subject: `Booking Confirmation - ${bookingData.bookingNumber}`,
      html: emailTemplates.bookingConfirmation(bookingData),
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("Booking confirmation email sent:", result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error("Error sending booking confirmation email:", error)
    return { success: false, error: error.message }
  }
}

// Send contact form notification
export async function sendContactNotification(contactData: any) {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Send to admin
      subject: `New Contact Form Submission from ${contactData.name}`,
      html: emailTemplates.contactNotification(contactData),
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("Contact notification email sent:", result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error("Error sending contact notification email:", error)
    return { success: false, error: error.message }
  }
}

// Send testimonial notification
export async function sendTestimonialNotification(testimonialData: any) {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Send to admin
      subject: `New Testimonial from ${testimonialData.name}`,
      html: emailTemplates.testimonialNotification(testimonialData),
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("Testimonial notification email sent:", result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error("Error sending testimonial notification email:", error)
    return { success: false, error: error.message }
  }
}

// Aliases for backward compatibility
export const sendBookingConfirmationEmail = sendBookingConfirmation
export const sendContactFormNotification = sendContactNotification

// Export default email service
export default {
  sendBookingConfirmation,
  sendContactNotification,
  sendTestimonialNotification,
  sendBookingConfirmationEmail,
  sendContactFormNotification,
}
