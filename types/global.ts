export type Planet = {
    id: number
    name: string
    isDestroyed: boolean
    description: string
    image: string
    deletedAt: string | null
}

export type Transformation = {
    id: number
    name: string
    image: string
    ki: string
    deletedAt: string | null
}

export type Character = {
    id: number
    name: string
    ki: string
    maxKi: string
    race: string
    gender: string
    description: string
    image: string
    affiliation: string
    deletedAt: string | null
    originPlanet?: Planet
    transformations?: Transformation[]
}


export type ApiResponse<T> = {
    items: T[],
    links: {
        first: string,
        previous: string | null,
        next: string | null,
        last: string
    },
    meta: {
        currentPage: number,
        itemCount: number,
        itemsPerPage: number,
        totalItems: number,
        totalPages: number
    }
}