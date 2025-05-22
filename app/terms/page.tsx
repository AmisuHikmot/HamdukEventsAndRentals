import { Mail, MapPin, Phone } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Terms of Service</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">Last updated: May 22, 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms of Service Content */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Introduction</h2>
            <p>
              Welcome to Hamduk Events and Rentals, a subsidiary of Hamduk Unique Concept. These Terms of Service
              ("Terms") govern your use of our website and services. By accessing our website or using our services, you
              agree to be bound by these Terms.
            </p>
            <p>
              Please read these Terms carefully before using our services. If you do not agree to these Terms, you may
              not use our services.
            </p>

            <h2>Use of Our Website and Services</h2>
            <h3>Eligibility</h3>
            <p>
              You must be at least 18 years old to use our services. By using our services, you represent and warrant
              that you are at least 18 years old and have the legal capacity to enter into a binding agreement.
            </p>

            <h3>Account Registration</h3>
            <p>
              Some features of our services may require you to register for an account. You agree to provide accurate,
              current, and complete information during the registration process and to update such information to keep
              it accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding your account credentials and for all activities that occur under your
              account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2>Booking and Rental Terms</h2>
            <h3>Reservations</h3>
            <p>
              All reservations for event services and equipment rentals are subject to availability and confirmation by
              Hamduk Events and Rentals. A reservation is not confirmed until you receive a written confirmation from
              us.
            </p>

            <h3>Deposit and Payment</h3>
            <p>
              A non-refundable deposit of 50% of the total cost is required to secure your booking. The remaining
              balance is due 14 days prior to the event date. For bookings made less than 14 days before the event, full
              payment is required at the time of booking.
            </p>

            <h3>Rental Equipment</h3>
            <p>
              You are responsible for all rented equipment from the time of delivery or pickup until the time of return.
              You agree to use the equipment properly and for its intended purpose. You are responsible for any loss,
              theft, or damage to the equipment beyond normal wear and tear.
            </p>

            <h3>Delivery and Setup</h3>
            <p>
              Delivery and setup fees are not included in rental prices unless specifically stated. Additional fees may
              apply for delivery outside our standard service area, difficult access locations, or after-hours delivery.
            </p>

            <h2>Cancellation and Refund Policy</h2>
            <h3>Event Planning Services</h3>
            <p>Our cancellation policy for event planning services is as follows:</p>
            <ul>
              <li>Cancellation more than 90 days before the event: 50% of deposit refunded</li>
              <li>Cancellation 60-90 days before the event: 25% of deposit refunded</li>
              <li>Cancellation less than 60 days before the event: No refund</li>
            </ul>

            <h3>Equipment Rentals</h3>
            <p>Our cancellation policy for equipment rentals is as follows:</p>
            <ul>
              <li>Cancellation more than 30 days before the rental date: 50% of deposit refunded</li>
              <li>Cancellation 14-30 days before the rental date: 25% of deposit refunded</li>
              <li>Cancellation less than 14 days before the rental date: No refund</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Hamduk Events and Rentals shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting
              from:
            </p>
            <ul>
              <li>Your use or inability to use our services</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
              <li>Any interruption or cessation of transmission to or from our services</li>
              <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our services</li>
              <li>
                Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any
                content posted, emailed, transmitted, or otherwise made available through our services
              </li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              All content, features, and functionality of our website, including but not limited to text, graphics,
              logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive
              property of Hamduk Events and Rentals, its licensors, or other content suppliers and are protected by
              copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
              republish, download, store, or transmit any of the material on our website without our prior written
              consent.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Hamduk Events and Rentals, its affiliates, licensors,
              and service providers, and its and their respective officers, directors, employees, contractors, agents,
              licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages,
              judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of
              or relating to your violation of these Terms or your use of our services.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to
              its conflict of law provisions. Any legal action or proceeding arising out of or relating to these Terms
              shall be brought exclusively in the courts of Lagos, Nigeria, and you consent to the personal jurisdiction
              of such courts.
            </p>

            <h2>Changes to These Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
              provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change
              will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our services after any revisions become effective, you agree to be bound by
              the revised terms. If you do not agree to the new terms, you are no longer authorized to use our services.
            </p>

            <h2>Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <div className="flex flex-col space-y-2 mt-4 not-prose">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-rose-600" />
                <span>+234 818 596 8179</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-rose-600" />
                <span>hamdukuniqueconcept@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-rose-600" />
                <span>No. 4 Dipeolu Street, Ikeja, Lagos, Nigeria</span>
              </div>
            </div>
            <p className="mt-6">Hamduk Events and Rentals is a subsidiary of Hamduk Unique Concept.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
