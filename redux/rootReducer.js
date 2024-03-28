// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit'
import companyReducer from './companySlice'
import employeeReducer from './employeeSlice'
import createCompanyReducer from './createCompanySlice'
import splitScreenReducer from './splitScreenSlice'

const rootReducer = combineReducers({
  company: companyReducer,
  employee: employeeReducer,
  createCompany: createCompanyReducer, // Make sure createCompanyReducer is correctly added
  splitScreen: splitScreenReducer,
})

export default rootReducer
