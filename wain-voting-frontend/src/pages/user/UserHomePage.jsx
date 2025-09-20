import Img1 from "../../assets/blog/blog1.png";
import Img2 from "../../assets/blog/blog2.png";
import Img3 from "../../assets/blog/blog3.png";
import BannerSection from "../../components/sections/BannerSection";
import PopularPollSection from "../../components/sections/PopularPollSection";

import PrimaryButton from "../../components/ui/button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import UserPollListSection from "../../components/sections/UserPollListSection";

import { usePollList } from "../../hooks/usePollList";

function UserHomePage() {
  const navigate = useNavigate();
  const { loading, polls, page, totalPages, setPage } = usePollList();

  return (
    <>
      <BannerSection />
      <PopularPollSection polls={polls} />
      <UserPollListSection
        polls={polls}
        loading={loading}
        pagination={{ page, totalPages, setPage }}
        isPagination={false}
        isFilter={false}
      />

      <div className="text-center mb-10">
        <PrimaryButton onClick={() => navigate("/poll-list")}>
          Xem thêm
        </PrimaryButton>
      </div>
    </>
  );
}

export default UserHomePage;
