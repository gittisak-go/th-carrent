import AssignUserRolePageContent from "@/app/auth/assign-user-role/[role]/AssignRolePage";
import React from "react";

export const metadata = {
    title: 'Completing Registration | th-carrent',
    description: 'Completing user registration. Please wait while your role is assigned within the th-carrent system.',
};

/**
 * This page assigns a user role for newly created users that are created via OAuth, because you can't assign user metadata via OAuth signing.
 * This page is accessed after OAuth auth finishes.
 * After this page finishes assigning a user role it will redirect users to their dashboard page.
 */
export default function AssignUserRolePage({params}: { params: Promise<{ role: string }> })
{
    const {role} = React.use(params);
    
    return <AssignUserRolePageContent role={role}/>
}