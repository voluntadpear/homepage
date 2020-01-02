import React from "react"

const ProfileCardBody = () => (
  <React.Fragment>
    <p className="pt-8 text-sm">
    Hi! I'm a developer who enjoys building web applications. I'm constantly looking to learn and apply new concepts that simplify my workflow, the developer experience of my peers and the user experience of everyone.
    </p>

    <div className="pt-12 pb-8">
      <a
        href="mailto:gperaltascura@gmail.com"
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
      >
        Get In Touch
      </a>
    </div>
  </React.Fragment>
)

export default ProfileCardBody
