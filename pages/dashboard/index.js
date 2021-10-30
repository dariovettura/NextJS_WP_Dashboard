import React, { useState, useEffect } from "react";
import Link from 'next/link'

import { useCookies } from "react-cookie";
import 'react-pro-sidebar/dist/css/styles.css';


function index(props) {

  

    const [author, setAuthor] = useState(props.author);
    console.log(author)
    return (
        <div >
            <div className="grid grid-cols-3">
           {author &&
          author.slice(0).map((post, i) => {
            return post.id !== 1? (
           <div key={i} className="p-5 h-full text-center">
             <Link href={'/dashboard/'+ post.id}key={i} >
                 <img className='h-full' src={post.url} alt="" />
                

             </Link> 
             <p>{post.name}</p>
             </div>):null
          
        })}

</div>
           

            
        </div>
    );
}
export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
  
    
  
    const url =
      "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/users";
  
    //const result = await Axios.get(url);
    //const menu =  result.data
  
    const res = await fetch(url);
    const author = await res.json();
  
    //  const res = await fetch('https://.../posts')
    // const posts = await res.json()
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        author,
      },
      revalidate: 1,
    };
  }

export default index;