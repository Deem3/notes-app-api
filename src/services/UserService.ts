import { PrismaClient } from "@prisma/client";
import { ResponseCreateUser, ResponseGetUser } from "../interfaces/user/response.interface";
import { RestCreateUser, RestGetUser } from "../interfaces/user/rest.interface";
import { encryptPassword } from "../utils";

const prisma = new PrismaClient();

export class UserService {

    public async CreateUser(req: RestCreateUser) : Promise<ResponseCreateUser> {
        try {
            const password = encryptPassword(req.password)
            const user = await prisma.user.create({
                data: {
                    email: req.email,
                    firstName: req.firstName,
                    lastName: req.lastName,
                    password
                }
            })

            if(!user) return {error: {
                message: 'User not created'
            }}

        return {data: {id: user.id}}
        } catch (error) {
            return {error: {
                message: (error as Error).message
            }}
        }
    }
    public async GetUser(req: RestGetUser) : Promise<ResponseGetUser> {
        try {
            const password = encryptPassword(req.password)
            const user = await prisma.user.findUnique({
                where: {
                    email: req.email,
                    password
                }
            })
            if(!user) return {error: {
                message: 'User not found'
            }}
            const verified = password === user.password
            return verified ? {data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }} : {error: {
                message: 'Password is incorrect'
            }}
        } catch (error) {
            return {error: {
                message: (error as Error).message
            }}
        }
    }

    public async GetUserById(id: string): Promise<ResponseGetUser> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })
            return user ? {data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }} : {error: {
                message: 'User not found'
            }}
        } catch (error) {
            return {error: {
                message: (error as Error).message
            }}
        }
    }
}