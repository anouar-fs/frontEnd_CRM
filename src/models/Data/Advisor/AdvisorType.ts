export type AdvisorType = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string,
    role: number
} 
export type AdvisorTypeData = {
    data : AdvisorType[]
}
export const userRolse:Record<number,string> = {
    1:"Advisor",
    2:"Admin",
    3:"CRMManager"
}