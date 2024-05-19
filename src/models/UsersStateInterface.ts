export interface UsersStateInterface {
    users: { [key: string]: any } | { loading: boolean } | { error: any };
}