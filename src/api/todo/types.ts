
export interface todoItem {
    identifyId: string;
    id: number;
    value: string;
    isEdit?: boolean
    completed?: boolean;
}

export type ListPageResult = PageResult<todoItem[]>;
