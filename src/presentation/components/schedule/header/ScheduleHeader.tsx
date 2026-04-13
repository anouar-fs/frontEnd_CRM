type ScheduleHeaderProps = {
title?: string;
subtitle?: string;
locale?: string;
stats?: Stats;
currentDate?: string;
updateDate: React.Dispatch<React.SetStateAction<string>>;
date?: string;
};

type Stats = {
total?: number;
advisors?: number;
timeSlots?: number;
busySlots?: number;
};

function formatNiceDate(dateStr: string, locale: string) {
const date = new Date(`${dateStr}T00:00:00`);
return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
}).format(date);
}

const ScheduleHeader = ({
title = "Schedule of the day",
subtitle = "View by time slot",
locale = "fr-FR",
currentDate,
stats,
updateDate,
date
}: ScheduleHeaderProps) => {
return (
    <header className="schedule-board__hero">
    <div>
        <p className="schedule-board__eyebrow">Planning</p>
        <h2 className="schedule-board__title">{title}</h2>
        <p className="schedule-board__subtitle">
        {subtitle}
        {currentDate ? (
            <>
            {" "}·{" "}
            <strong>{formatNiceDate(currentDate, locale)}</strong>
            </>
        ) : null}
        </p>
    </div>

    <div className="date-picker">
        <label>Date :</label>
        <input
            type="date"
            value={date}
            onChange={(e) => updateDate(e.target.value)}
        />
    </div>

    <div className="schedule-board__stats">
        <div className="schedule-board__stat">
        <span>Total</span>
        <strong>{stats?.total ?? 0}</strong>
        </div>
        <div className="schedule-board__stat">
        <span>Advisors</span>
        <strong>{stats?.advisors ?? 0}</strong>
        </div>
        <div className="schedule-board__stat">
        <span>time slots</span>
        <strong>{stats?.timeSlots ?? 0}</strong>
        </div>
        <div className="schedule-board__stat">
        <span>Busy</span>
        <strong>{stats?.busySlots ?? 0}</strong>
        </div>
    </div>
    </header>
);
};

export default ScheduleHeader;