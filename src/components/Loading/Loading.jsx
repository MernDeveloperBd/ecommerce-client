import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false); // ২ সেকেন্ড পরে লোডার লুকাবে
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  if (!show) return null; // show false হলে কিছুই render হবে না

  return (
    <div className="w-full flex justify-center items-center z-50">
      <CircularProgress color="inherit" className="text-green-600" />
    </div>
  );
};

export default Loading;
