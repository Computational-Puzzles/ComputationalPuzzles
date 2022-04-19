import React, { Dispatch, ReactChild, useState } from 'react';
import sidebarStyles from './Sidebar.module.scss';

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<boolean>;
  children?: ReactChild | ReactChild[];
};

const Sidebar = ({ sidebarOpen, setSidebarOpen, children }: SidebarProps) => {
  const [sidebarClosing, setSidebarClosing] = useState<boolean>(false);

  const closeSidebar = () => {
    setSidebarClosing(true);
    setTimeout(() => {
      setSidebarOpen(false);
      setSidebarClosing(false);
    }, 250);
  };

  return (
    <>
      {sidebarOpen && (
        <aside
          className={`${sidebarStyles.sidebar__menu} ${
            sidebarClosing ? sidebarStyles.sidebar__menu_close : ''
          }`}
        >
          <div className={sidebarStyles.sidebar__menu_tray}>{children}</div>
          <div
            className={`${sidebarStyles.sidebar__menu_background} ${
              sidebarClosing ? sidebarStyles.sidebar__menu_background_close : ''
            }`}
            onClick={closeSidebar}
          />
        </aside>
      )}
    </>
  );
};

export default Sidebar;
