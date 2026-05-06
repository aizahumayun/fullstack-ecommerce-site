import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsApp = async (phone: string, message: string) => {
  try {
    await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:${phone}`,
      body: message,
    });
  } catch (error) {
    console.log("WhatsApp send failed:", error);
  }
};