import Image from "next/image";

interface FooterChannelProps {
  link: string;
  iconLink: string;
}

export function FooterChannel({ link, iconLink }: FooterChannelProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-gray-700 text-white text-sm flex items-center justify-center hover:bg-gray-600 transition"
    >
      <Image
        src={iconLink}
        alt="Channel Icon"
        width={10}
        height={10}
        className="h-1/2 w-1/2 object-contain"
      />
    </a>
  );
}
