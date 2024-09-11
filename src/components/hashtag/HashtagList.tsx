import HashtagItem from "./HashtagItem";

type HashtagListProps = {
  companyList: string[];
  handleSelectCompany: (company: string) => void;
};

export default function HashtagList({
  companyList,
  handleSelectCompany,
}: HashtagListProps) {
  return (
    <ul className="hashtags">
      <HashtagItem onSelectCompany={handleSelectCompany} company="all" />
      {companyList.map((company) => (
        <HashtagItem onSelectCompany={handleSelectCompany} company={company} />
      ))}
    </ul>
  );
}
