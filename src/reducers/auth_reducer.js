import { 
	AUTH_USER,
	AUTH_ERROR,
	UNAUTH_USER,
	GET_USER_ADS
} from '../actions/types'

const INITIAL_STATE = {
	user: {},
	user_ads: [],
	user_ads_per_page: [],
	authenticate: false,
	errors: []
}
export default function( state=INITIAL_STATE, action ) {
	switch(action.type) {
		case AUTH_USER:
			return { ...state, user: action.payload, authenticate: true, errors: [] }
		case AUTH_ERROR:
			return { ...state, authenticate: false, errors: action.payload.errors }
		case UNAUTH_USER:
			return { ...state, user: {}, authenticate: false, errors: [] }
		case GET_USER_ADS: 
			return { ...state, user_ads:action.payload.user_ads, user_ads_per_page: action.payload.user_ads_per_page, errors: []}
	}
	return state
}
