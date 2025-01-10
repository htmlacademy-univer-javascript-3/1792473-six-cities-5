import React, {memo} from 'react';

export interface OfferGoodsProps {
  goods: string[] | undefined;
}

const OfferGoodsInternal: React.FC<OfferGoodsProps> = ({goods}) => (
  <div className="offer__inside">
    <h2 className="offer__inside-title">What&apos;s inside</h2>
    <ul className="offer__inside-list">
      {goods?.map((good, i) => (
        // тут сделал так, потому что нет уверенности, что каждое значение в массиве уникальное
        // а перерисовка из-за обновленных key не объемная
        // eslint-disable-next-line react/no-array-index-key
        <li className="offer__inside-item" key={`${good}_${i}`}>
          {good}
        </li>
      ))}
    </ul>
  </div>
);

export const OfferGoods = memo(OfferGoodsInternal);
