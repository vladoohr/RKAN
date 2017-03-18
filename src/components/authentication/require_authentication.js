import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function(ComposedComponent) {
	class Authentication extends Component {	
		render() {
			if (this.props.authenticated) {
				return(
					<ComposedComponent {...this.props}/>
				)
			} else {
				return(
					<div className='container alert alert-danger m-t-3'>
						<p>Мора да бидете најавени за да ја извршите оваа акција!</p>
					</div>
				)
			}
		}
	}

	function mapStateToProps(state) {
    return { authenticated: state.auth.authenticate }
  }

	return connect(mapStateToProps)(Authentication)
} 


