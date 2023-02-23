import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../Components/Banner";
import Header from "../Components/Header";
import requests from "../utils/requests";
import { Movie } from "../typings";
import Row from "../Components/Row";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  // products: Product[]
}

const Home: NextPage<Props> = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  // console.log(netflixOriginals);
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      <main className="relative pl-4 pb-24  lg:space-y-24">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List */}

          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {/* Modal */}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    const [
      netflixOriginals,
      trendingNow,
      topRated,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentaries,
    ] = await Promise.all([
      axios.get(requests.fetchNetflixOriginals).then((res) => res.data),
      axios.get(requests.fetchTrending).then((res) => res.data),
      axios.get(requests.fetchTopRated).then((res) => res.data),
      axios.get(requests.fetchActionMovies).then((res) => res.data),
      axios.get(requests.fetchComedyMovies).then((res) => res.data),
      axios.get(requests.fetchHorrorMovies).then((res) => res.data),
      axios.get(requests.fetchRomanceMovies).then((res) => res.data),
      axios.get(requests.fetchDocumentaries).then((res) => res.data),
    ]);

    return {
      props: {
        netflixOriginals: netflixOriginals.results,
        trendingNow: trendingNow.results,
        topRated: topRated.results,
        actionMovies: actionMovies.results,
        comedyMovies: comedyMovies.results,
        horrorMovies: horrorMovies.results,
        romanceMovies: romanceMovies.results,
        documentaries: documentaries.results,
        // products,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        netflixOriginals: [],
        trendingNow: [],
        topRated: [],
        actionMovies: [],
        comedyMovies: [],
        horrorMovies: [],
        romanceMovies: [],
        documentaries: [],
        // products,
      },
    };
  }
};
