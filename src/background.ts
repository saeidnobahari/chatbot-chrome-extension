import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";


chrome.runtime.onMessage.addListener(async (message, callback, sendResponse) => {
  if (message.name === 'ai-magic') {
    
    dotenv.config();
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    const openai = new OpenAIApi(configuration);

    let prompt: string = '';
    switch (message.mode) {
      case 'summarize':
        prompt = 'Summarize this text: ' + message.selectionText;
        break;
      case 'expand':
        prompt = 'Expand this text: ' + message.selectionText;
        break;
      case 'friendly':
        prompt =
          'expand this text a little & make it sound very friendly/apologetic & improve the readability: ' +
          message.selectionText;
        break;
      case 'prompt':
        prompt = message.selectionText;
        break;

      default:
        return;
    }

    const response: any = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.05, // Higher values means the model will take more risks.
      max_tokens: 300, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    const res: object = await JSON.parse(response)
    sendResponse(res)

    return true;
  }
});
