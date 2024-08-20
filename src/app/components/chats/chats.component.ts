import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { count } from 'console';
import { DateformatPipe } from '../../dateformat.pipe';
import { ChatMessageModel } from '../../model/chat/chatMessage.model';
import { ChatUserModel } from '../../model/chat/chatUser.model';
import { ChatService } from '../../service/chats/chats.service';
import { GuuidGen } from '../../service/guuidGen/guuidGen.service';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,DateformatPipe],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent implements OnInit {
  constructor(private guuid: GuuidGen, private chatSrv: ChatService) { }
  ngOnInit(): void {
    this.getAllChat();
    this.initTime();
  }
  show: boolean = false;
  isSubmit: boolean = false;

  chatSender: ChatUserModel = {
    name: 'Misbah',
    profilePic: 'https://flowbite.com/docs/images/logo.svg'
  }
  receiverSender: ChatUserModel = {
    name: 'Topaz',
    profilePic: 'http://www.topaztel.com/wp-content/uploads/2017/05/Topaz-150x49.png'
  }
  allChatMessage: ChatMessageModel[] = [];
  chatMessage: ChatMessageModel = {
    id: '',
    sentDateTime: '',
    isSender: true,
    sender: this.chatSender,
    reciever: this.receiverSender,
    messageType: 'text',
    message: '',
    status: ''
  }
  randomChatMessageFromReciever: ChatMessageModel = {
    id: '',
    sentDateTime: '',
    isSender: false,
    sender: this.chatSender,
    reciever: this.receiverSender,
    messageType: 'text',
    message: '',
    status: ''
  }
  form = new FormGroup({
    message: new FormControl(null, [Validators.required]),
  });

  get message() {
    return this.form.get('message');
  }

  sentChat() {
    this.isSubmit = true;
    if (!this.form.invalid) {
      this.chatMessage.id = this.guuid.short();
      this.chatMessage.sentDateTime = (new Date()).toISOString();
      this.chatMessage.message = this.form.get('message')?.value ?? "";
      this.chatMessage.status = "delivered";
      this.chatMessage = this.chatSrv.sentChat(this.chatMessage);
      this.allChatMessage.push(this.chatMessage)
      this.scrollToBottom()
      this.resetMessage();
    }
  }

  getAllChat() {
    this.allChatMessage = this.chatSrv.getAllChat();
  }

  toggleChat() {
    this.show = !this.show
    this.scrollToBottom()
  }


  closeChat() {
    this.toggleChat();
  }
  initTime() {

    let count = 0;
    var x = setInterval(() => {
      // whatever code
      this.generateRandomMessageFromReceiver();
      if (count >= 5) clearInterval(x);
      count++;
      this.scrollToBottom();
    }, 5000);

  }
  generateRandomMessageFromReceiver() {
    this.randomChatMessageFromReciever.id = this.guuid.short();
    this.randomChatMessageFromReciever.sentDateTime = (new Date()).toISOString();
    this.randomChatMessageFromReciever.message = "Hi from Topaz"
    this.randomChatMessageFromReciever.status = "recieved"
    this.randomChatMessageFromReciever = this.chatSrv.sentChat(this.randomChatMessageFromReciever);
    this.allChatMessage.push(this.randomChatMessageFromReciever)

  }


  resetMessage() {
    let msg: ChatMessageModel = {
      id: '',
      sentDateTime: '',
      isSender: true,
      sender: this.chatSender,
      reciever: this.receiverSender,
      messageType: 'text',
      message: '',
      status: ''
    }
    this.form.get('message')?.setValue(null);
    this.isSubmit = false;
    this.chatMessage = msg;
  }

  scrollToBottom() {
    const element = document.getElementById("chat-cont") as any;
    element.scrollTop = 100000000;
  }
}
