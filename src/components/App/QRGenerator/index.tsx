import * as React from 'react';
import styles from './QRGenerator.module.scss';
import QRCode from 'qrcode.react';

const QRGenerator = ({
  text,
  className
}: {
  text: string;
  className?: string;
}) => {
  return (
    <QRCode
      className={className}
      value={text}
      renderAs="svg"
      includeMargin={true}
      bgColor="#ffffff"
      fgColor="#000000"
    />
  );
};

export default QRGenerator;
