import MainLayout from "../Shared/MainLayout";
import LoginProvider from "./LoginProvider";

export default function LoginPage() {
  return (
    <MainLayout title="Login">
      <LoginProvider provider="google" />
    </MainLayout>
  );
}
