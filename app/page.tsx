"use client";

import { useSession } from "next-auth/react";
import LoginForm from "./(auth)/components/LoginForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingIndicator from "@/components/LoadingIndicatorSpinner";
import Dashboard from "./dashboard/page";
import withAuth from "@/lib/withAuth";

function App() {
  const session = useSession();
  const route = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (session.status == "authenticated") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [session.status]);
  return (
    <main className="flex flex-col w-full h-full">
      {isAuthenticated ? (
        <div>
          <Dashboard />
        </div>
      ) : (
        <div className="flex flex-row w-full h-full p-1">
          <div className="flex flex-col w-3/4">
            <div className="flex flex-row w-full h-full justify-center">
              Welcome to personal Finance
            </div>
          </div>
          <div className="flex flex-col w-1/4 h-full border-l justify-center p-4">
            <LoginForm onError="#" onSuccess="/dashboard" />
          </div>
        </div>
      )}
    </main>
  );
}
export default App