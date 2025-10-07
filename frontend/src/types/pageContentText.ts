export interface RichTextBlock {
  _type: string;      
  _key: string;
  children: {
    _type: string;     
    text: string;
    marks: string[];
  }[];
  style?: string;      
}

export interface PageContentData {
  page: string;
  content: RichTextBlock[];
}
