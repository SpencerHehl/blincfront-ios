export interface Location{
    name: {
        fullName: string,
        displayName: string
    },
    geoLocation: {
        lat: string,
        lon: string
    },
    numThreads: number,
    lastVisited: Date,
    visitedBy: [number],
    favoritedBy: [number]
}