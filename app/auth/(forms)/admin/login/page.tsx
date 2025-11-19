import {LoginPage} from "@/app/pages/LoginPage";

export const metadata = {
    title: "Login | th-carrent - Admin",
    description: "Securely access the th-carrent admin panel to manage rentals, bookings, and more.",
};

export default function AdminLoginPage() {
    return (
        <div>
            <LoginPage isAdmin={true}/>
        </div>
    );
}