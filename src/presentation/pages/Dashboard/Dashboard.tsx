import { usegetAppointementStatsSuspenseQuery } from '../../../infrastructure/queries/AppointementStats';
import { usegetCardsStatsSuspenseQuery } from '../../../infrastructure/queries/CardStats';
import { usegetLeadsStatsSuspenseQuery } from '../../../infrastructure/queries/LeadsStats';
import type { AppointmentStatsType } from '../../../models/appointementStats';
import type { CardStats } from '../../../models/CardStats';
import type { LeadsStatsType } from '../../../models/LeadsStat';
import BarChartCustom from './charts/BarChartCustom';
import PieChartCustom from './charts/PieChartCustom'
import './dashboard.scss'
import DashboardHeader from './header/DashboardHeader';
import DashboardCards from './StatCard/DashboardCards';

const Dashboard = () => {
const pieStats = usegetAppointementStatsSuspenseQuery();
const barStats = usegetLeadsStatsSuspenseQuery();
const cardStats = usegetCardsStatsSuspenseQuery();

// useActiveUserStore.setState({ activUser });

return (
    <div style={{height:"100vh"}}>
        <DashboardHeader/>
        <DashboardCards
            cardStats={cardStats ?? {} as CardStats}
        />
        <div className='dashboard'>
            <PieChartCustom
                data={pieStats ?? [] as AppointmentStatsType[]}
            /> 
            <BarChartCustom
                data={barStats ?? {} as LeadsStatsType}
            />
        </div>
    </div>
)
}

export default Dashboard