package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//This class defines the JSON that our backend receives back from Ollama API.
@JsonIgnoreProperties(ignoreUnknown = true)
public class OllamaResponse {
  public String response;
}
