import {IUser} from './UserInterface';

export interface IChatroom {
  __v: number;
  _id: string;
  createdAt: string;
  participants: string[] | IUser[];
  updatedAt: string;
  chatroomName: string;
}
