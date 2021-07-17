export interface UserModel {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    photo_url: string;
    auth_date: string;
    hash: string;
};

export interface AuthState {
    user: UserModel | null;
    status: 'loading' | 'idle';
}