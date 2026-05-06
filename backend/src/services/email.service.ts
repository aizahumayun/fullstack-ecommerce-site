import nodemailer from "nodemailer";

export const sendOrderEmail = async (email: string, orderId: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Order Confirmation",
    text: `Your order ${orderId} has been placed successfully.`,
  });
};