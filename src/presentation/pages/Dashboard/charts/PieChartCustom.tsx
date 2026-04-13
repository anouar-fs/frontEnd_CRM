import { ResponsivePie } from '@nivo/pie'
import type { AppointmentStatsType } from '../../../../models/appointementStats'
import { STATUS_META } from '../../../../helpers/TypesHelpers'
import { useThemeStore } from '../../../../store/auth.store'
import '../dashboard.scss'

type PieChartCustomProps = {
  data : AppointmentStatsType[]
}

const stats = (data : AppointmentStatsType[]) =>{
      return data.map((dt)=>(
          { id: STATUS_META[dt.meetingStatus].label, label: STATUS_META[dt.meetingStatus].label, value: dt.percentage,total: dt.total }
      ))
  }
const PieChartCustom = ({data} :PieChartCustomProps) => {
  const htmltTheme = useThemeStore((state) => state.theme)
  const isDark = htmltTheme === 'dark';
  const colorFont = isDark?"#ffffff":"#000000";
  
  return (
        <>
        <div className='charts'>
          <h3 style={{ textAlign: "center", marginBottom: "10px",color: colorFont }}>
            Yearly appointements stats
          </h3>
          <ResponsivePie
            data={stats(data)}
            tooltip={({ datum }) => (
              <div
                style={{
                  background: "white",
                  color: "black",
                  padding: 10,
                  border: "1px solid #ccc",
                  width: "200px"

                }}
              >
                <strong>{datum.label}</strong>
                <br />
                Percentage: {datum.value}%
                <br />
                Total appointments: {datum.data.total}
              </div>
            )}
              theme={{
              labels: {
                text: {
                  fontSize: 14,
                  fontWeight: 600,
                  fill: colorFont,
                },
              },
            }}
            margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
            innerRadius={0.5} // donut style
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'nivo' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={colorFont}
          />
  </div>
        </>
    )
}

export default PieChartCustom