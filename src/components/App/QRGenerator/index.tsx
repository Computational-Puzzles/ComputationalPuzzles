import * as React from 'react';
import styles from './QRGenerator.module.scss';
import { useQRCode } from 'react-qrcodes';

const QRGenerator = ({ text }: { text: string }) => {
  const options = {
    level: 'M',
    margin: 4,
    scale: 4,
    width: 4,
    color: {
      dark: '#000000ff',
      light: '#ffffffff'
    }
  };

  const [qrRef] = useQRCode({
    text: text,
    options: options
  });

  return <canvas ref={qrRef} />;
};
export default QRGenerator;
