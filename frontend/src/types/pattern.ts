
export type KnittingMode = 'flat' | 'round'; 

export type Cell = {
    color: string; 
}; 

export type Pattern = { 
    id: string; 
    name: string; 
    rows: number; 
    columns: number;
    grid: Cell[][];
    knittedRows: boolean[];  
    knittingMode: KnittingMode; 
};