
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
              <p className="text-center text-muted-foreground">Last updated: January 6, 2025</p>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                <p className="mb-4">
                  Permission is granted to temporarily download one copy of the materials on our website for personal, 
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
                <p className="mb-4">
                  The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, 
                  and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions 
                  of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
                <p className="mb-4">
                  In no event shall NextCommerce or its suppliers be liable for any damages (including, without limitation, 
                  damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use 
                  the materials on our website, even if we or our authorized representative has been notified orally or in writing 
                  of the possibility of such damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Privacy Policy</h2>
                <p className="mb-4">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information 
                  when you use our service. By using our service, you agree to the collection and use of information in accordance 
                  with our Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
                <p className="mb-4">
                  These terms and conditions are governed by and construed in accordance with the laws and you irrevocably 
                  submit to the exclusive jurisdiction of the courts in that state or location.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> legal@nextcommerce.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Business Ave, Suite 100, City, State 12345</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
