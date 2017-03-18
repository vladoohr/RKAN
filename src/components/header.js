import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Header extends Component {
 constructor() {
		super()
		this.state = {collapsed: true}
	}

	toggleCollapse() {
		const collapsed = !this.state.collapsed
		this.setState({ collapsed })
	}

	render(){
		const { location, authenticated, user } = this.props
		const rootActive = location.pathname === "/" ? 'active' : ''
		const newActive = location.pathname.match(/new/) ? 'active' : ''
		const helpActive = location.pathname.match(/help/) ? 'active' : ''
		const signinActive = location.pathname.match(/signin/) ? 'text-bold' : ''
		const signupActive = location.pathname.match(/signup/) ? 'text-bold' : ''
		const userAds = location.pathname.match(/user\/ads/) ? 'text-bold' : ''

		const { collapsed } = this.state
		const collapseClass = this.state.collapsed ? 'collapse' : ''
		const pullNav = this.state.collapsed ? 'pull-xs-right' : 'pull-xs-left'

		const renderMenuItems = () => {
			if (authenticated) {
				return(
					<ul className={"nav navbar-nav " + pullNav}>
		        		<li className="nav-item">
			    			<Link to="signin" className={"nav-link " + signinActive}>Hello, {this.props.user.name}</Link>
				    	</li>
		        	</ul>
				)
			}

			return(
		        <ul className={"nav navbar-nav " + pullNav}>
		        	<li className="nav-item">
			    		<Link to="signin" className={"nav-link " + signinActive}>Sign in</Link>
				    </li>
		        </ul>
			)
		}
	
		return(
			<div>
				<nav className="navbar navbar-full navbar-dark bg-inverse">
					<div className="container">
						<button className="navbar-toggle hidden-sm-up" type="button" onClick={this.toggleCollapse.bind(this)} data-toggle={ collapseClass }>
		    			&#9776;
		  			</button>

		  			<div className={ "navbar-toggleable-xs " + collapseClass}>
			  			<a className="navbar-brand" href="/">
						    <em>RKAN</em>
						</a>
			      </div>
			      { renderMenuItems() }
			    </div>
				</nav>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		authenticated: state.auth.authenticate,
		user: state.auth.user
	}
}

export default connect(mapStateToProps)(Header)