export interface userInterface {
    name: string;
    phone: string;
    age: number;
    email: string;
    relocation: boolean;
}

export class User implements userInterface {
    name: string;
    phone: string;
    age: number;
    email: string;
    relocation: boolean;
    avatar?: number;
    
    constructor (item: any) {
        this.name = item.name;
        this.phone = item.phone;
        this.age = item.age;
        this.email = item.email;
        this.relocation = item.relocation;
        this.avatar = (Math.floor(Math.random() * 12) + 1);
    }
}
