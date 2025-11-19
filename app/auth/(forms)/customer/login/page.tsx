import {LoginPage} from "@/app/pages/LoginPage";

export const metadata = {
    title: "Login | th-carrent",
    description: "Welcome back! Log in to your th-carrent account to manage your bookings, view rental history, and explore our latest deals.",
};

export default function CustomerLoginPage()
{
    return (<div><LoginPage isAdmin={false}/></div>)
};
