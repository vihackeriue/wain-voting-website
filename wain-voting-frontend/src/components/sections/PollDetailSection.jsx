import { formatDate } from "../../utils/date";
import { statusPoll } from "../../utils/poll";
import classNames from "classnames";

const PollDetailSection = ({ poll, remainingVotes }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 place-items-center">
        {/* Image section */}
        <div data-aos="zoom-in" className="order-1 sm:order-2 inline-block">
          {/* Ảnh */}
          <img
            src={poll.image}
            alt="Voting banner"
            className=" w-full rounded-3xl shadow-2xl z-1"
          />
        </div>

        {/* Text section */}
        <div className="space-y-5 order-2 sm:order-1 xl:pr-40 ">
          <h1 data-aos="fade-up" className="text-4xl sm:text-3xl font-semibold">
            {poll.title}
          </h1>
          <p data-aos="fade-up" data-aos-delay="300">
            {poll.description}
          </p>
          <div className="flex flex-col gap-2">
            <p>
              <strong>Thời gian bất đầu: </strong> {formatDate(poll.startTime)}
            </p>
            <p>
              <strong>Thời gian kết thúc:</strong>
              {formatDate(poll.endTime)}
            </p>
            <p>
              <strong>Số lượt bình chọn còn lại: </strong> {remainingVotes}
            </p>
            <p>
              <strong>Trạng thái: </strong>
              <span
                className={classNames(
                  statusPoll(poll.startTime, poll.endTime).color,
                  "p-2 rounded-md"
                )}
              >
                {statusPoll(poll.startTime, poll.endTime).label}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PollDetailSection;
