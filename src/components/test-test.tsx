import {
    DoorClosed,
    DoorOpen,
    GearWideConnected,
    PlusCircle,
  } from "react-bootstrap-icons";
  import SessionListItem from "./SessionListItem";
  import { useQuery } from "react-query";
  import { fetchAllSessions } from "../api/session";
  import { fetchUserInfo } from "../api/user";
  import { Session } from "../models/session";
  import SidebarNavListItem from "./SidebarNavListItem";
  import { useAuth } from "react-oidc-context";
  import { signOutRedirect } from "../auth/functions";
  import { useState } from "react";
  
  interface Props {
    setSession: (session: Session) => void;
  }
  
  interface UserInfo {
    "custom:school_name"?: string;
    "custom:class_name"?: string;
    "custom:group_name"?: string;
  }
  
  const Sidebar = ({ setSession }: Props) => {
    const auth = useAuth();
    const userId = auth.user?.profile.sub;
    const accessToken = auth.user?.access_token;
  
    const [selectedSchool, setSelectedSchool] = useState<string>("");
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [selectedGroup, setSelectedGroup] = useState<string>("");
  
    const {
      data: userInfo,
      isLoading: isUserInfoLoading,
      isError: isUserInfoError,
      error: userInfoError,
    } = useQuery<UserInfo>(
      ["userInfo", accessToken],
      () => fetchUserInfo(accessToken!),
      {
        enabled: !!accessToken,
        onSuccess: (data) => {
          console.log("User info:", data);
          setSelectedSchool(data["custom:school_name"] || "");
          setSelectedClass(data["custom:class_name"] || "");
          setSelectedGroup(data["custom:group_name"] || "");
        },
      }
    );
  
    const handleApplyFilter = () => {
      console.log("Applying filter:", {
        school: selectedSchool,
        className: selectedClass,
        group: selectedGroup,
      });
    };
  
    const handleBulkExport = () => {
      console.log("Bulk exporting sessions:", sessions);
    };
  
    if (isUserInfoLoading) {
      return <p className="text-center">Loading user info...</p>;
    }
  
    if (isUserInfoError) {
      console.error("Failed to fetch user info:", userInfoError);
      return <p className="text-center text-danger">Failed to load user info.</p>;
    }
  
    return (
      <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
        <ul className="nav flex-column">
          <SidebarNavListItem icon={HouseFill}>Sessions</SidebarNavListItem>
  
          {auth.isLoading && <p className="text-center">LOADING...</p>}
  
          {!auth.isLoading && (
            auth.isAuthenticated ? (
              <SidebarNavListItem
                icon={DoorClosed}
                onClick={() => {
                  auth.removeUser();
                  signOutRedirect();
                }}
              >
                Sign out
              </SidebarNavListItem>
            ) : (
              <SidebarNavListItem
                icon={DoorOpen}
                onClick={() => auth.signinRedirect()}
              >
                Sign in
              </SidebarNavListItem>
            )
          )}
        </ul>
      </div>
    );
  };
  
  export default Sidebar;
  