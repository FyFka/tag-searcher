"use client";

import { useState } from "react";
import { UserProfileRow } from "@/components/user-profile-row/user-profile-row";
import { getFromLocalStorage, setToLocalStorage } from "@/lib/localStorage";

export const ServerTagPreview = ({ tagName, tagImg }) => {
  const localStorageKey = "username";
  const [storedUsername, setStoredUsername] = useState(() => getFromLocalStorage(localStorageKey) ?? "Your username");

  const handleUsernameUpdate = (newUsername) => {
    setToLocalStorage(localStorageKey, newUsername);
    setStoredUsername(newUsername);
  };

  return (
    <div className="p-2 rounded-lg shadow-lg bg-base-300 border-input-color border-[color-mix(in_oklab,var(--color-base-content)_10%,transparent)] border-1">
      <div className="flex flex-col gap-0.5">
        <UserProfileRow
          avatar="https://cdn.discordapp.com/avatars/1133224855140044890/ff6471cd1e018f9adaeafc2d793d4812.webp?size=64"
          username="Cheese Shark"
          status="idle"
        />
        <UserProfileRow
          avatar="https://cdn.discordapp.com/avatars/1093973375627567185/25e92a3176136a522d506e6ec860b5b7.webp?size=64"
          tagName={tagName}
          tagImg={tagImg}
          username={storedUsername}
          highlight
          editable
          onUsernameChange={handleUsernameUpdate}
          status="online"
        />
        <UserProfileRow
          avatar="https://cdn.discordapp.com/avatars/385151051868798979/eb20573770640b1b14577de3f25ca8d6.webp?size=64"
          username="Jalapeño Hot Dorito"
          status="dnd"
        />
      </div>
    </div>
  );
};
