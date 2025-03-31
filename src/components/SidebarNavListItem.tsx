import React from "react";

interface Props {
  icon: React.ElementType;
  onClick?: () => void;
  href?: string;
  children?: string;
}

const SidebarNavListItem = ({
  icon: IconComponent,
  onClick,
  href,
  children,
}: Props) => {
  return (
    <>
      <li className="nav-item">
        {onClick == undefined ? (
          <a
            className="nav-link d-flex align-items-center gap-2"
            href={href || "#"}
          >
            <IconComponent />
            {children || "(Missing Label)"}
          </a>
        ) : (
          <button
            className="nav-link d-flex align-items-center gap-2"
            onClick={onClick}
          >
            <IconComponent />
            {children || "(Missing Label)"}
          </button>
        )}
      </li>
    </>
  );
};

export default SidebarNavListItem;
