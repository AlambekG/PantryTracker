import { OpenAI } from 'openai';

const openai = new OpenAI();

export const openaiRes = async () => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ 
      role: "user", 
      content: [{
        type: 'text',
        text: 'hello'
      },
      ]}],
    stream: true,
  });
  console.log("hello")
  console.log(response)
  return response;
} 