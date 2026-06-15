import type { LoginInput, RegisterInput } from "../schemas/auth.schemas";
export declare const authService: {
    login(input: LoginInput): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string | null;
        };
    } | null>;
    register(input: RegisterInput): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string | null;
        };
    } | null>;
};
//# sourceMappingURL=auth.service.d.ts.map