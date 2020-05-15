import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {compose} from 'redux'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import * as R from 'ramda'

import {getCategories, getActiveCategoryId} from '../selectors'

const Categories = ({categories, activeCategoryId}) => {
  console.log(activeCategoryId)

  return (
    <div className="well">
      <h4> Brand </h4>
      <div className="list-group">
        {renderAllCategory(activeCategoryId)}
        {categories.map((category, index) =>
          renderCategory(category, index, activeCategoryId)
        )}
      </div>
    </div>
  )
}

const renderAllCategory = (activeCategoryId) => {
  const linkClass = classNames({
    'list-group-item': true,
    active: R.isNil(activeCategoryId),
  })
  return (
    <Link to="/" className={linkClass}>
      All
    </Link>
  )
}

const renderCategory = (category, index, activeCategoryId) => {
  const getActiveState = R.propEq('id', activeCategoryId)

  const linkClass = classNames({
    'list-group-item': true,
    active: getActiveState(category),
  })
  return (
    <Link to={`/categories/${category.id}`} key={index} className={linkClass}>
      {category.name}
    </Link>
  )
}

const mapStateToProps = (state, ownProps) => ({
  categories: getCategories(state),
  activeCategoryId: getActiveCategoryId(ownProps),
})

export default compose(withRouter, connect(mapStateToProps, null))(Categories)
