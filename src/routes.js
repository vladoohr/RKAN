import React from 'react'
import { Route, IndexRoute } from 'react-router'

// import components
import App from './components/app' 
import Advertisements from './components/advertisements/advertisements'
import NewАdvertisement from './components/advertisements/new_advertisement'
import EditАdvertisement from './components/advertisements/edit_advertisement'
import UserАdvertisements from './components/advertisements/user_advertisements'
import SingleAdvertisement from './components/advertisements/single_advertisement'
import Signup from './components/authentication/signup'
import Signin from './components/authentication/signin'
import Signout from './components/authentication/signout'
import Help from './components/help' 
import NotFound from './components/not_found'
import Authentication from './components/authentication/require_authentication'

const composedNewAdComp = Authentication(NewАdvertisement)
const composedEditAdComp = Authentication(EditАdvertisement)
const composedUserAdsComp = Authentication(UserАdvertisements)

export default (
	<Route path='/' component={App}>
		<IndexRoute component={Advertisements} />
		<Route path='ads/new' component={composedNewAdComp} />
		<Route path='ads/edit/(:id)' component={composedEditAdComp} />
		<Route path='user/ads/(:user_id)' component={composedUserAdsComp} />
		<Route path='ad/(:ad_id)' component={SingleAdvertisement} />
		<Route path='signup' component={Signup} />
		<Route path='signin' component={Signin} />
		<Route path='signout' component={Signout} />
		<Route path='help' component={Help} />
		<Route path='*' component={NotFound} />
	</Route>
)