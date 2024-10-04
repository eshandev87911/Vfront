function Commands() {
  return <div>COmm</div>;
}

export default Commands;

// import { Link } from "react-router-dom";
// import PageNav from "../components/PageNav";
// import styles from "./Commands.module.css";
// import { useState } from "react";

// const rag = [
//   {
//     name: "Leonardo DiCaprio",
//   },
//   {
//     name: "Robert Downey Jr.",
//   },
//   {
//     name: "Tom Cruise",
//   },
//   {
//     name: "Will Smith",
//   },
//   {
//     name: "Robert De Niro",
//   },
//   // {
//   //   name: "Sylvester Stallone",
//   // },
// ];

// function Fav() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const posts =
//     searchQuery.length > 0
//       ? rag.filter((post) =>
//           `${post.name} ${post.body}`
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase())
//         )
//       : rag;
//   return (
//     <>
//       <main className={styles.homepage}>
//         <PageNav />
//         <section>
//           <div className={styles.head}>
//             {" "}
//             <h1 className={styles.h1}>
//               &quot;Famous Personality TODO s&quot;
//               <br />
//             </h1>
//             <SearchPosts
//               searchQuery={searchQuery}
//               setSearchQuery={setSearchQuery}
//             />
//           </div>
//           <div className={styles.tod}>
//             {posts.map((post, i) => (
//               <Face key={i} post={post} />
//             ))}
//           </div>
//           <div className={styles.kk}>
//             <h2>Welcome to the Voice Recognition Todo List!</h2>
//             <Link to="/app" className="cta">
//               Start Recording Now
//             </Link>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }

// function SearchPosts({ searchQuery, setSearchQuery }) {
//   return (
//     <div className={styles.sear}>
//       <input
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Search todo..."
//       />
//     </div>
//   );
// }

// function Face({ post }) {
//   return (
//     <div className={styles.st}>
//       <h3 className={styles.ll}>{post.name}</h3>
//       <ul>
//         <li className={styles.li}>Get up at 4 am</li>
//         <br />
//         <li className={styles.li}>Get up at 4 am</li>
//         <br />
//         <li className={styles.li}>Get up at 4 am</li>
//         <br />
//       </ul>
//     </div>
//   );
// }

// export default Fav;
