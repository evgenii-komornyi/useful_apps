export interface ExpenseSelectorProps {
    allKeys: string[];
    selectedKeys: string[];
    onToggle: (key: string) => void;
}
