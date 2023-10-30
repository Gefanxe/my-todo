declare type Recordable<T = any> = Record<string, T>;

declare global {

  /**
   * 分頁查詢參數
   */
  interface PageQuery {
    pageNum: number;
    pageSize: number;
  }

  /**
   * 分頁響應對象
   */
  interface PageResult<T> {
    /**
     * 數據列表
     */
    list: T;
    /**
     * 數據總數
     */
    total: number;
  }

  interface ResponseResult {
    result: string
  }

}
export {};
