import { ReactNode } from "react";
import { FaEye, FaLock, FaUser } from "react-icons/fa";

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

const features: Feature[] = [
  {
    title: "Secure",
    description: "Your organization/personal data is secure with us",
    icon: <FaLock size={20} />,
  },
  {
    title: "Easy to use",
    description: "Our platform is easy to use and navigate",
    icon: <FaUser size={20} />,
  },
  {
    title: "Transparent",
    description: "Create and manage organizations and elections transparently.",
    icon: <FaEye size={20} />,
  },
];

function Features() {
  return (
    <div className="w-full  py-12 h-[70vh] relative bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="max-w-[1200px] mx-auto">

      <h1 className="text-white text-3xl md:text-4xl font-medium mb-8 text-center">Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map(function(feature, index) {
          return <FeaturesCard key={index} {...feature} />;
        })}
      </div>
          </div>
    </div>
  );
}

export default Features;

function FeaturesCard({title, description, icon}:{title:string, description:string, icon:ReactNode}) {
  return <div className="rounded-lg bg-[#171717] p-4 border border-[#272727]">
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-sm text-gray-400">{description}</p>
  </div>; mb-4
}
