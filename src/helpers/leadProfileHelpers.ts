export const formatDateTime = (value: string) => {
const date = new Date(value);
if (Number.isNaN(date.getTime())) return value;

return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
}).format(date);
};

export const timeAgo = (value: string) => {
const date = new Date(value);
if (Number.isNaN(date.getTime())) return value;

const diffMs = Date.now() - date.getTime();
const minutes = Math.max(1, Math.floor(diffMs / 60000));
if (minutes < 60) return `${minutes}m ago`;

const hours = Math.floor(minutes / 60);
if (hours < 24) return `${hours}h ago`;

const days = Math.floor(hours / 24);
return `${days}d ago`;
};

export const toneFor = (value: boolean): StatusTone => (value ? "success" : "warning");

export const toneLabel = (value: boolean) => (value ? "Completed" : "Pending");

export const leadAgeTone = (receivedAt: string): StatusTone => {
const date = new Date(receivedAt);
if (Number.isNaN(date.getTime())) return "neutral";

const ageHours = (Date.now() - date.getTime()) / 36e5;
if (ageHours <= 24) return "success";
if (ageHours <= 72) return "warning";
return "neutral";
};

export type StatusTone = "success" | "warning" | "neutral";