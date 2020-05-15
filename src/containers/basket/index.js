import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as R from 'ramda'
import {getTotalBasketPrice, getBasketPhonesWithCount} from '../../selectors'

import {removePhoneFromBasket, cleanBasket, basketCheckout} from '../../actions'

const Basket = ({
  phones,
  totalPrice,
  removePhoneFromBasket,
  basketCheckout,
  cleanBasket,
}) => {
  console.log('basket', phones, totalPrice)
  const isBasketEmpty = R.isEmpty(phones)

  const renderSidebar = () => (
    <div>
      <Link to="/" className="btn btn-info">
        <span className="glyphicon glyphicon-info-sign"></span>
        <span> Continue shopping</span>
      </Link>
      {R.not(isBasketEmpty) && (
        <div>
          <button onClick={cleanBasket} className="btn btn-danger">
            <span className="glyphicon glyphicon-trash"> Clear cart</span>
          </button>
          <button
            className="btn btn-success"
            onClick={() => basketCheckout(phones)}
          >
            <span className="glyphicon glyphicon-envelope"> Checkout </span>
          </button>
        </div>
      )}
    </div>
  )
  const renderContent = () => {
    return (
      <div>
        {isBasketEmpty && <div> Your shop cart is empty </div>}
        <div className="table-responsive">
          <table className="table-bordered table-striped table-condensed cf">
            <tbody>
              {phones.map((phone, index) => (
                <tr key={index} className="item-checout">
                  <td className="first-column-checkout">
                    <img
                      className="img-thumbnail"
                      src={phone.image}
                      alt={phone.name}
                    />
                  </td>
                  <td> {phone.name}</td>
                  <td>{phone.price}</td>
                  <td>{phone.count}</td>
                  <td>
                    {' '}
                    <span
                      onClick={() => removePhoneFromBasket(phone.id)}
                      className="delete-cart"
                    ></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {R.not(isBasketEmpty) && (
          <div className="row">
            <div className="pull-right total-user-checkout">
              <b> Total:</b>${totalPrice}
            </div>
            <p></p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="view-container">
      <div className="container">
        <div className="row">
          <div className="col-md-9">{renderContent()}</div>
          <div className="col-md-3">{renderSidebar()}</div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    phones: getBasketPhonesWithCount(state),
    totalPrice: getTotalBasketPrice(state),
  }
}

const mapDispatchToProps = {
  removePhoneFromBasket,
  cleanBasket,
  basketCheckout,
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)
