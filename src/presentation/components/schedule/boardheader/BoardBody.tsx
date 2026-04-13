import { formatCreatedAt } from "../../../../helpers/scheduleHelpers";
import { STATUS_META } from "../../../../helpers/TypesHelpers";
import type { AppointmentType } from "../../../../models/appointment";

type BoardBodyProps = {
    item: AppointmentType;
    locale: string;
};

const BoardBody = ({item,locale}:BoardBodyProps) => {
    const meta = STATUS_META[item.statut] ?? STATUS_META[0];
    const leadName = item.lead
    ? `${item.lead.firstName} ${item.lead.lastName}`
    : "Lead inconnu";
    const advisorName = item.advisor?.username ?? "Conseiller inconnu";

    return (
    <article
        key={item.id}
        className={`schedule-board__item ${meta.className}`}
    >
        <div className="schedule-board__item-top">
        <span className="schedule-board__pill">Lead : {leadName}</span>
        <span className={`schedule-board__status ${meta.className}`}>{meta.label}</span>
        </div>

        <div className="schedule-board__item-body">
        <strong>{advisorName}</strong>
        <p>Created on {formatCreatedAt(item.createdAt, locale)}</p>
        </div>

        <div className="schedule-board__item-bottom">
        <span>Time slot {item.heureDebut}</span>
        <span>#{item.id}</span>
        </div>
    </article>
    )

}

export default BoardBody