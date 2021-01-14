import { combineReducers } from 'redux';
import { navigation } from './reducers/navigation/navigation.reducer';
import { rpc } from './reducers/rpc/rpc.reducer';
import { user } from './reducers/user/user.reducer';
import { origin } from './reducers/origin/origin.reducer';

const rootReducer = combineReducers({
    navigation,
    rpc,
    user,
    origin
});

export default rootReducer;