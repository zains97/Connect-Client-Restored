import {IUser} from './UserInterface';

export interface IMessage {
  chatroomId: string;
  sender: IUser;
  messageBody: string;
  date: Date;
}
