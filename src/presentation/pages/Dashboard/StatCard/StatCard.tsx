import type { CardMeta } from "../../../../helpers/TypesHelpers";
import "./StatCard.scss";

type StatCardProps = {
    cardMeta : CardMeta;
    value : number;
    trendText : string;
    trendType : string;


}
const StatCard = ({
                cardMeta,
                value,
                trendText,
                trendType,
                }:StatCardProps) => {
    

return (
    <article
    className={`stat-card ${trendType === "down" ? "is-down" : "is-up"}`}
    style={{
        ["--card-from" as string]: cardMeta.color1,
        ["--card-to" as string]: cardMeta.color2,
    }}
    >
    <div className="stat-card__overlay" />

    <div className="stat-card__content">
        <div className="stat-card__top">
        <h3 className="stat-card__title">{cardMeta.title}</h3>

        {cardMeta.icon && (
            <div className="stat-card__icon">
            <cardMeta.icon size={22} strokeWidth={2.2} />
            </div>
        )}
        </div>

        <div className="stat-card__value">{value}</div>

        <div className="stat-card__trend">
        {trendText}
        </div>
    </div>
    </article>
);
};

export default StatCard;