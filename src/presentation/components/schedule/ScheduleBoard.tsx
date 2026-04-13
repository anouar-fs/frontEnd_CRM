import React from "react";
import "./ScheduleBoard.scss";
import ScheduleHeader from "./header/ScheduleHeader";
import type { AppointmentType } from "../../../models/appointment";
import { sortTimes } from "../../../helpers/scheduleHelpers";
import { type AdvisorType } from "../../../helpers/TypesHelpers";
import BoardHeader from "./boardheader/BoardHeader";
import BoardBody from "./boardheader/BoardBody";


type ScheduleBoardProps = {
appointments: AppointmentType[];
date?: string;
title?: string;
subtitle?: string;
advisorNames: AdvisorType[];
locale?: string;
updateDate: React.Dispatch<React.SetStateAction<string>>;
};

export default function ScheduleBoard({
appointments,
date,
advisorNames,
title = "Schedule of the day",
subtitle = "View by time slot",
locale = "en-US",
updateDate
}: ScheduleBoardProps) {
    

    // time slots of appointements
const timeSlots = React.useMemo(() => {
    return Array.from(new Set(appointments.map((item) => item.heureDebut))).sort(sortTimes);
}, [appointments]);

// create a map for appointements and their timeSlot 
const appointmentsBySlot = React.useMemo(() => {
    const map = new Map<string, AppointmentType[]>();

    for (const item of appointments) {
    const list = map.get(item.heureDebut) ?? [];
    list.push(item);
    map.set(item.heureDebut, list);
    }

    return map;
}, [appointments]);

//stats to pass to the header as a prop
const stats = {
    total: appointments.length,
    advisors: advisorNames.length,
    timeSlots: timeSlots.length,
    busySlots: timeSlots.filter((slot) => (appointmentsBySlot.get(slot)?.length ?? 0) > 0).length,
};

if (!appointments.length) {
    return (<>
    <ScheduleHeader
        title={title}
        subtitle={subtitle}
        locale={locale}
        stats={stats}
        currentDate={date}
        updateDate={updateDate}
        date={date}
    />
    <section className="schedule-board">
        <div className="schedule-board__empty">
        <h2>{title}</h2>
        <p>No data available for today.</p>
        </div>
    </section>
    </>
    );
}

return (
    <section className="schedule-board">
    <ScheduleHeader
        title={title}
        subtitle={subtitle}
        locale={locale}
        stats={stats}
        currentDate={date}
        updateDate={updateDate}
        date={date}
    />

    <div className="schedule-board__list">
        {timeSlots.map((slot) => {
        const items = appointmentsBySlot.get(slot) ?? [];

        return (
            <section key={slot} className="schedule-board__slot">
            <BoardHeader
            length={items.length}
            slot={slot}
            key={slot}
            />

            <div className="schedule-board__slot-content">
                {
                items.map((item) => {
                    return (
                    <BoardBody
                        item={item}
                        locale={locale}
                    />)
                })
                }
                
            </div>
            </section>
        );
        })}
    </div>
    </section>
);
}