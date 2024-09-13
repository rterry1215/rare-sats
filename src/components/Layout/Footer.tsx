"use client";
import FooterLogo from "@/assets/images/footer-logo.jpg";
import Twitter from "@/assets/images/Twitter.png";
import Github from "@/assets/images/GitHub.png";

const Footer = () => {
  return (
    <footer className="mx-10">
      <div className="pb-10 pt-20">
        <hr className="border-2 border-[#343434]"></hr>
        <div className="mt-10">
          <div className="flex justify-end">
            <div className="grid w-[500px] grid-cols-2">
              <div>
                <div className="flex justify-center">
                  <img
                    src={FooterLogo}
                    alt="Image"
                    className="h-20 w-20 rounded-full"
                  />
                </div>
                <div className="mt-4 text-center text-[32px] font-semibold text-[#ada9a9]">
                  BUILT BY O625
                </div>
              </div>
              <div className="flex justify-center gap-10">
                <div>
                  <a href="https://x.com/ADORORG" target="_blank">
                    <img
                      src={Twitter}
                      alt="Twitter"
                      className="h-12 w-12 rounded-lg bg-[#696867]"
                    />
                  </a>
                </div>
                <div>
                  <a href="https://github.com/ADORORG" target="_blank">
                    <img
                      src={Github}
                      alt="Github"
                      className="h-12 w-12 rounded-lg bg-[#696867]"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
