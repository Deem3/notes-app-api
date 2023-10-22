export interface RestCreateUser{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface RestGetUser {
    email: string;
    password: string;
}