import { createStore } from 'redux';
import manageUser from './Reducer'

export default createStore(manageUser)