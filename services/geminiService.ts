import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDesignConcept = async (businessIdea: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Bertindaklah sebagai konsultan desain booth dan branding profesional. 
      Pengguna ingin membuat usaha dengan deskripsi: "${businessIdea}".
      
      Berikan jawaban singkat, kreatif, dan inspiratif yang mencakup:
      1. Konsep Visual (Warna, Gaya, Nuansa)
      2. Saran Material yang cocok
      3. Ide fitur unik untuk gerobak/booth tersebut agar menarik perhatian pembeli.
      
      Gunakan format HTML sederhana (gunakan tag <p>, <ul>, <li>, <strong>) untuk styling output, jangan gunakan markdown. Bahasa Indonesia.`,
    });
    
    return response.text || "Maaf, kami sedang mengalami gangguan koneksi ke AI Designer.";
  } catch (error) {
    console.error("Error generating concept:", error);
    return "Maaf, terjadi kesalahan saat menghubungi asisten desain kami.";
  }
};

export const generateBoothImage = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { 
            text: `Buatkan gambar desain visual 3D yang realistis dan menarik untuk sebuah booth, gerobak, atau kios usaha berdasarkan deskripsi ini: "${prompt}".
            Pastikan gambar terlihat profesional, pencahayaan bagus, dan menampilkan bentuk booth dengan jelas. Style: Modern, 3D Render, Architectural Visualization.` 
          }
        ]
      }
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
