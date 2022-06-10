import {createStore,combineReducers} from 'redux'
import recipeReducer from './reducers/recipe';
import location from './reducers/location' 
import contact from './reducers/contact';

const reducers = combineReducers({
    recipe:recipeReducer,
    location:location,
    contact:contact
});

const store = createStore(reducers);

export default store;