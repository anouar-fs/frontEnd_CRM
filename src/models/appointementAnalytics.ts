export interface MonthlyStat {
    month: string
    total: number
}

export interface AppointmentAnalyticsType {
    Planned: MonthlyStat[]
    Canceled: MonthlyStat[]
    presented: MonthlyStat[]
    absent: MonthlyStat[]
}