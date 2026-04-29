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
                cardMeta={CARD_META[s.key]}
                value={s.value}
                trendText="Increased by 60%"
                trendType="up"

            />
        ))
    }
    </section>
);
};

export default DashboardCards;