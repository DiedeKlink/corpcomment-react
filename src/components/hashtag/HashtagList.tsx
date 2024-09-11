import { useFeedBackItemsContext } from "../../lib/hooks";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {
  const { companyList, handleSelectCompany } = useFeedBackItemsContext();
  return (
    <ul className="hashtags">
      <HashtagItem onSelectCompany={handleSelectCompany} company="all" />
      {companyList.map((company) => (
        <HashtagItem
          key={company}
          onSelectCompany={handleSelectCompany}
          company={company}
        />
      ))}
    </ul>
  );
}
