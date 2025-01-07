import React, {CSSProperties} from 'react';

export interface ToggleProps {
  isActive: boolean;
  onToggle: (() => void) | undefined;
  classPrefix: string;
  altText?: string;
  iconStyle?: CSSProperties;
}

export const Toggle: React.FC<ToggleProps> = (props) => (
  <button
    className={`${props.classPrefix}-button button ${props.isActive ? `${props.classPrefix}-button--active` : ''}`}
    type="button"
    onClick={props.onToggle}
  >
    <svg className={`${props.classPrefix}-icon`} style={props.iconStyle}>
      <use xlinkHref="#icon-bookmark"></use>
    </svg>
    <span className="visually-hidden">{props.altText}</span>
  </button>
);
