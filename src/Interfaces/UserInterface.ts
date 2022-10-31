export interface IUser {
  __v: number;
  _id: string;
  blockedUsers: [];
  chatID: [];
  currentLocation: {_id: string; latitude: string; longitude: string};
  dob: any;
  email: string;
  firstName: string;
  friendsId: [];
  gender: string;
  interests: [];
  isAdmin: boolean;
  lastName: string;
  password: string;
  postID: [];
  profilePic: string;
  sentFriendRequests: string[];
  recievedFriendRequests: string[];
  suspendedTill: Number;
}

export interface IFriendRequest {
  __v: Number;
  _id: String;
  recipient: String;
  requester: {
    _id: String;
    name: String;
    profilePic: any;
    userId: String;
  };
  status: String;
}
