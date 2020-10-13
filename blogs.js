const redux = require('redux');
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;


const initialSate = {
    loading: true,
    blogs: [],
    error: ''
};

const FETCH_BLOGS_REQUEST = 'FETCH_BLOGS_REQUEST';
const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
const FETCH_BLOGS_FAILURE = 'FETCH_BLOGS_FAILURE';

function fetchBlogsRequest() {
    return {
        type: FETCH_BLOGS_REQUEST
    }
}

function fetchBlogsSuccess(blogs) {
    return {
        type: FETCH_BLOGS_SUCCESS,
        payload: blogs
    }
}

function fetchBlogsFailure(error) {
    return {
        type: FETCH_BLOGS_FAILURE,
        payload: error
    }
}

function reducer(prevState = initialSate, action){
    switch (action.type) {
        case FETCH_BLOGS_REQUEST: return {
            ...prevState,
            loading: true
        }
        case FETCH_BLOGS_SUCCESS: return {
            ...prevState,
            loading: false,
            blogs: action.payload
        }
        case FETCH_BLOGS_FAILURE: return {
            ...prevState,
            loading: false,
            blogs: [],
            blogs: action.payload
        }
        default: return prevState
    }
}

function fetchBlogs() {
    return function(dispatch) {
        dispatch(fetchBlogsRequest())
        axios.get('http://localhost:3000/api/v1/blogs')
            .then(response => {
                const blogs = response.data;
                dispatch(fetchBlogsSuccess(blogs.map(blog => blog.id)))
            })
            .catch(error => {
                dispatch(fetchBlogsFailure(error))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchBlogs());
