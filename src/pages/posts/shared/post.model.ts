export interface Post{
    threadId: number,
    poster: {
        id: number,
        name: string,
        avatar: string
    },
    numLikes: number,
    numComments: number,
    content: {
        type: string,
        body: string
    },
    createdDate: Date
}