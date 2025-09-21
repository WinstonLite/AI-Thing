package com.example.demo.controller;

import com.example.demo.dto.ChatRequest;
import com.example.demo.service.ChatService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {
  private final ChatService chatService;

  public ChatController(ChatService chatService){
    this.chatService=chatService;
  }

  @PostMapping("/api/chat")
  public String chatControllerPOST(@RequestBody ChatRequest chatRequest){
    System.out.println("LOG: Controller received prompt: " + chatRequest.prompt);
    String prompt = chatRequest.prompt;
    String AIAnswer=chatService.generateAIAnswer(prompt);
    System.out.println("LOG: Controller is returning answer: " + AIAnswer);
    return AIAnswer;
  }
}
