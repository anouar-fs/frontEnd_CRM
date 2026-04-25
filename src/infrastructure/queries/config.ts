
export const api = {
    post : {
        auth: ()=> '/api/Auth/Login',
        refresh: ()=>'/api/Auth/refresh',
        logout: ()=>'/api/Auth/logout',
        lead: ()=>'/api/Lead'
    },
    get : {
        users: ()=> '/api/Auth',
        leads: (page:number,pageSize:number)=> `/api/Lead?page=${page}&pageSize=${pageSize}`,
        lead: (id:number)=> `/api/Lead/${id}`,
        event: (date:string)=>`/rdvs/${date}`,
        appointementStats: ()=>`/api/Event/appointements/status/data`,
        leadsStats: ()=>`/lead/stats`,
        cardStats: ()=>`/appointement/stats`,
        analyticssStats: (idAdvisor:number)=>`/appointement/Analytics?idAdvisor=${idAdvisor}`,
        advisors: ()=>`/api/Advisor`,
        ActivUser: ()=>`/api/Auth/currentUser`
    },
    delete : {
        lead: (id:number)=> `/api/Lead/${id}`
    }
}