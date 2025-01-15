import HomePage from "@/components/HomePage/HomePage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  return (
    <>
      <HomePage />

      <ToastContainer position='top-right' />
    </>
  );
}
