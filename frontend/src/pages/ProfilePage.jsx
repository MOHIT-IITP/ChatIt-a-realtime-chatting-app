import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Camera } from "lucide-react";
const avatar = "./avatar.png";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { userAuth, isUpdatingProfile, profileupdate } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const MaxSize = 10 * 1024 * 1024;
  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MaxSize) {
      toast.error("Your Image is too large, >2MB ");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await profileupdate({ profilePic: base64Image });
    };
  };

  return (
    <div>
      <div className="h-screen pt-20">
        <div className="max-w-2xl   mx-auto p-4 py-8">
          <div className="bg-base-300 flex rounded-xl p-6 space-y-8">
            <div className="w-1/2 flex flex-col gap-4">
              <div className="text-center">
                <h1 className="text-2xl  font-semibold">Profile</h1>
                <p className="mt-2">Your profile information</p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                    src={selectedImg || userAuth.profilePic || avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`
absolute bottom-0 right-0 
bg-base-content hover:scale-105
p-2 rounded-full cursor-pointer 
transition-all duration-200
${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
`}
                  >
                    <Camera className="w-5 h-5 text-base-200" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>
                <p className="text-sm text-zinc-400">
                  {isUpdatingProfile
                    ? "Uploading..."
                    : "Click the camera icon to update your photo"}
                </p>
                <p className="text-sm text-neutral-500">
                  Select Profile Photo less than 100kb
                </p>
              </div>
            </div>
            <div className="mt-6 w-1/2 text-center ">
              <h2 className="text-lg font-medium">Account Information</h2>
              <div className="mt-4 flex flex-col justify-center items-center">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path>
                  </svg>
                  <span className=" ml-2 text-sm font-bold">
                    {userAuth.fullName}
                  </span>
                </div>
                <div className="flex items-center  space-x-2 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                  </svg>
                  <span className="text-sm font-bold">{userAuth.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
