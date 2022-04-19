import React from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';
import type {
  ArrowDirectionType,
  ArrowType,
  ButtonContentProps,
  ButtonProps,
  ButtonSize,
  ButtonStyle
} from '../../../types/button';

const getButtonClass = (style: ButtonStyle) => {
  if (style === 'primary') return styles.btnPrimary;
  if (style === 'secondary') return styles.btnSecondary;
  if (style === 'outline') return styles.btnOutline;
  if (style === 'flat') return styles.btnFlat;
};

const getButtonSizeClass = (size: ButtonSize) => {
  if (size === 'sm') return styles.btnSm;
  if (size === 'md') return styles.btnMd;
  if (size === 'lg') return styles.btnLg;
};

const getArrowClass = (style: ButtonStyle) => {
  if (style === 'primary') return styles.arrowPrimary;
  if (style === 'secondary') return styles.arrowSecondary;
  if (style === 'outline' || style === 'flat') return styles.arrowOutline;
};

const getArrowSvgRotation = (arrowDirection: ArrowDirectionType) => {
  if (arrowDirection === 'right') return styles.arrowRight;
  if (arrowDirection === 'down') return styles.arrowDown;
};

const getArrowSvg = (arrowDirection: ArrowDirectionType) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={getArrowSvgRotation(arrowDirection)}
        d="M0.899684 5.22821C0.507143 5.22617 0.187273 5.54273 0.185237 5.93528C0.1832 6.32782 0.499766 6.64769 0.892308 6.64972L0.899684 5.22821ZM13.9117 6.5091C14.1907 6.23297 14.193 5.78294 13.9169 5.50394L9.4171 0.957218C9.14097 0.678208 8.69094 0.675873 8.41193 0.952002C8.13292 1.22813 8.13059 1.67816 8.40672 1.95717L12.4065 5.99869L8.36499 9.99849C8.08598 10.2746 8.08365 10.7247 8.35977 11.0037C8.6359 11.2827 9.08593 11.285 9.36494 11.0089L13.9117 6.5091ZM0.892308 6.64972L13.408 6.71467L13.4154 5.29315L0.899684 5.22821L0.892308 6.64972Z"
      />
    </svg>
  );
};

const Arrow = ({ style, arrowDirection }: ArrowType) => {
  return (
    <div className={`${styles.arrow} ${getArrowClass(style)}`}>
      {getArrowSvg(arrowDirection)}
    </div>
  );
};

const ButtonContent = ({
  style,
  content,
  arrowDirection
}: ButtonContentProps) => {
  return (
    <div className={`${getButtonClass(style)}`}>
      <div className={styles.btnTextContainer}>{content}</div>
      {arrowDirection && (
        <div className={styles.arrowBox}>
          <Arrow arrowDirection={arrowDirection} style={style} />
        </div>
      )}
    </div>
  );
};

const Button = ({
  style,
  type,
  size,
  content,
  arrowDirection,
  onClick,
  link
}: ButtonProps) => {
  if (!type) type = 'button';
  if (!size) size = 'md';

  if (link) {
    return (
      <Link href={link}>
        <a
          className={`${getButtonSizeClass(size)} ${styles.removeBtnDefault}`}
          onClick={onClick}
        >
          <ButtonContent
            style={style}
            content={content}
            arrowDirection={arrowDirection}
          />
        </a>
      </Link>
    );
  } else {
    return (
      <button
        className={`${getButtonSizeClass(size)} ${styles.removeBtnDefault}`}
        onClick={onClick}
        type={type}
      >
        <ButtonContent
          style={style}
          content={content}
          arrowDirection={arrowDirection}
        />
      </button>
    );
  }
};

export default Button;
