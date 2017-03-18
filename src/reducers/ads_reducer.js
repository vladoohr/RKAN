import { 
	NEW_AD,
	EDIT_AD,
	DELETE_AD,
	DELETE_PHOTO_AD,
	ERROR_AD,
	LOAD,
	GET_ADS,
	FEATURED_AD
} from '../actions/types'

const INITIAL_STATE = {
	errorMessages: [],
	successMessage: '',
	successEditMessage: '',
	load_data: {},
	ad_data: {},
	featured_ad: {},
	user: {},
	ads: [],
	ads_per_page: []
}

export default function(state=INITIAL_STATE, action) {
	switch(action.type) {
		case NEW_AD:
			return {...state, errorMessages: [], successMessage: action.payload}
		case EDIT_AD:
			return {...state, errorMessages: [], successEditMessage: action.payload}
		case DELETE_AD:
			return {...state, successMessage: action.payload}
		case DELETE_PHOTO_AD:
			return {...state, load_data: action.payload.load_ad}
		case ERROR_AD:
			return {...state, errorMessages: action.payload.errors, successMessage: ''}
		case LOAD:
			return {...state, load_data: action.payload.load_ad, ad_data: action.payload.ad, user: action.payload.user}
		case GET_ADS:
			return {...state, ads: action.payload.ads, ads_per_page: action.payload.ads_per_page}
		case FEATURED_AD:
			return {...state, featured_ad: action.payload.featured}
	}

	return state
}