import React from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import { LoadingFrame } from "."
import { hasReputation } from '../../state/users/current_user/selectors'
import { ErrorView } from './ErrorView'


export const DumbReputationGuard = ({
  isLoading, hasReputation, showLoading, showNotEnough, children, user,
  verifyFunc=null
}) => {
  if (showLoading && isLoading)
    return <LoadingFrame/>
  if (verifyFunc ? verifyFunc(user, hasReputation) : hasReputation)
    return children
  return showNotEnough ? <ErrorView error="notEnoughReputation"/> : null
}

const ReputationGuard = connect((state, props) => ({
  hasReputation: hasReputation(state, props.requiredRep),
  user: state.CurrentUser.data,
  isLoading: state.CurrentUser.isLoading
}))(DumbReputationGuard)

ReputationGuard.propTypes = {
  requiredRep: PropTypes.number.isRequired,
  showLoading: PropTypes.bool,
  showNotEnough: PropTypes.bool,
  verifyFunc: PropTypes.func
}

export default ReputationGuard