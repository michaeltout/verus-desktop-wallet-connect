import { combineReducers } from 'redux';
import { navigation } from './reducers/navigation/navigation.reducer';

const rootReducer = combineReducers({
    navigation,
});

export default rootReducer;