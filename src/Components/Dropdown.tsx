import React from 'react';

export interface DropdownProps {
  values: string[];
  activeValue: string;
  setActiveValue: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpened(!isOpened)}>
        {props.activeValue}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {props.values.map((x) =>
          (
            <li
              className={`places__option ${x === props.activeValue ? 'places__option--active' : ''}`}
              tabIndex={0}
              key={x}
              onClick={() => {
                props.setActiveValue(x);
                setIsOpened(false);
              }}
            >
              {x}
            </li>)
        )}
      </ul>
    </form>
  );
};
