import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="flex h-full w-full">
      <div className="flex m-auto w-1/2 h-1/2">
        <LoginForm onSuccess="/dashboard" onError="#" />
      </div>
    </div>
  );
}
export default LoginPage;
