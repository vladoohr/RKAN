import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as actions from '../../actions'

class SingleAdvertisement extends React.Component {
    constructor(props) {
        super(props)
        this.state = { image: '' }
    }

    componentWillMount() {
        const { ad_id } = this.props.params
        this.props.loadData(ad_id)
    }

    handleDeleteAd() {
        const r = confirm("Дали сте сигурен?")
        if (r == true) {
           this.props.deleteAdvertisement(this.props.ad.id, this.props.user.id)
        }
    }

    changeImage(image) {
        this.setState({image})
    }

    renderButtons() {
        const user = JSON.parse(localStorage.getItem('user'))
        const ad_user_id = this.props.ad.user_id
        const ad_id = this.props.ad.id

        if ( user && user.id == ad_user_id) {
            return (
                <div className="col-md-2">
                    <div className="ad-change-btn">
                        <Link to={`/ads/edit/${ad_id}`} className="btn btn-primary">Промени</Link>
                    </div>
                    <div>
                        <Link onClick={this.handleDeleteAd.bind(this)} className="btn btn-danger">Избриши</Link>
                    </div>
                </div>
            )
        } else {
            return ''
        }
    }

    renderImages() {
        const { images } = this.props.ad
        if ( images ) {
            return (
                images.map( (img, index) => {
                    return (
                        <img
                            onClick={this.changeImage.bind(this, img.url)}
                            className="search-ad-image" 
                            src={img.url}
                            key={index}
                            height="50" 
                            width="50" />
                    )   
                })
            )
        }

        return ''
    }

    renderSuccessMsg() {
        const { successEditMessage } = this.props

        if ( successEditMessage != "" ) {
            return (
                <div className='alert alert-success'>
                    <p>{ successEditMessage }</p>
                </div>
            )
        }
    }

	render() {
        const { id, images, title, description, price, updated_at, city, category } = this.props.ad
        const { full_name, email, phone } = this.props.user
        let image_url

        if ( this.state.image != '' ) {
            image_url = this.state.image
        } else if ( typeof images !== 'undefined' && images.length > 0 ) {
            image_url = images[0].url
        } else {
            image_url = '../../../images/images.jpg'
        }

        return (
            <div className="container">
                <div className="col-md-10">
                    { this.renderSuccessMsg() }
                </div>
                <div className="col-md-10 advertisement">
                    <div className=" col-md-4 pull-left">
                        <img className="search-ad-image" src={image_url} height="150" width="100%" />
                        <div className="ad-images">
                            { this.renderImages()}
                        </div>
                        <p className="m-l-2"><small>{updated_at}</small></p>
                        <p className="left-text">&#9737; {city}</p>
                        <p className="left-text">&#9759; {category}</p>
                    </div>
                    <div className="col-md-6 m-t-1">
                        <Link to={`/ad/${id}`} className="search-ad-title">{title}</Link>
                        <p className="m-t-1">{description}</p>
                        <p className="search-ad-price">{price ? `${price} МКД` : 'По договор'}</p>
                    </div>

                    { this.renderButtons() }

                    <div className="col-md-12">
                        <p className="right-text m-t-3">&#9817; {full_name}</p>
                        <p className="right-text">&#9990; <Link to={`tel:${phone}`}>{phone}</Link></p>
                        <p className="right-text">&#x40; <Link to="#">Прати маил</Link></p>
                    </div>             
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.ads.user,
        ad: state.ads.ad_data,
        successEditMessage: state.ads.successEditMessage
    }
}

export default connect(mapStateToProps, actions)(SingleAdvertisement)