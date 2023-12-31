import { PAGE_LIMIT } from '../../config';
import { BlogAttributes, UserAttributes } from '../../types';

/**
 * Get limit and offset for pagination
 * @param page
 * @returns
 */
export const getPagination = (page: number) => {
  page = Number.isNaN(page) ? 0 : page;
  const offset = page <= 1 ? 0 : (page - 1) * PAGE_LIMIT;
  return { limit: PAGE_LIMIT, offset };
};

/**
 * Format data for response
 * @param data
 * @param page
 * @returns
 */
export const getPagingData = (
  data: { count: number; rows: (BlogAttributes | UserAttributes)[] },
  page: number
) => {
  const { count: totalItem, rows } = data;
  const currentPage = page ? +page : 1;
  const totalPage = Math.ceil(totalItem / PAGE_LIMIT);

  return { totalItem, totalPage, currentPage, perPage: PAGE_LIMIT, data: rows };
};

/**
 * Display second in hour
 * @param sec
 * @returns
 */
export const secondsToHour = (sec: number): string => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor((sec % 3600) % 60);

  const hDisplay = h > 0 ? `${h}h` : '';
  const mDisplay = m > 0 ? `${m}m` : '';
  const sDisplay = s > 0 ? `${s}s` : '';
  return `${hDisplay}${mDisplay}${sDisplay}`;
};

/**
 * Get date in second
 * @param date
 * @returns
 */
export const getDateInSecond = (date: string) => {
  return new Date(date).getTime() / 1000;
};
