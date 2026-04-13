
type BoardHeaderProps = {
length: number;
slot: string;
};

const BoardHeader = ({length,slot}:BoardHeaderProps) => {
return (
    <div className="schedule-board__slot-head">
            <div className="schedule-board__slot-time">{slot}</div>
            <div className="schedule-board__slot-count">
                {length} appointment
            </div>
    </div>
)
}

export default BoardHeader