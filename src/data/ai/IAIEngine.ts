export interface IGenerateMessageOptions {
  message: string;
  systemInstruction: string;
}

export interface IGenerateMessageResult {
  message: string;
}

export interface IAIEngine {
  generateMessage(options: IGenerateMessageOptions): Promise<IGenerateMessageResult>;
}
