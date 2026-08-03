import TitlesList from "../../components/TitlesList";
import { useLoaderData } from "react-router";

export default function AllTitles() {
    const { titles } = useLoaderData();

    return(
        <>
            {titles && titles.length < 1 && <p style={{ textAlign: 'center', color: 'white'}}>Nothing added yet</p>}
            <TitlesList titles={titles} />
        </>
    )
}