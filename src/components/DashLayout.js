import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";


const DashLayout = () => {
  const content = (
    <>
      <DashHeader />
      <div>
        <Outlet />
      </div>
    </>
  );

  return content;
};

export default DashLayout;
