import OpenAI from "openai";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY?.trim();

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export default openai;
