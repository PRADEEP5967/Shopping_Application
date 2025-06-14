
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, MapPin, ArrowRight } from 'lucide-react';

const jobOpenings = [
  {
    title: 'Senior Frontend Developer',
    location: 'Remote',
    department: 'Engineering',
    url: '#',
  },
  {
    title: 'Product Manager',
    location: 'San Francisco, CA',
    department: 'Product',
    url: '#',
  },
  {
    title: 'UI/UX Designer',
    location: 'New York, NY',
    department: 'Design',
    url: '#',
  },
  {
    title: 'Marketing Lead',
    location: 'Remote',
    department: 'Marketing',
    url: '#',
  },
];

const Careers = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">Join Our Team</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Help us build the future of e-commerce. We're looking for passionate, innovative people to join PRADEEP SAHANI MART.
            </p>
          </div>
        </section>

        {/* Why Work With Us Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why You'll Love Working Here</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">Be part of a team that's constantly pushing the boundaries of what's possible in online retail.</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Growth</h3>
                <p className="text-muted-foreground">We invest in our people. Grow your skills and your career with us.</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Culture</h3>
                <p className="text-muted-foreground">We foster a collaborative, inclusive, and supportive environment where everyone can thrive.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section id="open-positions" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Current Openings</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {jobOpenings.length > 0 ? (
                jobOpenings.map((job, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-muted-foreground">
                          <span className="flex items-center mt-2 sm:mt-0"><Building className="h-4 w-4 mr-1.5" /> {job.department}</span>
                          <span className="flex items-center mt-2 sm:mt-0"><MapPin className="h-4 w-4 mr-1.5" /> {job.location}</span>
                        </CardDescription>
                      </div>
                      <Button asChild variant="outline" className="mt-4 sm:mt-0 w-full sm:w-auto">
                        <a href={job.url}>
                          View Details <ArrowRight className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground">We don't have any open positions right now, but we're always looking for talented people. Check back soon!</p>
              )}
            </div>
            <div className="text-center mt-12">
              <p className="text-gray-700 dark:text-gray-300">Don't see a role for you? Send us your resume!</p>
              <Button asChild className="mt-4">
                <a href="mailto:careers@pradeepsahanimart.com">Contact HR</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
