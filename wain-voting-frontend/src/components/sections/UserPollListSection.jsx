import PollCard from "../ui/card/PollCard";
import PrimaryButton from "../ui/button/PrimaryButton";
import SectionTitle from "../ui/SectionTitle";
import PrimaryPagination from "../ui/pagination/PrimaryPagination";
import CategoryFilter from "../ui/CategoryFilter";

function UserPollListSection({
  polls,
  pagination,
  isPagination,
  categories,
  isFilter,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <section
      data-aos="fade-up"
      className="container bg-gray-100 dark:bg-dark-900 dark:text-primary"
    >
      <SectionTitle>Tất cả cuộc bình chọn</SectionTitle>

      {isFilter && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-6">
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
      {isPagination && (
        <div className="hidden md:block">
          <div className="flex justify-center mb-8 ">
            <PrimaryPagination pagination={pagination} />
          </div>
        </div>
      )}
    </section>
  );
}

export default UserPollListSection;
