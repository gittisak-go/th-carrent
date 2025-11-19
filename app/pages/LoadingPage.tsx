import {PropagateLoader} from "react-spinners";

function LoadingPage({message}: { message: string })
{
    return (
        <div className='flex gap-10 text-muted dark:text-white h-screen flex-col justify-center items-center'>
            <PropagateLoader color="#66CC8A" />
            <h4>{message}</h4>
        </div>
    );
}

export default LoadingPage;