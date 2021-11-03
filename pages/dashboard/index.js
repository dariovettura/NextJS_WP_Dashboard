import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { GrUserAdd } from 'react-icons/gr';
import { useCookies } from "react-cookie";
import 'react-pro-sidebar/dist/css/styles.css';


function index(props) {

  const [cookie, setCookie] = useCookies('user_nicename');

    const [author, setAuthor] = useState(props.author);
    console.log(author)
    return (
        <div >
         <div className="h-10 w-full shadow-md grid grid-cols-2 place-content-center">
           <h2 className='pl-2 font-medium'>Dashboard</h2>
           <h2 className='pr-2 font-medium place-self-end'>Ciao {cookie.user_nicename}</h2>

         </div>
            <div className="grid grid-cols-1 md:grid-cols-3 pb-40">
            <div  className="  max-h-72 mt-8  shadow-md ">
             <Link href={'/dashboard/crea'} >
               <div className='grid-cols-2 grid cursor-pointer h-full'>
                 <GrUserAdd className='h-full w-full'/>
               
                <div className='ml-2 font-bold'>
                <p >Crea Bar</p>
                </div>
                
                 </div>
             </Link> 
           
             </div>
            {author &&
          author.slice(0).map((post, i) => {
            return post.id !== 1? (
           <div key={i} className=" mt-8   shadow-md ">
             <Link href={'/dashboard/'+ post.id} >
               <div className='grid-cols-2 h-full grid cursor-pointer'>
                 <img className='object-contain' src={post.url} alt="" />
                <div className='ml-2 font-bold'>
                <p >{post.name}</p>
                </div>
                
                 </div>
             </Link> 
           
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