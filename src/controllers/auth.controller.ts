import { Request, Response, NextFunction } from "express";
import * as jose from "jose";
import * as argon2 from "argon2";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
import sendEmail from '../utils/sendEmail';
import randomstring from 'randomstring';

export default {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword }: 
    { name: string, email: string, password: string, confirmPassword: string } = req.body;
    
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).send({ message: "Please fill all fields" });
    }
    if(password !== confirmPassword) {
      return res.status(400).send({ message: "Password confirmation is not matched"})
    }
    const hashedPassword = await argon2.hash(password);
    
    try { 
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      })
      
      const verificationEndpoint = `${process.env.API_ENDPOINT}/api/auth/verify-email/${newUser.id}`
      const emailSended = await sendEmail(email, "Email Verification", verificationEndpoint, res)
      if(emailSended) {
        console.log("Email sended");
        return res.status(201).send({ message: "User created. Verification sended, please check ypur email" })
      } else {
        console.log("Send email failed");
        await prisma.user.delete({
          where: {
            id: newUser.id
          }
        })
        res.status(500).send({ message: "Failed sending email verification" })
      }
    } catch (err) {
      // if(err instanceof TypeError) {
      //   res.status(400).send(err)
      // }
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.meta.target === "User_email_key") {
          return res.status(409).send({ message: "Email already registered" })
        }
      }
      console.log(err);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: { email: string, password: string } = req.body
    if (!email || !password) {
        return res.status(400).send({ message: 'Please fill all fields' })
    }
    try {
      const user = await prisma.user.findFirst({
        where: {
          email
        }
      })
      if (!user) {
          return res.status(400).send({ message: 'User does not exist' })
      }
      const validPassword = await argon2.verify(user.password, password)
      if (!validPassword) {
          return res.status(400).send({ message: 'Invalid password' })
      }
      const token = await new jose.SignJWT({ userId: user.id }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime(process.env.JWT_EXPIRES_IN ?? '1h').sign(new TextEncoder().encode(process.env.JWT_SECRET))
      return res.status(200).send({ token })
    } catch (err) {
      console.log(err);
    }
  },

  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(400).send({ message: 'Token not found' })
    }
    try {
        const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
        const user = await prisma.user.findFirst({
          where: { id: payload.userId },
          select: { email: true }
        });
        if (!user) {
          return res.status(400).send({ message: 'Invalid token' })
        }
        return res.status(200).send(user)
    } catch (err) {
      console.log(err);
    }
  },

  verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
    const { id }: { id?: string } = req.params

    try {
      await prisma.user.update({
        where: { id },
        data: { isVerify: true }
      })

      console.log("User verified an email");
      res.status(201).send({ message: "Email verified" })
    } catch (err) {
      console.log(err);
    }
  },

  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    const { email }: { email: string } = req.body

    try {
      const user = await prisma.user.findUnique({
        where: { email }
      })
      if(!user) return res.status(404).send({ message: "Email not registered"})

      const resetPassword = randomstring.generate()
      console.log(resetPassword);
      const text = `Password has been reseted.\nYour new password: ${resetPassword}\nPlease remember to change this password. `
      const emailSended = await sendEmail(email, "Reset Password", text, res)
      if(!emailSended) {
        console.log("Send email failed");
        res.status(500).send({ message: "Failed sending email reset password, please try again" })
      }

      const hashedResetPassword = await argon2.hash(resetPassword)
      await prisma.user.update({
        where: { email },
        data: { password: hashedResetPassword } 
      })

      console.log("User reseted the password");
      return res.status(201).send({ message: "Password reseted, please check your email" })
    } catch (err) {
      console.log(err);
    }
  },

  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    let { id, currentPassword, newPassword }: 
        { id: string, currentPassword: string, newPassword: string } = req.body
    
    if(currentPassword === newPassword) {
      return res.status(400).send({ message: "The current password and the new password are still the same"})
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id },
      })

      const validCurrentPassword = await argon2.verify(user.password, currentPassword)
      if(!validCurrentPassword) {
        return res.status(400).send({ message: "Invalid current password" })
      }

      const hashedNewPassword = await argon2.hash(newPassword);
      await prisma.user.update({
        where: { id },
        data: { password: hashedNewPassword }
      })

      console.log("User changed password");
      res.status(201).send({ message: "Password updated"})
    } catch (err) {
      console.log(err);
    }
  },
};
