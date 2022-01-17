<template>
  <div class="home">
      <h2>The Recipes</h2>
      <button @click="toggleModal">Add new Recipe</button>

    <div class="recipes">
       <div class="card" v-for="recipe in $store.state.recipes" :key="recipe.slug">
         <h2>{{ recipe.title }}</h2>
         <p>{{ recipe.description }}</p>
        <router-link :to="`/recipe/${recipe.slug}`">
         <button>Details</button>
        </router-link>

        </div>
    </div>

    <div class="add-recipe-modal" v-if="modalOpen">
      <div class="modal-content">
          <h3>Add a new recipe</h3>

          <form @submit.prevent="addNewRecipe">
            <div class="form-group">
               <label>
                 Title
                </label>
                <input type="text" v-model="newRecipe.title" />
            </div>

             <div class="form-group">
               <label>
                 Description
                </label>
                <textarea v-model="newRecipe.description"></textarea>
            </div>

             <div class="form-group">
               <label>
                 Ingredients
                </label>
                <div class="ingredients" v-for="i in newRecipe.ingredientRows" :key="i">
                <input type="text" v-model="newRecipe.ingredients[i - 1]" />
                </div>
                <button type="button" @click="addNewIngredient">Add Ingredient</button>
            </div>

             <div class="form-group">
               <label>
                 Method
                </label>
                <div class="method"  v-for="i in newRecipe.methodRows" :key="i">
                  <textarea v-model="newRecipe.method[i - 1]"></textarea>
                 
                  </div>
                    <button type="button"  @click="addNewStep">Add step</button>
               
            </div>

            <button type="submit">Add Recipe</button>
             <button type="button" @click="toggleModal">Close</button>
          </form>
     </div>

    </div>

  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: "Home",
  setup () {
    const newRecipe = ref({
      title: '',
      description: '',
      ingredients: [],
      method: [],
      ingredientRows: 1,
      methodRows: 1

    });

const store = useStore();
    const modalOpen = ref(false);
    const toggleModal = () => {
        modalOpen.value = !modalOpen.value;
    };

    const addNewIngredient = () => {
      newRecipe.value.ingredientRows++;
    }

    const addNewStep = () => {
       newRecipe.value.methodRows++;
    }

    const addNewRecipe = () => {
      newRecipe.value.slug = newRecipe.value.title.toLowerCase().replace(/\s/g, '-');
      if (newRecipe.value.slug === '') {
          alert("title is required");
          return;
      }

      store.commit('ADD_RECIPE', { ...newRecipe.value });
      newRecipe.value = {
         title: '',
         description: '',
         ingredients: [],
         method: [],
         ingredientRows: 1,
         methodRows: 1
      }

      toggleModal();
    }

    return {
      newRecipe,
      toggleModal,
      modalOpen,
      addNewIngredient,
      addNewStep,
      addNewRecipe,

    }
  }

};
</script>


<style >
.home{
  padding:1rem;
  display:flex;
  flex-direction:column;
  align-items:center;
}

h1{
  font-size: 3rem;
  margin-bottom: 32px;
}

.recipes{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  width: 700px;
}

.recipes .card{
  padding:1rem;
  border-radius: 5px;
  margin: 1rem;
  background-color: #081c33;
}

.recipes .card p{
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.add-recipe-modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

}

.add-recipe-modal .modal-content{
  background-color: #081c33;
  padding:2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 768px;
}

.modal-content h3{
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.modal-content .form-group{
  margin-bottom: 1rem;
}

.modal-content .form-group label{
  display: block;
  margin-bottom: 0.5rem;
}

.modal-content .form-group input,
.modal-content .form-group textarea{
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.modal-content .form-group textarea{
  height: 100px;
  resize: none;
}

.modal-content button[type="submit"]{
  margin-right: 1rem;
}




</style>

