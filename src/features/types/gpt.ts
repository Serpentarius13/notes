export enum GPTModels {
  gpt = "gpt-3.5-turbo",
}

export enum GPTRoles {
  user = "user",
  assistant = "assistant",
  admin = "admin",
}

export type TFinishReason = "stop" | "done";

export type TMessage = { role: GPTRoles; content: string };

export interface IChoice {
  message: TMessage;
  finish_reason: TFinishReason;
  index: number;
}

export interface IUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface IGPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: IUsage;
  choices: IChoice[];
}
