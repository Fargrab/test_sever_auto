export namespace ToastType {
    export type Toast = {
        message: string
        status: Status
        category: string
    }
    export type Status = "error" | "warning" | "success"
}