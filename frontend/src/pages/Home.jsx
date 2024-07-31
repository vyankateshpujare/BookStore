import React from "react";
import Hero from "../components/home/hero";
import RecentlyAdded from "../components/home/RecentlyAdded";

const Home = () => {
    return (
        <div className="bg-zinc-900 text-white px-10 py-8">
            <Hero />
            <RecentlyAdded/>
        </div>
    )
}

export default Home