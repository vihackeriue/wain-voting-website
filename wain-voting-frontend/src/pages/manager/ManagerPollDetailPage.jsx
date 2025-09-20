import React, { useEffect } from "react";
import { usePollDetail } from "../../hooks/usePollDetail";
import PollDetailSection from "../../components/sections/PollDetailSection";
import PollResultSection from "../../components/sections/PollResultSection";
import ManagerCandidateListSection from "../../components/sections/ManagerCandidateListSection";
import useAuth from "../../hooks/useAuth";
import { usePollResult } from "../../hooks/usePollResult";

import { Legend } from "@headlessui/react";
import PollStatisticsResultSection from "../../components/sections/PollStatisticsResultSection";

function ManagerPollDetailPage() {
  const { loading, poll, isPollEnded } = usePollDetail();
  const { auth } = useAuth();

  const { pollResult, fetchPollResult } = usePollResult(
    poll,
    auth.walletAddress
  );

  useEffect(() => {
    if (poll) {
      fetchPollResult();
    }
  }, [poll, isPollEnded, fetchPollResult]);

  if (loading) return <p>Đang tải...</p>;

  console.log("polls", poll);
  return (
    <div className="container min-h-[620px] flex flex-col gap-6 my-10 text-secondary-900 ">
      <PollDetailSection poll={poll} />
      <PollResultSection pollResult={pollResult} isPollEnded={isPollEnded} />
      <PollStatisticsResultSection pollResult={pollResult} />
      <ManagerCandidateListSection candidates={poll.candidates} />
    </div>
  );
}

export default ManagerPollDetailPage;
