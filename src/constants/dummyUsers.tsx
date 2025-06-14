// src/constants/dummyUsers.ts
export const dummyUsers: Record<
  string,
  { name: string; avatar: string; cover: string; bio: string; followers: number; following: number; joined?: string;  followingList: { name: string; avatar: string }[];}
> = {
   ashwini: {
    name: "Ashwini Balasaheb Nargarboje",
    avatar: "https://i.pravatar.cc/100?u=ashwini",
    cover: "https://picsum.photos/seed/ashwini/1200/300",
    bio: "Full-stack developer passionate about creating interactive web experiences. Loves coffee, cats, and open-source.",
    followers: 124,
    following: 56,
    joined: "March 2023",
    followingList: [
      { name: "Jo Sevier", avatar: "https://i.pravatar.cc/100?img=11" },
      { name: "Keith Lauver", avatar: "https://i.pravatar.cc/100?img=12" },
      { name: "Roy Bahat", avatar: "https://i.pravatar.cc/100?img=13" },
      { name: "Lara Nguyen", avatar: "https://i.pravatar.cc/100?img=14" },
      { name: "Ben Halpert", avatar: "https://i.pravatar.cc/100?img=15" },
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
        { name: "Emily Brown", avatar: "https://i.pravatar.cc/100?u=emily" },
        { name: "Jane Smith", avatar: "https://i.pravatar.cc/100?u=jane" },
        { name: "Mira Vance", avatar: "https://i.pravatar.cc/100?img=16" },
        { name: "Jo Sevier", avatar: "https://i.pravatar.cc/100?img=11" },
        { name: "Keith Lauver", avatar: "https://i.pravatar.cc/100?img=12" },
    ],
  },

  emilybrown: {
    name: "Emily Brown",
    avatar: "https://i.pravatar.cc/100?u=emily",
    cover: "https://picsum.photos/seed/emily/1200/300",
    bio: "Cloud architect and Kubernetes geek. Speaks fluent YAML.",
    followers: 428,
    following: 49,
    joined: "June 2021",
    followingList: [
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/100?u=jane" },
      { name: "Jo Sevier", avatar: "https://i.pravatar.cc/100?img=11" },
      { name: "Keith Lauver", avatar: "https://i.pravatar.cc/100?img=12" },
      { name: "Roy Bahat", avatar: "https://i.pravatar.cc/100?img=13" },
      { name: "John Doe", avatar: "https://i.pravatar.cc/100?u=john" },
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
        { name: "John Doe", avatar: "https://i.pravatar.cc/100?u=john" },
        { name: "Ben Halpert", avatar: "https://i.pravatar.cc/100?img=15" },
        { name: "Lara Nguyen", avatar: "https://i.pravatar.cc/100?img=14" },
        { name: "Emily Brown", avatar: "https://i.pravatar.cc/100?u=emily" },
        { name: "Jo Sevier", avatar: "https://i.pravatar.cc/100?img=11" },
    ],
  },

  "josevier": {
    name: "Jo Sevier",
    avatar: "https://i.pravatar.cc/100?img=11",
    cover: "https://picsum.photos/seed/jo/1200/300",
    bio: "JavaScript ninja. Conference speaker. Enjoys mountain biking and type systems.",
    followers: 300,
    following: 120,
    joined: "January 2022",
    followingList: [
        { name: "Emily Brown", avatar: "https://i.pravatar.cc/100?u=emily" },
        { name: "Jane Smith", avatar: "https://i.pravatar.cc/100?u=jane" },
        { name: "John Doe", avatar: "https://i.pravatar.cc/100?u=john" },
        { name: "Lara Nguyen", avatar: "https://i.pravatar.cc/100?img=14" },
        { name: "Roy Bahat", avatar: "https://i.pravatar.cc/100?img=13" },
    ],
  },

  "keithlauver": {
    name: "Keith Lauver",
    avatar: "https://i.pravatar.cc/100?img=12",
    cover: "https://picsum.photos/seed/keith/1200/300",
    bio: "Pythonista and data whisperer. Pizza lover and aspiring astronaut.",
    followers: 278,
    following: 98,
    joined: "December 2021",
    followingList: [
      { name: "Jo Sevier", avatar: "https://i.pravatar.cc/100?img=11" },
      { name: "Roy Bahat", avatar: "https://i.pravatar.cc/100?img=13" },
      { name: "John Doe", avatar: "https://i.pravatar.cc/100?u=john" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/100?u=jane" },
      { name: "Ben Halpert", avatar: "https://i.pravatar.cc/100?img=15" },
    ],
  },

  "roybahat": {
    name: "Roy Bahat",
    avatar: "https://i.pravatar.cc/100?img=13",
    cover: "https://picsum.photos/seed/roy/1200/300",
    bio: "Investor and writer. Fascinated by the future of work and society.",
    followers: 512,
    following: 143,
    joined: "August 2020",
    followingList: [
        { name: "Keith Lauver", avatar: "https://i.pravatar.cc/100?img=12" },
        { name: "Mira Vance", avatar: "https://i.pravatar.cc/100?img=16" },
        { name: "Jane Smith", avatar: "https://i.pravatar.cc/100?u=jane" },
        { name: "Emily Brown", avatar: "https://i.pravatar.cc/100?u=emily" },
        { name: "John Doe", avatar: "https://i.pravatar.cc/100?u=john" },
    ],
  },

  "laranguyen": {
    name: "Lara Nguyen",
    avatar: "https://i.pravatar.cc/100?img=14",
    cover: "https://picsum.photos/seed/lara/1200/300",
    bio: "UX designer and prototyping magician. Fan of minimalist design and pastel color palettes.",
    followers: 340,
    following: 80,
    joined: "April 2022",
    followingList: [
      { name: "Jo Sevier", avatar: "https://i.pravatar.cc/100?img=11" },
      { name: "Ben Halpert", avatar: "https://i.pravatar.cc/100?img=15" },
      { name: "John Doe", avatar: "https://i.pravatar.cc/100?u=john" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/100?u=jane" },
      { name: "Emily Brown", avatar: "https://i.pravatar.cc/100?u=emily" },
    ],
  },

  "benhalpert": {
    name: "Ben Halpert",
    avatar: "https://i.pravatar.cc/100?img=15",
    cover: "https://picsum.photos/seed/ben/1200/300",
    bio: "DevOps engineer. Obsessed with CI/CD pipelines and clean terminal setups.",
    followers: 199,
    following: 60,
    joined: "May 2021",
    followingList: [
        { name: "Keith Lauver", avatar: "https://i.pravatar.cc/100?img=12" },
        { name: "Roy Bahat", avatar: "https://i.pravatar.cc/100?img=13" },
        { name: "Lara Nguyen", avatar: "https://i.pravatar.cc/100?img=14" },
        { name: "Jo Sevier", avatar: "https://i.pravatar.cc/100?img=11" },
        { name: "Jane Smith", avatar: "https://i.pravatar.cc/100?u=jane" },
    ],
  },

  "miravance": {
    name: "Mira Vance",
    avatar: "https://i.pravatar.cc/100?img=16",
    cover: "https://picsum.photos/seed/mira/1200/300",
    bio: "Cybersecurity specialist. Loves capturing the flag and jazz music.",
    followers: 312,
    following: 87,
    joined: "July 2021",
    followingList: [
      { name: "John Doe", avatar: "https://i.pravatar.cc/100?u=john" },
      { name: "Emily Brown", avatar: "https://i.pravatar.cc/100?u=emily" },
      { name: "Jo Sevier", avatar: "https://i.pravatar.cc/100?img=11" },
      { name: "Roy Bahat", avatar: "https://i.pravatar.cc/100?img=13" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/100?u=jane" },
    ],
  },

};

export const defaultUser = dummyUsers["ashwini"];
