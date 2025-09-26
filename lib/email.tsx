import nodemailer from "nodemailer"

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}

// Create transporter
const transporter = nodemailer.createTransport(emailConfig)

// Email templates
const getBookingConfirmationTemplate = (bookingData: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Booking Confirmation - Hamduk Events & Rentals</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .footer { padding: 20px; text-align: center; color: #666; }
    .booking-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
    .total { font-size: 18px; font-weight: bold; color: #dc2626; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Confirmation</h1>
      <p>Thank you for choosing Hamduk Events & Rentals!</p>
    </div>
    <div class="content">
      <h2>Dear ${bookingData.customerName || "Valued Customer"},</h2>
      <p>We're excited to confirm your booking with us. Here are the details:</p>
      
      <div class="booking-details">
        <h3>Booking Information</h3>
        <p><strong>Booking Reference:</strong> ${bookingData.reference || "N/A"}</p>
        <p><strong>Event Date:</strong> ${bookingData.eventDate || "N/A"}</p>
        <p><strong>Event Type:</strong> ${bookingData.eventType || "N/A"}</p>
        <p><strong>Venue:</strong> ${bookingData.venue || "N/A"}</p>
        <p><strong>Number of Guests:</strong> ${bookingData.guestCount || "N/A"}</p>
      </div>

      ${
        bookingData.services && bookingData.services.length > 0
          ? `
      <div class="booking-details">
        <h3>Selected Services</h3>
        <ul>
          ${bookingData.services.map((service: any) => `<li>${service.name} - ₦${service.price?.toLocaleString()}</li>`).join("")}
        </ul>
      </div>
      `
          : ""
      }

      ${
        bookingData.rentals && bookingData.rentals.length > 0
          ? `
      <div class="booking-details">
        <h3>Selected Rentals</h3>
        <ul>
          ${bookingData.rentals.map((rental: any) => `<li>${rental.name} (Qty: ${rental.quantity}) - ₦${rental.price?.toLocaleString()}</li>`).join("")}
        </ul>
      </div>
      `
          : ""
      }

      <div class="booking-details">
        <h3>Contact Information</h3>
        <p><strong>Email:</strong> ${bookingData.email || "N/A"}</p>
        <p><strong>Phone:</strong> ${bookingData.phone || "N/A"}</p>
      </div>

      <div class="booking-details">
        <p class="total">Total Amount: ₦${bookingData.totalAmount?.toLocaleString() || "0"}</p>
        <p><strong>Payment Status:</strong> ${bookingData.paymentStatus || "Pending"}</p>
      </div>

      <p>We'll be in touch soon to finalize the details of your event. If you have any questions, please don't hesitate to contact us.</p>
    </div>
    <div class="footer">
      <p>Best regards,<br>The Hamduk Events & Rentals Team</p>
      <p>Email: info@hamdukevents.com | Phone: +234 XXX XXX XXXX</p>
    </div>
  </div>
</body>
</html>
`

const getContactNotificationTemplate = (contactData: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
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
        <p><strong>Name:</strong> ${contactData.name || "N/A"}</p>
        <p><strong>Email:</strong> ${contactData.email || "N/A"}</p>
        <p><strong>Phone:</strong> ${contactData.phone || "N/A"}</p>
        <p><strong>Subject:</strong> ${contactData.subject || "N/A"}</p>
      </div>
      
      <div class="contact-details">
        <h3>Message</h3>
        <p>${contactData.message || "N/A"}</p>
      </div>

      <div class="contact-details">
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      </div>
    </div>
  </div>
</body>
</html>
`

const getTestimonialNotificationTemplate = (testimonialData: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Testimonial Submission</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .testimonial-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Testimonial Submission</h1>
    </div>
    <div class="content">
      <div class="testimonial-details">
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${testimonialData.name || "N/A"}</p>
        <p><strong>Email:</strong> ${testimonialData.email || "N/A"}</p>
        <p><strong>Event Type:</strong> ${testimonialData.eventType || "N/A"}</p>
        <p><strong>Rating:</strong> ${testimonialData.rating || "N/A"}/5 stars</p>
      </div>
      
      <div class="testimonial-details">
        <h3>Testimonial</h3>
        <p>${testimonialData.testimonial || "N/A"}</p>
      </div>

      <div class="testimonial-details">
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      </div>
    </div>
  </div>
</body>
</html>
`

// Email sending functions
export async function sendBookingConfirmationEmail(bookingData: any) {
  try {
    const mailOptions = {
      from: `"Hamduk Events & Rentals" <${process.env.SMTP_USER}>`,
      to: bookingData.email,
      subject: `Booking Confirmation - ${bookingData.reference || "Your Event"}`,
      html: getBookingConfirmationTemplate(bookingData),
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("Booking confirmation email sent:", result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error("Error sending booking confirmation email:", error)
    return { success: false, error: error.message }
  }
}

export async function sendContactFormNotification(contactData: any) {
  try {
    const mailOptions = {
      from: `"Hamduk Events & Rentals" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to admin
      subject: `New Contact Form Submission - ${contactData.subject || "General Inquiry"}`,
      html: getContactNotificationTemplate(contactData),
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("Contact form notification sent:", result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error("Error sending contact form notification:", error)
    return { success: false, error: error.message }
  }
}

export async function sendTestimonialNotification(testimonialData: any) {
  try {
    const mailOptions = {
      from: `"Hamduk Events & Rentals" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to admin
      subject: `New Testimonial Submission - ${testimonialData.name || "Customer"}`,
      html: getTestimonialNotificationTemplate(testimonialData),
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("Testimonial notification sent:", result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error("Error sending testimonial notification:", error)
    return { success: false, error: error.message }
  }
}

// Alias exports for backward compatibility
export const sendContactNotification = sendContactFormNotification
export const sendBookingConfirmation = sendBookingConfirmationEmail

// Default export
export default {
  sendBookingConfirmationEmail,
  sendContactFormNotification,
  sendTestimonialNotification,
  sendContactNotification,
  sendBookingConfirmation,
}
