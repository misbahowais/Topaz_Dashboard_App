import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ChatMessageModel } from "../../model/chat/chatMessage.model";

@Injectable({
    providedIn: 'root',
})

export class ChatService {
    
    constructor(private http: HttpClient) {}
    // courseApi: string = urlModel.url + "/Course";


    sentChat(data:ChatMessageModel):ChatMessageModel{
        let existingData = this.getDataFromStore();
       
        if(existingData == null){
            // localStorage.setItem("chats",JSON.stringify([data]));
            this.setDataFromStore(JSON.stringify([data]))
            
        } else{
            let existingDataChat = JSON.parse(existingData) as Array<ChatMessageModel>;
            existingDataChat.push(data);
            // localStorage.setItem("chats",JSON.stringify(existingDataChat));
            this.setDataFromStore(JSON.stringify(existingDataChat))

        }
        return data;
    }

    updateChat(data:ChatMessageModel):boolean{
        let existingData =   this.getDataFromStore();
        data.status = "delivered";
        if(existingData != null){
            // localStorage.setItem("chats",JSON.stringify([data]));
            
       
            let existingDataChat = JSON.parse(existingData) as Array<ChatMessageModel>;
            let chatIndex = existingDataChat.findIndex((val) => val.id == data.id);
            if(chatIndex != -1){
                existingDataChat[chatIndex] = data;
            }
            this.setDataFromStore(JSON.stringify(existingDataChat))
            // localStorage.setItem("chats",JSON.stringify(existingDataChat));
        }
        return true;
    }

    getAllChat():Array<ChatMessageModel>{
        let existingData =  this.getDataFromStore();
        if(existingData == null){
            return [];
        } else{
            return JSON.parse(existingData) as Array<ChatMessageModel>;
        }
    }

    getChatCountNotSeen():number{
        let data = this.getAllChat();
        return data.filter((val) => val.status.toLowerCase() == "delivered").length;
    }

    generateRandomChatAtInterval(){
        
    }

    private getDataFromStore():string|null{
        return localStorage.getItem("chats") as (string|null);
    }
    private setDataFromStore(data:string):void{
         localStorage.setItem("chats",data);
    }

}