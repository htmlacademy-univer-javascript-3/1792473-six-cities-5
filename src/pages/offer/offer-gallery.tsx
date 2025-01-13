import React, {memo} from 'react';

export interface OfferGalleryProps {
  imagePaths: string[] | undefined;
}

const OFFER_IMAGES_MAX_VIEW_COUNT = 6;

const OfferGalleryInternal: React.FC<OfferGalleryProps> = ({imagePaths}) => (
  <div className="offer__gallery-container container">
    <div className="offer__gallery">
      {imagePaths?.slice(0, OFFER_IMAGES_MAX_VIEW_COUNT).map((image) =>
        (
          <div className="offer__image-wrapper" key={`${image}${crypto.randomUUID()}`}>
            <img className="offer__image" src={image} alt="Photo studio"/>
          </div>
        )
      )}
    </div>
  </div>
);

export const OfferGallery = memo(OfferGalleryInternal);
