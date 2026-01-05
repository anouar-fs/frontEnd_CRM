export const api = {
    post : {
        auth: ()=> '/api/Auth/Login',
        refresh: ()=>'/api/Auth/refresh',
        logout: ()=>'/api/Auth/logout'
    },
    get : {
        users: ()=> '/api/Auth',
        leads: ()=> '/api/Lead'
    }
}