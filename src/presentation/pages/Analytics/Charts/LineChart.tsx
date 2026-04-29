import { ResponsiveLine } from '@nivo/line'
import { usegetAnalyticsStatsSuspenseQuery } from '../../../../infrastructure/queries/AnalyticsStats'
import { useState } from 'react';
import "../Analytics.scss"
import { usegetAdvisorsSuspenseQuery } from '../../../../infrastructure/queries/Advisors';
import type { MonthlyStat } from '../../../../models/appointementAnalytics';


const LineChart = () => {
    const [advisorId,setAdvisorId] = useState(3); 

    const analytics = usegetAnalyticsStatsSuspenseQuery(advisorId);
    const advisors = usegetAdvisorsSuspenseQuery();
    const data = Object.entries(analytics ?? {}).map(([stat,values])=>({
        id:stat,
        data: values.map((app:MonthlyStat)=>({
            x: app.month,
            y: app.total,
        })) 
        }
    ))

    return (
    <>
        <select
            className='advisor-select'
            value={advisorId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setAdvisorId(Number(e.target.value))
            }
            >
                {(advisors ?? []).map((advisor)=>(
                    <option key={advisor.id} value={advisor.id}>{advisor.firstname+' '+advisor.lastname}</option>
                ))}
        </select>
        <div className="chart-container">
            <h3 className="chart-title">Appointments Analytics</h3>

                <ResponsiveLine
                theme={nivoTheme}
                data={data}
                margin={{ top: 50, right: 100, bottom: 100, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 'auto',
                    stacked: false,
                }}
                axisBottom={{
                    legend: 'Month',
                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    legend: 'Appointements',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                colors={{ scheme: 'category10' }}
                pointSize={10}
                pointBorderWidth={2}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                {
                    anchor: 'top-right',
                    direction: 'column',
                    translateX: 90,
                    itemWidth: 80,
                    itemHeight: 20,
                    symbolSize: 12,
                    symbolShape: 'circle',
                },
                ]}
            />
        </div>
    </>
)
}


const nivoTheme = {
    background: 'transparent',
    textColor: 'var(--schedule-board-text)',
    fontFamily: 'var(--font-family)',

    axis: {
        legend: {
        text: {
            fontSize: 14,
            fontWeight: 700,
            fill: 'var(--schedule-board-text)',
        },
        },
        ticks: {
        text: {
            fontSize: 13,
            fontWeight: 600,
            fill: 'var(--schedule-board-muted)',
        },
        },
    },

    legends: {
        text: {
        fontSize: 13,
        fontWeight: 600,
        fill: 'var(--schedule-board-text)',
        },
    },

    tooltip: {
        container: {
        background: 'var(--schedule-board-surface)',
        color: 'var(--schedule-board-text)',
        fontSize: 13,
        fontWeight: 600,
        borderRadius: 10,
        border: '1px solid var(--schedule-board-border)',
        boxShadow: 'var(--schedule-board-card-shadow)',
        },
    },

    grid: {
        line: {
        stroke: 'var(--schedule-board-border)',
        strokeDasharray: '4 4',
        },
    },
}

export default LineChart