import "./DashboardCards.scss"
import StatCard from "./StatCard";
import type { CardStats } from "../../../../models/CardStats";
import { CARD_META } from "../../../../helpers/TypesHelpers";

type DashboardCards={
    cardStats:CardStats,
}
const DashboardCards = ({cardStats}:DashboardCards) => {

    const stats = Object.entries(cardStats).map(([key, value]) => ({
    key,
    value
    }));
return (
    <section className="dashboard-grid">
    {
        stats.map(s => (
            <StatCard
                title={CARD_META[s.key].title}
                value={s.value}
                trendText="Increased by 60%"
                trendType="up"
                icon={CARD_META[s.key].icon}
                gradient={[CARD_META[s.key].color1, CARD_META[s.key].color2]}
            />
        ))
    }
    </section>
);
};

export default DashboardCards;