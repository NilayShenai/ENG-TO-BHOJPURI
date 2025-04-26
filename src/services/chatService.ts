
import { ApiResponse } from '@/types/chat';

export const chatService = {
  async sendMessage(message: string): Promise<ApiResponse> {
    try {
      const response = await fetch('https://eng-to-bhojpuri.onrender.com/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      const data = await response.json();
      if (data.translation) {
        return { content: data.translation };
      } else if (data.error) {
        return { content: `Error: ${data.error}` };
      } else {
        return { content: 'Unknown error from translation API.' };
      }
    } catch (error: any) {
      return { content: `Error: ${error.message || error}` };
    }
  }
};
