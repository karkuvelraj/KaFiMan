import  {createStore,applyMiddleware,compose} from "redux"
import reducers from "./reducers"
import reduxImmurtableStateInvariant from "redux-immutable-state-invariant"
import thunk from "redux-thunk"
export default function configureStore(initialState){
    const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
    return createStore(reducers,initialState,composeEnhancer(applyMiddleware(thunk,reduxImmurtableStateInvariant())))
}