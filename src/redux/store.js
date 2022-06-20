import {createStore,combineReducers} from 'redux'
import recipeReducer from './reducers/recipe';
import location from './reducers/location' 
import contact from './reducers/contact';
import user from './reducers/user'
import chat from './reducers/chats'

const reducers = combineReducers({
    recipe:recipeReducer,
    location:location,
    contact:contact,
    user:user,
    chat:chat
});

const store = createStore(reducers);

export default store;