import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import * as R from 'ramda'
import {Link} from 'react-router-dom'

import {fetchPhoneById, addPhoneToBasket} from '../../actions'
import {getPhoneById} from '../../selectors'
import Basketcart from '../../components/Basketcart'

const renderfields = (phone) => {
  const colField = R.compose(
    R.toPairs,
    R.pick(['cpu', 'camera', 'size', 'weight', 'display', 'battery', 'memory'])
  )(phone)

  return colField.map(([key, value]) => (
    <div className="column" key={key}>
      <div className="ab-details-title">
        <p>{key}</p>
      </div>
      <div className="ab-details-info">{value}</div>
    </div>
  ))
}

const renderContent = (phone) => {
  return (
    <div className="thumbnail">
      <div className="row">
        <div className="col-md-6">
          <img src={phone.image} alt={phone.name} className="img-thumbnail" />
        </div>
        <div className="col-md-6"> {renderfields(phone)} </div>
      </div>
      <div className="caption-full">
        <h4 className="pull-right">${phone.price}</h4>
        <h4>{phone.name}</h4>
        <p> {phone.description}</p>
      </div>
    </div>
  )
}

const renderSidebar = (props) => {
  const {phone, addPhoneToBasket} = props
  return (
    <div>
      <p className="lead"> Quick shop </p>
      <Basketcart />
      <div className="form-group">
        <h1> {phone.name}</h1>
        <h2> ${phone.price}</h2>
      </div>
      <Link to="/" className="btn btn-info btn-block">
        {' '}
        Back to store{' '}
      </Link>
      <button
        type="button"
        className="btn btn-success btn-block"
        onClick={() => addPhoneToBasket(phone.id)}
      >
        {' '}
        Add to cart{' '}
      </button>
    </div>
  )
}

export const Phone = (props) => {
  const {fetchPhoneById} = props

  useEffect(() => {
    fetchPhoneById(props.match.params.id)
  }, [fetchPhoneById])
  console.log('phone', props.phone)

  return (
    <>
      <div className="view-container">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              {props.phone && renderContent(props.phone)}
            </div>
            <div className="col-md-3">
              {props.phone && renderSidebar(props)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    phone: getPhoneById(state, state.phonePage.id),
  }
}

const mapDispatchToProps = {
  fetchPhoneById,
  addPhoneToBasket,
}

export default connect(mapStateToProps, mapDispatchToProps)(Phone)
