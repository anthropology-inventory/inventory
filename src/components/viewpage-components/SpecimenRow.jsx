// SpecimenCard is a component that shows in list view
import { formatLocation } from '../../utils/locationFormatter'

const SpecimenRow = ({ specimen, tableColumns }) => {
  return (
    <tr
      className="specimen-link"
      onClick={() => (window.location.href = `/#/specimen/${specimen._id}`)}
    >
      <td className="specimen-image">
        <img
          src={
            specimen.images?.[0]
              ? specimen.images[0]
              : 'http://localhost:3001/uploads/image-not-found.jpg'
          }
          alt="Specimen"
          className="table-img"
        />
      </td>
      {tableColumns.map((key, i) => (
        <td key={i}>
          {key === 'location' ? formatLocation(specimen[key]) : specimen[key]}
        </td>
      ))}
    </tr>
  )
}

export default SpecimenRow
