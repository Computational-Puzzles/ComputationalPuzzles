import * as React from 'react';
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
    <>
      <input
        style={{ width: 100, height: 20 }}
        type="text"
        onChange={e => setText(e.currentTarget.value)}
        value={text}
        placeholder="Information"
      />
      <br />
      <br />
      <br />
      <br />
      {text && <QRCode text={text} />}
    </>
  );
};

export default QRGenerator;
