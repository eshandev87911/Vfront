import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Fav.module.css";
import { useState } from "react";

const rag = [
  {
    name: "Leonardo DiCaprio",
  },
  {
    name: "Robert Downey Jr.",
  },
  {
    name: "Tom Cruise",
  },
  {
    name: "Will Smith",
  },
  {
    name: "Robert De Niro",
  },
  // {
  //   name: "Sylvester Stallone",
  // },
];

function Fav() {
  const [searchQuery, setSearchQuery] = useState("");
  const posts =
    searchQuery.length > 0
      ? rag.filter((post) =>
          `${post.name} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : rag;
  return (
    <>
      <main className={styles.homepage}>
        <PageNav />
        <section style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', textAlign:'center'}}>
          <div className={styles.head}>
            {" "}
            <h1 className={styles.h1}>
              &quot; Famous Personality TODO's &quot;
              <br />
            </h1>
            <SearchPosts
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className={styles.tod}>
            {posts.map((post, i) => (
              <Face key={i} post={post} />
            ))}
          </div>
          <div className={styles.kk}>
            <h1>Welcome to the Voice Recognition Todo List!</h1>
            <Link to="/app" className="cta">
              Start Recording Now
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

function SearchPosts({ searchQuery, setSearchQuery }) {
  return (
    <div className={styles.sear}>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search todo..."
        style={{padding:'16px 12px'}}
      />
    </div>
  );
}

function Face({ post }) {
  return (
    <div className={styles.st}>
      <h3 className={styles.ll}>{post.name}</h3>
      <ul>
        <li className={styles.li}>Get up at 4 am</li>
        <br />
        <li className={styles.li}>Get up at 4 am</li>
        <br />
        <li className={styles.li}>Get up at 4 am</li>
        <br />
      </ul>
    </div>
  );
}

export default Fav;
