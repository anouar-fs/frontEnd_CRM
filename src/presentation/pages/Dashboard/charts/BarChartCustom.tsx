import { ResponsiveBar } from "@nivo/bar";
import '../dashboard.scss'
import { useThemeStore } from "../../../../store/auth.store";
import type { LeadsStatsType } from "../../../../models/LeadsStat";

type BarChartCustomProps = {
  data : LeadsStatsType;
}

const BarChartCustom = ({data}:BarChartCustomProps) => {
    const htmltTheme = useThemeStore((state) => state.theme)
    const isDark = htmltTheme === 'dark';
    const colorFont = isDark?"#ffffff":"#000000";
    const stats = [ 
        { xAxis:"Hot leads",count: data.hotLeads},
        { xAxis:"Cold leads",count: data.coldLeads}
    ]
    
    return (
        <>
            <div className='charts'>
                <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
                    Yearly leads stats
                </h3>
                <ResponsiveBar
                    data={stats}
                    theme={{
                    labels: {
                        text: {
                        fontSize: 14,
                        fontWeight: 600,
                        fill: colorFont,
                        },
                    },
                    axis: {
                        ticks: {
                            text: {
                            fontSize: 14,
                            fontWeight: 600,
                            fill: colorFont,
                            },
                        },
                        legend: {
                            text: {
                            fontSize: 14,
                            fontWeight: 600,
                            fill: colorFont,
                            },
                        },
                        },
                    }}
                    keys={["count"]}
                    indexBy="xAxis"
                    margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                    padding={0.3}
                    colors={{ scheme: "nivo" }}
                    axisBottom={{
                    legend: "Leads",
                    legendPosition: "middle",
                    legendOffset: 32,
                    }}
                    axisLeft={{
                        legend: "count",
                        legendPosition: "middle",
                        legendOffset: -40,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    role="application"
                />
                </div>
        </>
    )
}

export default BarChartCustom