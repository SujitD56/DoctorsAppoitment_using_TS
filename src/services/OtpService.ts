// // otpService.ts
// // import { otpModel } from '../Model/index';  // Assuming otpModel is the model that handles OTP data
// import { sendOTPs } from '../Helpers/SMShelper';  // Assuming sendOTPs is a helper function that sends OTP via SMS/email
// import { getOTP } from '../utils/Otp';  // Assuming this function generates the OTP

// export const sendOTP = async (filter: any, metaData: any = {}): Promise<boolean> => {
//   try {
//     // Check if OTP already exists
//     const OTPExists = await otpModel.findOne(filter);
//     if (OTPExists) {
//       return false;  // OTP already exists
//     }

//     // Generate a new OTP code
//     let code = getOTP();

//     // Mock for testing (only for phone number +919999999999)
//     if (filter.attribute === "+919999999999") {
//       code = "1234"
//       if (filter.purpose === "registration") {
//         metaData = { first_name: "test", last_name: "user", email_id: "test@mail.com", phone_number: "+919999999999" };
//       }
//     }

//     // Store the OTP in the database
//     await otpModel.create({ ...filter, code: code, meta_data: metaData });

//     // Send the OTP (via SMS or email based on filter.mode)
//     const otpSent = await sendOTPs(filter.attribute, code, filter.mode, filter.purpose);
//     console.log(otpSent);

//     return otpSent;  
//   } catch (error) {
//     throw error;  
//   }
// };