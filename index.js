const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combinedReducers = redux.combineReducers;
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

function buyCake() {
  return {
    type: 'BUY_CAKE',
    info: 'First redux action'
  }
}

function buyIceCream() {
  return {
    type: 'BUY_ICE_CREAM',
    info: 'First redux action'
  }
}

const initialCakeState = {
  numOfCakes: 10
}

const initialIceCreamState = {
  numberOfIceCreams: 30
}

function cakeReducer(prevState = initialCakeState, action) {
  switch (action.type) {
    case BUY_CAKE: return {
      ...prevState,
      numOfCakes: prevState.numOfCakes - 1
    }
    default: return prevState
  }
}

function iceCreamReducer(prevState = initialIceCreamState, action) {
  switch (action.type) {
    case BUY_ICE_CREAM: return {
      ...prevState,
      numberOfIceCreams: prevState.numberOfIceCreams - 1
    }
    default: return prevState
  }
}

const rootReducer = combinedReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log('initial state is', store.getState());
const unsubscribe = store.subscribe(() => { } );
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyCake());
unsubscribe();
