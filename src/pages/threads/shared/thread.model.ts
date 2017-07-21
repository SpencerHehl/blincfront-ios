export interface Thread{
    locationId: string,
    title: string,
    numLikes: number,
    numFavorites: number,
    createdBy: number,
    favoritedBy: [number],
    createdDate: Date
}