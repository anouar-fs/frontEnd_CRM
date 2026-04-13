
const DatePicker = () => {
return (
    <div>
        <div style={{ marginBottom: "16px" }}>
            <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
        </div>
    </div>
);
}

export default DatePicker