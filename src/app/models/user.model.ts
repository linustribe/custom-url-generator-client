export interface IUser {
    uid: string;
    emailVerified: boolean;
}
export class User {
    uid: string;
    emailVerified: boolean;

    constructor(user: IUser) {
        this.uid = user.uid;
        this.emailVerified = user.emailVerified;
    }
}
