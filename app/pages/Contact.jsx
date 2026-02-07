import React from 'react';
import { Mail, MessageSquare, Send, MapPin } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    alert("Thanks for contacting us! We'll get back to you soon.");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Have questions about a property, spotted an error in our data, or just want to say hello? We'd love to hear from you.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-5">
          
          {/* Left Side: Contact Info */}
          <div className="md:col-span-2 bg-blue-600 p-8 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">Get in touch</h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Mail className="w-6 h-6 text-blue-200 mt-0.5" />
                  <div>
                    <span className="block font-medium">Email</span>
                    <span className="text-blue-100 text-sm">support@landlordmapper.com</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-blue-200 mt-0.5" />
                  <div>
                    <span className="block font-medium">Location</span>
                    <span className="text-blue-100 text-sm">New York, NY</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-6 h-6 text-blue-200 mt-0.5" />
                  <div>
                    <span className="block font-medium">Social</span>
                    <span className="text-blue-100 text-sm">@LandlordMapper</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-blue-500/30">
              <p className="text-xs text-blue-200">
                Landlord Mapper Project &bull; Open Data Initiative
              </p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="md:col-span-3 p-8 sm:p-12 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option>General Inquiry</option>
                  <option>Report Data Error</option>
                  <option>Feature Request</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold transition-transform transform active:scale-95"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}