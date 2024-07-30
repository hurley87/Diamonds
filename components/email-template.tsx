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
  <div>
    <h1>
      {firstName} {lastName},
    </h1>
    <br />
    <p>Review your infomation and reply to this email if anything if wrong.</p>
    <br />
    <h1>Your address</h1>
    <p>Street and house number: {street}</p>
    <p>Apartment number: {unitNumber}</p>
    <p>City: {city}</p>
    <p>Postal Code: {postalCode}</p>
    <p>Country: {country}</p>
    <p>Phone: {phone}</p>
    <br />
    <h1>Your Token</h1>
    <p>Token ID: {tokenId}</p>
    <p>Color Grade: {diamond.colorGrade}</p>
    <p>Carat Weight: {diamond.caratWeight}</p>
    <p>GIA Number: {diamond.giaNumber}</p>
    <p>GIA Date: {diamond.giaDate}</p>
    <p>Measurements: {diamond.measurements}</p>
    <p>Certificate: {diamond.certificate}</p>
    <p>Clarity Grade: {diamond.clarityGrade}</p>
  </div>
);
