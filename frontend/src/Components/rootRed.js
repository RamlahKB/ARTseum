import {combineReducers} from 'redux';
import authRed from './Redux/Auth/authRed';
import catRed from './Redux/Category/catRed';
import artRed from './Redux/Art/artRed';
import authARed from './Redux/Auth/authARed';
import mailRed from './Redux/Mail/mailRed';
import commRed from './Redux/Comments/comRed';

export default combineReducers({
    auth : authRed,
    adAuth : authARed,
    cat : catRed,
    art : artRed,
    mail : mailRed,
    comm : commRed
});