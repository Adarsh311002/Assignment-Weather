import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <AuthForm 
        isLogin={true} 
        onSubmit={login}
      />
    </div>
  );
};

export default Login;