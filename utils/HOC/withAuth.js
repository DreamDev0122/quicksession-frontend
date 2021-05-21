import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import router from '../router';

const withAuth = (WrappedComponent) => ({ ...props }) => {
  const [comp, setComp] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('auth'));  
      setComp(
        user ? (
          <WrappedComponent {...props} />
        ) : (
          <Redirect to={router.signin.path} />
        ),
      );
  }, []);

  return comp;
};

export default withAuth;
