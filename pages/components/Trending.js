import React from "react";
import Top from "./Top";
import { useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import Link from "next/link";

const Trending = ({ data }) => {
  const [top, setTop] = useState(false);
  let arr = data?.filter((ele) => ele?.attributes?.Trending === true);
  const ar = arr?.slice(Math.max(arr?.length - 5, 1))


console.log(arr)

  return (
    <div className="font-blinker">
      {/* Top and Trending toggle */}
      <div className="flex mt-20 cursor-pointer">
        <button onClick={() => setTop(false)}>
          <h1
            className={
              top
                ? `lg:text-5xl font-extrabold uppercase text-white/30 hover:text-white ease-in-out duration-200 text-2xl`
                : `lg:text-5xl font-extrabold uppercase text-white text-3xl`
            }
          >
            Trending <span className="text-white">|</span>
          </h1>
        </button>
        <span className="pl-2"></span>
        <button onClick={() => setTop(true)}>
          <h1
            className={
              top
                ? `lg:text-5xl font-extrabold uppercase text-white text-3xl`
                : `lg:text-5xl font-extrabold uppercase text-white/30 hover:text-white ease-in-out duration-200 text-2xl`
            }
          >
            Top Stories
          </h1>
        </button>
      </div>
      <hr />

      {/* top stories cards */}
      {top ? (
        <Top data={data} />
      ) : (
        <div className=" mt-5 lg:gap-1  grid lg:grid-cols-5">
          {arr?.map((item, key) => {
            return (
              <>
                <Link href={"/post/" + item?.attributes?.Slug}>
                <div
                  className=" relative flex flex-wrap pb-[170px] lg:py-0 lg:pb-10 hover:text-white/50"
                  key={key}
                >
                  <div
                    className="w-full h-[300px] bg-cover"
                    style={{
                      backgroundImage: `url("${item?.attributes?.Cover}")`,
                    }}
                  >
                    <div className="w-full h-full duration-200 ease-in-out group bg-blackk/40 hover:bg-blackk/70">
                      <h1 className="float-right p-1 text-sm uppercase bg-blackk text-yellow">
                        {item?.attributes?.Category}
                      </h1>
                      <h1 className="flex float-left p-1 text-sm uppercase lg:hidden bg-blackk text-yellow">
                        <BsHeartFill size={20} className="m-1" /> 
                        <p>{item?.attributes?.reactions?.data?.length}</p>
                      </h1>

                      {/* reactions sectino */}
                      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hidden group-hover:block ease-in-out duration-200">
                        <button className="lg:flex duration-300 ease-in-out hover:text-white hidden">
                          <BsHeartFill size={25} className="m-1" />
                        <p>{item?.attributes?.reactions?.data?.length}</p>
                        </button>
                      </div>
                    </div>
                    <div className="">
                    
                        <h2 className="px-1  font-bold  text-lg ease-in-out duration-200">
                          {item?.attributes?.Title}
                        </h2>
                     
                      <p className="px-1 text-sm lg:text-sm">{item?.attributes?.Abstract}</p>
                      <h1 className="p-1 text-xs  uppercase bg-blackk text-yellow">
                      {item?.attributes?.createdAt.slice(8,10)}
                       {item?.attributes?.createdAt.slice(4,8)}
                       {item?.attributes?.createdAt.slice(0,4)}
                      </h1>
                    </div>
                  </div>
                </div>
                </Link>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Trending;
