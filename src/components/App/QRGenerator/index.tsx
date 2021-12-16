import * as React from 'react';
import styles from './QRGenerator.module.scss';
import { useQRCode } from 'react-qrcodes';

const QRCode = ({ text }: { text: string }) => {
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

const QRGenerator = () => {
  const [text, setText] = React.useState('');
  return (
    <div className={styles.qrWrapper}>
      {/** TODO: Implement the Input component when it's merged */}
      <input
        className={styles.input}
        type="text" // TODO: discuss about the url stuff and change this to url if needed
        onChange={e => setText(e.currentTarget.value)}
        value={text}
        placeholder="Paste the link here 🙋🏻‍♂️"
      />
      {/** Might create a pointing down arrow */}
      {text && <QRCode text={text} />}
    </div>
  );
};

export default QRGenerator;
