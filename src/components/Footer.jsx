import { Footer, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup, FooterBrand } from "flowbite-react";

export function FooterN() {
  return (

    <Footer >
      <div className="w-full text-center items-center justify-center bottom-0 flex flex-col dark:bg-gray-900 ">
        <div className="w-full justify-center sm:flex sm:items-center sm:justify-between bg-red-600 dark:bg-gray-800 mt-auto pt-5 flex-1 px-50">
          <FooterBrand
            href="#"
            src="./logo_blanco-removebg.png"
            alt="Nextfliks Logo"
            name=""
            className="h-5 "
          />
          <FooterLinkGroup className="text-gray-100 items-center justify-center">
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Licensing</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinkGroup>
        </div>
        <div className="bg-red-600 w-full dark:bg-gray-800 pb-2">
          <FooterDivider />
          <FooterCopyright href="#" by="NextFliks" year={2025} className="text-gray-100"/>
        </div>
      </div>
    </Footer>

  );
}