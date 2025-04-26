
import { ApiResponse } from '@/types/chat';

export const chatService = {
  async sendMessage(message: string): Promise<ApiResponse> {
    // This is a placeholder for the actual API call
    // Replace this with your actual API implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          content: "This is a placeholder response. Replace this with your actual AI backend integration."
        });
      }, 1000);
    });
  }
};
