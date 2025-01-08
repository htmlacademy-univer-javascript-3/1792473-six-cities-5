import React from 'react';

export interface OfferGalleryProps {
  imagePaths: string[] | undefined;
}

const OfferGalleryInternal: React.FC<OfferGalleryProps> = ({imagePaths}) => (
  <div className="offer__gallery-container container">
    <div className="offer__gallery">
      {imagePaths?.map((x, i) =>
        (
          // eslint-disable-next-line react/no-array-index-key
          <div className="offer__image-wrapper" key={`${x}${i}`}>
            <img className="offer__image" src={x} alt="Photo studio"/>
          </div>
        )
      )}
    </div>
  </div>
);

export const OfferGallery = React.memo(OfferGalleryInternal);
