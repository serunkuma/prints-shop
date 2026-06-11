import { Link } from "react-router";
import { motion } from "framer-motion";
import { artists } from "@/data/mockData";
import { fadeUp } from "@/lib/animations";

export default function ArtistSpotlightSection() {
  const artist = artists[0];

  return (
    <motion.section className="section-pad bg-void" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
      <div className="container-gallery">
        <div className="border-l-4 border-gold bg-surface p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <img src={artist.portrait} alt={`${artist.name} portrait`} className="h-24 w-24 rounded-full object-cover" />
            <div>
              <h2 className="font-display text-3xl text-text-primary">{artist.name}</h2>
              <p className="text-sm text-text-secondary">{artist.location}</p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">{artist.bio}</p>
              <Link to={`/artists/${artist.handle}`} className="mt-4 inline-flex text-sm font-semibold text-gold">
                View all work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
