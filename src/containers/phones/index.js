import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {
  fetchPhones,
  fetchCategories,
  loadMorePhones,
  addPhoneToBasket,
} from '../../actions'
import {getPhones} from '../../selectors'
import Layout from '../../containers/layout'

import * as R from 'ramda'

function renderPhone(phone, index, addPhoneToBasket) {
  const shortDescription = `${R.take(60, phone.description)}...`
  return (
    <div className="col-sm-4 book-list" key={index}>
      <div className="thumbnail">
        <img className="img-thumbnail" src={phone.image} alt={phone.name} />
      </div>
      <div className="caption">
        <h4 className="pull-right"> {phone.price}</h4>
        <h4>
          {' '}
          <Link to={`/phones/${phone.id}`}> {phone.name} </Link>
        </h4>
        <p>{shortDescription}</p>
        <p className="itemButton">
          <button
            className="btn btn-primary"
            onClick={() => addPhoneToBasket(phone.id)}
          >
            {' '}
            Buy Now{' '}
          </button>
          <Link className="btn btn-default" to={`/phones/${phone.id}`}>
            {' '}
            More info{' '}
          </Link>
        </p>
      </div>
    </div>
  )
}

const Phones = (props) => {
  const {phones, fetchPhones, loadMorePhones, fetchCategories} = props
  const {addPhoneToBasket} = props

  useEffect(() => {
    fetchPhones()
  }, [fetchPhones])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <Layout>
      <div className="books row">
        {phones.map((phone, index) =>
          renderPhone(phone, index, addPhoneToBasket)
        )}

        <div className="row">
          <div className="col-md-12">
            <button
              onClick={loadMorePhones}
              className="pull-right btn btn-primary"
            >
              {' '}
              Load More
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state, ownProps) => ({
  phones: getPhones(state, ownProps),
})

const mapDispatchToProps = {
  fetchPhones,
  loadMorePhones,
  addPhoneToBasket,
  fetchCategories,
}

export default connect(mapStateToProps, mapDispatchToProps)(Phones)
