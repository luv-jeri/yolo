import '../styles/index.css';
import '../styles/media/mobile.css';
import '../styles/pet_card.css';

import Card from './API/Card';

import List from './API/List';
import Modal from './API/Modal';
import modalContentGen from './generators/modalContent.gen';
import fetch from './functions/fetch';

const modal = new Modal({
  title: 'Pet me.',
});

let page = 0;
let limit = 20;

let pets_list = new List({
  target: document.querySelector('#list'),
  onLoad: async () => {
    try {
      const { data } = await fetch('pets', {
        params: {
          page,
          limit,
        },
      });
      return data.pets;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
  element: (props) => {
    const card = new Card({
      ...props,
      onClick: () => {
        modal.content = modalContentGen(props);
        modal._open();
      },
    });
    return card.element;
  },
  onEnd: async () => {
    try {
      const { data } = await fetch('pets', {
        params: {
          page: ++page,
          limit,
        },
      });

      return data.pets;
    } catch (err) {
      return [];
    }
  },
});

const search = document.querySelector('#search');

// debounce
let timeout;
search.addEventListener('input', (e) => {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    try {
      const { data } = await fetch('pets/lookup', {
        params: {
          search: e.target.value,
        },
      });
      pets_list.updater(data.pets);
    } catch (err) {
      console.log(err);
    }
  }, 500);
});
