import React from 'react'
import PropTypes from 'prop-types'

const Progress = ({ percentage }) => {
    return (
        <div className="flex-progress">
            <label for="file">Downloading progress: {percentage}%</label>
            <progress className="progress" id="file" value={percentage} max="100"></progress>
        </div>
    )
}

Progress.propTypes = {
    percentage: PropTypes.number.isRequired,
}

export default Progress
