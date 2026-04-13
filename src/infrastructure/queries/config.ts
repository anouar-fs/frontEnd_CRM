export const api = {
    post : {
        auth: ()=> '/api/Auth/Login',
        refresh: ()=>'/api/Auth/refresh',
        logout: ()=>'/api/Auth/logout'
    },
    get : {
        users: ()=> '/api/Auth',
        leads: (page:number,pageSize:number)=> `/api/Lead?page=${page}&pageSize=${pageSize}`,
        lead: (id:number)=> `/api/Lead/${id}`,
        event: (date:string)=>`/rdvs/${date}`,
        appointementStats: ()=>`/api/Event/appointements/status/data`,
        leadsStats: ()=>`/lead/stats`,
        cardStats: ()=>`/appointement/stats`
    }
}