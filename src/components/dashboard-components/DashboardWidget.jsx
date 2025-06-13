import PropTypes from 'prop-types'
import { BsInfoCircle } from 'react-icons/bs'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

/**
 * DashboardWidget component for displaying a titled widget section on the dashboard.
 * Optionally shows a tooltip icon with explanatory text.
 *
 * @component
 * 
 * @param {Object} props - Component props.
 * @param {string} props.widgetTitle - The title text displayed at the top of the widget.
 * @param {boolean} props.hasTooltip - Whether to display the tooltip icon.
 * @param {string} [props.tooltipTxt] - Text content of the tooltip (shown on hover).
 * @param {React.ReactNode} props.content - The main content inside the widget.
 * @param {string} props.identifier - CSS class name to uniquely identify the widget container.
 * 
 * @returns {JSX.Element} Rendered DashboardWidget component.
 *
 * @example
 * <DashboardWidget
 *   widgetTitle="User Stats"
 *   hasTooltip={true}
 *   tooltipTxt="This shows user activity over the past month."
 *   content={<UserStatsChart />}
 *   identifier="user-stats-widget"
 * />
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
