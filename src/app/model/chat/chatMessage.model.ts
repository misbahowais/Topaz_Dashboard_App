import { ChatUserModel } from "./chatUser.model";

export interface ChatMessageModel {
    id:string,
    sentDateTime:string,
    isSender:boolean,
    sender:ChatUserModel,
    reciever:ChatUserModel,
    messageType:string,
    message:string,
    status:string,
}