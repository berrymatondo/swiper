"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { FeatureCard } from "@/components/feature-card";
import { motion } from "framer-motion";
import {
  Users,
  ChevronRight,
  BookIcon,
  Heart,
  Calendar,
  Menu,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { useRouter } from "next/navigation";

const LandPage = () => {
  //const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sliderMessages = ["Dernier culte", "ICC l'hebdo"];
  const router = useRouter();

  return (
    <div className="md:container min-h-screen bg-white">
      {/*       <div className="fixed inset-x-0 top-0 z-50">
                 <header className="border-b bg-white/80 backdrop-blur-xl">
          <div className="container flex items-center justify-between h-16">
            <Link href="/" className="flex flex-col items-center">
              <div className="relative w-10 h-10">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BpN18WLcGdiIVWuat3DeawxVcpar2v.png"
                  alt="ICC Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs mt-1 text-gray-600">
                Impact Centre Chrétien
              </span>
            </Link>

            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {[
                    "Cellules",
                    "Zones",
                    "Rapports",
                    "Membres",
                    "Documentation",
                  ].map((item) => (
                    <NavigationMenuItem key={item}>
                      <Link href="#" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {item}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-orange-100 hover:text-orange-700"
              >
                Se connecter
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header> 

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b">
            <nav className="container py-4">
              {[
                "Cellules",
                "Zones",
                "Rapports",
                "Membres",
                "Documentation",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block py-2 text-gray-600 hover:text-gray-900"
                >
                  {item}
                </Link>
              ))}
              <Button
                variant="outline"
                className="w-full mt-4 border-orange-500 text-orange-600 hover:bg-orange-100 hover:text-orange-700"
              >
                Se connecter
              </Button>
            </nav>
          </div>
        )}
      </div> */}

      <main className="pt-8 pb-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/*           <div className="mb-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-lg overflow-hidden">
           */}{" "}
          <div className="mb-4 rounded-lg overflow-hidden">
            {/*             <InfiniteSlider messages={sliderMessages} />
             */}{" "}
            <InfiniteSliderBasic />
          </div>
          <div className="relative flex flex-col items-center text-center mb-16 max-md:mb-4">
            <div className="relative text-white w-full md:hidden mb-8 max-md:mb-4">
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-09-27%20at%2006.10.14%20(1)-tDYvt3g2ZqiaCRxMmwvIv9C32FPRGN.jpeg"
                  alt="Groupe de prière"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl md:text-5xl lg:text-7xl font-bold text-center mt-6 mb-6"
                >
                  Découvrez les{" "}
                  <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                    Cellules de maison
                  </span>{" "}
                  près de chez vous !
                </motion.h1>
              </div>
            </div>
            <div className="max-md:hidden flex flex-col items-center w-full">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-center text-gray-900 mt-6 mb-6"
              >
                Découvrez les{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                  Cellules de maison
                </span>{" "}
                près de chez vous !
              </motion.h1>
            </div>
            <div className="w-full mt-4 md:mt-0">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Les{" "}
                <span className="font-semibold text-orange-500">
                  cellules de maison
                </span>
                {"sont des cellules de l'Eglise Impact Centre Chrétien. Les"}
                {"membres des cellules se réunissent"}
                <span className="font-semibold text-orange-500">
                  tous les jeudis de 19h00 à 20h15
                </span>
                {
                  "dans les maisons hôtes pour s'édifier afin d'influencer leurs "
                }
                {"villes et leurs quartiers avec les valeurs de Christ ! "}
              </motion.p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-8">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden hidden md:block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-09-27%20at%2006.10.14%20(1)-tDYvt3g2ZqiaCRxMmwvIv9C32FPRGN.jpeg"
                  alt="Groupe de prière"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <Button
                  size="lg"
                  className="rounded-full relative w-full py-6 md:py-8 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-base md:text-lg font-semibold shadow-xl overflow-hidden after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent hover:after:translate-x-[100%] after:transition-transform after:duration-500"
                  onClick={() => router.push("/cellules")}
                >
                  Rejoins une cellule maintenant
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 ml-2" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfS9aFTSLTsMJWSvuWkcY7he5GP18PtT5yD56I6xblHOnlHHA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-full border border-orange-500/20 text-black font-semibold bg-orange-500/10 text-sm hover:bg-orange-500/20 transition-colors"
                >
                  Devenir pilote ou hôte
                </Link>
              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ii3-LgOy2PBuV3Ex3MASATx49Nw3Q4vLbi.webp"
                  alt="Repas communautaire"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-10-10%20at%2022.07.53-QcGEFJJ3ztx8SwPHKsjKV4H96qMWvw.jpeg"
                  alt="Étude biblique"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-09-19%20at%2021.29.05-59cLg84s5VK9atK3gL6o0fLQ5yuXPb.jpeg"
                  alt="Discussion"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-10-17%20at%2023.19.46-JCWFSACQT5bNmoermpyTGD509TEx8U.jpeg"
                  alt="Moment de joie"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Communauté"
              description="Fais partie d'une famille spirituelle unie et bienveillante"
            />
            <FeatureCard
              icon={<BookIcon className="w-6 h-6" />}
              title="Croissance"
              description="Approfondis ta foi à travers l'étude biblique et le partage"
            />
            <FeatureCard
              icon={<Heart className="w-6 h-6" />}
              title="Soutien"
              description="Trouve du soutien et des encouragements dans ton parcours"
            />
            <FeatureCard
              icon={<Calendar className="w-6 h-6" />}
              title="Régularité"
              description="Rendez-vous hebdomadaire pour grandir ensemble"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandPage;

const InfiniteSliderBasic = () => {
  return (
    <InfiniteSlider gap={24} reverse>
      <img src="/al.jpg" alt="Apple Music logo" className="h-[120px] w-auto" />
      <img
        src="/images/cellules/ottignies.jpeg"
        alt="Chrome logo"
        className="h-[120px] w-auto"
      />
      <img
        src="/images/cellules/haren.jpeg"
        alt="Strava logo"
        className="h-[120px] w-auto"
      />
      <img
        src="/images/cellules/ander2.jpeg"
        alt="Nintendo logo"
        className="h-[120px] w-auto"
      />
      <img
        src="/images/cellules/nossegem.jpeg"
        alt="Jquery logo"
        className="h-[120px] w-auto"
      />
      <img
        src="/images/cellules/halle.jpeg"
        alt="Prada logo"
        className="h-[120px] w-auto"
      />
    </InfiniteSlider>
  );
};
