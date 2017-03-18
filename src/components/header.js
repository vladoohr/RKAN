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
				return (
				<ul className="nav navbar-nav">
					<li className="nav-item">
		    		<Link to="profil" className="nav-link gray small black">{user.full_name}</Link>
			    </li>
			    <li className="nav-item">
		    		<em className='gray small'/>
			    </li>
			    <li className="nav-item">
		    		<Link to={`/user/ads/${user.id}?page=1`} className={`nav-link gray small ${userAds}`}>Твои огласи</Link>
			    </li>			
			    <li className="nav-item">
		    		<em className='gray small'/>
			    </li>
			    <li className="nav-item">
		    		<Link to="signout" className="nav-link gray small">Одјави се</Link>
			    </li>			
		    </ul>
				)
			}

			return (
				<ul className="nav navbar-nav">
					<li className="nav-item">
		    		<Link to="signin" className={"nav-link gray small " + signinActive}>Најава</Link>
			    </li>
			    <li className="nav-item">
		    		<em className='gray small'/>
			    </li>
			    <li className="nav-item">
		    		<Link to="signup" className={"nav-link gray small " + signupActive}>Регистрација</Link>
			    </li>
		    </ul>
			)		
		}
	
		return(
			<div>
				<div id='top-navbar' className='container'>
					{renderMenuItems()}
				</div>
				<nav className="navbar navbar-full navbar-dark bg-inverse">
					<div className="container">
						<button className="navbar-toggle hidden-sm-up" type="button" onClick={this.toggleCollapse.bind(this)} data-toggle={ collapseClass }>
		    			&#9776;
		  			</button>

		  			<div className={ "navbar-toggleable-xs " + collapseClass}>
			  			<a className="navbar-brand" href="/?page=1">
						    <img src="../../images/logo.jpg" width="40" height="40" className="d-inline-block align-top" alt="" />
						  </a>
			  			<a className="navbar-brand" href="/?page=1">
							  <em>KupiProdaj.mk</em>
							</a>
			        <ul className={"nav navbar-nav " + pullNav}>
			        	<li className={ "nav-item " + rootActive }>
			        		<Link to="/?page=1" className="nav-link">Сите огласи <em className='red'>/</em></Link>
						    </li>
						    <li className={ "nav-item " + newActive }>
			        		<Link to="/ads/new" className="nav-link">Внеси оглас  <em className='green'>/</em></Link>
						    </li>
						    <li className={ "nav-item " + helpActive }>
			        		<Link to="/help" className="nav-link">Помош <em className='blue'>/</em></Link>
						    </li>
			        </ul>
			      </div>
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