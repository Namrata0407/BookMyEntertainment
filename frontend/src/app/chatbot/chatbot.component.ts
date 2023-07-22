import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userMessage: string = '';
  chatHistory: string[] = [];
  isBotTyping: boolean = false;

  gameResult: string ="" ;


  dynamicContent: string[] = [
    "Welcome to BookYourEvent",
    "I am your BookYourEvent service bot",
    "How can I assist you?"
  ];
  dynamicContentIndex: number = 0;

  ngOnInit() {
    this.displayDynamicContent();
  }

  displayDynamicContent() {
    const delay = 2500; // Delay between content changes (in milliseconds)
    setInterval(() => {
      this.dynamicContentIndex = (this.dynamicContentIndex + 1) % this.dynamicContent.length;
    }, delay);
  }


  constructor(private http: HttpClient) { }

  sendMessage(): void {
    if (this.userMessage.trim() !== '') {
      this.chatHistory.push(`User: ${this.userMessage}`);
      this.isBotTyping = true;

      // Send user message to OpenAI API and retrieve the response
      const apiUrl = 'https://ill-red-crane-ring.cyclic.app/chat';
      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': 'Bearer yourkey' // Replace with your OpenAI API key
      // });

      const data = {
        "model": "gpt-3.5-turbo",
        // "max_tokens": 20,
        "messages": [
          { "role": "system", "content": "Act as You are online movie service provider. Concise your response only in maximum 30 words minimum can be any thing. If some one ask you anything which is not related to movie or series then only give response as sorry i am only movie service provider. You can also response on greetings.You are an AI-powered online movie service provider. Your objective is to simulate an online movie booking experience and respond to customer inquiries and scenarios. " },
          { "role": "user", "content": this.userMessage }
        ]
      };

      this.http.post<any>(apiUrl, { message: this.userMessage }).subscribe(response => {
        const botResponse = response.message;
        this.chatHistory.push(`Bot: ${botResponse}`);
        this.isBotTyping = false;
        this.userMessage = ''; // Clear user input field
      }, error => {
        console.error('Error sending message:', error);
        this.isBotTyping = false; // Make sure to handle the error appropriately
      });
    }
  }



}