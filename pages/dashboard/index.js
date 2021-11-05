import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GrUserAdd } from "react-icons/gr";
import { GrMailOption } from "react-icons/gr";
import { GrRefresh } from "react-icons/gr";
import { GrImage } from "react-icons/gr";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import { useCookies } from "react-cookie";
import "react-pro-sidebar/dist/css/styles.css";

function index(props) {
  const [cookie, setCookie] = useCookies("user_nicename");

  const [author, setAuthor] = useState(props.author);
  console.log(author);
  return (
    <div >
      <div className="md:grid hidden grid-cols-4  mb-5 ">
      <div style={{ height: "60px" }} className="rounded-lg bg-blue-200 m-5 shadow-md border">
          <Link href={"/dashboard/crea"}>
            <div className="grid-cols-2 grid cursor-pointer h-full">
              <GrUserAdd className=" h-3/4 place-self-center w-3/4" />

              <div className="ml-2 mt-2 font-bold place-self-center">
                <p>Crea Bar</p>
              </div>
            </div>
          </Link>
        </div>
        <div style={{ height: "60px" }} className=" rounded-lg bg-blue-200 m-5 shadow-md border">
          <Link href={"/dashboard/media"}>
            <div className="grid-cols-2 grid cursor-pointer h-full">
              <GrImage className=" h-3/4 place-self-center w-3/4" />

              <div className="ml-2 mt-2 font-bold place-self-center">
                <p>Media</p>
              </div>
            </div>
          </Link>
        </div>
        <div style={{ height: "60px" }} className=" rounded-lg bg-blue-200 m-5 shadow-md border">
          <Link href={"/dashboard/media"}>
            <div className="grid-cols-2 grid cursor-pointer h-full">
              <GrMailOption className=" h-3/4 place-self-center w-3/4" />

              <div className="ml-2 mt-2 font-bold place-self-center">
                <p>Invia Mail</p>
              </div>
            </div>
          </Link>
        </div>
        <div style={{ height: "60px" }} className=" rounded-lg bg-blue-200 m-5 shadow-md border">
          <Link href={"/dashboard/media"}>
            <div className="grid-cols-2 grid cursor-pointer h-full">
              <GrRefresh className="   h-3/4 place-self-center w-3/4" />

              <div className="ml-2 mt-2 font-bold place-self-center">
                <p>Aggiorna</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 m-5">
        <h2 className='font-black text-3xl '>Users</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 pb-40 ">
        
        {author &&
          author.slice(0).map((post, i) => {
            return post.id !== 1 ? (
              <div
                key={i}
                style={{ minHeight: "150px" }}
                className="  m-5 bg-white  shadow-md border"
              >
                <Link href={"/dashboard/" + post.id}>
                  <div className="grid-cols-1 p-4   h-full grid cursor-pointer">
                   
                   <div className="grid grid-cols-2 place-content-center mb-4 place-items-center">
                      <Avatar
                       sx={{ width: 74, height: 74 }}
                        className=" border "
                        src={post.url}
                        alt=""
                      />
                    

                    <div className="mb-2  capitalize ">
                      <p className='font-bold'>{post.name}</p>
                    
                    </div></div>
                     <div className="grid grid-cols-1">
                    
                     </div>
                    <div className="grid grid-cols-2 ">
                 
                    <Button className='mr-1 bg-blue-100'>Modifica</Button>
                    <Button  variant="outlined">Anteprima</Button>
                    </div>
                  </div>
                </Link>
              </div>
            ) : null;
          })}
      </div>
    </div>
  );
}
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const url = "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/users";

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
