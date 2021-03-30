import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ msg }) => {
    return (
        <div className={`alert ${msg.includes('deleted') ? 'deleted' : 'success'}`}>
            {msg}
        </div>
    )
}

Message.propTypes = {
    msg: PropTypes.string.isRequired,
}

export default Message
