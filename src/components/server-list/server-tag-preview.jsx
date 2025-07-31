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
    <div className="p-2 rounded-2xl shadow-lg bg-base-300 border-[color-mix(in_oklab,var(--color-base-content)_10%,transparent)] border-1">
      <div className="flex flex-col gap-0.5">
        <UserProfileRow
          avatar="https://cdn.discordapp.com/avatars/1093973375627567185/8da0dab9168e1ba26352078ed5a901fc.webp?size=32"
          username="Cheese Monkey"
          status="idle"
        />
        <UserProfileRow
          avatar="https://cdn.discordapp.com/avatars/1035837542844612639/44f246f20257585d6d54cd42dd49621d.webp?size=32"
          tagName={tagName}
          tagImg={tagImg}
          username={storedUsername}
          highlight
          editable
          onUsernameChange={handleUsernameUpdate}
          status="online"
        />
        <UserProfileRow
          avatar="https://cdn.discordapp.com/avatars/995593479537303613/ba8dcd9f26300c46f96f752b9ac17d0f.webp?size=32"
          username="Donut Otter"
          status="dnd"
        />
      </div>
    </div>
  );
};
