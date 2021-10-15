import React from 'react';
import {useRouter} from "next/router";
import {PrismaClient} from "@prisma/client";

const PuzzlePage = () => {
    const router = useRouter()
    const {id} = router.query
    return (
        <div>
            {/*<div id="puzzle-display">*/}
            {/*    <div id="puzzle-description" className={styles.puzzleDescription}>*/}
            {/*        <h5 className="mt-2">Colourful!</h5>*/}
            {/*        <p>I'll let you in on a secret — there's a special way to colour images!</p>*/}
            {/*        <p></p>*/}
            {/*    </div>*/}
            {/*    <div id="puzzle-image" className="col-5">*/}
            {/*        <img src="../assets/img/Puzzle%202%20-%20Colourful.jpg" alt="Puzzle Image" className="row mx-0"/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export async function getStaticProps() {
    const prisma = new PrismaClient()
    // const posts = await prisma.post.findMany()
    // return {
    //     props: {posts}
    // }
}

export default PuzzlePage;
