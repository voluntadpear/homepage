import React from "react"
import ProfileCardHeader from "./profileCardHeader";
import ProfileCardBody from "./profileCardBody";
import ProfileCardFooter from "./profileCardFooter";

const ProfileCard = ({ nightMode }) => (
  <div
    id="profile"
    className={`w-fullbg-teal-700 rounded-lg lg:rounded-l-lg lg:rounded-r-lg shadow-lg ${
      nightMode ? "bg-gray-900" : "bg-white"
    } opacity-75 mx-6 lg:mx-0`}
  >
  <div className="p-4 md:p-12 text-center lg:text-left">
    <ProfileCardHeader />
    <ProfileCardBody />
    <ProfileCardFooter />
    </div>
  </div>
)

export default ProfileCard
