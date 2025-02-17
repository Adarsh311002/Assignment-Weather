import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Register = () => {
  const { register } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <AuthForm 
        isLogin={false} 
        onSubmit={register}
      />
    </div>
  );
};

export default Register;