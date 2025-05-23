import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Box,
  Card,
  Container,
  Divider,
  Grid2,
  Stack,
  Typography,
  Table,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  Button
} from '@mui/material'
import { fetchSpecimenById } from '../utils/api'
import '../styles/index.css'

export default function SpecimenDetail() {
  const { id } = useParams()
  const [specimen, setSpecimen] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSpecimen = async () => {
      console.log(id)
      const data = await fetchSpecimenById(id)
      if (data) {
        setSpecimen(data)
      }
      setLoading(false)
    }

    fetchSpecimen()
  }, [id])

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (!specimen) {
    return <h2>Specimen not found</h2>
  }

  return (
    <div className="sd-container">
      <Container maxWidth="xl">
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            {/* Title */}
            <Typography variant="h4">
              {specimen.nickName || `${specimen.genus} ${specimen.species}`}
            </Typography>
          </Grid2>
          <Grid2 size={7}>
            <Card variant="outlined">
              <Box sx={{ p: 2 }}>
                {/* Notes */}
                <Typography variant="h6">Notes</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {specimen.notes}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">Genus</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {specimen.genus}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">Species</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {specimen.species}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">Location</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {specimen.location}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">Purchased</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {specimen.dateOfPurchase}
                </Typography>
              </Box>
            </Card>
          </Grid2>
          <Grid2 size={5}>
            {/* Image & Info Card */}
            <Card variant="outlined" className="sd-img-card">
              <Box sx={{ p: 3 }} className="sd-card">
                <img
                  src={
                    specimen.images && specimen.images.length > 0
                      ? `http://localhost:3001${specimen.images[0]}`
                      : 'fallback-image.jpg'
                  }
                  alt={specimen.nickName || 'Specimen Image'}
                  className="sd-img"
                />
                <Typography variant="body1" sx={{ pt: 2, color: 'text.secondary' }}>
                  {specimen.description}
                </Typography>
              </Box>
            </Card>
          </Grid2>
        </Grid2>
        {/* Table of Details */}
        <TableContainer component={Paper} className="sd-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="sd-table-bold">Nick Name</TableCell>
                <TableCell className="sd-table-bold">Genus</TableCell>
                <TableCell className="sd-table-bold">Species</TableCell>
                <TableCell className="sd-table-bold">Anthropologist</TableCell>
                <TableCell className="sd-table-bold">Country</TableCell>
                <TableCell className="sd-table-bold">Region</TableCell>
                <TableCell className="sd-table-bold">Location</TableCell>
                <TableCell className="sd-table-bold">Manufacturer</TableCell>
              </TableRow>
            </TableHead>
            <TableRow>
              <TableCell>{specimen.nickName || 'N/A'}</TableCell>
              <TableCell>{specimen.genus || 'N/A'}</TableCell>
              <TableCell>{specimen.species || 'N/A'}</TableCell>
              <TableCell>{specimen.anthropologist || 'N/A'}</TableCell>
              <TableCell>{specimen.countryFound || 'N/A'}</TableCell>
              <TableCell>{specimen.regionFound || 'N/A'}</TableCell>
              <TableCell>{specimen.location || 'N/A'}</TableCell>
              <TableCell>{specimen.manufacturer || 'N/A'}</TableCell>
            </TableRow>

            <TableHead>
              <TableRow>
                <TableCell className="sd-table-bold">Manufacturer ID</TableCell>
                <TableCell className="sd-table-bold">Specimen ID</TableCell>
                <TableCell className="sd-table-bold">Active Value</TableCell>
                <TableCell className="sd-table-bold">Paid Value</TableCell>
                <TableCell className="sd-table-bold">Purchased</TableCell>
                <TableCell className="sd-table-bold">Purchaser</TableCell>
                <TableCell className="sd-table-bold">Made In</TableCell>
                <TableCell className="sd-table-bold">Material</TableCell>
              </TableRow>
            </TableHead>
            <TableRow>
              <TableCell>{specimen.manufacturerId || 'N/A'}</TableCell>
              <TableCell>{specimen.specimenId || 'N/A'}</TableCell>
              <TableCell>{specimen.activeValue || 'N/A'}</TableCell>
              <TableCell>{specimen.paidValue || 'N/A'}</TableCell>
              <TableCell>{specimen.dateOfPurchase || 'N/A'}</TableCell>
              <TableCell>{specimen.purchaser || 'N/A'}</TableCell>
              <TableCell>{specimen.countryManufactured || 'N/A'}</TableCell>
              <TableCell>{specimen.material || 'N/A'}</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            className="sd-back-btn"
            component={Link}
            to="/SpecimensExplorer"
          >
            Back to Inventory
          </Button>
          <Button
            variant="contained"
            className="sd-back-btn"
            component={Link}
            to={`/UpdateProduct/${specimen._id}`}
          >
            Edit
          </Button>
        </Stack>
      </Container>
      <p></p>
    </div>
  )
}
