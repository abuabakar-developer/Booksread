import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if form was submitted

  useEffect(() => {
    AOS.init();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitted(true);


    setFormData({
      name: '',
      email: '',
      message: '',
    });

  
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4" data-aos="fade-up">Contact Us</h2>
          <p className="text-lg text-gray-700" data-aos="fade-up" data-aos-delay="100">
            Have any questions? Feel free to reach out, and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information Section */}
          <div className="space-y-6" data-aos="fade-right">
            <h3 className="text-3xl font-semibold text-gray-800">Get in Touch</h3>
            <p className="text-gray-700">
              Whether you have a question about our books, services, or just want to say hello, we're here to help!
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26c.47.31 1.11.31 1.58 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">contact@abakarreads.com</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h18M3 18h18" />
                </svg>
                <span className="text-gray-600">0315 4195240</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 0112 0v4a6 6 0 01-12 0V8zm0 4a4 4 0 108 0v-4a4 4 0 10-8 0v4z" />
                </svg>
                <span className="text-gray-600">123 Book St, Jaranwala, NY</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8" data-aos="fade-left">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm text-gray-700">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-700">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
              >
                Send Message
              </button>
            </form>

            {/* Success message */}
            {isSubmitted && (
              <p className="text-green-600 mt-4">
                Your message has been sent successfully! We will get back to you soon.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;








