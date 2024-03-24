import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="bg-stone-900">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex h-screen lg:items-center">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center sm:-mt-14">
          <h2 className="text-sm text-white border border-white text-center px-3 py-2 rounded-full mb-14">
             Your Free <span className="text-purple-300">Notion</span> X <span className="text-emerald-300">Excalidraw</span>
          </h2> 
          <h1 className=" leading-snug text-4xl font-extrabold sm:text-6xl sm:leading-snug text-emerald-300">
            Documents & diagrams
            <strong className="font-extrabold text-purple-300 sm:block">
              {" "}
              for engineering teams{" "}
            </strong>
          </h1>

          <p className="mt-6 sm:text-xl/relaxed text-stone-200 sm:max-w-xl">
            All-in-one markdown editor, collaborative canvas, and
            diagram-as-code builder
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-stone-800 shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              Try Coworkz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
