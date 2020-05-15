import phones from './mockPhones'
import categories from './mockCategories'
import * as R from 'ramda'

export const fetchPhones = async () => {
  return new Promise((resolve) => {
    resolve(phones)
  })
}

// if we are using REST end point then use the below
// export const fetchPhones = async () => {
//  const {body} = await request.get('http://whateverhost.com/api/phones')
//  return body.phones
// }

export const loadMorePhones = async ({offset}) => {
  return new Promise((resolve) => {
    resolve(phones)
  })
}

export const fetchPhoneById = async (id) => {
  return new Promise((resolve) => {
    const phone = R.find(R.propEq('id', id), phones)
    resolve(phone)
  })
}

export const fetchCategories = async () => {
  return new Promise((resolve) => {
    resolve(categories)
  })
}
