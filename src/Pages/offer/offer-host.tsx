import React from 'react';
import {UserDTO} from '../../types';

export interface OfferHostProps {
  host: UserDTO | undefined;
  description: string | undefined;
}

const OfferHostInternal: React.FC<OfferHostProps> = (props) => (
  <div className="offer__host">
    <h2 className="offer__host-title">Meet the host</h2>
    <div className="offer__host-user user">
      <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
        <img className="offer__avatar user__avatar" src={props.host?.avatarUrl} width="74" height="74" alt="Host avatar"/>
      </div>
      <span className="offer__user-name">{props.host?.name}</span>
      <span className="offer__user-status">{props.host?.isPro ? 'Pro' : null}</span>
    </div>
    <div className="offer__description">
      {props.description?.split('\n').map((x) => <p className="offer__text" key={x}>{x}</p>)}
    </div>
  </div>
);

export const OfferHost = React.memo(OfferHostInternal);
