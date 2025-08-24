"use client";

import { SubmitServer } from "@/components/header/submit-server";
import { AddRequestList } from "@/components/header/add-request-list/add-request-list";
import { useState } from "react";

export const AddServerModalContent = () => {
  const [page, setPage] = useState(1);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const handleServerAdd = () => {
    if (page === 1) {
      setRefetchTrigger((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <SubmitServer handleServerAdd={handleServerAdd} />
      <AddRequestList page={page} setPage={setPage} refetchTrigger={refetchTrigger} />
    </div>
  );
};
