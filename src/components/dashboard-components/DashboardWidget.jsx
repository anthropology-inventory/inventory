import PropTypes from 'prop-types'
import { BsInfoCircle } from 'react-icons/bs'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

/**
 * Widget component meant for the dashboard.
 *
 * @component
 * @param {String} title - Widget Title.
 * @param {*} content - Widget content.
 * @param {String} identifier - Class to identify widget.
 * @returns {JSX.Element} The rendered DashboardWidget component.
 */
function DashboardWidget({ widgetTitle, hasTooltip, tooltipTxt, content, identifier }) {
  return (
    <div id="widget" className={identifier}>
      <div className="widget-head">
        <h3>{widgetTitle}</h3>
        {hasTooltip && (
          <Tooltip title={tooltipTxt} placement="right-end" arrow>
            <IconButton className="tooltip-icon">
              <BsInfoCircle />
            </IconButton>
          </Tooltip>
        )}
      </div>
      {content}
    </div>
  )
}

DashboardWidget.propTypes = {
  widgetTitle: PropTypes.string.isRequired,
  hasTooltip: PropTypes.bool,
  tooltipTxt: PropTypes.string,
  content: PropTypes.any.isRequired,
  identifier: PropTypes.string
}

export default DashboardWidget
