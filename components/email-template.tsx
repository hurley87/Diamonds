import * as React from 'react';

interface EmailTemplateProps {
  address: string;
  diamond: any;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  address,
  diamond,
}) => (
  <div>
    <h1>Hello </h1>
    <p>{address}</p>
    <p>Color Grade: {diamond.colorGrade}</p>
    <p>Carat Weight: {diamond.caratWeight}</p>
    <p>GIA Number: {diamond.giaNumber}</p>
    <p>GIA Date: {diamond.giaDate}</p>
    <p>Measurements: {diamond.measurements}</p>
    <p>Certificate: {diamond.certificate}</p>
    <p>Clarity Grade: {diamond.clarityGrade}</p>
  </div>
);
