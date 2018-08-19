import actionTypes from './types/index';

export const setPage = (page) => 
  ({
    type: actionTypes.page.SET_PAGE,
    page
  });
