import { createStore } from "vuex";

export default createStore({
  state: {
    recipes: [
      {
        slug: 'Katsu-curry',
        title: 'Katsu Curry',
        description: 'A delicious curry made with chicken ',
        ingredients: [
          '1 tablespoon olive oil',
          '1 onion, chopped',
          '1 tablespoon curry powder'
        ],
        method: [
          'Heat oil in a frying pan for two hours',
          'Add onion and garlic and cook for five minutes',
          'voila you are done'

        ]

      },

      {
        slug: 'kponmo-sauce',
        title: 'Kponmo Sauce',
        description: 'A delicious sauce made with goat meat ',
        ingredients: [
          '1 tablespoon olive oil',
          '1 onion, chopped',
          '1 tablespoon curry powder'
        ],
        method: [
          'Heat oil in a frying pan for two hours',
          'Add onion and garlic and cook for five minutes',
          'voila you are done'

        ]

      },
    ]
  },
  mutations: {
    ADD_RECIPE (state, recipe) {
      state.recipes.push(recipe)
    }
  },
  actions: {},
  modules: {},
});
