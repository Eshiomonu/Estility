
export interface PortableTextChild {
  _key: string;
  _type: "span";
  text: string;
  marks?: string[];
}

export interface PortableText {
  _key: string;
  _type: string; 
  style?: string;
  children: PortableTextChild[];
  markDefs?: unknown[];
}

export interface PageTitleData {
  title: string;
  description?: PortableText[];
}
