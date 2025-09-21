package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.OllamaRequest;
import com.example.demo.dto.OllamaResponse;

@Service
public class ChatService {

  public String generateAIAnswer(String prompt){
    RestTemplate restTemplate = new RestTemplate();
    OllamaRequest ollamaRequest = new OllamaRequest("deepseek-coder:33b",prompt,false);

    System.out.println("LOG: Service is calling Ollama...");
    OllamaResponse ollamaResponse = restTemplate.postForObject("http://localhost:11434/api/generate", ollamaRequest, OllamaResponse.class);
    System.out.println("LOG: Service received a response from Ollama.");

    if(ollamaResponse==null || ollamaResponse.response==null){
      System.out.println("LOG: The response from Ollama was null or empty!");
      return "Error: Received an invalid response from the AI service";
    }
  
    return ollamaResponse.response;
  }

}
