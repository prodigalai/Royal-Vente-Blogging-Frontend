// import Header from "./Header";
// import RightSidebar from "./RightSidebar";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";

// export function UserDetailsLayout() {
//   return (
//     <div className="h-screen bg-white">
//       <Header />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex">
//           <Sidebar />

//           <div className="flex-1 py-8">
//             <Outlet />
//           </div>

//           <aside className="hidden lg:block relative w-80">
//             <RightSidebar
//               type="profile"
//               username="Ashwini Balasaheb Nargarboje"
//               profileImgUrl="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
//             />
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }

import Header from "./Header";
import RightSidebar from "./RightSidebar";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { dummyUsers } from "../../constants/dummyUsers";

const CURRENT_USERNAME = "amir";

export function UserDetailsLayout() {
  const { username } = useParams();

  const actualUsername = username?.toLowerCase() || CURRENT_USERNAME;
  
  const user = username ? dummyUsers[username.toLowerCase()] || dummyUsers["ashwini"] : dummyUsers["ashwini"];

  return (
    <div className="h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          <Sidebar />

          <div className="flex-1 py-8">
            <Outlet />
          </div>

          <aside className="hidden lg:block relative w-80">
            <RightSidebar
              type="profile"
              username={user.name}
              profileImgUrl={user.avatar}
              bio={user.bio}
              followers={user.followers}
              following={user.following}
              joined={user.joined}
              followingList={user.followingList}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
