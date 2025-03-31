import {
  DoorClosed,
  DoorOpen,
  GearWideConnected,
  PlusCircle,
} from "react-bootstrap-icons";
import SessionListItem from "./SessionListItem";
import { useQuery, useQueryClient } from "react-query";
import { fetchAllSessions} from "../api/session";
import { Session } from "../models/session";
import SidebarNavListItem from "./SidebarNavListItem";
import { useAuth } from "react-oidc-context";
import { signOutRedirect } from "../auth/functions";
import { useState } from "react";
import { fetchUserInfo } from "../api/fetchUserInfo";

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
  const accessToken = auth.user?.access_token
  const queryClient = useQueryClient();
  
  const [selectedSchool, setSelectedSchool] = useState<string>("")
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedGroup, setSelectedGroup] = useState<string>("")

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

    queryClient.invalidateQueries(["session", accessToken]);
  };

  const handleBulkExport = () => {
    console.log("Bulk exporting sessions:", sessions);
  }; // TODO

  const {
    data: sessions,
    isLoading,
    isError,
  } = useQuery([
    "session", accessToken, { 
      school: selectedSchool, 
      class: selectedClass, 
      group: selectedGroup 
    }], () => fetchAllSessions(accessToken!, { 
    filter: true, 
    school: selectedSchool, 
    class: selectedClass, 
    group: selectedGroup 
  }), {
    enabled: !!accessToken,
    onSuccess: (data) => {
      data.reverse()
    }
  });

  console.log(`Is authenticated? ${auth.isAuthenticated}`);
  console.log(`User ID: ${userId}`);
  // console.log(`Access Token: ${accessToken}`);

  if (isUserInfoLoading) {
    return <p className="text-center">Loading user info...</p>;
  }

  if (isUserInfoError) {
    console.error("Failed to fetch user info:", userInfoError);
    return <p className="text-center text-danger">Failed to load user info.</p>;
  }

  return (
    <>
      <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary vh-100 d-flex flex-column">
        <div
          className="offcanvas-md offcanvas-end bg-body-tertiary vh-100 d-flex flex-column"
          tabIndex={-1}
          id="sidebarMenu"
          aria-labelledby="sidebarMenuLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sidebarMenuLabel">
              The Bioinformatics Project
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              data-bs-target="#sidebarMenu"
              aria-label="Close"
            ></button>
          </div>
          
          {/* Scrollable Content */}
          <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <ul className="nav flex-column">
              {/* <SidebarNavListItem icon={HouseFill}>Sessions</SidebarNavListItem> */}

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

            {/* Filters */}
            <div className="px-3 py-2">
              <label className="form-label small">School Filter</label>
              <select
                className="form-select form-select-sm mb-2"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <option value="">All</option>
                <option value="Philadelphia High School For Girls">
                  Philadelphia High School For Girls
                </option>
              </select>

              <label className="form-label small">Class Filter</label>
              <select
                className="form-select form-select-sm mb-2"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">All</option>
                <option value="Class A">Class A</option>
                <option value="Class B">Class B</option>
                <option value="Class C">Class C</option>
                <option value="Class D">Class D</option>
                <option value="Class E">Class E</option>
              </select>

              <label className="form-label small">Group Filter</label>
              <select
                className="form-select form-select-sm mb-3"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="">All</option>
                {[...Array(10)].map((_, index) => (
                  <option key={index} value={`Group ${index + 1}`}>
                    Group {index + 1}
                  </option>
                ))}
                <option value="None">None</option>
              </select>

              <button
                className="btn btn-sm btn-primary w-100 mb-2"
                onClick={handleApplyFilter}
              >
                Apply Filter
              </button>

              <button
                className="btn btn-sm btn-outline-secondary w-100"
                onClick={handleBulkExport}
              >
                Bulk Export
              </button>
            </div>

            {/* Sessions Section */}
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
              <span>Sessions</span>
              <a className="link-secondary" href="#" aria-label="Add a new report">
                <PlusCircle />
              </a>
            </h6>

            <ul className="nav flex-column mb-auto">
              {isLoading ? (
                <SessionListItem title="Loading..." />
              ) : isError ? (
                <SessionListItem title="Error" />
              ) : sessions ? (
                sessions.map((session: Session) => (
                  <SessionListItem
                    key={session.id}
                    title={`${session.title}`}
                    session={session}
                    setSession={setSession}
                  />
                ))
              ) : (
                <SessionListItem title="No Session" />
              )}
            </ul>

            <hr className="my-3" />

            <ul className="nav flex-column mb-auto">
              <SidebarNavListItem icon={GearWideConnected}>Settings</SidebarNavListItem>
            </ul>
          </div>
        </div>
      </div>

    </>
  );
};

export default Sidebar;
