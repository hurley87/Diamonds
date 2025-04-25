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
  <>
    <html>
      <head>
        <meta charSet="utf-8" />
        <style>{`  
          p {
            font-family: "Red Hat Display", Sans-serif;
            font-size: 16px;
            font-weight: 400;
            color: #62696B;
          }
        `}</style>
      </head>
      <body style={{ backgroundColor: '#F1F6F7' }}>
        <table
          cellPadding={10}
          cellSpacing={5}
          border={0}
          style={{
            width: '100%',
            padding: '30px',
            backgroundColor: 'white',
          }}
        >
          <tbody>
            <tr>
              <td align="left">
                <h3 style={{ color: '#0C0D0D' }}>
                  Subject: Your Inquiry to Four Collection
                </h3>
              </td>
            </tr>
            <tr>
              <td align="left">
                <p>
                  Dear {firstName} {lastName},
                </p>
                <p>
                  Thank you for your interest in our diamond. Please review your
                  information below. If any details are incorrect, please reply
                  to this email.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <h4 style={{ color: '#0C0D0D' }}>Shipping Information</h4>
                <p>
                  <strong>Address:</strong> {street}
                </p>
                {unitNumber && (
                  <p>
                    <strong>Unit Number:</strong> {unitNumber}
                  </p>
                )}
                <p>
                  <strong>City:</strong> {city}
                </p>
                <p>
                  <strong>Postal Code:</strong> {postalCode}
                </p>
                <p>
                  <strong>Country:</strong> {country}
                </p>
                <p>
                  <strong>Phone:</strong> {phone}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <h4 style={{ color: '#0C0D0D' }}>Diamond Details</h4>
                <p>
                  <strong>Token ID:</strong> {tokenId}
                </p>
                <p>
                  <strong>Color Grade:</strong> {diamond.colorGrade}
                </p>
                <p>
                  <strong>Carat Weight:</strong> {diamond.caratWeight}
                </p>
                <p>
                  <strong>GIA Number:</strong> {diamond.giaNumber}
                </p>
                <p>
                  <strong>GIA Date:</strong> {diamond.giaDate}
                </p>
                <p>
                  <strong>Measurements:</strong> {diamond.measurements}
                </p>
                <p>
                  <strong>Certificate:</strong> {diamond.certificate}
                </p>
                <p>
                  <strong>Clarity Grade:</strong> {diamond.clarityGrade}
                </p>
              </td>
            </tr>
            <tr>
              <td align="left">
                <p>Best regards,</p>
                <p>Your Four Collection Team</p>
              </td>
            </tr>
          </tbody>
        </table>
        <table cellPadding={0} cellSpacing={0} border={0} width="100%">
          <tbody>
            <tr>
              <td
                align="center"
                style={{
                  color: '#fff',
                  padding: '20px 50px',
                  background:
                    'linear-gradient(180deg, rgba(78, 84, 85, 0.65) 0%, rgba(12, 13, 13, 0.00) 100%), #151616',
                }}
              >
                <img
                  src="https://4collection.com/wp-content/uploads/2025/03/Component-37-2.png"
                  alt="logo"
                  width="30%"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table
          cellPadding={10}
          cellSpacing={5}
          width="100%"
          bgcolor="white"
          style={{ padding: '30px' }}
        >
          <tbody>
            <tr>
              <td align="left">
                <h4 style={{ color: '#0C0D0D' }}>OFFICE MUNICH</h4>
                <p>
                  Maximilianstraße <br />
                  80539 Munich
                </p>
                <p>
                  T. +49 (0) 89 200 03 0800 <br />
                  F. +49 (0) 89 200 03 0810
                </p>
                <p>
                  info@4Collection.com
                  <br />
                  www.4Collection.com
                </p>
              </td>
            </tr>
            <tr>
              <td align="left">
                <h4 style={{ color: '#0C0D0D' }}>4Collection GmbH</h4>
                <p>
                  Represented by Managing Directors Torsten Graf and Thomas
                  Hellweg,
                  <br />
                  Maximilianstraße 2, 80539 Munich, Tel: +49 (0) 89 200 03 0800,
                  <br />
                  Fax: +49 (0) 89 200 03 0810,
                  <br />
                  Email: info@4Collection.com,
                  <br />
                  Register Court Munich, HRB 283888, VAT ID: DE361654367
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <table cellPadding={0} cellSpacing={0} border={0} width="100%">
          <tbody>
            <tr>
              <td
                align="left"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(78, 84, 85, 0.65) 0%, rgba(12, 13, 13, 0.00) 100%), #151616',
                  color: '#fff',
                  padding: '10px 50px',
                  fontSize: '15px',
                }}
              >
                The information in this email is confidential and intended
                exclusively for the recipient. If you are not the intended
                recipient or an authorized agent, you are hereby notified that
                any publication, duplication, or distribution of this message is
                strictly prohibited. If you have received this email in error,
                please contact us immediately by phone at +49 (0)89 200 03 0800
                or by email, and delete the original message.
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  </>
);
