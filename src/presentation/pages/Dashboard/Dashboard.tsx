import { usegetAppointementStatsSuspenseQuery } from '../../../infrastructure/queries/AppointementStats';
import { usegetCardsStatsSuspenseQuery } from '../../../infrastructure/queries/CardStats';
import { usegetLeadsStatsSuspenseQuery } from '../../../infrastructure/queries/LeadsStats';
import BarChartCustom from './charts/BarChartCustom';
import PieChartCustom from './charts/PieChartCustom'
import './dashboard.scss'
import DashboardHeader from './header/DashboardHeader';
import DashboardCards from './StatCard/DashboardCards';

const Dashboard = () => {
const pieStats = usegetAppointementStatsSuspenseQuery();
const barStats = usegetLeadsStatsSuspenseQuery();
const cardStats = usegetCardsStatsSuspenseQuery();

return (
    <div style={{height:"100vh"}}>
        <DashboardHeader/>
        <DashboardCards
            cardStats={cardStats}
        />
        <div className='dashboard'>
            <PieChartCustom
                data={pieStats}
            /> 
            <BarChartCustom
                data={barStats}
            />
        </div>
    </div>
)
}

export default Dashboard