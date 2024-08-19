import { OpenAI } from 'openai';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI( { apiKey, dangerouslyAllowBrowser: true } );

const encodeImageToBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });
};

export const openaiRes = async (imageFile) => {
  // console.log(imageFile)
  try{
    const base64Image = await encodeImageToBase64(imageFile);
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ 
        role: "user", 
        content: [{
          type: 'image',
          image: base64Image
        },
        {
          type: 'text',
          text: 'what food is on the image?'
        }
        ]}],
      stream: true,
    });
    return response.choices[0];
  } catch (error) {
    console.error("Error processing image:", error);
  }
} 