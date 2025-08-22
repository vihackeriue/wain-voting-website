// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {
    struct Candidate {
        bytes32 id;
        string cid; // CID chứa thông tin ứng viên
        uint256 voteCount;
    }

    struct Poll {
        bytes32 id;
        uint256 maxVotesPerVoter;
        string cid; // CID chứa thông tin cuộc bình chọn
        bytes32[] candidateIds;
        bool exists;
    }

    address public owner;
    uint256 public nextCandidateId = 1;

    event PollCreated(bytes32 pollId);
    event CandidateAdded(bytes32 pollId, bytes32 candidateId);

    mapping(bytes32 => Poll) public polls;
    mapping(bytes32 => Candidate) public candidates;
    mapping(bytes32 => mapping(address => uint256)) public votesUsed; // pollId => voter => votes used
    mapping(bytes32 => mapping(bytes32 => bool)) public isCandidateInPoll; // pollId => candidateId => exists

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier pollExists(bytes32 _pollId) {
        require(polls[_pollId].exists, "Poll does not exist");
        _;
    }

    function createPoll(
        bytes32 _pollId,
        uint256 _maxVotesPerVoter,
        string memory _cid
    ) public {
        require(!polls[_pollId].exists, "Poll already exists");

        polls[_pollId] = Poll({
            id: _pollId,
            maxVotesPerVoter: _maxVotesPerVoter,
            cid: _cid,
            candidateIds: new bytes32[](0),
            exists: true
        });

        emit PollCreated(_pollId);
    }

    function addCandidatesToPoll(
        bytes32 _pollId,
        bytes32[] memory _candidateIds,
        string[] memory _cids
    ) public pollExists(_pollId) {
        require(_candidateIds.length == _cids.length, "Length mismatch");

        for (uint256 i = 0; i < _cids.length; i++) {
            bytes32 candidateId = _candidateIds[i];
            require(!isCandidateInPoll[_pollId][candidateId], "Candidate exists");

            candidates[candidateId] = Candidate({
                id: candidateId,
                cid: _cids[i],
                voteCount: 0
            });

            polls[_pollId].candidateIds.push(candidateId);
            isCandidateInPoll[_pollId][candidateId] = true;

            emit CandidateAdded(_pollId, candidateId);
        }
    }

    function vote(
        bytes32 _pollId,
        bytes32 _candidateId,
        uint256 _voteCount
    ) public pollExists(_pollId) {
        require(isCandidateInPoll[_pollId][_candidateId], "Candidate not in poll");

        uint256 usedVotes = votesUsed[_pollId][msg.sender];
        require(usedVotes + _voteCount <= polls[_pollId].maxVotesPerVoter, "Exceeds vote limit");

        votesUsed[_pollId][msg.sender] += _voteCount;
        candidates[_candidateId].voteCount += _voteCount;
    }

    function getRemainingVotes(bytes32 _pollId, address _voter) public view returns (uint256) {
        return polls[_pollId].maxVotesPerVoter - votesUsed[_pollId][_voter];
    }

    function getCandidateVotes(bytes32 _candidateId) public view returns (uint256) {
        return candidates[_candidateId].voteCount;
    }

    function getPollCandidates(bytes32 _pollId) public view returns (bytes32[] memory) {
        return polls[_pollId].candidateIds;
    }

    function getAllCandidatesInPoll(bytes32 _pollId)
        public
        view
        pollExists(_pollId)
        returns (Candidate[] memory)
    {
        bytes32[] memory candidateIds = polls[_pollId].candidateIds;
        Candidate[] memory pollCandidates = new Candidate[](candidateIds.length);

        for (uint256 i = 0; i < candidateIds.length; i++) {
            pollCandidates[i] = candidates[candidateIds[i]];
        }

        return pollCandidates;
    }

    function getPollResult(bytes32 _pollId)
        public
        view
        pollExists(_pollId)
        returns (
            bytes32 winnerId,
            uint256 highestVoteCount,
            uint256 totalVotes,
            bytes32[] memory candidateIds,
            uint256[] memory voteCounts
        )
    {
        bytes32[] memory ids = polls[_pollId].candidateIds;
        uint256[] memory votes = new uint256[](ids.length);

        uint256 total = 0;
        uint256 topVoteCount = 0;
        bytes32 topCandidateId = 0;

        for (uint256 i = 0; i < ids.length; i++) {
            uint256 count = candidates[ids[i]].voteCount;
            votes[i] = count;
            total += count;

            if (count > topVoteCount) {
                topVoteCount = count;
                topCandidateId = ids[i];
            }
        }

        return (topCandidateId, topVoteCount, total, ids, votes);
    }
}
