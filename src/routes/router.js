import PAGES from "../models/pageModel.js";
import {
  ADD_TASK_PAGE,
  EDIT_TASK_PAGE,
  ERROR_404_PAGE,
  HOME_PAGE,
} from "../services/domService.js";

const pageToDOMMap = [
  {
    page: PAGES.HOME,
    dom: HOME_PAGE,
  },
  {
    page: PAGES.ADD_TASK,
    dom: ADD_TASK_PAGE,
  },

  {
    page: PAGES.ERROR_404,
    dom: ERROR_404_PAGE,
  },
  { page: PAGES.EDIT_TASK, dom: EDIT_TASK_PAGE },
];

export const onChangePage = (page) => {
  pageToDOMMap.forEach((pageMap) => (pageMap.dom.className = "d-none")); // hide all pages

  const pageMap = pageToDOMMap.find((pageMap) => pageMap.page === page); // find the page that was clicked

  if (pageMap) return (pageMap.dom.className = "d-block"); // show the page that was clicked

  // show 404 page if we got this far (the page was not found, so the 'return' statement was not executed)
  ERROR_404_PAGE.className = "d-block";
};
