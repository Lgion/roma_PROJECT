import Image from "next/image";

export default function ProfileImage() {
  return (
    <div className="relative w-64 h-64">
      <Image
        src="/path/to/your/image.jpg"
        alt="Description de l'image"
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  );
}