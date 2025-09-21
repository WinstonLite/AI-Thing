package com.example.demo.dto;

//This class defines the JSON that our backend sends to Ollama API.
public class OllamaRequest {
  public String model;
  public String prompt;
  public Boolean stream;

  public OllamaRequest(String model, String prompt, Boolean stream){
    this.model=model;
    this.prompt=prompt;
    this.stream=stream;
  }
}
