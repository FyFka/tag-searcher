import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { AvatarWithStatus } from "@/components/user-profile-row/avatar-with-status";

export const UserProfileRow = ({
  avatar,
  username,
  status,
  tagName,
  tagImg,
  highlight,
  editable,
  onUsernameChange,
}) => {
  const [name, setName] = useState(username);
  const [editing, setEditing] = useState(false);
  const latestState = useRef({ name, editable, editing, onUsernameChange });

  useEffect(() => {
    latestState.current = { name, editable, editing, onUsernameChange };
  });

  useEffect(() => {
    return () => {
      const { editable, editing, name, onUsernameChange } = latestState.current;

      if (editable && editing) {
        const trimmed = name.trim();
        if (onUsernameChange) onUsernameChange(trimmed);
      }
    };
  }, []);

  const handleUsernameChange = (evt) => {
    const newUsername = evt.target.value.slice(0, 32);
    setName(newUsername);
  };

  const saveUsername = (newName) => {
    const trimmed = newName.trim();
    setName(trimmed);
    if (onUsernameChange) onUsernameChange(trimmed);
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveUsername(name);
    }
  };

  const handleClose = () => {
    saveUsername(name);
  };

  const highlightRootClass = highlight ? "bg-base-100 hover:bg-base-100/65" : "hover:bg-base-100";
  const highlightTextClass = highlight ? "opacity-100" : "group-hover:opacity-100";
  const RootElement = editable ? "button" : "div";

  return (
    <RootElement
      onClick={() => editable && setEditing(true)}
      className={`group flex items-center text-left w-72 h-11 min-h-11 ${highlightRootClass} rounded-lg cursor-${
        editable ? "pointer" : "default"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0 overflow-hidden pl-2 pr-4 text-ellipsis whitespace-nowrap w-full">
        <div className="flex items-center w-full">
          <div className="mr-3">
            <AvatarWithStatus avatar={avatar} username={username} status={status} />
          </div>
          <div className="truncate w-full">
            {editable && editing ? (
              <input
                name="username"
                autoFocus
                autoComplete="username"
                type="text"
                className="text-base font-medium bg-transparent border-b border-primary-content/60 outline-none w-full"
                value={name}
                onInput={handleUsernameChange}
                onBlur={handleClose}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <span className={`text-base opacity-60 ${highlightTextClass} font-medium select-none`}>{name}</span>
            )}
            {tagName && (
              <span className="ml-1 align-middle">
                <span className="inline-flex items-center max-w-[60px] leading-4 px-1 rounded-sm bg-[#313b47]">
                  {tagImg && (
                    <Image
                      alt={`[${tagName}]`}
                      className="-indent-96 mr-0.5 w-3 h-3 text-transparent"
                      width={12}
                      height={12}
                      src={`https://cdn.discordapp.com/${tagImg}.webp?size=32`}
                      fetchPriority="high"
                      priority
                      unoptimized
                    />
                  )}
                  <span className="select-none indent-0 text-xs font-bold">{tagName}</span>
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </RootElement>
  );
};
