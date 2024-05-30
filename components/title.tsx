import React from "react";

type TitleProps = {
  title: string;
  description?: string;
};

const Title = ({ title, description }: TitleProps) => {
  return (
    <div>
      <div className="text-white px-4 rounded-bl-3xl rounded-tr-3xl flex flex-col items-start my-2 bg-gradient-to-r from-red-800/80 to-orange-500 rounded-lg p-2">
        <h1 className="uppercase font-bold text-lg max-md:text-sm text-white">
          {title}
        </h1>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Title;
