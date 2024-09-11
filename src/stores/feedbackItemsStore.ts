import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => void;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => void;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "all",
  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  },
  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany !== "all"
      ? state.feedbackItems.filter(
          (feedbackItem) => feedbackItem.company === state.selectedCompany
        )
      : state.feedbackItems;
  },
  addItemToList: async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word: string) => word.includes("#"))!
      .substring(1);
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    //setFeedbackItems([...feedbackItems, newItem]);
    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        {
          method: "POST",

          body: JSON.stringify(newItem),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
    } catch (error) {
      // setErrorMessage("Something went wrong.");
      set(() => ({
        errorMessage: "Something went wrong.",
      }));
    }
  },

  selectCompany: (company: string) => {
    // setSelectedCompany(company)
    set(() => ({
      selectedCompany: company,
    }));
  },
  fetchFeedbackItems: async () => {
    // setIsLoading(true);
    set(() => ({
      isLoading: true,
    }));
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();
      //setIsLoading(false);
      set(() => ({
        isLoading: false,
      }));
      // setFeedbackItems(data.feedbacks);
      set(() => ({
        feedbackItems: data.feedbacks,
      }));
    } catch (error) {
      //setErrorMessage("Something went wrong.");
      set(() => ({
        errorMessage: "Something went wrong.",
      }));
      //setIsLoading(false);
      set(() => ({
        isLoading: false,
      }));
    }
  },
}));
