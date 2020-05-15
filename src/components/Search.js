import React, {useState} from 'react'
import {connect} from 'react-redux'
import {searchPhone} from '../actions'

const Search = ({searchPhone}) => {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
    console.log(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    searchPhone(value)
    console.log(value)
  }
  return (
    <div>
      <div className="well blosd">
        <h3 className="lead"> Quick Shop </h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
            />

            <span className="input-group-btn">
              <button className="btn btn-default">
                <span className="glyphicon glyphicon-search"></span>
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  searchPhone,
}
export default connect(null, mapDispatchToProps)(Search)
