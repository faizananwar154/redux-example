const redux = require('redux');
const createStore = redux.createStore;

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

const initialState = {
  numOfCakes: 10,
  numberOfIceCreams: 30
}

function reducer(prevState = initialState, action) {
  switch (action.type) {
    case BUY_CAKE: return {
      ...prevState,
      numOfCakes: prevState.numOfCakes - 1
    }
    case BUY_ICE_CREAM: return {
      ...prevState,
      numberOfIceCreams: prevState.numberOfIceCreams - 1
    }
    default: return prevState
  }
}

const store = createStore(reducer);
console.log('initial state is', store.getState());
const unsubscribe = store.subscribe(() => console.log('current state is', store.getState()));
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyCake());
unsubscribe();
