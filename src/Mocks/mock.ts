import {Guid} from '../Types/Common.ts';
import {City, Cords, OfferDTO, UserDTO} from '../Types/Offer/Offer.ts';


export interface AppData {
  offersById: { [id: Guid]: OfferDTO };
  offersByCity: Partial<Record<City, { [id: Guid]: OfferDTO }>>;
}

export const angelina: UserDTO = {
  favourites: {},
  email: '',
  avatarImagePath: 'img/avatar-angelina.jpg',
  name: 'Angelina',
  level: 'Pro'
};

export const max: UserDTO = {
  favourites: {},
  email: '',
  avatarImagePath: 'img/avatar-max.jpg',
  name: 'Max',
  level: 'Unknown'
};

export const cords: Cords[] = [
  {x: 52.3909553943508, y: 4.85309666406198},
  {x: 52.3609553943508, y: 4.85309666406198},
  {x: 52.3909553943508, y: 4.929309666406198},
  {x: 52.3809553943508, y: 4.939309666406198}
];

export const amsterdamOffers: { [id: Guid]: OfferDTO } = {
  '1': {
    city: 'Amsterdam',
    cost: 120,
    shortDescription: 'Beautiful & luxurious apartment at great location',
    description: [
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.'
    ],
    id: '1',
    imagePath: 'img/apartment-01.jpg',
    isPremium: true,
    rating: 80,
    type: 'Apartment',
    details: {
      host: angelina,
      bedroomsCount: 3,
      insides: [
        'Wi-Fi',
        'Washing machine',
        'Towels',
        'Heating',
        'Coffee machine',
        'Baby seat',
        'Kitchen',
        'Dishwasher',
        'Cabel TV',
        'Fridge'
      ],
      maxAdultsCount: 4,
      allImagePaths: [
        'img/room.jpg',
        'img/apartment-01.jpg',
        'img/apartment-02.jpg',
        'img/apartment-03.jpg',
        'img/studio-01.jpg',
        'img/apartment-01.jpg'
      ]
    },
    reviews: [
      {
        id: '1',
        date: new Date(),
        rating: 4,
        user: max,
        text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.'
      }
    ],
    cords: cords[0],
    getNeighbours: () => Object.values(amsterdamOffers).slice(0, 3)
  },
  '2': {
    city: 'Amsterdam',
    cost: 80,
    shortDescription: 'Wood and stone place',
    description: [],
    id: '2',
    imagePath: 'img/room.jpg',
    rating: 80,
    type: 'Room',
    details: null,
    reviews: [],
    cords: cords[1],
    getNeighbours: () => []
  },
  '3': {
    city: 'Amsterdam',
    cost: 132,
    shortDescription: 'Canal View Prinsengracht',
    description: [],
    id: '3',
    imagePath: 'img/apartment-02.jpg',
    rating: 80,
    type: 'Apartment',
    details: null,
    reviews: [],
    cords: cords[2],
    getNeighbours: () => []
  },
  '4': {
    city: 'Amsterdam',
    cost: 180,
    shortDescription: 'Nice, cozy, warm big bed apartment',
    description: [],
    id: '4',
    imagePath: 'img/apartment-03.jpg',
    isPremium: true,
    rating: 100,
    type: 'Apartment',
    reviews: [],
    cords: cords[3],
    getNeighbours: () => []
  },
  '5': {
    city: 'Amsterdam',
    cost: 80,
    shortDescription: 'Wood and stone place',
    description: [],
    id: '5',
    imagePath: 'img/room.jpg',
    rating: 80,
    type: 'Room',
    reviews: [],
    getNeighbours: () => []
  }
};

export const cologneOffers: { [id: Guid]: OfferDTO } = {
  '8': {
    city: 'Cologne',
    cost: 132,
    shortDescription: 'Canal View Prinsengracht',
    description: [],
    id: '8',
    imagePath: 'img/apartment-02.jpg',
    rating: 80,
    type: 'Apartment',
    reviews: [],
    getNeighbours: () => []
  },
  '9': {
    city: 'Cologne',
    cost: 180,
    shortDescription: 'Nice, cozy, warm big bed apartment',
    description: [],
    id: '9',
    imagePath: 'img/apartment-03.jpg',
    isPremium: true,
    rating: 100,
    type: 'Apartment',
    reviews: [],
    getNeighbours: () => []
  },
  '10': {
    city: 'Cologne',
    cost: 80,
    shortDescription: 'Wood and stone place',
    description: [],
    id: '10',
    imagePath: 'img/room.jpg',
    rating: 80,
    type: 'Room',
    details: null,
    reviews: [],
    getNeighbours: () => []
  }
};

export const favourites: Partial<Record<City, OfferDTO[]>> = {
  Amsterdam: [
    amsterdamOffers[3],
    amsterdamOffers[1]
  ],
  Cologne: [
    cologneOffers[8]
  ]
};

export const offersById: { [id: Guid]: OfferDTO } = {...amsterdamOffers, ...cologneOffers};

export const offersByCity: Partial<Record<City, { [id: Guid]: OfferDTO }>> = {Amsterdam: amsterdamOffers, Cologne: cologneOffers};

export const curUser: UserDTO = {
  email: 'pohotlivi_ded@gmail.com',
  avatarImagePath: 'img/avatar-angelina.jpg',
  name: 'Angelina',
  level: 'Pro',
  favourites: favourites
};

export const data: AppData = {
  offersById: offersById,
  offersByCity: offersByCity
};
