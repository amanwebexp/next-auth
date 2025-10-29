"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { errorMsg } from "../../component/Toastmsg/toaster";
import userDetail from "@/services/UserDetail";
import { Container, CircularProgress, Typography } from "@mui/material";

const Welcome = () => {
  // State to hold all user data fetched from API
  const [userData, setUserData] = useState([]);
  // Get session info from NextAuth
  const { data: session, status } = useSession();
  // Fetch users once session is available
  useEffect(() => {
    const fetchUser = async () => {
      if (!session) return; // Wait until session is ready

      try {
        // ✅ Call API service to fetch users
        const dataUser = await userDetail.getAllUser();
        setUserData(dataUser?.users || []);
      } catch (error) {
        // ❌ Show toast error message if API call fails
        errorMsg(error?.message || "Failed to fetch users");
      }
    };

    fetchUser();
  }, [session]);
  // Show loading spinner while session is initializing

  if (status === "loading") {
    return (
      <Container className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </Container>
    );
  }

  const currentUserEmail = session?.user?.email;

  return (
    <Container className="max-w-full">
      <div className="p-4">
        <Typography variant="h5" gutterBottom>
          User List:
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userData.length > 0 ? (
            userData.map((item) => {
              const isCurrentUser =
                item.email?.toLowerCase() === currentUserEmail?.toLowerCase();

              return (
                <div
                  key={item.id}
                  className={`border p-4 rounded-lg shadow-md transition-all duration-300 ${
                    isCurrentUser
                      ? "bg-blue-100 border-blue-500 shadow-blue-300 scale-[1.03]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <p
                    className={`font-semibold text-lg ${
                      isCurrentUser ? "text-blue-700" : "text-gray-800"
                    }`}
                  >
                    {`${item.firstName} ${item.lastName}`}
                  </p>
                  <p className="text-sm text-gray-600">Age: {item.age}</p>
                  <p className="text-sm text-gray-600">Email: {item.email}</p>
                  <p className="text-sm text-gray-600">Gender: {item.gender}</p>

                  {isCurrentUser && (
                    <p className="text-xs mt-2 text-blue-600 font-medium">
                      ✅ You are logged in as this user
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <Typography>No user data available.</Typography>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Welcome;
