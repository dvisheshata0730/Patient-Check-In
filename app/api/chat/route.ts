import { groqProvider } from '@/lib/groq';
import { streamText, convertToModelMessages, createUIMessageStreamResponse, UIMessage } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/prompts';
import { checkSafety } from '@/lib/safety';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages: uiMessages, patientInfo } = await req.json();
  const latestMessage = uiMessages[uiMessages.length - 1];
  let safetyInjection = '';
  
  if (latestMessage && latestMessage.role === 'user') {
    const textContent = latestMessage.parts
      ?.filter((p: { type: string }) => p.type === 'text')
      .map((p: { text: string }) => p.text)
      .join(' ') || '';
    
    const safetyCheck = checkSafety(textContent);
    if (!safetyCheck.isSafe) {
      safetyInjection = `\n\nCRITICAL RULE REMINDER: The user is asking for medical advice. You must NOT provide any. Politely decline and suggest they speak with a doctor. ${safetyCheck.warning}`;
    }
  }

  const patientContext = patientInfo 
    ? `Patient Context:\nName: ${patientInfo.firstName} ${patientInfo.lastName}\nDOB: ${patientInfo.dateOfBirth}\nReported Symptoms: ${patientInfo.symptoms}\n\n`
    : '';

  const modelMessages = await convertToModelMessages(uiMessages as UIMessage[]);

  const result = streamText({
    model: groqProvider('llama-3.3-70b-versatile'),
    system: patientContext + SYSTEM_PROMPT + safetyInjection,
    messages: modelMessages,
    temperature: 0.2,
  });

  return result.toUIMessageStreamResponse();
}
