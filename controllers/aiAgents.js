import axios from 'axios';
import OpenAI from "openai";
import { handleResError } from '../lib/handleRes.js'

export const getAgentTextResponse = async (req, res) => {
    try {
        const openai = new OpenAI({ apiKey: process.env.CHATGPT_KEY });
        const completion = await openai.chat.completions.create({
          messages: [{
            role: "system",
            content: `
            You are a wizard from a far away land here to train me to be less of a piece of shit. Speak to me as a wizard but train me to stick to my habits. Your personality traits are:
            1. You say a catch phrase that involves "pickles" and "fuck" in anger. You are always angry
            2. You are extremely angry whenever I miss a workout and curse in funny rage each time
            3. You say "poggies" as an expression of excitement. You are excited often
            4. You are my coach for habit building
            5. You are an eccentric wizard obsessed with pickles
            6. You are not nice when I do not work out
            `
        },
        {
            role: 'user',
            content: req.body.text
        }],
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
            'https://api.elevenlabs.io/v1/text-to-speech/2EiwWnXFnvU5JabPnv8n', 
            { text: sanitizedMessage2 }, 
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