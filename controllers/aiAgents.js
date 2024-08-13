import axios from 'axios';
import OpenAI from 'openai';

import { prompts } from '../configs/chatGPT_Prompts.js';
import { handleResError } from '../lib/handleRes.js'

export const getAgentTextResponse = async ({ body }, res) => {
    try {
        const { text } = body;
        const prompt = body.prompt ? prompts[body.prompt] : prompts.FISH_RHYME

        const openai = new OpenAI({ apiKey: process.env.CHATGPT_KEY });
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: prompt,
                },
                {
                    role: 'user',
                    content: text,
                }
            ],
            model: "gpt-3.5-turbo",
        });
        
        if (completion.choices) {
            console.log(completion.choices[0].message);
            res.status(200).json({ message: completion.choices[0].message });
        } else {
            throw 'No results';
        }
    }
    catch (error) {
        const message = 'Something went wrong. Please try again';
        handleResError(res, error, message, 500);
    }
};
  
const getVoiceFromText = async (req, res) => {
    try {
        const sanitizedMessage = req.body.text.replaceAll('\n', ' ')
        const sanitizedMessage2 = sanitizedMessage.replaceAll('*', ' ')

        const results = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/dfZGXKiIzjizWtJ0NgPy`, 
            { 
                text: sanitizedMessage2,
            }, 
            { 
                headers: {
                    "xi-api-key":  process.env.AI_VOICE_KEY,
                },
                responseType: 'arraybuffer' 
            }
        );
    if (results) {
        res.status(200).send(results.data);
    } else {
        throw 'No results';
    }
}
catch (error) {
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
}
};


const controllers = {
    getAgentTextResponse,
    getVoiceFromText
};

export default controllers;