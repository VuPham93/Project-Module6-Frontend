import {IComment} from './IComment';

export interface IPost {
  postId: number,
  posterId: number,
  posterAvatar: string,
  posterName: string,
  textPost: string,
  imagePost: string,
  videoPost: string,
  linkPost: string,
  postTime: string,
  postLike: number,
  postDislike: number,
  status:number,
  commentList: IComment[]
}
