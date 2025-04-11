import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  street: string;
  unitNumber: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  diamond: any;
  tokenId: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  street,
  unitNumber,
  city,
  postalCode,
  country,
  phone,
  diamond,
  tokenId,
}) => (
  <div className="max-w-2xl mx-auto p-6 bg-white">
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Hi {firstName} {lastName},
      </h1>
      <p className="mt-4 text-gray-600">
        Thank you for your interest in our diamond. Please review your
        information below. If any details are incorrect, please reply to this
        email.
      </p>
    </div>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Shipping Information
      </h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Address:</span> {street}
        </p>
        {unitNumber && (
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Unit Number:</span> {unitNumber}
          </p>
        )}
        <p className="text-gray-700 mb-2">
          <span className="font-medium">City:</span> {city}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Postal Code:</span> {postalCode}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Country:</span> {country}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Phone:</span> {phone}
        </p>
      </div>
    </div>

    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Diamond Details
      </h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Token ID:</span> {tokenId}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Color Grade:</span> {diamond.colorGrade}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Carat Weight:</span>{' '}
          {diamond.caratWeight}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">GIA Number:</span> {diamond.giaNumber}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">GIA Date:</span> {diamond.giaDate}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Measurements:</span>{' '}
          {diamond.measurements}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Certificate:</span>{' '}
          {diamond.certificate}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Clarity Grade:</span>{' '}
          {diamond.clarityGrade}
        </p>
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-gray-200">
      <p className="text-sm text-gray-500">
        This is an automated message. Please do not reply directly to this
        email.
      </p>
    </div>
  </div>
);
