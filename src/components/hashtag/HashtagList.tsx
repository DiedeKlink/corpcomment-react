import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {
  //const { companyList, handleSelectCompany } = useFeedBackItemsContext();

  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);
  const companyList = useFeedbackItemsStore((state) => state.getCompanyList());
  return (
    <ul className="hashtags">
      <HashtagItem onSelectCompany={selectCompany} company="all" />
      {companyList.map((company) => (
        <HashtagItem
          key={company}
          onSelectCompany={selectCompany}
          company={company}
        />
      ))}
    </ul>
  );
}
