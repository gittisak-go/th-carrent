import {LoginPage} from "@/app/pages/LoginPage";

export const metadata = {
    title: "Login | Rungroj CarRental - Admin",
    description: "Securely access the Rungroj CarRental admin panel to manage rentals, bookings, and more.",
};

export default function AdminLoginPage() {
    return (
        <div>
            <LoginPage isAdmin={true}/>
        </div>
    );
}