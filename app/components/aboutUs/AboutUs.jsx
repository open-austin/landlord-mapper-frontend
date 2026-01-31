import React from 'react';

export function meta() {
  return [
    { title: "About Us" },
    { name: "description", content: "Learn more about Landlord Mapper" }
  ];
}

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">About Landlord Mapper</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Landlord Mapper is dedicated to bringing transparency to property ownership. 
        We help tenants and community organizers connect the dots between properties 
        and their owners.
      </p>
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Our Mission</h2>
        <p className="text-gray-600">
          To empower communities with data, ensuring safe and fair housing for everyone.
        </p>
      </div>
    </div>
  );
}