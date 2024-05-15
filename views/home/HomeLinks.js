"use client";
import React, { memo } from "react";
import { useRouter } from "next/navigation";

const links = [
  {
    title: "Github",
    link: "https://github.com/kisssssssss/docs",
  },
  {
    title: "Live2D",
    link: "/setting/live2d",
  },
  {
    title: "Setting",
    link: "/setting/base",
  },
];

const HomeLinks = memo(({ darkMode }) => {
  const router = useRouter();

  const linksClass = `${darkMode ? "text-gray-200" : "text-gray-700"} `;

  return (
    <div className="mx-auto mt-6 mb-3 flex items-center">
      {links.map((item, index) => (
        <p
          key={index}
          onClick={() =>
            item.link[0] == "/"
              ? router.push(item.link)
              : window.open(item.link, "_blank")
          }
          className={
            linksClass +
            "my-2 mx-2 hover:text-violet-500 dark:hover:text-violet-500/80 hover:underline underline-offset-[6px] cursor-pointer decoration-dashed"
          }
        >
          {item.title}
        </p>
      ))}
    </div>
  );
});

export default HomeLinks;
