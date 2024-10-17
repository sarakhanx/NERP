import { getCookie } from 'cookies-next';



//Client Side
export default function Page() {
    const token = getCookie('token');
    console.log(token);
  return <div>Welcome to the Dashboard</div>;
};

