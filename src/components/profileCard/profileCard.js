import React from "react"
import ProfileCardHeader from "./profileCardHeader";
import ProfileCardBody from "./profileCardBody";
import ProfileCardFooter from "./profileCardFooter";

const ProfileCard = () => (
  <div
    id="profile"
    className={`md:w-1/2 lg:w-2/3 rounded-lg shadow-lg`}
  >
  <div className="p-4 md:p-12 text-center lg:text-left">
    <ProfileCardHeader />
    <ProfileCardBody />
    <ProfileCardFooter />
    </div>
  </div>
)

export default ProfileCard
