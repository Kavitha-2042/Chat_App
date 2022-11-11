export interface User{
    _id:string,
    name:string,
    email:string,
    password:string,
    phoneNumber:number,
    role:string
}

export interface InitialState{
    user: User | null,
    auth: boolean
}

export interface Admin{
    _id:string,
    name:string,
    email:string,
    password:string,
    phoneNumber:number,
    role:string
}

export interface AdminType{
    admin: Admin | null,
    auth:boolean
}

