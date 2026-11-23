import React from 'react'

const Notification = ({ successMsg, errorMsg }) => {
  if (!successMsg && !errorMsg) {
    return null
  }
  if (errorMsg) {
    return (
      <h4 className='msg error'>{errorMsg}</h4>
    )
  }
  return (
    <h4 className='msg success'>{successMsg}</h4>
  )
}

export default Notification