import { useState } from 'react';

export default function useAdmin() {
  
  const getAdmin = () => {
    const adminString = sessionStorage.getItem("admin");
  const userAdmin = JSON.parse(adminString);
  return userAdmin?.admin;

  }
  const [admin, setAdmin] = useState(getAdmin());

  const saveAdmin = userAdmin => {
    sessionStorage.setItem('admin', JSON.stringify(userAdmin));
    setAdmin(userAdmin.admin);
  };
  
  return {
    setAdmin: saveAdmin,
    admin
  }


}