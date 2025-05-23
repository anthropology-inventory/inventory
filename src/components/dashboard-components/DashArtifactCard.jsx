import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
// import IconButton from '@mui/material/IconButton'

/**
 * Card component for displaying artifact details in the dashboard.
 *
 * @component
 * @param {string} imgSrc - The URL of the artifact image.
 * @param {string} description - The description of the artifact (used for alt text).
 * @param {string} name - The name of the artifact.
 * @param {string} id - The specimen ID.
 * @returns {JSX.Element} The rendered DashArtifactCard component.
 */
function DashArtifactCard({ imgSrc, description, name, id, dateUpdated }) {
  return (
    <Tooltip title={'View artifact'} placement="top" arrow>
      <Link to={`/specimen/${id}`} id="artifact-card-link">
        <div id="artifact-card">
          <img id="artifact-img" src={imgSrc} alt={description} />
          <div>
            <p>{name}</p>
            <small>Artifact added: {formatDate(dateUpdated)}</small>
          </div>
        </div>
      </Link>
    </Tooltip>
  )
}

DashArtifactCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  description: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  dateUpdated: PropTypes.string.isRequired
}

function formatDate(date) {
  const [year, month, day] = date.split('-').map((num) => parseInt(num, 10))
  const d = new Date(year, month - 1, day - 1)
  const formatted = d.toLocaleString('en-US', {
    timeZone: 'UTC', // forces display in UTC
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return formatted
}

export default DashArtifactCard
