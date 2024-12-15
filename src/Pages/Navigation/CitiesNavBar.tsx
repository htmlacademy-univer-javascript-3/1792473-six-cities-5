import React from 'react';
import {City} from '../../Mocks/offers.ts';

export interface CitiesNavBarProps {
  cities: City[];
  activeCity: City;
  setCity: (city: City) => void;
}

export const CitiesNavBar: React.FC<CitiesNavBarProps> = (props) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {props.cities.map((x) => (
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
