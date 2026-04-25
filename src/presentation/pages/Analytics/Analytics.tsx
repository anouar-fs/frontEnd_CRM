import LineChart from "./Charts/LineChart"
import "./Analytics.scss"

const Analytics = () => {
    return (
        <div className="kpi-card">
            <h2 className="kpi-title">
                Key Performance Indicator Of Advisors
            </h2>

            <p className="kpi-description">
                This chart displays the evolution of appointment activity for each advisor
                over time. It covers data from the beginning of the current year up to the
                present month, providing a monthly breakdown of performance.

                <br /><br />

                For each advisor, the chart shows the number of appointments handled per
                month, categorized by status (
                <strong>Planned</strong>, <strong>Presented</strong>,
                <strong>Canceled</strong>, and <strong>Absent</strong>).

                <br /><br />

                This allows you to analyze both the monthly workload distribution and the
                outcome of appointments across different statuses.
            </p>

            <LineChart />
        </div>
    )
}

export default Analytics