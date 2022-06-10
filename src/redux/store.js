import {createStore,combineReducers} from 'redux'
import recipeReducer from './reducers/recipe';
import location from './reducers/location' 

const reducers = combineReducers({
    recipe:recipeReducer,
    location:location
});

const store = createStore(reducers);

export default store;