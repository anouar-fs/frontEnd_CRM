interface Lead {
    email: string
    firstName: string
    id: string
    lastName: string
    phone: string
}

interface SearchHit {
    document: Lead
}

export interface SearchResponse {
    found: number
    hits: SearchHit[]
    page: number
}