
import { PortableTextBlock } from "../types/pageContentText";

export const convertToPortableText = (
  blocks: unknown[]
): PortableTextBlock[] => {
  return blocks.map((block) => ({
    _key: block._key || crypto.randomUUID(),
    _type: block.type, // rename "type" → "_type"
    style: block.style || "normal",
    children: block.children.map((child: any) => ({
      _key: child._key || crypto.randomUUID(),
      _type: "span",
      text: child.text,
      marks: child.marks || [],
    })),
    markDefs: block.markDefs || [],
  }));
};
