import React, { useEffect } from "react";
import PollDetailSection from "../../components/sections/PollDetailSection";
import { usePollDetail } from "../../hooks/usePollDetail";
import PollResultSection from "../../components/sections/PollResultSection";
import UserCandidateListSection from "../../components/sections/UserCandidateListSection";
import useAuth from "../../hooks/useAuth";
import { useRemainingVotes } from "../../hooks/useRemainingVotes";
import { usePollResult } from "../../hooks/usePollResult";

function UserPollDetailPage() {
  const { loading, poll, isPollEnded, isPollStarted } = usePollDetail();
  const { auth } = useAuth();

  const { remainingVotes, fetchRemainingVotes } = useRemainingVotes(
    poll,
    auth.walletAddress
  );
  const { pollResult, fetchPollResult } = usePollResult(
    poll,
    auth.walletAddress
  );

  useEffect(() => {
    console.log("useEffect chạy với poll:", poll, "isPollEnded:", isPollEnded);
    if (poll) {
      fetchRemainingVotes();
      if (isPollEnded) {
        // Lấy kết quả bình chọn từ blockchain khi cuộc bình chọn đã kết thúc
        fetchPollResult();
      }
    }
  }, [poll, isPollEnded, fetchRemainingVotes, fetchPollResult]);

  if (loading) return <p> Đang tải...</p>;

  const isValidUserVoting = () =>
    isPollStarted && !isPollEnded && remainingVotes > 0;
  console.log("pollResult ", pollResult);
  return (
    <div className="container min-h-[620px] flex flex-col gap-6 my-10 text-secondary-900 ">
      <PollDetailSection poll={poll} remainingVotes={remainingVotes} />
      {isPollEnded && (
        <PollResultSection pollResult={pollResult} isPollEnded={isPollEnded} />
      )}

      <UserCandidateListSection
        candidates={poll.candidates}
        isValidUserVoting={isValidUserVoting}
        chainIdPoll={poll.chainId}
        fetchRemainingVotes={fetchRemainingVotes}
      />
    </div>
  );
}

export default UserPollDetailPage;
