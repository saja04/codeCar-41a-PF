import {
  CHANGE_CURRENCY,
  DELETE_CAR,
  GET_CARS,
  GET_CAR_BY_ID,
  GET_CAR_BY_NAME,
  GET_FILTERS,
  GET_USERS,
  GET_USER_INFO,
} from "./actions";

const initialState = {
  allCars: [],
  allUsers: [],
  userInfo: null,
  singleCar: null,
  divisa: "car_precio_usd",
  user: null,
  registrationError: null,
  searchCar: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARS: if(state.searchCar[0] ) return {
      ...state,
    };
      return {
        ...state,
        allCars: action.payload,
      };
    case GET_FILTERS:
      return {
        ...state,
        allCars: action.payload,
      };
    case GET_CAR_BY_ID:
      state.singleCar = null;
      console.log(action.payload);
      return {
        ...state,
        singleCar: action.payload,
      };
    case DELETE_CAR:
      return {
        ...state,
        msg: action.payload,
      };
    case GET_CAR_BY_NAME:
      return {
        ...state,
        searchCar: action.payload,
      };
    case CHANGE_CURRENCY:
      return {
        ...state,
        divisa: action.payload,
      };

    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_USER_INFO:
      console.log(action.payload);
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
