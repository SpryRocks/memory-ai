export interface IGenerateMessageOptions {
  question: string;
  systemInstruction: string;
}

export interface IGenerateMessageResult {
  answer: string;
}

export interface IAIEngine {
  generateMessage(options: IGenerateMessageOptions): Promise<IGenerateMessageResult>;
}
