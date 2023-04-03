export interface Notification {
    title: string;
    body: string;
    from: string;
    to: string;
}

export interface Invitation extends Notification {
    schoolID: string;
}