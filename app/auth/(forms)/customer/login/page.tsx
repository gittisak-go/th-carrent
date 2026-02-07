import {LoginPage} from "@/app/pages/LoginPage";

export const metadata = {
    title: "Login | Rungroj CarRental",
    description: "Welcome back! Log in to your Rungroj CarRental account to manage your bookings, view rental history, and explore our latest deals.",
};

type Props = { searchParams: Promise<{ redirect?: string }> };

export default async function CustomerLoginPage({ searchParams }: Props) {
    const { redirect: redirectUrl } = await searchParams;
    return (
        <div>
            <LoginPage isAdmin={false} redirectTo={redirectUrl ?? undefined} />
        </div>
    );
}
