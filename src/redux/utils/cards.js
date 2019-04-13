import uuid from 'uuid';
import { CardModel } from 'redux/modules/card';

const cards = [
  {
    name: 'Anima Golem',
    mana: 6,
    attack: 9,
    defense: 9,
    portrait: 'https://gamepedia.cursecdn.com/hearthstone_gamepedia/thumb/5/54/Anima_Golem_full.jpg/800px-Anima_Golem_full.jpg?version=7437eef5b21f16880095d423c5dd625c',
  }, {
    name: 'Abusive Sergeant',
    mana: 1,
    attack: 2,
    defense: 1,
    portrait: 'https://gamepedia.cursecdn.com/hearthstone_gamepedia/thumb/1/18/Abusive_Sergeant_full.jpg/800px-Abusive_Sergeant_full.jpg?version=bb07b0c546ff1bf22d6df6692ca901b7',
  }, {
    name: 'Acolyte of Pain',
    mana: 3,
    attack: 1,
    defense: 3,
    portrait: 'https://gamepedia.cursecdn.com/hearthstone_gamepedia/thumb/e/e0/Acolyte_of_Pain_full.jpg/800px-Acolyte_of_Pain_full.jpg?version=6939e4390550ac8ad439fe3ec10801aa',
  }, {
    name: 'Azure Drake',
    mana: 5,
    attack: 4,
    defense: 4,
    portrait: 'https://gamepedia.cursecdn.com/hearthstone_gamepedia/thumb/6/64/Azure_Drake_full.jpg/1044px-Azure_Drake_full.jpg?version=6148ac22295debcac9842a8f04fcce67',
  }, {
    name: 'Bloodsail Cultist',
    mana: 3,
    attack: 3,
    defense: 4,
    portrait: 'https://gamepedia.cursecdn.com/hearthstone_gamepedia/thumb/5/5a/Bloodsail_Cultist_full.jpg/800px-Bloodsail_Cultist_full.jpg?version=d481aedc14df7e0a7f312ef36ac89703',
  }, {
    name: 'James Kappa',
    mana: 3,
    attack: 16,
    defense: 5,
    portrait: 'http://media.steampowered.com/steamcommunity/public/images/avatars/0c/0c32e686f6c202e65de64bacb32eaea0c6b517f0_full.jpg',
  },
];

const cardsByName = {};
for (const card of cards) {
  cardsByName[card.name.toLowerCase()] = card;
}
cardsByName['the coin'] = {
  name: 'The Coin',
  mana: 0,
  attack: 0,
  defense: 0,
  portrait: 'https://gamepedia.cursecdn.com/hearthstone_gamepedia/thumb/a/a9/The_Coin_full.jpg/800px-The_Coin_full.jpg?version=b9c5e239728aed0018bd75c3333271c9',
};

export default function newCardByName(name = '') {
  const card = cardsByName[name.toLowerCase()];
  if (!card) throw new Error('There is no card with that name');
  return new CardModel(Object.assign({}, card, { id: uuid.v4() }));
}

export function newRandomCard() {
  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  return newCardByName(randomCard.name);
}
