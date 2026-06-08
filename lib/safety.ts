export function checkSafety(message: string): {
  isSafe: boolean;
  warning?: string;
} {
  const unsafeKeywords = [
    "diagnose",
    "cure",
    "treatment",
    "medicine",
    "prescribe",
    "remedy",
    "what do i have",
    "am i sick",
  ];
  const lowerMsg = message.toLowerCase();

  for (const keyword of unsafeKeywords) {
    if (lowerMsg.includes(keyword)) {
      return {
        isSafe: false,
        warning: "I cannot provide medical advice. Please consult a doctor.",
      };
    }
  }

  return { isSafe: true };
}
