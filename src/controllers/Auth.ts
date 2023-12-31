import { Request, Response, NextFunction } from "express";
import * as jose from "jose";
import * as argon2 from "argon2";
import { PrismaClient, Prisma } from "@prisma/client";
import sendEmail from '../utils/sendEmail';
import randomstring from 'randomstring';
import logger from '../utils/logger';
const prisma = new PrismaClient();

export default {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword }= req.body;
    
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).send({ message: "Please fill all fields" });
    }
    if(password !== confirmPassword) {
      return res.status(400).send({ message: "Password confirmation is not matched"})
    }
    const hashedPassword: string = await argon2.hash(password);
    
    try { 
      const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword }
      })
      
      const verificationEndpoint: string = `${process.env.API_ENDPOINT}/api/auth/verify-email/${newUser.id}`
      const emailSended: boolean = await sendEmail(email, "Email Verification", verificationEndpoint, res)
      if(!emailSended) {
        logger.info("Send email failed");
        await prisma.user.delete({ where: { id: newUser.id } })
        return res.status(500).send({ message: "Failed sending email verification" })
      }

      logger.info("Email sended");
      return res.status(201).send({ message: "User created. Verification sended, please check ypur email" })
    } catch (err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.meta?.target === "User_email_key") {
          return res.status(409).send({ message: "Email already registered" })
        }
      }
      next(err)
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        return res.status(400).send({ message: 'Please fill all fields' })
    }
    try {
      const user = await prisma.user.findFirst({ where: { email } })
      if (!user) {
          return res.status(400).send({ message: 'User does not exist' })
      }
      const validPassword: boolean = await argon2.verify(user.password, password)
      if (!validPassword) {
          return res.status(400).send({ message: 'Invalid password' })
      }
      const token: string = await new jose.SignJWT({ userId: user.id }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime(process.env.JWT_EXPIRES_IN ?? '1h').sign(new TextEncoder().encode(process.env.JWT_SECRET))
      return res.status(200).send({ token })
    } catch (err) {
      next(err)
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
        where: { id: payload.userId as string },
        select: { email: true }
      });
      if (!user) {
        return res.status(400).send({ message: 'Invalid token' })
      }

      logger.info("User get verify token");
      return res.status(200).send(user)
    } catch (err) {
      next(err)
    }
  },

  verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
      await prisma.user.update({
        where: { id },
        data: { isVerify: true }
      })

      logger.info("User verified an email");
      return res.status(201).send({ message: "Email verified" })
    } catch (err) {
      next(err)
    }
  },

  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    try {
      const user = await prisma.user.findUnique({
        where: { email }
      })
      if(!user) return res.status(404).send({ message: "Email not registered"})

      const resetPassword: string = randomstring.generate()
      const text: string = `Password has been reseted.\nYour new password: ${resetPassword}\nPlease remember to change this password. `
      const emailSended: boolean = await sendEmail(email, "Reset Password", text, res)
      if(!emailSended) {
        logger.info("Send email failed");
        res.status(500).send({ message: "Failed sending email reset password, please try again" })
      }

      const hashedResetPassword: string = await argon2.hash(resetPassword)
      await prisma.user.update({
        where: { email },
        data: { password: hashedResetPassword } 
      })

      logger.info("User reseted the password");
      return res.status(201).send({ message: "Password reseted, please check your email" })
    } catch (err) {
      next(err)
    }
  },

  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    let { id, currentPassword, newPassword }: 
        { id: string, currentPassword: string, newPassword: string } = req.body
    
    if(currentPassword === newPassword) {
      return res.status(400).send({ message: "The current password and the new password are still the same"})
    }
    
    try {
      const user = await prisma.user.findUnique({ where: { id } })
      if(!user) {
        return res.status(404).send({ message: "User not found" })
      }

      const validCurrentPassword: boolean = await argon2.verify(user.password, currentPassword)
      if(!validCurrentPassword) {
        return res.status(400).send({ message: "Invalid current password" })
      }

      const hashedNewPassword: string = await argon2.hash(newPassword);
      await prisma.user.update({
        where: { id },
        data: { password: hashedNewPassword }
      })

      logger.info("User changed password");
      res.status(201).send({ message: "Password updated"})
    } catch (err) {
      next(err)
    }
  },
};
