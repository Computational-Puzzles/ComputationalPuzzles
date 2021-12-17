import * as React from 'react';
import styles from './QRGenerator.module.scss';
import QRCode from 'qrcode.react';

const QRGenerator = ({ text }: { text: string }) => {
  return <QRCode
    value={text}
    level='M'
    renderAs='svg'
    size={256}
    includeMargin={true}
    bgColor='#ffffff'
    fgColor='#000000'
  />;
};

export default QRGenerator;
