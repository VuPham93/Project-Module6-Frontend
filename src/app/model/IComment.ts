export interface IComment{
  commentId: number,
  commenterId: number,
  postId: number,
  content: string,
  commentLike: number,
  commentDislike: number,
  commentTime: string,
  commenterName: string,
  commenterAvatar: string
}
