import { cookies } from "next/headers";

import HomeTodo from "@/views/home/HomeTodo";
import HomeDocs from "@/views/home/HomeDocs";
import HomeLinks from "@/views/home/HomeLinks";

import getDocsMap from "@/utils/getDocsMap";

export default async function APP() {
  const darkMode = cookies().get("darkMode")?.value === "true";

  const docs = await getDocsMap();

  return (
    <main className="sm:max-w-[512px] md:max-w-[614px] lg:max-w-[820px] xl:max-w-[1024px] mx-auto flex flex-col lg:flex-row lg:mt-32 xl:mt-36">
      <div className="w-full lg:w-fit flex flex-col justify-center lg:justify-start items-center mt-10 lg:mt-0">
        <img
          className="w-16 h-16 min-w-16 min-h-16 xl:w-24 xl:min-w-24 xl:h-24 xl:min-h-24 2xl:w-32 2xl:min-w-32 2xl:h-32 2xl:min-h-32 rounded-full shadow-lg"
          src="/icon.png"
          alt=""
        />
        <div className="mx-auto mt-6 mb-3 flex lg:flex-col items-center">
          <HomeLinks darkMode={darkMode} />
        </div>
      </div>
      <div className="w-full px-16 mx-auto mt-8 ">
        <HomeTodo darkMode={darkMode} />
        <div className="my-10">
          <p className="dark:text-gray-200/90 text-2xl mb-4">DOCS:</p>
          <HomeDocs docs={docs} darkMode={darkMode} />
        </div>
      </div>
    </main>
  );
}
