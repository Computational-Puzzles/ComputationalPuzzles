import React from 'react';
import styles from './AdminHeader.module.scss';

const AdminHeader = () => {
  const currentPage = 'Admin Dashboard';
  return (
    <div>
      <div className={styles.pageName}>
        <p>{currentPage}</p>
      </div>
    </div>
  );
};

export default AdminHeader;
