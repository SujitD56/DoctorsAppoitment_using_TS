import bcrypt from "bcrypt";
import  { userModel}  from "../Model/index";
import { encryptData,decryptData} from "../Helpers/encrypt";
import { log } from "console";


// interface RegisterInput {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   phone: string;
// }

// export const registerUser = async (input: RegisterInput) => {
//   const { firstName, lastName, email, password, phone } = input;

//   const existingUser = await userModel.findOne({ email: email.toLowerCase() });
//   if (existingUser) {
//     throw new Error("User already exists."); 
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = await userModel.create({firstName, lastName, email: email.toLowerCase(),password: hashedPassword,phone, });
//   return newUser;
// };

// import { userModel } from "./models/user";
// import encryptData  from "../controller/userController"; // Assume you have encryption utilities
// import bcrypt from "bcrypt";

// interface RegisterInput {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   phone: string;
// }

// export const registerUser = async (input: RegisterInput) => {
//   const { firstName, lastName, email, password, phone } = input;

//   // Check if the user already exists by encrypted email
//   const encryptedEmail = encryptData(email.toLowerCase()); // Encrypt the email
//   const existingUser = await userModel.findOne({ "email.encrypted": encryptedEmail.encrypted });
//   if (existingUser) {
//     throw new Error("User already exists.");
//   }

//   // Encrypt other fields
//   const encryptedFirstName = encryptData(firstName);
//   const encryptedLastName = encryptData(lastName);
//   const encryptedPhone = encryptData(phone);

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create the new user
//   const newUser = await userModel.create({
//     firstName: encryptedFirstName,
//     lastName: encryptedLastName,
//     email: encryptedEmail,
//     password: hashedPassword,
//     phone: encryptedPhone,
//   });

//   return newUser;
// };


export const userServices = {
  async checkUser(query: any) {
    console.log("Querying user with:", query);
    return await userModel.findOne(query);
  },

  // Create a new user with encrypted data
  async createUser(data: any) {
    console.log("Creating user with data:", data);

    const encryptedData = {
      firstName: encryptData(data.firstName),
      lastName: encryptData(data.lastName),
      email: encryptData(data.email),
      phone: encryptData(data.phone),
      password: encryptData(data.password),
    };

    console.log("Encrypted data:", encryptedData);
    return await userModel.create(encryptedData);
  },

  // Get user by ID and decrypt their data
  async getUserById(userId: string) {
    console.log("Fetching user with ID:", userId);

    const user = await userModel.findById(userId);
    console.log(user);
    
    if (!user) throw new Error("User not found");

    // Decrypt the user data
    console.log("Decrypting user data...");
    const decryptedData = {
      firstName: user.firstName?.encrypted
        ? decryptData(user.firstName.encrypted, user.firstName.iv)
        : null,
      lastName: user.lastName?.encrypted
        ? decryptData(user.lastName.encrypted, user.lastName.iv)
        : null,
      email: user.email?.encrypted
        ? decryptData(user.email.encrypted, user.email.iv)
        : null,
      phone: user.phone?.encrypted
        ? decryptData(user.phone.encrypted, user.phone.iv)
        : null,
      // password: user.password?.encrypted
      //   ? decryptData(user.password.encrypted, user.password.iv)
      //   : null,
    };

    if (!decryptedData.firstName || !decryptedData.lastName) {
      console.error("Failed to decrypt user data. User data:", user);
      throw new Error("Failed to decrypt user data");
    }

    console.log(decryptedData);
    return decryptedData;
  },
  
} 

export const getUsersService = async (
  filter: any,
  options: { skip: number; limit: number; chunkSize: number },
  decrypt: boolean = true,
  search?: string
) => {
  const query: any = { ...filter };

  // Fetch the users from the database with the applied filter
  const users = await userModel.find(query).skip(options.skip).limit(options.limit).lean();
  console.log("users..", users);
  
  // If no users are found, return an empty array
  if (!users.length) return [];

  // If decryption is not required, return the users immediately
  if (!decrypt) return users;

  const decryptedUsers = [];

  // Process users in chunks
  for (let i = 0; i < users.length; i += options.chunkSize) {
    const chunk = users.slice(i, i + options.chunkSize);
    console.log(`Processing chunk: ${i} to ${i + options.chunkSize}`);

    // Decrypt each user in the chunk
    const decryptedChunk = await Promise.all(
      chunk.map(async (user) => {
        try {
          const decryptedUser = {
            _id: user._id,
            firstName: user.firstName?.encrypted
              ? decryptData(user.firstName.encrypted, user.firstName.iv)
              : user.firstName,
            lastName: user.lastName?.encrypted
              ? decryptData(user.lastName.encrypted, user.lastName.iv)
              : user.lastName,
            email: user.email?.encrypted
              ? decryptData(user.email.encrypted, user.email.iv)
              : user.email,
            phone: user.phone?.encrypted
              ? decryptData(user.phone.encrypted, user.phone.iv)
              : user.phone,
          };
          console.log(decryptedUser);
          
          return decryptedUser;
        } catch (err) {
          console.error("Error decrypting user:", user, "Error:", err);
          return null; // Skip problematic user
        }
      })
    );

    decryptedUsers.push(...decryptedChunk.filter(Boolean));
  }

  if (search) {
    console.log("Applying search filter...");
    const searchedUsers = decryptedUsers.filter((user): user is NonNullable<typeof user> => {
      if (!user) return false;
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      console.log("fullName:", fullName);
      const regex = new RegExp(search, "i");
      return regex.test(fullName);
    });

    console.log("Searched Users:", searchedUsers);
    return searchedUsers;
  }

  return decryptedUsers;
};




// export const getUserById = async (userId: string): Promise<IUser | null> => {
//   try {
//     const user = await userModel.findById(userId);
//     if (!user) {
//       throw new Error('User not found');
//     }
//     return user;
//   } catch (err) {
//     throw new Error('Error fetching user: ' + (err as Error).message);
//   }
// };

// Service to decrypt a user's profile
// export const decryptUserProfile = (profile: IUser): any => {
//   try {
//     const decryptedProfile = {
//       firstName: decryptData(profile.firstName?.encrypted, profile.firstName?.iv),
//       lastName: decryptData(profile.lastName?.encrypted, profile.lastName?.iv),
//       email: decryptData(profile.email?.encrypted, profile.email?.iv),
//       phone: decryptData(profile.phone?.encrypted, profile.phone?.iv),
//       password: decryptData(profile.password?.encrypted, profile.password?.iv),
//     };
//     return decryptedProfile;
//   } catch (err) {
//     console.error(`Error decrypting profile for user ${profile._id}:`, (err as Error).message);
//     throw new Error('Decryption failed');
//   }
// };

// export const updateUserProfile = async (userId: string, updateData: Partial<IUser>): Promise<IUser | null> => {
//   try {
//     const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
//     if (!updatedUser) {
//       throw new Error('User not found');
//     }
//     return updatedUser;
//   } catch (err) {
//     throw new Error('Error updating user: ' + (err as Error).message);
//   }
// };


// export const checkUser = async (filter: any) => {
//   try {
//     const user = await userModel.findOne(filter);
//     if (user) {
//       return user;
//     } else {
//       return null;  
//     }
//   } catch (error) {
//     throw error;
//   }
// };

