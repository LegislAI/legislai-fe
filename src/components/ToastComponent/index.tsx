import { ToastContainer, Bounce } from 'react-toastify';

const ToastComponent = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
      transition={Bounce}
      toastStyle={{ fontSize: '12px' }}
    />
  );
};

export default ToastComponent;
