import React, {memo} from 'react';
import {ALL_CITY_NAMES} from '../../utils';

export interface CitiesNavBarProps {
  activeCity: string;
  onCityChange: (city: string) => void;
}

const CitiesNavBarInternal: React.FC<CitiesNavBarProps> = (props) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {ALL_CITY_NAMES.map((city) => (
          <li key={city} className="locations__item">
            <a className={`locations__item-link tabs__item ${city === props.activeCity ? 'tabs__item--active' : ''}`} onClick={() => props.onCityChange(city)}>
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export const CitiesNavBar = memo(CitiesNavBarInternal);
