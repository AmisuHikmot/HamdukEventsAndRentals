import { Mail, MapPin, Phone } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Privacy Policy</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">Last updated: May 22, 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Introduction</h2>
            <p>
              Hamduk Events and Rentals ("we," "our," or "us"), a subsidiary of Hamduk Unique Concept, is committed to
              protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or use our services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
              please do not access the site or use our services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Fill out forms on our website</li>
              <li>Register for an account</li>
              <li>Make a booking or rental request</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us via email, phone, or other communication channels</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Mailing address</li>
              <li>Payment information</li>
              <li>Event details</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain information about your device, including:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Time and date of your visit</li>
              <li>Referring website</li>
              <li>Other statistics</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, operate, and maintain our services</li>
              <li>Process and complete transactions</li>
              <li>Send administrative information, such as booking confirmations</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Send marketing and promotional communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Protect against fraud and unauthorized access</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and hold certain
              information. Cookies are files with a small amount of data that may include an anonymous unique
              identifier.
            </p>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
              if you do not accept cookies, you may not be able to use some portions of our website.
            </p>

            <h2>Third-Party Service Providers</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our services, provide services on our
              behalf, perform service-related tasks, or assist us in analyzing how our services are used. These third
              parties have access to your personal information only to perform these tasks on our behalf and are
              obligated not to disclose or use it for any other purpose.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal
              information. However, please be aware that no method of transmission over the internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>Your Data Protection Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li>The right to access the personal information we hold about you</li>
              <li>The right to request correction of inaccurate personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to restrict or object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent at any time</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information provided in the "Contact Us"
              section.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
              information from children under 18. If you are a parent or guardian and you are aware that your child has
              provided us with personal information, please contact us.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
              are effective when they are posted on this page.
            </p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
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
