interface keywordType {
  id: number;
  type: string;
  name: string;
  depth: number;
  children: keywordType[];
}

export const styleKeyword: keywordType = {
  id: 0,
  type: "Root",
  name: "Keypoint",
  depth: 0,
  children: [
    {
      id: 1,
      type: "keyword",
      name: "미니멀",
      depth: 1,
      children: [
        {
          id: 2,
          type: "keyword",
          name: "상의",
          depth: 2,
          children: [],
        },
        {
          id: 3,
          type: "keyword",
          name: "하의",
          depth: 2,
          children: [],
        },
        {
          id: 4,
          type: "keyword",
          name: "아우터",
          depth: 2,
          children: [],
        },
      ],
    },
    {
      id: 5,
      type: "keyword",
      name: "스트릿",
      depth: 1,
      children: [
        {
          id: 6,
          type: "keyword",
          name: "상의",
          depth: 2,
          children: [],
        },
        {
          id: 7,
          type: "keyword",
          name: "하의",
          depth: 2,
          children: [],
        },
        {
          id: 8,
          type: "keyword",
          name: "아우터",
          depth: 2,
          children: [],
        },
      ],
    },
    {
      id: 13,
      type: "keyword",
      name: "오피스",
      depth: 1,
      children: [
        {
          id: 14,
          type: "keyword",
          name: "상의",
          depth: 2,
          children: [],
        },
        {
          id: 15,
          type: "keyword",
          name: "하의",
          depth: 2,
          children: [],
        },
        {
          id: 16,
          type: "keyword",
          name: "아우터",
          depth: 2,
          children: [],
        },
      ],
    },
    {
      id: 17,
      type: "keyword",
      name: "빈티지",
      depth: 1,
      children: [
        {
          id: 18,
          type: "keyword",
          name: "상의",
          depth: 2,
          children: [],
        },
        {
          id: 19,
          type: "keyword",
          name: "하의",
          depth: 2,
          children: [],
        },
        {
          id: 20,
          type: "keyword",
          name: "아우터",
          depth: 2,
          children: [],
        },
      ],
    },
    {
      id: 21,
      type: "keyword",
      name: "스포츠",
      depth: 1,
      children: [
        {
          id: 22,
          type: "keyword",
          name: "상의",
          depth: 2,
          children: [],
        },
        {
          id: 23,
          type: "keyword",
          name: "하의",
          depth: 2,
          children: [],
        },
        {
          id: 24,
          type: "keyword",
          name: "아우터",
          depth: 2,
          children: [],
        },
      ],
    },
  ],
};
