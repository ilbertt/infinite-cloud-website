export interface UserModel {
    id: number;
    first_name: string;
    last_name?: string;
    username: string;
    photo_url: string;
    auth_date: number;
    hash: string;
};

export interface AuthState {
    user: UserModel | null;
    status: 'loading' | 'idle';
}