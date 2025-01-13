import React, {memo} from 'react';

export interface OfferGoodsProps {
  goods: string[] | undefined;
}

const OfferGoodsInternal: React.FC<OfferGoodsProps> = ({goods}) => (
  <div className="offer__inside">
    <h2 className="offer__inside-title">What&apos;s inside</h2>
    <ul className="offer__inside-list">
      {goods?.map((good) => (
        <li className="offer__inside-item" key={`${good}_${crypto.randomUUID()}`}>
          {good}
        </li>
      ))}
    </ul>
  </div>
);

export const OfferGoods = memo(OfferGoodsInternal);
