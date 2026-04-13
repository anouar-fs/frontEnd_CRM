import "./StatCard.scss";

const StatCard = ({
title,
value,
trendText,
trendType = "up", // "up" | "down"
icon: Icon,
gradient = ["#ffb36b", "#f46fa3"],
className = "",
}) => {
const [from, to] = gradient;

return (
    <article
    className={`stat-card ${trendType === "down" ? "is-down" : "is-up"} ${className}`}
    style={{
        "--card-from": from,
        "--card-to": to,
    }}
    >
    <div className="stat-card__overlay" />

    <div className="stat-card__content">
        <div className="stat-card__top">
        <h3 className="stat-card__title">{title}</h3>

        {Icon && (
            <div className="stat-card__icon">
            <Icon size={22} strokeWidth={2.2} />
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