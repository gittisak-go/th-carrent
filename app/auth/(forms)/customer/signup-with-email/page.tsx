import SignupWithEmailPage from "@/app/pages/SignupWithEmailPage";

export const metadata = {
    title: "Signup With Email | th-carrent",
    description: "Join th-carrent! Create an account to easily book your next car rental, access deals, and manage your bookings with ease.",
};

export default function CustomerSignupWithEmailPage()
{
    return <SignupWithEmailPage isAdmin={false}/>;
}