import axios from "axios"; 
import { SMS_TEMPLATE } from "../config/constants";
// import { sendMail } from './EmailHelper';  

const  TWO_FACTOR_KEY  = process.env.TWO_FACTOR_KEY as string;;

export const sendOTPs = async (input: string, OTP: string, to: string = 'phone', purpose: string = '', payload: Record<string, any> = {}): Promise<any> => {
  try {
    if (to === 'phone') {
    const smsTemplate = SMS_TEMPLATE[purpose];
    if (!smsTemplate) throw new Error("Invalid purpose or missing template.");

    const message = smsTemplate.replace("{{OTP}}", OTP);
    const response = await axios.get(
      `https://2factor.in/API/V1/${process.env.TWO_FACTOR_KEY}/SMS/${input}/${OTP}/${message}`
    );
    console.log("SMS API Response:", response.data);
    return response.data;
    } else {
      const emailContent = {
        to: input,
        subject: "OTP for Registration",
        text: `Your OTP for registration is: ${OTP}`,
      };
    //   await sendMail(emailContent);  // Assuming sendMail is a function that sends the email
      return true;
    }
  } catch (err: any) {
    console.error('Error sending SMS:', err.response?.data || err.message);
    throw new Error('Failed to send SMS. Please try again.');
  }  
};


