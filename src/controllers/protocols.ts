import { User } from "../models/user";

export interface IGetUsersController {
    handle(): any;
}

export interface IGetUsersRepository{
    getUsers(): Promise<User[]>
}