import React from 'react';

export interface CitiesNavBarProps {
  activeCity: string;
  setCity: (city: string) => void;
}

const CitiesNavBarInternal: React.FC<CitiesNavBarProps> = (props) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'].map((x) => (
          <li key={x} className="locations__item">
            <a className={`locations__item-link tabs__item ${x === props.activeCity ? 'tabs__item--active' : ''}`} onClick={() => props.setCity(x)}>
              <span>{x}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export const CitiesNavBar = React.memo(CitiesNavBarInternal);
