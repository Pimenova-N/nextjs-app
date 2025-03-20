export type Author = {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  books?: Book[]; 
} 

export type Book = {
  id: number;
  title: string;
  description: string;
}
