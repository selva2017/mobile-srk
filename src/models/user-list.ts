export interface UserList {
    users: [
        {
            role: string;
            authenticate: boolean;
            firstName: string;
            lastName: string;
            token: string;
            companyId: string;
            companyName: string;
            roleName: string;
            userStatus: string;
            createdDate: string;
            userName: string;
        }];
    roles: [
        {
            roleId: string;
            roleName: string;
        }];
}
