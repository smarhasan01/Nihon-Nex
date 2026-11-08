// Native Web Speech Synthesis utility for Japanese pronunciation

export function speakJapanese(text: string, rate: number = 0.85): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Speech synthesis is not supported on this device/browser.");
      resolve();
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = rate; // slightly slower for language learners
    utterance.pitch = 1.05; // slightly friendly anime pitch

    // Try to find a native Japanese voice
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find((v) => v.lang.startsWith("ja") || v.name.includes("Japanese") || v.name.includes("Kyoko") || v.name.includes("Otoya"));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}
