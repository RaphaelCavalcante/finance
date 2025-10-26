"use client";
import LoginForm from "./(auth)/login/page";

export default function App() {
  return (
    <main className="flex flex-col w-full h-full">
      <div className="flex flex-row w-full h-full p-1">
        <div className="flex flex-col w-3/4">Welcome to personal Finance</div>
        <div className="flex flex-col w-1/4 h-full border-l justify-center p-4">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
