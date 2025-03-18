import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="border-t border-black font-redhat">
      <div className="w-full mx-auto flex flex-col gap-20 items-center py-20 max-w-[840px]">
        <div className="flex flex-col gap-8">
          <Link href="/">
            <img
              src="/FourCollection.png"
              alt="Logo"
              className="w-full h-auto mx-auto"
            />
          </Link>
          <div className="flex justify-center gap-6 text-[#62696B]">
            <div>© 2024 | 4Collection GmbH</div>
            <div>Imprint</div>
            <div>Privacy Policy</div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-4 text-center">
            <div className="uppercase font-haboro text-lg">Telephone</div>
            <div className="text-[#62696B]">+49 89 200 03 0800</div>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <div className="uppercase  font-haboro text-lg">Headquarters</div>
            <div className="text-[#62696B]">
              4Collection GmbH
              <br /> Maximilanstraße 2<br /> 80539 München
            </div>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <div className="uppercase font-haboro text-lg">E-mail</div>
            <div className="text-[#62696B]">info@4collection.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};
