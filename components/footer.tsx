import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="border-t border-black font-redhat">
      <div className="w-full mx-auto flex flex-col gap-8 sm:gap-12 md:gap-20 items-center py-8 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 max-w-[840px]">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full">
          <Link
            href="/"
            className="w-full max-w-[200px] sm:max-w-[250px] mx-auto"
          >
            <img
              src="/FourCollection.png"
              alt="Logo"
              className="w-full h-auto"
            />
          </Link>
          <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-6 text-[#62696B] text-sm sm:text-base text-center">
            <div>© 2024 | 4Collection GmbH</div>
            <Link target="_blank" href="https://4collection.com/imprint">
              Imprint
            </Link>
            <Link
              target="_blank"
              href="https://4collection.com/privacy-policy/"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between w-full gap-6 sm:gap-8">
          <div className="flex flex-col gap-2 sm:gap-4 text-center">
            <div className="uppercase font-haboro text-base sm:text-lg">
              Telephone
            </div>
            <div className="text-[#62696B] text-sm sm:text-base">
              <Link target="_blank" href="tel:+4989200030800">
                +49 89 200 03 0800
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:gap-4 text-center">
            <div className="uppercase font-haboro text-base sm:text-lg">
              Headquarters
            </div>
            <div className="text-[#62696B] text-sm sm:text-base">
              4Collection GmbH
              <br /> Maximilanstraße 2<br /> 80539 München
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:gap-4 text-center">
            <div className="uppercase font-haboro text-base sm:text-lg">
              E-mail
            </div>
            <div className="text-[#62696B] text-sm sm:text-base">
              <Link target="_blank" href="mailto:info@4collection.com">
                info@4collection.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
