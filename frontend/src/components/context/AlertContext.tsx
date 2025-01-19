'use client';
import classNames from 'classnames';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IAlertContext {
  errorMessage: string | null;
  successMessage: string | null;
  setErrorMessage: (value: string | null) => void;
  setSuccessMessage: (value: string | null) => void;
}

const AlertContext = createContext<IAlertContext>({
  errorMessage: null,
  setErrorMessage: () => {},
  setSuccessMessage: () => {},
  successMessage: null,
});

const AlertContextProvider = ({ children }: { children: ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    if (errorMessage) {
      setAlert(errorMessage);
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
    if (successMessage) {
      setAlert(successMessage);
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  }, [errorMessage, successMessage]);

  return (
    <AlertContext.Provider
      value={{
        errorMessage: errorMessage,
        setErrorMessage: setErrorMessage,
        setSuccessMessage: setSuccessMessage,
        successMessage: successMessage,
      }}
    >
      {alert && (
        <div
          className={classNames(
            'fixed bottom-4 right-4 p-2 body-2 text-primary-weak',
            successMessage ? 'bg-green-500' : 'bg-danger'
          )}
        >
          {alert}
        </div>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error('useAuth can only be used inside AuthContextProvider');

  return context;
};
