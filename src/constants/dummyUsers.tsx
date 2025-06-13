// src/constants/dummyUsers.ts
export const dummyUsers: Record<
  string,
  { name: string; avatar: string; cover: string; bio: string; followers: number; following: number; joined?: string;  followingList: { name: string; avatar: string }[];}
> = {
  ashwini: {
    name: "Ashwini Balasaheb Nargarboje",
    avatar: "https://i.pravatar.cc/100?u=ashwini",
    cover: "https://picsum.photos/seed/cover/1200/300",
    bio: "Full-stack developer passionate about creating interactive web experiences. Loves coffee, cats, and open-source.",
    followers: 124,
    following: 56,
    joined: "March 2023",
    followingList: [
      { name: "Jo Sevier", avatar: "https://i.pravatar.cc/100?img=11" },
      { name: "Keith Lauver", avatar: "https://i.pravatar.cc/100?img=12" },
      { name: "Roy Bahat", avatar: "https://i.pravatar.cc/100?img=13" },
    ],
  },
  johndoe: {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/100?u=john",
    cover: "https://picsum.photos/seed/john/1200/300",
    bio: "Tech writer and software architect. Loves systems design and good espresso.",
    followers: 230,
    following: 89,
    joined: "June 2022",
     followingList: [
      { name: "Jo Sevier", avatar: "https://i.pravatar.cc/100?img=11" },
      { name: "Keith Lauver", avatar: "https://i.pravatar.cc/100?img=12" },
      { name: "Roy Bahat", avatar: "https://i.pravatar.cc/100?img=13" },
    ],
  },
  emilybrown: {
    name: "Emily Brown",
    avatar: "https://i.pravatar.cc/100?u=emily",
    cover: "https://picsum.photos/seed/john/1200/300",
    bio: "Tech writer and software architect. Loves systems design and good espresso.",
    followers: 428,
    following: 46,
    joined: "June 2021",
     followingList: [
      { name: "Jo Sevier", avatar: "https://i.pravatar.cc/100?img=11" },
      { name: "Keith Lauver", avatar: "https://i.pravatar.cc/100?img=12" },
      { name: "Roy Bahat", avatar: "https://i.pravatar.cc/100?img=13" },
    ],
  },
  janesmith: {
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/100?u=jane",
    cover: "https://picsum.photos/seed/jane/1200/300",
    bio: "Frontend engineer. Cat mom. Vue and React enthusiast.",
    followers: 180,
    following: 102,
    joined: "March 2021",
     followingList: [
      { name: "Jo Sevier", avatar: "https://i.pravatar.cc/100?img=11" },
      { name: "Keith Lauver", avatar: "https://i.pravatar.cc/100?img=12" },
      { name: "Roy Bahat", avatar: "https://i.pravatar.cc/100?img=13" },
    ],
  },
};
