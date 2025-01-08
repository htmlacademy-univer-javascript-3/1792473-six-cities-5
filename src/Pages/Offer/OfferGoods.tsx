import React from 'react';

export interface OfferGoodsProps {
  goods: string[] | undefined;
}

const OfferGoodsInternal: React.FC<OfferGoodsProps> = ({goods}) => (
  <div className="offer__inside">
    <h2 className="offer__inside-title">What&apos;s inside</h2>
    <ul className="offer__inside-list">
      {goods?.map((x, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <li className="offer__inside-item" key={`${x}_${i}`}>
          {x}
        </li>
      ))}
    </ul>
  </div>
);

export const OfferGoods = React.memo(OfferGoodsInternal);
