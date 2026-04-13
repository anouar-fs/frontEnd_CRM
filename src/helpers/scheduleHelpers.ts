export function timeToMinutes(time: string) {
const [h, m] = time.split(":").map(Number);
return h * 60 + m;
}

export function sortTimes(a: string, b: string) {
return timeToMinutes(a) - timeToMinutes(b);
}

export function formatCreatedAt(createdAt: string, locale: string) {
const date = new Date(createdAt);
return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
}).format(date);
}