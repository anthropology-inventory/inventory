import { useEffect, useState } from 'react'
// Mui
import { PieChart } from '@mui/x-charts/PieChart'
import { cheerfulFiestaPalette } from '@mui/x-charts'
// API
import {
  fetchTotalRecords,
  fetchTotalCost,
  fetchCurrentValue,
  fetchAllArtifactsByCategory,
  fetchRecentSpecimens
} from '../utils/api'
// Custom Components
import SearchBar from '../components/SearchBar'
import AddArtifactBtn from '../components/button-components/AddArtifactBtn'
import ViewCollectionBtn from '../components/button-components/ViewCollectionBtn'
import DashArtifactCard from '../components/dashboard-components/DashArtifactCard'
import DashboardWidget from '../components/dashboard-components/DashboardWidget'

const Dashboard = () => {
  const [totalCount, setTotalCount] = useState(0)
  const [currentVal, setCurrentVal] = useState('')
  const [totalCost, setTotalCost] = useState('')
  const [totalFossils, setTotalFossils] = useState(0)
  const [totalStoneTools, setTotalStoneTools] = useState(0)
  const [totalPottery, setTotalPottery] = useState(0)
  const [recentSpecimens, setRecentSpecimens] = useState([])

  useEffect(() => {
    fetchTotalRecords().then(setTotalCount)
    fetchTotalCost().then(setTotalCost)
    fetchCurrentValue().then(setCurrentVal)
    fetchAllArtifactsByCategory('Fossil').then(setTotalFossils)
    fetchAllArtifactsByCategory('Stone Tool').then(setTotalStoneTools)
    fetchAllArtifactsByCategory('Pottery').then(setTotalPottery)
    fetchRecentSpecimens().then(setRecentSpecimens)
  }, [])

  return (
    <>
      <section id="dashboard-top">
        <SearchBar />
        <ViewCollectionBtn />
        <AddArtifactBtn />
      </section>
      <section id="dashboard">
        <DashboardWidget
          identifier={'collection-cost'}
          hasTooltip={true}
          tooltipTxt={
            'Collection cost is based on user-provided estimates. Accuracy depends on the quality and timeliness user user inputs.'
          }
          widgetTitle={'Collection Cost'}
          content={
            <>
              <p>${totalCost ? totalCost : '-----'}</p>
              <small>Amount paid for the collection</small>
            </>
          }
        />
        <DashboardWidget
          identifier={'collection-value'}
          hasTooltip={true}
          tooltipTxt={
            'Collection value is based on user-provided estimates. Accuracy depends on the quality and timeliness user user inputs.'
          }
          widgetTitle={'Collection Value'}
          content={
            <>
              <p>${currentVal ? currentVal : '-----'}</p>
              <small>Active value of the collection.</small>
            </>
          }
        />
        <DashboardWidget
          identifier={'total-artifacts'}
          widgetTitle={'Total Artifacts'}
          content={
            <>
              <p>{totalCount}</p>
              <small>Total Artifacts</small>
            </>
          }
        />
        <DashboardWidget
          identifier={'inventory-breakdown'}
          widgetTitle={'Inventory Breakdown'}
          content={
            <div>
              <PieChart
                colors={cheerfulFiestaPalette}
                series={[
                  {
                    data: [
                      { id: 0, value: totalFossils, label: 'Fossils' },
                      { id: 1, value: totalPottery, label: 'Pottery' },
                      { id: 2, value: totalStoneTools, label: 'Stone Tools' },
                      { id: 3, value: 0, label: 'Weaponry' },
                      { id: 4, value: 0, label: 'Tools (non-weaponry)' }
                    ],
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 0, additionalRadius: -30, color: 'gray' },
                    cornerRadius: 4,
                    cx: 100,
                    arcLabel: (data) => (data.value > 0 ? `${data.value}` : '')
                  }
                ]}
                slotProps={{
                  pieArcLabel: {
                    style: {
                      fill: 'white',
                      fontWeight: 600
                    }
                  }
                }}
                width={450}
                height={200}
              />
            </div>
          }
        />
        <DashboardWidget
          identifier={'recently-added'}
          widgetTitle={'Recent Updates'}
          content={
            <div id="recently-added-artifacts">
              {recentSpecimens?.map((el, idx) => (
                <DashArtifactCard
                  key={idx}
                  imgSrc={el.images[0]}
                  name={el.nickName ? el.nickName : el.genus + ' ' + el.species}
                  specimenId={el.specimenId}
                  dateUpdated={el.updatedAt}
                  id={el._id}
                />
              ))}
            </div>
          }
        />
      </section>
    </>
  )
}

export default Dashboard
