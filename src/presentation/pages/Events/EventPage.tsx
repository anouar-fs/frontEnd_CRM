import { useState } from "react";
import type { AdvisorType } from "../../../helpers/TypesHelpers";
import { usegetEventsSuspenseQuery } from "../../../infrastructure/queries/event";
import ScheduleBoard from "../../components/schedule/ScheduleBoard";
import "../../components/schedule/DatePicker.scss"
import type { AppointmentType } from "../../../models/appointment";
const EventPage = () => {

const [date, setDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
});
const appointments = usegetEventsSuspenseQuery(date);

const advisorNames: AdvisorType[] = Array.from(
    new Map(
    (appointments ?? []).map((app) => [
        app.advisor.id,
        {
        id: app.advisor.id,
        firstname: app.advisor.firstname,
        lastname: app.advisor.lastname
        },
    ])
    ).values()
);

return (
    <>
        <ScheduleBoard
        appointments={appointments ?? [] as AppointmentType[] }
        date={date}
        advisorNames={advisorNames}
        updateDate={setDate}
        />
    </>
);
};

export default EventPage;