import ReactDOM from 'react-dom/client';
import {App} from './App.tsx';
import {OfferDTO, UserDTO} from './Types/Offer/Offer.ts';
import {Guid} from './Types/Common.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export type City = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export interface AppData {
  offers: { [id: Guid]: OfferDTO };
  favourites: Partial<Record<City, OfferDTO[]>>;
}

const curUser: UserDTO = {
  email: 'Oliver.conner@gmail.com',
  avatarImagePath: 'img/avatar-angelina.jpg',
  name: 'Angelina',
  level: 'Pro'
};

const angelina: UserDTO = {
  email: '',
  avatarImagePath: 'img/avatar-angelina.jpg',
  name: 'Angelina',
  level: 'Pro'
};

const max: UserDTO = {
  email: '',
  avatarImagePath: 'img/avatar-max.jpg',
  name: 'Max',
  level: 'Unknown'
};

const offers: { [id: Guid]: OfferDTO } = {
  '1': {
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
    getNeighbours: () => Object.values(offers).slice(0, 3)
  },
  '2': {
    cost: 80,
    shortDescription: 'Wood and stone place',
    description: [],
    id: '2',
    imagePath: 'img/room.jpg',
    rating: 80,
    type: 'Room',
    details: null,
    reviews: [],
    getNeighbours: () => []
  },
  '3': {
    cost: 132,
    shortDescription: 'Canal View Prinsengracht',
    description: [],
    id: '3',
    imagePath: 'img/apartment-02.jpg',
    rating: 80,
    type: 'Apartment',
    details: null,
    reviews: [],
    getNeighbours: () => []
  },
  '4': {
    cost: 180,
    shortDescription: 'Nice, cozy, warm big bed apartment',
    description: [],
    id: '4',
    imagePath: 'img/apartment-03.jpg',
    isPremium: true,
    rating: 100,
    type: 'Apartment',
    details: null,
    reviews: [],
    getNeighbours: () => []
  },
  '5': {
    cost: 80,
    shortDescription: 'Wood and stone place',
    description: [],
    id: '5',
    imagePath: 'img/room.jpg',
    rating: 80,
    type: 'Room',
    details: null,
    reviews: [],
    getNeighbours: () => []
  }
};

const favourites: Partial<Record<City, OfferDTO[]>> = {
  Amsterdam: [
    offers[3],
    offers[1]
  ],
  Cologne: [
    offers[2]
  ]
};

const data: AppData = {
  offers: offers,
  favourites: favourites
};

root.render(
  <App data={data} currentUser={curUser} />
);
